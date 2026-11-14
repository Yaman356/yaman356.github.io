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

Oyun çevrim içi olacağı için **bitiş ya da kazanma yok**. Uzun vadeli amaç net değeri büyütüp unvan basamaklarını çıkmak; unvan diğer oyunculara görünen sıralamadır. Kısa hedefler ilk saatleri yönlendirir, sonra oyuncuyu basamaklar taşır.

| Unvan | Net değer eşiği | Açılan ayrıcalık |
|---|---|---|
| Seyyar esnaf | başlangıç | — |
| Esnaf | ₺10 mn | Taşıma %10 ucuz |
| Tüccar | ₺30 mn | Borç faizi yarıya iner |
| Sanayici | ₺100 mn | Emlak vergisi %25 indirimli |
| Fabrikatör | ₺300 mn | Taşıma %20 ucuz |
| Holding patronu | ₺1 mlr | Emlak vergisi %50 indirimli |
| Sektör lideri | ₺2 mlr | Taşıma %30 ucuz |
| Dünya markası | ₺5 mlr | Borç faizi dörtte birine iner |

- Unvan kalıcıdır: net değer sonradan düşse de geri alınmaz.
- Üst bilgi çubuğunda unvan ve bir sonraki eşiğe ilerleme çubuğu görünür; Rapor sekmesinde bütün basamaklar listelenir.

### Bot simülasyonu (Kasım 2026)

Tarayıcıda oyunun kendi kuralları üzerinde çalışan basit bir bot (`window.__tezgah.dbg` üzerinden) her oyun saatinde karar verdi: artırmalara teklif, tarla/maden kurma, ham madde sayısı fabrikaların iki katını geçince fabrika için para biriktirme, kapasite yükseltme, üretimi pazara koyma ve pazarın bir günde eritemeyeceği fazlayı toptancıya satma. İşçi, dükkân ve yatırım sekmesi kullanılmadı.

| Unvan | Ulaşılan oyun günü (5 deneme) |
|---|---|
| Esnaf (₺10 mn) | 21–28 |
| Tüccar (₺30 mn) | 31–38 |
| Sanayici (₺100 mn) | 42–53 |
| Fabrikatör (₺300 mn) | 57–70 |
| Holding patronu (₺1 mlr) | 77–90 |

- Bir oyun günü 1× hızda ~96 gerçek saniye; 85 oyun günü ≈ 2,3 saat kesintisiz oyun (4× hızda ~35 dk). Uygulama kapalıyken en fazla bir oyun günü telafi edildiği için gerçekte günlere yayılır.
- Bot ~₺2,5 mlr civarında takıldı: ~130 arsa ve ~42 fabrikada bütün ürünlerin fiyatı olağanın %60–70'ine indi (pazar doydu). Bu yüzden son iki eşik ₺2 mlr ve ₺5 mlr seçildi; işçi, dükkân ve yatırımı iyi kullanan bir oyuncu daha yükseğe çıkabilir.
- Çevrim içi için uyarı: tek oyuncuda bile 1 milyara birkaç saatlik aktif oyunla ulaşılıyor. Ortak pazarda oyuncular aynı talebi paylaşacağı için doyma daha erken gelir; çevrim içi sürümde zaman ölçeği ve pazar talebi oyuncu sayısına göre yeniden ayarlanmalı.

## 10. Çevrim içi amaçlar: Rekabet sekmesi

Oyunun sonu yok ama oyuncuyu taşıyan dört amaç var. Demoda rakipler 11 sanal şirkettir; çevrim içi sürümde gerçek oyuncular olur. Sanal şirketler bot simülasyonundaki büyüme eğrisine göre büyür (yetenek çarpanı 0,7–1,3; ~₺3 mlr'de pazar doyar).

### Sezon ve sıralama
- Sezon 60 oyun günü sürer (çevrim içi için hedef: 4 gerçek hafta). Sıralama net değere göredir.
- Sezon sonunda ilk üç altın, gümüş, bronz rozet alır; herkes ₺2,5 mn ile sıfırdan başlar. Rozetler, sezon unvanı ve sektör unvanları profilde kalır.
- Üst çubukta sezon numarası ve anlık sıra görünür.

### Sektör hakimiyeti
- Son 7 günde bir üründe en çok satan şirket o sektörün unvanını alır: Buğday Ağası, Süt Kralı, Pamuk Ağası, Kömür Baronu, Demir Baronu, Un Kralı, Kumaş Kralı, Çelik Baronu, Ekmek Kralı, Peynir Kralı, Moda Kralı, Alet Baronu.
- Perakende, pazar ilanı ve toptancı satışları sayılır. Unvan kazanılınca ve kaybedilince gazetede duyurulur.

### Haftalık görev zinciri
- Her 7 oyun gününde üç görev: biri kendi ürettiğin bir üründen satış, ikisi havuzdan (ticari gelir, net değer hedefi, kapasite artırma, işçi alma, artırma kazanma).
- Her görev net değerin %3'ü (en az ₺150 bin); üçü de bitince iki katı zincir ödülü.

### Holdingler
- Üç holding: Anadolu Birliği (tarım-gıda), Ege Ortaklığı (tekstil-ticaret), Karadeniz Grubu (maden-sanayi). Holding sıralaması üyelerin toplam net değeridir.
- Üyeler %5 ucuz taşır ve haftalık ortak gelir hedefine katkı verir; hedef tutunca her üye net değerinin %2'si kadar pay alır.

### Test (bot, 60 gün)
Bot 1. sezonu ₺569 mn net değer ve Fabrikatör unvanıyla 1. bitirdi; en iyi sanal rakip ~₺230 mn idi. Bu yüzden rakiplerin yetenek aralığı 0,65–1,15'ten 0,7–1,3'e çıkarıldı. Sezon sonu sıfırlama ve rozet kaydı çalıştı.

### Kooperatifler
Oyuncu kendi kooperatifini kurar (ad verir, tür seçer, ₺500 bin kuruluş sermaye payı öder) ve diğer şirketleri davet eder. Kooperatif sezonlar arasında kalır; çevrim içi sürümde üyeler gerçek oyuncular olur.

| Tür | Ayrıcalık (5 üyede tam güç) | Gerçek karşılığı |
|---|---|---|
| Satış kooperatifi | Pazar ilanları %25 hızlı satar | Tariş, Çukobirlik gibi ortak satış |
| Alım kooperatifi | Toptancıdan alış %8 ucuz | Ortak gübre, yem, hammadde alımı |
| Kredi kooperatifi | Borç faizi %40 indirimli | Tarım kredi kooperatifleri |

- Ayrıcalığın gücü üye sayısıyla artar: (üye + kurucu) / 5.
- Günde bir davet gönderilebilir. Kabul olasılığı %15'ten başlar; şirketin odak ürünleri senin üretiminle örtüştükçe (+%15 her ürün), kooperatif büyüdükçe (+%4 her üye) artar, şirket senden çok büyükse düşer. Reddeden şirkete bir hafta sonra yeniden sorulabilir.
- Kooperatif dağıtılabilir; ayrıcalıklar o an biter.

## 11. Şirket yönetimi: sözleşme, kredi, mevsim, marka, vergi

Bu bölümdeki her şey demoda çalışır (yeni **Şirket** sekmesi ve ilgili ekranlar).

### Sözleşmeler ve siparişler
- Sanal şirketler her gün 3 sabit fiyatlı sipariş teklif eder: ürün, miktar, 3/5/7 günlük süre, teslim bölgesi. Alıcı genelde o ürünü girdi olarak kullanan şirkettir (un için Akıncı Un gibi).
- Sipariş tutarı net değerin ~%5–12'si kadardır (en az ₺300 bin). Birim fiyat piyasanın %4–24 üstündedir; kalite primi de eklenir.
- **Güvenilirlik** 50'den başlar. Tamamlanan sözleşme +5, cezalı sözleşme −15 puan getirir. Puan arttıkça teklif fiyatları yükselir (her puan +%0,2).
- Teslim edilmeyen kısım için bedelin %25'i ceza ödenir. Aynı anda en fazla 3 sözleşme yürütülür.
- Teslimat depolardan yapılır; taşıma ücreti oyuncuya aittir. İstenirse ürün depoya girdikçe saatlik olarak otomatik teslim edilir.

### Banka kredisi
- Limit: ₺1 mn teminatsız + (arsa değeri + bina harcamasının yarısı) × %60 − mevcut kredi borcu.
- Faiz yıllık %45 (2026 ticari kredi tahmini). Tüccar ve Dünya markası unvanları ile kredi kooperatifi bunu en düşük ~%26'ya indirir.
- Vade 4, 8 ya da 13 hafta (oyun günü). Eşit taksit her gün kasadan alınır; erken kapamada kalan anaparanın %1'i ücret alınır.
- Taksit ödenemezse faiz ve %1 gecikme bedeli borca eklenir. **Üç taksit üst üste kaçarsa** banka en değerli arsayı binası ve deposuyla birlikte alır (arsanın %70'i + binanın %30'u borca sayılır), arsa haciz artırmasına çıkar.
- Kredi borcu net değerden düşülür. Eski otomatik eksi bakiye (günlük %0,8 faiz) acil durum için kalır.

### Mevsimler ve hasat
Bir oyun günü bir haftadır: 52 günde bir yıl, her mevsim 13 gün. Oyun ilkbaharda başlar.

| Mevsim | Buğday verimi | Pamuk verimi | Süt verimi | Fiyat eğilimi |
|---|---|---|---|---|
| İlkbahar | ×0,9 | ×0,7 | ×1,2 | Buğday %6 pahalı, süt %5 ucuz |
| Yaz | ×1,7 | ×1,1 | ×1,0 | Buğday %12 ucuz (hasat) |
| Sonbahar | ×1,0 | ×1,7 | ×0,95 | Pamuk %12 ucuz (hasat) |
| Kış | ×0,5 | ×0,4 | ×0,85 | Buğday %12, pamuk %10, kömür %10 pahalı |

- Fiyatlar her saat mevsimin seviyesine doğru çekilir. Hasatta ucuz alıp depolamak, kışın satmak kazandırır.
- Yeni hava olayı: **zirai don** (Kırsal tarlaları %40 az verir). Kuraklık ve bereket olayları da sürüyor.

### Marka ve kalite
- **Kalite** (1–5 yıldız, ürün başına): Ar-Ge ile yükselir. Maliyeti ürünün fiyatı × 400 × seviye². Örneğin buğdayda 2. yıldız ₺660 bin, alette 5. yıldız ~₺224 mn.
- Her yıldız, alıcının kabul ettiği fiyatı %6 artırır: dükkânda ve pazarda aynı fiyata daha hızlı satılır, sözleşmede daha yüksek fiyat gelir. Toptancı primin yarısını öder.
- **Marka bilinirliği** (0–100): reklamla yükselir. Üç seçenek var: yerel gazete ₺250 bin (+4), bölgesel radyo ₺1,5 mn (+12), ulusal TV ₺8 mn (+30). Puan arttıkça reklamın getirisi azalır.
- Bilinirlik her gün %3 söner; satış yapılan günler +0,3 ekler. Dükkân talebini en fazla %50, ilan satış hızını en fazla %25 artırır.
- Şirket sekmesinde "en tanınan marka" sıralaması gösterilir. Sanal şirketlerin bilinirliği net değerleriyle logaritmik büyür.

### Vergi ve muhasebe
- **Kurumlar vergisi %25**: her mevsim sonunda (çeyrek, 13 gün) o çeyreğin kârı üzerinden alınır. Zarar sonraki çeyreğe devreder.
- Gider sayılmayanlar: inşaat (yerine binalar yılda %10 amortismanla gider yazılır), arsa alımı ve satışı, kredi anaparası, KDV, kooperatif sermayesi. Faiz, maaş, reklam, Ar-Ge, taşıma, kira ve emlak vergisi gider sayılır.
- **KDV**: yalnızca dükkândaki perakende satışta, satış fiyatı ile maliyet arasındaki fark üzerinden alınır. Oranlar: temel gıda (buğday, süt, un, ekmek, peynir) %1, kumaş ve giysi %10, diğerleri %20. Şirketler arası satışta KDV indirimle sıfırlandığı için gösterilmez.
- Not: kurumlar vergisi büyümeyi yaklaşık dörtte bir yavaşlatır. Bölüm 9'daki bot süreleri vergisiz ekonomiye göredir; yeniden ölçülmeli.

### Yeni bölgeler
Unvan yükseldikçe yeni bölgeler açılır. Açılınca o bölgede bir arsa artırmaya çıkar.

| Bölge | Açılma | Özellik | Arsa fiyatı |
|---|---|---|---|
| Ova (Konya benzeri) | Esnaf | Tarlalar %40 fazla ürün verir | ~₺190 bin/dönüm |
| Liman (İzmir benzeri) | Tüccar | Toptancı malı %92'den alır (ihracat; başka yerde %85) | ~₺14 bin/m² |
| Metropol (İstanbul benzeri) | Sanayici | Dükkân talebi 2,4 kat (Merkez 1,6) | ~₺30 bin/m² |

Bölgeler arası mesafe 1–3 adımdır; Liman ve Metropol birbirine yakın, Dağ'a uzaktır.

### Talebin oyuncu sayısıyla büyümesi
Pazar derinliği = √(aktif şirket sayısı / 12) × (1 + %0,6 × sezon günü).
- Dükkân talebi ve ilan satış hızı derinlikle çarpılır; tek satışın fiyata etkisi derinliğe bölünür.
- Demoda şirket sayısı sabit 12'dir (sen + 11 sanal şirket); sezon içinde talep %36'ya kadar büyür.
- Çevrim içi sürümde aktif şirket sayısı, son 7 günde oynayan oyuncular ile sanal şirketlerin toplamıdır. Böylece 1.000 oyunculu bir pazar 12 oyunculuktan ~9 kat derindir ve erken doymaz.

### Oyuncular arası ticaret (demo karşılığı)
- Pazardaki ilanlar artık satıcı şirketin adını gösterir.
- Her ilanda bir kez pazarlık yapılabilir: %5 indirimin kabul şansı %55, %10 indirimin %25'tir. Alım kooperatifi +%10, piyasanın üstündeki ilan +%15 şans ekler.
- Çevrim içi sürümde ilanları gerçek oyuncular verir, pazarlık teklif-karşı teklif olarak karşı tarafa gider. Sözleşme teklifleri de oyuncular arasında açılır.

### İlk dakikalar için rehber
Yeni oyunda ana ekranın üstünde 7 adımlık rehber çıkar:
1. Tarla kur.
2. Ürün seç.
3. İlk partiyi bekle.
4. İlk satışı yap.
5. Satışı otomatiğe bağla.
6. Şirket sekmesine bak.
7. Arsa al ya da kredi çek.

Her adım, oyuncu o işi yapınca kendiliğinden geçer. Rehber kapatılabilir; bitince hedefler kartı görünür.

## 12. Sunucu ve hesaplar

### Aşama 1: prototip (repoda, `server/server.js`)
Bağımlılıksız bir Node sunucusu. Çalıştırmak için `node server/server.js` (port 8790); demo dosyalarını da aynı adresten sunar. Sağladıkları:
- **Hesap açma ve giriş**: ad (3–24 karakter, büyük-küçük harf duyarsız) ve şifre (en az 8 karakter, scrypt ile tuzlanıp saklanır). Girişte rastgele bir oturum anahtarı verilir.
- **Bulut kaydı**: `PUT /api/save` oyun durumunu, net değeri ve oyun gününü saklar; `GET /api/save` geri verir. Eski güne ait kayıt, yenisinin üstüne yazılamaz.
- **Makullük kontrolü**: net değer bir oyun gününde 1,6 katından fazla artamaz. En hızlı bot günde ~1,15 kat büyüyor; bunu aşan kayıt reddedilir.
- **Sezon sıralaması**: `GET /api/board` aynı sezondaki ilk 50 oyuncu.
- Bu aşamada simülasyon hâlâ tarayıcıda döner. Kontrol kaba hileleri durdurur ama kayıt düzenlemeyi tamamen engellemez.

### Aşama 2: sunucu otoriteli ekonomi (hedef)
- **Simülasyon sunucuda**: oyun mantığı (`step`, `hourly`, `daily`) ortak bir modüle taşınır. İstemci yalnızca eylem gönderir (inşa et, fiyat koy, teklif ver, kredi çek); para ve stok sunucuda hesaplanır. Böylece hile imkânsızlaşır.
- **Ortak pazar**: ilanlar, sözleşmeler, artırmalar ve fiyat çarpanları tüm oyuncular için tek bir yerde tutulur. Fiyat etkisi pazar derinliğiyle (bölüm 11) ölçeklenir.
- **Zaman**: sunucu dakikada bir oyun saati ilerletir. Çevrim dışı oyuncunun binaları çalışmaya devam eder; istemci açılınca durumu çeker. Telafi hesabı gerekmez.
- **Veri**: oyuncu, arsa, ilan, sözleşme ve kredi tabloları için PostgreSQL. Oturum ve anlık fiyatlar için Redis. Canlı fiyat ve haberler istemciye WebSocket ile gider.
- **Kooperatif ve holding**: gerçek üyelik, davetler, ortak hedefler ve ortak sohbet.
- **Güvenlik**: hız sınırı, oturum süresi, e-posta doğrulama, şifre sıfırlama, hesap başına tek aktif oturum.
- **Barındırma**: GitHub Pages yalnızca statik dosya sunar. Sunucu için Fly.io, Render ya da bir VPS gerekir.

### Aşama 3: mobil
Capacitor uygulaması (`app/`) aynı API'yi kullanır. Google Play Games ya da Apple ile girişte hesap bağlama eklenir.
