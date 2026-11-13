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
