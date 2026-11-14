#!/usr/bin/env python3
"""Sektörler arası denge: çok arsalı modelde arsa başına günlük kâr ve yatırımın hangi sektöre gittiği,
perakende kat sayısının (raf fiyatı / toptan fiyat) farklı değerleriyle.
Çalıştırma: python3 sim/sector_balance.py   (sonuçlar sim/sector_balance_results.json)"""
import json, os, statistics as st, sys
from collections import defaultdict
sys.path.insert(0, os.path.dirname(__file__))
import economy_sim as E, world as W

def run(retail=1.6, seeds=(1, 2, 3, 4, 5), mid_op=1.0, **kw):
    E.RETAIL = retail
    base_op = {p: E.P[p]['op'] for p in E.MID}
    for p in E.MID: E.P[p]['op'] = base_op[p] * mid_op
    prof, loss, end, built, cov = defaultdict(list), defaultdict(list), defaultdict(int), defaultdict(int), []
    for sd in seeds:
        s = W.World(seed=sd, tax_scale=1.0, **kw).run()
        cov.append(st.mean(d['coverage'] for d in s.daily[10:]))
        for f in s.firms:
            r = E.ROLE_OF(f.role); end[r] += 1; built[r] += f.owned
            h = f.hist[10:40]
            if len(h) >= 10: prof[r].append(st.mean(h)); loss[r].append(sum(x < 0 for x in h) / len(h))
    for p in E.MID: E.P[p]['op'] = base_op[p]
    n = len(seeds)
    return dict(kapsama=round(st.mean(cov), 3), roller={r: dict(isletme=round(end[r] / n, 1), sonradan_kurulan=round(built[r] / n, 1),
                gunluk_kar=round(st.mean(prof[r])), medyan=round(sorted(prof[r])[len(prof[r]) // 2]), zararli_gun=round(st.mean(loss[r]), 2)) for r in prof})

SCEN = {f'perakende kat sayisi {rt}': dict(retail=rt) for rt in [1.6, 1.45, 1.3, 1.2]}
SCEN.update({
    'dukkanlar fiyat kirar': dict(shop_comp=True),
    'dukkan gideri 25/saat': dict(shop_op=25.0),
    'fiyat kirma + gider 25/saat': dict(shop_comp=True, shop_op=25.0),
    'fiyat kirma + gider 40/saat': dict(shop_comp=True, shop_op=40.0),
    'fiyat kirma + gider 10/saat': dict(shop_comp=True, shop_op=10.0),
    'fiyat kirma + ara mal gideri yari': dict(shop_comp=True, mid_op=0.5),
})
res = {}
for name, kw in SCEN.items():
    res[name] = v = run(**kw)
    print(f"{name:28s} kapsama {v['kapsama']}", {r: (x['gunluk_kar'], x['sonradan_kurulan'], x['zararli_gun']) for r, x in sorted(v['roller'].items())})
json.dump(res, open(os.path.join(os.path.dirname(__file__), 'sector_balance_results.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
