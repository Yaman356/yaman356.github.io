# Tezgâh demosunun mevcut arayüzü: envanter ve sezgisel değerlendirme

Kapsam ve yöntem: Bu notlar yalnızca kaynak kodun okunmasına dayanır; oyun bir tarayıcıda çalıştırılmadı, ekran görüntüsü alınmadı. Kaynak gösterimi `dosya:satır` biçimindedir; bütün dosyalar `C:\Users\Yamanu\Desktop\ticarium\` altındadır (`demo/game.js`, `demo/style.css`, `demo/index.html`, `demo/map-pixi.js`, `demo/art.js`, `tasarim/oyun-tasarim-belgesi.md`). Piksel yükseklikleri CSS değerlerinden hesaplanmıştır (yazı boyutu × 1,45 satır yüksekliği + dolgu + kenarlık); gerçek cihazda ölçülmedi. "Çıkarım" başlığı altındaki her şey koddan türetilmiş ama gözle doğrulanmamış yorumdur.

Tasarım belgesinden bağlam: oynanışın çoğu "panel, liste ve form"dur ve bunlar bilinçli olarak HTML ile yapılmıştır; grafik isteyen tek yer haritadır ve PixiJS 8 ile çizilir; WebGL yoksa SVG haritaya dönülür (`tasarim/oyun-tasarim-belgesi.md:212-229`). 1× hızda 1 gerçek saniye = 15 oyun dakikası, bir oyun günü ≈ 96 sn (`tasarim/oyun-tasarim-belgesi.md:12-13`).

## 1. Ekran envanteri: HUD, 9 sekme, kartlar ve kontroller

### Takeaway
Arayüz tek sütunlu tek sayfadır: üstte dört satırlı yapışkan bir HUD (marka + para birimi + saat; kasa + hız; unvan çubuğu; 9 sekme), altında seçili sekmenin kartları. Orta oyunda Arsalar ve Pazar sekmelerinin her biri yaklaşık 65-75 etkileşimli öğe içerir; kartlar katlanmaz, süzülmez, sıralanmaz.

### Cited Findings

**Sayfa iskeleti**
- Kök yapı: `<header id="hud">`, `<main id="main">`, `<div id="toast" role="status" hidden>` — `demo/game.js:1457`
- Başka ekran, modal, çekmece, ayarlar sayfası ya da alt çubuk yoktur; `VIEWS` 9 görünümden ibarettir — `demo/game.js:1410-1411`

**HUD (yapışkan, 4 satır)** — `demo/game.js:1439-1444`, `demo/style.css:43`
- Satır 1 ("top"): solda marka `Tezgâh` + küçük `demo`; sağda para birimi `select` (seçenekler `₺ TRY`, `$ USD`, `€ EUR`; etiketi yalnızca ekran okuyucuya görünür: "Para birimi") ve saat. Saat biçimi: `Gün ${d} · ${mevsim} · ${SS}:00` (ör. "Gün 3 · İlkbahar · 08:00") — `demo/game.js:1440`, `demo/game.js:807`
- Satır 2 ("cash"): solda kasa (26 px, eksi ise kırmızı), varsa yanında "· teminatta ₺X"; sağda dört düğmeli hız grubu `Dur`, `1×`, `2×`, `4×` (`role="group" aria-label="Oyun hızı"`) — `demo/game.js:1441`
- Satır 3 ("rank"): `**Unvan** → Sonraki unvan · Sezon N, K. sıra` ve sağda `net değer / eşik`; altında 6 px ilerleme çubuğu (`role="progressbar"`) — `demo/game.js:1430-1436`
- Satır 4 ("tabs"): `<nav class="tabs">` içinde 9 düğme — `demo/game.js:1443`

**Sekmeler, sırasıyla** — `demo/game.js:1411`
1. `Arsalar` (plots) 2. `Pazar` (market) 3. `Şirket` (company) 4. `İşçiler` (crew) 5. `Yatırım` (invest) 6. `Artırma` (auction) 7. `Rekabet` (compete) 8. `Gazete` (news) 9. `Rapor` (report)

**1) Arsalar** — `demo/game.js:889-902`, `demo/game.js:812-887`
- (koşullu) "Sen yokken" kartı: gelir/gider tablosu, `Tamam` ve varsa `Gazeteyi aç` düğmeleri — `demo/game.js:904-913`
- Rehber kartı (7 adım, "Rehber · adım n/7", `Rehberi kapat` düğmesi) ya da rehber bittiyse hedef kutusu ("Sıradaki hedef n/7 · ödül ₺X" veya "Sıradaki unvan") — `demo/game.js:893-894`, `demo/game.js:1355-1368`
- Harita: bölge başına bir tuval, yatay kaydırmalı; altında ipucu: "Haritada bir binaya dokununca kartına gidersin. Ünlem işareti, binanın ilgilenilmesi gereken bir durumu olduğunu gösterir." — `demo/game.js:895-898`
- "Pazara ilan fiyatı" `select` (3 seçenek, ör. "olağanın %10 altı (%20 daha hızlı satar)") — `demo/game.js:899`
- Her arsa için bir kart (`plotCard`): başlık "Arsa N · Bölge", etiket `Kiralık`/`Senin`, bölge notu, arazi/kira/vergi satırı — `demo/game.js:814`
  - Boş arsa: "Bu arsaya ne kuracaksın?" + 2 sütunlu 4 seçim düğmesi (ikon, ad, fiyat, ipucu) — `demo/game.js:820-821`
  - Binalı arsa: bina adı/seviye, "Depo x/y", çalışan satırı, parti bilgisi; düğmeler `Kapasiteyi artır: parti N birim · ₺X` (üretim) ya da `Yükselt ₺X` (dükkân) ve `Yık (iade ₺X)` — `demo/game.js:826-832`
  - 3. seviyede: "Yeni hat için genişle" `select` + `Genişlet ₺X` — `demo/game.js:833-837`
  - Her üretim hattı: "Hat N" tarif `select`'i (seçenek metni girdileri ve makine bedelini de içerir), ilerleme çubuğu, üretim özeti, durum satırı, girdili tariflerde "Girdi bitince" `select`'i (4 seçenek) — `demo/game.js:838-841`
  - "Taşıma hedefi" `select` (başka binalı arsa varsa) — `demo/game.js:845`
  - Depodaki her ürün: ad + miktar ("20 × 100 kg (2 ton)"); üretim binasında "Üretim çıkınca" `select`; stok varsa `Toptancıya sat ₺X`, `Pazara ilan ver`, `Taşı` — `demo/game.js:846-853`, `demo/game.js:863-872`
  - Dükkânda her raf ürünü için `shopControls`: rakip özeti kutusu, "Fiyat kuralı" `select`, "En düşük fiyat" `select`, "Raf fiyatı (₺)" `input` (kural elle değilse `disabled`), "Stok azalınca" `select`, iki açıklama satırı; kart sonunda "Rafa ürün ekle" `select` — `demo/game.js:874-887`, `demo/game.js:855-859`
  - Başka binanın genişlemesi olan arsa: yalnızca açıklama, kontrol yok — `demo/game.js:815-818`

**2) Pazar** — `demo/game.js:915-929`
- Üst kart: "Teslim arsası" `select` + "Miktar (birim)" `input` (1-500'e sıkıştırılır) + açıklama — `demo/game.js:917`, `demo/game.js:765`
- (koşullu) "İlanlarım": ilan başına satır + `Geri çek`; "Satışlardan %3 komisyon kesilir." — `demo/game.js:918`
- 12 ürün kartı (`PK`): başlık + eğilim (▲/▼ %), yoğun bilgi satırı, "Sistem toptancısı" satırı + `Al`; her oyuncu ilanı için satır + `Al` ve altında "Pazarlık:" `%5 indirim iste`, `%10 indirim iste` — `demo/game.js:919-927`
- Ürün başına 1 ya da 2 sanal ilan üretilir (olasılık 0,6 ile 2) — `demo/game.js:562-566`

**3) Şirket** — `demo/game.js:1371-1407`
- "Sözleşmeler": etiket "güvenilirlik N"; etkin sözleşme başına ilerleme çubuğu, `Depodan teslim et`, onay kutusu "Ürün depoya girdikçe otomatik teslim et"; "Teklifler" altında en çok 3 teklif + `Kabul et` — `demo/game.js:1374-1383`
- "Banka kredisi": limit ve borç satırları, "Tutar (₺)" `input`, 3 vade satırı (4/8/13 hafta) her biri `Kredi çek`; mevcut krediler + `Erken kapat ₺X` — `demo/game.js:1385-1391`, `demo/game.js:1244`
- "Marka": bilinirlik çubuğu, 3 reklam satırı `Yayınla ₺X` — `demo/game.js:1393-1399`
- "Kalite ve Ar-Ge": 12 satırlı tablo, her satırda `Ar-Ge ₺X` — `demo/game.js:1400`
- "Vergi ve muhasebe": tablo + iki açıklama paragrafı, kontrol yok — `demo/game.js:1402-1405`

**4) İşçiler** — `demo/game.js:996-1011`
- Bilgi kartı (günlük maaş toplamı); "Çalışanların" (çalışan başına `Bırak`); açık her bölge için "X'deki adaylar" kartı: bölge başına 4 aday, uygun yuva varsa "Çalışacağı arsa" `select` + `İşe al` — `demo/game.js:998-1008`, `demo/game.js:256-258`

**5) Yatırım** — `demo/game.js:977-994`
- Özet kartı: "İşlem tutarı (₺)" `input`; "Vadeli mevduat" (`Yatır`, `Çek`, `Tümünü çek`); "Döviz ve altın" (USD, EUR, XAU); "Tezgâh Borsası" (6 hisse). Her varlıkta `Al`, elde varsa `Sat` ve `Tümünü sat` — `demo/game.js:983`, `demo/game.js:987-992`, `demo/game.js:355-362`

**6) Artırma** — `demo/game.js:931-953`
- Kartsız açıklama paragrafı; her açık artırma için kart (`Teklif ver ₺X`); `<h2>Arsalarını sat</h2>`; sahip olunan her arsa için döküm tablosu, "Depodaki mallar" `select`, `Sisteme sat ₺X`, boş arsada `Artırmaya çıkar` — `demo/game.js:933-950`

**7) Rekabet** — `demo/game.js:1136-1157`, `demo/game.js:1172-1187`
- "Sezon N" (12 satırlı sıralama tablosu), "Haftalık görevler" (3 görev, çubuklu), "Sektör hakimiyeti" (12 satır), "Holdingler" (3 satır; `Katıl`/`Ayrıl`), kooperatif kartı ("Kooperatif kur": "Adı" `input` + 3 `Kur`; kurulduysa üye listesi, `Davet et` düğmeleri, `Kooperatifi dağıt`), (koşullu) "Rozetlerin"

**8) Gazete** — `demo/game.js:955-960`
- (koşullu) "Gündem" kartı (etiketler "sürüyor"/"yarın başlıyor"); en çok 40 haber (`<article>`: "Gün N", başlık, gövde). Kontrol yok — `demo/game.js:218`

**9) Rapor** — `demo/game.js:962-973`
- Net değer kartı, "Bugün", "Dün", "Fiyatlar" (12 satır, mini grafikli), "Servet basamakları" (8 unvan), "Hedefler" (7), görsel/ikon lisans notu, en altta `Oyunu sıfırla`

**Orta oyun için etkileşimli öğe tahmini** (varsayım: 5 arsa = 4 ürünlü 1 dükkân + tek hatlı 2 tarla + tek hatlı 1 fabrika + 1 boş arsa; 12 ürün; 3 açık bölge; sayılar yukarıdaki satırlardaki şablonlardan sayıldı)

| Yer | Tahmini etkileşimli öğe | Nasıl sayıldı |
|---|---|---|
| HUD (her zaman) | 14 | 1 select + 4 hız + 9 sekme |
| Arsalar | ~65 DOM öğesi + haritada 5 dokunma hedefi | ilan fiyatı 1; boş arsa 4; tarla 2×8; fabrika 12; dükkân 32 (ürün başına 3 select + 1 input + 3 düğme) |
| Pazar | ~70-75 | 2 + ilanlarım ~2 + 12 toptancı `Al` + ~19 ilan × 3 (Al + 2 pazarlık) |
| Şirket | ~25 | 2 sözleşme × 2 + ~2 teklif + kredi 4-5 + reklam 3 + Ar-Ge 12 |
| İşçiler | ~14-26 | 2 `Bırak` + 12 aday × (select + düğme), uygunluğa bağlı |
| Yatırım | 11-31 | 1 input + 10 varlık × 1-3 düğme |
| Artırma | ~6-11 | artırma başına 1 + sahip olunan arsa başına 1-3 |
| Rekabet | ~7-13 | holding 3 + kooperatif 4 (kurulmadan) ya da 12'ye kadar davet + 1 |
| Gazete | 0 | |
| Rapor | 1 | yalnızca sıfırlama |

### Inferences
- Arsalar sekmesindeki bir dükkân kartı, 4 ürünle tek başına ~32 kontrol ve ürün başına 2 açıklama satırı taşır; bu sekme oyunun en yoğun ekranıdır ve arsa sayısıyla doğrusal büyür (kart şablonundan türetildi).
- Pazar sekmesinde süzgeç, arama ya da "yalnızca ihtiyacım olanlar" görünümü olmadığı için 12 kartın tamamı her zaman listelenir (`demo/game.js:919`).

### Gaps
- Gerçek sayfa yüksekliği (kaç ekran kaydırma gerektiği) ölçülmedi; tarayıcıda çalıştırma yapılmadı.
- Açık artırma sayısının tipik değeri `spawnAuction` mantığı ayrıntılı okunmadığı için kesin değil.

## 2. Gezinme modeli

### Takeaway
Gezinme yalnızca üstteki yapışkan HUD'un içindeki, yatay kaydırılabilen 9 sekmelik şeritle yapılır; alt gezinme, geri davranışı, URL/derin bağlantı ve sekme durumunun kalıcılığı yoktur. Tek derin bağlantı haritadan arsa kartına atlamadır; tek bildirim rozeti Gazete sekmesindedir.

### Cited Findings
- Sekme şeridi HUD'un son satırıdır; HUD `position: sticky; top: env(safe-area-inset-top)` — `demo/style.css:43`, `demo/game.js:1443`
- Şerit `overflow-x: auto`; düğmeler `flex: 1`, `white-space: nowrap`, yatay dolgu 4 px, aralık 2 px. Kaydırma göstergesi/kenar soluklaştırma tanımlı değil — `demo/style.css:54-55`
- Etkin sekme yalnızca `class="on"` ile (alt çizgi + renk) belirtilir; `aria-current`/`aria-selected` yok — `demo/game.js:1443`, `demo/style.css:56`
- Sekme değiştirme: `A.tab` yalnızca `ui.tab`'ı değiştirir; kaydırma konumuna dokunan kod yoktur (dosyadaki tek kaydırma çağrısı `focusCard` içindeki `scrollIntoView`) — `demo/game.js:627`, `demo/game.js:1450-1454`
- `ui` (seçili sekme dahil) kaydedilmez; kayıt yalnızca `s` nesnesidir, açılışta sekme `plots` olur — `demo/game.js:110`, `demo/game.js:152`
- `history`, `hashchange`, `popstate` kullanımı yok; olay bağlamaları yalnızca click, keydown, change, visibilitychange, pagehide — `demo/game.js:1464-1472`
- Haritadan karta: Pixi'de arsa kapsayıcısına `pointertap` → `focusFromMap` → `A.focus` (sekmeyi `plots` yapar) → `scrollIntoView({block:'start'})` + 1,2 sn `flash` çerçevesi — `demo/map-pixi.js:102-104`, `demo/game.js:801`, `demo/game.js:626`, `demo/game.js:1450-1454`, `demo/style.css:120`
- Diğer çapraz bağlantılar: "Sen yokken" kartındaki `Gazeteyi aç` düğmesi (`data-a="tab"`); bunun dışında kartlar arası bağlantı metinle anlatılır ("İşçiler sekmesinden alabilirsin", "Pazar sekmesinden mal al") ama tıklanabilir değildir — `demo/game.js:912`, `demo/game.js:828`, `demo/game.js:843`
- Rozet: yalnızca Gazete sekmesinde okunmamış sayısı (`aria-label="N yeni"`); sekme açılınca sıfırlanır — `demo/game.js:1443`, `demo/game.js:627`, `demo/style.css:95`
- Haritada uyarı: dikkat isteyen binanın iğnesi kehribar renkte "!" olur (raf boş, hat boşta vb.) — `demo/game.js:789-793`, `demo/map-pixi.js:101`, `demo/map-pixi.js:187-192`
- Haritadaki "SATIŞTA" etiketi (artırmadaki arsa) etkileşimli değildir; Artırma sekmesine götürmez — `demo/map-pixi.js:108-118`
- Harita bölgeleri yatay, `scroll-snap` ile kayan şerittedir; her bölge kutusu `flex: 0 0 88%`, en çok 360 px — `demo/style.css:103-104`

### Inferences
- Sekme etiketlerinin toplam genişliği 14 px yazıyla kabaca 500 px'tir (9 etiket ≈ 420 px + 72 px dolgu + 16 px aralık); 360-390 px genişlikte içerik alanı 328-358 px olduğundan şerit taşar ve son 2-3 sekme (Rekabet, Gazete, Rapor) ilk bakışta görünmez. Okunmamış rozetini taşıyan Gazete 8. sıradadır, yani rozet büyük olasılıkla ekran dışında kalır.
- `paint`, bir bölümün HTML'i değişince `innerHTML`'i baştan yazar (`demo/game.js:1422`); sekme değişiminde ya da rozet sayısı değişince `<nav>` yeniden oluşur, dolayısıyla şeridin yatay kaydırma konumu sıfırlanır. Sağdaki bir sekmeye (ör. Rapor) dokunulduğunda şerit başa döner ve etkin sekme görünmez kalabilir.
- Sekme değiştirildiğinde sayfa en üste dönmez; uzun bir sekmenin ortasından başka sekmeye geçen oyuncu yeni sekmenin ortasına düşer.
- `scrollIntoView({block:'start'})` yapışkan HUD'u hesaba katmaz (CSS'te `scroll-margin-top` yok); haritadan atlanan kartın üst kısmı (başlık satırı) yaklaşık 180 px yüksekliğindeki HUD'un altında kalır.
- Tarayıcının/Android'in geri tuşu sekmeler arasında değil sayfadan dışarı götürür (history kaydı yok).

### Gaps
- Şeridin gerçek cihazda kaç sekme gösterdiği ve kaydırma konumunun sıfırlanması tarayıcıda doğrulanmadı.

## 3. Geri bildirim: toast, gazete, onaylar, hatalar, devre dışı ve boş durumlar

### Takeaway
Geri bildirim iki kanaldan gelir: 2,2 saniyelik tek satırlık toast ve Gazete akışı. Yıkıcı işlemlerin yalnızca ikisi (oyunu sıfırla, kooperatifi dağıt) "tekrar dokun" ile onaylanır; yıkma, arsayı sisteme satma, işçi çıkarma, tüm stoku satma ve kredi çekme onaysız ve geri alınamaz çalışır. Düğmeler para yetmediğinde devre dışı kalmaz; hata dokunduktan sonra toast ile bildirilir.

### Cited Findings
- Toast: tek öğe, metin değişir, 2200 ms sonra gizlenir; yeni toast eskisinin yerini alır; kapatma düğmesi ve tür ayrımı (hata/başarı) yok — `demo/game.js:805`
- Toast konumu: altta ortada sabit, `bottom: 20px + safe-area`, koyu zemin (`--fg` üzerine `--bg`), `role="status"` — `demo/style.css:121`, `demo/game.js:1457`
- Gazete: `news(title, body, alert)` haberi listenin başına ekler (en çok 40), Gazete açık değilse `s.unread` artar, `alert` doğruysa başlık ayrıca toast olur — `demo/game.js:218`
- İki dokunuşlu onay: `Oyunu sıfırla` → etiketi "Emin misin? Tekrar dokun" olur, 4 sn içinde ikinci dokunuş sıfırlar — `demo/game.js:685`, `demo/game.js:971`
- Aynı desen `Kooperatifi dağıt` için — `demo/game.js:675`, `demo/game.js:1186`
- Onaysız yıkıcı/pahalı işlemler:
  - `Yık (iade ₺X)`: bina hemen yıkılır, işçiler çıkarılır; iade ilk yıkımda tam, sonra yarı — `demo/game.js:706-712`, `demo/game.js:832`
  - `Sisteme sat ₺X`: arsa, bina ve işçiler gider — `demo/game.js:734-742`, `demo/game.js:949`
  - `Bırak` (işçi çıkarma) — `demo/game.js:625`, `demo/game.js:999`
  - `Toptancıya sat ₺X`: o üründeki stokun tamamını satar, miktar seçimi yok — `demo/game.js:713`, `demo/game.js:852`
  - `Pazara ilan ver` ve `Taşı` da stokun tamamına uygulanır — `demo/game.js:714`, `demo/game.js:716-722`
  - `Tümünü sat`/`Tümünü çek`, `Kredi çek`, `Yayınla ₺X`, `Ar-Ge ₺X`, `Kur` (₺500 bin), `Ayrıl`, tarif değiştirme (eski makineler yarı fiyatına satılır) — `demo/game.js:677-683`, `demo/game.js:630-636`, `demo/game.js:649-653`, `demo/game.js:660-666`, `demo/game.js:676`, `demo/game.js:751-758`
- Hata mesajları (toast) örnekleri: "Para yetersiz" (en az 12 yerde, gereken tutar belirtilmez), "Önce depoyu boşalt", "Hedef depoda yer yok", "Önce binası olan bir hedef arsa seç", "Önce bir tutar yaz", "Önce kooperatife bir ad ver", "Raf dolu: dükkânı yükselt ya da satış görevlisi al", "Günde bir davet gönderebilirsin" — `demo/game.js:620-744`, `demo/game.js:764`
- Gereken tutarı söyleyen tek hata: "X makineleri için ₺Y gerekiyor" — `demo/game.js:754`
- Devre dışı durum: kodda `disabled` yalnızca fiyat kuralı elle değilken "Raf fiyatı" girişinde kullanılır; hiçbir düğme `disabled` olmaz — `demo/game.js:882`, `demo/style.css:99`
- Koşula göre gizlenen düğmeler: en yüksek teklif oyuncudaysa `Teklif ver` çıkmaz; 3 sözleşme doluysa `Kabul et` çıkmaz; elde varlık yoksa `Sat` çıkmaz — `demo/game.js:937`, `demo/game.js:1381`, `demo/game.js:983`
- Sessiz düzeltmeler: geçersiz raf fiyatı yok sayılır; miktar 1-500'e, tutarlar 0-1e12'ye sıkıştırılır; mesaj verilmez — `demo/game.js:759`, `demo/game.js:765`, `demo/game.js:770-773`
- Başarı geri bildirimi olmayan işlemler: `build`, `upgrade`, `sellw`, `list`, `move`, `bid`, `unlist` başarıda toast göstermez (durum değişimi karttan okunur) — `demo/game.js:686-733`
- Boş durum metinleri: "Raflar boş. Pazar sekmesinden mal al ya da kendi üretimini buraya taşı." / "Depo boş."; "yok · İşçiler sekmesinden alabilirsin"; "Şu an açık artırma yok. Yenisi gün başında açılır."; "Elinde yok"; "X'de bu işçiye uygun boş yuvan yok."; "Binaların boştaydı; para girişi ya da çıkışı olmadı."; "Limitin şu an kredi için yetersiz." — `demo/game.js:843`, `demo/game.js:828`, `demo/game.js:939`, `demo/game.js:982`, `demo/game.js:1005`, `demo/game.js:910`, `demo/game.js:1389`
- Boş durumu olmayan yerler: Gazete (haber ve gündem yoksa `main` boş kalır); Rapor'da "Bugün"/"Dün" tabloları satırsızken yalnızca "Net ₺0" gösterir — `demo/game.js:955-960`, `demo/game.js:964`
- Durum göstergeleri: hat durum satırı ("Üretiyor · parti gideri ₺X" ya da kehribar renkte neden, ör. "Girdi yok: …"), rakip kutusunda "En ucuz sensin"/"Rakip daha ucuz", süre azalınca `warn` rengi — `demo/game.js:840`, `demo/game.js:469`, `demo/game.js:878`, `demo/game.js:937`
- Çevrim dışı özet: 30 oyun dakikasından uzun yokluktan sonra "Sen yokken" kartı; yalnızca Arsalar görünümüne eklenir, Gazete sekmesi açılınca kapatılmış sayılır — `demo/game.js:164`, `demo/game.js:892`, `demo/game.js:627`

### Inferences
- İki dokunuşlu onayda ikinci dokunuş aynı konumdaki aynı düğmeye yapılır; çift dokunma kazayla onaylayabilir. Onay metni neyin kaybedileceğini söylemez.
- Oyuncu sekme arka plandayken başka bir sekmedeyse (ör. Pazar) geri döndüğünde "Sen yokken" kartını görmez; önce Gazete'ye giderse kart hiç gösterilmeden silinir.
- Toast 2,2 sn sabit olduğundan uzun haber başlıkları (ör. "Kredi taksiti ödenemedi") ve art arda gelen olaylar kaçabilir; ancak aynı bilgi Gazete'de kalır.

### Gaps
- Toast'un alt kenardaki içerikle çakışıp çakışmadığı görsel olarak doğrulanmadı.

## 4. Görsel sistem (style.css)

### Takeaway
Açık/koyu temalı, CSS değişkenli, 560 px en çok genişlikli tek sütun düzeni; gövde yazısı 15 px, ikincil metin 13 px. Hiçbir etkileşimli öğe 44 px'e ulaşmaz: düğmeler ~38 px, seçim/giriş alanları ~36 px, hız düğmeleri ~31 px, para birimi seçimi ~25 px, sekmeler ~43 px. Genişliğe bağlı medya sorgusu yoktur.

### Cited Findings
- Yazı tipleri: başlık `Bricolage Grotesque` (600/700), gövde `IBM Plex Sans` (400/500/600); Google Fonts'tan ağ üzerinden yüklenir, yedekleri sistem yazı tipleri — `demo/index.html:7`, `demo/style.css:8-9`
- Gövde `15px/1.45`; `h2` 18 px, `h3` 16 px, `.small` 13 px, `.tag` 12 px, `.badge` 11 px, `.brand` 20 px, `.cash` 26 px, `.goal b` 17 px; sayılarda `tabular-nums` — `demo/style.css:30-39`, `demo/style.css:44-45`, `demo/style.css:61-64`, `demo/style.css:95`
- Harita yazıları: SVG yedeğinde iğne 9 px, etiket 7 px, tabela 6 px; Pixi'de iğne metni 16 px, "SATIŞTA" 15 px (560 px'lik tuval ölçeğinde) — `demo/style.css:107-113`, `demo/map-pixi.js:112`, `demo/map-pixi.js:190`
- Açık tema renkleri: `--bg #eef3f0`, `--surface #ffffff`, `--fg #14211d`, `--muted #586a64`, `--line #d3ddd8`, `--accent #0b6e5c`, `--on-accent #ffffff`, `--amber #9a6510`, `--good #0f7a4d`, `--bad #b3372c`, `--soft #e1ebe7` — `demo/style.css:3-4`
- Koyu tema renkleri: `--bg #0e1513`, `--surface #17211e`, `--fg #e6efeb`, `--muted #94a69f`, `--line #283632`, `--accent #3fc4a5`, `--on-accent #06211b`, `--amber #e0a84a`, `--good #5fd39b`, `--bad #f08374`, `--soft #1f2c28` — `demo/style.css:13-14`
- Koyu tema `prefers-color-scheme: dark` ile (ve `data-theme="dark"` ile) etkinleşir; kodda `data-theme` atayan bir kontrol yoktur, yalnızca harita bu özniteliği okur — `demo/style.css:11-28`, `demo/map-pixi.js:203`
- Düzen: `#app` en çok 560 px, yan boşluk en az 16 px (güvenli alan destekli), alt boşluk 48 px; kartlar arası 12 px; kart dolgusu 14 px, köşe 10 px, iç aralık 10 px — `demo/style.css:32`, `demo/style.css:58-59`
- Güvenli alan: `viewport-fit=cover`, üst çentik için sabit şerit, toast ve yan boşluklarda `env(safe-area-inset-*)` — `demo/index.html:5`, `demo/style.css:31-32`, `demo/style.css:121`
- Medya sorguları: yalnızca `prefers-color-scheme: dark` ve `prefers-reduced-motion: reduce`; genişlik kırılımı yok — `demo/style.css:11`, `demo/style.css:122`
- Odak görünümü: `:focus-visible` için 2 px kehribar çerçeve — `demo/style.css:69`
- Hesaplanan dokunma hedefi yükseklikleri (yazı × 1,45 + dikey dolgu + kenarlık):
  - `.btn`: 14 px yazı, dolgu 8/12, kenarlık 1 → ≈ 38 px — `demo/style.css:66`
  - `select`, `input`: 14 px, dolgu 7/8, kenarlık 1 → ≈ 36 px; `input.price` genişliği 76 px — `demo/style.css:70-71`
  - Hız düğmeleri: 13 px, dolgu 6/10 → ≈ 31 px yükseklik — `demo/style.css:52`
  - Para birimi `select.cur`: 13 px, dolgu 2/4 → ≈ 25 px — `demo/style.css:124`
  - Sekme düğmeleri: 14 px, dolgu 10/4, alt çizgi 3 → ≈ 43 px yükseklik; genişlik etikete bağlı (yatay dolgu 4 px) — `demo/style.css:55`
  - Onay kutusu: tarayıcı varsayılan boyutu, etiketiyle birlikte tıklanır — `demo/style.css:132`, `demo/game.js:1378`
  - Bina seçim düğmeleri `.choice`: dolgu 10 px, 34 px ikon + 3 satır metin → 100 px üzeri — `demo/style.css:74`, `demo/game.js:821`
- Yan yana düğmeler arası boşluk `.row` için 10 px, pazarlık satırında 6 px — `demo/style.css:46`, `demo/style.css:133`
- Hesaplanan karşıtlık oranları (WCAG formülüyle, renk kodlarından): açık temada `--muted` beyaz üzerinde 5,74, `--bg` üzerinde 5,11, `--soft` üzerinde 4,71; `--amber` beyazda 4,95, `--soft` üzerinde 4,06; `--good` `--soft` üzerinde 4,41; rozet (`--bg` yazı, `--amber` zemin) 4,41; `--line` kenarlığı beyazda 1,39. Koyu temada bütün metin çiftleri 6,4 ve üzeri — `demo/style.css:3-4`, `demo/style.css:13-14`, `demo/style.css:95-96`

### Inferences
- HUD'un toplam yüksekliği yaklaşık 180 px'tir (10 px üst dolgu + ~29 + ~38 + ~37 + ~43 px satırlar + 3 × 8 px aralık); 667 px yüksekliğinde bir telefonda ekranın dörtte birinden fazlası sürekli HUD ile doludur.
- Giriş alanlarının yazı boyutu 14 px olduğu için iOS Safari odaklanınca sayfayı otomatik yakınlaştırır (16 px altındaki alanlarda bilinen davranış); kodda bunu engelleyen bir şey yok.
- 11 px rozet ve `--soft` zeminli kutulardaki 13 px kehribar/yeşil metin (4,06-4,41) küçük metin için 4,5:1 eşiğinin altında kalır.
- Kenarlık karşıtlığı (1,2-1,4) giriş alanı ve "ghost" olmayan kart sınırlarını zayıf gösterir; giriş alanları zemin rengiyle (`--bg`) ayrışır.
- Masaüstünde içerik 560 px'lik tek sütunda kalır; geniş ekran yerleşimi yoktur.

### Gaps
- Yazı tipleri yüklenemediğinde (çevrim dışı) yedek yazı tipiyle ölçülerin ne kadar değiştiği bilinmiyor.
- Gerçek dokunma hedefi ölçüleri cihazda doğrulanmadı.

## 5. Çizim (render) yaklaşımı ve kullanıcı deneyimine yan etkileri

### Takeaway
Bütün arayüz 250 ms'de bir HTML dizgesi olarak yeniden üretilir; `paint` yalnızca dizgesi değişen bölümlerin `innerHTML`'ini yeniler ve içinde odaklı `input`/`select` olan bölümü atlar. Bu, yazarken odağı korur ama düğme odağını, bölüm içi kaydırma konumlarını ve ekran okuyucu konumunu korumaz. Erişilebilirlik temeli (etiketler, `lang`, odak çerçevesi, azaltılmış hareket) vardır; sekme rolleri, klavye ile harita erişimi (Pixi kipinde) ve ilerleme çubuğu rolleri eksiktir.

### Cited Findings
- Döngü: `setInterval(…, 250)`; sayfa gizli değilse simülasyonu adımlar ve `render()` çağırır; her tıklama ve `change` olayından sonra da `render()` — `demo/game.js:1468-1471`
- `paint`: bölümler `data-k` anahtarıyla eşlenir; HTML dizgesi öncekiyle aynıysa DOM'a dokunulmaz; farklıysa `el.innerHTML = h`; anahtarı kalmayan bölüm silinir — `demo/game.js:1414-1428`
- Odak koruması: etkin öğe o bölümün içindeki `INPUT` ya da `SELECT` ise bölüm güncellenmez — `demo/game.js:1422`
- `change` işleyicisi değeri işledikten sonra `el.blur()` çağırır — `demo/game.js:1470`
- Metin girişleri yalnızca `change` olayında (odak çıkınca/Enter) işlenir; `input` olayı dinlenmez — `demo/game.js:1470`, `demo/game.js:750-774`
- Üretim ilerleme çubukları HTML'e yazılmaz; `data-prog` ile işaretlenip her çizimde genişliği doğrudan ayarlanır (kartı yeniden kurmadan), `width .25s linear` geçişiyle — `demo/game.js:840`, `demo/game.js:1447`, `demo/style.css:82`
- Pixi haritası sabit bir `data-pixi` kutusunda yaşar; model imzası (`JSON.stringify`) değişmedikçe sahne yeniden kurulmaz — `demo/game.js:896-897`, `demo/game.js:1446`, `demo/map-pixi.js:213-214`
- Kayıt: 8 sn'de bir, sayfa gizlenince ve `pagehide`'da `localStorage`'a — `demo/game.js:1464-1473`
- Erişilebilirlik öznitelikleri:
  - `<html lang="tr">` — `demo/index.html:2`
  - Her `select`/`input` için `label for` eşleşmesi (para biriminde `.sr` sınıfıyla gizli etiket); onay kutusu etiketle sarılı — `demo/game.js:835-899`, `demo/game.js:1440`, `demo/style.css:123`, `demo/game.js:1378`
  - Hız grubu `role="group" aria-label="Oyun hızı"`; etkin hız yalnızca sınıfla belirtilir (`aria-pressed` yok) — `demo/game.js:1441`
  - Unvan çubuğu `role="progressbar"` + `aria-valuenow/min/max`; diğer çubuklar (hat, görev, sezon, marka, kooperatif, sözleşme) rolsüz `<div class="bar">` — `demo/game.js:1435`, `demo/game.js:840`, `demo/game.js:1139`, `demo/game.js:1143`, `demo/game.js:1377`, `demo/game.js:1395`
  - Toast `role="status"`; rozet `aria-label="N yeni"`; mini grafikler ve ikonlar `aria-hidden="true"` — `demo/game.js:1457`, `demo/game.js:1443`, `demo/game.js:810`, `demo/art.js:26`
  - Kalite yıldızlarında `aria-label="n / 5"` var; işçi yıldızlarında yok — `demo/game.js:1408`, `demo/game.js:255`
  - Sekmeler düz `<button>`; `role="tablist"/"tab"`, `aria-selected`, `aria-current` yok; `<nav>` etiketsiz — `demo/game.js:1443`
  - Başlık yapısı: `h1` yok; kart başlıkları `h3`, tek `h2` "Arsalarını sat" — `demo/game.js:941`, `demo/style.css:33-35`
  - Tablolarda başlık satırı yok; `th` yalnızca toplam satırlarında kullanılır — `demo/game.js:908-910`, `demo/game.js:964`
- Klavye: bütün kontroller yerel `button`/`select`/`input`; SVG haritada arsalar `role="button" tabindex="0"` ve Enter/Boşluk ile çalışır; Pixi haritasında tuval `role="img"` + `aria-label="X haritası"`dır ve arsalar yalnızca işaretçiyle seçilir — `demo/art.js:256-257`, `demo/game.js:1469`, `demo/map-pixi.js:41`, `demo/map-pixi.js:54`, `demo/map-pixi.js:102-104`
- Azaltılmış hareket: CSS'te duman animasyonu, çubuk geçişi ve düğme basma efekti kapatılır; Pixi'de hareketli figürler/kamyon/duman sabitlenir; `scrollIntoView` anlık olur — `demo/style.css:122`, `demo/map-pixi.js:17`, `demo/map-pixi.js:97`, `demo/map-pixi.js:143`, `demo/map-pixi.js:154`, `demo/map-pixi.js:166`, `demo/game.js:1453`
- Harita tuvali `touch-action: pan-x pan-y` ve `autoPreventDefault = false` ile sayfa kaydırmasını engellemez — `demo/map-pixi.js:40-42`

### Inferences
- Arsa kartları stok ve durum metni içerdiğinden oyun akarken sık sık baştan yazılır; odak koruması yalnızca `INPUT|SELECT` için olduğundan klavyeyle bir düğmeye gelen kullanıcının odağı bir sonraki yeniden yazımda kaybolur. Sekme tuşuyla gezinme hareketli kartlarda fiilen kesilir; ekran okuyucu konumu da sıfırlanır.
- Basma ile bırakma arasında bölüm yeniden yazılırsa düğme öğesi değişir ve tıklama olayı düğmeye ulaşmayabilir; hareketli kartlarda ara sıra "dokundum ama olmadı" hissi doğabilir (tarayıcıda doğrulanmadı).
- Bir metin alanına yazıp doğrudan aynı bölümdeki düğmeye dokunma (kooperatif "Adı" → `Kur`; "Tutar" → `Kredi çek`) riskli bir sıradır: önce `change` çalışır, bölüm yeniden yazılır, dokunulan düğme yok olur; ilk dokunuş boşa gidebilir (`demo/game.js:1176-1177`, `demo/game.js:1388-1389`). Tarayıcıda doğrulanmadı.
- Bir `select` odaktayken bütün bölümü donar: para birimi seçimi açıkken HUD'un saat satırı, bir arsa kartındaki seçim açıkken o kartın stok bilgisi güncellenmez. Seçim sonrası `blur()` bunu kısa tutar ama klavye kullanıcısının odağını da düşürür.
- `.scroll` içindeki yatay kaydırılan tablolar (Fiyatlar, Sektör hakimiyeti, Kalite) ve sekme şeridi, HTML'leri değiştiğinde kaydırma konumunu yitirir.
- Pixi kipi (varsayılan) klavye ve ekran okuyucu kullanıcıları için haritayı tek bir resme indirger; arsa kartları yine de sayfada olduğundan işlev kaybı yok, yalnızca kısayol kaybı var.

### Gaps
- Kayıp dokunuş ve odak kaybı senaryoları yalnızca kod okumasına dayanır; gerçek tarayıcı/cihaz testi gerekir.
- Ekran okuyucuyla (TalkBack/VoiceOver) deneme yapılmadı.

## 6. Metin ve terminoloji

### Takeaway
Dil tutarlı biçimde sen'li, sade Türkçedir ve sayı biçimleri Türkçe yerel ayarla yazılır; ancak kartların çoğu kural açıklayan uzun, kalıcı paragraflar taşır, aynı kavram için birden çok ad kullanılır ("olağan fiyat"/"piyasa fiyatı", "toptancı"/"sistem") ve "oyun günü = hafta" eşlemesi kredi kartında aynı satırda iki birimle görünür.

### Cited Findings
- Sayı yardımcıları:
  - `fmt`: simge + tutar; 1 milyon ve üzeri "₺2,5 mn", 1 milyar ve üzeri "₺1,2 mlr" (en çok 2 ondalık), altı tam sayı ve binlik ayraçlı; eksi için "−" işareti — `demo/game.js:129`
  - `fmt1`: 100'ün altında 2 ondalık, üstünde ondalıksız (birim fiyatlar) — `demo/game.js:130`
  - `qtyTxt`: birim sayısını gerçek miktara çevirir ("48 × 100 kg" → "4,8 ton", "12 × 1.000 adet" → "12.000 adet") — `demo/game.js:196-202`
  - `durTxt`: "30 dk", "1,5 sa" — `demo/game.js:203`
  - Yüzdeler Türkçe yazımla "%5"; eğilim "▲ %12" / "▼ %8" / "olağan" — `demo/game.js:809`
  - Para birimi seçimi bütün tutarları ₺/$/€ olarak yeniden gösterir — `demo/game.js:125-128`
- Stok satırı iki gösterimi birlikte verir: "20 × 100 kg (2 ton)" — `demo/game.js:848`
- Pazar'daki "Miktar (birim)" alanında birim ürüne göre değişir (100 kg, ton, 1.000 adet, 100 m) — `demo/game.js:917`, `demo/game.js:10-21`
- Uzun açıklama paragrafları (her zaman görünür, katlanmaz):
  - Artırma girişi, 4 cümle — `demo/game.js:933`
  - Sözleşmeler açıklaması, 4 cümle — `demo/game.js:1374`
  - Banka kredisi açıklaması, 4 cümle ve 4 sayı — `demo/game.js:1386`
  - Vergi kartında art arda iki paragraf (KDV oranları dahil) — `demo/game.js:1404-1405`
  - Kooperatif kur, Holdingler, Marka, Kalite ve Ar-Ge, Servet basamakları, Yatırım özeti açıklamaları — `demo/game.js:1175`, `demo/game.js:1149`, `demo/game.js:1396`, `demo/game.js:1400`, `demo/game.js:968`, `demo/game.js:989`
- Yoğun sayı satırları:
  - Pazar ürün alt satırı: olağan fiyat, yük sınıfı, 1. seviye bina üretimi, girdiler, makine bedeli ve bina bedeli tek satırda — `demo/game.js:921`
  - Arsa kartı üst satırı: büyüklük, birim fiyat, değer, günlük emlak vergisi — `demo/game.js:814`, `demo/game.js:42`
  - Dükkân ürününde arka arkaya: rakip en ucuz/ortalama, piyasa konumu ve alım hızı, birim maliyet ve saatlik satış — `demo/game.js:878-886`
  - Tarif seçeneği metni: "Un ← 1,4 ton buğday · makineler ₺6 mn" biçiminde — `demo/game.js:839`
- Terim tutarsızlıkları:
  - "Olağan fiyat" (Pazar kartı, ilan fiyatı seçimi, "Olağan fiyata kadar al") ile "piyasa fiyatı" ("Pazara koy: piyasa fiyatı", sözleşmede "piyasa ₺X") aynı değeri (`price(p)`) anlatır — `demo/game.js:921`, `demo/game.js:899`, `demo/game.js:840`, `demo/game.js:867`, `demo/game.js:1381`
  - Dükkân kartındaki "(piyasa fiyatı ₺X)" ise farklı bir değerdir: perakende referansı (`price × 1,35`) — `demo/game.js:885`, `demo/game.js:178`
  - Aynı karşı taraf için "Sistem toptancısı", "Toptancıya sat", "Sisteme sat", "Sisteme bırak" — `demo/game.js:921`, `demo/game.js:852`, `demo/game.js:949`, `demo/game.js:948`
  - Aynı eylem (seviye atlatma) üretim binasında "Kapasiteyi artır: parti N birim · ₺X", dükkânda "Yükselt ₺X" — `demo/game.js:831`
  - İşçi çıkarma düğmesi "Bırak", toast "işten çıkarıldı" — `demo/game.js:999`, `demo/game.js:625`
  - "Çek" üç anlamda: "Geri çek" (ilanı), "Çek"/"Tümünü çek" (mevduat), "Kredi çek" — `demo/game.js:918`, `demo/game.js:990`, `demo/game.js:1389`
  - HUD'da hem "mevsim" (saat satırı: İlkbahar…) hem "Sezon N" (unvan satırı) birlikte görünür; ikisi farklı döngülerdir (13 gün ve 60 gün) — `demo/game.js:807`, `demo/game.js:1432`, `demo/game.js:1016`, `demo/game.js:1199`
  - Kredi kartında vade "n hafta", taksit "₺X/gün", açıklamada "her oyun günü (bir hafta)" — `demo/game.js:1386`, `demo/game.js:1389`
- Jargon: "teminat", "tapu harcı", "stopaj", "amortisman", "devreden zarar", "KDV", "kurumlar vergisi", "temettü verimi", "alış-satış farkı", "kur farkı", "ortakçılık usulü", "kütlü" — `demo/game.js:933`, `demo/game.js:990`, `demo/game.js:1403-1405`, `demo/game.js:979-980`, `demo/game.js:814`, `demo/game.js:12`
- Rehber metinleri kısa ve eylem odaklıdır (ör. "Arsa 1'e bir tarla kur"), kontrol adlarını tırnak içinde aynen anar ("Toptancıya sat", "Üretim çıkınca") — `demo/game.js:1355-1363`
- Etiketlerde durum sonucu doğrudan yazılır: "Yık (iade ₺X)", "Teklif ver ₺X", "Erken kapat ₺X", "Sisteme sat ₺X" — `demo/game.js:832`, `demo/game.js:937`, `demo/game.js:1390`, `demo/game.js:949`

### Inferences
- "Piyasa fiyatı" sözünün dükkânda perakende, başka her yerde toptan değeri göstermesi, fiyat kararı veren oyuncuyu yanıltabilecek tek gerçek anlam çakışmasıdır.
- Kural açıklamalarının her kartta sürekli görünmesi ilk oturumda yardımcıdır, ama deneyimli oyuncu için kaydırma mesafesini kalıcı olarak uzatır; gizleme/katlama düzeneği yoktur.

### Gaps
- Metinlerin gerçek ekranda kaç satır tuttuğu ölçülmedi.

## 7. Sezgisel değerlendirme (Nielsen'in 10 ilkesi ve mobil temeller)

### Takeaway
En ciddi sorunlar: (1) pahalı/yıkıcı işlemlerin onaysız ve geri alınamaz olması, (2) bütün dokunma hedeflerinin 44 px altında kalması ve ana gezinmenin ekranın üstünde, kaydırılan 9 sekmelik şeritte olması, (3) tek bildirim rozetinin büyük olasılıkla ekran dışında kalması, (4) orta oyunda sekme başına 65-75 kontrol ve süzgeçsiz uzun listeler. Güçlü yanlar: sürekli görünen durum bilgisi, sonuçları önceden söyleyen düğme etiketleri, etiketli form alanları, otomasyon seçenekleri, çevrim dışı özet ve azaltılmış hareket desteği.

### Cited Findings

**Sorunlar** (önem: yüksek / orta / düşük)

| # | İlke | Sorun | Kaynak | Önem |
|---|---|---|---|---|
| 1 | Hata önleme; kullanıcı denetimi | `Yık`, `Sisteme sat`, `Bırak`, `Toptancıya sat` (tüm stok), `Tümünü sat`, `Kredi çek`, `Yayınla`, `Ar-Ge`, `Kur`, `Ayrıl` tek dokunuşla ve onaysız çalışır; geri alma yok | `demo/game.js:706-712`, `demo/game.js:734-742`, `demo/game.js:625`, `demo/game.js:713`, `demo/game.js:630-653`, `demo/game.js:676` | yüksek |
| 2 | Tutarlılık | Onay yalnızca iki işlemde var (sıfırla, kooperatifi dağıt); benzer ağırlıktaki yıkma ve arsa satışında yok | `demo/game.js:685`, `demo/game.js:675`, `demo/game.js:706` | yüksek |
| 3 | Hata önleme | Tarif değiştirmek eski makineleri yarı fiyatına satar; bu, seçim kutusunda bir değer seçmekle anında olur, uyarı yok | `demo/game.js:751-758` | yüksek |
| 4 | Mobil: dokunma hedefi | `.btn` ≈ 38 px, `select`/`input` ≈ 36 px, hız düğmeleri ≈ 31 px, para birimi ≈ 25 px, sekmeler ≈ 43 px; hiçbiri 44-48 px'e ulaşmaz | `demo/style.css:52`, `demo/style.css:55`, `demo/style.css:66`, `demo/style.css:70`, `demo/style.css:124` | yüksek |
| 5 | Mobil: yan yana hedefler | Pazar'da her ilan için `Al` + iki pazarlık düğmesi 6-10 px aralıkla dizilir; `Toptancıya sat`/`Pazara ilan ver`/`Taşı` yan yana ve üçü de geri alınamaz | `demo/game.js:924`, `demo/game.js:852`, `demo/style.css:46`, `demo/style.css:133` | yüksek |
| 6 | Mobil: başparmak erişimi | Sekmeler ve hız denetimi ekranın en üstünde; alt gezinme yok; alt kenarda yalnızca toast var | `demo/style.css:43`, `demo/game.js:1439-1444`, `demo/style.css:121` | yüksek |
| 7 | Sistem durumunun görünürlüğü | Tek rozet Gazete sekmesinde; artırmada geçilme, sözleşme süresi, boşta hat gibi durumlar için sekme rozeti yok (yalnızca toast, haber ve haritadaki "!") | `demo/game.js:1443`, `demo/game.js:507`, `demo/game.js:789-793` | orta |
| 8 | Hata önleme; durum görünürlüğü | Para yetmeyen düğmeler devre dışı kalmaz; "Para yetersiz" gereken tutarı ya da eksiği söylemez. Başlangıçta 4 bina seçeneğinin ikisi alınamaz ama aynı görünür | `demo/game.js:688`, `demo/game.js:821`, `tasarim/oyun-tasarim-belgesi.md:26` | orta |
| 9 | Hata iletileri | Hata, başarı ve bilgi aynı görünümlü, 2,2 sn'lik toast ile verilir; süre mesaj uzunluğuna göre değişmez | `demo/game.js:805`, `demo/style.css:121` | orta |
| 10 | Durum görünürlüğü | Geçersiz fiyat ve sınır dışı miktar sessizce yok sayılır ya da sıkıştırılır | `demo/game.js:759`, `demo/game.js:765` | orta |
| 11 | Durum görünürlüğü | `build`, `upgrade`, `sellw`, `list`, `move`, `bid` başarıda açık bir geri bildirim vermez | `demo/game.js:686-733` | düşük |
| 12 | Esneklik ve verim; sadelik | Arsa ve ürün kartları katlanmaz, sıralanmaz, süzülmez; Pazar her zaman 12 kartı ve bütün ilanları gösterir | `demo/game.js:900`, `demo/game.js:919` | yüksek |
| 13 | Sadelik; mobil yoğunluk | Bir dükkân ürünü 4 form alanı + 3 düğme + 4 bilgi satırı taşır; 4 ürünlü dükkân kartında ~32 kontrol | `demo/game.js:874-887`, `demo/game.js:846-853` | yüksek |
| 14 | Sadelik | Kural açıklamaları her kartta kalıcıdır; Vergi kartında art arda iki paragraf | `demo/game.js:1404-1405`, `demo/game.js:933`, `demo/game.js:1386` | orta |
| 15 | Esneklik | Toplu işlem yok: her ürün ve her arsa için satış/taşıma tek tek; stokun bir kısmını satma/taşıma seçeneği yok | `demo/game.js:713-722` | orta |
| 16 | Tutarlılık | "Olağan fiyat"/"piyasa fiyatı" aynı değeri, dükkândaki "piyasa fiyatı" farklı değeri gösterir | `demo/game.js:921`, `demo/game.js:867`, `demo/game.js:885` | orta |
| 17 | Tutarlılık | "Yükselt"/"Kapasiteyi artır", "Bırak"/"işten çıkarıldı", "Toptancı"/"Sistem" çift adlandırmaları | `demo/game.js:831`, `demo/game.js:999`, `demo/game.js:625`, `demo/game.js:949` | düşük |
| 18 | Gerçek dünyayla uyum | Kredi satırında "n hafta vade" ile "taksit ₺X/gün" yan yana; "oyun günü (bir hafta)" açıklaması gerekir | `demo/game.js:1386-1389` | orta |
| 19 | Gerçek dünyayla uyum | "Miktar (birim)": birimin ne olduğu ürüne göre değişir ve alanın yanında yazmaz | `demo/game.js:917` | orta |
| 20 | Tutarlılık; görsel | Kooperatif "Adı" alanı fiyat alanının sınıfını kullanır: 76 px genişlik, sağa yaslı; 28 karakterlik ad ve "ör. Yeşilova Üreticileri" yer tutucusu için dar | `demo/game.js:1176`, `demo/style.css:71` | orta |
| 21 | Yardım ve belgeler | `Rehberi kapat` kalıcıdır; rehberi yeniden açan bir denetim yok. Sözlük ya da yardım ekranı yok | `demo/game.js:629`, `demo/game.js:1364-1368` | orta |
| 22 | Kullanıcı denetimi | `Oyunu sıfırla` Rapor'un en altında, lisans notunun altında; ayarlar ekranı yok. Tema için oyun içi seçim yok | `demo/game.js:970-971`, `demo/style.css:21` | düşük |
| 23 | Durum görünürlüğü | "Sen yokken" kartı yalnızca Arsalar'da çizilir; Gazete açılınca görülmeden silinebilir | `demo/game.js:892`, `demo/game.js:627` | orta |
| 24 | Erişilebilirlik | Sekmelerde `aria-current`/`aria-selected`, hız düğmelerinde `aria-pressed` yok; etkinlik yalnızca renk ve alt çizgiyle | `demo/game.js:1441`, `demo/game.js:1443` | orta |
| 25 | Erişilebilirlik | Pixi haritasında arsalar klavye/ekran okuyucuyla seçilemez (SVG yedeğinde seçilebilir) | `demo/map-pixi.js:41`, `demo/map-pixi.js:102-104`, `demo/art.js:256` | orta |
| 26 | Erişilebilirlik | Unvan çubuğu dışındaki ilerleme çubuklarında rol/değer yok; işçi yıldızlarında metin karşılığı yok; `h1` yok | `demo/game.js:840`, `demo/game.js:255`, `demo/game.js:1435` | düşük |
| 27 | Erişilebilirlik | Düğme odağı yeniden çizimde korunmaz (koruma yalnızca `INPUT|SELECT`) | `demo/game.js:1422` | orta |
| 28 | Görsel | 11 px rozet ve `--soft` zeminli 13 px kehribar/yeşil metin 4,06-4,41 karşıtlıkta | `demo/style.css:95-96`, `demo/style.css:3-4` | düşük |
| 29 | Mobil: uyarlanırlık | Genişlik kırılımı yok; bina seçimleri her genişlikte 2 sütun; masaüstünde 560 px tek sütun | `demo/style.css:32`, `demo/style.css:73` | düşük |
| 30 | Gezinme | Geri tuşu/URL desteği yok; seçili sekme kaydedilmez | `demo/game.js:110`, `demo/game.js:1464-1472` | düşük |
| 31 | Gezinme | Haritadaki "SATIŞTA" etiketi Artırma sekmesine bağlanmaz; metinlerde anılan sekmeler ("İşçiler sekmesinden…") bağlantı değildir | `demo/map-pixi.js:108-118`, `demo/game.js:828`, `demo/game.js:843` | düşük |

**İyi yapılanlar**
- Kasa, saat/mevsim, hız, unvan ilerlemesi ve sezon sırası her ekranda görünür (yapışkan HUD) — `demo/game.js:1439-1443`, `demo/style.css:43`
- Düğme etiketleri sonucu önceden söyler: "Yık (iade ₺X)", "Teklif ver ₺X", "Toptancıya sat ₺X", "Erken kapat ₺X"; sisteme satışta kalem kalem döküm tablosu — `demo/game.js:832`, `demo/game.js:937`, `demo/game.js:852`, `demo/game.js:945-947`
- Maliyet/sonuç önizlemeleri: tapu harcı tutarı, kredi vadesi başına taksit ve toplam faiz, reklamın getireceği bilinirlik, teklifin piyasaya göre yüzdesi, davet kabul olasılığı — `demo/game.js:937`, `demo/game.js:1389`, `demo/game.js:1397`, `demo/game.js:1381`, `demo/game.js:1185`
- Fiyatın etkisi anında açıklanır: "Piyasanın %N üstünde · alım hızı %M" ve rakip karşılaştırması — `demo/game.js:118-123`, `demo/game.js:878`
- Otomasyon seçenekleri tekrarlı işi azaltır: "Üretim çıkınca", "Girdi bitince", "Stok azalınca", "Fiyat kuralı", otomatik sözleşme teslimi — `demo/game.js:866-871`, `demo/game.js:840`, `demo/game.js:880-883`, `demo/game.js:1378`
- İlk dakikalar için 7 adımlı rehber, ardından ödüllü hedefler ve sıradaki unvan kutusu — `demo/game.js:1355-1368`, `demo/game.js:894`
- Çevrim dışı özet kartı ("Sen yokken": gelir/gider dökümü, net, yeni haber sayısı) — `demo/game.js:904-913`
- Birçok boş durum bir sonraki adımı söyler ("Pazar sekmesinden mal al ya da kendi üretimini buraya taşı") — `demo/game.js:843`, `demo/game.js:828`, `demo/game.js:939`
- Hat durumu nedeniyle birlikte yazılır ("Girdi yok: 1,4 ton buğday") ve haritada "!" ile işaretlenir — `demo/game.js:469`, `demo/game.js:840`, `demo/map-pixi.js:101`
- Durum yalnızca renkle verilmez: eğilimde ▲/▼, tamamlananlarda üstü çizili + ✓, giderlerde eksi işareti, uyarıda "!" — `demo/game.js:809`, `demo/game.js:968-969`, `demo/game.js:908`, `demo/map-pixi.js:101`
- Form temeli sağlam: her alanın etiketi var, sayısal alanlarda `inputmode`, ondalık virgül kabul edilir, yazarken odak korunur — `demo/game.js:882`, `demo/game.js:917`, `demo/game.js:759`, `demo/game.js:1422`
- Açık/koyu tema, güvenli alan desteği, `tabular-nums`, `:focus-visible` çerçevesi, `prefers-reduced-motion` (CSS ve Pixi) — `demo/style.css:11-28`, `demo/style.css:31-32`, `demo/style.css:39`, `demo/style.css:69`, `demo/style.css:122`, `demo/map-pixi.js:17`
- Harita kısayolu: binaya dokununca kartına kaydırır ve kartı 1,2 sn vurgular; harita sayfa kaydırmasını engellemez — `demo/game.js:1450-1454`, `demo/map-pixi.js:40`
- Miktarlar hem oyun birimiyle hem gerçek ölçüyle yazılır; büyük tutarlar "mn/mlr" ile kısaltılır — `demo/game.js:848`, `demo/game.js:129`, `demo/game.js:196-202`
- Dayanıklılık: WebGL yoksa SVG haritaya, `localStorage` yoksa kayıtsız çalışmaya düşer; arka planda geçen süre telafi edilir — `demo/map-pixi.js:6`, `demo/map-pixi.js:222`, `demo/game.js:152`, `demo/game.js:1464-1467`

### Inferences
- (yüksek) Sekme şeridi telefonda taşar ve Gazete rozeti ekran dışında kalır; ayrıca şerit her yeniden yazımda başa döner (bkz. bölüm 2 çıkarımları; `demo/style.css:54-55`, `demo/game.js:1422`, `demo/game.js:1443`).
- (orta) Haritadan atlanan kartın üstü HUD'un altında kalır (`demo/game.js:1453`, `demo/style.css:43`).
- (orta) HUD ~180 px ile küçük telefonlarda içerik alanının dörtte birinden fazlasını kaplar; içindeki para birimi seçimi nadiren kullanılan bir ayardır ama en değerli alanda durur (`demo/game.js:1440`).
- (orta) Yazıp doğrudan düğmeye dokunma sırasında ilk dokunuşun kaybolma olasılığı (kooperatif adı, kredi tutarı) ve hareketli kartlarda kayıp dokunuşlar (bkz. bölüm 5 çıkarımları).
- (orta) 14 px giriş alanları iOS'ta odaklanınca yakınlaştırmaya yol açar (`demo/style.css:70`).
- (orta) İki dokunuşlu onay, aynı noktaya çift dokunmayla kazara tetiklenebilir ve neyin silineceğini söylemez (`demo/game.js:685`, `demo/game.js:971`).
- (düşük) Sekme değişiminde sayfa en üste dönmediği için oyuncu yeni sekmenin ortasında kalabilir (`demo/game.js:627`).
- Genel yorum: arayüz bir "tek sayfalık yönetim formu" gibi tasarlanmıştır; bilgi doğruluğu ve açıklayıcılığı güçlü, mobil ergonomi (hedef boyutu, erişim bölgesi, yoğunluk, aşamalı gösterim) zayıftır.

### Gaps
- Hiçbir bulgu gerçek kullanıcı testi ya da cihaz ölçümüyle doğrulanmadı; önem dereceleri kod okumasına dayalı uzman yargısıdır.
- Performans (250 ms'de bir dizge üretimi ve `innerHTML` yazımının düşük donanımlı telefonlardaki maliyeti) ölçülmedi.
- `demo/art.js` içindeki ikon çizimleri ve `demo/assets/` görsellerinin görsel kalitesi/okunabilirliği değerlendirilmedi (yalnızca harita etkileşimi için okundu).
