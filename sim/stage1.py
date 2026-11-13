#!/usr/bin/env python3
"""Değerlendirme sonrası birinci test turu.
1) Rol getirisi: sermayeye göre getiri, risk ve kapasite kullanımı; dükkân sayısının etkisi.
2) Toptancı: acil stok kotası ve alım bütçesi ara seviyelerde.
3) Rol değişimi: takipçi oranı ince taramalı; geçiş gecikmesi ve geçiş ücreti ayrı ayrı.
Çalıştırma: python3 sim/stage1.py   (sonuçlar sim/stage1_results.json)"""
import json, os, statistics as st, sys
sys.path.insert(0, os.path.dirname(__file__))
import economy_sim as E

SEEDS = [1, 2, 3, 4, 5]
A, B = 10, 30  # ölçüm penceresi (gün): ilk 10 gün ısınma

def runs(**kw):
    return [E.Sim(seed=sd, **kw).run() for sd in SEEDS]

def roles(rs):
    g = {}
    for r in rs:
        for f in r.firms:
            if f.last_switch > 0: continue  # yalnızca rolünü hiç değiştirmemiş firmalar
            prof = f.hist[A:B]; cap = st.mean(f.capital[A:B])
            theo = (B - A) * 24 * 60 / E.P[f.prod]['t'] * 10 if f.prod else None
            g.setdefault(E.ROLE_OF(f.role), []).append(dict(
                kar=st.mean(prof), sermaye=cap, getiri=st.mean(prof) / cap * 100,
                oynaklik=st.pstdev(prof), zararli_gun=sum(1 for x in prof if x < 0) / len(prof),
                kapasite=(f.made / (30 * 24 * 60 / E.P[f.prod]['t'] * 10)) if f.prod else None))
    out = {}
    for k, v in sorted(g.items()):
        kars = sorted(x['kar'] for x in v)
        out[k] = dict(n=round(len(v) / len(SEEDS), 1), gunluk_kar=round(st.mean(kars)), p10=round(kars[len(kars) // 10]),
                      sermaye=round(st.mean(x['sermaye'] for x in v)), sermaye_getirisi_gunluk_yuzde=round(st.mean(x['getiri'] for x in v), 1),
                      oynaklik=round(st.mean(x['oynaklik'] for x in v)), zararli_gun_orani=round(st.mean(x['zararli_gun'] for x in v), 2),
                      kapasite_kullanimi=(round(st.mean(x['kapasite'] for x in v), 2) if v[0]['kapasite'] is not None else None))
    return out

def macro(rs):
    w = lambda r, k: st.mean(d[k] for d in r.daily[A:B])
    return dict(kapsama=round(st.mean(w(r, 'coverage') for r in rs), 3), durus=round(st.mean(w(r, 'halt') for r in rs), 3),
                toptanci_payi=round(st.mean(w(r, 'w_share') for r in rs), 3),
                toptanci_para_girisi_tuketiciye_orani=round(st.mean(r.money['toptanci_alim'] / r.money['tuketici'] for r in rs), 3),
                gecis=round(st.mean(r.switches for r in rs), 1))

res = {}
# 1) Rol getirisi
for sw in [None, 20, 30, 45]:
    rs = runs(followers=0.0, wmode='B', shop_w=sw)
    res[f'1 roller, dukkan agirligi={sw or 10}'] = dict(dukkan_sayisi=round(st.mean(sum(f.btype == 'dukkan' for f in r.firms) for r in rs), 1), **macro(rs), roller=roles(rs))
# 2) Toptancı
for qf in [0.05, 0.15, 0.30, 0.50, 1.00]:
    res[f'2a kota={qf} herkes fabrika'] = macro(runs(alloc='fabrika', followers=0.0, wmode='B', qf=qf))
    res[f'2a kota={qf} dengeli'] = macro(runs(followers=0.0, wmode='B', qf=qf))
for bf in [0.02, 0.05, 0.10, 0.25, 0.50]:
    rs = runs(followers=0.0, wmode='B', bf=bf, hook=E.shock_demand)
    res[f'2b alim butcesi={bf} talep yariya'] = dict(**macro(rs), ham_madde_kari=roles(rs).get('ham madde', {}).get('gunluk_kar'))
# 3) Rol değişimi
for fo in [0.0, 0.1, 0.2, 0.3, 0.4, 0.5]:
    res[f'3a takipci={fo}'] = macro(runs(followers=fo, wmode='B'))
for dl in [0, 12, 24, 48]:
    res[f'3b gecikme={dl}sa takipci=0.5'] = macro(runs(followers=0.5, wmode='B', switch_delay=dl))
for fee in [0.0, 0.1, 0.25, 0.5]:
    res[f'3c gecis ucreti={fee} takipci=0.5'] = macro(runs(followers=0.5, wmode='B', switch_fee=fee))

json.dump(res, open(os.path.join(os.path.dirname(__file__), 'stage1_results.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for k, v in res.items():
    print(k, {a: b for a, b in v.items() if a != 'roller'})
    for r, x in v.get('roller', {}).items(): print('    ', r, x)
print('Korunum denetimleri: TAMAM')
