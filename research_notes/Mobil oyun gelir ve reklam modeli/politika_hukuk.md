# Tezgâh oyununu Türkiye'de para kazandırırken mağaza politikaları ve hukuk kuralları (2025-2026)

Bu notlar hukuki görüş değildir. Kaynakların çoğu ikincil kaynaktır: hukuk büroları, mali müşavir siteleri ve haber siteleri. Birincil Google ve Apple sayfalarının bir kısmı oturum sırasında zaman aşımına uğradı. Bu bölümler aşağıda ayrıca işaretlendi. Araştırma tarihi: 16 Kasım 2026.

## 1. Google Play: ödeme, reklam, aile politikası, simüle kumar ve içerik derecelendirmesi

### Özet
Gerçek paraya çevrilemeyen sanal parayla oynanan bowling bahsi ve borsa/altın ticareti "gerçek parayla kumar" sayılmaz. Bu özellikler mağazada yayınlanabilir, ancak IARC anketinde "simüle kumar" olarak dürüstçe beyan edilmeleri gerekir. Asıl kesin kurallar şunlar: sanal para hiçbir yolla gerçek paraya veya değeri olan bir ödüle dönüştürülemez, oyun gerçek paralı kumar sitelerine yönlendirmez, dijital ürünler yalnızca Play Billing ile satılır ve ödüllü reklamlar kullanıcının kendi seçimiyle açılır.

### Kaynaklı bulgular
- Google'ın Kumar politikası, gerçek parayla kumar oynanan uygulamaları lisanslı ve onaylı kategorilerle sınırlar. Eşleşen arama özetlerine göre politika şu yasakları da içerir: "simulated casino game that promotes or directs users to real money casinos" (gerçek paralı casinoları tanıtan veya kullanıcıyı oraya yönlendiren simüle casino oyunu). Ayrıca uygun olmayan uygulamaların, NFT dahil, değerli varlık kazanma şansı için para kabul etmesi yasaktır. — [Google Play Real-Money Gambling, Games and Contests](https://support.google.com/googleplay/android-developer/answer/9877032). Sayfa doğrudan açılamadı (socket hang up / timeout), içerik arama özetinden alındı.
- Oyunlardaki sadakat programı ödülleri "may not be wagered, awarded or exponentiated by game performance or chance-based outcomes" (oyun performansına veya şansa bağlı sonuçlarla bahse konamaz, kazandırılamaz veya katlanamaz). — [Google Play Real-Money Gambling policy (arama özeti)](https://support.google.com/googleplay/android-developer/answer/9877032); [Play Academy gamified loyalty FAQ](https://playacademy.exceedlms.com/student/page/211175-top-questions-about-google-play-gamified-loyalty-program-policy)
- 28 Ekim 2025: Google, Gambling & Games reklam politikasında "sweepstake casino" modelini (paraya çevrilebilir çift para birimli sistemler) social casino kapsamından çıkardı. Ayrıca gerçek paralı oyun özelliği olan uygulamaların reşit olmayanları Play Console araçlarıyla engellemesini şart koştu. — [iGaming Expert](https://igamingexpert.com/news/business/google-sweepstake-policies-2025/?amp=1) (ticari basın, Google'ın kendi duyurusu değil)
- Ödüllü reklamlar, kullanıcı bu reklam deneyimini "explicitly opted into" (açıkça kendisi seçtiği) için rahatsız edici reklam kuralına takılmaz. — [Google Play Better Ads Experiences / Ads policy](https://support.google.com/googleplay/android-developer/answer/9857753?hl=en) (arama özeti)
- Families politikası: Kitlesi yalnızca çocuklardan oluşan uygulamalar Families Self-Certified Ads SDK kullanmak zorundadır. Sonradan yapılan bir güncellemeyle bu kural, çocuklara ve yaşı bilinmeyen kullanıcılara da hizmet veren uygulamalara genişletildi. Families kapsamında, ödüllü reklamlar dahil, oyunu bölen reklamların 5 saniye sonra kapatılabilmesi gerekir. — [Families Self-Certified Ads SDK Policy](https://support.google.com/googleplay/android-developer/answer/12918983); [AdMob forum](https://groups.google.com/g/google-admob-ads-sdk/c/YmFJHnkA-wQ)
- AdMob destek yanıtına göre (forum, Ağustos 2025) ödüllü reklamın en geç 30 saniyede atlanabilir olması gerekir. "High-engagement ads" açıksa bu süre 60 saniyedir. Eylül 2025'te bir Play derlemesi, reklamların 5 saniye sonra kapatılamaması gerekçesiyle reddedildi. — [AdMob forum](https://groups.google.com/g/google-admob-ads-sdk/c/oJ4VhdHGW3Y) (anekdot niteliğinde)
- 13 Kasım 2023'ten sonra açılan kişisel geliştirici hesapları, üretime çıkmadan önce en az 12 test kullanıcısının 14 gün kesintisiz katıldığı kapalı bir test yapmak zorundadır. Kuruluş hesapları bu kuraldan muaftır ancak D-U-N-S numarası gerekir. — [Play Console Help 14151465](https://support.google.com/googleplay/android-developer/answer/14151465)
- Play Billing zorunluluğu: Dijital ürünler ve sanal para Google Play Billing ile satılmalıdır. Türkiye için alternatif faturalandırma ("user choice billing") bulguya rastlanmadı. — [Google Play alternatif faturalandırma (TR)](https://support.google.com/googleplay/answer/11174377?hl=tr) (ülke listesi bu oturumda doğrulanmadı)

### Çıkarımlar
- Tezgâh'ın IARC anketinde, bowling bahsi ve muhtemelen borsa/döviz/altın alım satımı için "simüle kumar: evet" cevabı verilmelidir. Bu cevap, bölgeye göre PEGI 12/16 veya ESRB Teen gibi derecelendirmelere yol açar ve Families/çocuk hedefli kategoriye girmeyi pratikte engeller. Hedef kitleyi "13+ veya 18+" olarak beyan etmek, Families SDK yükünü de azaltır.
- Kesinlikle yapılmaması gerekenler: Sanal parayı gerçek paraya, hediye çekine veya değeri olan bir ödüle çevirmek; sezon sıralaması ödülünü IAP ile alınabilen sanal paraya bağlayarak "para ver, şans kazan" döngüsü kurmak; bahis sonucunu ödüllü reklamla katlamak (sadakat programı kuralıyla benzeşir). IAP ile sanal para satılacaksa bowling bahsinin şansa değil beceriye dayalı olduğu açıkça gösterilmelidir.
- Rastgele içerikli bir kasa ya da paket satılırsa olasılıkların açıklanması gerekir. Google'ın Payments politikasında "loot box" olasılıklarının satın almadan önce gösterilmesi şartı bulunur, ancak bu oturumda doğrudan doğrulanamadı.

### Bilinmeyenler
- Google Kumar ve Payments politikalarının güncel tam metni açılamadı. Loot box olasılık açıklaması maddesinin kesin numarası ve ifadesi doğrulanmalı.
- Borsa ve forex simülasyonunun IARC anketinde "simüle kumar" sayılıp sayılmadığına dair açık bir kaynak bulunamadı. Bu nokta belirsiz.
- 2025-2026 dönemindeki "Android geliştirici kimlik doğrulaması" zorunluluğunun ayrıntıları araştırılmadı.

## 2. Apple App Store: inceleme yönergeleri, yaş derecelendirmesi, ATT ve gizlilik etiketleri

### Özet
Apple'ın kuralları mevcut tasarımla uyumludur. Tezgâh gerçek paralı oyun olmadığı için 5.3.3 ve 5.3.4 maddeleri uygulanmaz. Uyulması gerekenler: kilit açmaya yönelik her şey IAP ile satılır (3.1.1), loot box olasılıkları açıklanır, satın alınan sanal para süresi dolmadan kalır, reklam izlemek için ödül verilebilir (3.2.2(x)), izleme için ATT izni alınır (5.1.2(i)). 2025'te gelen yeni yaş derecelendirmesinde simüle kumar, uygulamayı 13+ veya 18+ seviyesine taşır.

### Kaynaklı bulgular
- 3.1.1: Oyun içi para birimi ve seviye kilidi açma gibi her şey "must use in-app purchase" (uygulama içi satın alma kullanmalıdır). Satın alınan "credits or in-game currencies ... may not expire" (krediler veya oyun içi paralar süresi dolmamalıdır) ve geri yükleme mekanizması bulunmalıdır. "Loot boxes" satan uygulamalar olasılıkları "prior to purchase" (satın almadan önce) açıklamak zorundadır. — [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- 3.2.2(x): Kullanıcıyı puanlama veya yorum yapmaya zorlamak yasaktır. Bununla birlikte uygulamalar "may otherwise incentivize users to take specific actions within apps (such as by completing a level or watching an ad)" (seviye tamamlama veya reklam izleme gibi uygulama içi eylemler için teşvik verebilir). Bu madde ödüllü reklamlara açıkça izin verir. — [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- 5.3: "Gaming, gambling, and lotteries ... one of the most regulated offerings" (oyun, kumar ve piyangolar en sıkı düzenlenen alanlardan biridir). Diğer maddeler: 5.3.3 IAP ile gerçek paralı oyun kredisi satılamaz. 5.3.4 gerçek paralı oyunlar için lisans, bölge kısıtlaması ve ücretsiz uygulama şartı arar. 5.3 metni "simüle kumar"dan söz etmez. — [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- 5.1.1(i)-(ii): Gizlilik politikasının bağlantısı App Store Connect'te ve uygulamanın içinde bulunmalıdır. Veri toplamak için onay alınmalıdır. Ücretli işlevler veri iznine bağlanamaz. Onayı geri çekmenin kolay bir yolu sunulmalıdır. — [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- 5.1.2(i): "You must receive explicit permission from users via the App Tracking Transparency APIs to track their activity" (kullanıcı etkinliğini izlemek için App Tracking Transparency API'leri üzerinden açık izin almalısınız). — [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- 2.3.6: Yaş derecelendirmesi anketi dürüstçe cevaplanmalıdır. 2.3.8: Mağaza görselleri, uygulamanın derecesi daha yüksek olsa bile 4+ seviyesine uygun olmalıdır. — [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- 24 Temmuz 2025: Apple yeni yaş seviyeleri ekledi: 4+, 9+, 13+, 16+, 18+. 12+ ve 17+ seviyeleri kaldırıldı. Derece, anket cevaplarından otomatik hesaplanır. — [MacTech](https://www.mactech.com/2025/07/25/apple-updates-age-ratings-in-its-various-app-stores); [App Store Connect Help – age ratings](https://developer.apple.com/help/app-store-connect/reference/age-ratings)
- Apple'ın tanımına göre simüle kumar: "Betting or wagering without using real money or in-game currency that can be exchanged for real money" (gerçek para veya gerçek paraya çevrilebilen oyun içi para kullanmadan yapılan bahis). Seyrek görülürse 13+, sık görülürse 18+ derece verilir. Bir rehber "sık" durum için 16+ diyor, yani kaynaklar tutarsız. Avustralya'da herhangi bir simüle kumar R18+, Güney Kore'de sık simüle kumar ek bölgesel derece getirir. — [trysonar](https://trysonar.app/blog/app-store-age-rating); [capgo](https://capgo.app/blog/app-store-age-ratings-guide/); [Neowin](https://www.neowin.net/news/simulated-gambling-triggers-r18-rating-in-australia-for-iphone-apps/)

### Çıkarımlar
- Bowling bahsi oyunun merkezinde ve sürekli tekrarlanan bir döngüyse "Frequent" (sık) sayılıp 18+ derece alma riski taşır. Bu, kitleyi ve keşfedilebilirliği daraltır. Bahsi isteğe bağlı ve seyrek tutmak 13+ ile yetinmeyi sağlayabilir. Yalnızca ikincil kaynaklara dayanan bu eşikleri App Store Connect'te doğrulayın.
- ATT: AdMob'da kişiselleştirilmiş reklam ve IDFA kullanılacaksa ATT istemi gösterilmelidir. İstem gösterilmezse yalnızca kişiselleştirilmemiş reklam sunulabilir. Gizlilik "nutrition label" etiketinde AdMob SDK'nın topladığı veriler (cihaz kimliği, reklam verisi, kaba konum, kullanım verisi) beyan edilmelidir.
- Restore Purchases düğmesi bulunmalı, satın alınan sanal para hiçbir zaman sezon sıfırlamasıyla silinmemelidir. Sezon sıfırlaması yalnızca oyunda kazanılan parayı etkilemeli, IAP ile alınan bakiyeyi korumalıdır.

### Bilinmeyenler
- App Store Connect'teki yaş derecelendirmesi sayfası açılamadı (timeout). Simüle kumarın 13+, 16+ ve 18+ seviyelerine kesin eşleşmesi ve yeni anketin "In-App Controls" ve "Advertising" gibi sorularının ayrıntısı doğrulanmalı.
- Türkiye'ye özgü bir Apple bölgesel derecesine rastlanmadı.

## 3. Onay yönetimi: Google UMP, GDPR ve KVKK

### Özet
AdMob, AB/AEA, İngiltere ve İsviçre kullanıcıları için Google sertifikalı bir CMP (örneğin UMP SDK) kullanılmasını şart koşar. Uygulama Türkiye dışına da yayınlanacaksa UMP entegrasyonu fiilen zorunludur. KVKK'da 2024'te yapılan değişikliklerden sonra yurt dışına veri aktarımı (Google ve Apple sunucuları) artık yalnızca açık rızaya dayandırılamaz. Ayrıca aydınlatma metni, çerez/izleme rızası ve gerekirse standart sözleşme bildirimi gerekir.

### Kaynaklı bulgular
- 7499 sayılı Kanun 12 Mart 2024'te Resmî Gazete'de yayımlandı. Yurt dışı aktarım rejimi değişti ve açık rıza, yalnızca diğer şartlar mevcut değilse başvurulan istisnai bir dayanak haline geldi. Geçiş süresi 1 Eylül 2024'te sona erdi. — [Hukukçular Evi](https://hukukcularevi.com/kisisel-verilerin-yurt-disina-aktariminda-yeni-kurallar-kvkk/); [hukukihaber](https://www.hukukihaber.net/kvk-kanununda-ozel-nitelikli-kisisel-verilerin-islenmesi-ve-yurt-disina-veri-aktarimi-kapsaminda-yapilan-degisikliklere-iliskin-degerlendirmeler)
- KVK Kurulu, 4 Haziran 2024 tarihli 2024/959 sayılı kararla dört standart sözleşme seti yayımladı. Sözleşmeler değiştirilmeden kullanılmalı ve imzadan sonra 5 iş günü içinde Kurum'a bildirilmelidir. Bildirim modülü Ekim 2024'te açıldı. — [KVKK duyurusu 7938](https://www.kvkk.gov.tr/Icerik/7938/Standart-Sozlesmeler-ve-Baglayici-Sirket-Kurallarina-Iliskin-Dokumanlar-Hakkinda-Kamuoyu-Duyurusu); [KVKK duyurusu 8043](https://www.kvkk.gov.tr/Icerik/8043/Standart-Sozlesme-Bildirim-Modulu-Hakkinda-Kamuoyu-Duyurusu)
- KVKK'nın "Çerez Uygulamaları Hakkında Rehber" adlı bir rehberi vardır. Mobil reklam tanımlayıcıları için ayrıca incelenmesi gerekir. — [Hukukçular Evi](https://hukukcularevi.com/kisisel-verilerin-yurt-disina-aktariminda-yeni-kurallar-kvkk/)
- Apple 5.1.1(ii): Anonim veri dahil, veri toplamak için onay alınmalı ve onayı geri çekmenin kolay bir yolu sunulmalıdır. — [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

### Çıkarımlar
- Asgari paket şunlardan oluşur: (1) Türkçe ve İngilizce gizlilik politikası ve KVKK aydınlatma metni; (2) ilk açılışta UMP onay formu (AEA için zorunlu; Türkiye için de aynı formu kullanmak KVKK'daki "açık rıza" gerekliliğini pratikte karşılar); (3) iOS'ta ATT istemi; (4) ayarlarda "onayı geri çek / reklam tercihleri" bağlantısı; (5) Play Data safety formu ve Apple gizlilik etiketi.
- Google ve Apple ile yapılan aktarım için kendi standart sözleşmelerini KVKK'ya bildirip bildirmeyeceğiniz, Google'ın veri işleme şartlarının Türkiye ekini sunup sunmadığına bağlıdır. Bu nokta belirsiz.
- VERBİS: Gerçek kişi veya küçük işletmeler için yıllık çalışan sayısı ve bilanço eşiklerinin altında kalınıyorsa kayıt muafiyeti olabilir. Bu oturumda doğrulanmadı.

### Bilinmeyenler
- AdMob'un Türkiye kullanıcıları için CMP şartı arayıp aramadığı doğrulanmadı. Bilinen şart AEA, İngiltere ve İsviçre içindir. — [AdMob help 6223431](https://support.google.com/admob/answer/6223431?hl=en) (sayfa bu oturumda açılmadı)
- Google'ın KVKK standart sözleşmesi sunup sunmadığı araştırılmadı.
- VERBİS eşikleri doğrulanmadı.

## 4. Türkiye: oyun düzenlemesi, loot box ve sanal bahis

### Özet
2026'nın en önemli değişikliği 7578 sayılı Kanun'dur. Kanun 1 Mayıs 2026'da Resmî Gazete'de yayımlandı, oyunla ilgili hükümlerinin çoğu 1 Kasım 2026'da yürürlüğe girdi. Kanun "oyun geliştirici" ve "oyun platformu" kavramlarını tanımlar, derecelendirilmemiş oyunların yalnızca en yüksek yaş grubunda sunulmasına izin verir ve yaş doğrulama yükünü sosyal ağlara bırakır. Doğrudan bir loot box yasağı yoktur. Sanal parayla oynanan, gerçek paraya çevrilemeyen bahisler için özel bir Türk kuralı bulunamadı.

### Kaynaklı bulgular
- 7578 sayılı Kanun 22 Nisan 2026'da TBMM'de kabul edildi ve 1 Mayıs 2026 tarihli, 33240 sayılı Resmî Gazete'de yayımlandı. Sosyal medyada 15 yaş sınırı getirdi. Uygulama yönetmelikleri henüz beklenmektedir. — [Tamindir](https://www.tamindir.com/haber/oyun-sosyal-medya-kanun-teklifi-tbmmde_106482/); [Webtekno](https://www.webtekno.com/oyun-yasasi-kabul-edilen-iptal-edilen-maddeler-h214611.html)
- Kanunun son metninde "oyun sağlayıcı" kavramı kaldırıldı. Yerine "oyun geliştirici" (dijital oyunu tasarlayan veya geliştiren gerçek ya da tüzel kişi) ve "oyun platformu" (satış, dağıtım, indirme ve erişim altyapısı) tanımları geldi. Platformlar derecelendirilmemiş oyunları yalnızca en yüksek yaş kriterine göre derecelendirerek sunabilir. Yaş doğrulama sosyal ağların yükümlülüğü olarak kaldı. BTK, açıklama taleplerini yalnızca platformlara ve "doğrudan ilgili" konulara yöneltebilir. Kurallara uymayan platformlar için bant daraltma oranı önce %30, en fazla %50'dir. Tanımlar 1 Mayıs 2026'da, diğer hükümler 1 Kasım 2026'da yürürlüğe girdi. — [Pekin & Pekin](https://pekin.com.tr/2026/05/05/oyun-sektorunu-ilgilendiren-kanun-teklifi-tbmmde-degisiklige-ugradi/)
- Komisyon aşamasında BTK'nın yönetmelikle yeni yükümlülük (örneğin loot box yasağı) getirme yetkisi daraltıldı, ancak bir sektör yorumuna göre tamamen kaldırılmadı. Türkiye'den günlük erişimi yüksek yabancı oyun dağıtıcılarının Türkiye'de temsilci bulundurması gerekir. — [Webtekno](https://www.webtekno.com/oyun-yasasi-kabul-edilen-iptal-edilen-maddeler-h214611.html); [TOGED](https://toged.org/haberler/togedin-degisiklik-talepleri-kabul-edildi-oyun-kanunu-komisyondan-gecti); [CBC Law](https://www.cbclaw.com.tr/en/dijital-oyun-platformlarina-yeni-uyum-rejimi-5651-sayili-kanunda-ongorulen-degisiklikler)
- 15-18 yaş için içerik ayrımı öngören yeni bir dijital oyun yönetmeliği planlandığı bildiriliyor. — [Fokus+](https://www.fokusplus.com/gundem/dijital-oyunlara-yeni-yonetmelik-geliyor-15-18-yas-icin-icerik-ayrimi-planlaniyor)

### Çıkarımlar
- Tezgâh'ı Türk bir "oyun geliştirici" olarak yayınlamak, ana yükümlülükleri platformlara (Google ve Apple) bırakır. Yine de IARC/Apple derecelendirmesinin doğru verilmesi kritiktir, çünkü yanlış veya eksik derecelendirme oyunun 18+ grubuna itilmesine yol açabilir.
- Sanal bahis ve borsa simülasyonu, sanal para paraya çevrilemediği ve oyun içi para satışı ile bahis birbirinden ayrı tutulduğu sürece Türk hukukunda kumar sayılmaz. Bu, 7258 sayılı Kanun ve TCK 228 açısından bir çıkarımdır, doğrudan bir kaynakla teyit edilmedi. Oyun içinde kullanıcılar arası para transferi veya pazar yeri açılmamalıdır.
- BTK'nın 2026-2027 yönetmeliklerini (yaş derecelendirme sistemi, ebeveyn denetimi, oyun içi satın alma) takip edin.

### Bilinmeyenler
- 7578 sayılı Kanun'un tam metni okunmadı. Hangi derecelendirme sisteminin (PEGI, IARC veya yerli bir sistem) kabul edileceği ve temsilci eşikleri bilinmiyor.
- Türkiye'de loot box veya sanal parayla bahis için Danıştay ya da Tüketici Hakem Heyeti kararı bulunamadı.
- 7258 sayılı Kanun ve TCK 228'in sanal para bahsine uygulanmadığını gösteren doğrudan bir kaynak bulunamadı.

## 5. Türk tüketici hukuku: uygulama içi satın almalar ve iadeler

### Özet
Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesinde dijital içerik için cayma hakkı istisnaları vardır. Satış Google veya Apple üzerinden yapıldığı için iadeler pratikte mağazaların kendi süreçleriyle yürür. Geliştiricinin yapması gerekenler: tüketiciyi yanıltmayan fiyat ve içerik açıklaması, olasılık bilgisi, ve satın alınan içeriğin teslim edilmesi.

### Kaynaklı bulgular
- MSY m.15 cayma hakkının kullanılamayacağı sözleşmeleri sayar. Bunlar arasında koruyucu ambalajı açılmış "dijital içerik, yazılım programları" (15/1-e) bulunur. İstisna, ürünün adına göre değil bendin tarif ettiği duruma göre uygulanır ve yalnızca "taraflarca aksi kararlaştırılmadıkça" geçerlidir. — [Hukukçular Evi](https://hukukcularevi.com/mesafeli-sozlesme-cayma-hakki-istisnalari/); [Lexpera MSY metni](https://www.lexpera.com.tr/mevzuat/yonetmelikler/mesafeli-sozlesmeler-yonetmeligi)
- Yönetmelikte 2022'de ve 1 Ocak 2026'da değişiklik yapıldı. Bir kaynağa göre Danıştay'ın 6 Mayıs 2026 tarihli kararıyla üç cayma istisnası iptal edildi. Hangi istisnaların iptal edildiği doğrulanamadı. — [Kazım Ceylan Hukuk](https://www.kazimceylan.av.tr/14-gunluk-cayma-hakki); [Lexpera](https://www.lexpera.com.tr/mevzuat/yonetmelikler/mesafeli-sozlesmeler-yonetmeligi)

### Çıkarımlar
- Oyun içi para, "elektronik ortamda anında ifa edilen hizmet veya anında teslim edilen gayrimaddi mal" istisnası (MSY 15/1-ğ) kapsamına girebilir. Bu yorum, ifa başladıktan sonra cayma hakkını sınırlar. Bend numarası ve 2026 iptalleri doğrulanmalıdır.
- Satış sözleşmesinin tarafı (merchant of record) kimdir? Google'ın Türkiye'de satıcı veya aracı rolü bu oturumda doğrulanmadı. Apple, geliştiricinin "agent/commissionaire" sıfatıyla hareket ettiğini belirtir. Bu ayrım, tüketici şikâyetlerinde muhatabın kim olduğunu belirler.

### Bilinmeyenler
- Oyun içi satın almalara özgü bir Tüketici Hakem Heyeti veya mahkeme kararı bulunamadı.
- Danıştay'ın 2026'da iptal ettiği istisnalar belirlenemedi.

## 6. Vergi: bireysel geliştirici, şahıs şirketi ve limited şirket

### Özet
Bireysel geliştirici için en basit yol GVK mükerrer 20/B istisnasıdır. Önce vergi mükellefiyeti ve istisna belgesi alınır, sonra özel bir Türk banka hesabı açılır. Google ve Apple ödemeleri münhasıran bu hesaba gelir, banka %15 stopaj keser ve bu kesinti nihai vergi olur. KDV istisnası da bu yola dahildir. 2026 yıllık üst sınırı 5.300.000 TL'dir ve sınır aşılırsa istisna tamamen kaybedilir. 29 yaş altındaysanız genç girişimci istisnası da bir seçenektir: 2025 için 330.000 TL, 2026 için 400.000 TL, toplam 3 yıl. Hizmet ihracatı için %80 (2026'dan itibaren muhtemelen %100) kazanç indirimi, uygulama Türkiye'de de kullanıldığında GİB özelgesine göre uygulanmaz.

### Kaynaklı bulgular
**GVK mükerrer 20/B (sosyal içerik üreticileri ve mobil uygulama geliştiricileri)**
- Bu istisna yalnızca gerçek kişilere tanınır, kurumlar vergisi mükellefleri yararlanamaz. Kapsamına, "elektronik uygulama paylaşım ve satış platformlarından" elde edilen mobil uygulama geliştirme kazancı girer: uygulama satışı, uygulama içi satın alma, uygulama içi reklam ve abonelik. Kazancın tamamı münhasıran Türkiye'deki bir bankada açılan hesaba gelmelidir. Sıra şöyledir: önce mükellefiyet, sonra istisna belgesi, sonra banka hesabı. İstisna geriye dönük uygulanmaz. Banka, transfer tarihinde %15 stopaj keser ve bu nihai vergi olur. 2026 sınırı 5.300.000 TL'dir (GVK 103 dördüncü dilim, 332 Seri No.lu GVGT). Sınır aşılırsa kazancın tamamı genel hükümlere göre beyan edilir ve kesilen stopaj mahsup edilir. KDV açısından KDVK 17/4-a uyarınca istisnadır. Dövizle yapılan ödemelerde transfer tarihindeki TL karşılığı esas alınır. — [Fatih Aras](https://www.fatiharas.com/sosyal-icerik-ureticileri-ve-mobil-uygulama-gelistiricileri-vergi-istisnasi-2024/)
- Kapsam 7491 sayılı Kanun ile 1 Ocak 2024'ten itibaren genişletildi. — [Fatih Aras](https://www.fatiharas.com/sosyal-icerik-ureticileri-ve-mobil-uygulama-gelistiricileri-vergi-istisnasi-2024/)
- 2026 sınırı için kaynaklar tutarsız: çoğu 5.300.000 TL diyor, bir kaynak tahmini 4.730.000 TL veriyor. Cumhurbaşkanı stopaj oranını sıfıra indirebilir veya iki katına çıkarabilir. — [İhtisas Mali Danışmanlık](https://ihtisasmalidanismanlik.com/blog/sosyal-icerik-ureticisi-vergi-istisnasi/); [Hukukçular Evi](https://hukukcularevi.com/internetten-sosyal-medyadan-kazananlarin-vergisi-icerik-ureticisi-istisnasi/); [vergimerkezi](https://vergimerkezi.com.tr/yazilim-vergi-muafiyeti-2026-dijital-gelirlerde-yeni-mali-donem/)
- İstisna belgesi için GİB Dijital Vergi Dairesi üzerinden başvuru yapılabilir. — [mukellef.co](https://mukellef.co/blog/sosyal-medya-icin-vergi-istisnasi/); [Alomaliye 2026 rehber](https://www.alomaliye.com/2026/03/03/sosyal-icerik-ureticiligi-internet-ve-benzeri-elektronik-kazanc-istisnasi-rehberi-ve-infografik/amp/)

**Genç girişimci istisnası (GVK mükerrer 20)**
- Kapsam: İlk kez ticari, zirai veya mesleki kazanç mükellefiyeti açan, mükellefiyet başlangıcında 29 yaşını doldurmamış tam mükellef gerçek kişiler. İstisna 3 vergilendirme dönemi uygulanır. Tutar 2025 için 330.000 TL (2024'te 230.000 TL), 2026 için 400.000 TL'dir. Tutar 7440 sayılı Kanun'la gelir vergisi tarifesinin ikinci dilimine bağlandı. 2026'da işe başlayan genç girişimciler Bağ-Kur primlerini kendileri öder, prim desteği yoktur. — [Mondaq](https://www.mondaq.com/turkey/tax-authorities/1758920/2025-y%C4%B1l%C4%B1-gelirlerinin-beyan%C4%B1nda-gen%C3%A7-giri%C5%9Fimcilerde-kazan%C3%A7-%C4%B0stisnas%C4%B1-%C4%B0ndirimi); [İhtisas](https://ihtisasmalidanismanlik.com/blog/genc-girisimci-istisnasi/); [ASMMMO broşür](https://www.asmmmo.org.tr/userfiles/others/files/Mvzt/Rhb/2025-561-Gen%C3%A7%20Giri%C5%9Fimcilere%20Vergi%20ve%20Sigorta%20Prim%20Te%C5%9Fviki%20Bro%C5%9F%C3%BCr%C3%BC%20%C4%B0nfografik.pdf)

**Hizmet ihracatı kazanç indirimi (GVK 89/13, KVK 10/1-ğ)**
- Kanuni oran %80'dir. Bir kaynağa göre 30.04.2026 tarihli ve 11257 sayılı Cumhurbaşkanı Kararı, 2026 dönemi kazançları için oranı %100'e çıkardı. Diğer kaynaklar hâlâ %80 diyor, bu yüzden doğrulanmalı. Şartlar: hizmetten yurt dışında yararlanılması, faturanın yurt dışındaki müşteriye kesilmesi ve dövizin Türkiye'ye getirilmesi. — [faturaport](https://faturaport.com/blog/vergi/yazilim-ihracatinda-100-vergi-muafiyeti-11257-sayili-cumhurbaskani-karari-ve-sartlari); [vergimerkezi](https://vergimerkezi.com.tr/yazilim-hizmet-ihraci-istisnasi-2026-yuzde-80-kazanc-indirimi-sartlari/)
- GİB özelgesi (30.01.2026, sayı 62030549-125-143061): Google Play ve App Store'da mobil oyun satan bir şirkete verildi. Google ve Apple'dan gelen ödemeler "uygulama içi satın alma geliri" sayıldı. Uygulamalar Türkiye'de de kullanıldığı için KVK 10/1-ğ kapsamındaki %80 indirim uygulanmadı. KDVK 11/1-a hizmet ihracı istisnası yalnızca münhasıran yurt dışında kullanım varsa geçerlidir, aksi halde genel KDV hükümleri uygulanır. Toplu fatura konusunda VUK mükerrer 257 uyarınca GİB'e başvurulması istendi. KVK 32/7 kapsamındaki 5 puanlık indirim de yalnızca münhasıran ihracat kazancı için geçerlidir. — [Alomaliye](https://www.alomaliye.com/2026/02/18/app-store-ve-google-playden-elde-edilen-gelirler-nasil-vergilendirilir/); [muhasebenews](https://www.muhasebenews.com/app-store-ve-google-play-gelirlerinin-vergilendirilmesi-2026-mobil-uygulama-abonelik-ve-uygulama-ici-satin-alma-gelirlerinde-kdv-ve-kurumlar-vergisi/)
- 2023 tarihli bir özelgeye göre Google üzerinden yapılan sanal coin satışında fatura, bedeli tahsil eden firma adına düzenlenmelidir. — [muhasebenews](https://www.muhasebenews.com/app-store-ve-google-play-gelirlerinin-vergilendirilmesi-2026-mobil-uygulama-abonelik-ve-uygulama-ici-satin-alma-gelirlerinde-kdv-ve-kurumlar-vergisi/)

**Dijital Hizmet Vergisi**
- Oran %7,5'ten 1 Ocak 2026'dan itibaren %5'e, 1 Ocak 2027'den itibaren %2,5'e indirildi (Cumhurbaşkanı Kararı). Vergiyi platformlar öder. Apple bu indirimi Türkiye App Store fiyat ve gelirlerine 2026 başında yansıttı. — [Bloomberg HT](https://www.bloomberght.com/dijital-hizmet-vergisi-2026-dan-itibaren-yuzde-5-oraninda-uygulanacak-3764708); [CNBC-e](https://www.cnbce.com/teknoloji/apple-app-store-gelirlerinde-turkiye-icin-vergi-guncellemesine-gitti-h24067)

### Çıkarımlar
- **Bireysel ve 20/B yolu (önerilen başlangıç):** Önce mükellefiyet açılıp istisna belgesi alınmalı, ardından özel bir hesap açılmalıdır. Google Payments ve App Store Connect banka bilgilerine bu hesap girilmelidir. Hesap USD veya TL olabilir. Stopajın TL karşılıktan kesildiği bildiriliyor, ancak bankanın USD hesabı destekleyip desteklemediği bankaya sorulmalı. AdMob ödemeleri de bu hesaba yönlendirilmeli, çünkü tek bir ödeme bile başka bir hesaba gelirse istisna bozulur. Beyanname ve defter tutma yükü yoktur.
- **Şahıs şirketi:** Genç girişimci istisnası (yıllık 330.000-400.000 TL, 3 yıl) ile birlikte gelir vergisi tarifesi uygulanır. Defter ve mali müşavir maliyeti vardır. 20/B ile genç girişimci istisnasının birlikte kullanılıp kullanılamayacağı belirsizdir. 20/B şahıs işletmesine açık mı, kaynaklar net değil.
- **Limited şirket:** Kurumlar vergisi uygulanır. 20/B'den yararlanamaz. Ocak 2026 özelgesine göre Türkiye'de de satış yapılıyorsa %80 indirimden yararlanamaz. Bu yol yüksek gelir, ortaklık veya yatırım alınması durumunda anlamlı hale gelir.
- **KDV:** Türk kullanıcılardan alınan KDV'nin Google ve Apple tarafından tahsil edilip edilmediği doğrulanmadı. 20/B yolunda geliştiricinin kendi KDV yükümlülüğü KDVK 17/4-a ile istisnadır.

### Bilinmeyenler
- Google ve Apple'ın Türkiye'deki KDV tahsilat rolü (KDVK 9/2 ve elektronik hizmet mükellefiyeti) birincil kaynakla doğrulanmadı.
- AdMob reklam gelirinin 20/B kapsamına girdiği yalnızca genel ifadelerle ("uygulama içi reklam") desteklendi. AdMob'a özel bir özelge bulunamadı.
- 20/B ile genç girişimci istisnasının birlikte kullanımı, 11257 sayılı kararın %100 oranı ve 2026 sınırının kesin rakamı Resmî Gazete veya GİB'den teyit edilmeli.
- Google ve Apple'ın W-8BEN formu ve ABD stopajı konusu (ABD dışı geliştirici için ABD kaynaklı gelirde ABD-Türkiye vergi anlaşması oranı) araştırılmadı.

## 7. 2025-2026 dönemindeki düzenleyici değişiklikler

### Özet
İzlenmesi gerekenler: 7578 sayılı oyun ve sosyal medya kanununun BTK yönetmelikleri, Apple'ın yeni yaş derecelendirme sistemi, Google'ın kumar politikası revizyonları, Dijital Hizmet Vergisi'nin 2027'de %2,5'e inmesi, olası %100 hizmet ihracı indirimi, 20/B sınırının her yıl yeniden değerlenmesi ve MSY değişiklikleri.

### Kaynaklı bulgular
- 7578 sayılı Kanun: Resmî Gazete'de 1 Mayıs 2026'da yayımlandı, oyun hükümleri 1 Kasım 2026'da yürürlüğe girdi, yönetmelikler beklenmektedir. — [Pekin & Pekin](https://pekin.com.tr/2026/05/05/oyun-sektorunu-ilgilendiren-kanun-teklifi-tbmmde-degisiklige-ugradi/)
- Apple yaş derecelendirmesi: Değişiklik 24 Temmuz 2025'te duyuruldu ve 13+, 16+, 18+ seviyeleri eklendi. — [MacTech](https://www.mactech.com/2025/07/25/apple-updates-age-ratings-in-its-various-app-stores)
- Google kumar ve reklam politikası revizyonu: 28 Ekim 2025. — [iGaming Expert](https://igamingexpert.com/news/business/google-sweepstake-policies-2025/?amp=1)
- Dijital Hizmet Vergisi: 2026'da %5, 2027'de %2,5. — [Bloomberg HT](https://www.bloomberght.com/dijital-hizmet-vergisinde-indirim-karari-3764709)
- 11257 sayılı Cumhurbaşkanı Kararı (30.04.2026), hizmet ihracatı indirimini %100'e çıkardığı iddia ediliyor. — [faturaport](https://faturaport.com/blog/vergi/yazilim-ihracatinda-100-vergi-muafiyeti-11257-sayili-cumhurbaskani-karari-ve-sartlari)
- MSY değişikliği (1 Ocak 2026) ve 6 Mayıs 2026 tarihli Danıştay iptal kararı. — [Kazım Ceylan](https://www.kazimceylan.av.tr/14-gunluk-cayma-hakki)

### Çıkarımlar
- Lansmandan önce bir mali müşavirle 20/B kurulumu yapılmalı ve IARC ile Apple anketleri dürüstçe doldurulmalıdır. Bunların yanında UMP, ATT ve KVKK aydınlatma metni hazırlanmalı, sanal paranın gerçek paraya çevrilemeyeceği oyun içi kurallarda yazılı olmalıdır. Bu dörtlü, riskin büyük bölümünü kapatır.

### Bilinmeyenler
- BTK'nın oyun yönetmeliklerinin çıkış tarihi ve içeriği bilinmiyor.
- AB Digital Fairness Act ve loot box tartışmaları gibi diğer pazarlara özgü riskler bu notun kapsamı dışında bırakıldı.
