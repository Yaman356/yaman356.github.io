# Görsel üretim listesi ve komutları

Bu liste, Flow, ChatGPT görsel üretimi ya da Codex CLI gibi bir araçla oyunun bütün görsellerini aynı üslupta üretmek için hazırlandı. Her görsel tek tek üretilir, aynı üslup cümlesi her komutun başına eklenir.

## Teknik şartlar

- **Biçim:** PNG, şeffaf arka plan, 512×512 piksel. Nesne çerçevenin ortasında, altta 20–30 piksel boşluk.
- **Kamera:** izometrik, yukarıdan yaklaşık 30 derece; bütün binalar aynı açıdan, sol ön köşe görünür.
- **Işık:** sol üstten yumuşak güneş ışığı, sağ alta düşen kısa gölge. Zemin gölgesi görselin içinde, yumuşak ve yarı saydam.
- **Dosya adı:** tablodaki anahtar, örneğin `fabrika.png`. Dosyalar `demo/assets/` klasörüne konur ve anahtar `demo/assets/assets.js` dosyasına yazılır; oyun o anahtar için ikon yerine bu görseli kullanır.

## Üslup cümlesi (her komutun başına)

> Stylized isometric game asset for a cozy trade-and-industry tycoon mobile game. Clean low-poly 3D render with soft rounded edges, matte materials, gentle ambient occlusion, warm soft sunlight from the top left, short soft shadow to the bottom right. Limited palette: sage green, warm cream, terracotta, slate blue, soft charcoal. No text, no logos, no people unless asked, transparent background, centered, single object.

## Binalar (her biri 3 seviye)

Seviye 1 küçük ve sade, seviye 2 bir kat ve bir ek yapı, seviye 3 en büyük ve en detaylı olsun. Aynı binanın üç seviyesi aynı oturumda, aynı renklerle üretilmeli.

| Anahtar | Komut |
|---|---|
| `dukkan_1`, `dukkan_2`, `dukkan_3` | A small neighborhood grocery shop with a striped terracotta awning, wooden crates of produce at the front, large shop window. Level {1/2/3}: {single storey / two storeys with a side storage room / three storeys with a rooftop sign frame and outdoor stalls}. |
| `fabrika_1`, `fabrika_2`, `fabrika_3` | A brick and steel factory with a saw-tooth roof and one tall chimney, loading door with a small ramp. Level {1/2/3}: {compact single hall / longer hall with a second chimney / large hall with silos and a conveyor bridge}. |
| `fabrika_ek` | An extension wing of the same factory: a lower steel hall with a loading dock, designed to stand next to the main factory. |
| `tarla_1`, `tarla_2`, `tarla_3` | A small farmhouse with a red barn roof next to neatly ploughed field rows. Level {1/2/3}: {tiny shed / farmhouse and barn / farmhouse, barn and a grain silo}. |
| `maden_1`, `maden_2`, `maden_3` | A mine entrance carved into a rocky hill with wooden beams and a mine cart on rails. Level {1/2/3}: {single tunnel / tunnel with a wooden headframe / two tunnels, headframe and an ore hopper}. |

## Harita süsleri

| Anahtar | Komut |
|---|---|
| `m_office` | A mid-rise office building with glass windows, neutral colors, to be used as background city decoration. |
| `m_houses` | A pair of small terraced houses with tiled roofs and tiny front gardens. |
| `m_tree` | A round deciduous tree, slightly stylized. |
| `m_pine` | A tall pine tree. |
| `m_cow` | A single grazing cow seen from the side, small scale. |
| `m_ewe` | A single fluffy sheep, small scale. |
| `m_rock` | A cluster of grey boulders. |
| `m_mountain` | A small rocky peak with a little snow on top. |
| `m_money` | A wooden "for sale" sign post with an empty board (no text). |
| `m_person` | A single small shopper carrying a paper bag, simple and readable at small size. |
| `m_truck` | A small delivery truck with a cargo box, side view in the same isometric angle. |

## Ürünler (arayüz ikonları)

Bu ikonlar listelerde 24–34 piksel gösterileceği için sade siluetli, kalın hatlı ve tek nesne olmalı.

| Anahtar | Komut |
|---|---|
| `bugday` | A bundle of golden wheat stalks tied with string. |
| `sut` | A glass milk bottle with a blue cap. |
| `pamuk` | An open cotton boll with white fluffy fiber. |
| `komur` | A small pile of black coal lumps. |
| `demir` | A chunk of reddish-brown iron ore with metallic flecks. |
| `un` | A tied burlap sack of flour with a little flour spilling out. |
| `kumas` | A rolled bolt of fabric in slate blue. |
| `celik` | A stack of three steel I-beams. |
| `ekmek` | A round loaf of crusty bread. |
| `peynir` | A wedge of yellow cheese with holes. |
| `giysi` | A folded sage green shirt. |
| `alet` | A hammer and wrench crossed. |

## Kontrol listesi

- Bütün binalar yan yana konduğunda aynı ışık açısı, aynı ölçek ve aynı renk ailesi.
- Arka plan gerçekten şeffaf (beyaz değil).
- Görsel 48 piksele küçültüldüğünde hâlâ tanınıyor.
- Kullanılan aracın ticari kullanım koşulları kontrol edildi ve not edildi.
