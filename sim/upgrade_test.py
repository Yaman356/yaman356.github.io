#!/usr/bin/env python3
"""Yükseltme kuralı karşılaştırması (çok arsalı model, güncel tasarım ayarlarıyla).
eski: her seviye yeni hat açar (seviye 3 = 3 hat x 10 birim).
yeni: her seviye partiyi büyütür (10/15/20 birim); 3. seviyeden sonra aynı bölgedeki yeni arsaya genişleyerek hat eklenir.
Güncel ayarlar: dükkânlar fiyat kırar, ara mal işletme gideri yarıya, doküman vergisi, her gün 1 yeni oyuncu.
Çalıştırma: python3 sim/upgrade_test.py   (sonuçlar sim/upgrade_results.json)"""
import json, os, statistics as st, sys
from collections import defaultdict
sys.path.insert(0, os.path.dirname(__file__))
import economy_sim as E, world as W

for p in E.MID: E.P[p]['op'] *= 0.5
SEEDS = [1, 2, 3, 4, 5]

def run(rule, **kw):
    rs = [W.World(seed=sd, tax_scale=1.0, joiners=1.0, shop_comp=True, upgrades=rule, **kw).run() for sd in SEEDS]
    v = W.summarize(rs)
    out = {k: v[k] for k in ['kapsama', 'durus', 'satilan_arsa', 'arsa_fiyati_baslangica_gore', 'arsa_odemesi_tuketici_orani', 'arsalarin_ilk_yuzde10_payi']}
    out['normal_sirket'] = v.get('normal'); out['yeni_oyuncu'] = v.get('yeni_oyuncu')
    out['yukseltme'] = st.mean(r.n_upgrades for r in rs); out['genisleme'] = st.mean(r.n_expand for r in rs)
    out['isletme_sayisi'] = st.mean(len(r.firms) for r in rs)
    cap, prof = defaultdict(float), defaultdict(list)
    for r in rs:
        for f in r.firms:
            role = E.ROLE_OF(f.role); cap[role] += f.m / len(rs)
            h = f.hist[10:40]
            if len(h) >= 10: prof[role].append(st.mean(h) / f.lines)
    out['uretim_olcegi_toplam'] = {k: round(v, 1) for k, v in cap.items()}
    out['arsa_basina_gunluk_kar'] = {k: round(st.mean(v)) for k, v in prof.items()}
    lv = [f.level for r in rs for f in r.firms if f.btype != 'dukkan']
    out['seviye_dagilimi'] = {l: round(lv.count(l) / len(lv), 2) for l in (1, 2, 3)}
    return out

res = {'yukseltme yok': run(None), 'eski kural (seviye = hat)': run('eski'), 'yeni kural (seviye = parti, hat = arsa)': run('yeni')}
res['yeni kural, arsa arzi 1,5 kat'] = run('yeni', release=3)
res['yeni kural, artirma tabani sabit degerin %60i'] = run('yeni', base_floor=0.6)
json.dump(res, open(os.path.join(os.path.dirname(__file__), 'upgrade_results.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for k, v in res.items():
    print(k); [print('   ', a, b) for a, b in v.items()]
print('Korunum denetimleri: TAMAM')
