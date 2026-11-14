(() => {
  'use strict';

  // ---------- Sabit veriler ----------
  const P = {
    bugday: { n: 'Buğday', ref: 4, w: 1, b: 'tarla', t: 30, op: 20, in: {} },
    sut: { n: 'Süt', ref: 6, w: 1, b: 'tarla', t: 30, op: 30, in: {}, d: 6 },
    pamuk: { n: 'Pamuk', ref: 8, w: 1, b: 'tarla', t: 45, op: 40, in: {} },
    komur: { n: 'Kömür', ref: 6, w: 2, b: 'maden', t: 45, op: 30, in: {}, d: 4 },
    demir: { n: 'Demir cevheri', ref: 10, w: 2, b: 'maden', t: 60, op: 50, in: {} },
    un: { n: 'Un', ref: 14, w: 1, b: 'fabrika', t: 60, op: 15, in: { bugday: 20 }, d: 3 },
    kumas: { n: 'Kumaş', ref: 27, w: 1, b: 'fabrika', t: 120, op: 25, in: { pamuk: 20 } },
    celik: { n: 'Çelik', ref: 40, w: 2, b: 'fabrika', t: 120, op: 30, in: { demir: 20, komur: 10 } },
    ekmek: { n: 'Ekmek', ref: 24, w: 1, b: 'fabrika', t: 60, op: 40, in: { un: 10 }, d: 12 },
    peynir: { n: 'Peynir', ref: 30, w: 1, b: 'fabrika', t: 180, op: 50, in: { sut: 30 }, d: 8 },
    giysi: { n: 'Giysi', ref: 46, w: 0.5, b: 'fabrika', t: 180, op: 80, in: { kumas: 10 }, d: 5 },
    alet: { n: 'Alet', ref: 65, w: 1, b: 'fabrika', t: 240, op: 100, in: { celik: 10 }, d: 3 },
  };
  const PK = Object.keys(P);
  const WNAME = { 0.5: 'hafif', 1: 'orta', 2: 'ağır' };
  const R = {
    merkez: { n: 'Merkez', dm: 1.6, land: 12000, note: 'Tüketici talebi en yüksek bölge' },
    kirsal: { n: 'Kırsal', dm: 1.0, land: 6000, bonus: 'tarla', note: 'Tarlalar %25 fazla ürün verir' },
    dag: { n: 'Dağ', dm: 0.7, land: 7000, bonus: 'maden', note: 'Madenler %25 fazla ürün verir' },
  };
  const DIST = {
    merkez: { merkez: 0, kirsal: 1, dag: 2 },
    kirsal: { merkez: 1, kirsal: 0, dag: 1 },
    dag: { merkez: 2, kirsal: 1, dag: 0 },
  };
  const B = {
    dukkan: { n: 'Dükkân', cost: 1500, cap: 150, hint: 'Mal alır, şehir halkına perakende satar' },
    tarla: { n: 'Tarla', cost: 1200, cap: 200, hint: 'Buğday, süt ve pamuk üretir' },
    maden: { n: 'Maden', cost: 2000, cap: 200, hint: 'Kömür ve demir cevheri çıkarır' },
    fabrika: { n: 'Fabrika', cost: 2500, cap: 250, hint: 'Ham maddeyi işleyip ürün yapar' },
  };
  const EVENTS = {
    festival: { title: 'Merkez’de hasat festivali', body: 'Festival boyunca Merkez’de ekmek ve peynir talebi %50 artacak.', d: { region: 'merkez', ps: ['ekmek', 'peynir'], m: 1.5 } },
    kis: { title: 'Sert kış geliyor', body: 'Soğuk hava kömür ve giysi talebini tüm bölgelerde %50 artıracak.', d: { ps: ['komur', 'giysi'], m: 1.5 } },
    moda: { title: 'Merkez’de yeni moda akımı', body: 'Giysi talebi Merkez’de %60 artacak.', d: { region: 'merkez', ps: ['giysi'], m: 1.6 } },
    insaat: { title: 'Belediye inşaat hamlesi başlatıyor', body: 'Alet talebi tüm bölgelerde %60 artacak.', d: { ps: ['alet'], m: 1.6 } },
    kuraklik: { title: 'Kırsal’da kuraklık bekleniyor', body: 'Kırsal’daki tarlaların verimi %30 düşecek.', y: { region: 'kirsal', b: 'tarla', m: 0.7 } },
    bereket: { title: 'Kırsal’da bereketli mevsim', body: 'Kırsal’daki tarlaların verimi %30 artacak.', y: { region: 'kirsal', b: 'tarla', m: 1.3 } },
    damar: { title: 'Dağ’da yeni damar bulundu', body: 'Dağ’daki madenlerin verimi %30 artacak.', y: { region: 'dag', b: 'maden', m: 1.3 } },
    yol: { title: 'Dağ yolunda bakım çalışması', body: 'Çalışma süresince tüm taşıma ücretleri %80 artacak.', tr: 1.8 },
  };
  // İşçiler: zorunlu değil; binayı bir konuda iyileştirir, günlük maaş alır
  const WK = {
    usta: { n: 'Usta', b: ['tarla', 'maden', 'fabrika'], eff: [0.05, 0.10, 0.15], wage: [25, 50, 75], desc: e => `parti süresi %${e * 100} kısalır` },
    mudur: { n: 'Müdür', b: ['tarla', 'maden', 'fabrika', 'dukkan'], eff: [0.05, 0.10, 0.15], wage: [25, 50, 75], desc: e => `işletme gideri ve toptancıdan alış %${e * 100} ucuzlar` },
    satis: { n: 'Satış görevlisi', b: ['dukkan'], eff: [1, 2, 3], wage: [20, 40, 60], desc: e => `rafa ${e} ek ürün` },
    sofor: { n: 'Şoför', b: ['tarla', 'maden', 'fabrika', 'dukkan'], eff: [0.10, 0.20, 0.30], wage: [15, 30, 45], desc: e => `taşıma ücreti %${e * 100} azalır` },
  };
  const REG_WK = { merkez: { mudur: 3, satis: 3, usta: 1, sofor: 1 }, kirsal: { usta: 3, sofor: 2, mudur: 1, satis: 1 }, dag: { usta: 3, sofor: 3, mudur: 1, satis: 1 } };
  const NAMES = ['Ayşe', 'Mehmet', 'Zeynep', 'Can', 'Elif', 'Mert', 'Deniz', 'Selin', 'Burak', 'Ece', 'Emre', 'Derya', 'Kerem', 'Nil', 'Onur', 'Sena', 'Tuna', 'Melis'];
  const RETAIL = 1.6, W_BUY = 1.3, W_SELL = 0.75, RENT = 0.05, COMM = 0.03, FREE_UNTIL = 2 * 1440;
  const GOALS = [
    ['Arsana bir bina kur', s => s.plots.some(p => p.b)],
    ['İlk satışını yap', s => s.totalIncome > 0],
    ['Bir ürüne otomatik fiyat kuralı koy', s => s.plots.some(p => p.b && Object.values(p.b.rule || {}).some(r => r.mode !== 'elle'))],
    ['Kasanda ₺10.000 biriktir', s => s.money >= 10000],
    ['Bir arsa artırması kazan', s => s.plots.some(p => !p.rented)],
    ['Üç arsaya ulaş', s => s.plots.length >= 3],
    ['Net değerini ₺50.000 yap', s => netWorth() >= 50000],
  ];
  const SAVE_KEY = 'tezgah-demo-v2';

  // ---------- Durum ----------
  let s, ui = { tab: 'plots', dest: 1, qty: 20, listMul: 1, sel: {} };
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  // Alım hızı: fiyat piyasa fiyatının her %10 üstünde alım hızı %20 düşer, %50 üstünde alıcı kalmaz;
  // piyasanın altında hız artar (en fazla %50). Hem şehir halkına hem pazardaki ilanlara uygulanır.
  const buySpeed = r => clamp(1 - 2 * (r - 1), 0, 1.5);
  const speedNote = r => {
    const d = Math.round((r - 1) * 100), v = Math.round(buySpeed(r) * 100);
    if (d > 0) return `<span class="${v < 60 ? 'warn' : ''}">Piyasanın %${d} üstünde · alım hızı %${v}</span>`;
    if (d < 0) return `<span class="up">Piyasanın %${-d} altında · alım hızı %${v}</span>`;
    return 'Piyasa fiyatında · alım hızı %100';
  };
  const fmt = n => (n < 0 ? '−' : '') + '₺' + Math.abs(Math.round(n)).toLocaleString('tr-TR');
  const fmt1 = n => '₺' + (Math.round(n * 10) / 10).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function emptyStats() { return { inc: {}, exp: {} }; }
  function newGame() {
    s = {
      v: 2, money: 5000, t: 8 * 60, lastHour: 8, speed: 1, nextId: 100, nextPlot: 2, totalIncome: 0,
      plots: [{ id: 1, region: 'kirsal', rented: true, ref: R.kirsal.land, b: null, inv: {}, last: -1e9, paid: 0 }],
      mult: {}, hist: {}, rivals: {}, unread: 0, workers: [], cands: {}, listings: [], mine: [], auctions: [], events: [], news: [],
      today: emptyStats(), prev: emptyStats(), goals: [], freeSwap: true, lastEvent: '', nextListAt: 0,
    };
    for (const k of PK) { s.mult[k] = 1; s.hist[k] = [1]; }
    for (const r in R) { s.rivals[r] = {}; for (const k of PK) if (P[k].d) s.rivals[r][k] = [rnd(0.97, 1.1), rnd(0.97, 1.1)]; }
    for (const r in R) s.cands[r] = genCands(r);
    genListings();
    spawnAuction();
    news('Tezgâh açıldı', 'Kırsal’da kiralık bir arsan ve ₺5.000 sermayen var. İlk iki gün kira ve vergi alınmaz.');
    ui.dest = 1;
  }
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(s)); } catch (e) { /* depolama yoksa oyun yine çalışır */ } }
  function load() {
    try { const d = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); if (d && d.v === 2 && Array.isArray(d.plots)) { s = d; for (const pl of s.plots) if (pl.b && !pl.b.out) pl.b.out = {}; if (!s.workers) { s.workers = []; s.cands = {}; for (const r in R) s.cands[r] = genCands(r); } return true; } } catch (e) { /* yoksay */ }
    return false;
  }

  // ---------- Ekonomi yardımcıları ----------
  const price = p => P[p].ref * s.mult[p];
  const retailRef = p => price(p) * RETAIL;
  const activeEvents = () => s.events.filter(e => s.t >= e.start && s.t < e.end);
  function demandMult(region, p) { let m = 1; for (const e of activeEvents()) { const d = EVENTS[e.key].d; if (d && d.ps.includes(p) && (!d.region || d.region === region)) m *= d.m; } return m; }
  function yieldMult(region, b) { let m = R[region].bonus === b ? 1.25 : 1; for (const e of activeEvents()) { const y = EVENTS[e.key].y; if (y && y.b === b && y.region === region) m *= y.m; } return m; }
  function transMult() { let m = 1; for (const e of activeEvents()) if (EVENTS[e.key].tr) m *= EVENTS[e.key].tr; return m; }
  const trans = (qty, p, from, to) => qty * P[p].w * (0.1 + DIST[from][to] * 0.2) * transMult();
  const invTotal = pl => Object.values(pl.inv).reduce((a, b) => a + b, 0);
  const cap = pl => (pl.b ? B[pl.b.type].cap * (pl.b.level + (pl.b.parts || []).length) : 0);
  // Üretim binasında seviye partiyi büyütür: 1. seviye 10, 2. seviye 15, 3. seviye 20 birim (girdi ve gider de aynı oranda)
  const batch = pl => pl.b.type === 'dukkan' ? 1 : 1 + 0.5 * (pl.b.level - 1);
  // Yeni hat için aynı bölgedeki boş arsalar (binanın genişleyebileceği yer)
  const freePlots = pl => s.plots.filter(x => x !== pl && !x.b && !x.part && x.region === pl.region);
  const plot = id => s.plots.find(p => p.id === id);
  function add(pl, p, q) { pl.inv[p] = (pl.inv[p] || 0) + q; if (pl.inv[p] <= 0) delete pl.inv[p]; }
  function inc(kind, amt) { s.money += amt; s.totalIncome += amt; s.today.inc[kind] = (s.today.inc[kind] || 0) + amt; }
  function exp(kind, amt) { s.money -= amt; s.today.exp[kind] = (s.today.exp[kind] || 0) + amt; }
  function rentOn(pl, amt) { if (pl.rented && s.t >= FREE_UNTIL) exp('Kira', amt * RENT); }
  function news(title, body, alert) { s.news.unshift({ t: s.t, title, body }); if (s.news.length > 40) s.news.pop(); if (ui.tab !== 'news') s.unread = (s.unread || 0) + 1; if (alert) toast(title); }
  function shopRate(pl, p) {
    const pr = pl.b.prices[p] || retailRef(p);
    const A = Math.pow(retailRef(p) / pr, 2) * (1 + 0.1 * (pl.b.level - 1));
    const D = (P[p].d || 0) * R[pl.region].dm * demandMult(pl.region, p) * buySpeed(pr / retailRef(p));
    const RA = s.rivals[pl.region][p].reduce((a, m) => a + 1 / (m * m), 0);
    return D * A / (A + RA + 1);
  }
  // Rakip dükkânlar: her bölgede her ürün için iki rakip; fiyatları olağan perakende fiyatının katı olarak tutulur
  const rivalLo = (region, p) => Math.min(...s.rivals[region][p]) * retailRef(p);
  const rivalAvg = (region, p) => s.rivals[region][p].reduce((a, b) => a + b, 0) / s.rivals[region][p].length * retailRef(p);
  function rivalsMove() {
    for (const r in R) for (const p in s.rivals[r]) {
      let pm = Infinity;
      for (const pl of s.plots) if (pl.b && pl.b.type === 'dukkan' && pl.region === r && (pl.inv[p] || 0) > 0) pm = Math.min(pm, (pl.b.prices[p] || retailRef(p)) / retailRef(p));
      s.rivals[r][p] = s.rivals[r][p].map(m => (pm < m && Math.random() < 0.3) ? clamp(pm - 0.01, 0.72, 1.3) : clamp(m + (1.02 - m) * 0.05 + rnd(-0.01, 0.01), 0.72, 1.3));
    }
  }
  // Dükkânın rafındaki ürünler: stokta olanlar ve kuralı tanımlı olanlar
  const shelf = pl => [...new Set([...Object.keys(pl.inv), ...Object.keys(pl.b.rule), ...Object.keys(pl.b.auto).filter(p => pl.b.auto[p])])].filter(p => P[p]);
  const shopCost = (pl, p) => pl.b.cost[p] || price(p) * W_BUY;
  function ruleFloor(pl, p) { const r = pl.b.rule[p]; return shopCost(pl, p) * (1 + (r ? r.margin : 0.1)) / (pl.rented ? 1 - RENT : 1); }
  function applyRule(pl, p) {
    const r = pl.b.rule[p]; if (!r || r.mode === 'elle' || !P[p].d) return;
    const target = r.mode === 'ucuz' ? rivalLo(pl.region, p) * 0.99 : rivalAvg(pl.region, p);
    pl.b.prices[p] = Math.round(Math.min(retailRef(p) * 1.5, Math.max(ruleFloor(pl, p), target)) * 10) / 10;
  }
  // Satın alma: pazardaki ilanlar ve sistem toptancısı, teslim fiyatına göre
  function sources(p, region) {
    const src = s.listings.filter(l => l.p === p).map(l => ({ l, unit: l.price + trans(1, p, l.region, region) }));
    src.push({ l: null, unit: price(p) * W_BUY + trans(1, p, region, region) });
    return src.sort((a, b) => a.unit - b.unit);
  }
  const crew = pl => s.workers.filter(w => w.plot === pl.id);
  const slots = pl => (pl.b ? pl.b.level : 0);
  const wEff = (pl, type) => pl && pl.b ? Math.min(type === 'satis' ? 9 : 0.3, crew(pl).filter(w => w.type === type).reduce((a, w) => a + WK[type].eff[w.star - 1], 0)) : 0;
  const shelfMax = pl => 3 * pl.b.level + wEff(pl, 'satis');
  const stars = n => '★'.repeat(n) + '<span class="muted">' + '★'.repeat(3 - n) + '</span>';
  function genCands(region) {
    const w = REG_WK[region], types = Object.keys(w).flatMap(k => Array(w[k]).fill(k));
    return Array.from({ length: 4 }, () => {
      const type = pick(types), r = Math.random(), star = r < 0.6 ? 1 : r < 0.9 ? 2 : 3;
      return { id: s.nextId++, name: pick(NAMES), type, star, wage: Math.round(WK[type].wage[star - 1] * rnd(0.85, 1.15)) };
    });
  }
  function fireCrew(pl, why) { const c = crew(pl); if (c.length) { s.workers = s.workers.filter(w => w.plot !== pl.id); news('İşçiler ayrıldı', c.map(w => w.name).join(', ') + ' ' + why + ' işten ayrıldı.'); } }
  function addCost(pl, p, q, unit) { if (!pl.b || pl.b.type !== 'dukkan') return; const old = pl.inv[p] || 0; pl.b.cost[p] = (old * (pl.b.cost[p] || unit) + q * unit) / (old + q); }
  function purchase(to, p, q, l) {
    const unit = (l ? l.price : price(p) * W_BUY * (1 - wEff(to, 'mudur'))), tu = trans(1, p, l ? l.region : to.region, to.region) * (1 - wEff(to, 'sofor'));
    q = Math.min(q, l ? l.qty : Infinity, cap(to) - invTotal(to), Math.floor(s.money / (unit + tu)));
    if (q <= 0) return 0;
    exp('Mal alımı', unit * q); exp('Taşıma', tu * q); addCost(to, p, q, unit + tu); add(to, p, q);
    if (l) { l.qty -= q; if (l.qty <= 0) s.listings = s.listings.filter(x => x !== l); }
    s.mult[p] = clamp(s.mult[p] + 0.00002 * P[p].ref * q, 0.6, 1.5);
    return q;
  }
  function supply(pl, p, q, maxUnit) {
    let got = 0;
    for (const x of sources(p, pl.region)) { if (q - got <= 0 || x.unit > maxUnit) break; got += purchase(pl, p, q - got, x.l); }
    return got;
  }
  function autoRestock(pl, p) {
    const m = pl.b.auto[p]; if (!m || !P[p].d) return;
    const have = pl.inv[p] || 0; if (have >= 20) return;
    supply(pl, p, Math.min(60 - have, cap(pl) - invTotal(pl)), price(p) * m);
  }
  // Üretim çıktısının otomatik yönetimi: başka arsanın deposuna taşı ya da piyasa fiyatından ilana koy
  const lineInputs = pl => new Set(pl.b.lines.flatMap(ln => ln.r ? Object.keys(P[ln.r].in) : []));
  function autoOut(pl) {
    const inputs = lineInputs(pl);
    for (const [p, rule] of Object.entries(pl.b.out || {})) {
      if (!rule || inputs.has(p)) continue;
      const q = pl.inv[p] || 0;
      if (rule.startsWith('ship:')) {
        const to = plot(+rule.slice(5));
        if (q < 10 || !to || !to.b) continue;
        const n = Math.min(q, cap(to) - invTotal(to)); if (n <= 0) continue;
        const c = trans(n, p, pl.region, to.region) * (1 - Math.max(wEff(pl, 'sofor'), wEff(to, 'sofor'))); if (s.money < c) continue;
        exp('Taşıma', c); add(pl, p, -n); addCost(to, p, n, price(p) + c / n); add(to, p, n);
      } else if (rule.startsWith('list:')) {
        let l = s.mine.find(x => x.auto && x.plot === pl.id && x.p === p);
        if (q > 0) {
          if (!l) { l = { id: s.nextId++, p, qty: 0, price: 0, acc: 0, auto: true, plot: pl.id }; s.mine.push(l); }
          l.qty += q; add(pl, p, -q); pl.last = s.t;
        }
        if (l) l.price = Math.round(price(p) * +rule.slice(5) * 10) / 10;
      }
    }
  }
  function autoInputs(pl, ln) {
    const m = batch(pl);
    for (const [k, q] of Object.entries(P[ln.r].in)) {
      const have = pl.inv[k] || 0;
      if (have < q * m) supply(pl, k, Math.min(3 * q * m - have, cap(pl) - invTotal(pl)), price(k) * ln.auto);
    }
  }
  function landValue() { return s.plots.filter(p => !p.rented).reduce((a, p) => a + p.ref, 0); }
  function netWorth() {
    let v = s.money + landValue();
    for (const pl of s.plots) { if (pl.b) v += pl.b.spent * 0.5; for (const p in pl.inv) v += pl.inv[p] * price(p) * W_SELL; }
    for (const l of s.mine) v += l.qty * price(l.p) * W_SELL;
    for (const a of s.auctions) { if (a.bidder === 'me') v += a.bid; if (a.plot) v += a.plot.ref; }
    return v;
  }
  function taxRate(pl) {
    if (pl.part) { const m = plot(pl.part); return m && s.t - m.last < 1440 ? 0.01 : 0.04; }
    return !pl.b ? 0.08 : (s.t - pl.last < 1440 ? 0.01 : 0.04);
  }
  function taxFactor() { const n = s.plots.filter(p => !p.rented).length; return 1 + 0.1 * Math.max(0, n - 1); }
  const dailyTax = pl => pl.rented ? 0 : pl.ref * taxRate(pl) * taxFactor() / 7;

  // ---------- Simülasyon ----------
  function step(dt) {
    s.t += dt;
    for (const pl of s.plots) {
      if (!pl.b) continue;
      if (pl.b.type === 'dukkan') {
        for (const p in pl.inv) {
          if (!P[p].d) continue;
          pl.b.acc[p] = (pl.b.acc[p] || 0) + shopRate(pl, p) * dt / 60;
          const n = Math.min(Math.floor(pl.b.acc[p]), pl.inv[p]);
          if (n > 0) {
            pl.b.acc[p] -= n; const pr = pl.b.prices[p] || retailRef(p);
            add(pl, p, -n); inc('Perakende', n * pr); rentOn(pl, n * pr); pl.last = s.t;
            s.mult[p] = clamp(s.mult[p] + 0.00001 * P[p].ref * n, 0.6, 1.5);
          }
        }
        continue;
      }
      const k = batch(pl);
      for (const ln of pl.b.lines) {
        if (!ln.r) { ln.st = 'Tarif seç'; continue; }
        const rc = P[ln.r];
        if (ln.busy) {
          ln.prog += dt * (1 + wEff(pl, 'usta'));
          if (ln.prog < rc.t) continue;
          // parti bitti: artan süre bir sonraki partiye devreder, yeni parti aynı adımda başlar
          add(pl, ln.r, Math.round(10 * k * yieldMult(pl.region, pl.b.type))); ln.busy = false; ln.carry = ln.prog - rc.t; ln.prog = 0; pl.last = s.t;
        }
        const need = Object.entries(rc.in).find(([x, q]) => (pl.inv[x] || 0) < q * k);
        if (need) { ln.st = 'Girdi yok: ' + need[1] * k + ' ' + P[need[0]].n; continue; }
        if (invTotal(pl) + 13 * k > cap(pl) + Object.values(rc.in).reduce((a, b) => a + b, 0) * k) { ln.st = 'Depo dolu'; continue; }
        const opc = rc.op * k * (1 - wEff(pl, 'mudur'));
        if (s.money < opc) { ln.st = 'Para yetersiz'; continue; }
        for (const x in rc.in) add(pl, x, -rc.in[x] * k);
        exp('Üretim', opc); ln.busy = true; ln.prog = Math.min(ln.carry || 0, rc.t * 0.99); ln.carry = 0; ln.st = '';
      }
    }
    // Pazardaki ilanlarım
    for (const l of s.mine) {
      l.acc += 15 * buySpeed(l.price / price(l.p)) * dt / 60;
      const n = Math.min(Math.floor(l.acc), l.qty);
      if (n > 0) { l.acc -= n; l.qty -= n; const v = n * l.price; inc('Pazar', v); exp('Komisyon', v * COMM); s.mult[l.p] = clamp(s.mult[l.p] - 0.00002 * P[l.p].ref * n, 0.6, 1.5); }
    }
    s.mine = s.mine.filter(l => l.qty > 0);
    // Artırmalar
    for (const a of s.auctions.filter(a => s.t >= a.end)) endAuction(a);
    s.auctions = s.auctions.filter(a => s.t < a.end);
    while (Math.floor(s.t / 60) > s.lastHour) { s.lastHour++; hourly(s.lastHour); }
    for (let i = 0; i < GOALS.length; i++) if (!s.goals[i] && GOALS[i][1](s)) s.goals[i] = true;
  }

  function hourly(h) {
    for (const k of PK) {
      s.mult[k] = clamp(s.mult[k] + (1 - s.mult[k]) * 0.03 + rnd(-0.012, 0.012), 0.6, 1.5);
      if (h % 2 === 0) { s.hist[k].push(s.mult[k]); if (s.hist[k].length > 36) s.hist[k].shift(); }
    }
    for (const a of s.auctions) {
      const next = Math.ceil(Math.max(a.start, a.bid * 1.05));
      if (a.bidder !== 'npc' && a.npc.some(m => m >= next) && Math.random() < 0.55) {
        if (a.bidder === 'me') { s.money += a.bid; news('Teklifin geçildi', R[a.region].n + ' arsası için yeni teklif: ' + fmt(next) + '. Teminatın iade edildi.', true); }
        a.bid = next; a.bidder = 'npc';
        if (a.end - s.t < 60) a.end = s.t + 60;
      }
    }
    if (s.t >= s.nextListAt) genListings();
    rivalsMove();
    for (const w of s.workers) exp('Maaş', w.wage / 24);
    for (const pl of s.plots) {
      if (!pl.b) continue;
      if (pl.b.type === 'dukkan') { for (const p of shelf(pl)) { autoRestock(pl, p); applyRule(pl, p); } }
      else { for (const ln of pl.b.lines) if (ln.auto && ln.r) autoInputs(pl, ln); autoOut(pl); }
    }
    if (h % 24 === 0) daily(h / 24);
  }

  function daily(day) {
    if (s.t >= FREE_UNTIL) for (const pl of s.plots) { const tx = dailyTax(pl); if (tx > 0) exp('Vergi', tx); }
    s.prev = s.today; s.today = emptyStats();
    for (const w of s.workers) {
      const pl = plot(w.plot);
      if (!pl || s.t - pl.last > 1440) continue;
      w.xp = (w.xp || 0) + 1;
      if (w.xp >= 7 && w.star < 3) {
        const ratio = w.wage / WK[w.type].wage[w.star - 1]; w.star++; w.xp = 0; w.wage = Math.round(WK[w.type].wage[w.star - 1] * ratio);
        news(w.name + ' ' + w.star + ' yıldıza çıktı', WK[w.type].n + ' ' + w.name + ' artık ' + WK[w.type].desc(WK[w.type].eff[w.star - 1]) + '. Maaşı günde ' + fmt(w.wage) + ' oldu; istersen İşçiler sekmesinden işten çıkarabilirsin.', true);
      }
    }
    for (const r in R) s.cands[r] = genCands(r);
    s.events = s.events.filter(e => s.t < e.end);
    let top = PK[0]; for (const k of PK) if (Math.abs(s.mult[k] - 1) > Math.abs(s.mult[top] - 1)) top = k;
    if (Math.abs(s.mult[top] - 1) > 0.08) news('Piyasa: ' + P[top].n + (s.mult[top] > 1 ? ' pahalandı' : ' ucuzladı'), P[top].n + ' fiyatı olağan seviyesinin %' + Math.round(Math.abs(s.mult[top] - 1) * 100) + (s.mult[top] > 1 ? ' üstünde.' : ' altında.'));
    if (s.auctions.filter(a => !a.plot).length < 2) spawnAuction();
    if (day % 2 === 0) announceEvent();
    if (s.money < 0) news('Kasan ekside', 'Borcun var: ' + fmt(-s.money) + '. Mal sat ya da bir arsanı sisteme devret.');
  }

  function announceEvent() {
    let key = null;
    if (s.mult.alet < 0.88) key = 'insaat'; else if (s.mult.giysi < 0.88) key = 'moda';
    else if (s.mult.ekmek < 0.88 || s.mult.peynir < 0.88) key = 'festival'; else if (s.mult.komur < 0.88) key = 'kis';
    if (!key || key === s.lastEvent) key = pick(Object.keys(EVENTS).filter(k => k !== s.lastEvent));
    s.lastEvent = key;
    s.events.push({ key, start: s.t + 1440, end: s.t + 1440 * 3 });
    news(EVENTS[key].title, EVENTS[key].body + ' Yarın başlıyor, iki gün sürecek.', true);
  }

  function genListings() {
    s.listings = [];
    const home = { tarla: ['kirsal', 'kirsal', 'kirsal', 'merkez'], maden: ['dag', 'dag', 'dag', 'kirsal'], fabrika: ['merkez', 'merkez', 'kirsal', 'dag'] };
    for (const k of PK) {
      const n = Math.random() < 0.6 ? 2 : 1;
      for (let i = 0; i < n; i++) s.listings.push({ id: s.nextId++, p: k, region: pick(home[P[k].b]), qty: Math.round(rnd(2, 8)) * 10, price: Math.round(price(k) * rnd(0.86, 1.14) * 10) / 10 });
    }
    s.nextListAt = s.t + 240;
  }

  function spawnAuction(pl) {
    const region = pl ? pl.region : pick(Object.keys(R));
    const ref = pl ? pl.ref : Math.round(R[region].land * rnd(0.9, 1.1) / 100) * 100;
    // Artırma tabanı: güncel değerin yarısı, ama bölgenin başlangıç değerinin %40'ından az değil
    s.auctions.push({ id: s.nextId++, region, ref, start: Math.round(Math.max(ref * 0.5, R[region].land * 0.4)), bid: 0, bidder: null, end: s.t + 720, npc: [0, 0, 0].map(() => ref * rnd(0.6, 1.1)) });
  }

  function endAuction(a) {
    const name = R[a.region].n + ' arsası';
    if (a.plot) {
      if (a.bidder === 'npc') {
        const gross = Math.min(a.bid, a.ref * 1.5), net = gross * 0.95;
        inc('Arsa satışı', net);
        news('Arsan satıldı', name + ' ' + fmt(a.bid) + ' teklifle satıldı. Komisyon sonrası eline geçen: ' + fmt(net) + '.');
      } else { s.plots.push(a.plot); news('Arsana teklif gelmedi', name + ' satılamadı ve sana geri döndü.'); }
    } else if (a.bidder === 'me') {
      const id = s.nextPlot++;
      s.plots.push({ id, region: a.region, rented: false, ref: a.ref, b: null, inv: {}, last: -1e9, paid: a.bid });
      s.today.exp['Arsa alımı'] = (s.today.exp['Arsa alımı'] || 0) + a.bid;
      news('Artırmayı kazandın', name + ' ' + fmt(a.bid) + ' karşılığında senin oldu.', true);
    } else if (a.bidder === 'npc') news('Arsa satışı', name + ' isimsiz bir alıcıya ' + fmt(a.bid) + ' bedelle satıldı.');
  }

  function systemSaleQuote(pl, moveTo) {
    const land = Math.min(pl.ref * 0.5, pl.paid || Infinity), bld = pl.b ? pl.b.spent * 0.5 : 0;
    let goods = 0, tr = 0;
    const dst = moveTo ? plot(moveTo) : null;
    for (const p in pl.inv) { if (dst) tr += trans(pl.inv[p], p, pl.region, dst.region); else goods += pl.inv[p] * price(p) * 0.5; }
    const fits = !dst || invTotal(dst) + invTotal(pl) <= cap(dst);
    return { land, bld, goods, tr, total: land + bld + goods - tr, fits };
  }

  // ---------- Oyuncu eylemleri ----------
  const A = {
    hire(d) {
      const c = Object.values(s.cands).flat().find(x => x.id === +d.id); if (!c) return;
      const pl = plot(+(ui.sel['hp' + c.id] || eligible(c)[0]?.id));
      if (!pl || !eligible(c).includes(pl)) return toast('Bu bölgede uygun boş yuvan yok');
      s.workers.push({ ...c, plot: pl.id, xp: 0 });
      for (const r in s.cands) s.cands[r] = s.cands[r].filter(x => x !== c);
      toast(c.name + ' işe başladı');
    },
    fire(d) { const w = s.workers.find(x => x.id === +d.id); if (!w) return; s.workers = s.workers.filter(x => x !== w); toast(w.name + ' işten çıkarıldı'); },
    focus(d) { ui.tab = 'plots'; ui.focusPlot = +d.plot; },
    tab(d) { ui.tab = d.v; if (d.v === 'news') s.unread = 0; },
    speed(d) { s.speed = +d.v; },
    reset() { if (ui.confirmReset) { newGame(); ui.confirmReset = false; ui.tab = 'plots'; } else { ui.confirmReset = true; setTimeout(() => { ui.confirmReset = false; }, 4000); } },
    build(d) {
      const pl = plot(+d.plot), bt = B[d.v];
      if (s.money < bt.cost) return toast('Para yetersiz');
      exp('İnşaat', bt.cost);
      pl.b = { type: d.v, level: 1, spent: bt.cost, lines: d.v === 'dukkan' ? [] : [{ r: null, prog: 0, busy: false, st: 'Tarif seç', auto: 0 }], prices: {}, acc: {}, rule: {}, auto: {}, cost: {}, out: {} };
    },
    upgrade(d) {
      const pl = plot(+d.plot), c = B[pl.b.type].cost * pl.b.level;
      if (pl.b.level >= 3) return; if (s.money < c) return toast('Para yetersiz');
      exp('İnşaat', c); pl.b.level++; pl.b.spent += c;
    },
    expand(d) {
      const pl = plot(+d.plot), tgt = plot(+(ui.sel['ex' + pl.id] || freePlots(pl)[0]?.id));
      if (!tgt || tgt.b || tgt.part || tgt.region !== pl.region) return toast('Aynı bölgede boş arsan yok');
      const c = B[pl.b.type].cost; if (s.money < c) return toast('Para yetersiz');
      exp('İnşaat', c); pl.b.spent += c; tgt.part = pl.id; pl.b.parts = [...(pl.b.parts || []), tgt.id];
      pl.b.lines.push({ r: null, prog: 0, busy: false, st: 'Tarif seç', auto: 0 });
      news('Bina genişledi', 'Arsa ' + pl.id + '’deki ' + B[pl.b.type].n.toLocaleLowerCase('tr-TR') + ', Arsa ' + tgt.id + '’ye yayıldı ve yeni bir üretim hattı açıldı.');
    },
    demolish(d) {
      const pl = plot(+d.plot);
      if (invTotal(pl) > 0) return toast('Önce depoyu boşalt');
      for (const id of pl.b.parts || []) { const x = plot(id); if (x) x.part = null; }
      fireCrew(pl, 'bina yıkıldığı için');
      s.money += pl.b.spent * (s.freeSwap ? 1 : 0.5); s.freeSwap = false; pl.b = null;
    },
    sellw(d) { const pl = plot(+d.plot), q = pl.inv[d.p]; inc('Toptancı', q * price(d.p) * W_SELL); rentOn(pl, q * price(d.p) * W_SELL); s.mult[d.p] = clamp(s.mult[d.p] - 0.00002 * P[d.p].ref * q, 0.6, 1.5); add(pl, d.p, -q); pl.last = s.t; },
    list(d) { const pl = plot(+d.plot), q = pl.inv[d.p]; s.mine.push({ id: s.nextId++, p: d.p, qty: q, price: Math.round(price(d.p) * ui.listMul * 10) / 10, acc: 0 }); add(pl, d.p, -q); pl.last = s.t; },
    unlist(d) { const l = s.mine.find(x => x.id === +d.id), pl = plot(ui.dest) || s.plots.find(p => p.b); if (!pl || !pl.b) return toast('Malı koyacak depon yok'); if (invTotal(pl) + l.qty > cap(pl)) return toast('Hedef depoda yer yok'); addCost(pl, l.p, l.qty, l.price); add(pl, l.p, l.qty); s.mine = s.mine.filter(x => x !== l); },
    move(d) {
      const pl = plot(+d.plot), to = plot(+(ui.sel['mv' + pl.id] || otherPlots(pl)[0]?.id)), q = pl.inv[d.p];
      if (!to || !to.b) return toast('Hedef arsada bina yok');
      if (invTotal(to) + q > cap(to)) return toast('Hedef depoda yer yok');
      const c = trans(q, d.p, pl.region, to.region) * (1 - Math.max(wEff(pl, 'sofor'), wEff(to, 'sofor'))); if (s.money < c) return toast('Para yetersiz');
      exp('Taşıma', c); add(pl, d.p, -q); addCost(to, d.p, q, price(d.p) + c / q); add(to, d.p, q);
    },
    buy(d) {
      const to = plot(ui.dest); if (!to || !to.b) return toast('Önce binası olan bir hedef arsa seç');
      if (cap(to) - invTotal(to) <= 0) return toast('Hedef depoda yer yok');
      const l = d.id ? s.listings.find(x => x.id === +d.id) : null;
      if (!purchase(to, d.p, Math.max(1, Math.floor(ui.qty) || 1), l)) toast('Para yetersiz');
    },
    bid(d) {
      const a = s.auctions.find(x => x.id === +d.id); if (!a || a.bidder === 'me') return;
      const amt = Math.ceil(Math.max(a.start, a.bid * 1.05)); if (s.money < amt) return toast('Para yetersiz');
      s.money -= amt; a.bid = amt; a.bidder = 'me'; if (a.end - s.t < 60) a.end = s.t + 60;
    },
    sysSell(d) {
      const pl = plot(+d.plot), mv = +(ui.sel['ss' + pl.id] || 0), q = systemSaleQuote(pl, mv);
      if (!q.fits) return toast('Hedef depoda yer yok');
      if (mv) { const dst = plot(mv); for (const p in pl.inv) add(dst, p, pl.inv[p]); exp('Taşıma', q.tr); }
      inc('Arsa satışı', q.land + q.bld + q.goods);
      fireCrew(pl, 'arsa satıldığı için'); s.plots = s.plots.filter(x => x !== pl); spawnAuction(pl);
      news('Arsanı sisteme sattın', R[pl.region].n + ' arsası için ' + fmt(q.total) + ' aldın. Arsa artırmaya çıkarıldı.');
      if (ui.dest === pl.id) ui.dest = s.plots[0].id;
    },
    auctionMine(d) {
      const pl = plot(+d.plot); if (pl.part) return toast('Bu arsa bir binanın parçası'); if (pl.b || invTotal(pl) > 0) return toast('Önce binayı yık ve depoyu boşalt');
      s.plots = s.plots.filter(x => x !== pl);
      s.auctions.push({ id: s.nextId++, region: pl.region, ref: pl.ref, start: Math.round(pl.ref * 0.7), bid: 0, bidder: null, end: s.t + 720, npc: [0, 0, 0].map(() => pl.ref * rnd(0.6, 1.25)), plot: pl });
      if (ui.dest === pl.id) ui.dest = s.plots[0].id;
    },
  };
  const C = {
    recipe(el) { const ln = plot(+el.dataset.plot).b.lines[+el.dataset.i]; ln.r = el.value || null; ln.busy = false; ln.prog = 0; },
    price(el) { const v = parseFloat(el.value.replace(',', '.')), pl = plot(+el.dataset.plot); if (v > 0) { pl.b.prices[el.dataset.p] = v; if (pl.b.rule[el.dataset.p]) pl.b.rule[el.dataset.p].mode = 'elle'; } },
    rule(el) { const pl = plot(+el.dataset.plot), p = el.dataset.p, r = pl.b.rule[p] || { mode: 'elle', margin: 0.1 }; r[el.dataset.f] = el.dataset.f === 'mode' ? el.value : +el.value; pl.b.rule[p] = r; applyRule(pl, p); },
    auto(el) { const pl = plot(+el.dataset.plot); pl.b.auto[el.dataset.p] = +el.value; autoRestock(pl, el.dataset.p); },
    lineAuto(el) { const pl = plot(+el.dataset.plot), ln = pl.b.lines[+el.dataset.i]; ln.auto = +el.value; if (ln.auto && ln.r) autoInputs(pl, ln); },
    out(el) { const pl = plot(+el.dataset.plot); pl.b.out[el.dataset.p] = el.value; if (el.value) autoOut(pl); },
    addShelf(el) { if (!el.value) return; const pl = plot(+el.dataset.plot), p = el.value; if (shelf(pl).length >= shelfMax(pl)) { el.value = ''; return toast('Raf dolu: dükkânı yükselt ya da satış görevlisi al'); } pl.b.auto[p] = pl.b.auto[p] || 1.1; pl.b.rule[p] = pl.b.rule[p] || { mode: 'ucuz', margin: 0.1 }; autoRestock(pl, p); applyRule(pl, p); },
    qty(el) { ui.qty = clamp(parseInt(el.value, 10) || 1, 1, 500); },
    dest(el) { ui.dest = +el.value; },
    listMul(el) { ui.listMul = +el.value; },
    sel(el) { ui.sel[el.dataset.k] = el.value; },
  };
  const eligible = c => s.plots.filter(pl => pl.b && pl.region === Object.keys(s.cands).find(r => s.cands[r].includes(c)) && WK[c.type].b.includes(pl.b.type) && crew(pl).length < slots(pl));
  const ic = (k, n) => (window.TezgahArt ? window.TezgahArt.icon(k, n) : '');
  // Harita için görünüm modeli: her bölgede oyuncunun arsaları ve artırmadaki arsalar
  function mapModel() {
    const regions = {};
    for (const r in R) regions[r] = { name: R[r].n, plots: [], auctions: s.auctions.filter(a => a.region === r && !a.plot) };
    for (const pl of s.plots) {
      if (pl.part) continue;
      const b = pl.b, m = { id: pl.id, label: 'Arsa ' + pl.id + (b ? ' · ' + B[b.type].n : ' · boş') };
      if (!b) { m.empty = true; regions[pl.region].plots.push(m); continue; }
      Object.assign(m, { type: b.type, level: b.level, partIds: b.parts || [] });
      if (b.type === 'dukkan') {
        const sh = shelf(pl).filter(p => P[p].d);
        m.customers = Math.min(6, Math.round(sh.reduce((a, p) => a + ((pl.inv[p] || 0) > 0 ? shopRate(pl, p) : 0), 0)));
        m.warn = !sh.length || sh.some(p => !(pl.inv[p] > 0));
      } else {
        m.product = (b.lines.find(l => l.r) || {}).r;
        m.busy = b.lines.some(l => l.busy);
        m.warn = b.lines.some(l => l.r && !l.busy) || !b.lines.some(l => l.r);
      }
      regions[pl.region].plots.push(m);
    }
    return { regions };
  }
  const otherPlots = pl => s.plots.filter(x => x !== pl && x.b);

  // ---------- Görünüm ----------
  let toastT = 0;
  function toast(msg) { const el = document.getElementById('toast'); el.textContent = msg; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { el.hidden = true; }, 2200); }
  const btn = (label, action, data = {}, cls = '') => `<button type="button" class="btn ${cls}" data-a="${action}" ${Object.entries(data).map(([k, v]) => `data-${k}="${esc(v)}"`).join(' ')}>${label}</button>`;
  const clock = () => { const d = Math.floor(s.t / 1440) + 1, h = Math.floor(s.t / 60) % 24; return `Gün ${d} · ${String(h).padStart(2, '0')}:00`; };
  const hoursLeft = a => { const h = (a.end - s.t) / 60; return h <= 1 ? '1 saatten az' : Math.ceil(h) + ' saat'; };
  const trend = k => { const m = s.mult[k]; return m > 1.04 ? `<span class="up">▲ %${Math.round((m - 1) * 100)}</span>` : m < 0.96 ? `<span class="down">▼ %${Math.round((1 - m) * 100)}</span>` : '<span class="muted">olağan</span>'; };
  function spark(k) { const h = s.hist[k]; if (h.length < 2) return ''; const pts = h.map((v, i) => `${(i / (h.length - 1) * 78 + 1).toFixed(1)},${(21 - (v - 0.6) / 0.9 * 20).toFixed(1)}`).join(' '); return `<svg class="spark" viewBox="0 0 80 22" width="80" height="22" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`; }

  function plotCard(pl) {
    const reg = R[pl.region];
    let h = `<div class="card"><div class="row head"><h3>Arsa ${pl.id} · ${reg.n}</h3><span class="tag ${pl.rented ? '' : 'own'}">${pl.rented ? 'Kiralık' : 'Senin'}</span></div><p class="muted small">${reg.note}</p>`;
    if (pl.part) {
      const m = plot(pl.part);
      return h + `<p class="small">Bu arsa, Arsa ${pl.part}’deki ${m && m.b ? B[m.b.type].n.toLocaleLowerCase('tr-TR') : 'binanın'} genişlemesi; ek üretim hattı burada çalışıyor. Ayrı kullanılamaz; bina yıkılınca boşalır.</p></div>`;
    }
    if (!pl.b) {
      h += '<p>Bu arsaya ne kuracaksın?</p><div class="choices">';
      for (const k in B) h += `<button type="button" class="choice" data-a="build" data-plot="${pl.id}" data-v="${k}">${ic(k, 34)}<b>${B[k].n}</b><span>${fmt(B[k].cost)}</span><small>${B[k].hint}${reg.bonus === k ? ' · bölge bonusu' : ''}</small></button>`;
      return h + '</div></div>';
    }
    const b = pl.b, bt = B[b.type];
    const k = batch(pl), parts = b.parts || [], prod = b.type !== 'dukkan';
    h += `<div class="row"><b class="named">${ic(b.type, 26)}${bt.n} · seviye ${b.level}</b><span class="muted small">Depo ${invTotal(pl)}/${cap(pl)}</span></div>`;
    const cw = crew(pl);
    h += `<p class="small"><span class="muted">Çalışanlar ${cw.length}/${slots(pl)}:</span> ${cw.length ? cw.map(w => WK[w.type].n + ' ' + esc(w.name) + ' ' + stars(w.star)).join(' · ') : '<span class="muted">yok · İşçiler sekmesinden alabilirsin</span>'}</p>`;
    if (prod) h += `<p class="muted small">Parti ${10 * k} birim · ${b.lines.length} hat${parts.length ? ' · ' + (parts.length + 1) + ' arsaya yayılıyor' : ''}</p>`;
    h += '<div class="row wrap">';
    if (b.level < 3) h += btn(prod ? `Kapasiteyi artır: parti ${10 * (k + 0.5)} birim · ${fmt(bt.cost * b.level)}` : `Yükselt ${fmt(bt.cost * b.level)}`, 'upgrade', { plot: pl.id });
    h += btn(`Yık (iade ${fmt(b.spent * (s.freeSwap ? 1 : 0.5))})`, 'demolish', { plot: pl.id }, 'ghost') + '</div>';
    if (prod && b.level >= 3 && b.lines.length < 3) {
      const free = freePlots(pl);
      h += free.length ? `<div class="row wrap small"><label for="ex${pl.id}">Yeni hat için genişle</label><select id="ex${pl.id}" data-c="sel" data-k="ex${pl.id}">${free.map(o => `<option value="${o.id}" ${ui.sel['ex' + pl.id] == o.id ? 'selected' : ''}>Arsa ${o.id}</option>`).join('')}</select>${btn('Genişlet ' + fmt(bt.cost), 'expand', { plot: pl.id })}</div><p class="muted small">Bina seçilen boş arsaya yayılır ve ikinci bir hat açılır; bina tek kalır.</p>`
        : `<p class="muted small">Yeni hat için ${R[pl.region].n} bölgesinde boş bir arsan olmalı.</p>`;
    } else if (prod && b.level < 3) h += '<p class="muted small">3. seviyeden sonra bina, aynı bölgedeki boş bir arsaya genişleyerek yeni hat açabilir.</p>';
    b.lines.forEach((ln, i) => {
      const opts = PK.filter(k => P[k].b === b.type).map(k => `<option value="${k}" ${ln.r === k ? 'selected' : ''}>${P[k].n}${Object.keys(P[k].in).length ? ' ← ' + Object.entries(P[k].in).map(([x, q]) => q * batch(pl) + ' ' + P[x].n).join(', ') : ''}</option>`).join('');
      h += `<div class="line"><label class="small muted" for="rc${pl.id}_${i}">Hat ${i + 1}</label><select id="rc${pl.id}_${i}" data-c="recipe" data-plot="${pl.id}" data-i="${i}"><option value="">Tarif seç</option>${opts}</select><div class="bar"><i data-prog="${pl.id}:${i}"></i></div><span class="small ${ln.busy ? 'muted' : 'warn'}">${ln.busy ? 'Üretiyor · parti gideri ' + fmt(P[ln.r].op * batch(pl)) : esc(ln.st || '') + (ln.auto && ln.st && ln.st.startsWith('Girdi') ? ' · bu fiyata uygun satıcı yok' : '')}</span>${ln.r && Object.keys(P[ln.r].in).length ? `<label class="small muted" for="la${pl.id}_${i}">Girdi bitince</label><select id="la${pl.id}_${i}" data-c="lineAuto" data-plot="${pl.id}" data-i="${i}">${[[0, 'Elle alırım'], [1, 'Olağan fiyata kadar al'], [1.1, 'Olağanın %10 fazlasına kadar al'], [1.35, 'Toptancı dahil al (%35 fazlası)']].map(([v, l]) => `<option value="${v}" ${(ln.auto || 0) === v ? 'selected' : ''}>${l}</option>`).join('')}</select>` : ''}</div>`;
    });
    const items = b.type === 'dukkan' ? shelf(pl) : [...new Set([...b.lines.filter(l => l.r).map(l => l.r), ...Object.keys(pl.inv), ...Object.keys(b.out || {}).filter(p => b.out[p])])];
    if (!items.length) h += `<p class="muted small">${b.type === 'dukkan' ? 'Raflar boş. Pazar sekmesinden mal al ya da kendi üretimini buraya taşı.' : 'Depo boş.'}</p>`;
    const others = otherPlots(pl);
    if (items.length && others.length) h += `<div class="row small"><label for="mv${pl.id}">Taşıma hedefi</label><select id="mv${pl.id}" data-c="sel" data-k="mv${pl.id}">${others.map(o => `<option value="${o.id}" ${ui.sel['mv' + pl.id] == o.id ? 'selected' : ''}>Arsa ${o.id} · ${R[o.region].n}</option>`).join('')}</select></div>`;
    for (const p of items) {
      const q = pl.inv[p] || 0;
      h += `<div class="item"><div class="row"><b class="named">${ic(p, 26)}${P[p].n}</b><span class="num">${q} adet</span></div>`;
      if (b.type === 'dukkan' && P[p].d) h += shopControls(pl, p);
      else if (b.type === 'dukkan') h += '<p class="warn small">Şehir halkı bu ürünü almaz; pazarda sat ya da fabrikaya taşı.</p>';
      else h += outControls(pl, p);
      if (q > 0) h += `<div class="row wrap">${btn('Toptancıya sat ' + fmt(q * price(p) * W_SELL), 'sellw', { plot: pl.id, p })}${btn('Pazara ilan ver', 'list', { plot: pl.id, p }, 'ghost')}${others.length ? btn('Taşı', 'move', { plot: pl.id, p }, 'ghost') : ''}</div>`;
      h += '</div>';
    }
    if (b.type === 'dukkan') {
      const rest = PK.filter(p => P[p].d && !items.includes(p));
      h += `<p class="muted small">Raf: ${items.filter(p => P[p].d).length}/${shelfMax(pl)} ürün çeşidi</p>`;
      if (rest.length) h += `<div class="row small"><label for="as${pl.id}">Rafa ürün ekle</label><select id="as${pl.id}" data-c="addShelf" data-plot="${pl.id}"><option value="">Ürün seç</option>${rest.map(p => `<option value="${p}">${P[p].n}</option>`).join('')}</select></div><p class="muted small">Eklenen ürün otomatik alınır ve en ucuz rakibin biraz altında satılır; ayarları sonra değiştirebilirsin.</p>`;
    }
    return h + '</div>';
  }

  function outControls(pl, p) {
    if (lineInputs(pl).has(p)) return '<p class="muted small">Bu arsadaki üretimin girdisi; otomatik gönderilmez.</p>';
    const cur = (pl.b.out || {})[p] || '', id = pl.id + p;
    const opts = [['', 'Elle yönetirim'], ...otherPlots(pl).map(o => ['ship:' + o.id, `Arsa ${o.id} · ${R[o.region].n} deposuna taşı`]),
      ['list:0.95', 'Pazara koy: piyasanın %5 altı'], ['list:1', 'Pazara koy: piyasa fiyatı'], ['list:1.05', 'Pazara koy: piyasanın %5 üstü']];
    let note = '';
    if (cur.startsWith('ship:')) { const to = plot(+cur.slice(5)); note = to ? `10 adet birikince taşınır · birim taşıma ${fmt1(trans(1, p, pl.region, to.region))}` : 'Hedef arsa artık yok'; }
    else if (cur.startsWith('list:')) { const l = s.mine.find(x => x.auto && x.plot === pl.id && x.p === p); note = (l ? `Pazarda ${l.qty} adet, tanesi ${fmt1(l.price)} · ` : 'Üretim çıktıkça ilana eklenir · ') + speedNote(+cur.slice(5)); }
    return `<div class="grid2 small"><label for="ao${id}">Üretim çıkınca</label><select id="ao${id}" data-c="out" data-plot="${pl.id}" data-p="${p}">${opts.map(([v, l]) => `<option value="${v}" ${cur === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>${note ? `<p class="muted small">${note}</p>` : ''}`;
  }

  function shopControls(pl, p) {
    const r = pl.b.rule[p] || { mode: 'elle', margin: 0.1 }, pr = pl.b.prices[p] || retailRef(p), au = pl.b.auto[p] || 0, id = pl.id + p;
    const lo = rivalLo(pl.region, p), cheapest = pr <= lo + 0.05;
    const opt = (list, cur) => list.map(([v, l]) => `<option value="${v}" ${cur === v ? 'selected' : ''}>${l}</option>`).join('');
    return `<div class="rivals small"><span>Rakiplerde en ucuz <b class="num">${fmt1(lo)}</b></span><span>ortalama <b class="num">${fmt1(rivalAvg(pl.region, p))}</b></span><span class="${cheapest ? 'up' : 'warn'}">${cheapest ? 'En ucuz sensin' : 'Rakip daha ucuz'}</span></div>
      <div class="grid2 small">
        <label for="rm${id}">Fiyat kuralı</label><select id="rm${id}" data-c="rule" data-f="mode" data-plot="${pl.id}" data-p="${p}">${opt([['elle', 'Elle belirlerim'], ['ucuz', 'En ucuz rakibin %1 altı'], ['ort', 'Bölge ortalaması']], r.mode)}</select>
        <label for="rg${id}">En düşük fiyat</label><select id="rg${id}" data-c="rule" data-f="margin" data-plot="${pl.id}" data-p="${p}">${opt([[0, 'Maliyet kadar'], [0.1, 'Maliyetin %10 üstü'], [0.2, 'Maliyetin %20 üstü']], r.margin)}</select>
        <label for="pr${id}">Raf fiyatı</label><input id="pr${id}" class="price" inputmode="decimal" data-c="price" data-plot="${pl.id}" data-p="${p}" value="${pr.toFixed(1)}" ${r.mode !== 'elle' ? 'disabled' : ''}>
        <label for="au${id}">Stok azalınca</label><select id="au${id}" data-c="auto" data-plot="${pl.id}" data-p="${p}">${opt([[0, 'Elle alırım'], [1, 'Olağan fiyata kadar al'], [1.1, 'Olağanın %10 fazlasına kadar al'], [1.35, 'Toptancı dahil al (%35 fazlası)']], au)}</select>
      </div>
      <p class="small">${speedNote(pr / retailRef(p))} <span class="muted">(piyasa fiyatı ${fmt1(retailRef(p))})</span></p>
      <p class="muted small">Birim maliyetin ${fmt1(shopCost(pl, p))} · saatte ≈${shopRate(pl, p).toFixed(1)} satış${au ? ' · stok 20’nin altına inince 60’a tamamlanır' : ''}</p>`;
  }

  function viewPlots() {
    const out = [];
    const next = GOALS.findIndex((g, i) => !s.goals[i]);
    out.push(['goal', next < 0 ? '<div class="goal">Bütün hedefler tamamlandı. Şirketini büyütmeye devam et.</div>' : `<div class="goal"><span class="small">Sıradaki hedef ${next + 1}/${GOALS.length}</span><b>${GOALS[next][0]}</b></div>`]);
    if (window.TezgahArt) out.push(['map', window.TezgahArt.map(mapModel()) + '<p class="muted small maphint">Haritada bir binaya dokununca kartına gidersin. Ünlem işareti, binanın ilgilenilmesi gereken bir durumu olduğunu gösterir.</p>']);
    out.push(['lm', `<div class="row small"><label for="listMul">Pazara ilan fiyatı</label><select id="listMul" data-c="listMul"><option value="0.9" ${ui.listMul === 0.9 ? 'selected' : ''}>olağanın %10 altı (%20 daha hızlı satar)</option><option value="1" ${ui.listMul === 1 ? 'selected' : ''}>olağan fiyat</option><option value="1.1" ${ui.listMul === 1.1 ? 'selected' : ''}>olağanın %10 üstü (%20 daha yavaş satar)</option></select></div>`]);
    for (const pl of s.plots) out.push(['p' + pl.id, plotCard(pl)]);
    return out;
  }

  function viewMarket() {
    const out = [], dst = plot(ui.dest) || s.plots[0];
    out.push(['dest', `<div class="card"><div class="row wrap"><label for="dest">Teslim arsası</label><select id="dest" data-c="dest">${s.plots.filter(p => !p.part).map(p => `<option value="${p.id}" ${p.id === dst.id ? 'selected' : ''}>Arsa ${p.id} · ${R[p.region].n}${p.b ? ' · ' + B[p.b.type].n : ' · boş'}</option>`).join('')}</select><label for="qty">Adet</label><input id="qty" class="price" inputmode="numeric" data-c="qty" value="${ui.qty}"></div><p class="muted small">Fiyatlar teslim fiyatıdır: mal bedeli ve ${R[dst.region].n} bölgesine taşıma dahil.${transMult() > 1 ? ' Taşıma ücretleri şu an zamlı.' : ''}</p></div>`]);
    if (s.mine.length) out.push(['mine', '<div class="card"><h3>İlanlarım</h3>' + s.mine.map(l => `<div class="row"><span>${P[l.p].n} · ${l.qty} adet · ${fmt1(l.price)}${l.auto ? ' · otomatik' : ''}<br><span class="small">${speedNote(l.price / price(l.p))}</span></span>${btn('Geri çek', 'unlist', { id: l.id }, 'ghost')}</div>`).join('') + '<p class="muted small">Satışlardan %3 komisyon kesilir.</p></div>']);
    for (const k of PK) {
      const wU = price(k) * W_BUY + trans(1, k, dst.region, dst.region);
      let h = `<div class="card"><div class="row head"><h3 class="named">${ic(k, 28)}${P[k].n}</h3><span class="small">${trend(k)}</span></div><p class="muted small">Olağan fiyat ${fmt1(price(k))} · ${WNAME[P[k].w]} yük</p><div class="row"><span>Sistem toptancısı</span><span class="num">${fmt1(wU)}</span>${btn('Al', 'buy', { p: k })}</div>`;
      for (const l of s.listings.filter(x => x.p === k)) {
        const u = l.price + trans(1, k, l.region, dst.region);
        h += `<div class="row"><span>${R[l.region].n} ilanı · ${l.qty} adet</span><span class="num ${u < wU ? 'up' : ''}">${fmt1(u)}</span>${btn('Al', 'buy', { p: k, id: l.id })}</div>`;
      }
      out.push(['m' + k, h + '</div>']);
    }
    return out;
  }

  function viewAuction() {
    const out = [];
    out.push(['info', '<p class="muted small">Arsalar yalnızca isimsiz açık artırmayla satılır. Teklifin kadar para teminat olarak bloke edilir; geçilirsen iade edilir. Son saatte gelen teklif süreyi uzatır.</p>']);
    for (const a of s.auctions) {
      const next = Math.ceil(Math.max(a.start, a.bid * 1.05));
      const who = a.plot ? 'Senin ilanın' : a.bidder === 'me' ? 'En yüksek teklif sende' : a.bidder ? 'Başka bir teklif önde' : 'Henüz teklif yok';
      out.push(['a' + a.id, `<div class="card"><div class="row head"><h3>${R[a.region].n} arsası</h3><span class="tag ${a.bidder === 'me' ? 'own' : ''}">${who}</span></div><p class="muted small">${R[a.region].note} · referans değer ${fmt(a.ref)} · <span class="${a.end - s.t < 60 ? 'warn' : ''}">kalan süre ${hoursLeft(a)}</span></p><div class="row"><span>Güncel teklif</span><span class="num">${a.bid ? fmt(a.bid) : '—'}</span>${a.plot || a.bidder === 'me' ? '' : btn('Teklif ver ' + fmt(next), 'bid', { id: a.id })}</div></div>`]);
    }
    if (!s.auctions.length) out.push(['none', '<p class="muted">Şu an açık artırma yok. Yenisi gün başında açılır.</p>']);
    const owned = s.plots.filter(p => !p.rented);
    if (owned.length) out.push(['hd', '<h2>Arsalarını sat</h2>']);
    for (const pl of owned) {
      if (pl.part || (pl.b && (pl.b.parts || []).length)) { out.push(['s' + pl.id, `<div class="card"><div class="row head"><h3>Arsa ${pl.id} · ${R[pl.region].n}</h3><span class="muted small">günlük vergi ${fmt(dailyTax(pl))}</span></div><p class="muted small">Bu arsa birden çok arsaya yayılan bir binanın parçası. Satmak için önce binayı yık.</p></div>`]); continue; }
      const mv = +(ui.sel['ss' + pl.id] || 0), q = systemSaleQuote(pl, mv), others = otherPlots(pl);
      let h = `<div class="card"><div class="row head"><h3>Arsa ${pl.id} · ${R[pl.region].n}</h3><span class="muted small">günlük vergi ${fmt(dailyTax(pl))}</span></div><table class="t"><tr><td>Arsa (referans ${fmt(pl.ref)})</td><td>${fmt(q.land)}</td></tr><tr><td>Bina, harcananın yarısı</td><td>${fmt(q.bld)}</td></tr>`;
      if (invTotal(pl)) h += mv ? `<tr><td>Malların taşınması</td><td>${fmt(-q.tr)}</td></tr>` : `<tr><td>Depodaki mal, değerinin yarısı</td><td>${fmt(q.goods)}</td></tr>`;
      h += `<tr><th>Eline geçecek</th><th>${fmt(q.total)}</th></tr></table>`;
      if (invTotal(pl) && others.length) h += `<div class="row small"><label for="ss${pl.id}">Depodaki mallar</label><select id="ss${pl.id}" data-c="sel" data-k="ss${pl.id}"><option value="0">Sisteme bırak</option>${others.map(o => `<option value="${o.id}" ${mv === o.id ? 'selected' : ''}>Arsa ${o.id}’e taşı</option>`).join('')}</select></div>`;
      h += `<div class="row wrap">${btn('Sisteme sat ' + fmt(q.total), 'sysSell', { plot: pl.id })}${!pl.b && !invTotal(pl) ? btn('Artırmaya çıkar', 'auctionMine', { plot: pl.id }, 'ghost') : ''}</div>${pl.b ? '<p class="muted small">Sisteme satışta bina yıkılır. Artırmaya çıkarmak için önce binayı yık ve depoyu boşalt.</p>' : ''}</div>`;
      out.push(['s' + pl.id, h]);
    }
    return out;
  }

  function viewNews() {
    const out = [], evs = s.events.filter(e => s.t < e.end);
    if (evs.length) out.push(['ev', '<div class="card"><h3>Gündem</h3>' + evs.map(e => `<div class="row"><span>${EVENTS[e.key].title}</span><span class="tag ${s.t >= e.start ? 'own' : ''}">${s.t >= e.start ? 'sürüyor' : 'yarın başlıyor'}</span></div>`).join('') + '</div>']);
    s.news.forEach((n, i) => out.push(['n' + n.t + '_' + (s.news.length - i), `<article class="news"><span class="small muted">Gün ${Math.floor(n.t / 1440) + 1}</span><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p></article>`]));
    return out;
  }

  function viewReport() {
    const out = [];
    const tbl = (st, title) => { const i = Object.entries(st.inc), e = Object.entries(st.exp); const ti = i.reduce((a, x) => a + x[1], 0), te = e.reduce((a, x) => a + x[1], 0); return `<div class="card"><h3>${title}</h3><table class="t">${i.map(([k, v]) => `<tr><td>${k}</td><td class="up">${fmt(v)}</td></tr>`).join('')}${e.map(([k, v]) => `<tr><td>${k}</td><td class="down">${fmt(-v)}</td></tr>`).join('')}<tr><th>Net</th><th>${fmt(ti - te)}</th></tr></table></div>`; };
    out.push(['nw', `<div class="card"><div class="row"><span>Net değer</span><b class="num">${fmt(netWorth())}</b></div><div class="row"><span>Kasa</span><span class="num">${fmt(s.money)}</span></div><div class="row"><span>Arsa değeri</span><span class="num">${fmt(landValue())}</span></div>${s.t < FREE_UNTIL ? '<p class="muted small">İlk iki gün kira ve vergi alınmıyor.</p>' : ''}</div>`]);
    out.push(['td', tbl(s.today, 'Bugün')]); out.push(['pv', tbl(s.prev, 'Dün')]);
    out.push(['pr', '<div class="card"><h3>Fiyatlar</h3><div class="scroll"><table class="t prices">' + PK.map(k => `<tr><td>${P[k].n}</td><td>${fmt1(price(k))}</td><td>${trend(k)}</td><td>${spark(k)}</td></tr>`).join('') + '</table></div></div>']);
    out.push(['gl', '<div class="card"><h3>Hedefler</h3>' + GOALS.map((g, i) => `<div class="row"><span class="${s.goals[i] ? 'done' : ''}">${g[0]}</span><span>${s.goals[i] ? '✓' : ''}</span></div>`).join('') + '</div>']);
    out.push(['credit', '<p class="muted small">İkonlar: Microsoft Fluent Emoji, MIT lisansı.</p>']);
    out.push(['rs', `<div class="row">${btn(ui.confirmReset ? 'Emin misin? Tekrar dokun' : 'Oyunu sıfırla', 'reset', {}, 'ghost')}</div>`]);
    return out;
  }

  function viewCrew() {
    const out = [], total = s.workers.reduce((a, w) => a + w.wage, 0);
    out.push(['info', `<div class="card"><div class="row"><span>Günlük maaş toplamı</span><b class="num">${fmt(total)}</b></div><p class="muted small">İşçi zorunlu değil. Bina boşta kalırsa işçi maaşını kazandırmaz. İşçi 7 çalışma gününde bir yıldız atlar ve maaşı yükselir.</p></div>`]);
    if (s.workers.length) out.push(['mine', '<div class="card"><h3>Çalışanların</h3>' + s.workers.map(w => { const pl = plot(w.plot); return `<div class="row"><span>${WK[w.type].n} ${esc(w.name)} ${stars(w.star)}<br><span class="small muted">Arsa ${w.plot}${pl ? ' · ' + R[pl.region].n : ''} · ${WK[w.type].desc(WK[w.type].eff[w.star - 1])} · ${w.star < 3 ? 'sonraki yıldıza ' + (7 - (w.xp || 0)) + ' gün' : 'en üst yıldız'}</span></span><span class="num">${fmt(w.wage)}/gün</span>${btn('Bırak', 'fire', { id: w.id }, 'ghost')}</div>`; }).join('') + '</div>']);
    for (const r in R) {
      let h = `<div class="card"><h3>${R[r].n}’deki adaylar</h3><p class="muted small">Adaylar her gün yenilenir; yalnızca bu bölgedeki binalarında çalışırlar.</p>`;
      for (const c of s.cands[r]) {
        const el = eligible(c);
        h += `<div class="item"><div class="row"><span>${WK[c.type].n} ${esc(c.name)} ${stars(c.star)}<br><span class="small muted">${WK[c.type].desc(WK[c.type].eff[c.star - 1])}</span></span><span class="num">${fmt(c.wage)}/gün</span></div>`;
        h += el.length ? `<div class="row wrap small"><label for="hp${c.id}">Çalışacağı arsa</label><select id="hp${c.id}" data-c="sel" data-k="hp${c.id}">${el.map(pl => `<option value="${pl.id}" ${ui.sel['hp' + c.id] == pl.id ? 'selected' : ''}>Arsa ${pl.id} · ${B[pl.b.type].n}</option>`).join('')}</select>${btn('İşe al', 'hire', { id: c.id })}</div>` : `<p class="muted small">${R[r].n}’de bu işçiye uygun boş yuvan yok.</p>`;
        h += '</div>';
      }
      out.push(['c' + r, h + '</div>']);
    }
    return out;
  }

  const VIEWS = { crew: viewCrew, plots: viewPlots, market: viewMarket, auction: viewAuction, news: viewNews, report: viewReport };
  const TABS = [['plots', 'Arsalar'], ['market', 'Pazar'], ['crew', 'İşçiler'], ['auction', 'Artırma'], ['news', 'Gazete'], ['report', 'Rapor']];
  let root, main, hud;

  function paint(container, sections) {
    const old = new Map([...container.children].map(el => [el.dataset.k, el]));
    let prev = null;
    for (const [k, h] of sections) {
      let el = old.get(k);
      if (!el) { el = document.createElement('section'); el.dataset.k = k; }
      old.delete(k);
      const ae = document.activeElement;
      if (el._h !== h && !(ae && el.contains(ae) && /INPUT|SELECT/.test(ae.tagName))) { el.innerHTML = h; el._h = h; }
      const want = prev ? prev.nextSibling : container.firstChild;
      if (want !== el) container.insertBefore(el, want);
      prev = el;
    }
    old.forEach(el => el.remove());
  }

  function render() {
    const bids = s.auctions.filter(a => a.bidder === 'me').reduce((a, x) => a + x.bid, 0);
    paint(hud, [
      ['top', `<div class="row"><div><span class="brand">Tezgâh</span> <span class="small muted">demo</span></div><div class="small num">${clock()}</div></div>`],
      ['cash', `<div class="row"><div class="cash ${s.money < 0 ? 'down' : ''}">${fmt(s.money)}${bids ? `<span class="small muted"> · teminatta ${fmt(bids)}</span>` : ''}</div><div class="speed" role="group" aria-label="Oyun hızı">${[[0, 'Dur'], [1, '1×'], [2, '2×'], [4, '4×']].map(([v, l]) => `<button type="button" data-a="speed" data-v="${v}" class="${s.speed === v ? 'on' : ''}">${l}</button>`).join('')}</div></div>`],
      ['tabs', `<nav class="tabs">${TABS.map(([k, l]) => `<button type="button" data-a="tab" data-v="${k}" class="${ui.tab === k ? 'on' : ''}">${l}${k === 'news' && s.unread ? `<span class="badge" aria-label="${s.unread} yeni">${s.unread}</span>` : ''}</button>`).join('')}</nav>`],
    ]);
    paint(main, VIEWS[ui.tab]());
    main.querySelectorAll('[data-prog]').forEach(el => { const [id, i] = el.dataset.prog.split(':'); const pl = plot(+id), ln = pl && pl.b && pl.b.lines[+i]; el.style.width = ln && ln.busy ? Math.min(100, ln.prog / P[ln.r].t * 100) + '%' : '0%'; });
  }

  function focusCard() {
    if (!ui.focusPlot) return;
    const el = main.querySelector(`section[data-k="p${ui.focusPlot}"]`); ui.focusPlot = null;
    if (el) { el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1200); }
  }
  function start() {
    root = document.getElementById('app');
    root.innerHTML = '<header id="hud"></header><main id="main"></main><div id="toast" role="status" hidden></div>';
    hud = document.getElementById('hud'); main = document.getElementById('main');
    if (!load()) newGame();
    if (!plot(ui.dest)) ui.dest = s.plots[0].id;
    root.addEventListener('click', e => { const el = e.target.closest('[data-a]'); if (!el || !A[el.dataset.a]) return; A[el.dataset.a](el.dataset); render(); focusCard(); });
    root.addEventListener('keydown', e => { const el = e.target.closest('g[data-a]'); if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); A[el.dataset.a](el.dataset); render(); focusCard(); } });
    root.addEventListener('change', e => { const el = e.target.closest('[data-c]'); if (!el || !C[el.dataset.c]) return; C[el.dataset.c](el); el.blur(); render(); });
    setInterval(() => { if (s.speed > 0) step(3.75 * s.speed); render(); }, 250);
    setInterval(save, 8000);
    render();
  }

  window.__tezgah = { get state() { return s; }, advance(min) { for (let i = 0; i < min; i += 5) step(5); render(); }, reset() { newGame(); render(); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
