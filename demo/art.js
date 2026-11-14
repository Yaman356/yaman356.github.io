// Tezgâh görselleri.
// Arayüz ikonları: game-icons.net glifleri (icons.js, CC BY 3.0) renkli rozetler içinde.
// Harita: bu proje için kodla çizilmiş izometrik binalar, tarlalar, madenler ve çevre.
(() => {
  'use strict';
  const GLYPH = () => window.TezgahIcons || {};
  const ASSET = k => (window.TezgahAssets || {})[k];  // üretilmiş PNG varsa o kullanılır

  // ---------- Renk yardımcıları ----------
  const hex = h => [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16));
  const mix = (h, to, t) => '#' + hex(h).map((c, k) => Math.round(c + (to[k] - c) * t).toString(16).padStart(2, '0')).join('');
  const lite = (h, t) => mix(h, [255, 255, 255], t), dark = (h, t) => mix(h, [24, 20, 16], t);

  // ---------- Arayüz ikonları ----------
  const BADGE = {
    bugday: '#d39b2a', sut: '#4f8fcf', pamuk: '#8a9bb0', komur: '#3d434c', demir: '#a0553c', un: '#b8925a',
    kumas: '#4d6fa8', celik: '#6f7f8e', ekmek: '#c07a33', peynir: '#d6a52c', giysi: '#4f9471', alet: '#7d6250',
    dukkan: '#c25b44', tarla: '#5e9640', maden: '#7b6a57', fabrika: '#4f6474',
  };
  let gid = 0;
  function icon(k, size = 24, cls = '') {
    if (ASSET(k)) return `<img class="ic ${cls}" src="${ASSET(k)}" width="${size}" height="${size}" alt="">`;
    const g = GLYPH()[k], c = BADGE[k];
    if (!g || !c) return '';
    const id = 'bg' + (++gid);
    return `<svg class="ic gbadge ${cls}" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lite(c, 0.18)}"/><stop offset="1" stop-color="${dark(c, 0.12)}"/></linearGradient></defs>`
      + `<rect x="2" y="2.5" width="60" height="60" rx="16" fill="${dark(c, 0.22)}"/><rect x="2" y="1" width="60" height="59.5" rx="16" fill="url(#${id})"/>`
      + `<rect x="5" y="3.5" width="54" height="22" rx="12" fill="#fff" opacity=".12"/>`
      + `<g transform="translate(8.5 7.5) scale(0.091)" style="color:#fff">${g}</g></svg>`;
  }

  // ---------- İzometrik çizim temeli ----------
  const TW = 64, TH = 32, N = 4, W = 280, H = 200, OX = 140, OY = 58;
  const P = (i, j, z = 0) => [OX + (i - j) * TW / 2, OY + (i + j) * TH / 2 - z];
  const S = a => a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const LINE = 'rgba(40,32,24,.38)';
  const poly = (pts, fill, ex = '') => `<polygon points="${S(pts)}" fill="${fill}" stroke="${LINE}" stroke-width=".6" stroke-linejoin="round" ${ex}/>`;
  const flat = (pts, fill, ex = '') => `<polygon points="${S(pts)}" fill="${fill}" ${ex}/>`;
  // Kutu: taban köşesi (i, j), boyutlar (di, dj), z0 yüksekliğinden h kadar. Görünen yüzler: sol (j = j1), sağ (i = i1), üst.
  function box(i, j, di, dj, z0, h, col, o = {}) {
    const i1 = i + di, j1 = j + dj, z1 = z0 + h;
    const left = [P(i, j1, z0), P(i1, j1, z0), P(i1, j1, z1), P(i, j1, z1)];
    const right = [P(i1, j1, z0), P(i1, j, z0), P(i1, j, z1), P(i1, j1, z1)];
    const top = [P(i, j, z1), P(i1, j, z1), P(i1, j1, z1), P(i, j1, z1)];
    return poly(left, o.left || col) + poly(right, o.right || dark(col, 0.22)) + (o.noTop ? '' : poly(top, o.top || lite(col, 0.16)));
  }
  // Sol yüzde (j = jf) dikdörtgen: i boyunca [a, b], z boyunca [z0, z1]
  const onLeft = (jf, a, b, z0, z1, fill, ex) => flat([P(a, jf, z0), P(b, jf, z0), P(b, jf, z1), P(a, jf, z1)], fill, ex);
  // Sağ yüzde (i = iF) dikdörtgen: j boyunca [a, b]
  const onRight = (iF, a, b, z0, z1, fill, ex) => flat([P(iF, b, z0), P(iF, a, z0), P(iF, a, z1), P(iF, b, z1)], fill, ex);
  // Silindir: taban merkezi (i, j), yarıçap r (piksel), yükseklik h
  function cyl(i, j, z0, r, h, col, bands) {
    const [x, y] = P(i, j, z0), ry = r * 0.5;
    let s = `<path d="M${x - r} ${y} v${-h} a${r} ${ry} 0 0 0 ${2 * r} 0 v${h} a${r} ${ry} 0 0 1 ${-2 * r} 0z" fill="${col}" stroke="${LINE}" stroke-width=".6"/>`;
    s += `<rect x="${x}" y="${y - h}" width="${r}" height="${h}" fill="${dark(col, 0.25)}" opacity=".55"/>`;
    if (bands) for (const t of bands) s += `<path d="M${x - r} ${y - h * t} a${r} ${ry} 0 0 0 ${2 * r} 0" fill="none" stroke="${lite(col, 0.55)}" stroke-width="1.6"/>`;
    return s + `<ellipse cx="${x}" cy="${y - h}" rx="${r}" ry="${ry}" fill="${lite(col, 0.2)}" stroke="${LINE}" stroke-width=".6"/>`;
  }
  // Yumuşak gölge (sağ alta)
  const shadow = (i, j, di, dj, len = 0.22) => flat([P(i, j + dj), P(i + di, j + dj), P(i + di + len, j + dj + len * 0.4), P(i + len * 0.6, j + dj + len * 0.6)], 'rgba(20,30,25,.16)');
  // Beşik çatı: mahya i yönünde
  function gable(i, j, di, dj, z, rh, roof, wall) {
    const jm = j + dj / 2, i1 = i + di, j1 = j + dj, e = 0.05;
    return poly([P(i - e, j - e, z), P(i1 + e, j - e, z), P(i1 + e, jm, z + rh), P(i - e, jm, z + rh)], dark(roof, 0.1))
      + poly([P(i1, j - e, z), P(i1, j1 + e, z), P(i1, jm, z + rh)], wall)
      + poly([P(i - e, jm, z + rh), P(i1 + e, jm, z + rh), P(i1 + e, j1 + e, z), P(i - e, j1 + e, z)], roof);
  }

  // ---------- Renk paleti ----------
  const C = {
    cream: '#efe4cc', brick: '#b65c42', brick2: '#9c4a34', slate: '#56707f', glass: '#9fcbe8', glassD: '#6fa6cc', wood: '#a06c43',
    woodD: '#7a4f2f', red: '#b84434', white: '#f6f1e6', steel: '#9aa6b1', soil: '#8c6a45', soil2: '#7b5c3b', rock: '#8f8172',
    grey: '#c3ccd2', grey2: '#aeb9c1', leaf: '#5d9b48', leaf2: '#3f7d36', pine: '#3d7a45', pine2: '#2e6236', awn: '#d0563f', sign: '#2f6f5e',
  };
  const CROP = { bugday: ['#e2b545', '#c89a2f'], sut: ['#86c05f', '#6aa64a'], pamuk: ['#f2efe7', '#d9d4c8'] };

  // ---------- Binalar ----------
  function shop(ti, tj, L) {
    const i = ti + 0.2, j = tj + 0.18, di = 0.62, dj = 0.56, fh = 12, h = 6 + fh * L;
    let s = shadow(i, j, di, dj, 0.25) + box(i, j, di, dj, 0, h, C.cream);
    const jf = j + dj, i1 = i + di;
    // zemin kat vitrini ve kapı
    s += onLeft(jf, i + 0.05, i + di - 0.2, 2, 9, C.glass) + onLeft(jf, i + 0.06, i + di - 0.21, 7.5, 9, C.glassD, 'opacity=".6"');
    s += onLeft(jf, i + di - 0.16, i + di - 0.05, 0, 9, C.woodD);
    s += onRight(i1, j + 0.08, j + dj - 0.08, 2.5, 8.5, C.glassD);
    // tente: çizgili ve öne doğru eğimli
    const n = 6, w = di / n;
    for (let k = 0; k < n; k++) s += flat([P(i + k * w, jf, 11.5), P(i + (k + 1) * w, jf, 11.5), P(i + (k + 1) * w, jf + 0.14, 8.5), P(i + k * w, jf + 0.14, 8.5)], k % 2 ? C.white : C.awn);
    s += flat([P(i, jf + 0.14, 8.5), P(i1, jf + 0.14, 8.5), P(i1, jf + 0.14, 7.6), P(i, jf + 0.14, 7.6)], dark(C.awn, 0.2));
    // üst kat pencereleri
    for (let f = 1; f < L; f++) {
      const z = 6 + f * fh + 2;
      for (let k = 0; k < 3; k++) s += onLeft(jf, i + 0.06 + k * 0.19, i + 0.18 + k * 0.19, z, z + 6, C.glassD);
      for (let k = 0; k < 2; k++) s += onRight(i1, j + 0.08 + k * 0.24, j + 0.22 + k * 0.24, z, z + 6, dark(C.glassD, 0.15));
    }
    // tabela ve çatı kenarı
    s += onLeft(jf, i + 0.08, i + di - 0.08, h - 4.5, h - 1, C.sign);
    if (L >= 3) s += box(i + 0.15, j + 0.15, 0.3, 0.05, h, 9, C.sign, { top: lite(C.sign, 0.3) });
    // önde meyve sebze kasaları
    for (let k = 0; k < 3; k++) {
      s += box(i + 0.04 + k * 0.13, jf + 0.18, 0.1, 0.08, 0, 3, C.wood, { top: ['#d64b3b', '#e0a23a', '#6aa84f'][k] });
    }
    return { s, top: P(i + di / 2, j + dj / 2, h + (L >= 3 ? 9 : 0))[1] };
  }

  function factory(ti, tj, L, busy) {
    const i = ti + 0.1, j = tj + 0.24, di = 0.8, dj = 0.52, h = 14 + 4 * L;
    let s = '';
    // bacalar arkada
    const chim = [[i + 0.14, j + 0.06]].concat(L >= 2 ? [[i + 0.34, j + 0.04]] : []);
    s += shadow(i, j, di, dj, 0.25);
    for (const [ci, cj] of chim) s += cyl(ci, cj, 0, 3.6, h + 22 + L * 2, C.brick2, [0.82, 0.9]);
    s += box(i, j, di, dj, 0, h, C.brick, { top: C.slate });
    const jf = j + dj, i1 = i + di;
    // açık renk kuşak ve yüksek pencereler
    s += onLeft(jf, i, i1, h - 3, h - 1.5, lite(C.brick, 0.35));
    for (let k = 0; k < 4; k++) s += onLeft(jf, i + 0.06 + k * 0.19, i + 0.15 + k * 0.19, 3, h - 5, C.glassD);
    s += onRight(i1, j + 0.12, j + dj - 0.1, 0, Math.min(10, h - 4), C.steel); // yükleme kapısı
    s += onRight(i1, j + 0.12, j + dj - 0.1, 2, 3, dark(C.steel, 0.2));
    // testere dişi çatı
    const n = 3, w = di / n;
    for (let k = 0; k < n; k++) {
      const a = i + k * w, b = a + w;
      s += poly([P(a, j, h), P(b, j, h + 7), P(b, jf, h + 7), P(a, jf, h)], C.slate);
      s += poly([P(b, jf, h), P(b, j, h), P(b, j, h + 7), P(b, jf, h + 7)], C.glass);
      s += poly([P(a, jf, h), P(b, jf, h), P(b, jf, h + 7)], lite(C.brick, 0.1));
    }
    if (L >= 3) for (const [si, sj] of [[ti + 0.86, tj + 0.86]]) s += cyl(si, sj, 0, 6, 24, '#c9ced2', [0.3, 0.6]);
    const [cx, cy] = P(chim[0][0], chim[0][1], h + 24 + L * 2);
    if (busy) s += `<g class="smoke"><circle cx="${cx}" cy="${cy - 2}" r="4.2"/><circle cx="${cx + 2}" cy="${cy - 4}" r="3.2" style="animation-delay:-.8s"/><circle cx="${cx - 1}" cy="${cy - 3}" r="3.6" style="animation-delay:-1.6s"/></g>`;
    return { s, top: cy - 8 };
  }
  function factoryWing(ti, tj) {
    const i = ti + 0.1, j = tj + 0.26, di = 0.8, dj = 0.48, h = 12;
    let s = shadow(i, j, di, dj) + box(i, j, di, dj, 0, h, C.brick, { top: C.slate });
    for (let k = 0; k < 2; k++) s += onLeft(j + dj, i + 0.1 + k * 0.36, i + 0.34 + k * 0.36, 0, 8, C.steel);
    return s + box(i + 0.1, j + dj, 0.6, 0.08, 0, 2.5, '#9a9a90');
  }

  function farm(ti, tj, L, product) {
    const [c1, c2] = CROP[product] || ['#8bbf5a', '#6aa64a'];
    let s = flat([P(ti + 0.04, tj + 0.04), P(ti + 0.96, tj + 0.04), P(ti + 0.96, tj + 0.96), P(ti + 0.04, tj + 0.96)], C.soil);
    for (let k = 0; k < 7; k++) {
      const a = ti + 0.08 + k * 0.125;
      s += flat([P(a, tj + 0.45), P(a + 0.06, tj + 0.45), P(a + 0.06, tj + 0.94), P(a, tj + 0.94)], k % 2 ? c2 : c1);
      if (product === 'pamuk') for (let m = 0; m < 3; m++) { const [x, y] = P(a + 0.03, tj + 0.55 + m * 0.14, 1.5); s += `<circle cx="${x}" cy="${y}" r="1.6" fill="#fff"/>`; }
      if (product === 'bugday') for (let m = 0; m < 3; m++) { const [x, y] = P(a + 0.03, tj + 0.55 + m * 0.14); s += `<path d="M${x} ${y}v-4" stroke="${c2}" stroke-width="1.6" stroke-linecap="round"/>`; }
    }
    // ahır
    const bi = ti + 0.1, bj = tj + 0.08, bdi = 0.4, bdj = 0.3;
    s += shadow(bi, bj, bdi, bdj) + box(bi, bj, bdi, bdj, 0, 9, C.red, { noTop: true }) + gable(bi, bj, bdi, bdj, 9, 7, C.slate, C.red);
    s += onLeft(bj + bdj, bi + 0.13, bi + 0.27, 0, 7, C.white) + onLeft(bj + bdj, bi + 0.15, bi + 0.25, 0, 6.2, C.woodD);
    if (L >= 2) { const hi = ti + 0.6, hj = tj + 0.08; s += shadow(hi, hj, 0.28, 0.26) + box(hi, hj, 0.28, 0.26, 0, 8, C.cream, { noTop: true }) + gable(hi, hj, 0.28, 0.26, 8, 6, C.brick2, C.cream) + onLeft(hj + 0.26, hi + 0.08, hi + 0.18, 2, 6, C.glassD); }
    if (L >= 3) s += cyl(ti + 0.08, tj + 0.5, 0, 5, 26, '#cfd4d6', [0.33, 0.66]);
    return { s, top: P(bi + bdi / 2, bj + bdj / 2, 18 + (L >= 3 ? 10 : 0))[1] };
  }

  function mine(ti, tj, L) {
    const [x0, y0] = P(ti + 0.5, tj + 0.5);
    const hh = 24 + 5 * L;
    let s = flat([P(ti + 0.06, tj + 0.06), P(ti + 0.94, tj + 0.06), P(ti + 0.94, tj + 0.94), P(ti + 0.06, tj + 0.94)], '#b59f80');
    // köşeli tepe
    const A = P(ti + 0.12, tj + 0.85), B = P(ti + 0.9, tj + 0.85), Cc = P(ti + 0.9, tj + 0.15), D = P(ti + 0.15, tj + 0.18), T = [x0 - 4, y0 - hh], T2 = [x0 + 14, y0 - hh * 0.6];
    s += poly([D, T, A], dark(C.rock, 0.05)) + poly([A, T, T2, B], C.rock) + poly([B, T2, Cc], dark(C.rock, 0.25)) + poly([D, Cc, T2, T], lite(C.rock, 0.15));
    // tünel ağzı, ahşap çerçeve
    const [tx, ty] = P(ti + 0.42, tj + 0.86);
    s += `<path d="M${tx - 8} ${ty} v-9 a8 7 0 0 1 16 0 v9z" fill="${C.woodD}"/><path d="M${tx - 6} ${ty} v-8 a6 5.5 0 0 1 12 0 v8z" fill="#2a221c"/>`;
    // ray ve vagon
    s += `<path d="M${tx - 4} ${ty} L${tx + 14} ${ty + 9} M${tx + 2} ${ty} L${tx + 20} ${ty + 9}" stroke="#6a5a4a" stroke-width="1.2"/>`;
    s += box(ti + 0.58, tj + 0.9, 0.14, 0.1, 1, 4, '#6f7a84', { top: '#3d434c' });
    if (L >= 2) { const [hx, hy] = P(ti + 0.78, tj + 0.3); s += `<path d="M${hx - 7} ${hy} L${hx - 2} ${hy - 30} L${hx + 3} ${hy} M${hx - 6} ${hy - 8} L${hx + 2} ${hy - 8} M${hx - 4} ${hy - 18} L${hx + 1} ${hy - 18}" stroke="${C.woodD}" stroke-width="1.8" fill="none"/><circle cx="${hx - 2}" cy="${hy - 31}" r="4" fill="none" stroke="#444" stroke-width="1.6"/>`; }
    if (L >= 3) s += box(ti + 0.7, tj + 0.58, 0.18, 0.16, 6, 8, '#7d8790') + `<path d="M${P(ti + 0.72, tj + 0.74)[0]} ${P(ti + 0.72, tj + 0.74)[1]} v-6 M${P(ti + 0.86, tj + 0.74)[0]} ${P(ti + 0.86, tj + 0.74)[1]} v-6" stroke="#555" stroke-width="1.4"/>`;
    return { s, top: y0 - hh - 6 };
  }

  // ---------- Çevre ----------
  function tree(i, j, sc = 1) {
    const [x, y] = P(i, j);
    return `<ellipse cx="${x + 4 * sc}" cy="${y + 1}" rx="${7 * sc}" ry="${3 * sc}" fill="rgba(20,30,25,.16)"/><rect x="${x - 1.2 * sc}" y="${y - 7 * sc}" width="${2.4 * sc}" height="${7 * sc}" fill="${C.woodD}"/>`
      + `<circle cx="${x}" cy="${y - 12 * sc}" r="${7.5 * sc}" fill="${C.leaf2}"/><circle cx="${x - 1.5 * sc}" cy="${y - 13.5 * sc}" r="${6 * sc}" fill="${C.leaf}"/><circle cx="${x - 3 * sc}" cy="${y - 15.5 * sc}" r="${2.4 * sc}" fill="${lite(C.leaf, 0.3)}"/>`;
  }
  function pine(i, j, sc = 1) {
    const [x, y] = P(i, j);
    let s = `<ellipse cx="${x + 4 * sc}" cy="${y + 1}" rx="${6 * sc}" ry="${2.6 * sc}" fill="rgba(20,30,25,.16)"/><rect x="${x - 1.2 * sc}" y="${y - 5 * sc}" width="${2.4 * sc}" height="${5 * sc}" fill="${C.woodD}"/>`;
    for (const [w, yy] of [[8, 5], [6.5, 11], [5, 16.5]]) s += `<path d="M${x - w * sc} ${y - yy * sc} L${x} ${y - (yy + 9) * sc} L${x + w * sc} ${y - yy * sc}z" fill="${C.pine}"/><path d="M${x} ${y - (yy + 9) * sc} L${x + w * sc} ${y - yy * sc} L${x} ${y - yy * sc}z" fill="${C.pine2}"/>`;
    return s;
  }
  function boulder(i, j, sc = 1) {
    const [x, y] = P(i, j);
    return `<path d="M${x - 8 * sc} ${y} L${x - 5 * sc} ${y - 7 * sc} L${x + 1 * sc} ${y - 9 * sc} L${x + 7 * sc} ${y - 4 * sc} L${x + 8 * sc} ${y}z" fill="${C.rock}" stroke="${LINE}" stroke-width=".6"/><path d="M${x + 1 * sc} ${y - 9 * sc} L${x + 7 * sc} ${y - 4 * sc} L${x + 8 * sc} ${y} L${x + 1 * sc} ${y}z" fill="${dark(C.rock, 0.22)}"/>`;
  }
  function cityBlock(ti, tj, v) {
    const h = 10 + (v % 3) * 5, col = v % 2 ? C.grey : C.grey2, i = ti + 0.2, j = tj + 0.2, d = 0.6;
    let s = shadow(i, j, d, d) + box(i, j, d, d, 0, h, col);
    for (let z = 3; z < h - 2; z += 5) { for (let k = 0; k < 3; k++) s += onLeft(j + d, i + 0.06 + k * 0.19, i + 0.15 + k * 0.19, z, z + 3, lite(C.glassD, 0.25)); for (let k = 0; k < 3; k++) s += onRight(i + d, j + 0.06 + k * 0.19, j + 0.15 + k * 0.19, z, z + 3, C.glassD); }
    return s + tree(ti + 0.95, tj + 0.9, 0.55);
  }
  function decor(region, ti, tj) {
    const v = ti * 3 + tj * 5;
    if (region === 'merkez') return `<g class="decor">${cityBlock(ti, tj, v)}</g>`;
    if (region === 'kirsal') return `<g class="decor">${v % 3 === 0 ? farmPatch(ti, tj) : tree(ti + 0.35, tj + 0.4) + tree(ti + 0.7, tj + 0.65, 0.8)}</g>`;
    return `<g class="decor">${v % 2 ? pine(ti + 0.4, tj + 0.45) + boulder(ti + 0.72, tj + 0.7, 0.8) : boulder(ti + 0.45, tj + 0.5, 1.1) + pine(ti + 0.75, tj + 0.3, 0.8)}</g>`;
  }
  function farmPatch(ti, tj) {
    let s = flat([P(ti + 0.08, tj + 0.08), P(ti + 0.92, tj + 0.08), P(ti + 0.92, tj + 0.92), P(ti + 0.08, tj + 0.92)], C.soil2);
    for (let k = 0; k < 6; k++) { const a = ti + 0.12 + k * 0.13; s += flat([P(a, tj + 0.12), P(a + 0.06, tj + 0.12), P(a + 0.06, tj + 0.88), P(a, tj + 0.88)], k % 2 ? '#7fb35a' : '#94c46b'); }
    return s;
  }

  // ---------- Bölge ----------
  const GROUND = { merkez: ['var(--map-pave)', 'var(--map-pave2)'], kirsal: ['var(--map-grass)', 'var(--map-grass2)'], dag: ['var(--map-dirt)', 'var(--map-dirt2)'] };
  const SLOTS = [[1, 1], [2, 1], [1, 2], [2, 2], [0, 1], [3, 2], [1, 0], [2, 3], [0, 2], [3, 1], [0, 0], [3, 3], [2, 0], [1, 3], [0, 3], [3, 0]];
  const tileP = (i, j) => [P(i, j), P(i + 1, j), P(i + 1, j + 1), P(i, j + 1)];
  const pin = (x, y, t, warn) => `<g class="pin"><circle cx="${x}" cy="${y}" r="8.5" fill="${warn ? 'var(--amber)' : 'var(--accent)'}" stroke="#fff" stroke-width="1.6"/><text x="${x}" y="${y + 3.2}" text-anchor="middle">${t}</text></g>`;
  const own = (i, j) => flat(tileP(i, j), 'var(--map-ownGround)', 'stroke="var(--map-own)" stroke-width="1.6"');
  function people(ti, tj, n) {
    let s = '';
    for (let k = 0; k < Math.min(4, n); k++) {
      const [x, y] = P(ti + 0.22 + k * 0.14, tj + 0.98);
      s += `<ellipse cx="${x + 1}" cy="${y + 0.6}" rx="2.6" ry="1" fill="rgba(0,0,0,.18)"/><rect x="${x - 1.6}" y="${y - 6}" width="3.2" height="6" rx="1.4" fill="${['#3d6fa6', '#b4543f', '#4f8a5e', '#7a5aa0'][k]}"/><circle cx="${x}" cy="${y - 7.4}" r="1.7" fill="#e8c4a0"/>`;
    }
    return s;
  }

  function regionSvg(region, m) {
    const used = new Set(), items = [];
    let ground = '';
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) ground += flat(tileP(i, j), GROUND[region][(i + j) % 2], 'stroke="var(--map-line)" stroke-width="1"');
    const edge = flat([P(0, N), P(N, N), P(N, N, -10), P(0, N, -10)], 'var(--map-edgeL)') + flat([P(N, N), P(N, 0), P(N, 0, -10), P(N, N, -10)], 'var(--map-edgeR)');
    let k = 0;
    const take = () => { while (k < SLOTS.length && used.has(SLOTS[k].join())) k++; const t = SLOTS[k]; if (t) used.add(t.join()); return t; };
    for (const p of m.plots) {
      const t = take(); if (!t) break;
      const parts = (p.partIds || []).map(take).filter(Boolean);
      const [ti, tj] = t;
      let html;
      if (p.empty) {
        const [cx, cy] = P(ti + 0.5, tj + 0.5);
        html = own(ti, tj) + flat([P(ti + 0.15, tj + 0.15), P(ti + 0.85, tj + 0.15), P(ti + 0.85, tj + 0.85), P(ti + 0.15, tj + 0.85)], 'none', 'stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="5 3"') + pin(cx, cy - 6, p.id, false);
      } else {
        const L = p.level, art = p.type === 'dukkan' ? shop(ti, tj, L) : p.type === 'fabrika' ? factory(ti, tj, L, p.busy) : p.type === 'tarla' ? farm(ti, tj, L, p.product) : mine(ti, tj, L);
        const wings = parts.map(([a, b]) => own(a, b) + (p.type === 'fabrika' ? factoryWing(a, b) : p.type === 'tarla' ? farm(a, b, 1, p.product).s : p.type === 'maden' ? mine(a, b, 1).s : '')).join('');
        const [cx] = P(ti + 0.5, tj + 0.5);
        html = own(ti, tj) + wings + art.s + (p.type === 'dukkan' ? people(ti, tj, p.customers) : '') + pin(cx, art.top - 6, p.warn ? '!' : p.id, p.warn);
      }
      items.push({ d: ti + tj, plot: p, html });
    }
    for (const a of m.auctions) {
      const t = take(); if (!t) continue;
      const [x, y] = P(t[0] + 0.5, t[1] + 0.5);
      items.push({ d: t[0] + t[1], html: `<path d="M${x} ${y + 4} v-18" stroke="${C.woodD}" stroke-width="2"/><g class="tag"><rect x="${x - 19}" y="${y - 24}" width="38" height="13" rx="2.5"/><text x="${x}" y="${y - 15}" text-anchor="middle">SATIŞTA</text></g>` });
    }
    for (const t of SLOTS) if (!used.has(t.join())) items.push({ d: t[0] + t[1] - 0.1, html: decor(region, t[0], t[1]) });
    items.sort((a, b) => a.d - b.d);
    const body = items.map(it => it.plot ? `<g class="hit" role="button" tabindex="0" aria-label="${it.plot.label}" data-a="focus" data-plot="${it.plot.id}">${it.html}</g>` : it.html).join('');
    return `<figure class="region"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${m.name} haritası">${edge}${ground}${body}</svg><figcaption>${m.name}<span>${m.plots.length ? m.plots.length + ' arsan' : 'arsan yok'}</span></figcaption></figure>`;
  }
  const map = model => `<div class="map" aria-label="Şehir haritası">${Object.entries(model.regions).map(([r, m]) => regionSvg(r, m)).join('')}</div>`;
  window.TezgahArt = { icon, map };
})();
