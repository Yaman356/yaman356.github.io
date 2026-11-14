#!/usr/bin/env python3
"""Ar-Ge senaryoları: fire ve verimin rol getirilerine, fiyatlara ve arza etkisi.
Çalıştırma: python3 sim/rd_test.py   (sonuçlar sim/rd_results.json)"""
import json, statistics, sys, os
sys.path.insert(0, os.path.dirname(__file__))
import economy_sim as E

SEEDS = [1, 2, 3, 4, 5]
prod = lambda f: f.btype != 'dukkan'
SCEN = {
    'Ar-Ge yok (fire %10)': lambda f, r: 0,
    'tüm üreticiler seviye 5': lambda f, r: 5 if prod(f) else 0,
    'üreticilerin yarısı seviye 5': lambda f, r: (5 if r.random() < 0.5 else 0) if prod(f) else 0,
    'üreticilerin yarısı seviye 2': lambda f, r: (2 if r.random() < 0.5 else 0) if prod(f) else 0,
}

def run(rd, follow=False, dmult=1.0, shop_w=None):
    out = {}
    runs = []
    for sd in SEEDS:
        s = E.Sim(seed=sd, followers=0.0, wmode='B', fire=True, rd=rd, retail_follow=follow, shop_w=shop_w); s.dmult = dmult; runs.append(s.run())
    groups = {}
    for r in runs:
        for f in r.firms:
            key = E.ROLE_OF(f.role) + (f' (Ar-Ge {f.rd})' if prod(f) else '')
            groups.setdefault(key, []).append(statistics.mean(f.hist[20:30]))
    out['rol_getirisi'] = {k: round(statistics.mean(v)) for k, v in sorted(groups.items())}
    out['dukkan_sayisi'] = statistics.mean(sum(f.btype == 'dukkan' for f in r.firms) for r in runs)
    out['kapsama'] = statistics.mean(statistics.mean(d['coverage'] for d in r.daily[20:30]) for r in runs)
    out['fiyat_endeksi'] = {p: round(statistics.mean(statistics.mean(d['price'][p] for d in r.daily[20:30]) for r in runs), 2) for p in E.PK}
    out['ortalama_fiyat'] = statistics.mean(out['fiyat_endeksi'].values())
    out['tuketici_girisi_firma_gun'] = statistics.mean(r.money['tuketici'] / r.days / r.n for r in runs)
    out['toptanci_alim_firma_gun'] = statistics.mean(r.money['toptanci_alim'] / r.days / r.n for r in runs)
    return out

if __name__ == '__main__' and '--dengeli' in sys.argv:
    # Değerlendirme sonrası: dükkân sayısı dengelenmiş dağılımla (yaklaşık 13 dükkân) tekrar
    res = {k: run(v, shop_w=16) for k, v in SCEN.items()}
    json.dump(res, open(os.path.join(os.path.dirname(__file__), 'rd_balanced_results.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for k, v in res.items():
        print(f"{k:32s} dükkân {v['dukkan_sayisi']:.0f} kapsama %{v['kapsama']*100:.1f} ort.fiyat {v['ortalama_fiyat']:.2f}")
        print('   ', v['rol_getirisi'])
    sys.exit()
if __name__ == '__main__':
    res = {k: run(v) for k, v in SCEN.items()}
    res['tüm üreticiler seviye 5, talep %25 büyür'] = run(SCEN['tüm üreticiler seviye 5'], dmult=1.25)
    res['üreticilerin yarısı seviye 5, talep %12 büyür'] = run(SCEN['üreticilerin yarısı seviye 5'], dmult=1.12)
    for k in ['Ar-Ge yok (fire %10)', 'tüm üreticiler seviye 5']:
        res[k + ', perakende piyasaya bağlı'] = run(SCEN[k], True)
    json.dump(res, open(os.path.join(os.path.dirname(__file__), 'rd_results.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for k, v in res.items():
        print(f"{k:32s} kapsama %{v['kapsama']*100:.1f} ort.fiyat {v['ortalama_fiyat']:.2f} tüketici {v['tuketici_girisi_firma_gun']:.0f} topt.alım {v['toptanci_alim_firma_gun']:.0f}")
        print('   ', v['rol_getirisi'])
