"""Demo'yu tek bir HTML dosyasına derler: CSS, betikler ve görseller (data: URI) sayfanın içine gömülür.
Ayrı görsel dosyası olmadığından claude.ai'de herkese açık paylaşım için kullanılır.
Kullanım: python tools/build-single.py  ->  .claude/pub/tezgah.html
"""
import base64, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DEMO = ROOT / 'demo'
OUT = ROOT / '.claude' / 'pub' / 'tezgah.html'

assets_js = (DEMO / 'assets' / 'assets.js').read_text(encoding='utf-8')
m = re.search(r'window\.TezgahAssets\s*=\s*(\{.*?\});', assets_js, re.S)
table = json.loads(m.group(1))
inlined = {}
for key, rel in table.items():
    data = (DEMO / rel).read_bytes()
    mime = 'image/webp' if rel.endswith('.webp') else 'image/png'
    inlined[key] = f'data:{mime};base64,' + base64.b64encode(data).decode('ascii')

def script(name):
    code = (DEMO / name).read_text(encoding='utf-8')
    return '<script>\n' + code.replace('</script', '<\\/script') + '\n</script>\n'

css = (DEMO / 'style.css').read_text(encoding='utf-8')
html = (
    '<title>Tezgâh Demo</title>\n'
    '<meta name="claude:viewport-fit-sides" content="cover">\n'
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap">\n'
    f'<style>\n{css}\n</style>\n'
    '<div id="app"></div>\n'
    + script('icons.js')
    + '<script>window.TezgahAssets = ' + json.dumps(inlined) + ';</script>\n'
    + script('art.js') + script('vendor/pixi.min.js') + script('map-pixi.js') + script('game.js')
)
OUT.write_text(html, encoding='utf-8')
print(OUT, round(OUT.stat().st_size / 1024), 'KB,', len(inlined), 'görsel gömüldü')
