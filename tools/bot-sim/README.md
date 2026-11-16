# Bot simülasyonu

Botlar `demo/game.js`'i başsız Chrome'da, `window.__tezgah.dbg` üzerinden oynar.

```bash
chrome --headless=new --allow-file-access-from-files --virtual-time-budget=6000000 --dump-dom "file:///.../tools/bot-sim/botsim.html?s=akilli&seeds=1,2,3,4,5,6,7,8,9,10&days=59"
```

Çıktı `JSON:{...}:END` arasındadır; `sim/<strateji>.json` olarak kaydedip `python ozet.py` ve `python piyasa.py` ile özetlenir.
Stratejiler: bos, mevduat, dolar, altin, borsa, olay, dukkan, tarla, tarla_toptan, tarla_mevduat, az, ilan, buyume, kredi, akilli, akilli_kredi.
`bowling-ev.html` kulüp bahsinin beklenen getirisini ölçer.
Son sonuçlar: `tasarim/testler/bot-sezon-2026-11-16.csv`.
