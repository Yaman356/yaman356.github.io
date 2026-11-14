#!/usr/bin/env python3
"""Ajan tabanlı ekonomi simülasyonu: tasarım dokümanındaki ürün tablosu ve kurallarla.

Çalıştırma:  python3 sim/economy_sim.py            (tüm senaryolar, sonuçlar sim/results.json)
             python3 sim/economy_sim.py --quick    (tek tohum, hızlı duman testi)

Model sınırları: her firmanın tek arsası ve tek üretim hattı vardır; firmalar kâr tablosuna
bakan basit kurallarla karar verir. İnsan davranışı, eğlence ve elde tutma ölçülmez.
Her koşuda para ve mal korunumu denetlenir; tutmazsa koşu hata verir.
"""
import argparse, json, random, statistics, sys
from collections import defaultdict

# ---- Tasarım verisi (demo ile aynı) ----
P = {  # ref fiyat, parti süresi (dk), işletme gideri, girdiler (10 birimlik parti için), ağırlık, tüketici talebi/saat
    'bugday': dict(ref=4, t=30, op=20, inp={}, w=1, d=0, b='tarla'),
    'sut': dict(ref=6, t=30, op=30, inp={}, w=1, d=6, b='tarla'),
    'pamuk': dict(ref=8, t=45, op=40, inp={}, w=1, d=0, b='tarla'),
    'komur': dict(ref=6, t=45, op=30, inp={}, w=2, d=4, b='maden'),
    'demir': dict(ref=10, t=60, op=50, inp={}, w=2, d=0, b='maden'),
    'un': dict(ref=14, t=60, op=30, inp={'bugday': 20}, w=1, d=3, b='fabrika'),
    'kumas': dict(ref=27, t=120, op=50, inp={'pamuk': 20}, w=1, d=0, b='fabrika'),
    'celik': dict(ref=40, t=120, op=60, inp={'demir': 20, 'komur': 10}, w=2, d=0, b='fabrika'),
    'ekmek': dict(ref=24, t=60, op=40, inp={'un': 10}, w=1, d=12, b='fabrika'),
    'peynir': dict(ref=30, t=180, op=50, inp={'sut': 30}, w=1, d=8, b='fabrika'),
    'giysi': dict(ref=46, t=180, op=80, inp={'kumas': 10}, w=0.5, d=5, b='fabrika'),
    'alet': dict(ref=65, t=240, op=100, inp={'celik': 10}, w=1, d=3, b='fabrika'),
}
PK = list(P)
FINAL = ['ekmek', 'peynir', 'giysi', 'alet']
RAW = [p for p in PK if not P[p]['inp']]
MID = ['un', 'kumas', 'celik']
DM = {'merkez': 1.6, 'kirsal': 1.0, 'dag': 0.7}
DIST = {'merkez': {'merkez': 0, 'kirsal': 1, 'dag': 2}, 'kirsal': {'merkez': 1, 'kirsal': 0, 'dag': 1}, 'dag': {'merkez': 2, 'kirsal': 1, 'dag': 0}}
BONUS = {'kirsal': 'tarla', 'dag': 'maden'}
BCOST = {'dukkan': 1500, 'tarla': 1200, 'maden': 2000, 'fabrika': 2500}
CAP = {'dukkan': 150, 'tarla': 200, 'maden': 200, 'fabrika': 250}
LAND = {'merkez': 12000, 'kirsal': 6000, 'dag': 7000}
RETAIL, RENT, COMM, K = 1.6, 0.05, 0.03, 1.0
START_CASH = 5000
# Ar-Ge seviyesi 0-5: fire (çıktı kaybı) ve verim (parti süresinin kısalması)
FIRE = [0.10, 0.08, 0.065, 0.05, 0.035, 0.02]
VERIM = [0.0, 0.03, 0.06, 0.09, 0.12, 0.15]


def tr(p, a, b):
    return P[p]['w'] * (0.1 + DIST[a][b] * 0.2)


def flows():
    """Ölçek 1'de saatlik ihtiyaç: tüketici talebi + üst aşamaların girdi ihtiyacı."""
    need = {p: P[p]['d'] * sum(DM.values()) for p in PK}
    for p in ['alet', 'giysi', 'peynir', 'ekmek', 'celik', 'kumas', 'un']:
        for k, q in P[p]['inp'].items():
            need[k] += need[p] * q / 10
    return need


NEED = flows()
RATE = {p: 600 / P[p]['t'] for p in PK}  # birim/saat, tek hat
WEIGHT = {p: NEED[p] / RATE[p] for p in PK}
WEIGHT['dukkan'] = 10.0
ROLE_OF = lambda p: 'dükkân' if p == 'dukkan' else 'ham madde' if p in RAW else 'ara mal' if p in MID else 'son ürün'


class Firm:
    def __init__(s, i, role, region, owned, follower):
        s.id, s.region, s.owned, s.follower = i, region, owned, follower
        s.set_role(role)
        s.cash = START_CASH - BCOST[s.btype]
        s.inv = defaultdict(float)
        s.ask = {p: float(P[p]['ref']) for p in PK}
        s.rp = {p: P[p]['ref'] * RETAIL for p in PK}  # dükkân raf fiyatı
        s.rate = defaultdict(float)  # dükkân: saatlik satış tahmini
        s.busy = 0.0; s.down_until = 0; s.last_switch = -99
        s.incost = {p: float(P[p]['ref']) for p in PK}
        s.rd = 0; s.outq = 10.0
        s.m = 1.0; s.capmul = 1.0; s.level = 1; s.lines = 1  # üretim ölçeği: parti büyüklüğü x hat sayısı  # girdiye ödenen teslim fiyatı (üstel ortalama)
        s.offered = defaultdict(float); s.sold = defaultdict(float)
        s.wealth0 = s.cash; s.hist = []; s.capital = []; s.made = 0.0
        s.hours = 0; s.halt_in = 0.0; s.halt_cash = 0.0

    def set_role(s, role):
        s.role = role
        s.btype = 'dukkan' if role == 'dukkan' else P[role]['b']
        s.prod = None if role == 'dukkan' else role

    def stock(s):
        return sum(s.inv.values())

    def unit_cost(s, p):
        rc = P[p]; return (rc['op'] + sum(q * s.incost[k] for k, q in rc['inp'].items())) / s.outq

    def wealth(s):
        return s.cash + sum(q * P[p]['ref'] * 0.75 for p, q in s.inv.items())


class Wholesaler:
    """A: sınırsız, her bölgede şube (mevcut doküman). B: stok kotalı ve bütçeli, her bölgede şube.
    C: B ile aynı ama tek şube Merkez'de (taşıma mesafeye göre)."""
    def __init__(s, mode, scale, qf=0.15, bf=0.10):
        s.mode, s.scale, s.qf, s.bf = mode, scale, qf, bf
        s.m = {p: 1.0 for p in PK}; s.stock = defaultdict(float)
        s.quota = {}; s.budget = {}; s.new_day()

    def new_day(s):
        for p in PK:
            base = NEED[p] * 24 * s.scale
            s.quota[p] = s.qf * base
            s.budget[p] = s.bf * base * P[p]['ref']

    def sell_price(s, p, ema):
        return 1.3 * P[p]['ref'] * s.m[p] if s.mode == 'A' else 1.3 * max(P[p]['ref'], ema)

    def buy_price(s, p):
        return 0.75 * P[p]['ref'] * s.m[p] if s.mode == 'A' else 0.6 * P[p]['ref']

    def avail(s, p):
        return 1e12 if s.mode == 'A' else s.stock[p] + s.quota[p]

    def transport(s, p, region):
        return tr(p, 'merkez', region) if s.mode == 'C' else P[p]['w'] * 0.1


class Sim:
    def __init__(s, n=50, seed=1, wmode='A', alloc='dengeli', followers=0.5, info_pending=False,
                 switch_delay=0, tax=None, days=30, hook=None, hoarder=False, fire=False, rd=None, retail_follow=False,
                 qf=0.15, bf=0.10, switch_fee=0.0, shop_w=None, shop_comp=False, shop_op=0.0):
        s.rng = random.Random(seed)
        s.n, s.days, s.hook, s.tax = n, days, hook, tax
        s.info_pending, s.switch_delay = info_pending, switch_delay
        s.scale = n / sum(WEIGHT.values())
        s.dmult = 1.0
        s.W = Wholesaler(wmode, s.scale, qf, bf); s.switch_fee = switch_fee
        s.shop_comp, s.shop_op = shop_comp, shop_op  # dükkânlar arası fiyat kırma; dükkânın saatlik işletme gideri
        s.ema = {p: float(P[p]['ref']) for p in PK}
        s.money = defaultdict(float); s.goods = {p: defaultdict(float) for p in PK}
        s.firms = []
        w = dict(WEIGHT)
        if shop_w is not None: w['dukkan'] = shop_w
        if alloc == 'fabrika':
            for p in RAW: w[p] = 0.0
        roles = s.apportion(w, n)
        for i, role in enumerate(roles):
            bt = 'dukkan' if role == 'dukkan' else P[role]['b']
            reg = s.rng.choices(['merkez', 'kirsal', 'dag'], {'tarla': [15, 70, 15], 'maden': [15, 15, 70], 'fabrika': [40, 30, 30], 'dukkan': [48, 30, 22]}[bt])[0]
            s.firms.append(Firm(i, role, reg, tax is not None and s.rng.random() < 0.5, s.rng.random() < followers))
        s.cash0 = sum(f.cash for f in s.firms)
        s.fire = fire; s.retail_follow = retail_follow
        for f in s.firms:
            f.rd = rd(f, s.rng) if rd else 0
            f.outq = 10 * (1 - FIRE[f.rd]) if fire else 10.0
        s.hoarder = None
        if hoarder:
            h = Firm(n, 'un', 'merkez', True, False); h.btype = 'tuccar'; h.prod = None; h.cash = 200000.0; h.wealth0 = h.cash
            h.ask['un'] = P['un']['ref'] * 1.8
            s.hoarder = h; s.cash0 += h.cash
        s.t = 0; s.daily = []; s.vol = defaultdict(float); s.val = defaultdict(float)
        s.day = defaultdict(float); s.pending = defaultdict(int); s.switches = 0

    def apportion(s, w, n):
        tot = sum(w.values()); raw = {k: v / tot * n for k, v in w.items()}
        cnt = {k: int(v) for k, v in raw.items()}
        for k in sorted(raw, key=lambda k: raw[k] - cnt[k], reverse=True)[:n - sum(cnt.values())]: cnt[k] += 1
        roles = [k for k, c in cnt.items() for _ in range(c)]
        s.rng.shuffle(roles); return roles

    # ---- para hareketleri ----
    def pay_seller(s, f, gross, p2p):
        net = gross
        if p2p: s.money['komisyon'] += gross * COMM; net -= gross * COMM
        if not f.owned: s.money['kira'] += gross * RENT; net -= gross * RENT
        f.cash += net

    def w_sell(s, buyer, p, q):
        price = s.W.sell_price(p, s.ema[p]); t = s.W.transport(p, buyer.region)
        buyer.cash -= q * (price + t); s.money['toptanci_satis'] += q * price; s.money['tasima'] += q * t
        if s.W.mode == 'A': s.goods[p]['basilan'] += q; s.W.m[p] += 0.00002 * P[p]['ref'] * q
        else:
            r = min(q, s.W.stock[p]); s.W.stock[p] -= r; s.goods[p]['yeniden_satis'] += r
            s.W.quota[p] -= q - r; s.goods[p]['basilan'] += q - r
        buyer.inv[p] += q; s.day['w_units'] += q; s.day['buy_units'] += q

    def w_buy(s, f, p, q):
        price = s.W.buy_price(p)
        if s.W.mode != 'A':
            q = min(q, s.W.budget[p] / price)
            if q <= 1e-9: return 0.0
            s.W.budget[p] -= q * price; s.W.stock[p] += q
        else: s.W.m[p] -= 0.00002 * P[p]['ref'] * q
        f.inv[p] -= q; s.goods[p]['toptanci_aldi'] += q; s.money['toptanci_alim'] += q * price
        s.pay_seller(f, q * price, False); s.day['w_bought_val'] += q * price
        return q

    def buy(s, b, p, want, maxp):
        offers = [(o.ask[p] + tr(p, o.region, b.region), o) for o in s.sellers[p] if o is not b and o.inv[p] > 1e-9]
        if not (b is s.hoarder and s.W.mode == 'A'):
            offers.append((s.W.sell_price(p, s.ema[p]) + s.W.transport(p, b.region), None))
        offers.sort(key=lambda x: x[0])
        got = 0.0
        for price, o in offers:
            if want <= 1e-9 or price > maxp or b.cash <= 1: break
            av = s.W.avail(p) if o is None else o.inv[p]
            q = min(want, av, b.cash / price)
            if q <= 1e-9: continue
            if o is None: s.w_sell(b, p, q)
            else:
                t = price - o.ask[p]
                b.cash -= q * price; s.money['tasima'] += q * t; s.pay_seller(o, q * o.ask[p], True)
                o.inv[p] -= q; b.inv[p] += q; o.sold[p] += q
                s.vol[p] += q; s.val[p] += q * o.ask[p]; s.day['buy_units'] += q
            want -= q; got += q; b.incost[p] = 0.8 * b.incost[p] + 0.2 * price
        return got

    # ---- saatlik adım ----
    def produce(s, f):
        if f.prod is None or s.t < f.down_until: return
        rc = P[f.prod]; minutes = 60.0
        if f.btype == 'fabrika': f.hours += 1
        while minutes > 1e-9:
            if f.busy > 0:
                d = min(f.busy, minutes); f.busy -= d; minutes -= d
                if f.busy <= 1e-9:
                    q = f.outq * f.m * (1.25 if BONUS.get(f.region) == f.btype else 1.0)
                    f.inv[f.prod] += q; s.goods[f.prod]['uretilen'] += q; f.busy = 0; f.made += q
                continue
            m = f.m
            if any(f.inv[k] < q * m - 1e-9 for k, q in rc['inp'].items()):
                f.halt_in += minutes / 60; s.day['halt_in'] += minutes / 60 if f.btype == 'fabrika' else 0; break
            if f.cash < rc['op'] * m:
                f.halt_cash += minutes / 60; s.day['halt_cash'] += minutes / 60; break
            if f.stock() + 13 * m > CAP[f.btype] * f.capmul + sum(rc['inp'].values()) * m: break
            for k, q in rc['inp'].items(): f.inv[k] -= q * m; s.goods[k]['recete'] += q * m
            f.cash -= rc['op'] * m; s.money['uretim'] += rc['op'] * m; f.busy = rc['t'] / (1 + VERIM[f.rd])
        if f.btype == 'fabrika': s.day['fab_hours'] += 1

    def hour(s):
        s.t += 1
        for f in s.firms: s.produce(f)
        s.sellers = defaultdict(list)
        for f in s.firms:
            if f.btype == 'dukkan': continue
            inp = P[f.prod]['inp'] if f.prod else {}
            for p, q in f.inv.items():
                if q > 1e-9 and p not in inp: s.sellers[p].append(f); f.offered[p] = q
        if s.hoarder:
            h = s.hoarder
            s.buy(h, 'un', 1e9, P['un']['ref'] * 1.5)
            if h.inv['un'] > 1e-9: s.sellers['un'].append(h); h.offered['un'] = h.inv['un']
        buyers = [f for f in s.firms if (f.btype in ('fabrika', 'dukkan')) and s.t >= f.down_until]
        s.rng.shuffle(buyers)
        for f in buyers:
            if f.btype == 'fabrika':
                rc = P[f.prod]
                if not rc['inp']: continue
                budget = (1 - COMM - (0 if f.owned else RENT)) * f.ask[f.prod] * 10 - rc['op']
                vsum = sum(P[k]['ref'] * q for k, q in rc['inp'].items())
                for k, q in rc['inp'].items():
                    want = 3 * q * f.m - f.inv[k]
                    if want > 0 and budget > 0: s.buy(f, k, want, budget * P[k]['ref'] / vsum)
            else:
                for p in PK:
                    if not P[p]['d']: continue
                    target = max(10.0, 6 * f.rate[p])
                    want = min(target - f.inv[p], CAP['dukkan'] - f.stock())
                    if want > 1: s.buy(f, p, want, f.rp[p] * (1 - RENT) * 0.9)
        # tüketici satışları
        if s.shop_op:
            for f in s.firms:
                if f.btype == 'dukkan': f.cash -= s.shop_op; s.money['uretim'] += s.shop_op
        for reg in DM:
            shops = [f for f in s.firms if f.btype == 'dukkan' and f.region == reg]
            for p in PK:
                if not P[p]['d']: continue
                D = P[p]['d'] * DM[reg] * s.scale * s.dmult
                rr = (s.ema[p] if s.retail_follow else P[p]['ref']) * RETAIL
                act = [(f, (rr / f.rp[p]) ** 2) for f in shops if f.inv[p] > 1e-9]
                tot = sum(a for _, a in act) + K
                s.day['D_' + p] += D
                for f, a in act:
                    q = min(D * a / tot, f.inv[p]); v = q * f.rp[p]
                    f.inv[p] -= q; s.goods[p]['tuketici'] += q; s.money['tuketici'] += v; s.pay_seller(f, v, False)
                    f.rate[p] = 0.9 * f.rate[p] + 0.1 * q; s.day['S_' + p] += q
                lo = min((g.rp[p] for g in shops if g.inv[p] > 1e-9), default=None) if s.shop_comp else None
                for f in shops:
                    if f.inv[p] < max(1.0, f.rate[p]): f.rp[p] = min(rr * 1.5, f.rp[p] * 1.02)
                    elif not s.shop_comp:
                        if f.inv[p] > 9 * max(1.0, f.rate[p]): f.rp[p] = max(rr * 0.75, f.rp[p] * 0.98)
                    elif f.inv[p] > 4 * max(1.0, f.rate[p]):
                        # stok birikiyorsa bölgedeki en ucuz rakibin biraz altına iner; maliyetin altına inmez
                        floor = f.incost[p] * 1.05 / (1 - (0 if f.owned else RENT))
                        f.rp[p] = max(floor, min(f.rp[p] * 0.98, lo * 0.99 if lo and lo < f.rp[p] else f.rp[p]))
        # fiyat ayarı (stok hedefi, maliyet ve toptancı alım tabanı) ve toptancıya boşaltma
        for f in s.firms:
            if f.btype == 'dukkan': continue
            for p in set(f.offered) | ({f.prod} if f.prod else set()):
                target = 4 * RATE[p] * (f.m if p == f.prod else 1)
                f.ask[p] *= 1 + 0.02 * max(-1.0, min(1.0, 1 - f.inv[p] / target))
                floor = f.unit_cost(p) * 1.05 / (1 - COMM - (0 if f.owned else RENT)) if p == f.prod else 0.4 * P[p]['ref']
                if s.W.mode == 'A' or s.W.budget[p] > 1: floor = max(floor, s.W.buy_price(p))
                f.ask[p] = min(3 * P[p]['ref'], max(floor, f.ask[p]))
            f.offered.clear(); f.sold.clear()
            if f.prod and f.inv[f.prod] > 0.7 * CAP[f.btype] * f.capmul: s.w_buy(f, f.prod, f.inv[f.prod] - 0.5 * CAP[f.btype] * f.capmul)
        if s.hoarder: s.hoarder.offered.clear(); s.hoarder.sold.clear()
        for p in PK:
            if s.vol[p] > 0: s.ema[p] = 0.8 * s.ema[p] + 0.2 * s.val[p] / s.vol[p]
            if s.W.mode == 'A': s.W.m[p] = min(1.5, max(0.6, s.W.m[p] + (1 - s.W.m[p]) * 0.03))
        s.vol.clear(); s.val.clear()
        if s.t % 24 == 0: s.end_day(s.t // 24)

    # ---- günlük adım ----
    def est(s, role, board, count):
        if count[role] and role in board: v = board[role]
        elif role == 'dukkan': v = 300.0
        else:
            rc = P[role]; v = 24 * (RATE[role] * s.ema[role] * 0.92 - RATE[role] / 10 * (rc['op'] + sum(q * s.ema[k] for k, q in rc['inp'].items())))
        if s.info_pending: v = v * max(count[role], 1) / (max(count[role], 1) + s.pending[role]) if v > 0 else v
        return v

    def end_day(s, day):
        if s.tax:
            for f in s.firms:
                if f.owned and (s.tax == 'gunluk' or day % 7 == 0):
                    x = LAND[f.region] * 0.01 * (1 / 7 if s.tax == 'gunluk' else 1); f.cash -= x; s.money['vergi'] += x
        prof = defaultdict(list)
        for f in s.firms:
            f.capital.append(BCOST[f.btype] + sum(q * P[p]['ref'] for p, q in f.inv.items()) + max(0.0, f.cash))
            w = f.wealth(); f.hist.append(w - f.wealth0); f.wealth0 = w; prof[f.role].append(statistics.mean(f.hist[-3:]))
        board = {r: statistics.mean(v) for r, v in prof.items()}
        count = defaultdict(int)
        for f in s.firms: count[f.role] += 1
        d = dict(s.day); s.day.clear()
        fin_D = sum(d.get('D_' + p, 0) for p in FINAL); fin_S = sum(d.get('S_' + p, 0) for p in FINAL)
        s.daily.append(dict(day=day, cash=sum(f.cash for f in s.firms), coverage=fin_S / fin_D if fin_D else 0,
                            halt=d.get('halt_in', 0) / d['fab_hours'] if d.get('fab_hours') else 0,
                            halt_cash=d.get('halt_cash', 0), w_share=d.get('w_units', 0) / d['buy_units'] if d.get('buy_units') else 0,
                            w_bought=d.get('w_bought_val', 0), neg=sum(1 for f in s.firms if f.cash < 0),
                            price={p: s.ema[p] / P[p]['ref'] for p in PK}, roles=dict(count), board=board))
        if s.hook: s.hook(s, day)
        s.pending.clear()
        if day >= 3:
            order = [f for f in s.firms if f.follower and day - f.last_switch >= 3]
            s.rng.shuffle(order)
            for f in order:
                if s.rng.random() > 0.5: continue
                own = statistics.mean(f.hist[-3:])
                best, bv = None, -1e18
                for r in WEIGHT:
                    v = s.est(r, board, count)
                    if v > bv: best, bv = r, v
                nb = 'dukkan' if best == 'dukkan' else P[best]['b']
                cost = (0 if nb == f.btype else BCOST[nb] - 0.5 * BCOST[f.btype]) + s.switch_fee * BCOST[nb]
                if best != f.role and bv > max(own, 0) * 1.25 + cost / 10 + 50 and f.cash >= cost + 300:
                    s.switch(f, best, day)
        s.W.new_day()

    def switch(s, f, role, day):
        nb = 'dukkan' if role == 'dukkan' else P[role]['b']
        if nb != f.btype:
            s.money['insaat'] += BCOST[nb]; s.money['iade'] += 0.5 * BCOST[f.btype]; f.cash += 0.5 * BCOST[f.btype] - BCOST[nb]
        fee = s.switch_fee * BCOST[nb]; f.cash -= fee; s.money['insaat'] += fee
        f.set_role(role); f.busy = 0; f.last_switch = day; f.down_until = s.t + s.switch_delay
        s.pending[role] += 1; s.switches += 1

    def check(s):
        cash = sum(f.cash for f in s.firms) + (s.hoarder.cash if s.hoarder else 0)
        m = s.money
        exp = s.cash0 + m['tuketici'] + m['toptanci_alim'] + m['iade'] - m['toptanci_satis'] - m['uretim'] - m['tasima'] - m['kira'] - m['komisyon'] - m['insaat'] - m['vergi']
        assert abs(cash - exp) < 1e-3 * max(1, abs(cash)), ('para korunumu', cash, exp)
        for p in PK:
            g = s.goods[p]; inv = sum(f.inv[p] for f in s.firms) + (s.hoarder.inv[p] if s.hoarder else 0)
            exp = g['uretilen'] + g['basilan'] + g['yeniden_satis'] - g['recete'] - g['tuketici'] - g['toptanci_aldi']
            assert abs(inv - exp) < 1e-6 * max(1, exp) + 1e-6, ('mal korunumu', p, inv, exp)
            assert all(f.inv[p] > -1e-6 for f in s.firms), ('negatif stok', p)

    def run(s):
        for _ in range(s.days * 24): s.hour()
        s.check(); return s


# ---- Senaryolar ----
def shock_herd(s, day):
    if day == 10:
        board = s.daily[-1]['board']; best = max((r for r in WEIGHT if r != 'dukkan'), key=lambda r: board.get(r, -1e9))
        prods = [f for f in s.firms if f.btype != 'dukkan' and f.role != best]
        for f in s.rng.sample(prods, len(prods) // 2): s.switch(f, best, day)

def shock_supplier(s, day):
    if day == 10:
        raws = [f for f in s.firms if f.role in RAW]
        for f in s.rng.sample(raws, len(raws) // 2): f.down_until = s.t + 10 ** 9; f.follower = False

def shock_demand(s, day):
    if day == 10: s.dmult = 0.5


def summarize(runs, a=20, b=30):
    """Tohumlar üzerinden ortalama; a-b günleri durağan dönem sayılır."""
    def avg(f): return statistics.mean(f(r) for r in runs)
    win = lambda r, k: statistics.mean(d[k] for d in r.daily if a < d['day'] <= b)
    out = dict(
        kapsama=avg(lambda r: win(r, 'coverage')), durus=avg(lambda r: win(r, 'halt')), toptanci_payi=avg(lambda r: win(r, 'w_share')),
        gunluk_para_artisi_firma=avg(lambda r: (r.daily[b - 1]['cash'] - r.daily[a - 1]['cash']) / (b - a) / r.n),
        toptanci_net_basim_firma_gun=avg(lambda r: (r.money['toptanci_alim'] - r.money['toptanci_satis']) / r.days / r.n),
        toptanci_alim_firma_gun=avg(lambda r: r.money['toptanci_alim'] / r.days / r.n),
        tuketici_girisi_firma_gun=avg(lambda r: r.money['tuketici'] / r.days / r.n),
        ekside_firma=avg(lambda r: win(r, 'neg')), gecis=avg(lambda r: r.switches),
        fiyat_min=avg(lambda r: min(min(d['price'].values()) for d in r.daily if d['day'] > a)),
        fiyat_max=avg(lambda r: max(max(d['price'].values()) for d in r.daily if d['day'] > a)),
    )
    out['para_defteri_firma_gun'] = {k: avg(lambda r, k=k: r.money[k] / r.days / r.n) for k in ['tuketici', 'toptanci_alim', 'toptanci_satis', 'uretim', 'tasima', 'kira', 'komisyon', 'insaat', 'vergi']}
    roles = defaultdict(list)
    for r in runs:
        for f in r.firms:
            if s_ok(f): roles[ROLE_OF(f.role)].append(statistics.mean(f.hist[a:b]))
    out['rol_getirisi'] = {k: dict(ort=statistics.mean(v), p10=sorted(v)[len(v) // 10], n=len(v) // len(runs)) for k, v in roles.items()}
    return out

def s_ok(f): return len(f.hist) >= 30

def shock_stats(runs):
    def one(r):
        pre = statistics.mean(d['coverage'] for d in r.daily if 5 < d['day'] <= 10)
        post = [d for d in r.daily if d['day'] > 10]
        low_d = min(post[:10], key=lambda d: d['coverage']); low = low_d['coverage']
        rec = next((d['day'] - 10 for d in post if d['day'] >= low_d['day'] and d['coverage'] >= 0.9 * pre), None)
        pr = [max(d['price'].values()) for d in post] ; pl = [min(d['price'].values()) for d in post]
        return pre, low, rec, max(pr), min(pl), max(d['halt'] for d in post[:6])
    rows = [one(r) for r in runs]
    recs = [x[2] for x in rows]
    return dict(once_kapsama=statistics.mean(x[0] for x in rows), en_dusuk_kapsama=statistics.mean(x[1] for x in rows),
                toparlanma_gun=(statistics.mean(x for x in recs if x is not None) if any(x is not None for x in recs) else None),
                toparlanamayan_kosu=sum(1 for x in recs if x is None), fiyat_tepe=statistics.mean(x[3] for x in rows),
                fiyat_dip=statistics.mean(x[4] for x in rows), en_yuksek_durus=statistics.mean(x[5] for x in rows))


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--quick', action='store_true'); ap.add_argument('--out', default='sim/results.json')
    a = ap.parse_args()
    seeds = [1] if a.quick else [1, 2, 3, 4, 5]
    R = lambda **kw: [Sim(seed=sd, **kw).run() for sd in seeds]
    res = {'not': 'Basit karar kurallı ajanlar; insan davranışı, eğlence ve elde tutma ölçülmez. 30 oyun günü.', 'tohumlar': seeds, 'senaryolar': {}}
    S = res['senaryolar']
    ekmek = lambda rr: statistics.mean(x.goods['ekmek']['tuketici'] / (P['ekmek']['d'] * sum(DM.values()) * x.scale * x.days * 24) for x in rr)
    # 1) Sabit dağılım: toptancı kuralının etkisi
    for n in ([50] if a.quick else [10, 50, 200]):
        for wm in 'ABC':
            S[f'sabit dagilim n={n} toptanci={wm}'] = summarize(R(n=n, wmode=wm, followers=0.0))
    # 2) Kâr takipçisi oranı ve bilgi panosu
    for fo in [0.25, 0.5, 1.0]:
        for label, kw in [('pano', {}), ('pano+kurulan kapasite', dict(info_pending=True)), ('pano+kapasite+12sa gecikme', dict(info_pending=True, switch_delay=12))]:
            S[f'takipci %{int(fo*100)} {label}'] = summarize(R(followers=fo, wmode='B', **kw))
    # 3) Şoklar
    for wm in 'AB':
        for fo in [0.0, 0.25]:
            S[f'herkes fabrika takipci %{int(fo*100)} toptanci={wm}'] = summarize(R(alloc='fabrika', followers=fo, wmode=wm))
            r = R(hook=shock_supplier, followers=fo, wmode=wm); S[f'tedarikci kaybi takipci %{int(fo*100)} toptanci={wm}'] = {**summarize(r), 'sok': shock_stats(r)}
        r = R(hook=shock_demand, followers=0.0, wmode=wm); S[f'talep yariya toptanci={wm}'] = {**summarize(r), 'sok': shock_stats(r)}
        rr = R(hoarder=True, followers=0.0, wmode=wm)
        S[f'istifci (un) toptanci={wm}'] = {**summarize(rr), 'istifci_kar': statistics.mean(x.hoarder.wealth() - 200000 for x in rr),
                                              'un_fiyat_ort': statistics.mean(statistics.mean(d['price']['un'] for d in x.daily[10:]) for x in rr), 'ekmek_kapsama': ekmek(rr)}
    for label, kw in [('pano', {}), ('pano+kurulan kapasite', dict(info_pending=True)), ('pano+kapasite+12sa gecikme', dict(info_pending=True, switch_delay=12))]:
        r = R(hook=shock_herd, followers=0.25, wmode='B', **kw); S[f'ani suru (ureticilerin yarisi) {label}'] = {**summarize(r), 'sok': shock_stats(r)}
    for tx in ['gunluk', 'toplu']:
        S[f'vergi {tx} toptanci=B'] = summarize(R(tax=tx, followers=0.0, wmode='B'))
    json.dump(res, open(a.out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for k, v in S.items():
        rg = v['rol_getirisi']
        print(f"{k:48s} kaps %{v['kapsama']*100:5.1f} durus %{v['durus']*100:5.1f} topt %{v['toptanci_payi']*100:5.1f} para/f/g {v['gunluk_para_artisi_firma']:7.0f} tuk {v['tuketici_girisi_firma_gun']:5.0f} talim {v['toptanci_alim_firma_gun']:5.0f} tnet {v['toptanci_net_basim_firma_gun']:6.0f} gecis {v['gecis']:5.1f} fiyat {v['fiyat_min']:.2f}-{v['fiyat_max']:.2f} | " +
              ' '.join(f"{r[:3]} {rg[r]['ort']:.0f}/{rg[r]['p10']:.0f}" for r in ['ham madde', 'ara mal', 'son ürün', 'dükkân'] if r in rg) + (f" | sok {json.dumps(v['sok'], ensure_ascii=False)}" if 'sok' in v else '') + (f" | istifci {v['istifci_kar']:.0f} un {v['un_fiyat_ort']:.2f} ekmek %{v['ekmek_kapsama']*100:.0f}" if 'istifci_kar' in v else ''))
    print('Korunum denetimleri: TAMAM (her koşuda para ve mal defteri tuttu)')


if __name__ == '__main__':
    main()
