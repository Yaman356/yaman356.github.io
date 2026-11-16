"""Tezgâh denge testi: botları gerçek oyun kodu (demo/game.js) üzerinde başsız Chrome'da oynatır,
sonuçları özetler ve denge sınırlarını denetler. Bir sınır aşılırsa çıkış kodu 1 olur.

Kullanım:  python tools/bot-sim/run.py [--seeds 10] [--days 59] [--jobs 8] [--only akilli,buyume]
Çıktı:     tools/bot-sim/out/  (ham JSON, ozet.md, sonuc.csv)
"""
import argparse, concurrent.futures as cf, csv, json, math, os, pathlib, re, shutil, statistics as st, subprocess, sys, tempfile

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE / 'out'
STRATS = {
    'bos': 'Hiçbir şey yapmayan', 'mevduat': 'Bütün para mevduatta', 'dolar': 'Bütün para dolarda', 'altin': 'Bütün para altında',
    'borsa': '6 hisseye eşit dağıtıp bekleyen', 'olay': 'Gazete olayı avcısı', 'dukkan': 'Dükkân zinciri',
    'tarla_toptan': 'Tek tarla, toptancıya satış', 'tarla': 'Tek tarla, pazara ilan', 'tarla_mevduat': 'Tek tarla + mevduat',
    'az': 'Günde bir kez bakan büyüme', 'ilan': 'Tek tarla + ucuz ilan avcılığı', 'buyume': 'Saf büyüme',
    'kredi': 'Saf büyüme + kredi', 'akilli': 'Akıllı büyüme', 'akilli_kredi': 'Akıllı büyüme + kredi',
}
P0 = {'AUN': 48, 'YSU': 36, 'ETK': 22, 'DMC': 64, 'KMD': 31, 'PZM': 120}


def chrome():
    for c in [os.environ.get('CHROME'), r'C:\Program Files\Google\Chrome\Application\chrome.exe', r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
              shutil.which('google-chrome'), shutil.which('google-chrome-stable'), shutil.which('chromium'), shutil.which('chromium-browser'),
              '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']:
        if c and os.path.exists(c): return c
    sys.exit('Chrome bulunamadı; CHROME ortam değişkeniyle yolunu ver.')


def run_page(page, query, budget):
    url = (HERE / page).as_uri() + query
    with tempfile.TemporaryDirectory() as prof:
        cmd = [chrome(), '--headless=new', '--disable-gpu', '--no-sandbox', '--allow-file-access-from-files', f'--user-data-dir={prof}',
               f'--virtual-time-budget={budget}', '--dump-dom', url]
        r = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=1800)
    m = re.search(r'JSON:(\{.*\}):END', r.stdout, re.S)
    if not m: raise RuntimeError(f'{page}{query}: çıktı yok\n{r.stderr[-800:]}')
    return json.loads(m.group(1))


def annual(v0, v1, weeks): return (v1 / v0) ** (52 / weeks) - 1 if v0 > 0 and v1 > 0 else float('nan')


def market(data):
    """Bütün koşulardan haftalık (oyun günü) getiriler: yıllık getiri ve sezon sonu medyanı."""
    ser = {}
    for runs in data.values():
        for r in runs:
            S = {'TZ-30': [11843] + r['mkt']['idx'], 'Altın': r['mkt']['XAU'], 'Dolar': [50.37] + r['mkt']['USD']}
            for k, v in r['stk'].items(): S[k] = [P0[k]] + v
            for k, v in S.items(): ser.setdefault(k, []).append(v)
    out = {}
    for k, runs in ser.items():
        lr = [math.log(v[i + 1] / v[i]) for v in runs for i in range(len(v) - 1)]
        out[k] = {'yillik': math.exp(st.mean(lr) * 52) - 1, 'oynaklik': st.pstdev(lr) * math.sqrt(52), 'sezon': st.median(v[-1] / v[0] for v in runs) - 1}
    return out


def summarize(data):
    S = {}
    for k, runs in data.items():
        fin = sorted(r['nw'][-1] for r in runs)
        S[k] = {
            'med': st.median(fin), 'min': fin[0], 'max': fin[-1],
            'kilit': sum(1 for r in runs if r.get('negDays', 0) > 20),
            'eksi': sum(1 for r in runs if r.get('negDays', 0) > 0),
            'haciz': sum(r.get('plotDrop', 0) for r in runs),
            'sira': st.median(r.get('place') or 12 for r in runs),
            'npc': st.median(r.get('npcTop', 0) for r in runs),
            'fabrika': sum(1 for r in runs if 'fabrika' in r.get('build', '')),
            'gun': len(runs[0]['nw']),
        }
    return S


def checks(S, M, B, errs):
    """Denge sınırları: [ad, geçti mi, açıklama]."""
    c = []
    add = lambda name, ok, why: c.append((name, bool(ok), why))
    add('JavaScript hatası yok', not errs, '; '.join(errs[:3]) or 'hata yok')
    if 'buyume' in S: add('Vergi/borç kilidi yok', S['buyume']['kilit'] == 0, f"20 günden uzun eksi kasada kalan sezon: {S['buyume']['kilit']}")
    if 'buyume' in S: add('Büyüme botu ₺100 mn üstü', S['buyume']['med'] > 1e8, f"medyan ₺{S['buyume']['med'] / 1e6:.0f} mn")
    if 'kredi' in S: add('Kredi hacizleri sınırlı', S['kredi']['haciz'] <= 30, f"10 sezonda {S['kredi']['haciz']} haciz (sınır 30)")
    if 'olay' in S and 'borsa' in S: add('Haber avcılığı açığı yok', S['olay']['med'] <= S['borsa']['med'] * 1.5, f"olay ₺{S['olay']['med'] / 1e6:.1f} mn, borsa ₺{S['borsa']['med'] / 1e6:.1f} mn")
    if 'mevduat' in S:
        a = annual(2.5e6, S['mevduat']['med'], S['mevduat']['gun'])
        add('Mevduat yıllık %28–45', 0.28 <= a <= 0.45, f"yıllık %{a * 100:.0f}")
    if M:
        i = M['TZ-30']['yillik']; add('Endeks yıllık %20–80', 0.2 <= i <= 0.8, f"yıllık %{i * 100:.0f}")
        far = [k for k in P0 if M[k]['sezon'] > M['TZ-30']['sezon'] + 0.8]
        add('Hisseler endeksten kopmuyor', not far, ('kopan: ' + ', '.join(far)) if far else 'hepsi endeksin 80 puan yakınında')
        dep = annual(2.5e6, S['mevduat']['med'], S['mevduat']['gun']) if 'mevduat' in S else 0.36
        add('Endeks mevduattan fazla getiriyor', i > dep, f"endeks %{i * 100:.0f}, mevduat %{dep * 100:.0f}")
    if 'akilli' in S: add('Sanal rakipler ulaşılabilir', 1.2e8 <= S['akilli']['npc'] <= 4e8, f"en güçlü rakip medyan ₺{S['akilli']['npc'] / 1e6:.0f} mn")
    if 'akilli' in S: add('İyi oyuncu üst sıralarda', S['akilli']['sira'] <= 6, f"akıllı bot medyan {S['akilli']['sira']:.0f}. sıra")
    if 'tarla' in S: add('Sıradan oyuncu birinci olmuyor', S['tarla']['sira'] >= 5, f"tek tarla medyan {S['tarla']['sira']:.0f}. sıra")
    if 'akilli' in S: add('Fabrika yolu açık', S['akilli']['fabrika'] >= 5, f"akıllı bot 10 sezonun {S['akilli']['fabrika']}'inde fabrika kurdu (sınır 5)")
    if 'ilan' in S and 'tarla' in S: add('İlan avcılığı makul', S['ilan']['med'] <= S['tarla']['med'] * 1.4, f"ilan ₺{S['ilan']['med'] / 1e6:.0f} mn, tek tarla ₺{S['tarla']['med'] / 1e6:.0f} mn")
    if B:
        add('Bowling acemiye para basmıyor', B['acemi-Kolay']['EV'] <= 0.1, f"acemi–Kolay beklenen getiri %{B['acemi-Kolay']['EV'] * 100:.0f}")
        add('Bowling iyi oyuncuya sınırlı', B['iyi-Orta']['EV'] <= 0.8, f"iyi–Orta beklenen getiri %{B['iyi-Orta']['EV'] * 100:.0f} (günlük kazanç ayrıca %1 ile sınırlı)")
    return c


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--seeds', type=int, default=10); ap.add_argument('--days', type=int, default=59)
    ap.add_argument('--jobs', type=int, default=os.cpu_count() or 4); ap.add_argument('--only', default='')
    ap.add_argument('--no-bowling', action='store_true')
    a = ap.parse_args()
    names = [s for s in (a.only.split(',') if a.only else STRATS)]
    seeds = ','.join(str(i) for i in range(1, a.seeds + 1))
    OUT.mkdir(exist_ok=True)
    data, errs, B = {}, [], None
    with cf.ThreadPoolExecutor(a.jobs) as ex:
        fut = {ex.submit(run_page, 'botsim.html', f'?s={s}&seeds={seeds}&days={a.days}', 60_000_000): s for s in names}
        bf = None if a.no_bowling else ex.submit(run_page, 'bowling-ev.html', '', 30_000_000)
        for f in cf.as_completed(fut):
            s = fut[f]; d = f.result(); data[s] = d['out']; errs += d['errs']
            (OUT / f'{s}.json').write_text(json.dumps(d, ensure_ascii=False), encoding='utf-8')
            print(f'  {s:14} medyan ₺{st.median(r["nw"][-1] for r in d["out"]) / 1e6:8.1f} mn', flush=True)
        if bf: B = bf.result(); (OUT / 'bowling.json').write_text(json.dumps(B), encoding='utf-8')
    S = summarize(data); M = market(data) if 'mevduat' in data or len(data) > 3 else None
    C = checks(S, M, B, errs)
    with open(OUT / 'sonuc.csv', 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f); w.writerow(['strateji', 'ad', 'medyan', 'en_kotu', 'en_iyi', 'eksi_kasa_sezon', 'haciz', 'medyan_sira', 'fabrika_kuran_sezon'])
        for k in names: x = S[k]; w.writerow([k, STRATS.get(k, k), round(x['med']), round(x['min']), round(x['max']), x['eksi'], x['haciz'], x['sira'], x['fabrika']])
    md = ['# Tezgâh denge testi', '', f'{len(names)} strateji × {a.seeds} tohum × {a.days} oyun günü.', '', '## Denge sınırları', '', '| Durum | Sınır | Ölçüm |', '|---|---|---|']
    md += [f"| {'✅' if ok else '❌'} | {n} | {why} |" for n, ok, why in C]
    md += ['', '## Stratejiler', '', '| Bot | Medyan | En kötü–en iyi | Sıra | Eksi kasa | Haciz | Fabrika |', '|---|---|---|---|---|---|---|']
    md += [f"| {STRATS.get(k, k)} | ₺{S[k]['med'] / 1e6:.1f} mn | ₺{S[k]['min'] / 1e6:.1f}–{S[k]['max'] / 1e6:.1f} | {S[k]['sira']:.0f}. | {S[k]['eksi']} | {S[k]['haciz']} | {S[k]['fabrika']} |" for k in sorted(names, key=lambda k: S[k]['med'])]
    if M:
        md += ['', '## Piyasa', '', '| Varlık | Yıllık getiri | Yıllık oynaklık | Sezon sonu medyan |', '|---|---|---|---|']
        md += [f"| {k} | %{v['yillik'] * 100:.0f} | %{v['oynaklik'] * 100:.0f} | %{v['sezon'] * 100:.0f} |" for k, v in M.items()]
    if B:
        md += ['', '## Bowling (60 maç)', '', '| Atış / rakip | Galibiyet-mağlubiyet | Beklenen getiri |', '|---|---|---|']
        md += [f"| {k} | {v['W']}-{v['L']} | %{v['EV'] * 100:.0f} |" for k, v in B.items()]
    (OUT / 'ozet.md').write_text('\n'.join(md) + '\n', encoding='utf-8')
    if os.environ.get('GITHUB_STEP_SUMMARY'):
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a', encoding='utf-8') as f: f.write('\n'.join(md) + '\n')
    print('\n'.join(f"{'GEÇTİ' if ok else 'KALDI'}  {n}: {why}" for n, ok, why in C))
    bad = [n for n, ok, _ in C if not ok]
    if bad and not a.only: sys.exit(1)


if __name__ == '__main__':
    main()
