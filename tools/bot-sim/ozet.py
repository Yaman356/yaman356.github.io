import json,glob,statistics as st,os
rows=[]
for f in sorted(glob.glob('sim/*.json')):
    d=json.load(open(f,encoding='utf-8'))
    if d['errs']: print(os.path.basename(f),'HATA',d['errs'][:3])
    o=d['out']; fin=[r['nw'][-1] for r in o]
    def md(x): return st.median(x)
    rk=[r['rankDay'] for r in o]
    def rday(k): v=[x.get(k) for x in rk if x.get(k)]; return f"{len(v)}/10 @{md(v):.0f}g" if v else '-'
    dd=[]
    for r in o:
        pk=0;m=0
        for v in r['nw']: pk=max(pk,v); m=max(m,1-v/pk)
        dd.append(m)
    print(f"{o[0]['strat']:15} med {md(fin)/1e6:8.1f}mn  min {min(fin)/1e6:8.1f} max {max(fin)/1e6:8.1f}  esnaf {rday('1'):10} tuccar {rday('2'):10} sanayici {rday('3'):10} fabrikator {rday('4'):10} maxDD {md(dd)*100:4.0f}% minKasa {md([r['minMoney'] for r in o])/1e6:6.2f} seasonEnd {[r.get('seasonEnd') for r in o][:2]} kredi {sum(r['loans'] for r in o)} ms {o[0]['ms']}")
