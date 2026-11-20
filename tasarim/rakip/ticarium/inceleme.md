# Ticarium: telefonda oynanış incelemesi

20 Kasım 2026 · Samsung Galaxy S22 · Ticarium 2.21.0 (Google Play) · var olan bir misafir hesapla oynandı (3 mağaza, ₺1,8M nakit, seviye 3).
Ekran görüntüleri bu klasörde. Para harcayan hiçbir satın alma ya da reklam düğmesine basılmadı. Tarım gibi hesabın parasının çoğunu harcatan kilitler açılmadı.

Özet: Ticarium'un çekirdek ticaret döngüsü (oyuncudan mal al, rafa koy, fiyat ver, sat) gerçekten iyi kurulmuş. Fiyat satış hızını etkiliyor, ortak pazarda gerçek oyuncular satıcı olarak görünüyor ve her işlemde maliyet açıkça yazıyor. Ama oyunun etrafı 20 ayrı bölüm, beş para birimi, açılışta üst üste çıkan teklifler ve sayıları yanlış okutan kısaltmalarla dolu. Yeni oyuncuya hiçbir şey öğretilmiyor. Gelir modeli VIP'i sıralamanın tepesine taşıyor.

## Oynanan akış

1. Açılış: günlük ödül penceresi, kapatınca hemen ₺36,99'luk "Siftah Paketi" (indirim etiketi %9824).
2. Mağazalar → Manav: bütün raflar boş. Muz için "Ürün Al": sistem ajansı ($1,35/kg) ve gerçek oyuncu satıcılar ($1,38/kg) kalite, stok, nakliye ve mesafeyle listelendi.
3. 4.000 kg muz alındı: onay penceresi ("Emin misin?") ve fiş (ürün $5.400 + nakliye $200). Mal önce lojistik depoya gitti, "Rafları doldur" ile rafa geçti.
4. Satış başladı: maliyet $1,40, fiyat $3,19 (izin verilen en yüksek), 18 kg/dk, kâr $32/dk.
5. Fiyat $2,50'ye indirildi: önizleme "muhtemel stok bitiş süresi 1 sa 54 dk" dedi; satış 35 kg/dk'ya, kâr $38,5/dk'ya çıktı.
6. Gezildi: Piyasa Durumları, Banka, Dijital Borsa (kripto), Sıralamalar, Mağaza (CEO Pass, Reklamsız Paket, Para Destesi), Etkinlikler (Şanslı Çekiliş), Restoran, Tarım (kilitli).

## Olumlu yanlar

- **Fiyat esnekliği gerçek ve görünür.** Fiyat düşünce satış hızı artıyor ve en kârlı fiyat en yüksek fiyat değil. Fiyat girerken stok bitiş süresi önizleniyor. Bu, oyunun en iyi kararı.
- **Oyuncular arası ortak pazar.** Mal alırken sistemin yanında gerçek şirketler satıcı olarak listeleniyor (konum, mesafe, kalite, stok). Ekonomi canlı hissettiriyor.
- **Şeffaf işlemler.** Kilo başı fiyat, nakliye, kalite, vergi oranı her kartta; alımda onay ve ayrıntılı fiş var.
- **Dükkân kartı bilgi yoğun ama okunur.** Stok çubuğu, maliyet, satış hızı, geri sayım, vergi ve kalite tek kartta.
- **Görsel kalite tutarlı.** Koyu lacivert zemin, parlak izometrik bina simgeleri, büyük dokunma hedefleri, sayısal tuş takımı (000 düğmesi pratik).
- **Derinlik.** Mağaza, tarım, hayvancılık, sanayi, maden, arazi, Ar-Ge, lojistik, kripto, mevduat, kooperatif, restoran, ihale, ek işler: uzun süre oynayana çok iş var.
- **Piyasa durumu ekranı.** Ürün başına talep durumu ("Çok iyi", "Normal") ve vergi oranı tek listede.

## Eksikler ve hatalar

### Hatalar
- **"B" kısaltması yanlış okunuyor.** Binler için "B" (bin), milyonlar için "M" kullanılıyor: "Günlük Mağaza Cirosu $83.44B", "Toplam Vergi Borcu $3.01B", "Min. yatırım limiti $500B" (en yüksek $1,82M iken). Oyuncu "B"yi milyar okur. Sıralamada ise milyar için "Mr" yazıyor; üç ayrı sistem.
- **Kripto grafiğinde eksen etiketleri tekrar ediyor** ("24,9 B" ve "24,6 B" ikişer kez).
- **Geri tuşu oyundan çıkarıyor.** Mağaza listesinde Android geri tuşu bir üst ekrana değil, "Oyundan çıkılsın mı?" sorusuna gidiyor.
- **Sıralama eski dönemle açılıyor:** Kasım 2026'da varsayılan sekme "Mayıs / 2026".
- **Gösterilen kâr vergiyi düşmüyor gibi:** $2,50 fiyat, $1,40 maliyet, 35 kg/dk → tam $38,50/dk; ürünün %8 vergisi yansımamış.

### Kullanım sorunları
- **Öğretici yok.** Ana oyunda hiçbir yönlendirme yok; Restoran'daki "öğretici" yalnızca yardım düğmesini gösterip bitiyor.
- **Tehlikeli varsayılan miktar.** Ürün alımında miktar 1.000.000 kg ($1,4M) geliyor; dükkânın ihtiyacı 4.000 kg. Tek dokunuşla kasa boşalabilir.
- **Yanlış yere dokunmak para yiyor.** Mağaza adının yanındaki kaleme dokununca 25 jetonluk "Mağaza adı güncelle" açılıyor; dükkâna girmek isteyen oyuncu buraya düşüyor.
- **Açılışta teklif yağmuru.** Önce günlük ödül, ardından paket teklifi; ana ekranda "Günlük Teklifler" sabit rozeti.
- **Kalıcı kırmızı uyarı şeridi.** "Hesabını bir platforma bağlamak için dokun" her ekranın üstünde ~70 px yer kaplıyor.
- **Beş para birimi.** Jeton, elmas, altın külçe, nakit ve reklam kartları; hangisinin ne işe yaradığı yazmıyor.
- **Kilitlerin karşılığı yazmıyor.** Tarım "Aktif Et 1,25M" diyor, ne kazandıracağını söylemiyor.
- **20 bölümlü menü** iki sayfaya bölünmüş; önemli olanla yan içerik aynı ağırlıkta.

### Gelir modeli
- **Sıralamanın ilk 7'si VIP.** Ücretli üyelik rekabette belirleyici görünüyor.
- **Fiyatlar:** CEO Pass ₺929,99/30 gün, Aylık Reklamsız Paket ₺199,99 (reklamları "hızlıca geçmeyi" sağlıyor, kaldırmıyor), Siftah Paketi ₺36,99.
- **Şans çarkı (Şanslı Çekiliş)** jetonla çevriliyor; ödüller arasında VIP ve reklamsız süre var. Ganimet kutusu benzeri; mağaza yaş derecesini ve oyuncu algısını etkiler.
- Ödüllü reklam her yerde: günlük ödül ×2, para destesi, restoran ×3.

### Teknik
- Flutter ile yapılmış; kurulum 95 MB.
- Bellek kullanımı yüksek: ~640 MB (PSS). Düşük donanımlı telefonlarda arka plana atılınca kapanma riski.
- Kısa ölçümde 90. yüzdelik kare süresi 105 ms; menü geçişlerinde takılma var (ölçüm kısa, kesin değil).

## Tezgâh için çıkarımlar

- **Al:** fiyat-satış hızı ilişkisini görünür kıl. Fiyat girerken "stok şu sürede biter" önizlemesi, satıcının kim olduğu, mesafesi ve nakliyesi, alımda ayrıntılı fiş. Tezgâh'ta fiyat esnekliği zaten var; önizleme ve "en kârlı fiyat" göstergesi eklenebilir.
- **Kaçın:** "B" gibi belirsiz kısaltmalar; Tezgâh "bin / mn / mlr" kullanıyor, böyle kalmalı. Tehlikeli varsayılan miktarlar. Açılışta teklif. Sıralamayı etkileyen ücretli üyelik. Şans çarkı.
- **Fark yaratabilecek alan:** öğretici ve ilk 10 dakika. Ticarium'da yok; Tezgâh'ın rehber hedefleri ve bina seçimindeki kâr tahmini burada avantaj.
