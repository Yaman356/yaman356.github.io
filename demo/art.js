// Tezgâh görselleri: Microsoft Fluent Emoji ikonları (icons.js, MIT) ve izometrik şehir haritası.
(() => {
  'use strict';
  const ICONS = () => window.TezgahIcons || {};

  // ---------- İkonlar ----------
  const icon = (k, size = 24, cls = '') => ICONS()[k] ? `<svg class="ic ${cls}" viewBox="0 0 32 32" width="${size}" height="${size}" aria-hidden="true">${ICONS()[k]}</svg>` : '';

  // ---------- İzometrik harita ----------
  const TW = 60, TH = 30, N = 4, W = 260, H = 196, OX = 130, OY = 58;
  const iso = (i, j) => [OX + (i - j) * TW / 2, OY + (i + j) * TH / 2];
  const pts = a => a.map(p => p.map(n => n.toFixed(1)).join(',')).join(' ');
  const tile = (i, j) => { const [x, y] = iso(i, j); return [[x, y], [x + TW / 2, y + TH / 2], [x, y + TH], [x - TW / 2, y + TH / 2]]; };
  const center = (i, j) => iso(i + 0.5, j + 0.5);
  // Tabanı (x, y) noktasında duran bir ikon
  const spr = (k, x, y, size, extra = '') => ICONS()[k] ? `<svg x="${(x - size / 2).toFixed(1)}" y="${(y - size).toFixed(1)}" width="${size}" height="${size}" viewBox="0 0 32 32" ${extra}>${ICONS()[k]}</svg>` : '';
  const SLOTS = [[1, 1], [2, 1], [1, 2], [2, 2], [0, 1], [3, 2], [1, 0], [2, 3], [0, 2], [3, 1], [0, 0], [3, 3], [2, 0], [1, 3], [0, 3], [3, 0]];
  const DECOR = {
    merkez: ['m_office', 'm_houses', 'm_dept', 'm_houses', 'm_classic', 'm_office'],
    kirsal: ['m_tree', 'm_cow', 'm_pine', 'm_farmhouse', 'm_ewe', 'm_tree'],
    dag: ['m_rock', 'm_pine', 'm_rock', 'm_mountain', 'm_pine', 'm_rock'],
  };
  const GROUND = { merkez: ['var(--map-pave)', 'var(--map-pave2)'], kirsal: ['var(--map-grass)', 'var(--map-grass2)'], dag: ['var(--map-dirt)', 'var(--map-dirt2)'] };
  const ROWCOL = { bugday: 'var(--map-wheat)', sut: 'var(--map-pasture)', pamuk: 'var(--map-cotton)' };

  function rows(i, j, col) {
    let s = '';
    for (let k = 1; k < 6; k++) {
      const a = iso(i + k / 6, j + 0.1), b = iso(i + k / 6, j + 0.9);
      s += `<line x1="${a[0]}" y1="${a[1] + TH / 2}" x2="${b[0]}" y2="${b[1] + TH / 2}" stroke="${col}" stroke-width="4" stroke-linecap="round"/>`;
    }
    return s;
  }
  function pin(x, y, text, warn) {
    return `<g class="pin"><circle cx="${x}" cy="${y}" r="8" fill="${warn ? 'var(--amber)' : 'var(--accent)'}" stroke="var(--surface)" stroke-width="1.5"/><text x="${x}" y="${y + 3.2}" text-anchor="middle">${text}</text></g>`;
  }
  const own = (i, j) => `<polygon points="${pts(tile(i, j))}" fill="var(--map-ownGround)" stroke="var(--map-own)" stroke-width="1.5"/>`;

  function building(p, i, j, parts) {
    const [cx, cy] = center(i, j), base = cy + TH * 0.32, size = 44 + 7 * (p.level - 1);
    let s = own(i, j) + parts.map(([a, b]) => own(a, b)).join(''), topY = base - size;
    if (p.type === 'tarla') {
      s += rows(i, j, ROWCOL[p.product] || 'var(--map-pasture)');
      if (p.product) s += spr(p.product, cx + 12, base - 2, 18);
      s += spr('tarla', cx - 8, base, 30 + 4 * (p.level - 1)); topY = base - 34;
    } else if (p.type === 'maden') {
      s += spr('m_mountain', cx, base, size) + spr('maden', cx + 12, base + 2, 20);
    } else if (p.type === 'fabrika') {
      for (const [a, b] of parts) { const [px, py] = center(a, b); s += spr('fabrika', px, py + TH * 0.32, size * 0.85); }
      s += spr('fabrika', cx, base, size);
      if (p.busy) s += `<g class="smoke"><circle cx="${cx - 6}" cy="${topY + 2}" r="4"/><circle cx="${cx - 4}" cy="${topY}" r="3" style="animation-delay:-.8s"/><circle cx="${cx - 7}" cy="${topY + 1}" r="3.5" style="animation-delay:-1.6s"/></g>`;
    } else if (p.type === 'dukkan') {
      s += spr('dukkan', cx, base, size);
      for (let k = 0; k < Math.min(4, p.customers); k++) s += spr('m_person', cx - 20 + k * 9, base + 8 + (k % 2) * 2, 13);
    }
    return s + pin(cx, topY - 4, p.warn ? '!' : p.id, p.warn);
  }
  function emptyPlot(p, i, j) {
    const [cx, cy] = center(i, j);
    const t = tile(i, j).map(([x, y]) => [cx + (x - cx) * 0.8, cy + (y - cy) * 0.8]);
    return `<polygon points="${pts(t)}" fill="var(--map-ownGround)" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="5 3"/>` + pin(cx, cy - 4, p.id, false);
  }
  function auction(i, j) {
    const [cx, cy] = center(i, j);
    return spr('m_money', cx, cy + 6, 26) + `<g class="tag"><rect x="${cx - 18}" y="${cy + 6}" width="36" height="11" rx="3"/><text x="${cx}" y="${cy + 14}" text-anchor="middle">SATIŞTA</text></g>`;
  }
  function decor(region, i, j) {
    const list = DECOR[region], k = list[(i * 3 + j * 5 + region.length) % list.length], [cx, cy] = center(i, j);
    return `<g class="decor">${spr(k, cx + ((i + j) % 2 ? 5 : -5), cy + TH * 0.3, k === 'm_cow' || k === 'm_ewe' ? 20 : k === 'm_rock' ? 22 : 27)}</g>`;
  }

  function regionSvg(region, m) {
    const used = new Set(), items = [];
    let ground = '';
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) ground += `<polygon points="${pts(tile(i, j))}" fill="${GROUND[region][(i + j) % 2]}" stroke="var(--map-line)" stroke-width="1"/>`;
    const [lx, ly] = iso(0, N), [rx, ry] = iso(N, 0), [bx, by] = iso(N, N);
    const edge = `<polygon points="${pts([[lx, ly], [bx, by], [bx, by + 8], [lx, ly + 8]])}" fill="var(--map-edgeL)"/><polygon points="${pts([[bx, by], [rx, ry], [rx, ry + 8], [bx, by + 8]])}" fill="var(--map-edgeR)"/>`;
    let k = 0;
    const take = () => { while (k < SLOTS.length && used.has(SLOTS[k].join())) k++; const t = SLOTS[k]; if (t) used.add(t.join()); return t; };
    for (const p of m.plots) {
      const t = take(); if (!t) break;
      const parts = (p.partIds || []).map(take).filter(Boolean);
      items.push({ d: t[0] + t[1], plot: p, html: p.empty ? emptyPlot(p, t[0], t[1]) : building(p, t[0], t[1], parts) });
    }
    for (const a of m.auctions) { const t = take(); if (t) items.push({ d: t[0] + t[1], html: auction(t[0], t[1]) }); }
    for (const t of SLOTS) if (!used.has(t.join())) items.push({ d: t[0] + t[1] - 0.1, html: decor(region, t[0], t[1]) });
    items.sort((a, b) => a.d - b.d);
    const body = items.map(it => it.plot ? `<g class="hit" role="button" tabindex="0" aria-label="${it.plot.label}" data-a="focus" data-plot="${it.plot.id}">${it.html}</g>` : it.html).join('');
    return `<figure class="region"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${m.name} haritası">${edge}${ground}${body}</svg><figcaption>${m.name}<span>${m.plots.length ? m.plots.length + ' arsan' : 'arsan yok'}</span></figcaption></figure>`;
  }
  const map = model => `<div class="map" aria-label="Şehir haritası">${Object.entries(model.regions).map(([r, m]) => regionSvg(r, m)).join('')}</div>`;
  window.TezgahArt = { icon, map };
})();
