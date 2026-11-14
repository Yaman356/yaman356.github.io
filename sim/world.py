#!/usr/bin/env python3
"""Çok arsalı dünya: şirketler, arsa artırması, yeniden yatırım, arsa vergisi, yeni oyuncular ve gruplar.

economy_sim.Sim'in üzerine kurulur. Her arsa bir işletmedir (tek bina, tek hat); bir şirketin birden
çok arsası olabilir ve kasası ortaktır. Başlangıç arsası kiralıktır (cironun %5'i kira); artırmayla
alınan arsalar şirketindir ve dokümandaki arsa vergisine tabidir.

Çalıştırma: python3 sim/world.py            (tüm senaryolar, sonuçlar sim/world_results.json)
            python3 sim/world.py --quick    (tek tohum)
"""
import argparse, json, os, statistics as st, sys
from collections import defaultdict
sys.path.insert(0, os.path.dirname(__file__))
import economy_sim as E

TAX = {'aktif': 0.01, 'atil': 0.04, 'bos': 0.08}  # haftalık, arsanın referans değerine oranı
REG_W = {'merkez': 0.35, 'kirsal': 0.35, 'dag': 0.30}
PAYBACK = 20      # normal şirket: arsa + bina en geç kaç günde kendini ödemeli
BUFFER = 1500     # yatırımdan sonra kasada kalması istenen para


class Company:
    def __init__(c, cid, cash, kind='normal', joined=0, size=1):
        c.id, c.cash, c.kind, c.joined, c.size = cid, float(cash), kind, joined, size
        c.plots, c.vacant = [], []          # vacant: boş tutulan arsaların bölgeleri
        c.w0 = None; c.hist = []; c.wealth_log = []
        c.bought = 0; c.land_paid = 0.0; c.tax_paid = 0.0; c.neg_days = 0; c.sold_back = 0


class PFirm(E.Firm):
    """Bir arsadaki işletme. Kasa şirkete aittir; işletmenin kendi nakit akışı `flow` içinde izlenir."""
    def __init__(f, i, role, region, owned, follower, co):
        f.co = co; f.flow = 0.0
        keep = co.cash
        super().__init__(i, role, region, owned, follower)
        co.cash = keep; f.flow = 0.0
        f.made_prev = 0.0
        co.plots.append(f)

    @property
    def cash(f):
        return f.co.cash

    @cash.setter
    def cash(f, v):
        f.flow += v - f.co.cash; f.co.cash = v

    def wealth(f):
        return f.flow + sum(q * E.P[p]['ref'] * 0.75 for p, q in f.inv.items())


class World(E.Sim):
    def __init__(s, n=50, seed=1, days=40, tax_scale=1.0, invest=True, joiners=0.0, group=0, spec_cash=0,
                 monopoly=False, cap_wholesale=False, shop_w=16, followers=0.0, wmode='B', start_cash=E.START_CASH,
                 release=None, demand_follows=False, joiner_boost=False, reserve=0.0, upgrades=None, base_floor=0.0, **kw):
        super().__init__(n=n, seed=seed, wmode=wmode, followers=followers, days=days, shop_w=shop_w, **kw)
        s.tax_scale, s.invest, s.joiners, s.start_cash = tax_scale, invest, joiners, start_cash
        s.ref = dict(E.LAND); s.queue = []; s.land_log = []; s.next_id = 1000; s.join_acc = 0.0
        s.release = max(1, round(n * 0.03)) if release is None else release
        s.monopoly = monopoly; s.demand_follows = demand_follows; s.n0 = n
        s.joiner_boost, s.reserve = joiner_boost, reserve
        s.upgrades = upgrades  # None: yükseltme yok; 'eski': seviye yeni hat açar; 'yeni': seviye partiyi büyütür, hat için arsaya genişlenir
        s.n_upgrades = 0; s.n_expand = 0
        s.base_floor = base_floor  # >0: sistem artırmasının taban fiyatı, bölgenin sabit taban değerinin bu oranı
        base, s.firms, s.companies = s.firms, [], []
        for f in base:
            co = s.new_company(start_cash, 'normal', 0)
            s.build(co, f.role, f.region, owned=False, follower=f.follower)
        rng = s.rng
        if group:   # organize grup: üyelerin kasası ve başlangıç arsaları tek şirkette toplanır
            members = rng.sample([c for c in s.companies], group)
            g = s.merge(members, 'grup')
        if monopoly:  # arz tekeli: bütün çelik üreticileri tek şirkette
            members = [c for c in s.companies if c.plots[0].role == 'celik']
            if members: s.merge(members, 'tekel')
        if spec_cash:  # zengin spekülatör: arsa toplar, boş tutar
            s.new_company(spec_cash, 'spekulator', 0)
        if cap_wholesale:  # acil tedarik fiyatı piyasa ortalamasını izlemez, olağan fiyatın %130'unda sabit
            s.W.sell_price = lambda p, ema: 1.3 * E.P[p]['ref']
        s.cash0 = sum(c.cash for c in s.companies); s.money['insaat'] = 0.0
        for f in s.firms: f.wealth0 = f.wealth()

    # ---- kurulum yardımcıları ----
    def new_company(s, cash, kind, day, size=1):
        c = Company(len(s.companies), cash, kind, day, size); s.companies.append(c); return c

    def merge(s, members, kind):
        g = members[0]; g.kind = kind; g.size = len(members)
        for c in members[1:]:
            g.cash += c.cash
            for f in c.plots: f.co = g; g.plots.append(f)
            c.plots = []; c.cash = 0.0; s.companies.remove(c)
        return g

    def build(s, co, role, region, owned, follower=False):
        f = PFirm(s.next_id, role, region, owned, follower, co); s.next_id += 1
        co.cash -= E.BCOST[f.btype]; s.money['insaat'] += E.BCOST[f.btype]
        if s.fire: f.outq = 10 * (1 - E.FIRE[f.rd])
        f.wealth0 = f.wealth(); s.firms.append(f)
        return f

    # ---- saatlik: tekel fiyatı ----
    def hour(s):
        super().hour()
        if s.monopoly:
            for c in s.companies:
                if c.kind == 'tekel':
                    for f in c.plots: f.ask['celik'] = max(f.ask['celik'], 2.5 * E.P['celik']['ref'])

    # ---- günlük ----
    def end_day(s, day):
        super().end_day(day)
        s.land_tax(); s.debts(); s.join(day)
        if s.upgrades: s.do_upgrades(day)
        if s.invest: s.auction(day)
        s.record(day)

    def active(s, f):
        return f.made > f.made_prev + 1e-9 if f.prod else sum(f.rate.values()) > 0.2

    @staticmethod
    def set_scale(f, rule):
        if rule == 'yeni':
            f.m = (1 + 0.5 * (f.level - 1)) * f.lines; f.capmul = f.level + f.lines - 1
        else:
            f.m = float(f.level); f.capmul = float(f.level)

    def do_upgrades(s, day):
        """Günde şirket başına en fazla bir yükseltme: son üç günü kârlı bir üretim işletmesi, ek kapasitenin
        getirisi 20 günde bedelini karşılıyorsa yükseltilir."""
        for c in s.companies:
            best = None
            for f in c.plots:
                if f.btype == 'dukkan' or f.level >= 3 or len(f.hist) < 3: continue
                prof = st.mean(f.hist[-3:])
                if prof <= 50: continue
                old = f.m; f.level += 1; s.set_scale(f, s.upgrades); gain = prof * (f.m / old - 1); f.level -= 1; s.set_scale(f, s.upgrades)
                cost = E.BCOST[f.btype] * f.level
                if gain * PAYBACK >= cost and c.cash >= cost + BUFFER and (best is None or gain / cost > best[0]): best = (gain / cost, f, cost)
            if best:
                _, f, cost = best
                c.cash -= cost; s.money['insaat'] += cost; f.level += 1; s.set_scale(f, s.upgrades); s.n_upgrades += 1

    def land_tax(s):
        for c in s.companies:
            owned = [f for f in c.plots if f.owned]
            k = len(owned) + len(c.vacant) + sum(f.lines - 1 for f in c.plots)
            if not k: continue
            mult = 1 + 0.1 * (k - 1)
            x = sum(s.ref[f.region] * (TAX['aktif'] if s.active(f) else TAX['atil']) * (f.lines if f.owned else f.lines - 1) for f in c.plots)
            x += sum(s.ref[r] * TAX['bos'] for r in c.vacant)
            x *= mult * s.tax_scale / 7
            c.cash -= x; s.money['vergi'] += x; c.tax_paid += x
        for f in s.firms: f.made_prev = f.made

    def debts(s):
        """Kasası üç gün üst üste ekside kalan şirket bir arsasını sisteme satar (dokümandaki kural)."""
        for c in s.companies:
            c.neg_days = c.neg_days + 1 if c.cash < 0 else 0
            if c.neg_days < 3: continue
            if c.vacant:
                r = c.vacant.pop(); pay = 0.5 * s.ref[r]
            else:
                owned = [f for f in c.plots if f.owned]
                if not owned: continue
                f = min(owned, key=lambda f: st.mean(f.hist[-3:]) if f.hist else 0)
                r = f.region; pay = 0.5 * s.ref[r] * f.lines + 0.5 * E.BCOST[f.btype]
                s.queue += [(r, False)] * (f.lines - 1)
                for p, q in f.inv.items():
                    pay += 0.5 * q * E.P[p]['ref']; s.goods[p]['sisteme'] += q
                f.inv.clear(); c.plots.remove(f); s.firms.remove(f)
            c.cash += pay; s.money['arsa_iade'] += pay; c.sold_back += 1; c.neg_days = 0
            s.queue.append((r, False))

    def target_role(s):
        w = dict(E.WEIGHT); w['dukkan'] = 16.0
        cnt = defaultdict(int)
        for f in s.firms: cnt[f.role] += 1
        return min(w, key=lambda r: (cnt[r] + 1) / w[r] + s.rng.random() * 1e-6)

    def join(s, day):
        if not s.joiners or day < 10 or day > s.days - 10: return
        s.join_acc += s.joiners
        while s.join_acc >= 1:
            s.join_acc -= 1
            role = s.target_role(); bt = 'dukkan' if role == 'dukkan' else E.P[role]['b']
            reg = s.rng.choices(['merkez', 'kirsal', 'dag'], {'tarla': [15, 70, 15], 'maden': [15, 15, 70], 'fabrika': [40, 30, 30], 'dukkan': [48, 30, 22]}[bt])[0]
            cash = s.start_cash * (max(1.0, st.mean(s.ref[g] / E.LAND[g] for g in E.LAND)) if s.joiner_boost else 1.0)
            c = s.new_company(cash, 'yeni', day); s.money['giris'] += cash
            s.build(c, role, reg, owned=False)
        if s.demand_follows:  # şehir nüfusu (tüketici talebi) şirket sayısıyla büyür
            s.dmult = len(s.companies) / s.n0; s.W.scale = s.scale * s.dmult

    def plot_value(s, region):
        """Bir şirketin bu bölgedeki yeni bir arsadan bekleyeceği günlük kâr ve en iyi rol."""
        board = s.daily[-1]['board']
        cnt = defaultdict(int)
        for f in s.firms: cnt[f.role] += 1
        best, bv = None, -1e18
        for r in E.WEIGHT:
            v = s.est(r, board, cnt)
            bt = 'dukkan' if r == 'dukkan' else E.P[r]['b']
            if bt == 'dukkan': v *= E.DM[region] / (sum(E.DM.values()) / 3)
            elif E.BONUS.get(region) == bt: v *= 1.25
            if v > bv: best, bv = r, v
        return best, bv

    def bid(s, c, region, val):
        role, v = val
        k = len([f for f in c.plots if f.owned]) + len(c.vacant)
        tax_h = s.ref[region] * TAX['aktif'] * (1 + 0.1 * k) * s.tax_scale / 7
        if c.kind == 'spekulator':
            tax_h = s.ref[region] * TAX['bos'] * (1 + 0.1 * k) * s.tax_scale / 7
            amount = s.ref[region] * 1.3 - tax_h * PAYBACK
            return amount if c.cash >= amount + BUFFER else 0
        if v <= 100: return 0
        horizon = PAYBACK * (1.5 if c.kind == 'grup' else 1)
        amount = (v - tax_h) * horizon - E.BCOST['fabrika']
        amount = min(amount, c.cash - E.BCOST['fabrika'] - BUFFER * c.size)
        return max(0.0, amount)

    def auction(s, day):
        new = s.rng.choices(list(REG_W), list(REG_W.values()), k=s.release)
        nres = round(len(new) * s.reserve + s.rng.random() - 0.5) if s.reserve else 0
        s.queue += [(r, i < nres) for i, r in enumerate(new)]
        left, won = [], set()
        vals = {r: s.plot_value(r) for r in REG_W}
        for region, res in s.queue:
            if res:  # yeni oyunculara ayrılmış arsa: satılmaz, sistemden kiralanır (başlangıç arsası gibi)
                elig = sorted((c for c in s.companies if c.kind == 'yeni' and 3 <= day - c.joined <= 15 and c.id not in won
                               and c.cash >= E.BCOST['fabrika'] + BUFFER and len(c.plots) < 2), key=lambda c: -c.cash)
                if elig:
                    c = elig[0]; won.add(c.id); c.bought += 1
                    s.build(c, vals[region][0], region, owned=False); s.land_log.append((day, region, 0.0, 'yeni-kira', True))
                    continue
                res = False
            elig = [c for c in s.companies if c.id not in won]
            bids = sorted(((s.bid(c, region, vals[region]), c) for c in elig), key=lambda x: -x[0])
            floor = max(0.5 * s.ref[region], s.base_floor * E.LAND[region])
            if not bids or bids[0][0] < floor: left.append((region, res)); continue
            amount, c = bids[0]
            price = max(floor, bids[1][0] if len(bids) > 1 else floor)
            c.cash -= price; s.money['arsa'] += price; c.land_paid += price; c.bought += 1; won.add(c.id)
            s.ref[region] = 0.8 * s.ref[region] + 0.2 * price
            s.land_log.append((day, region, price, c.kind, res))
            if c.kind == 'spekulator': c.vacant.append(region)
            else:
                # yeni kural: aynı bölgede 3. seviyede kârlı bir üretim işletmesi varsa arsaya genişleyip hat ekler
                cand = [f for f in c.plots if s.upgrades == 'yeni' and f.btype != 'dukkan' and f.region == region and f.level >= 3
                        and f.lines < 3 and len(f.hist) >= 3 and st.mean(f.hist[-3:]) > 0]
                if cand:
                    f = max(cand, key=lambda f: st.mean(f.hist[-3:]))
                    c.cash -= E.BCOST[f.btype]; s.money['insaat'] += E.BCOST[f.btype]; f.lines += 1; s.set_scale(f, 'yeni'); s.n_expand += 1
                else: s.build(c, vals[region][0], region, owned=True)
        s.queue = left[-10:]

    def company_wealth(s, c):
        w = c.cash
        for f in c.plots:
            w += sum(q * E.P[p]['ref'] * 0.75 for p, q in f.inv.items()) + 0.5 * E.BCOST[f.btype]
            if f.owned: w += s.ref[f.region]
            w += (f.lines - 1) * s.ref[f.region]
        return w + sum(s.ref[r] for r in c.vacant)

    def record(s, day):
        for c in s.companies:
            w = s.company_wealth(c); c.wealth_log.append((day, w))
            if c.w0 is not None: c.hist.append(w - c.w0)
            c.w0 = w

    def check(s):
        cash = sum(c.cash for c in s.companies); m = s.money
        exp = (s.cash0 + m['giris'] + m['tuketici'] + m['toptanci_alim'] + m['iade'] + m['arsa_iade'] - m['toptanci_satis']
               - m['uretim'] - m['tasima'] - m['kira'] - m['komisyon'] - m['insaat'] - m['vergi'] - m['arsa'])
        assert abs(cash - exp) < 1e-3 * max(1, abs(cash)), ('para korunumu', cash, exp)
        for p in E.PK:
            g = s.goods[p]; inv = sum(f.inv[p] for f in s.firms)
            exp = g['uretilen'] + g['basilan'] + g['yeniden_satis'] - g['recete'] - g['tuketici'] - g['toptanci_aldi'] - g['sisteme']
            assert abs(inv - exp) < 1e-6 * max(1, exp) + 1e-6, ('mal korunumu', p, inv, exp)
            assert all(f.inv[p] > -1e-6 for f in s.firms), ('negatif stok', p)


# ---- ölçüm ----
def growth(c, a, b):
    """Şirketin a..b günleri arasındaki ortalama günlük servet artışı, üye başına."""
    log = dict(c.wealth_log)
    if a not in log or b not in log: return None
    return (log[b] - log[a]) / (b - a) / c.size


def summarize(rs, A=10, B=None):
    B = B or rs[0].days
    out = {}
    win = lambda r, k: st.mean(d[k] for d in r.daily[A:B])
    out['kapsama'] = st.mean(win(r, 'coverage') for r in rs)
    out['durus'] = st.mean(win(r, 'halt') for r in rs)
    out['satilan_arsa'] = st.mean(len(r.land_log) for r in rs)
    out['arsa_fiyati_baslangica_gore'] = {g: round(st.mean(r.ref[g] / E.LAND[g] for r in rs), 2) for g in REG_W}
    out['isletme_sayisi_son'] = st.mean(len(r.firms) for r in rs)
    out['bos_arsa_son'] = st.mean(sum(len(c.vacant) for c in r.companies) for r in rs)
    out['vergi_tuketici_orani'] = st.mean(r.money['vergi'] / r.money['tuketici'] for r in rs)
    out['arsa_odemesi_tuketici_orani'] = st.mean(r.money['arsa'] / r.money['tuketici'] for r in rs)
    out['sisteme_satis'] = st.mean(r.money['arsa_iade'] for r in rs)
    kinds = defaultdict(list)
    for r in rs:
        for c in r.companies:
            if c.kind in ('normal', 'grup', 'tekel', 'spekulator'):
                g = growth(c, A, B)
                if g is not None: kinds[c.kind].append((g, c.bought, c.tax_paid / (B - A) / c.size, len(c.plots) + len(c.vacant)))
    for k, v in kinds.items():
        gs = sorted(x[0] for x in v)
        out[k] = dict(sirket=round(len(v) / len(rs), 1), gunluk_servet_artisi_uye_basina=round(st.mean(gs)), medyan=round(gs[len(gs) // 2]),
                      alinan_arsa=round(st.mean(x[1] for x in v), 2), gunluk_vergi_uye_basina=round(st.mean(x[2] for x in v)),
                      arsa_sayisi=round(st.mean(x[3] for x in v), 2))
    # yoğunlaşma: sahip olunan (satın alınmış) arsaların en büyük %10'luk şirkette payı
    shares = []
    for r in rs:
        held = sorted((sum(f.owned for f in c.plots) + len(c.vacant) for c in r.companies), reverse=True)
        tot = sum(held)
        if tot: shares.append(sum(held[:max(1, len(held) // 10)]) / tot)
    out['arsalarin_ilk_yuzde10_payi'] = round(st.mean(shares), 2) if shares else None
    # yeni oyuncular: ilk 10 günü, kurucu şirketlerin ilk 10 günüyle
    new, old, bought, under, same = [], [], [], [], []
    for r in rs:
        for c in r.companies:
            if c.kind == 'yeni':
                g = growth(c, c.joined, c.joined + 10)
                if g is not None: new.append(g); bought.append(c.bought > 0)
                w = dict(c.wealth_log).get(c.joined + 10)
                if w is not None: under.append(w < 0.5 * st.mean(r.ref.values()) + E.BCOST['fabrika'] + BUFFER)
            elif c.kind == 'normal':
                g = growth(c, 1, 11)
                if g is not None: old.append(g)
                g2 = growth(c, 20, 30)
                if g2 is not None: same.append(g2)
    if new:
        out['yeni_oyuncu'] = dict(sayi=round(len(new) / len(rs), 1), ilk10_gun_servet_artisi=round(st.mean(new)), kurucularin_ilk10_gunu=round(st.mean(old)), kurucularin_20_30_gunleri=round(st.mean(same)),
                                  arsa_alabilen_orani=round(st.mean(bought), 2), on_gunde_arsa_parasina_ulasamayan=round(st.mean(under), 2))
    return {k: (round(v, 3) if isinstance(v, float) else v) for k, v in out.items()}


SCENARIOS = {
    # 1) yeniden yatırım ve arsa piyasası
    'yatirim yok': dict(invest=False),
    'yatirim, vergi yok': dict(tax_scale=0.0),
    'yatirim, doküman vergisi': dict(tax_scale=1.0),
    'yatirim, vergi 2 kat': dict(tax_scale=2.0),
    # 2) boş arsa vergisi ve spekülasyon (60.000 kasalı spekülatör)
    'spekulator, vergi yok': dict(tax_scale=0.0, spec_cash=60000),
    'spekulator, doküman vergisi': dict(tax_scale=1.0, spec_cash=60000),
    'spekulator, vergi 2 kat': dict(tax_scale=2.0, spec_cash=60000),
    # 3) yeni oyuncular (10. günden itibaren her gün 1)
    'yeni oyuncu, vergi yok': dict(tax_scale=0.0, joiners=1.0),
    'yeni oyuncu, doküman vergisi': dict(tax_scale=1.0, joiners=1.0),
    'yeni oyuncu, talep oyuncu sayisiyla buyur': dict(tax_scale=1.0, joiners=1.0, demand_follows=True),
    'yeni oyuncu, arsa arzi yarim': dict(tax_scale=1.0, joiners=1.0, release=1),
    'yeni oyuncu, baslangic parasi arsa fiyatiyla buyur': dict(tax_scale=1.0, joiners=1.0, joiner_boost=True),
    'yeni oyuncu, arsalarin %30u yenilere kiralik': dict(tax_scale=1.0, joiners=1.0, reserve=0.3),
    'yeni oyuncu, ikisi birden': dict(tax_scale=1.0, joiners=1.0, joiner_boost=True, reserve=0.3),
    # 4) organize gruplar
    'grup (5 kisi), vergi yok': dict(tax_scale=0.0, group=5, joiners=1.0),
    'grup (5 kisi), doküman vergisi': dict(tax_scale=1.0, group=5, joiners=1.0),
    'celik tekeli, toptanci piyasayi izler': dict(monopoly=True),
    'celik tekeli, toptanci fiyati sabit': dict(monopoly=True, cap_wholesale=True),
    # 5) başlangıç koşulları
    'n=20, doküman vergisi': dict(n=20, joiners=0.4),
    'n=100, doküman vergisi': dict(n=100, joiners=2.0),
    'baslangic parasi 10.000': dict(start_cash=10000, joiners=1.0),
}


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--quick', action='store_true'); a = ap.parse_args()
    seeds = [1] if a.quick else [1, 2, 3, 4, 5]
    res = {'not': 'Basit karar kurallı şirketler; 40 oyun günü; ölçüm 10-40. günler. Toptancı B, takipçi yok, yaklaşık 13 dükkân.',
           'tohumlar': seeds, 'senaryolar': {}}
    for name, kw in SCENARIOS.items():
        rs = [World(seed=sd, **kw).run() for sd in seeds]
        res['senaryolar'][name] = v = summarize(rs)
        if 'tekel' in name:
            v['alet_kapsama'] = round(st.mean(r.goods['alet']['tuketici'] / (E.P['alet']['d'] * sum(E.DM.values()) * r.scale * r.days * 24) for r in rs), 3)
            v['celik_fiyati'] = round(st.mean(st.mean(d['price']['celik'] for d in r.daily[10:]) for r in rs), 2)
        print(name, json.dumps(v, ensure_ascii=False))
    json.dump(res, open(os.path.join(os.path.dirname(__file__), 'world_results.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('Korunum denetimleri: TAMAM (her koşuda para ve mal defteri tuttu)')


if __name__ == '__main__':
    main()
