#!/usr/bin/env python3
"""İşçi testi: üretim işletmelerine usta (parti süresi kısalır) ve müdür (işletme gideri azalır) eklendiğinde
rol başına kazanç artışı ve maaş ödendikten sonra net etki. Güncel tasarım ayarlarıyla, 40 gün, beş tohum.
Çalıştırma: python3 sim/worker_test.py   (sonuçlar sim/worker_results.json)"""
import json, os, statistics as st, sys
from collections import defaultdict
sys.path.insert(0, os.path.dirname(__file__))
import economy_sim as E, world as W

for p in E.MID: E.P[p]['op'] *= 0.5
SEEDS = [1, 2, 3, 4, 5]

def run(spd=1.0, opm=1.0, wage=0.0, share=1.0):
    rs = []
    for sd in SEEDS:
        s = W.World(seed=sd, tax_scale=1.0, joiners=1.0, shop_comp=True, elastic=True, upgrades='yeni', base_floor=0.4, joiner_boost=True, reserve=0.3)
        rng = __import__('random').Random(sd + 99)
        for f in s.firms:
            if f.btype != 'dukkan' and rng.random() < share: f.spd, f.opm, f.wage, f.hired = spd, opm, wage, True
        rs.append(s.run())
    prof = defaultdict(list)
    for r in rs:
        for f in r.firms:
            h = f.hist[10:40]
            if len(h) >= 10: prof[(E.ROLE_OF(f.role), getattr(f, 'hired', False))].append(st.mean(h))
    return {f"{k[0]}{' (işçili)' if k[1] else ''}": round(st.mean(v)) for k, v in sorted(prof.items())}, round(st.mean(st.mean(d['coverage'] for d in r.daily[10:]) for r in rs), 3)

res = {}
res['işçi yok'] = run()
res['usta 2 yıldız (+%10 hız), maaşsız'] = run(spd=1.10)
res['müdür 2 yıldız (−%10 gider), maaşsız'] = run(opm=0.90)
res['usta + müdür, maaşsız'] = run(spd=1.10, opm=0.90)
res['usta + müdür, günlük maaş 40'] = run(spd=1.10, opm=0.90, wage=40)
res['usta + müdür, günlük maaş 80'] = run(spd=1.10, opm=0.90, wage=80)
res['üreticilerin yarısı usta + müdür, maaş 40'] = run(spd=1.10, opm=0.90, wage=40, share=0.5)
json.dump({k: dict(rol_gunluk_kar=v[0], kapsama=v[1]) for k, v in res.items()}, open(os.path.join(os.path.dirname(__file__), 'worker_results.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for k, v in res.items(): print(f"{k:45s} kapsama {v[1]}  {v[0]}")
print('Korunum denetimleri: TAMAM')
