"""Sekme başlık görsellerini oyuna hazırlar: orta yatay şeridi kırpar, 1200 px genişliğe küçültür, WebP olarak demo/assets/basliklar/ altına yazar
ve demo/assets/assets.js içindeki tabloya bas_<ad> anahtarlarını ekler (art-src/process.py tabloyu yeniden yazarsa bu betik yeniden çalıştırılmalı)."""
import json, pathlib, re
from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent
DEMO = HERE.parent.parent / 'demo'
OUT = DEMO / 'assets' / 'basliklar'
OUT.mkdir(parents=True, exist_ok=True)
added = {}
for src in sorted(HERE.glob('*.png')):
    im = Image.open(src).convert('RGB')
    w, h = im.size
    band = im.crop((0, int(h * 0.20), w, int(h * 0.84)))
    band = band.resize((1200, round(band.height * 1200 / w)), Image.LANCZOS)
    dst = OUT / (src.stem + '.webp')
    band.save(dst, 'WEBP', quality=78, method=6)
    added['bas_' + src.stem] = 'assets/basliklar/' + dst.name
    print(dst.name, band.size, dst.stat().st_size // 1024, 'KB')

aj = DEMO / 'assets' / 'assets.js'
txt = aj.read_text(encoding='utf-8')
m = re.search(r'(window\.TezgahAssets\s*=\s*)(\{.*?\})(;)', txt, re.S)
table = json.loads(m.group(2))
table.update(added)
aj.write_text(txt[:m.start(2)] + json.dumps(table, indent=2, ensure_ascii=False) + txt[m.end(2):], encoding='utf-8')
print(len(added), 'başlık tabloya eklendi')
