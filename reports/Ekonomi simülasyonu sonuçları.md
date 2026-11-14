# Ekonomi simülasyonu sonuçları

Tasarım dokümanındaki ürün tablosu ve kurallarla ajan tabanlı bir model çalıştırıldı. Üç sonuç tasarımı doğrudan etkiliyor: dükkânlar kârın neredeyse tamamını alıyor, sınırsız toptancı para basıyor ama zinciri ayakta tutuyor, ve kâr tablosuna bakıp sektör değiştiren oyuncuların oranı yükseldikçe ekonomi kendi kendini bozuyor.

Kod: `sim/economy_sim.py`. Ham sonuçlar: `sim/results.json`. Yeniden çalıştırma: `python3 sim/economy_sim.py` (yaklaşık 1,5 dakika).

## Model ve sınırları

- 12 ürün, üç bölge, taşıma, yüzde 5 kira, yüzde 3 komisyon ve çekicilik formülü demodaki değerlerle aynı.
- Her firma tek arsalı ve tek hatlıdır. Üretici, stok hedefine göre fiyatını saatte en fazla yüzde 2 oynatır ve maliyetinin altına inmez.
- "Kâr takipçisi" firmalar son üç günün sektör kâr tablosuna bakıp en kârlı role geçer; "sabit uzman" firmalar hiç değiştirmez.
- Her senaryo 30 oyun günü, beş rastgele tohumla koştu. Aksi yazılmadıkça 50 firma var ve sayılar 20–30. günlerin ortalamasıdır.
- Her koşunun sonunda para ve mal defterleri denetlendi; hepsi tuttu, negatif stok oluşmadı.

Bu model insan davranışını, eğlenceyi ve elde tutmayı ölçmez. Firmalar kazandığı parayı yeniden yatırmaz; bu yüzden para birikimi olduğundan yüksek görünür. Sonuçlar yön gösterir, ayar değeri vermez.

**Kapsama**, dört son ürün için şehir halkının talebinin karşılanan oranıdır. **Duruş**, fabrikaların girdi bulamadığı için boş kaldığı sürenin oranıdır.

Üç toptancı kuralı karşılaştırıldı:

| Kural | Tanım |
|---|---|
| A | Mevcut doküman: sınırsız alır ve satar, her bölgede şubesi var |
| B | Günlük ihtiyacın yüzde 15'i kadar acil stok satar, yüzde 10'u kadar bütçeyle alır |
| C | B ile aynı, ama tek şubesi Merkez'de; taşıma mesafeye göre |

## Bulgular

### 1. Dükkânlar kârın neredeyse tamamını alıyor

Sabit dağılımda, firma başına günlük servet artışı (ortalama):

| Rol | Toptancı A | Toptancı B |
|---|---:|---:|
| Ham madde | 695 | 307 |
| Ara mal | 129 | 98 |
| Son ürün | 168 | 139 |
| Dükkân | 4.089 | 4.843 |

Dükkân, fabrikanın 25–35 katı kazanıyor. Mevcut sayılarla "katmanlar eşit kârlı" ölçütü çok uzakta. Kaynağı perakende fiyatının toptan fiyatın 1,6 katı olması ve dükkânların fiyatta yeterince rekabet etmemesi. Kâr takipçileri devreye girince fark daralıyor (yüzde 25 takipçide dükkân 2.225, diğerleri 430–630), ama kapanmıyor.

### 2. Sınırsız toptancı para basıyor; en çok da talep düştüğünde

Firma başına günlük para akışı:

| Kalem | A, olağan | B, olağan | A, talep yarıya | B, talep yarıya |
|---|---:|---:|---:|---:|
| Tüketiciden giren | 1.622 | 1.656 | 1.047 | 1.060 |
| Toptancının oyuncudan alımı (giren) | 242 | 136 | 394 | 186 |
| Toptancının satışı (çıkan) | 38 | 18 | 38 | 18 |
| Üretim gideri (çıkan) | 621 | 564 | 589 | 478 |
| Kira (çıkan) | 176 | 168 | 136 | 123 |
| Komisyon ve taşıma (çıkan) | 87 | 83 | 68 | 63 |

- Dokümandaki "para yalnızca tüketici satışından girer" cümlesi yanlış: A kuralında toptancı alımları tüketici girişinin yüzde 15'i kadar ek para yaratıyor.
- Talep yarıya düşünce bu oran yüzde 38'e çıkıyor. Sınırsız son alıcı, satılamayan üretimi parayla ödüllendiriyor.
- Bütçeli toptancı bu girişi yaklaşık yarıya indiriyor.
- Yüzde 3 komisyon ve taşıma birlikte, giren paranın yaklaşık yüzde 5'ini yutuyor. Asıl yutaklar üretim gideri ve kira.

### 3. Küçük acil stok krizi çözmüyor

| Senaryo | Toptancı | Kapsama | Duruş | Toptancının alımlardaki payı |
|---|---|---:|---:|---:|
| Dengeli dağılım | A | %73 | %0 | %0 |
| Dengeli dağılım | B | %71 | %1 | %0 |
| Hiç ham madde üreticisi yok, geçiş yok | A | %78 | %1 | %63 |
| Hiç ham madde üreticisi yok, geçiş yok | B | %5 | %48 | %76 |
| Hiç ham madde üreticisi yok, yüzde 25 takipçi | B | %15 | %26 | %24 |
| Ham madde üreticilerinin yarısı 10. gün çekilir | A | %73 | %2 | %20 |
| Ham madde üreticilerinin yarısı 10. gün çekilir | B | %42 | %18 | %3 |

- Sınırsız toptancı zinciri her durumda ayakta tutuyor, ama o zaman ekonomi oyunculara değil sisteme dayanıyor (alımların yüzde 63'ü).
- Yüzde 15 kotalı toptancıyla herkes fabrika açarsa üretim çöküyor ve 30 günde toparlanmıyor. Tedarikçi kaybında beş koşunun dördü eski seviyeye dönemedi; fiyatlar olağanın üç katına (modeldeki tavan) çıktı.
- Sonuç: toptancı ne sınırsız ne de sabit küçük kotalı olmalı. Kota, eksik kalan girdiye göre büyüyüp oyuncu arzı geldikçe küçülmeli.

### 4. Az oyunculu sunucu ayrı bir sorun

| Firma sayısı | Kapsama, A | Kapsama, B | Duruş, B |
|---:|---:|---:|---:|
| 10 | %33 | %25 | %33 |
| 50 | %73 | %71 | %1 |
| 200 | %89 | %88 | %0 |

- 10 firmada 12 ürünün birçoğunu üreten kimse yok; bütçeli toptancı bu boşluğu dolduramıyor.
- Kapsama, toptancıdan bağımsız olarak da düşük: çekicilik formülündeki "vazgeçen müşteri" payı (K = 1), bölgede az dükkân varken talebin büyük kısmını yok ediyor. Tek dükkânlı bölgede talebin yarısı kayboluyor.
- İki öneri: K dükkân sayısıyla ölçeklensin; yeni sunucu daha az ürün ve daha cömert toptancıyla başlasın.

### 5. Asıl istikrarsızlık kaynağı sürü davranışı

Toptancı B ile, kâr tablosuna bakıp sektör değiştiren firmaların oranına göre:

| Takipçi oranı | Gösterilen bilgi | Kapsama | Duruş | 30 günde geçiş |
|---:|---|---:|---:|---:|
| %0 | — | %71 | %1 | 0 |
| %25 | Kâr tablosu | %68 | %9 | 69 |
| %25 | Kâr tablosu ve kurulmakta olan kapasite | %70 | %7 | 60 |
| %50 | Kâr tablosu | %51 | %26 | 154 |
| %50 | Kâr tablosu ve kurulmakta olan kapasite | %58 | %19 | 122 |
| %100 | Kâr tablosu | %14 | %34 | 281 |
| %100 | Kâr tablosu ve kurulmakta olan kapasite | %39 | %40 | 220 |

- Takipçi oranı dörtte biri geçince ekonomi bozuluyor; herkes takipçiyse çöküyor.
- Kurulmakta olan kapasiteyi göstermek her oranda yardımcı oluyor, en çok da en kötü durumda (yüzde 14'ten 39'a).
- Geçişe 12 saat bekleme eklemek bu modelde ek fayda sağlamadı.
- Modelde fabrikanın tarif değiştirmesi bedava ve anında; geçişlerin çoğu buradan geliyor. Demoda da böyle.
- Üreticilerin yarısı aynı gün en kârlı ürüne geçerse kapsama yüzde 68'den 29'a düşüyor ve beş koşunun dördü 20 günde toparlanamıyor.

Gerçek oyuncuların ne kadarının böyle davranacağını model söyleyemez; söylediği şey, tasarımın bu orana çok duyarlı olduğu.

### 6. İstifçilik kârsız ama zarar verebiliyor

200.000 sermayeli bir tüccar bütün unu toplayıp yüksek fiyattan satmaya çalıştı.

| Toptancı | İstifçinin 30 günlük sonucu | Un fiyatı (olağana göre) | Ekmekte kapsama |
|---|---:|---:|---:|
| A | −98.000 | 1,05 | %72 |
| B | −76.000 | 1,53 | %61 |

İki durumda da para kaybediyor. Ama kotalı toptancıda un fiyatını yüzde 50 yükseltip ekmek arzını düşürebiliyor; yani zarar etmeyi göze alan biri piyasayı bozabilir.

### 7. Arsa vergisinin tahsil günü fark etmedi

Firmaların yarısı arsa sahibi yapılıp yüzde 1 vergi günlük ya da haftalık toplu kesildi; sonuçlar aynı çıktı. Aktif arsa vergisi firma başına günde yaklaşık 5, kira ise 76–176. Bu modelde boş arsa ve çok arsalı oyuncu olmadığı için verginin asıl hedefi (istifçilik) sınanmadı.

### 8. Tek şubeli toptancı olağan piyasada fark yaratmadı

B ve C kuralları dengeli dağılımda aynı sonucu verdi, çünkü arz yeterliyken toptancıdan neredeyse hiç alım yapılmıyor. Kıtlık senaryolarında C sınanmadı.

## Tasarıma yansıması

1. **Perakende marjını ve K değerini yeniden ayarla.** Rol getirileri arasındaki fark en büyük dengesizlik.
2. **Toptancıyı iki role böl ve kotayı uyarlanır yap.** Son alıcı bütçeli olsun; acil tedarik, eksik kalan girdiye göre büyüsün.
3. **Sektör panosunda kurulmakta olan kapasiteyi göster.** Yalnızca geçmiş kârı göstermek sürüyü besliyor.
4. **Tarif değiştirmeye küçük bir maliyet koy.** Bedava ve anında geçiş, sürü davranışının ana kanalı. Bu, modelde ayrıca sınanmadı.
5. **Az oyunculu sunucu için ayrı başlangıç ayarı yap.** Daha az ürün, ölçeklenen K, cömert toptancı.

## Sınanmayanlar

- Çok arsalı oyuncular, arsa artırması, boş arsa vergisi ve sisteme satış.
- Sanal gündem olayları ve mini oyun gelirleri.
- Yeniden yatırım, bina yükseltme ve borç.
- Çoklu hesap ve fiyat referansı manipülasyonu.
- Aynı işlemin iki kez gönderilmesi gibi teknik hatalar; bunlar sunucu kodunda sınanmalı.

## Ek: Ar-Ge senaryoları

Fire (yüzde 10'dan 2'ye) ve verim (parti süresinde yüzde 15'e kadar kısalma) eklenerek dört senaryo koşuldu. Kod: `sim/rd_test.py`. Ham sonuçlar: `sim/rd_results.json`. Toptancı B, kâr takipçisi yok, 50 firma, beş tohum.

| Senaryo | Ortalama fiyat | Ham madde | Ara mal | Son ürün | Dükkân |
|---|---:|---:|---:|---:|---:|
| Kimse Ar-Ge yapmamış | 1,05 | 876 | 98 | 294 | 3.573 |
| Üreticilerin yarısı seviye 5, yapanlar | 0,74 | 353 | 512 | 262 | 4.372 |
| Üreticilerin yarısı seviye 5, yapmayanlar | 0,74 | 221 | 193 | 234 | 4.372 |
| Tüm üreticiler seviye 5 | 0,63 | 302 | 87 | 80 | 4.829 |
| Tüm üreticiler seviye 5, talep %25 büyür | 0,70 | 485 | 133 | 160 | 6.428 |

- Ar-Ge bireysel olarak kârlı, ama herkes yapınca fiyatlar düşüyor ve kazanç dükkânlara geçiyor.
- Perakende fiyatını piyasa fiyatına bağlamak da denendi: Ar-Ge olmadan bile fiyatlar olağanın iki katına çıktı. Toplam tüketici talebi fiyata tepki vermediği sürece bu bağ istikrarsız.
- Seviye 0 artık yüzde 10 fireyle başladığı için bu senaryoların sayıları ana bölümdeki sayılarla doğrudan karşılaştırılamaz.

## İkinci test turu (değerlendirme sonrası)

Dış değerlendirmede istenen ilk adımlar koşuldu. Kod: `sim/stage1.py`. Ham sonuçlar: `sim/stage1_results.json`. Toptancı B, 50 firma, beş tohum; ölçüm 10–30. günler. Rol tabloları yalnızca rolünü hiç değiştirmemiş firmaları kapsar. Sermaye; bina bedeli, stokun olağan değeri ve kasadaki paranın toplamıdır.

### Dükkân farkının büyük kısmı dükkân azlığından geliyor

Kâr takipçisi olmadan, dükkân sayısı artırılarak:

| Dükkân sayısı | Talebin karşılanması | Dükkân günlük kâr | Dükkân sermaye getirisi (günlük) | Ham madde getirisi | Son ürün getirisi | Dükkânın zararlı gün oranı |
|---:|---:|---:|---:|---:|---:|---:|
| 9 | %71 | 4.817 | %5,7 | %1,6 | %1,1 | %0 |
| 15 | %54 | 2.069 | %5,0 | %2,0 | %0,4 | %0 |
| 20 | %29 | 347 | %2,7 | %2,2 | %1,8 | %12 |
| 24 | %43 | 344 | %2,7 | %1,8 | %3,1 | %16 |

- Önceki raporda "dükkân kârın neredeyse tamamını alıyor" sonucu 9 dükkânlı bir dağılımda çıkmıştı. Dükkân sayısı 20'ye çıkınca dükkân getirisi üreticilere yaklaşıyor ve dükkân da zarar günleri yaşamaya başlıyor.
- Yani fark büyük ölçüde perakende marjından değil, az sayıda dükkânın tüm talebi paylaşmasından kaynaklanıyor. Serbest girişli bir oyunda oyuncular dükkân açtıkça fark kendiliğinden daralır.
- Ama dükkân sayısı artarken üretici azaldığı için talebin karşılanması düşüyor. Asıl denge noktası 50 firmada yaklaşık 12–15 dükkân gibi görünüyor; ara noktalar koşulmadı.
- Ara mal üreticisi her senaryoda en düşük getiriye sahip (günlük %0,6–0,8) ve zararlı gün oranı en yüksek rol. Ara mal tarifleri ayrıca ayarlanmalı.
- Son ürün fabrikaları kapasitelerinin yalnızca %49–78'ini kullanabiliyor; girdi bekliyorlar.

### Toptancı: acil stok ihtiyacın tamamına çıkabilmeli

| Acil stok kotası (günlük ihtiyacın) | Hiç ham madde üreticisi yokken karşılama | Dengeli dağılımda karşılama |
|---:|---:|---:|
| %5 | %3 | %68 |
| %15 | %5 | %71 |
| %30 | %10 | %73 |
| %50 | %18 | %73 |
| %100 | %78 | %73 |

- Dengeli dağılımda kota neredeyse hiç fark etmiyor.
- Kriz anında kota doğrusal değil çalışıyor: ihtiyacın yarısı bile yetmiyor. Uyarlanır kotanın gerektiğinde ihtiyacın tamamına çıkabilmesi gerekiyor; o durumda alımların %62'si toptancıdan geliyor.

Talep yarıya düştüğünde, son alıcının günlük bütçesine göre:

| Alım bütçesi (günlük ihtiyacın) | Toptancının yarattığı para (tüketici girişine oranı) | Ham madde günlük kârı |
|---:|---:|---:|
| %2 | %4 | 122 |
| %5 | %9 | 157 |
| %10 | %18 | 225 |
| %25 | %30 | 363 |
| %50 | %33 | 396 |

Bütçe büyüdükçe ham madde üreticisinin geliri korunuyor ama para basımı artıyor. %5–10 arası bir orta nokta; tercih tasarım kararı.

### Rol değişimi: sürtünme işe yaramadı, bilgi yaradı

| Kâr takipçisi oranı | Karşılama | Duruş | 30 günde geçiş |
|---:|---:|---:|---:|
| %0 | %71 | %1 | 0 |
| %10 | %69 | %3 | 26 |
| %20 | %71 | %7 | 54 |
| %30 | %65 | %15 | 93 |
| %40 | %58 | %17 | 119 |
| %50 | %52 | %27 | 154 |

Keskin bir eşik yok; duruş %10'dan itibaren artıyor, talebin karşılanması %30'dan sonra belirgin düşüyor. Önceki rapordaki "dörtte bir" ifadesi yalnızca üç noktaya dayanıyordu; bu tablo onun yerine geçer.

%50 takipçide, geçiş sürtünmesi ayrı ayrı denendi:

| Önlem | Karşılama | Duruş | Geçiş |
|---|---:|---:|---:|
| Yok | %52 | %27 | 154 |
| 12 saat gecikme | %48 | %26 | 153 |
| 24 saat gecikme | %42 | %18 | 138 |
| 48 saat gecikme | %33 | %16 | 128 |
| Bina bedelinin %10'u geçiş ücreti | %52 | %24 | 140 |
| %25 geçiş ücreti | %53 | %22 | 137 |
| %50 geçiş ücreti | %51 | %21 | 125 |

- Gecikme, geçiş sırasında üretim durduğu için talebin karşılanmasını kötüleştiriyor.
- Geçiş ücreti geçişleri ve duruşu biraz azaltıyor ama talebin karşılanmasını değiştirmiyor.
- İlk turda kurulmakta olan kapasiteyi göstermek karşılamayı %51'den %58'e çıkarmıştı. Bu modelde sürüye karşı en etkili araç bilgi, sürtünme değil.

### Hâlâ eksik olanlar

Boş arsa vergisi, yeniden yatırım, çok arsalı oyuncular, organize gruplar ve yeni oyuncunun ilerlemesi bu turda da modelde yok. Takipçilerin karar kuralı (son üç günün kârı) basit; gerçek oyuncular farklı davranabilir.

## Üçüncü tur: çok arsalı dünya

Model genişletildi: şirketlerin ortak kasası ve birden çok arsası var; sistem her gün arsa artırmaya çıkarıyor (50 firmada günde 2); şirketler kazancını arsaya yatırıp yeni işletme kuruyor; satın alınan arsa dokümandaki vergiye tabi (aktif %1, boşta bina %4, boş %8, haftalık; her ek arsa vergiyi %10 artırır). Kasası üç gün ekside kalan şirket bir arsasını sisteme yarı fiyatına satıyor. Kod: `sim/world.py`. Ham sonuçlar: `sim/world_results.json`. 40 oyun günü, beş tohum, ölçüm 10–40. günler, yaklaşık 13 dükkânlı dağılım. Her koşuda para ve mal defterleri tuttu.

Servet; kasa, stok, binaların yarı değeri ve arsaların güncel referans değerinin toplamıdır. Arsa fiyatı arttıkça arsa sahiplerinin serveti de artar.

### Önce: Ar-Ge testi dengeli dükkân sayısıyla

13 dükkânlı dağılımda tüm üreticiler seviye 5'e çıkınca talebin karşılanması %47'den %68'e çıktı, ortalama fiyat 1,47'den 0,91'e indi. Dükkân kazancı 1.954'ten 2.805'e, son ürün 205'ten 359'a çıktı; ham madde 594'ten 381'e düştü. Yani kazancın bir kısmı yine dükkâna geçiyor ama bu dağılımda Ar-Ge asıl olarak arz kıtlığını gideriyor. Kod: `python3 sim/rd_test.py --dengeli`.

### Yeniden yatırım arsa piyasasını en büyük para yutağı yapıyor

| Senaryo | Talebin karşılanması | Satılan arsa | Arsa fiyatı (başlangıca göre) | Arsa ödemesi / tüketici girişi | Vergi / tüketici girişi |
|---|---:|---:|---|---:|---:|
| Yatırım yok | %69 | 0 | 1,0 | %0 | %0 |
| Yatırım, vergi yok | %90 | 80 | 1,7–3,0 | %36 | %0 |
| Yatırım, doküman vergisi | %90 | 84 | 1,6–2,7 | %35 | %1,5 |
| Yatırım, vergi iki kat | %91 | 84 | 1,5–2,6 | %34 | %2,9 |

- Şirketler kazancını yeni işletmelere yatırınca arz artıyor ve talebin karşılanması %69'dan %90'a çıkıyor.
- Arsa alımları tüketiciden giren paranın üçte birini yutuyor; vergi yalnızca %1–3. Ekonominin asıl para yutağı arsa satışı.
- Arsa fiyatları 40 günde 1,5–3 katına çıkıyor. Bu, sistemin günde kaç arsa açtığına çok bağlı.
- Aktif arsa vergisi (%1) üretken şirketi neredeyse hiç etkilemiyor: günde 36 vergiye karşı yaklaşık 1.000 servet artışı.

### Boş arsa vergisi spekülasyonu kârsız kılıyor

60.000 kasalı bir spekülatör arsa toplayıp boş tuttu:

| Vergi | Spekülatörün günlük servet artışı | Normal şirket (ortalama / medyan) | Boş arsa |
|---|---:|---|---:|
| Yok | +1.450 | 1.081 / 487 | 5,8 |
| Doküman (%8) | −290 | 990 / 558 | 3,4 |
| İki kat | −455 | 981 / 514 | 3,2 |

Vergi yokken arsa toplamak üretimden daha kârlı; doküman vergisiyle zarar ettiriyor. %8 boş arsa vergisi bu modelde yeterli.

### Sonradan gelen oyuncular çok geride kalıyor

10. günden itibaren her gün bir yeni oyuncu katıldı (5.000 sermaye, kiralık başlangıç arsası).

| Senaryo | Yeni oyuncunun ilk 10 günü (günlük) | Aynı dönemde eski şirketler | 10 günde ikinci arsaya ulaşan | Arsa parasına ulaşamayan |
|---|---:|---:|---:|---:|
| Destek yok | 141 | 828 | %4 | %99 |
| Talep oyuncu sayısıyla büyür | 212 | 1.464 | %3 | %98 |
| Arsa arzı yarıya iner | 163 | 1.087 | %1 | %99 |
| Başlangıç parası arsa fiyatıyla büyür | 158 | 855 | %7 | %56 |
| Arsaların %30'u yenilere kiralık | 200 | 896 | %25 | %90 |
| İkisi birden | 342 | 891 | %63 | %42 |
| Herkese 10.000 başlangıç parası | 165 | 813 | %1 | %56 |

- Destek olmadan yeni oyuncu, aynı dönemdeki eski şirketlerin altıda biri hızında büyüyor ve neredeyse hiçbiri arsa alamıyor. Eski şirketler ortalama 2,6 arsayla çalışıyor; fark büyük ölçüde ölçek ve erken gelenin ucuz arsası.
- Tek başına hiçbir önlem yetmiyor. En iyi sonuç ikisinin birlikte uygulanması: yeni oyuncuya sunucu yaşına göre büyüyen başlangıç parası ve sistemden kiralanabilen ikinci arsa. Bu durumda yeni oyuncuların %63'ü ilk 10 günde ikinci arsaya ulaşıyor.
- Talebin oyuncu sayısıyla büyümesi eski şirketleri yeni gelenlerden daha çok zenginleştiriyor.

### Organize grup arsayı topluyor ama vergi frenliyor

Beş oyuncu kasalarını ve arsalarını birleştirdi:

| Vergi | Grup üyesi başına günlük | Normal şirket (ortalama / medyan) | Grubun arsa sayısı | Arsaların en büyük %10'luk şirketteki payı |
|---|---:|---|---:|---:|
| Yok | 1.058 | 873 / 240 | 21 | %60 |
| Doküman | 995 | 856 / 319 | 21 | %48 |

- Grup üyesi, tipik (medyan) oyuncunun 3–4 katı kazanıyor ve sunucudaki arsaların büyük kısmını tek elde topluyor.
- Doküman vergisi yoğunlaşmayı %60'tan %48'e indiriyor ama grubu durdurmuyor: 21 arsada çarpan 3 kata çıksa da aktif vergi düşük kalıyor. Daha dik bir çarpan bu turda sınanmadı.

### Tek tedarikçi zinciri kırabiliyor

Bütün çeliği üreten tek şirket fiyatını olağanın 2,5 katına çıkardı:

| Toptancının acil satış fiyatı | Aletin tüketiciye ulaşma oranı | Çelik fiyatı | Tekelin günlük kazancı |
|---|---:|---:|---:|
| Tekel yok | %87 | — | — |
| Piyasa ortalamasını izler | %13 | 2,27 | −7 |
| Olağan fiyatın %130'unda sabit | %29 | 1,95 | −3 |

- Tekel bu kuralla kâr etmiyor; ama alet zincirini neredeyse tamamen durduruyor.
- Toptancının acil fiyatı piyasa ortalamasını izlerse tekel fiyatı toptancıyı da yükseltiyor. Fiyatı olağan fiyata bağlamak zararı yarıya indiriyor ama kota küçük olduğu için yetmiyor.

### Başlangıç koşulları

| Oyuncu sayısı | Arsa fiyatı (başlangıca göre) | Yeni oyuncunun ilk 10 günü | Arsa parasına ulaşamayan yeni oyuncu |
|---:|---|---:|---:|
| 20 | 1,0–1,6 | 241 | %85 |
| 50 | 1,0–1,7 | 141 | %99 |
| 100 | 1,7–2,8 | 419 | %91 |

Her ölçekte yeni oyuncu sorunu sürüyor; büyük sunucuda arsa fiyatları daha hızlı artıyor.

### Bu turun sınırları

- Şirketler basit kurallarla karar veriyor: arsanın değerini son üç günün rol kârlarından tahmin ediyor. Spekülatörün ve tekelin stratejileri de basit; gerçek oyuncular daha akıllı davranabilir.
- Oyuncular arası arsa satışı, kiraya verme ve arsa sayısı çarpanının daha dik hali modelde yok.
- Tüketici talebi fiyata tepki vermiyor; sanal gündem olayları ve çoklu hesap hâlâ sınanmadı.
