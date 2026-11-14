// Tezgâh görselleri: kodla çizilmiş SVG ikonlar ve izometrik şehir haritası.
// Renkler CSS değişkenlerinden gelir; açık ve koyu temada aynı çizimler kullanılır.
(() => {
  'use strict';
  const S = 'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';

  // ---------- İkonlar (24x24) ----------
  const ICON = {
    bugday: `<path d="M12 21V8" ${S} fill="none"/><g fill="var(--ic-grain)" ${S}><ellipse cx="9.6" cy="9" rx="1.8" ry="2.8" transform="rotate(-30 9.6 9)"/><ellipse cx="14.4" cy="9" rx="1.8" ry="2.8" transform="rotate(30 14.4 9)"/><ellipse cx="9.6" cy="13.5" rx="1.8" ry="2.8" transform="rotate(-30 9.6 13.5)"/><ellipse cx="14.4" cy="13.5" rx="1.8" ry="2.8" transform="rotate(30 14.4 13.5)"/><ellipse cx="12" cy="5" rx="1.6" ry="2.6"/></g>`,
    sut: `<path d="M9.5 3h5v3l2 3v11a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 7.5 20V9l2-3z" fill="var(--ic-light)" ${S}/><path d="M7.5 13h9" ${S}/>`,
    pamuk: `<g fill="var(--ic-light)" ${S}><circle cx="9" cy="10" r="3.4"/><circle cx="15" cy="10" r="3.4"/><circle cx="12" cy="6.5" r="3.4"/><circle cx="12" cy="12.5" r="3"/></g><path d="M12 15.5V21M12 18l-3-2M12 18l3-2" ${S} fill="none"/>`,
    komur: `<path d="M4 17l3-7 5-3 6 2 2 6-4 4H8z" fill="var(--ic-dark)" ${S}/><path d="M9 12l3 1 2-2" ${S} fill="none" opacity=".5"/>`,
    demir: `<path d="M4 17l3-7 5-3 6 2 2 6-4 4H8z" fill="var(--ic-ore)" ${S}/><g fill="currentColor"><circle cx="10" cy="12" r="1"/><circle cx="14.5" cy="11" r="1"/><circle cx="12.5" cy="15.5" r="1"/></g>`,
    un: `<path d="M8 6h8l1.5 2c1.5 2 2.5 5 2.5 8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4c0-3 1-6 2.5-8z" fill="var(--ic-light)" ${S}/><path d="M8 6c1-2 7-2 8 0M10 13h4" ${S} fill="none"/>`,
    kumas: `<rect x="5" y="7" width="12" height="10" rx="1" fill="var(--ic-cloth)" ${S}/><ellipse cx="17" cy="12" rx="2.5" ry="5" fill="var(--ic-cloth)" ${S}/><path d="M7 10h7M7 14h7" ${S} opacity=".6"/>`,
    celik: `<path d="M4 7h16v3h-6v4h6v3H4v-3h6v-4H4z" fill="var(--ic-steel)" ${S}/>`,
    ekmek: `<path d="M4 15c0-4 3.5-7 8-7s8 3 8 7v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" fill="var(--ic-grain)" ${S}/><path d="M9 11l-1 3M12.5 10.5l-1 3.5M16 11l-1 3" ${S} fill="none"/>`,
    peynir: `<path d="M3 16l14-9 4 4v6H3z" fill="var(--ic-cheese)" ${S}/><g fill="var(--bg)"><circle cx="10" cy="14" r="1.2"/><circle cx="15" cy="12.5" r="1"/><circle cx="17.5" cy="15.5" r="1.1"/></g>`,
    giysi: `<path d="M8 4l-4 3 2 4 2-1v10h8V10l2 1 2-4-4-3c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4z" fill="var(--ic-cloth)" ${S}/>`,
    alet: `<path d="M14.5 4.5a4 4 0 0 0-4.8 5.3l-5.2 5.2a1.8 1.8 0 0 0 2.5 2.5l5.2-5.2a4 4 0 0 0 5.3-4.8l-2.6 2.6-2.4-.6-.6-2.4z" fill="var(--ic-steel)" ${S}/>`,
    dukkan: `<path d="M4 10v10h16V10" fill="var(--ic-light)" ${S}/><path d="M3 10l2-5h14l2 5c0 1.2-1 2-2.2 2S16.6 11.2 16.6 10c0 1.2-1 2-2.2 2s-2.2-.8-2.2-2c0 1.2-1 2-2.2 2S7.8 11.2 7.8 10c0 1.2-1 2-2.4 2S3 11.2 3 10z" fill="var(--ic-awning)" ${S}/><rect x="10" y="14" width="4" height="6" ${S} fill="none"/>`,
    tarla: `<path d="M3 20l5-9h8l5 9z" fill="var(--ic-field)" ${S}/><path d="M9 20l2-9M15 20l-2-9M5.5 16h13" ${S} fill="none" opacity=".6"/><circle cx="17.5" cy="5.5" r="2.2" fill="var(--ic-grain)" ${S}/>`,
    maden: `<path d="M2 20l7-12 4 5 3-3 6 10z" fill="var(--ic-rock)" ${S}/><path d="M10 20v-3a2 2 0 0 1 4 0v3" fill="var(--ic-dark)" ${S}/>`,
    fabrika: `<path d="M3 20V11l5 3v-3l5 3v-3l5 3V5h3v15z" fill="var(--ic-steel)" ${S}/><path d="M7 17h2M12 17h2" ${S}/>`,
  };
  const icon = (k, size = 20, cls = '') => ICON[k] ? `<svg class="ic ${cls}" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${ICON[k]}</svg>` : '';

  // ---------- İzometrik harita ----------
  const TW = 56, TH = 28, COLS = 4, ROWS = 4, W = 240, H = 172, OX = 120, OY = 42;
  const iso = (i, j) => [OX + (i - j) * TW / 2, OY + (i + j) * TH / 2];
  const pts = a => a.map(p => p.map(n => n.toFixed(1)).join(',')).join(' ');
  function tile(i, j) { const [x, y] = iso(i, j); return [[x, y], [x + TW / 2, y + TH / 2], [x, y + TH], [x - TW / 2, y + TH / 2]]; }
  // Kutu: (i, j) karesinin ortasında, genişlik oranı f, yükseklik h piksel
  function box(i, j, f, h, top, left, right) {
    const [cx, cy] = iso(i + 0.5, j + 0.5), hw = TW / 2 * f, hh = TH / 2 * f;
    const b = [[cx, cy - hh], [cx + hw, cy], [cx, cy + hh], [cx - hw, cy]], t = b.map(([x, y]) => [x, y - h]);
    return `<polygon points="${pts([b[3], b[2], t[2], t[3]])}" fill="${left}"/><polygon points="${pts([b[2], b[1], t[1], t[2]])}" fill="${right}"/><polygon points="${pts(t)}" fill="${top}"/>`;
  }
  const top = (i, j, f, h) => { const [cx, cy] = iso(i + 0.5, j + 0.5); return [cx, cy - h - TH / 2 * f]; };
  const SLOTS = [[1, 1], [2, 1], [1, 2], [2, 2], [0, 1], [3, 2], [1, 0], [2, 3], [0, 2], [3, 1], [0, 0], [3, 3], [2, 0], [1, 3], [0, 3], [3, 0]];
  const CROP = { bugday: 'var(--ic-grain)', sut: 'var(--map-grass2)', pamuk: 'var(--ic-light)' };

  function decor(region, i, j, seed) {
    const r = (seed * 9301 + 49297) % 233280 / 233280;
    if (region === 'merkez') return box(i, j, 0.5, 6 + r * 8, 'var(--map-roof)', 'var(--map-wall2)', 'var(--map-wall)');
    if (region === 'kirsal') {
      if (r < 0.5) return rows(i, j, r < 0.25 ? 'var(--map-grass2)' : 'var(--ic-grain)');
      const [cx, cy] = iso(i + 0.5, j + 0.5); return `<circle cx="${cx - 8}" cy="${cy - 6}" r="6" fill="var(--map-tree)"/><circle cx="${cx + 7}" cy="${cy - 2}" r="5" fill="var(--map-tree)"/>`;
    }
    const [cx, cy] = iso(i + 0.5, j + 0.5);
    if (r < 0.45) return `<circle cx="${cx - 6}" cy="${cy + 2}" r="3" fill="var(--ic-rock)"/><circle cx="${cx + 5}" cy="${cy - 1}" r="2.2" fill="var(--ic-rock)"/>`;
    return `<polygon points="${pts([[cx - 16, cy + 4], [cx - 4, cy - 12 - r * 6], [cx + 6, cy - 4], [cx + 16, cy + 4]])}" fill="var(--ic-rock)"/>`;
  }
  function rows(i, j, col) {
    let s = '';
    for (let k = 1; k < 5; k++) { const a = iso(i + k / 5, j + 0.12), b = iso(i + k / 5, j + 0.88); s += `<line x1="${a[0]}" y1="${a[1] + TH / 2}" x2="${b[0]}" y2="${b[1] + TH / 2}" stroke="${col}" stroke-width="3" stroke-linecap="round"/>`; }
    return s;
  }
  function building(p, i, j) {
    let s = `<polygon points="${pts(tile(i, j))}" fill="var(--map-ownGround)" stroke="var(--map-own)" stroke-width="1"/>`, h = 0, f = 0.62;
    for (const [pi, pj] of p.parts || []) s += `<polygon points="${pts(tile(pi, pj))}" fill="var(--map-ownGround)" stroke="var(--map-own)" stroke-width="1"/>`;
    if (p.type === 'tarla') {
      s += rows(i, j, CROP[p.product] || 'var(--map-grass2)');
      h = 8 + 3 * p.level; f = 0.34; s += box(i + 0.18, j - 0.18, f, h, 'var(--map-own)', 'var(--map-wall2)', 'var(--map-wall)');
    } else if (p.type === 'maden') {
      const [cx, cy] = iso(i + 0.5, j + 0.5);
      s += `<polygon points="${pts([[cx - 22, cy + 6], [cx - 6, cy - 16 - 4 * p.level], [cx + 8, cy - 6], [cx + 22, cy + 6]])}" fill="var(--ic-rock)"/><path d="M${cx - 6} ${cy + 4}v-6a5 5 0 0 1 10 0v6z" fill="var(--ic-dark)"/>`;
      h = 10 + 4 * p.level;
    } else if (p.type === 'fabrika') {
      h = 14 + 7 * p.level;
      s += box(i, j, f, h, 'var(--map-own)', 'var(--map-steel2)', 'var(--map-steel)');
      const [tx, ty] = top(i, j, f, h);
      s += `<rect x="${tx + 6}" y="${ty - 16}" width="6" height="18" rx="1" fill="var(--map-steel2)"/>`;
      if (p.busy) s += `<g class="smoke"><circle cx="${tx + 9}" cy="${ty - 20}" r="4"/><circle cx="${tx + 11}" cy="${ty - 22}" r="3" style="animation-delay:-.8s"/><circle cx="${tx + 8}" cy="${ty - 21}" r="3.5" style="animation-delay:-1.6s"/></g>`;
    } else if (p.type === 'dukkan') {
      h = 16 + 6 * p.level;
      s += box(i, j, f, h, 'var(--map-own)', 'var(--map-wall2)', 'var(--map-wall)');
      const [cx, cy] = iso(i + 0.5, j + 0.5), hw = TW / 2 * f, hh = TH / 2 * f;
      s += `<polygon points="${pts([[cx - hw, cy - h * 0.62], [cx, cy + hh - h * 0.62], [cx + 2, cy + hh - h * 0.62 + 6], [cx - hw + 2, cy - h * 0.62 + 6]])}" fill="var(--ic-awning)"/>`;
      for (let k = 0; k < p.customers; k++) s += `<circle cx="${cx - hw - 4 + k * 5}" cy="${cy + hh + 4 + (k % 2) * 3}" r="2.4" fill="var(--map-people)" stroke="var(--surface)" stroke-width=".8"/>`;
    }
    if (p.parts) for (const [pi, pj] of p.parts) s += box(pi, pj, f, Math.max(10, h - 6), 'var(--map-own)', 'var(--map-steel2)', 'var(--map-steel)');
    const [lx, ly] = top(i, j, f, h);
    s += `<g class="pin"><circle cx="${lx}" cy="${ly - 10}" r="7" fill="${p.warn ? 'var(--amber)' : 'var(--accent)'}"/><text x="${lx}" y="${ly - 7}" text-anchor="middle">${p.warn ? '!' : p.id}</text></g>`;
    return s;
  }
  function regionSvg(region, name, ground, plots, auctions) {
    const used = new Set(), out = [];
    let tiles = '', items = [];
    for (let i = 0; i < COLS; i++) for (let j = 0; j < ROWS; j++) tiles += `<polygon points="${pts(tile(i, j))}" fill="${ground}" stroke="var(--map-line)" stroke-width="1"/>`;
    let k = 0;
    const place = () => { while (k < SLOTS.length && used.has(SLOTS[k].join())) k++; const t = SLOTS[k]; if (t) used.add(t.join()); return t; };
    for (const p of plots) {
      const t = place(); if (!t) break;
      const parts = (p.partIds || []).map(() => place()).filter(Boolean);
      items.push({ t, draw: () => (p.empty ? emptyPlot(p, t) : building({ ...p, parts }, t[0], t[1])), plot: p.id, label: p.label });
    }
    for (const a of auctions) { const t = place(); if (t) items.push({ t, draw: () => sign(t) }); }
    for (const sl of SLOTS) if (!used.has(sl.join())) items.push({ t: sl, draw: () => decor(region, sl[0], sl[1], sl[0] * 7 + sl[1] * 13 + region.length) });
    items.sort((a, b) => (a.t[0] + a.t[1]) - (b.t[0] + b.t[1]));
    const body = items.map(it => it.plot ? `<g class="hit" role="button" tabindex="0" aria-label="${it.label}" data-a="focus" data-plot="${it.plot}">${it.draw()}</g>` : it.draw()).join('');
    return `<figure class="region"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${name} haritası">${tiles}${body}</svg><figcaption>${name}</figcaption></figure>`;
  }
  function emptyPlot(p, [i, j]) {
    const t = tile(i, j).map(([x, y], n) => { const [cx, cy] = iso(i + 0.5, j + 0.5); return [cx + (x - cx) * 0.8, cy + (y - cy) * 0.8 + 0]; });
    const [cx, cy] = iso(i + 0.5, j + 0.5);
    return `<polygon points="${pts(t)}" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="4 3"/><g class="pin"><circle cx="${cx}" cy="${cy - 6}" r="7" fill="var(--accent)"/><text x="${cx}" y="${cy - 3}" text-anchor="middle">${p.id}</text></g>`;
  }
  function sign([i, j]) {
    const [cx, cy] = iso(i + 0.5, j + 0.5);
    return `<line x1="${cx}" y1="${cy + 4}" x2="${cx}" y2="${cy - 16}" stroke="var(--map-steel2)" stroke-width="2"/><rect x="${cx - 12}" y="${cy - 26}" width="24" height="12" rx="2" fill="var(--amber)"/><text class="sign" x="${cx}" y="${cy - 17}" text-anchor="middle">SATIŞ</text>`;
  }
  const GROUND = { merkez: 'var(--map-pave)', kirsal: 'var(--map-grass)', dag: 'var(--map-dirt)' };
  function map(model) {
    return `<div class="map" aria-label="Şehir haritası">${Object.entries(model.regions).map(([r, m]) => regionSvg(r, m.name, GROUND[r], m.plots, m.auctions)).join('')}</div>`;
  }
  window.TezgahArt = { icon, map };
})();
