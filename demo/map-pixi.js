// Tezgâh harita görünümü: PixiJS 8 (WebGL) ile izometrik bölge haritaları.
// Binalar, süsler ve figürler art-src ile üretilen görsellerdir (window.TezgahAssets).
// Pixi ya da WebGL yoksa oyun eski SVG haritasına (art.js) döner: TezgahMap.ok false olur.
(() => {
  'use strict';
  if (!window.PIXI) { window.TezgahMap = { ok: false }; return; }
  const X = window.PIXI;

  // ---------- İzometrik düzen (art.js ile aynı yerleşim, 2 kat çözünürlük) ----------
  const TW = 128, TH = 64, N = 4, W = 560, H = 400, OX = 280, OY = 100;
  const P = (i, j) => [OX + (i - j) * TW / 2, OY + (i + j) * TH / 2];
  const SLOTS = [[1, 1], [2, 1], [1, 2], [2, 2], [0, 1], [3, 2], [1, 0], [2, 3], [0, 2], [3, 1], [0, 0], [3, 3], [2, 0], [1, 3], [0, 3], [3, 0]];
  const GROUND = { merkez: ['--map-pave', '--map-pave2'], kirsal: ['--map-grass', '--map-grass2'], dag: ['--map-dirt', '--map-dirt2'] };
  const DECOR = { merkez: [['m_office'], ['m_houses', 'm_tree'], ['m_office', 'm_tree']], kirsal: [['m_tree', 'm_cow'], ['m_ewe', 'm_tree', 'm_ewe'], ['m_cow', 'm_tree']], dag: [['m_pine', 'm_rock'], ['m_mountain'], ['m_rock', 'm_pine', 'm_pine']] };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim() || '#999';
  const asset = k => (window.TezgahAssets || {})[k];
  const tex = {};
  let loading = null;
  function loadTextures() {
    if (loading) return loading;
    const list = Object.entries(window.TezgahAssets || {}).filter(([k]) => /^(m_|dukkan|fabrika|tarla|maden)/.test(k));
    loading = Promise.all(list.map(([k, url]) => X.Assets.load(url).then(t => { tex[k] = t; }).catch(() => {})));
    return loading;
  }

  // ---------- Bölge sahnesi ----------
  class Region {
    constructor(key) {
      this.key = key; this.sig = ''; this.anim = [];
      this.fig = document.createElement('figure'); this.fig.className = 'region';
      this.cap = document.createElement('figcaption');
      this.app = new X.Application();
      this.ready = this.app.init({ width: W, height: H, backgroundAlpha: 0, antialias: true, resolution: Math.min(2, devicePixelRatio || 1), autoDensity: true })
        .then(() => {
          const c = this.app.canvas;
          c.style.width = '100%'; c.style.height = 'auto'; c.style.display = 'block'; c.style.touchAction = 'pan-x pan-y';
          c.setAttribute('role', 'img');
          this.app.renderer.events.autoPreventDefault = false;
          this.fig.prepend(c);
          this.app.ticker.add(t => { for (const f of this.anim) f(t.lastTime / 1000); });
        });
      this.fig.append(this.cap);
    }

    build(m, onFocus) {
      const st = this.app.stage;
      st.removeChildren().forEach(c => c.destroy({ children: true }));
      this.anim = [];
      this.cap.innerHTML = `${m.name}<span>${m.plots.length ? m.plots.length + ' arsan' : 'arsan yok'}</span>`;
      this.app.canvas.setAttribute('aria-label', m.name + ' haritası');

      // zemin ve kenar
      const g = new X.Graphics();
      const [a, b] = GROUND[this.key].map(css);
      g.poly([...P(0, N), ...P(N, N), P(N, N)[0], P(N, N)[1] + 14, P(0, N)[0], P(0, N)[1] + 14]).fill(css('--map-edgeL'));
      g.poly([...P(N, N), ...P(N, 0), P(N, 0)[0], P(N, 0)[1] + 14, P(N, N)[0], P(N, N)[1] + 14]).fill(css('--map-edgeR'));
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) g.poly(tile(i, j)).fill((i + j) % 2 ? b : a).stroke({ width: 1.5, color: 0xffffff, alpha: 0.35 });
      st.addChild(g);

      const items = [], used = new Set();
      let k = 0;
      const take = () => { while (k < SLOTS.length && used.has(SLOTS[k].join())) k++; const t = SLOTS[k]; if (t) used.add(t.join()); return t; };
      for (const p of m.plots) {
        const t = take(); if (!t) break;
        const parts = (p.partIds || []).map(take).filter(Boolean);
        items.push({ d: t[0] + t[1], draw: () => this.plot(p, t, parts, onFocus) });
      }
      for (const au of m.auctions) { const t = take(); if (t) items.push({ d: t[0] + t[1], draw: () => this.auction(t) }); }
      SLOTS.forEach(t => { if (!used.has(t.join())) items.push({ d: t[0] + t[1] - 0.1, draw: () => this.decor(t) }); });
      items.sort((x, y) => x.d - y.d).forEach(it => st.addChild(it.draw()));
      if (this.key !== 'dag' || m.plots.length) st.addChild(this.truck());
    }

    plot(p, [ti, tj], parts, onFocus) {
      const c = new X.Container();
      c.addChild(owned(ti, tj));
      let top;
      if (p.empty) {
        const g = new X.Graphics().poly(tile(ti + 0.15, tj + 0.15, 0.7)).stroke({ width: 2.5, color: css('--accent'), alpha: 0.9 });
        c.addChild(g); top = P(ti + 0.5, tj + 0.5)[1] - 14;
      } else {
        for (const [a, b] of parts) {
          c.addChild(owned(a, b));
          const key = p.type === 'fabrika' ? 'fabrika_ek' : p.type + '_1';
          if (tex[key]) c.addChild(building(key, a, b));
        }
        const key = p.type + '_' + p.level;
        const s = tex[key] ? building(key, ti, tj) : placeholder(ti, tj);
        c.addChild(s);
        top = s.y - s.height * 0.82;
        if (p.type === 'dukkan') this.shoppers(c, ti, tj, p.customers);
        if (p.type === 'fabrika' && p.busy) this.smoke(c, s.x - s.width * 0.18, s.y - s.height * 0.8);
        if ((p.type === 'tarla' || p.type === 'maden') && p.busy && !reduced) {
          const base = s.y; this.anim.push(t => { s.y = base - Math.abs(Math.sin(t * 2.2)) * 1.5; });
        }
      }
      c.addChild(pin(P(ti + 0.5, tj + 0.5)[0], top, p.warn ? '!' : String(p.id), p.warn));
      c.eventMode = 'static'; c.cursor = 'pointer';
      c.hitArea = new X.Rectangle(P(ti, tj + 1)[0], top - 20, TW, P(ti + 1, tj + 1)[1] - top + 20);
      c.on('pointertap', () => onFocus(p.id));
      return c;
    }

    auction([ti, tj]) {
      const c = new X.Container(), [x, y] = P(ti + 0.5, tj + 0.5);
      if (tex.m_money) { const s = sprite('m_money', x, y + 14, TW * 0.5); c.addChild(s); }
      const tag = new X.Container();
      const txt = new X.Text({ text: 'SATIŞTA', style: { fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: '700', fontSize: 15, fill: 0x1a1a1a, letterSpacing: 1 } });
      txt.anchor.set(0.5);
      const bg = new X.Graphics().roundRect(-txt.width / 2 - 8, -13, txt.width + 16, 26, 6).fill(css('--amber'));
      tag.addChild(bg, txt); tag.position.set(x, y - 44);
      c.addChild(tag);
      return c;
    }

    decor([ti, tj]) {
      const c = new X.Container(), set = DECOR[this.key][(ti * 3 + tj * 5) % 3];
      const spots = [[0.5, 0.55], [0.3, 0.75], [0.75, 0.35]];
      set.forEach((k, n) => {
        if (!tex[k]) return;
        const [di, dj] = spots[n], [x, y] = P(ti + di, tj + dj);
        // Süsler oyuncunun binalarından küçük ve soluk kalır; göz önce oyuncunun arsasına gitmeli
        const w = { m_office: 0.5, m_houses: 0.55, m_mountain: 0.55, m_cow: 0.28, m_ewe: 0.24, m_rock: 0.36 }[k] || 0.4;
        const s = sprite(k, x, y + (w >= 0.5 ? 12 : 4), TW * w);
        s.alpha = 0.88;
        c.addChild(s);
        if ((k === 'm_cow' || k === 'm_ewe') && !reduced) { const bx = s.x, ph = ti + tj; this.anim.push(t => { s.x = bx + Math.sin(t * 0.4 + ph) * 6; s.scale.x = Math.abs(s.scale.x) * (Math.cos(t * 0.4 + ph) > 0 ? 1 : -1); }); }
      });
      return c;
    }

    shoppers(c, ti, tj, n) {
      if (!tex.m_person) return;
      for (let k = 0; k < Math.min(4, n); k++) {
        const [x0, y0] = P(ti + 0.2, tj + 1.02), [x1, y1] = P(ti + 0.95, tj + 1.02);
        const s = sprite('m_person', x0, y0, TW * 0.2);
        c.addChild(s);
        const ph = k / Math.max(1, n);
        if (reduced) { const f = 0.15 + ph * 0.7; s.position.set(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f); continue; }
        this.anim.push(t => {
          const u = (t * 0.08 + ph) % 1, f = u < 0.5 ? u * 2 : 2 - u * 2;
          s.position.set(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f - Math.abs(Math.sin(t * 9 + k)) * 1.2);
          s.scale.x = Math.abs(s.scale.x) * (u < 0.5 ? 1 : -1);
        });
      }
    }

    smoke(c, x, y) {
      const puffs = [0, 1, 2].map(i => { const g = new X.Graphics().circle(0, 0, 7).fill({ color: css('--map-smoke'), alpha: 0.8 }); c.addChild(g); return [g, i / 3]; });
      if (reduced) { puffs.forEach(([g, o]) => { g.position.set(x, y - o * 20); g.alpha = 0.4; }); return; }
      this.anim.push(t => { for (const [g, o] of puffs) { const u = (t / 2.4 + o) % 1; g.position.set(x + u * 6, y - u * 30); g.scale.set(0.7 + u); g.alpha = 0.8 * (1 - u); } });
    }

    // Bölgenin ön kenarında gidip gelen kamyon: mal taşımanın görsel karşılığı
    truck() {
      const c = new X.Container();
      if (!tex.m_truck) return c;
      const s = sprite('m_truck', 0, 0, TW * 0.42);
      c.addChild(s);
      const [x0, y0] = P(0.2, N + 0.15), [x1, y1] = P(N - 0.2, N + 0.15);
      const sp = { merkez: 0.05, kirsal: 0.035, dag: 0.03 }[this.key];
      if (reduced) { s.position.set((x0 + x1) / 2, (y0 + y1) / 2); return c; }
      this.anim.push(t => {
        const u = (t * sp) % 1, f = u < 0.5 ? u * 2 : 2 - u * 2;
        s.position.set(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f);
        s.scale.x = Math.abs(s.scale.x) * (u < 0.5 ? -1 : 1);
      });
      return c;
    }
  }

  // ---------- Çizim yardımcıları ----------
  function tile(i, j, d = 1) { return [...P(i, j), ...P(i + d, j), ...P(i + d, j + d), ...P(i, j + d)]; }
  function owned(i, j) { return new X.Graphics().poly(tile(i, j)).fill(css('--map-ownGround')).stroke({ width: 3, color: css('--map-own') }); }
  function sprite(k, x, y, w) { const s = new X.Sprite(tex[k]); s.anchor.set(0.5, 1); s.width = w; s.scale.y = s.scale.x; s.position.set(x, y); return s; }
  // Bina görselinin taban karosu, arsa karosunun alt köşesine oturur
  function building(k, ti, tj) { const [x, y] = P(ti + 1, tj + 1); return sprite(k, x, y + 6, TW * 1.08); }
  function placeholder(ti, tj) {
    const g = new X.Graphics(), [x, y] = P(ti + 0.5, tj + 0.5);
    g.roundRect(-26, -50, 52, 50, 6).fill(css('--map-wall2'));
    const c = new X.Container(); c.addChild(g); c.position.set(x, y + 10); return c;
  }
  function pin(x, y, label, warn) {
    const c = new X.Container();
    c.addChild(new X.Graphics().circle(0, 0, 15).fill(css(warn ? '--amber' : '--accent')).stroke({ width: 3, color: 0xffffff }));
    const t = new X.Text({ text: label, style: { fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: '700', fontSize: 16, fill: warn ? 0x1a1a1a : css('--on-accent') } });
    t.anchor.set(0.5); c.addChild(t); c.position.set(x, y - 10);
    return c;
  }

  // ---------- Dış arayüz ----------
  const regions = {};
  let theme = '';
  const TezgahMap = {
    ok: true,
    // container: oyunun her çizimde aynı kalan harita kutusu. Kutu yeniden oluşturulursa tuvaller oraya taşınır.
    update(container, model, onFocus) {
      if (!this.ok || !container) return;
      const dark = matchMedia('(prefers-color-scheme: dark)').matches + (document.documentElement.dataset.theme || '');
      loadTextures().then(() => {
        for (const [key, m] of Object.entries(model.regions)) {
          const r = regions[key] || (regions[key] = new Region(key));
          if (r.fig.parentNode !== container) container.append(r.fig);
          r.ready.then(() => {
            const sig = JSON.stringify(m) + dark;
            if (sig !== r.sig || theme !== dark) { r.sig = sig; r.build(m, onFocus); }
          }).catch(() => { this.ok = false; });
        }
        theme = dark;
      });
    },
  };
  // WebGL gerçekten açılabiliyor mu? Açılamıyorsa SVG haritaya dönülür.
  try { const t = document.createElement('canvas'); if (!(t.getContext('webgl2') || t.getContext('webgl'))) TezgahMap.ok = false; } catch (e) { TezgahMap.ok = false; }
  window.TezgahMap = TezgahMap;
})();
