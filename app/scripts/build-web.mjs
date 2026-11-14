// Web derlemesi: demo dosyalarını uygulamanın web klasörüne (www) kopyalar.
// Android ve iOS paketleri bu klasörü kullanır; aynı klasör web sürümü olarak da yayımlanabilir.
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, '..', 'demo');
const out = join(root, 'www');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const f of ['index.html', 'style.css', 'game.js', 'art.js', 'icons.js', 'LICENSE-ICONS.txt']) cpSync(join(src, f), join(out, f));
cpSync(join(src, 'assets'), join(out, 'assets'), { recursive: true });
console.log('www hazır:', out);
