# Oyun tasarım belgesi (taslak)

Bu belge, sohbette alınan tasarım kararlarını tek yerde toplar. Bütün oranlar ve sayılar başlangıç ayarıdır; oyun içi ölçümle düzeltilmelidir. Oyunun adı, görsel dili, ürünleri ve şehirleri özgün olacaktır.

## 1. Başlangıç

- Her oyuncu sunucuda **bir kiralık arsa** ve bir miktar parayla başlar.
- Başlangıç arsası garantilidir, satılamaz ve arsa sayısı vergi çarpanına dahil değildir.
- Oyuncu arsaya ne kuracağına kendi karar verir:
  - **Dükkân:** başkasından mal alıp simüle tüketiciye satar.
  - **Tarla, maden:** ham madde üretir.
  - **Fabrika:** ham maddeyi işleyip ürün yapar.
- Seçim ekranı o günün talebini ve beklenen kârı gösterir. İlk bina ucuza yıkılıp değiştirilebilir.
- Her ürünü alıp satan bir **sistem toptancısı** bulunur; fiyatı oyunculardan biraz kötüdür. Az oyunculu sunucuda oyunun dönmesini sağlar.
- İlk hafta kira ve vergi alınmaz.

## 2. Arsa, kira ve vergi

### Kira

- Kiralık arsa için sürekli kira ödenir. Kira sabit tutar değil, cironun küçük bir yüzdesidir.
- Kirayı ödeyemeyen arsasını kaybetmez; üretimi yavaşlar ve borç birikir.
- Oyuncular kendi arsalarını başka oyunculara kiraya verebilir. Kira ilanları açık ve isimsizdir, ilk kabul eden alır; kira bedeli referans değere bağlı bir bant içinde kalır.

### Arsa vergisi

Vergi, arsanın referans değeri üzerinden haftalık hesaplanır.

| Arsa durumu | Haftalık vergi |
|---|---|
| Sahibi üretim yapıyor | %1 |
| Kiraya verilmiş, kiracı üretim yapıyor | %2 |
| Bina var ama aktif değil | %4 |
| Boş | %8 |

- **Aktif sayılma koşulu:** arsa son 7 günde kapasitesinin belirli bir oranında üretim ya da satış yapmış olmalıdır. Yalnızca bina dikmek yetmez.
- **Arsa sayısı çarpanı:** her ek arsa, tüm arsaların vergisini %10 artırır.
- **Kiralık arsa indirimi** yalnızca kiracı gerçekten üretim yapıyorsa geçerlidir.
- Vergi borcu birikir ve faiz işler. Uzun süre ödenmezse arsa sistem artırmasına çıkar.
- Yönetim binası ya da muhasebeci gibi bir yatırım vergiyi düşürür.
- Oyuncu toplam vergisini ve her kalemin nedenini tek ekranda görür; arsa almadan önce vergiye etkisi önizlenir.

### Satış vergisi

- Oyuncular arası mal satışı: %3.
- Arsa satışı: %5 ve küçük bir ilan ücreti.
- Simüle tüketiciye perakende satıştan ayrıca vergi alınmaz.

## 3. Arsa piyasası

### Referans değer

- Her arsanın sistemce hesaplanan bir referans değeri vardır: bölge tipi, konum bonusu ve bölgedeki son satışların ortancası.
- Tek satış referansı değiştirmez; değer yavaş güncellenir.

### Açık artırma

Arsalar yalnızca açık artırmayla el değiştirir.

- Satıcının ve teklif verenlerin adı görünmez; yalnızca güncel en yüksek teklif görünür.
- Artırma en az 12–24 saat açık kalır. Son dakikada gelen teklif süreyi birkaç dakika uzatır.
- Satıcı taban fiyat koyabilir; teklif gelmezse arsa satılmaz.
- Teklif verenin parası bloke edilir.
- Satıcı en fazla referans değerin %150'sini alır; üstündeki tutar sisteme gider (yanar).

### Sisteme satış (acil nakit)

Oyuncu arsasını beklemeden sisteme satabilir. Sistem, oyuncunun piyasada alabileceği fiyatın altında öder.

- **Arsa bedeli:** referans değerin %50'si ile oyuncunun o arsaya ödediği tutardan düşük olanı.
- **Bina:** yıkılır. Binaya ve yükseltmelerine oyun parasıyla harcanan toplam tutarın yarısı ödenir. Premium parayla yapılan harcamalar iadeye girmez.
- **Devam eden üretim:** iptal olur; kullanılan ham madde mal gibi değerlenir.
- **Vergi ve kira borcu:** ödenecek tutardan düşülür.
- Yeni alınan arsa birkaç gün sisteme satılamaz. Oyuncu günde bir, haftada birkaç arsadan fazlasını sisteme satamaz.
- Onaydan önce oyuncuya kalem kalem döküm gösterilir.

#### Depodaki mallar için seçenekler

Satış ekranında oyuncu her mal için birini seçer:

1. **Sisteme bırak.** Malın değerinin yarısı ödenir. Değer, son 7 günün gerçekleşmiş satış ortalamasıdır; hiç satış yoksa sistem toptancısının alım fiyatı kullanılır. Ödeme, malın üretim maliyetini geçemez.
2. **Başka arsama taşı.** Oyuncunun başka arsasında depo yeri varsa mal oraya gider; taşıma maliyeti ödenir (bölüm 4).
3. **Önce pazarda sat.** Mallar pazara ilan edilir; arsa satışı mallar satılınca ya da oyuncu kalanı sisteme bırakınca tamamlanır.

#### Bina için seçenekler

1. **Yık ve yarısını al** (ilk sürümde tek seçenek).
2. **Binasıyla artırmaya çıkar** (sonraki sürüm): oyuncu sisteme değil doğrudan artırmaya binalı satar; alıcı hazır bina için daha çok öder.

### Sistem artırması

- Sistem, aldığı arsayı boş olarak artırmaya çıkarır. Açılış fiyatı sistemin ödediği arsa bedelidir.
- Teklif gelmezse fiyat her gün biraz düşer.
- Eski sahip o arsanın artırmasına 14 gün giremez.
- Sunucu büyüdükçe yeni bölgeler açılır ve sistem bunları da artırmayla satar.

## 4. Taşıma maliyeti

Malın bir arsadan diğerine gitmesi para tutar. Bu, konumu anlamlı kılar ve sürekli bir para yutağıdır.

### Hesap

- Harita **bölgelere** ayrılır (örneğin merkez, kırsal, dağ, liman). Mesafe, iki bölge arasındaki adım sayısıdır; aynı bölge içi 0 adım sayılır.
- Her ürünün bir **ağırlık sınıfı** vardır: hafif (elektronik, takı), orta (gıda, tekstil), ağır (cevher, kereste).
- Formül: `taşıma ücreti = miktar × ağırlık katsayısı × (sabit ücret + mesafe × adım ücreti)`
- Aynı bölge içinde yalnızca sabit ücret ödenir; taşıma hiçbir zaman bedava değildir.

Örnek başlangıç değerleri:

| Ağırlık sınıfı | Katsayı |
|---|---|
| Hafif | 0,5 |
| Orta | 1 |
| Ağır | 2 |

Sabit ücret birim başına 1, adım ücreti birim başına 2 alınırsa: 100 birim cevheri (ağır) 3 adım uzağa taşımak `100 × 2 × (1 + 3 × 2) = 1.400` tutar.

### Nerede uygulanır

- **Pazardan alım:** taşımayı alıcı öder. İlan listesi mal fiyatını değil **teslim fiyatını** (mal + taşıma) gösterir ve buna göre sıralanır; böylece yakındaki satıcı doğal olarak öne çıkar.
- **Kendi arsaları arasında aktarma:** madenden fabrikaya, fabrikadan dükkâna.
- **Sistem toptancısı:** her bölgede şubesi vardır; ondan alımda yalnızca sabit ücret ödenir.
- **Arsa satışında mal taşıma seçeneği** (bölüm 3).

### Süre

- İlk sürümde teslimat anlıktır, yalnızca ücret ödenir.
- Sonraki sürümde mesafeye bağlı teslim süresi eklenebilir; hızlı teslimat daha pahalı olur.

### Tasarım sonuçları

- Ağır ham madde uzağa taşınmaya değmez: fabrikayı madenin yakınına kurmak kârlıdır.
- Hafif ve pahalı ürünler uzağa satılabilir: bölgeler arası ticaret bu ürünlerde oluşur.
- Dükkân için merkez arsası değerlidir, ama mal getirmek pahalıdır; arsa değeri ile taşıma gideri arasında denge kurulur.
- Bölgeler arasında fiyat farkı oluşur; ucuz bölgeden alıp pahalı bölgede satmak bir oyun tarzı olur.

### Sonraki sürüm fikri

Oyuncular nakliye şirketi kurabilir: taşıma ücretinin bir kısmı sisteme yanmak yerine nakliyeciye gider. Bu, dükkân, üretim ve emlaktan sonra beşinci bir oyun tarzı olur.

## 5. Denetim (Rekabet Kurulu)

Oyun içinde bir kurum olarak sunulur; kurallar oyuncuya açıkça yazılıdır.

- **Önce engelle:** açık artırma, isim gizleme, satıcı kazanç tavanı ve kira bandı hilenin çoğunu baştan zorlaştırır.
- **Sonra kalıp ara:** aynı iki hesap arasında tekrarlayan artırma sonuçları, aynı cihaz ya da ağdan gelen teklifler, yeni hesaba akan değer.
- **Kademeli yaptırım:** uyarı ve işlem iptali, haksız kazanç kadar para cezası, arsa piyasasından geçici men, kalıcı ban.
- Yapay zeka ajanı şüpheli işlemleri işaretler ve kanıtı özetler. Uyarı ve işlem iptali otomatik olabilir; para cezası ve ban insan onayıyla verilir. İtiraz yolu vardır.

## 6. Açık konular

- Bina türleri, ürün zincirleri ve ürün listesi.
- Simüle tüketici talebi: doygunluk ve fiyat esnekliği formülü.
- Bölge sayısı, harita düzeni ve konum bonusları.
- Kalite sistemi.
- Gelir modeli ve reklam yerleşimi.
- Sunucu mimarisi ve sunucu başına oyuncu sayısı.

## 7. Görsel yön ve teknoloji

### Oyun motoru: PixiJS 8

Tezgâh'ın oynanışının çoğu panel, liste ve formdan oluşur (pazar, arsa kartları, işçiler, rapor). Bunlar HTML ile en iyi çalışır. Grafik isteyen tek yer şehir haritasıdır. Bu yüzden tam bir oyun motoru yerine harita için yalnızca bir 2B WebGL çizici seçildi.

| Seçenek | Neden seçilmedi / seçildi |
|---|---|
| **PixiJS 8** | **Seçildi.** Hızlı 2B WebGL sprite çizimi, tek dosya (~820 KB), HTML arayüzle yan yana çalışır, Capacitor içinde web, Android ve iOS'ta aynı kodla çalışır. |
| Phaser | Sahne, fizik ve girdi sistemi getirir; bu oyunda kullanılmayacak, panelleri oyun içinde çizmeye zorlar. |
| Godot, Unity | Arayüzün tamamını yeniden yazmayı gerektirir; web çıktısı büyük ve yavaş açılır, Capacitor kabuğu boşa çıkar. |

Kullanım:

- `demo/map-pixi.js` her bölge için bir Pixi sahnesi kurar: zemin karoları, bina görselleri, süsler, alışveriş yapan figürler, fabrika dumanı, yolda gidip gelen kamyon.
- Pixi kütüphanesi `demo/vendor/pixi.min.js` içinde yerel olarak durur (sürüm `app/package.json` içinde sabit). Uygulama internetsiz açılır.
- WebGL açılamazsa oyun eski kodla çizilmiş SVG haritaya (`demo/art.js`) döner.
- Oyun büyüdükçe kod TypeScript'e taşınacak; Pixi aynı kalır.

### Görsel üretimi: Codex CLI

Bütün bina, süs ve ürün görselleri Codex CLI'nin yerleşik görsel üretimiyle, aynı üslup cümlesi ve aynı referans görselle (`tarla_1`) üretilir. Komutlar `tasarim/gorsel-uretim-promptlari.md` ile aynıdır.

```bash
python art-src/generate.py            # eksik görselleri üretir (gruplar paralel çalışır)
python art-src/generate.py fabrika    # yalnızca bir grup
python art-src/process.py             # kırpar, boyutlar, WebP yapar, demo/assets/assets.js'i yazar
```

- Bir görseli yeniden üretmek için `art-src/raw/<anahtar>.png` dosyasını silip `generate.py`'yi yeniden çalıştır.
- Ham PNG'ler (1024 piksel, her biri ~1 MB) depoya girmez; oyunun kullandığı WebP dosyaları `demo/assets/` içindedir.
- Boyutlar: binalar 512, harita süsleri 256, ürün ikonları 128 piksel.

## 8. Gerçekçi ekonomi ve yatırım

Tutarlar Kasım 2026 Türkiye fiyatlarına dayanır; kaynaklar ve hangi rakamın tahmin olduğu `reports/Türkiye işletme maliyetleri ve fiyatlar.md` içindedir. Oyun içinde bütün tutarlar Türk lirası olarak tutulur; oyuncu ekranda TL, dolar ya da euro görmeyi seçer (kur, sanal piyasadaki güncel kurdur).

### Ölçek

- **Zaman:** bir oyun günü piyasa ve maaş açısından bir haftaya denk gelir (maaşlar haftalık, mevduat faizi ve borç faizi haftalık oranla işler).
- **Başlangıç sermayesi:** 2,5 milyon TL. Tarla ya da dükkân kurmaya yeter; maden (4,5 mn) ve fabrika (12 mn) için büyümek gerekir.
- **Arsalar (referans değer):** Merkez 6 mn, Kırsal 2,5 mn, Dağ 1,5 mn TL.
- **Ürünler gerçek birimlerle:** buğday 100 kg 1.650 TL (TMO), süt 100 L 2.430 TL (USK), çelik ton 29.700 TL, ekmek 1.000 adet 13.000 TL toptan (rafta 17,5 TL), peynir 100 kg 28.000 TL. Perakende kâr payı %35, sistem toptancısı %12 üstünden satar, %15 altından alır.
- **Tarifler gerçek dönüşüm oranlarıyla:** 100 kg buğday ≈ 72 kg un, 1 kg peynir ≈ 5 L süt, 1 kg pamuk lifi ≈ 2,3 kg kütlü, 1 t çelik ≈ 1,6 t cevher + 0,6 t kömür.
- **Fabrika ölçeği:** fabrika partisi tarlanın 5 katı, madeninki 2 katıdır. Büyük ölçekli alım-satım ulusal fiyatı daha az oynatır ve pazarda daha hızlı alıcı bulur.
- **Taşıma:** ton başına 150 TL sabit + bölge adımı başına 600 TL (≈ 3 TL/ton-km). Ağır ham madde uzağa taşınmaya değmez.
- **Maaşlar (haftalık):** satış görevlisi 8.200, müdür 12.500, usta 16.500, şoför 15.700 TL (1 yıldız); yıldız arttıkça yükselir.
- **Borç faizi:** günde %0,8 (ticari kredi yılda ~%40).

Ölçülen geri dönüş süreleri (1. seviye, kendi kendine yeten tek bina, otomatik alım-satım): dükkân 2,5–6 gün (konuma göre), tarla 3–4 gün, maden ~4 gün, fabrika 7–15 gün (ama günlük kârı 3–4 kat). Un fabrikası kasıtlı olarak en düşük marjlı işletmedir, gerçek sektörde de öyledir.

### Yatırım sekmesi (sanal piyasa)

Gerçek piyasayı izlemez; seviye ve oynaklıklar araştırmaya göre ayarlanmış rastgele yürüyüştür.

- **Döviz:** dolar 50,37, euro 55,6 TL'den başlar; TL ayda %1,5–2 değer kaybeder. Banka alış-satış farkı %1.
- **Gram altın:** ons (3.880 $) × dolar kuru / 31,1; yıllık oynaklık ~%20, alış-satış farkı %3.
- **Vadeli mevduat:** yıllık %36 brüt, %15 stopaj sonrası her gün eklenir.
- **Tezgâh Borsası:** TZ-30 endeksi BIST 100 seviyesinden (11.843) başlar. Altı kurgusal şirket (un, süt, tekstil, çelik, madencilik, perakende) endeksle birlikte (beta) ve bağlı oldukları ürünlerin oyun içi fiyatıyla hareket eder; gazete olayları da etkiler. Komisyon binde 2 + %5 BSMV, temettü her gün işler.
- **Kriz günü:** her gün %3 olasılıkla endeks %6–9 düşer ve devre kesici haberi çıkar; dolar ve altın değer kazanır (Mart 2025 ve Eylül 2026'daki gerçek düşüşler örnek alındı).
- Yatırım kârı ve zararı, temettü ve faiz rapor ekranında ayrı kalemlerdir ve ticari gelir sayılmaz.

### Arsa bedelleri

- Her arsanın büyüklüğü ve birim fiyatı vardır; değer = büyüklük × birim fiyat × konum çarpanı (±%20: yol kenarı, köşe, eğim).
  - **Merkez:** 350–700 m², 12.000 TL/m² (Ankara ~5.300, İzmir ~12.400, İstanbul ~19.400 TL/m²; büyükşehir ortası).
  - **Kırsal:** 6–16 dönüm tarım arazisi, 250.000 TL/dönüm (Konya ~190 bin, Çanakkale ~470 bin). Başlangıçtaki kiralık arsa 10 dönümdür.
  - **Dağ:** 25–60 dönüm dağlık arazi ve ruhsat sahası, 37.500 TL/dönüm (tahmin).
- Bina bedeli araziden ayrıdır: tarla kurulumu traktör ve ekipmandır, maden kurulumu ruhsat ve iş makinesidir.
- Arsa değerleri her oyun günü (bir hafta) yılda %20 hızla artar; 2025'te arsa %20, tarla %17 arttı, enflasyonun altında.
- **Emlak vergisi (büyükşehir):** arsa binde 6, tarla ve arazi binde 2, işyeri binde 4, yıllık; her oyun günü 52'de biri alınır. Boş ya da son günde çalışmamış arsaya oyun kuralı olarak 5 kat atıl arsa vergisi uygulanır; arsa sayısı çarpanı (%10/arsa) sürer.
- **Tapu harcı:** alıcı ve satıcı %2 öder; satıcı ayrıca %1 ilan ücreti öder.
- **Kira:** kiralık arsada kira cironun %5'idir (ortakçılık usulü). Gerçek tarla kirası (yılda 4.000–6.000 TL/dönüm) üretim gelirinin yanında çok küçük kaldığı için oyunda ciroya bağlı tutuldu.

## 9. Zenginleşme amacı: servet basamakları

Oyunun uzun vadeli amacı net değeri büyütüp **holding patronu** olmak. Kısa hedefler (bölüm hedefleri) ilk saatleri yönlendirir; bittikten sonra oyuncuyu servet basamakları taşır.

| Unvan | Net değer eşiği | Açılan ayrıcalık |
|---|---|---|
| Seyyar esnaf | başlangıç | — |
| Esnaf | ₺10 mn | Taşıma %10 ucuz |
| Tüccar | ₺30 mn | Borç faizi yarıya iner |
| Sanayici | ₺100 mn | Emlak vergisi %25 indirimli |
| Fabrikatör | ₺300 mn | Taşıma %20 ucuz |
| Holding patronu | ₺1 mlr | Oyun kazanılır; kaçıncı günde ulaşıldığı rekor olarak saklanır |

- Unvan kalıcıdır: net değer sonradan düşse de geri alınmaz.
- Üst bilgi çubuğunda unvan ve bir sonraki eşiğe ilerleme çubuğu görünür; Rapor sekmesinde bütün basamaklar listelenir.
- Kazandıktan sonra oyun sürer; amaç daha az günde holding olmak (rekor).
- Sonraki sürüm fikri: rekorlar için arkadaşlarla karşılaştırma tablosu, her basamakta yeni bina türü ya da bölge açılması.
