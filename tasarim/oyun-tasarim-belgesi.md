# Oyun tasarım belgesi (taslak)

Bu belge, sohbette alınan tasarım kararlarını tek yerde toplar. Bütün oranlar ve sayılar başlangıç ayarıdır; oyun içi ölçümle düzeltilmelidir. Oyunun adı, görsel dili, ürünleri ve şehirleri özgün olacaktır.

**Geçerlilik kuralı:** Bölüm 0 tek doğru kaynaktır ve demodaki kodla (`demo/game.js`) birebir aynıdır. Başka bir bölüm bölüm 0 ile çelişirse bölüm 0 geçerlidir. Henüz yapılmamış fikirler "Planlanan" başlığıyla ayrıca işaretlidir.

## 0. Geçerli kurallar (tek sayfa)

### Zaman birimleri
| Birim | Değer | Not |
|---|---|---|
| Oyun günü | 1.440 oyun dakikası; ekonomide **bir hafta** sayılır | Maaş, faiz, vergi, kredi taksiti günlük işler ama haftalık orandır |
| Gerçek süre (demo, 1×) | 1 gerçek saniye = 15 oyun dakikası → 1 oyun günü ≈ 96 sn | 2× ve 4× hız düğmeleri var |
| Çevrim dışı telafi | Aynı hız, **en fazla 1 oyun günü** | Bölüm 13'teki 1. açık karar: değişmesi gerekiyor |
| Mevsim | 13 oyun günü; yıl 52 gün; oyun ilkbaharda başlar | Kurumlar vergisi mevsim sonunda |
| Haftalık görev haftası | 7 oyun günü | |
| Sezon | 60 oyun günü; sonunda herkes ₺2,5 mn ile sıfırlanır | Rozet, kooperatif ve holding üyeliği kalır |
| Ücretsiz dönem | İlk **2 oyun günü** kira ve emlak vergisi yok | |

### Başlangıç
| Kural | Değer |
|---|---|
| Sermaye | ₺2,5 mn |
| Başlangıç arsası | Kırsal'da 10 dönüm **kiralık** arsa; satılamaz, vergi çarpanına girmez |
| Kurulabilen binalar | Dört bina da seçenekte görünür; sermaye yalnızca **dükkân (₺1,2 mn) ya da tarlaya (₺1,6 mn)** yeter. Maden ₺4,5 mn, fabrika binası ₺12 mn + ürüne göre makineler (₺6–250 mn, bölüm 8) |
| İlk bina değişikliği | İlk yıkımda harcamanın **tamamı** iade edilir, sonrakilerde yarısı |

### Arsa, kira, vergi ve harçlar
| Kalem | Değer |
|---|---|
| Kira (kiralık arsa) | Arsadaki satış cirosunun %5'i, satış anında |
| Emlak vergisi (yıllık, her gün 1/52'si) | Şehir bölgeleri (Merkez, Liman, Metropol): boş arsa binde 6, binalı binde 4. Kırsal/Dağ/Ova: binde 2 |
| Atıl arsa | Boş arsa ya da **son 1 oyun gününde** üretim/satış yapmamış bina → vergi 5 kat |
| Arsa sayısı çarpanı | Sahip olunan her ek arsa tüm emlak vergisini %10 artırır |
| Tapu harcı | Alıcı %2, satıcı %2 + %1 ilan ücreti |
| Satıcı tavanı | Artırmada satıcı en fazla referans değerin %150'sini alır |
| Sisteme arsa satışı | Arsa: referansın %50'si ile ödenen tutardan düşük olanı. Bina: harcamanın yarısı. Depodaki mal: değerinin yarısı ya da başka arsaya taşıma |
| Pazar ilanı komisyonu | Satıştan %3 |
| KDV | Yalnızca dükkân perakendesinde, katma değer üzerinden: gıda %1, tekstil %10, diğer %20 |
| Kurumlar vergisi | Çeyrek kârının %25'i; zarar devreder; inşaat yerine %10/yıl amortisman |
| Arsa değeri artışı | Yılda %20 (her oyun günü 1/52) |

### Fiyat ve ticaret
| Kalem | Değer |
|---|---|
| Sistem toptancısından alış | Piyasa fiyatı × 1,12 (+ bölge içi sabit taşıma). Alım kooperatifi tam güçte ×0,92 → **×1,03** |
| Sistem toptancısına satış | Piyasa fiyatı × 0,85 (Liman'da 0,92) |
| Dükkân perakende referansı | Piyasa fiyatı × 1,35 |
| Taşıma | Ton başına ₺150 + bölge adımı başına ₺600 |
| Fiyat dalgalanması | Piyasa çarpanı 0,6–1,5 arası; her saat mevsim seviyesine %3 çekilir |
| Pazar derinliği | √(şirket sayısı / 12) × (1 + %0,6 × sezon günü) |

### Para kaynakları (ticaret dışı)
| Kaynak | Miktar |
|---|---|
| Başlangıç hedefleri (7 adet, bir kez) | Toplam ₺5,6 mn |
| Haftalık görevler | Görev başına max(₺150 bin, net değerin %3'ü) × 3 + zincir ödülü 2 × ödül → haftada net değerin ~%15'i, başta ₺750 bin |
| Holding hedefi | Haftada net değerin %2'si (en az ₺200 bin) |
| Mevduat | Yıllık %36 brüt, %15 stopaj sonrası |
| Hisse temettüsü | Hisseye göre yıllık %0–3 |
| Banka kredisi | Borçtur, para yaratmaz; faiz para yutağıdır |

### Sıralama ve unvanlar
| Kural | Değer |
|---|---|
| Net değer | Kasa + sahip olunan arsalar + bina harcamasının yarısı + stok ve ilanlar (toptancıya satış fiyatıyla) + yatırımlar + artırma teminatı − kredi borcu |
| Sektör unvanı | Son 7 günde o üründe en çok satan. **Şu an toptancıya ve sözleşmeye satış da sayılıyor** (bölüm 13, 6. madde) |
| Servet unvanı ayrıcalıkları | Kalıcı ve birikimli: taşıma %10→%30, borç faizi yarı→çeyrek, emlak vergisi %25→%50 indirim |



## 1. Başlangıç

Geçerli değerler bölüm 0'dadır. Tasarım niyeti:

- Her oyuncu garantili bir kiralık arsa ve sermayeyle başlar. Bu arsa satılamaz ve vergi çarpanına girmez.
- Oyuncu arsaya ne kuracağına kendi karar verir: **dükkân** başkasından mal alıp tüketiciye satar, **tarla ve maden** ham madde üretir, **fabrika** ham maddeyi işler. Sermaye ilk etapta dükkân ya da tarlaya yeter.
- İlk bina tam iadeyle değiştirilebilir; yanlış ilk karar oyuncuyu oyundan koparmamalıdır.
- Her ürünü alıp satan bir **sistem toptancısı** bulunur; az oyunculu sunucuda oyunun dönmesini sağlayan güvenlik ağıdır ve oyunculardan kötü fiyat vermelidir (bölüm 13, 5. madde).

**Planlanan:** seçim ekranında o günün talebi ve beklenen kâr önizlemesi.

## 2. Arsa, kira ve vergi

Geçerli oranlar bölüm 0'dadır. İlk taslaktaki haftalık %1–8 arsa vergisi, %5 arsa satış vergisi ve "7 günde aktif" kuralı **kaldırıldı**; yerlerine gerçek emlak vergisi oranları, %2 tapu harcı ve "son 1 günde aktif" kuralı geldi.

- Kira cironun yüzdesidir; ciro yoksa kira da yoktur.
- Atıl arsa vergisi, arsa biriktirip beklemeyi pahalı kılar. Arsa sayısı çarpanı tekelleşmeyi yavaşlatır.
- Vergi ve kira ödenemezse kasa eksiye düşer; eksi bakiyeye günlük %0,8 faiz işler ve para yetmeyen üretim hatları durur.
- Oyuncu her kalemi Rapor sekmesinde ve arsa kartında görür.

**Planlanan:**
- Oyuncuların arsalarını birbirine kiraya vermesi (isimsiz ilan, referans değere bağlı kira bandı).
- Uzun süre ödenmeyen vergi borcu nedeniyle arsanın sistem artırmasına çıkması.
- Vergiyi düşüren yönetim binası ya da muhasebeci.
- Arsa almadan önce vergiye etkisinin önizlenmesi.

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
- **Planlanan:** yeni alınan arsa birkaç gün sisteme satılamaz; oyuncu günde bir, haftada birkaç arsadan fazlasını sisteme satamaz.
- Onaydan önce oyuncuya kalem kalem döküm gösterilir.

#### Depodaki mallar için seçenekler

Satış ekranında oyuncu her mal için birini seçer:

1. **Sisteme bırak.** Malın değerinin yarısı ödenir. Değer, son 7 günün gerçekleşmiş satış ortalamasıdır; hiç satış yoksa sistem toptancısının alım fiyatı kullanılır. Ödeme, malın üretim maliyetini geçemez.
2. **Başka arsama taşı.** Oyuncunun başka arsasında depo yeri varsa mal oraya gider; taşıma maliyeti ödenir (bölüm 4).
3. **Planlanan — önce pazarda sat.** Mallar pazara ilan edilir; arsa satışı mallar satılınca ya da oyuncu kalanı sisteme bırakınca tamamlanır.

Demoda depodaki mal, değerinin yarısıyla (güncel piyasa fiyatı × 0,5) değerlenir; üretim maliyeti tavanı henüz yok.

#### Bina için seçenekler

1. **Yık ve yarısını al** (ilk sürümde tek seçenek).
2. **Binasıyla artırmaya çıkar** (sonraki sürüm): oyuncu sisteme değil doğrudan artırmaya binalı satar; alıcı hazır bina için daha çok öder.

### Sistem artırması

Demoda sisteme satılan arsa, değeri korunarak normal artırmaya çıkar. Aşağıdakiler **planlanan** kurallardır:


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

Bu tablo ve örnek ilk taslaktır, soyut birim kullanır. Geçerli değerler bölüm 0'da: ton başına ₺150 + adım başına ₺600, ağırlık ürünün gerçek kilosundan gelir. Taslak örnek: sabit ücret birim başına 1, adım ücreti birim başına 2 alınırsa: 100 birim cevheri (ağır) 3 adım uzağa taşımak `100 × 2 × (1 + 3 × 2) = 1.400` tutar.

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

Çözülenler: bina türleri ve ürün zincirleri (bölüm 8), bölgeler (bölüm 11), kalite (bölüm 11), sunucu mimarisi (bölüm 12). Açık kalanlar:
- Simüle tüketici talebinin doygunluk formülünün çok oyunculu ayarı.
- Gelir modeli ve reklam yerleşimi.
- Sunucu başına oyuncu sayısı.
- Bölüm 13'teki denge kararları.

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

### Arayüz düzeni (telefon öncelikli)

Dayanak: `reports/Mobil ticaret oyunu arayüz tasarımı.md`. Raporun altı yüksek öncelikli maddesi uygulandı.

- **Gezinme altta, beş hedef:** Arsalar, Pazar (ürün pazarı, arsa artırması), Şirket (sözleşme ve marka, işçiler), Finans (yatırım, kredi ve vergi, rapor), Rekabet (sezon, gazete). Alt bölümler ekranın üstünde hap biçimli sekmelerdir. Rozet yalnızca oyuncunun bir şey yapması gerektiğinde çıkar: ilgilenilmesi gereken arsa, süresi dolmak üzere olan sözleşme, geciken taksit, okunmamış haber.
- **Dokunma hedefleri:** düğme, seçim kutusu ve giriş alanı en az 44 px; alt çubuk 58 px; aralıklar en az 8 px. Giriş yazısı 16 px (iOS odakta yakınlaştırmasın).
- **Onay:** geri alınamaz işlemler (bina yıkma, arsayı sisteme satma, işçi çıkarma, makineli hatta tarif değiştirme, kooperatif kurma ve dağıtma, holdingden ayrılma, oyunu sıfırlama) alttan açılan bir onay sayfası ister. Sayfa neyin kaybedileceğini yazar; düğme sonucu adlandırır ("Binayı yık"). Sıradan alım-satım tek dokunuşta kalır.
- **Miktar seçimi:** toptancıya satış, ilana koyma ve taşıma stokun ¼'ü, ½'si ya da tamamı için yapılır.
- **Arsa kartları:** kapalıyken tek satır (bina, durum etiketi, depo doluluğu); aynı anda tek kart açıktır. Haritadan dokunmak ilgili kartı açar.
- **Pazar:** önce 12 ürünün en ucuz teslim fiyatıyla listesi ve süzgeç (girdilerim, ürettiklerim, bina türüne göre); ürüne dokununca satıcılar ve pazarlık açılır.
- Para birimi seçimi üst çubuktan Finans > Rapor > Ayarlar'a taşındı.
- **Pazar > Sat (elle satış):** mal dört adımda pazara konur: depo, ürün, miktar (¼, ½, tümü ya da elle), fiyat. Fiyat için üç hazır seçenek var: hızlı sat (%10 altı), piyasa fiyatı, kârlı sat (%10 üstü); her birinin yanında tahmini satış süresi yazar. Altta satış tutarı, %3 komisyon, eline geçecek tutar ve toptancının hemen ödeyeceği tutar karşılaştırılır. Arsa kartındaki "Pazarda sat" bu formu o ürünle açar. "İlanlarım" listesi buradadır; geri çekilen mal geldiği depoya döner. Eski "Pazara ilan ver" (tek dokunuşla, sabit fiyat çarpanıyla ilan) kaldırıldı.
- **Otomatik satışın fiyatı:** üretim binalarında çıkan mal kendiliğinden pazara konurken fiyatı oyuncu seçer. Sat formunda fiyatı seçtikten sonra "Üretim çıktıkça bu fiyatla koy" denir; depodaki mal ve sonra üretilen bu fiyatla ilana eklenir (basit görünümde de çalışır). Hazır seçenekler (piyasanın %10 altı … %20 üstü) piyasayla birlikte güncellenir; "kendi sabit fiyatım" (gelişmişte elle yazılan fiyat) piyasa değişse de sabit kalır. Arsa kartında otomatik ilanın fiyatı görünür, "Fiyatı değiştir" ve "Otomatiği kapat" düğmeleri vardır; otomatik kapatılınca var olan ilan elle yönetilen ilana döner.
- **Basit ve gelişmiş görünüm** (Finans > Rapor > Ayarlar; yeni oyunda basit):
  - Basit görünümde otomatik satış ("Üretim çıkınca"), otomatik girdi alımı ("Girdi bitince"), dükkân fiyat kuralları, pazarlık ve elle fiyat girme gizlenir; yerlerinde tek satırlık özet ve "Gelişmiş görünümü aç" düğmesi durur.
  - Kurulmuş otomasyonlar iki görünümde de çalışır; basit görünüm yalnızca özetini gösterir.
  - Girdisi biten üretim hattında her iki görünümde "Girdiyi pazardan al" düğmesi çıkar ve Pazar'da o ürünü açar.

Henüz yapılmayanlar (raporun orta ve düşük öncelikli maddeleri): devre dışı düğmeler ve "ne kadar eksik" mesajları, metindeki sekme adlarının bağlantıya çevrilmesi, kural paragraflarının katlanması, terimlerin tekleştirilmesi, Capacitor geri tuşu ve klavye ayarları. Arayüz gerçek bir telefonda henüz denenmedi.

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

### Fabrika makineleri

Fabrika binası ₺12 mn'dir ve yalnızca bina ile altyapıyı karşılar. 2026 yapı yaklaşık birim maliyetlerine göre sanayi tesisi 15.100–21.050 TL/m² (Ocak 2026, KDV ve arsa hariç; [tebliğ](https://www.hukukihaber.net/mimarlik-ve-muhendislik-hizmet-bedellerinin-hesabinda-kullanilacak-2026-yili-yapi-yaklasik-birim-maliyetleri-hakkinda-teblig)), yani ₺12 mn yaklaşık 600 m² eder. Makineler bir hatta tarif seçilince ayrıca alınır:

| Hat | Makineler (1. seviye) | Oyundaki kapasite (gerçek gün) | Gerçek karşılığın dayanağı | Geri dönüş (oyun günü, bina dahil, vergi öncesi) |
|---|---|---|---|---|
| Un | ₺6 mn | ~17 t un | 90 t/gün değirmen ~700 bin $ (Ukrayna), kapasiteyle orantılandı | ~12 |
| Giysi | ₺20 mn | ~5.700 adet | 10 makineli atölye ₺1–2 mn, ~400 adet/gün (tahmin) | ~9 |
| Alet | ₺30 mn | ~4.300 adet | Kaynak yok, tahmin | ~16 |
| Kumaş | ₺40 mn | ~8.600 m | Kaynak yok, tahmin | ~24 |
| Ekmek | ₺60 mn | ~171 bin somun | Fırın ₺4–8 mn / 8.000 somun/gün → ₺85–170 mn eşdeğer; sanayi hattı daha ucuz | ~20 |
| Peynir | ₺120 mn | ~29 t süt | Mandıra 2 t/gün ~₺35 mn, 50 t/gün ~₺275 mn (YDO fizibiliteleri) → ~₺150 mn | ~34 |
| Çelik | ₺250 mn | ~86 t | Küçük ark ocaklı tesis ~₺600 mn (hafızadan, yaklaşık) | ~49 |

- Her kapasite artışı makine bedelinin yarısını ekler (2. seviye: bina ₺12 mn + makinenin %50'si).
- Tarif değişince eski makineler yarı fiyatına satılır; tarif değiştirmek artık bedava değil.
- Makine harcaması kurumlar vergisinde gider sayılmaz; binayla birlikte yılda %10 amortismana girer. Net değere ve kredi teminatına yarısıyla girer.
- Gerçekte bir fabrika yatırımı yıllarda geri döner; oyunda bir sezon 60 gün olduğu için geri dönüş birkaç haftaya kısaltıldı. Peynir ve çelik bilerek geç oyun hedefidir; çelik gerçeğin yarısından ucuz tutuldu.
- Tarla ve madende ekipman (traktör, ekskavatör) bina fiyatına dahildir.
- Bölüm 9'daki bot süreleri makine bedelinden önceye aittir; fabrikaya dayanan büyüme artık daha yavaş olmalı, yeniden ölçülmeli.
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

## 13. Denge riskleri ve test planı

İki dış inceleme (Kasım 2026) sekiz risk saydı. Her biri koda karşı kontrol edildi; hepsi doğru.

**Hedef:** herkesi eşit tutmak değil. Herkese anlamlı bir başlangıç ve karşı strateji şansı vermek; daha iyi karar veren ve iyi örgütlenen avantaj kazanmalı, ama yeni ya da küçük oyuncu başka ürün, bölge, sözleşme veya iş birliğiyle karşı hamle yapabilmeli.

| # | Risk | Koddaki durum | Öneri |
|---|---|---|---|
| 1 | Belgede eski ve yeni kurallar çelişiyor | Doğruydu: bölüm 1–2 ilk taslaktaydı (haftalık %1–8 vergi, %5 arsa satış vergisi, 7 günde aktiflik). | **Yapıldı:** bölüm 0 tek doğru kaynak; bölüm 1–2 ona göre yeniden yazıldı. |
| 2 | Sürekli açık kalmak ödüllendiriliyor | 1 saat uzak kalan oyuncu ~37,5 oyun günü kaçırıyor, yalnızca 1 günü telafi ediliyor (`AWAY_MAX`). | Demo hızı ile çevrim içi hızı ayır. Sunucuda zaman herkes için aynı akmalı; çevrim dışı binalar çalışmaya devam etmeli. Bu, sezon uzunluğunu gerçek takvime bağlar (aşağıdaki 1. karar). |
| 3 | Zenginin avantajı kalıcı birikiyor | Unvan ayrıcalıkları kalıcı ve birikimli. Görev ve holding ödülleri net değerle ölçekleniyor. | Kalıcı prestij (unvan adı, rozet) ile sezonluk ekonomik avantajı ayır: ayrıcalıklar sezon başında sıfırlansın ya da sabit tavanla sınırlansın. Ödüller net değer yerine sabit tutar olsun. Kazanan kooperatif ya da holdinge **süreli ve tavanlı** avantaj ver (ör. bir sezon boyunca bakım veya taşıma indirimi, en fazla %10); sezonlar arasında ekonomik bonus taşınmasın. |
| 4 | Para ticaret yerine yan ödüllerden gelebilir | Başta haftalık görevler ₺750 bin = sermayenin %30'u. Hedefler toplam ₺5,6 mn. Holding haftada %2, mevduat yıllık %36. | Para kaynağı ölçümü (aşağıda) yapılmadan karar verme. Hedef: ilk 10 günden sonra ticaret dışı para, toplam girişin %15'ini geçmemeli. |
| 5 | Toptancı oyuncu ticaretini gölgeleyebilir | Alım kooperatifiyle toptancı fiyatı ×1,12 × 0,92 = **×1,03**; neredeyse piyasa fiyatı. Stok ve bütçe sınırı yok. | Kooperatif indirimi toptancıya değil oyuncu ilanlarına uygulansın. Toptancının bölge başına günlük stok ve alım bütçesi olsun; aşıldıkça fiyatı kötüleşsin. |
| 6 | Sıralama hacim şişirmeyi ödüllendiriyor | Toptancıya ve sözleşmeye satış sektör unvanına sayılıyor (`sold()` her ikisinde). | Sektör unvanına yalnızca dükkân perakendesi ve başka şirkete (ilan, sözleşme) satış saysın; toptancı saymasın. |
| 7 | Tek büyüme yolu var | Rehberin ilk adımı "tarla kur" diyor (dükkân da kabul ediliyor ama anlatılmıyor). Haftalık satış görevi kendi ürettiğin ürünü, hiç üretmiyorsan buğdayı istiyor; sadece dükkân işleten tüccara halka satamadığı bir ürün düşüyor. | Başlangıçta yol seçimi: üretici, tüccar (al-sat, dükkân), sanayici, kooperatifçi. Rehber ve görev havuzu seçilen yola göre ayrılsın; yol sonradan değişebilsin. Dört yol aynı koşullarda kıyaslansın (test planı 1). |
| 8 | Hacim ilişkili hesaplar arasında döndürülebilir | Demoda karşı taraf yalnızca sanal şirket olduğu için oluşmuyor; çevrim içinde iki hesap aynı malı birbirine satıp sektör hacmini şişirebilir. | Sektör puanı: nihai talebe (dükkân perakendesi, sanal şirket sözleşmesi) ulaşan satış tam, oyuncuya satış alıcı çeşitliliğiyle ağırlıklı sayılsın (aynı alıcıya giden payın üstü sayılmasın). Kısa sürede geri dönen mal sayılmasın; Rekabet Kurulu (bölüm 5) bu kalıbı işaretlesin. |

### Test planı
1. **Çekirdek ekonomi:** görev, hedef, holding, yatırım ve kooperatif kapalı. Yalnızca üretim–ticaret. Dört yol aynı koşullarda ayrı bot olarak oynar: üretici (tarla, maden), tüccar (yalnızca al-sat ve dükkân), sanayici (fabrika), kooperatifçi (zinciri paylaşan 3 bot).
2. **Avantajları tek tek aç:** her bonusu açıp çekirdekle farkını ölç.
3. **Senaryolar:**
   - yeni / eski oyuncu (sezon ortasında başlayan),
   - az / çok aktif (günde 1 kez vs. sürekli bakan),
   - tek / ekip (kooperatifte üretim zinciri paylaşan 3 bot),
   - organize ekip piyasaya hakimken yeni oyuncunun karşı stratejisi (başka ürün, bölge ya da sözleşme).
4. **Ölçülecekler:**
   - Rol başına günlük net kâr.
   - Para kaynağı payları: ticaret, ödül, faiz, temettü, toptancı.
   - Oyuncudan tedarik oranı (girdinin ne kadarı ilanlardan, ne kadarı toptancıdan).
   - Üretimin durduğu süre ve nedeni (girdi yok, depo dolu, para yok).
   - Yeni oyuncunun toparlanma süresi: kötü bir kararla (yanlış bina, cezalı sözleşme) düştükten sonra eski net değerine dönüş süresi.
   - Gini katsayısı ve ilk oyuncunun toplam servetteki payı (tekelleşme).
5. Bot bu ölçümleri `window.__tezgah.dbg` üzerinden toplar. Ham çıktılar `tasarim/testler/` altına CSV olarak konur, böylece belgeyi okuyan kişi sonuçları kendisi de inceleyebilir.

Bot testi tek oyunculudur. Gerçek çok oyunculu rekabeti, tekelleşmeyi ve eğlenceyi kanıtlamaz; bunlar için sunucu aşaması ve gerçek oyuncularla kapalı test gerekir.

**Sıra:** önce zaman ve sezon kararı (aşağıdaki 1. karar), çünkü diğer sayılar ona bağlı. Sonra dört yolun kıyası, sonra NPC toptancı ve ödüllerin tek tek eklenmesi, en son gerçek oyuncularla keyif ve anlaşılırlık testi.

### Açık kararlar
1. **Çevrim içi zaman ölçeği:** sezonun gerçek süresi, çevrim dışı üretim ve oyuncudan günde ne kadar zaman istendiği birlikte belirlenmeli. Seçenekler: 1 oyun günü = 1 gerçek saat (sezon 2,5 gün), 4 saat (sezon 10 gün), 12 saat (sezon 30 gün, günde iki kısa ziyaret). Demo hızı (96 sn) yalnızca deneme için kalır.
2. **Unvan ayrıcalıkları:** sezonluk mu olsun, yoksa tavanlı kalıcı mı?
3. **Ödüller:** sabit tutar mı olsun, yoksa net değerle ölçeklenip tavanlı mı?
