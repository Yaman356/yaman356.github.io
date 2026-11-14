#!/usr/bin/env python3
"""Arsa artırması taban fiyatı: kayan taban, sabit taban, karma taban ve yeni oyuncu destekleri.
Güncel tasarımın tamamıyla: yeni yükseltme kuralı, dükkân fiyat rekabeti, pahalı mal yavaş satılır,
ara mal işletme gideri yarıya, doküman vergisi, her gün 1 yeni oyuncu. 40 gün, beş tohum.
Çalıştırma: python3 sim/land_floor_test.py   (sonuçlar sim/land_floor_results.json)"""
import json, os, statistics as st, sys
sys.path.insert(0, os.path.dirname(__file__))
import economy_sim as E, world as W

for p in E.MID: E.P[p]['op'] *= 0.5
SEEDS = [1, 2, 3, 4, 5]
SCEN = {
    'kayan taban (güncel değerin %50si)': dict(),
    'sabit taban (başlangıç değerinin %60ı)': dict(base_floor=0.6),
    'karma taban (en az başlangıcın %40ı)': dict(base_floor=0.4),
    'karma taban + yeni oyuncu destekleri': dict(base_floor=0.4, joiner_boost=True, reserve=0.3),
    'kayan taban + yeni oyuncu destekleri': dict(joiner_boost=True, reserve=0.3),
}
res = {}
for name, kw in SCEN.items():
    rs = [W.World(seed=sd, tax_scale=1.0, joiners=1.0, shop_comp=True, elastic=True, upgrades='yeni', **kw).run() for sd in SEEDS]
    v = W.summarize(rs)
    res[name] = dict(kapsama=v['kapsama'], satilan_arsa=v['satilan_arsa'], arsa_fiyati=v['arsa_fiyati_baslangica_gore'],
                     arsa_odemesi_tuketici_orani=v['arsa_odemesi_tuketici_orani'], normal=v.get('normal'), yeni_oyuncu=v.get('yeni_oyuncu'),
                     yogunlasma=v['arsalarin_ilk_yuzde10_payi'])
    print(name); [print('   ', a, b) for a, b in res[name].items()]
json.dump(res, open(os.path.join(os.path.dirname(__file__), 'land_floor_results.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('Korunum denetimleri: TAMAM')
