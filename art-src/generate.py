"""Tezgâh görsellerini Codex CLI'nin yerleşik görsel üretimiyle üretir.

Kullanım: python art-src/generate.py [grup ...]
Her grup ayrı bir `codex exec` oturumunda, paralel çalışır. Üslup referansı olarak
raw/tarla_1.png eklenir. Çıktılar art-src/raw/<anahtar>.png olarak kaydedilir;
var olan dosyalar yeniden üretilmez (yeniden üretmek için dosyayı sil).
"""
import subprocess, sys, pathlib, concurrent.futures as cf

ROOT = pathlib.Path(__file__).resolve().parent
RAW = ROOT / 'raw'
REF = RAW / 'tarla_1.png'

STYLE = ("Stylized isometric game asset for a cozy trade-and-industry tycoon mobile game. Clean low-poly 3D render with soft "
         "rounded edges, matte materials, gentle ambient occlusion, warm soft sunlight from the top left, short soft shadow to the "
         "bottom right. Limited palette: sage green, warm cream, terracotta, slate blue, soft charcoal. No text, no logos, no people "
         "unless asked, transparent background, centered, single object.")
BUILDING = (" Isometric camera about 30 degrees from above, front-left corner visible, sitting on a small rounded grass base tile "
            "exactly like the reference image.")
ICON = (" This is a UI icon shown at 24-34 pixels: single object, bold simple silhouette, chunky readable shapes, slight "
        "three-quarter view, no base tile, no ground, fills about 80% of the frame.")
DECOR = " Map decoration, small scale, no base tile, just the object with its soft ground shadow."


def levels(base, desc, lv):
    return [(f'{base}_{i + 1}', STYLE + BUILDING + ' ' + desc + ' ' + d) for i, d in enumerate(lv)]


GROUPS = {
    'dukkan': levels('dukkan', 'A small neighborhood grocery shop with a striped terracotta awning, wooden crates of produce at the front, large shop window.', [
        'Level 1: single storey, compact.', 'Level 2: two storeys with a side storage room.',
        'Level 3: three storeys with a rooftop sign frame (empty, no text) and outdoor stalls.']),
    'fabrika': levels('fabrika', 'A brick and steel factory with a saw-tooth roof and one tall chimney, loading door with a small ramp.', [
        'Level 1: compact single hall.', 'Level 2: longer hall with a second chimney.', 'Level 3: large hall with silos and a conveyor bridge.'])
        + [('fabrika_ek', STYLE + BUILDING + ' An extension wing of the same brick and steel factory: a lower steel hall with a loading dock, designed to stand next to the main factory.')],
    'tarla': [(k, STYLE + BUILDING + ' The same farm as the reference image, grown bigger, next to neatly ploughed field rows. ' + d) for k, d in [
        ('tarla_2', 'Level 2: farmhouse and a red-roofed barn, larger fields.'),
        ('tarla_3', 'Level 3: farmhouse, red-roofed barn and a grain silo, large fields.')]],
    'maden': levels('maden', 'A mine entrance carved into a rocky hill with wooden beams and a mine cart on rails.', [
        'Level 1: single tunnel.', 'Level 2: tunnel with a wooden headframe.', 'Level 3: two tunnels, headframe and an ore hopper.']),
    'suslar1': [(k, STYLE + DECOR + ' ' + d) for k, d in [
        ('m_office', 'A mid-rise office building with glass windows, neutral colors, background city decoration.'),
        ('m_houses', 'A pair of small terraced houses with tiled roofs and tiny front gardens.'),
        ('m_tree', 'A round deciduous tree, slightly stylized.'),
        ('m_pine', 'A tall pine tree.'),
        ('m_rock', 'A cluster of grey boulders.'),
        ('m_mountain', 'A small rocky peak with a little snow on top.')]],
    'suslar2': [(k, STYLE + DECOR + ' ' + d) for k, d in [
        ('m_cow', 'A single grazing cow seen from the side, small scale.'),
        ('m_ewe', 'A single fluffy sheep, small scale.'),
        ('m_money', 'A wooden "for sale" sign post with an empty board (no text).'),
        ('m_person', 'A single small shopper carrying a paper bag, simple and readable at small size.'),
        ('m_truck', 'A small delivery truck with a cargo box, isometric angle.')]],
    'urun1': [(k, STYLE + ICON + ' ' + d) for k, d in [
        ('bugday', 'A bundle of golden wheat stalks tied with string.'), ('sut', 'A glass milk bottle with a blue cap.'),
        ('pamuk', 'An open cotton boll with white fluffy fiber.'), ('komur', 'A small pile of black coal lumps.'),
        ('demir', 'A chunk of reddish-brown iron ore with metallic flecks.'), ('un', 'A tied burlap sack of flour with a little flour spilling out.')]],
    'urun2': [(k, STYLE + ICON + ' ' + d) for k, d in [
        ('kumas', 'A rolled bolt of fabric in slate blue.'), ('celik', 'A stack of three steel I-beams.'),
        ('ekmek', 'A round loaf of crusty bread.'), ('peynir', 'A wedge of yellow cheese with holes.'),
        ('giysi', 'A folded sage green shirt.'), ('alet', 'A hammer and wrench crossed.')]],
}


def run(name):
    todo = [(k, p) for k, p in GROUPS[name] if not (RAW / f'{k}.png').exists()]
    if not todo:
        return name, 'hepsi var'
    lines = '\n'.join(f'{i + 1}. Save as {k}.png - Prompt: {p}' for i, (k, p) in enumerate(todo))
    prompt = ("Use your built-in image generation tool. The attached image is the style reference: match its rendering style, "
              "lighting, palette and camera exactly. Generate the following images ONE BY ONE, each as a separate 1024x1024 PNG with a "
              "truly transparent background, and save each into the current directory with the exact file name given. "
              "Keep images within this list consistent with each other (same object family, same colors). Do not generate anything "
              "else and do not touch other files.\n\n" + lines +
              "\n\nAt the end, list each saved file and confirm its alpha channel has transparent pixels.")
    with open(ROOT / f'log_{name}.txt', 'w', encoding='utf-8') as log:
        r = subprocess.run(['codex', 'exec', '--skip-git-repo-check', '-s', 'workspace-write', '-i', str(REF), '-'],
                           input=prompt, text=True, encoding='utf-8', cwd=RAW, stdout=log, stderr=subprocess.STDOUT,
                           shell=sys.platform == 'win32')
    missing = [k for k, _ in todo if not (RAW / f'{k}.png').exists()]
    return name, f'çıkış {r.returncode}, eksik: {missing or "yok"}'


if __name__ == '__main__':
    names = sys.argv[1:] or list(GROUPS)
    with cf.ThreadPoolExecutor(max_workers=len(names)) as ex:
        for name, msg in ex.map(run, names):
            print(name, msg, flush=True)
