# Tezgâh uygulaması (web, Android, iOS)

Tek kod tabanı üç yere çıkar:

| Hedef | Nasıl | Nerede derlenir |
|---|---|---|
| Web | `demo/` klasöründeki HTML, CSS ve JavaScript | Her yerde; GitHub Pages'te `/demo/` adresinde yayımlanır |
| Android | Aynı web kodu, Capacitor ile yerel uygulamaya sarılır (`android/`) | Android Studio ya da GitHub Actions |
| iOS | Aynı web kodu, Capacitor ile yerel uygulamaya sarılır (`ios/`) | Yalnızca Mac'te Xcode ile ya da GitHub Actions'ın macOS makinesinde |

Oyun kodu şu an `demo/` klasöründe. `npm run build` bu dosyaları `www/` klasörüne kopyalar; Android ve iOS projeleri `www/` klasörünü kullanır.

## Kurulum

```bash
cd app
npm ci
npm run build          # demo/ -> www/
npx cap sync           # www/ klasörünü Android ve iOS projelerine kopyalar
```

## Web

```bash
npm run serve          # http://localhost:8080
```

## Android

Gerekenler: Android Studio (Android SDK ile birlikte) ve JDK 21.

```bash
npm run android        # derler, eşitler ve Android Studio'yu açar
```

Android Studio'da telefonu ya da emülatörü seçip çalıştır. Google Play'e yüklemek için imzalı bir AAB gerekir: Android Studio'da Build > Generate Signed App Bundle. İmza anahtarını depoya koyma.

## iOS

Gerekenler: macOS, Xcode ve App Store'a yüklemek için Apple Developer hesabı (yıllık 99 dolar).

```bash
npm run ios            # derler, eşitler ve Xcode'u açar
```

Xcode'da Signing & Capabilities altında ekibini seç, simülatörde ya da iPhone'da çalıştır. Mağaza için Product > Archive.

## Otomatik derleme

`.github/workflows/mobile-build.yml` her değişiklikte üçünü de derler:

- **Android:** hata ayıklama APK'sı, Actions sayfasında "tezgah-android-debug" eseri olarak indirilebilir ve telefona doğrudan kurulabilir.
- **iOS:** imzasız simülatör derlemesi; kodun Xcode'da sorunsuz derlendiğini doğrular. Telefona kurulabilir iOS derlemesi için imza sertifikası gerekir.
- **Web:** `www/` klasörü "tezgah-web" eseri olarak.

## Değiştirilecekler

- `capacitor.config.json` içindeki `appId` (`com.archyntech.tezgah`) ve `appName` (`Tezgâh`) geçici. Mağazaya ilk yüklemeden önce kesinleşmeli; `appId` sonradan değiştirilemez.
- Reklam için sıradaki adım `@capacitor-community/admob` eklentisi.
- Harita PixiJS 8 ile çiziliyor (`demo/map-pixi.js`, kütüphane `demo/vendor/` içinde). Oyun büyüdükçe kod TypeScript ile bu klasöre taşınacak (tasarım belgesi, bölüm 7).
