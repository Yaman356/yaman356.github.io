"""Ham görselleri (art-src/raw/*.png) oyuna hazırlar.

- Şeffaf kenarları kırpar, nesneyi kare tuvalin alt ortasına yerleştirir.
- Boyut: binalar 512, harita süsleri 256, ürün ikonları 128 piksel.
- WebP (alfa kanallı) olarak demo/assets/ klasörüne yazar ve demo/assets/assets.js listesini günceller.

Kullanım: python art-src/process.py
"""
import json, pathlib
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent
RAW = ROOT / 'raw'
OUT = ROOT.parent / 'demo' / 'assets'

PRODUCTS = {'bugday', 'sut', 'pamuk', 'komur', 'demir', 'un', 'kumas', 'celik', 'ekmek', 'peynir', 'giysi', 'alet'}


def size_for(key):
    if key in PRODUCTS:
        return 128
    if key.startswith('m_'):
        return 256
    return 512


def prepare(src, size):
    im = Image.open(src).convert('RGBA')
    # Neredeyse saydam pikselleri (üretim gürültüsü) tamamen saydam yap, sonra sınırları bul
    a = im.getchannel('A').point(lambda v: 0 if v < 8 else v)
    im.putalpha(a)
    box = a.getbbox()
    if box:
        im = im.crop(box)
    w, h = im.size
    pad = 0.04 if size == 128 else 0.02
    side = max(w, h) / (1 - 2 * pad)
    canvas = Image.new('RGBA', (round(side), round(side)), (0, 0, 0, 0))
    x = round((side - w) / 2)
    # İkonlar ortalanır; binalar ve süsler zemine oturur (alt orta)
    y = round((side - h) / 2) if size == 128 else round(side - h - side * pad)
    canvas.paste(im, (x, y), im)
    return canvas.resize((size, size), Image.Resampling.LANCZOS)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    keys = {}
    for src in sorted(RAW.glob('*.png')):
        key = src.stem
        out = OUT / f'{key}.webp'
        prepare(src, size_for(key)).save(out, 'WEBP', quality=88, method=6)
        keys[key] = f'assets/{key}.webp'
        print(f'{key:12s} {out.stat().st_size // 1024:4d} KB')
    js = ('// Üretilen görsellerin listesi (art-src/process.py yazar; elle düzenleme).\n'
          '// Oyun bir anahtar için burada görsel varsa kodla çizilmiş ikon yerine onu kullanır.\n'
          'window.TezgahAssets = ' + json.dumps(keys, indent=2, ensure_ascii=False) + ';\n')
    (OUT / 'assets.js').write_text(js, encoding='utf-8')
    print(len(keys), 'görsel hazır')


if __name__ == '__main__':
    main()
