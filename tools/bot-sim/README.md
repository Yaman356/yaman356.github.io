# Denge testi (bot simülasyonu)

Botlar `demo/game.js`'i başsız Chrome'da, oyunun düğmelerinin çağırdığı işlevlerle (`window.__tezgah.dbg`) oynar.
16 oyun tarzı (hiçbir şey yapmayan, mevduat, borsa, tek tarla, dükkân, büyüme, kredi, fabrika kuran akıllı bot…) her biri 10 sabit tohumla bir sezon (59 oyun günü) oynar; ayrıca kulüpteki bowling bahsinin beklenen getirisi ölçülür.

```bash
python tools/bot-sim/run.py
```

- `--seeds 3` daha hızlı ama daha kaba sonuç verir; `--only akilli,buyume` yalnızca seçilen botları koşar (bu durumda sınırlar uyarıdır, hata vermez).
- Chrome otomatik bulunur; bulunamazsa `CHROME` ortam değişkeniyle yolu verilir.
- Sonuçlar `tools/bot-sim/out/` altına yazılır: `ozet.md` (tablo ve sınırlar), `sonuc.csv`, her strateji için ham JSON.

## Otomasyon

`.github/workflows/denge-testi.yml` oyun kodu (`demo/game.js`, `demo/bowling.js`) ya da bu klasör her değiştiğinde ve her pazartesi testi GitHub'da koşar.
Sınırlardan biri aşılırsa iş kırmızı biter; özet tablo işin Summary sayfasında görünür.

## Denge sınırları

`run.py` içindeki `checks` işlevi: vergi/borç kilidi olmaması, kredi hacizlerinin sınırlı kalması, haber avcılığı ve ucuz ilan açıklarının kapalı olması,
mevduat %28–45 ve endeks %20–80 yıllık getiri, endeksin mevduattan fazla getirmesi, hisselerin endeksten kopmaması,
sanal rakiplerin ulaşılabilir olması (en güçlüsü ₺120–400 mn), iyi oyuncunun üst, sıradan oyuncunun alt sıralarda bitirmesi,
fabrika yolunun açık olması ve bowlingin para basmaması. Bir dengeyi bilerek değiştirirsen sınırı da burada güncelle.
