import json,glob,math,statistics as st
series={}
for f in glob.glob('sim/*.json'):
    for r in json.load(open(f,encoding='utf-8'))['out']:
        S={'TZ-30':[11843]+r['mkt']['idx'],'Altın':[None]+r['mkt']['XAU'],'Dolar':[50.37]+r['mkt']['USD'],'Euro':[55.6]+r['mkt']['EUR']}
        p0={'AUN':48,'YSU':36,'ETK':22,'DMC':64,'KMD':31,'PZM':120}
        for k,v in r['stk'].items(): S[k]=[p0[k]]+v
        for k,v in S.items(): series.setdefault(k,[]).append(v)
print(f"{'varlık':7} {'yıllık getiri(med)':>18} {'yıllık oynaklık':>15} {'haftalık min':>12} {'haftalık max':>12} {'kötü hafta<-%5':>14} {'sezon sonu med':>14} {'sezon sonu %10-%90':>20}")
out={}
for k,runs in series.items():
    rets=[];fins=[]
    for v in runs:
        v=[x for x in v if x is not None]
        lr=[math.log(v[i+1]/v[i]) for i in range(len(v)-1)]
        rets+=lr; fins.append(v[-1]/v[0])
    mu=st.mean(rets)*52; sd=st.pstdev(rets)*math.sqrt(52)
    fins.sort(); n=len(fins)
    bad=sum(1 for x in rets if x< -0.05)/len(rets)*52
    print(f"{k:7} {math.exp(mu)-1:18.0%} {sd:15.0%} {math.exp(min(rets))-1:12.1%} {math.exp(max(rets))-1:12.1%} {bad:11.1f}/yıl {st.median(fins)-1:14.0%} {fins[n//10]-1:9.0%} / {fins[n*9//10]-1:.0%}")
    out[k]=dict(mu=math.exp(mu)-1,vol=sd,wmin=math.exp(min(rets))-1,wmax=math.exp(max(rets))-1,bad=bad,fin=st.median(fins)-1,p10=fins[n//10]-1,p90=fins[n*9//10]-1)
json.dump(out,open('piyasa.json','w'))
# korelasyon endeks-altın, endeks-dolar
import itertools
def corr(a,b):
    ma,mb=st.mean(a),st.mean(b); return sum((x-ma)*(y-mb) for x,y in zip(a,b))/math.sqrt(sum((x-ma)**2 for x in a)*sum((y-mb)**2 for y in b))
def lrs(k):
    o=[]
    for v in series[k]:
        v=[x for x in v if x is not None]; o+= [math.log(v[i+1]/v[i]) for i in range(len(v)-1)]
    return o
i=lrs('TZ-30');
for k in ['Altın','Dolar','AUN','PZM','KMD']:
    a=lrs(k); m=min(len(a),len(i)); print('korelasyon TZ-30 ~',k, round(corr(i[:m] if k!='Altın' else i[:m],a[:m]),2))
