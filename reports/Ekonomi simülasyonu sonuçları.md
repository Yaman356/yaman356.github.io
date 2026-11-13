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
