(() => {
  'use strict';

  // ---------- Sabit veriler ----------
  const P = {
    bugday: { n: 'Buğday', ref: 4, w: 1, b: 'tarla', t: 30, op: 20, in: {} },
    sut: { n: 'Süt', ref: 6, w: 1, b: 'tarla', t: 30, op: 30, in: {}, d: 6 },
    pamuk: { n: 'Pamuk', ref: 8, w: 1, b: 'tarla', t: 45, op: 40, in: {} },
    komur: { n: 'Kömür', ref: 6, w: 2, b: 'maden', t: 45, op: 30, in: {}, d: 4 },
    demir: { n: 'Demir cevheri', ref: 10, w: 2, b: 'maden', t: 60, op: 50, in: {} },
    un: { n: 'Un', ref: 14, w: 1, b: 'fabrika', t: 60, op: 30, in: { bugday: 20 }, d: 3 },
    kumas: { n: 'Kumaş', ref: 27, w: 1, b: 'fabrika', t: 120, op: 50, in: { pamuk: 20 } },
    celik: { n: 'Çelik', ref: 40, w: 2, b: 'fabrika', t: 120, op: 60, in: { demir: 20, komur: 10 } },
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
  const RETAIL = 1.6, W_BUY = 1.3, W_SELL = 0.75, RENT = 0.05, COMM = 0.03, FREE_UNTIL = 2 * 1440;
  const GOALS = [
    ['Arsana bir bina kur', s => s.plots.some(p => p.b)],
    ['İlk satışını yap', s => s.totalIncome > 0],
    ['Kasanda ₺10.000 biriktir', s => s.money >= 10000],
    ['Bir arsa artırması kazan', s => s.plots.some(p => !p.rented)],
    ['Üç arsaya ulaş', s => s.plots.length >= 3],
    ['Net değerini ₺50.000 yap', s => netWorth() >= 50000],
  ];
  const SAVE_KEY = 'tezgah-demo-v1';
  const BUYERS = ['Nazlı Hanım', 'Cemil Usta', 'Bakkal Rıza', 'Sirma Abla', 'Genç Tuna', 'Hacı Dayı', 'Mimar Efsun'];
  const BT = {
    aceleci: { hint: 'Saatine bakıp duruyor. Acelesi var.', max: [1.10, 1.20], pat: 3, open: 0.98 },
    pazarlikci: { hint: 'Gözleri parlıyor. Pazarlığı seviyor.', max: [1.08, 1.18], pat: 5, open: 0.92 },
    cimri: { hint: 'Cüzdanını sıkı sıkı tutuyor.', max: [1.02, 1.10], pat: 4, open: 0.95 },
    zengin: { hint: 'Kapıda şoförü bekliyor.', max: [1.18, 1.32], pat: 3, open: 1.0 },
    kararsiz: { hint: 'Bir rafa bir sana bakıyor.', max: [1.03, 1.24], pat: 4, open: 0.96 },
  };
  const SAY = {
    open: ['Selam! {q} {p} lazım. Tanesine {o} veririm.', 'Hepsini alırım ama tanesi {o} olur.', 'Kolay gelsin. {q} {p}, tanesi {o}. Ne dersin?'],
    far: ['Hmm, peki. {o} diyelim.', 'Tamam tamam, {o}.', 'İyi pazarlık ediyorsun. {o} olsun.'],
    mid: ['Zorluyorsun ama... {o}.', 'Bu son olsun, {o}.', 'Evdekiler duymasın, {o}.'],
    near: ['{o}. Kuruş daha çıkmaz.', 'Cebimde bu kadar var: {o}.', 'Terlettin beni. {o}, son sözüm.'],
    ceil: ['Daha fazlası kesemden çıkmaz.', 'Olmaz, sınırım bu.', 'Boşuna uğraşma, daha veremem.'],
    angry: ['Yok artık! Soyguna mı geldik?', 'Bu fiyata dükkânı da verirsin herhalde!', 'Sen beni turist mi sandın?'],
    bluffWin: ['Dur dur, başkasına verme! {o} veriyorum.', 'Aman, elimden kaçmasın. {o}!'],
    bluffLose: ['Öyleyse ona sat. Sabrım taşıyor.', 'Başka alıcı mı? Güldürme beni.'],
    leave: ['Hayırlı işler. Ben karşı dükkâna gidiyorum.', 'Bu kadar naz yeter. Hoşça kal.'],
    deal: ['Anlaştık! Hayırlı olsun.', 'El sıkışalım. Bereketini gör.', 'Sonunda! Paketle bakalım.'],
  };

  // ---------- Durum ----------
  let s, ui = { tab: 'plots', dest: 1, qty: 20, listMul: 1, sel: {} };
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const fmt = n => (n < 0 ? '−' : '') + '₺' + Math.abs(Math.round(n)).toLocaleString('tr-TR');
  const fmt1 = n => '₺' + (Math.round(n * 10) / 10).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function emptyStats() { return { inc: {}, exp: {} }; }
  function newGame() {
    s = {
      v: 1, money: 5000, t: 8 * 60, lastHour: 8, speed: 1, nextId: 100, nextPlot: 2, totalIncome: 0,
      plots: [{ id: 1, region: 'kirsal', rented: true, ref: R.kirsal.land, b: null, inv: {}, last: -1e9, paid: 0 }],
      mult: {}, hist: {}, npcA: {}, listings: [], mine: [], auctions: [], events: [], news: [],
      today: emptyStats(), prev: emptyStats(), goals: [], freeSwap: true, lastEvent: '', nextListAt: 0,
      hag: { left: 5, offer: null, streak: 0 },
    };
    for (const k of PK) { s.mult[k] = 1; s.hist[k] = [1]; }
    for (const r in R) { s.npcA[r] = {}; for (const k of PK) s.npcA[r][k] = rnd(1.4, 2.0); }
    genListings();
    spawnAuction();
    news('Tezgâh açıldı', 'Kırsal’da kiralık bir arsan ve ₺5.000 sermayen var. İlk iki gün kira ve vergi alınmaz.');
    ui.dest = 1;
  }
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(s)); } catch (e) { /* depolama yoksa oyun yine çalışır */ } }
  function load() {
    try { const d = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); if (d && d.v === 1 && Array.isArray(d.plots)) { s = d; if (!s.hag) s.hag = { left: 5, offer: null, streak: 0 }; if (!s.nextPlot) s.nextPlot = Math.max(...s.plots.map(p => p.id)) + 1; return true; } } catch (e) { /* yoksay */ }
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
  const cap = pl => (pl.b ? B[pl.b.type].cap * pl.b.level : 0);
  const plot = id => s.plots.find(p => p.id === id);
  function add(pl, p, q) { pl.inv[p] = (pl.inv[p] || 0) + q; if (pl.inv[p] <= 0) delete pl.inv[p]; }
  function inc(kind, amt) { s.money += amt; s.totalIncome += amt; s.today.inc[kind] = (s.today.inc[kind] || 0) + amt; }
  function exp(kind, amt) { s.money -= amt; s.today.exp[kind] = (s.today.exp[kind] || 0) + amt; }
  function rentOn(pl, amt) { if (pl.rented && s.t >= FREE_UNTIL) exp('Kira', amt * RENT); }
  function news(title, body) { s.news.unshift({ t: s.t, title, body }); if (s.news.length > 40) s.news.pop(); }
  function shopRate(pl, p) {
    const pr = pl.b.prices[p] || retailRef(p);
    const A = Math.pow(retailRef(p) / pr, 2) * (1 + 0.1 * (pl.b.level - 1));
    const D = (P[p].d || 0) * R[pl.region].dm * demandMult(pl.region, p);
    return D * A / (A + s.npcA[pl.region][p] + 1);
  }
  function landValue() { return s.plots.filter(p => !p.rented).reduce((a, p) => a + p.ref, 0); }
  function netWorth() {
    let v = s.money + landValue();
    for (const pl of s.plots) { if (pl.b) v += pl.b.spent * 0.5; for (const p in pl.inv) v += pl.inv[p] * price(p) * W_SELL; }
    for (const l of s.mine) v += l.qty * price(l.p) * W_SELL;
    for (const a of s.auctions) { if (a.bidder === 'me') v += a.bid; if (a.plot) v += a.plot.ref; }
    return v;
  }
  function taxRate(pl) { return !pl.b ? 0.08 : (s.t - pl.last < 1440 ? 0.01 : 0.04); }
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
      for (const ln of pl.b.lines) {
        if (!ln.r) { ln.st = 'Tarif seç'; continue; }
        const rc = P[ln.r];
        if (ln.busy) {
          ln.prog += dt;
          if (ln.prog >= rc.t) { add(pl, ln.r, Math.round(10 * yieldMult(pl.region, pl.b.type))); ln.busy = false; ln.prog = 0; pl.last = s.t; }
          continue;
        }
        const need = Object.entries(rc.in).find(([k, q]) => (pl.inv[k] || 0) < q);
        if (need) { ln.st = 'Girdi yok: ' + need[1] + ' ' + P[need[0]].n; continue; }
        if (invTotal(pl) + 13 > cap(pl) + Object.values(rc.in).reduce((a, b) => a + b, 0)) { ln.st = 'Depo dolu'; continue; }
        if (s.money < rc.op) { ln.st = 'Para yetersiz'; continue; }
        for (const k in rc.in) add(pl, k, -rc.in[k]);
        exp('Üretim', rc.op); ln.busy = true; ln.prog = 0; ln.st = '';
      }
    }
    // Pazardaki ilanlarım
    for (const l of s.mine) {
      const r = l.price / price(l.p), f = Math.pow(clamp((1.3 - r) / 0.4, 0, 1), 1.5);
      l.acc += 15 * f * dt / 60;
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
    for (const r in R) for (const k of PK) s.npcA[r][k] = clamp(s.npcA[r][k] + rnd(-0.08, 0.08), 1.2, 2.4);
    for (const a of s.auctions) {
      const next = Math.ceil(Math.max(a.start, a.bid * 1.05));
      if (a.bidder !== 'npc' && a.npc.some(m => m >= next) && Math.random() < 0.55) {
        if (a.bidder === 'me') { s.money += a.bid; news('Teklifin geçildi', R[a.region].n + ' arsası için yeni teklif: ' + fmt(next) + '. Teminatın iade edildi.'); }
        a.bid = next; a.bidder = 'npc';
        if (a.end - s.t < 60) a.end = s.t + 60;
      }
    }
    if (s.t >= s.nextListAt) genListings();
    if (s.hag.offer && (s.t > s.hag.offer.until || (plot(s.hag.offer.plot)?.inv[s.hag.offer.p] || 0) < s.hag.offer.qty)) s.hag.offer = null;
    if (!s.hag.offer && s.hag.left > 0 && !ui.neg && Math.random() < 0.6) newBuyer();
    if (h % 24 === 0) daily(h / 24);
  }

  function daily(day) {
    if (s.t >= FREE_UNTIL) for (const pl of s.plots) { const tx = dailyTax(pl); if (tx > 0) exp('Vergi', tx); }
    s.prev = s.today; s.today = emptyStats(); s.hag.left = 5;
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
    news(EVENTS[key].title, EVENTS[key].body + ' Yarın başlıyor, iki gün sürecek.');
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
    s.auctions.push({ id: s.nextId++, region, ref, start: Math.round(ref * 0.5), bid: 0, bidder: null, end: s.t + 720, npc: [0, 0, 0].map(() => ref * rnd(0.6, 1.1)) });
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
      news('Artırmayı kazandın', name + ' ' + fmt(a.bid) + ' karşılığında senin oldu.');
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

  // ---------- Pazarlık mini oyunu ----------
  function newBuyer() {
    const c = [];
    for (const pl of s.plots) for (const p in pl.inv) if (P[p].d && pl.inv[p] >= 10) c.push([pl, p]);
    if (!c.length) return;
    const [pl, p] = pick(c), type = pick(Object.keys(BT));
    s.hag.offer = { name: pick(BUYERS), type, p, plot: pl.id, qty: Math.min(pl.inv[p], Math.round(rnd(1, 4)) * 10), until: s.t + 360 };
  }
  const say = (k, n) => pick(SAY[k]).replace('{o}', fmt1(n.offer)).replace('{q}', n.qty).replace('{p}', P[n.p].n.toLocaleLowerCase('tr-TR'));
  function negReply(n) { const g = n.max / n.offer; n.line = say(g > 1.12 ? 'far' : g > 1.04 ? 'mid' : 'near', n); }
  function negEnd(n, result) {
    n.done = result; s.hag.left--; s.hag.offer = null;
    if (result === 'left') { s.hag.streak = 0; n.line = say('leave', n); return; }
    const pl = plot(n.plot), v = n.qty * n.offer;
    add(pl, n.p, -n.qty); inc('Pazarlık', v); rentOn(pl, v); pl.last = s.t;
    n.gain = (n.offer - n.base) * n.qty;
    if (result === 'deal') { s.hag.streak++; n.line = say('deal', n); n.rate = n.offer / n.max >= 0.97 ? 'Usta işi' : n.offer / n.max >= 0.9 ? 'İyi anlaşma' : 'İdare eder'; }
  }

  // ---------- Oyuncu eylemleri ----------
  const A = {
    negStart() {
      const o = s.hag.offer; if (!o) return; const bt = BT[o.type], base = retailRef(o.p);
      ui.neg = { ...o, base, max: base * rnd(bt.max[0], bt.max[1]), offer: base * bt.open, pat: bt.pat, maxPat: bt.pat, bluffed: false, done: null, mood: '' };
      ui.neg.line = say('open', ui.neg);
    },
    negMove(d) {
      const n = ui.neg; if (!n || n.done) return; n.mood = ''; n.moved = true;
      if (d.v === 'bluff') {
        n.bluffed = true;
        if (Math.random() < 0.5) { n.offer = Math.min(n.max, n.offer * 1.15); n.line = say('bluffWin', n); n.mood = 'pop'; }
        else { n.pat -= 2; n.line = say('bluffLose', n); n.mood = 'shake'; }
      } else {
        const target = n.offer * (d.v === 'hard' ? 1.10 : 1.04);
        if (target <= n.max) { n.offer = target; if (d.v === 'hard' || Math.random() > 0.35) n.pat--; negReply(n); n.mood = 'pop'; }
        else if (d.v === 'hard') { n.pat -= 2; n.line = say('angry', n); n.mood = 'shake'; }
        else { n.pat--; n.line = say('ceil', n); }
      }
      if (n.pat <= 0) negEnd(n, 'left');
    },
    negAccept() { const n = ui.neg; if (n && !n.done) negEnd(n, 'deal'); },
    negAuto() { const n = ui.neg; if (n && !n.done) { n.offer = n.base; negEnd(n, 'auto'); n.line = 'Olağan fiyattan anlaştınız.'; } },
    negClose() { ui.neg = null; },
    tab(d) { ui.tab = d.v; },
    speed(d) { s.speed = +d.v; },
    reset() { if (ui.confirmReset) { newGame(); ui.confirmReset = false; ui.tab = 'plots'; } else { ui.confirmReset = true; setTimeout(() => { ui.confirmReset = false; }, 4000); } },
    build(d) {
      const pl = plot(+d.plot), bt = B[d.v];
      if (s.money < bt.cost) return toast('Para yetersiz');
      exp('İnşaat', bt.cost);
      pl.b = { type: d.v, level: 1, spent: bt.cost, lines: d.v === 'dukkan' ? [] : [{ r: null, prog: 0, busy: false, st: 'Tarif seç' }], prices: {}, acc: {} };
    },
    upgrade(d) {
      const pl = plot(+d.plot), c = B[pl.b.type].cost * pl.b.level;
      if (pl.b.level >= 3) return; if (s.money < c) return toast('Para yetersiz');
      exp('İnşaat', c); pl.b.level++; pl.b.spent += c;
      if (pl.b.type !== 'dukkan') pl.b.lines.push({ r: null, prog: 0, busy: false, st: 'Tarif seç' });
    },
    demolish(d) {
      const pl = plot(+d.plot);
      if (invTotal(pl) > 0) return toast('Önce depoyu boşalt');
      s.money += pl.b.spent * (s.freeSwap ? 1 : 0.5); s.freeSwap = false; pl.b = null;
    },
    sellw(d) { const pl = plot(+d.plot), q = pl.inv[d.p]; inc('Toptancı', q * price(d.p) * W_SELL); rentOn(pl, q * price(d.p) * W_SELL); s.mult[d.p] = clamp(s.mult[d.p] - 0.00002 * P[d.p].ref * q, 0.6, 1.5); add(pl, d.p, -q); pl.last = s.t; },
    list(d) { const pl = plot(+d.plot), q = pl.inv[d.p]; s.mine.push({ id: s.nextId++, p: d.p, qty: q, price: Math.round(price(d.p) * ui.listMul * 10) / 10, acc: 0 }); add(pl, d.p, -q); pl.last = s.t; },
    unlist(d) { const l = s.mine.find(x => x.id === +d.id), pl = plot(ui.dest) || s.plots.find(p => p.b); if (!pl || !pl.b) return toast('Malı koyacak depon yok'); if (invTotal(pl) + l.qty > cap(pl)) return toast('Hedef depoda yer yok'); add(pl, l.p, l.qty); s.mine = s.mine.filter(x => x !== l); },
    move(d) {
      const pl = plot(+d.plot), to = plot(+(ui.sel['mv' + pl.id] || otherPlots(pl)[0]?.id)), q = pl.inv[d.p];
      if (!to || !to.b) return toast('Hedef arsada bina yok');
      if (invTotal(to) + q > cap(to)) return toast('Hedef depoda yer yok');
      const c = trans(q, d.p, pl.region, to.region); if (s.money < c) return toast('Para yetersiz');
      exp('Taşıma', c); add(pl, d.p, -q); add(to, d.p, q);
    },
    buy(d) {
      const to = plot(ui.dest); if (!to || !to.b) return toast('Önce binası olan bir hedef arsa seç');
      const l = d.id ? s.listings.find(x => x.id === +d.id) : null, p = d.p;
      const q = Math.min(Math.max(1, Math.floor(ui.qty) || 1), l ? l.qty : 9999, cap(to) - invTotal(to));
      if (q <= 0) return toast('Hedef depoda yer yok');
      const unit = l ? l.price : price(p) * W_BUY, tr = trans(q, p, l ? l.region : to.region, to.region);
      if (s.money < unit * q + tr) return toast('Para yetersiz');
      exp('Mal alımı', unit * q); exp('Taşıma', tr); add(to, p, q);
      if (l) { l.qty -= q; if (l.qty <= 0) s.listings = s.listings.filter(x => x !== l); }
      s.mult[p] = clamp(s.mult[p] + 0.00002 * P[p].ref * q, 0.6, 1.5);
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
      s.plots = s.plots.filter(x => x !== pl); spawnAuction(pl);
      news('Arsanı sisteme sattın', R[pl.region].n + ' arsası için ' + fmt(q.total) + ' aldın. Arsa artırmaya çıkarıldı.');
      if (ui.dest === pl.id) ui.dest = s.plots[0].id;
    },
    auctionMine(d) {
      const pl = plot(+d.plot); if (pl.b || invTotal(pl) > 0) return toast('Önce binayı yık ve depoyu boşalt');
      s.plots = s.plots.filter(x => x !== pl);
      s.auctions.push({ id: s.nextId++, region: pl.region, ref: pl.ref, start: Math.round(pl.ref * 0.7), bid: 0, bidder: null, end: s.t + 720, npc: [0, 0, 0].map(() => pl.ref * rnd(0.6, 1.25)), plot: pl });
      if (ui.dest === pl.id) ui.dest = s.plots[0].id;
    },
  };
  const C = {
    recipe(el) { const ln = plot(+el.dataset.plot).b.lines[+el.dataset.i]; ln.r = el.value || null; ln.busy = false; ln.prog = 0; },
    price(el) { const v = parseFloat(el.value.replace(',', '.')); if (v > 0) plot(+el.dataset.plot).b.prices[el.dataset.p] = v; },
    qty(el) { ui.qty = clamp(parseInt(el.value, 10) || 1, 1, 500); },
    dest(el) { ui.dest = +el.value; },
    listMul(el) { ui.listMul = +el.value; },
    sel(el) { ui.sel[el.dataset.k] = el.value; },
  };
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
    if (!pl.b) {
      h += '<p>Bu arsaya ne kuracaksın?</p><div class="choices">';
      for (const k in B) h += `<button type="button" class="choice" data-a="build" data-plot="${pl.id}" data-v="${k}"><b>${B[k].n}</b><span>${fmt(B[k].cost)}</span><small>${B[k].hint}${reg.bonus === k ? ' · bölge bonusu' : ''}</small></button>`;
      return h + '</div></div>';
    }
    const b = pl.b, bt = B[b.type];
    h += `<div class="row"><b>${bt.n} · seviye ${b.level}</b><span class="muted small">Depo ${invTotal(pl)}/${cap(pl)}</span></div><div class="row wrap">`;
    if (b.level < 3) h += btn(`Yükselt ${fmt(bt.cost * b.level)}`, 'upgrade', { plot: pl.id });
    h += btn(`Yık (iade ${fmt(b.spent * (s.freeSwap ? 1 : 0.5))})`, 'demolish', { plot: pl.id }, 'ghost') + '</div>';
    b.lines.forEach((ln, i) => {
      const opts = PK.filter(k => P[k].b === b.type).map(k => `<option value="${k}" ${ln.r === k ? 'selected' : ''}>${P[k].n}${Object.keys(P[k].in).length ? ' ← ' + Object.entries(P[k].in).map(([x, q]) => q + ' ' + P[x].n).join(', ') : ''}</option>`).join('');
      h += `<div class="line"><label class="small muted" for="rc${pl.id}_${i}">Hat ${i + 1}</label><select id="rc${pl.id}_${i}" data-c="recipe" data-plot="${pl.id}" data-i="${i}"><option value="">Tarif seç</option>${opts}</select><div class="bar"><i data-prog="${pl.id}:${i}"></i></div><span class="small ${ln.busy ? 'muted' : 'warn'}">${ln.busy ? 'Üretiyor · parti gideri ' + fmt(P[ln.r].op) : esc(ln.st || '')}</span></div>`;
    });
    const items = Object.keys(pl.inv);
    if (!items.length) h += `<p class="muted small">${b.type === 'dukkan' ? 'Raflar boş. Pazar sekmesinden mal al ya da kendi üretimini buraya taşı.' : 'Depo boş.'}</p>`;
    const others = otherPlots(pl);
    if (items.length && others.length) h += `<div class="row small"><label for="mv${pl.id}">Taşıma hedefi</label><select id="mv${pl.id}" data-c="sel" data-k="mv${pl.id}">${others.map(o => `<option value="${o.id}" ${ui.sel['mv' + pl.id] == o.id ? 'selected' : ''}>Arsa ${o.id} · ${R[o.region].n}</option>`).join('')}</select></div>`;
    for (const p of items) {
      h += `<div class="item"><div class="row"><b>${P[p].n}</b><span class="num">${pl.inv[p]} adet</span></div>`;
      if (b.type === 'dukkan' && P[p].d) {
        const pr = b.prices[p] || retailRef(p);
        h += `<div class="row small"><label for="pr${pl.id}${p}">Raf fiyatı</label><input id="pr${pl.id}${p}" class="price" inputmode="decimal" data-c="price" data-plot="${pl.id}" data-p="${p}" value="${pr.toFixed(1)}"><span class="muted">olağan ${fmt1(retailRef(p))} · saatte ≈${shopRate(pl, p).toFixed(1)} satış</span></div>`;
      } else if (b.type === 'dukkan') h += '<p class="warn small">Şehir halkı bu ürünü almaz; pazarda sat ya da fabrikaya taşı.</p>';
      h += `<div class="row wrap">${btn('Toptancıya sat ' + fmt(pl.inv[p] * price(p) * W_SELL), 'sellw', { plot: pl.id, p })}${btn('Pazara ilan ver', 'list', { plot: pl.id, p })}${others.length ? btn('Taşı', 'move', { plot: pl.id, p }, 'ghost') : ''}</div></div>`;
    }
    return h + '</div>';
  }

  function negCard(n) {
    const face = n.done === 'left' ? '😤' : n.done ? '🤝' : n.pat / n.maxPat > 0.67 ? '😀' : n.pat / n.maxPat > 0.34 ? '😐' : '😠';
    const diff = (n.offer / n.base - 1) * 100;
    let h = `<div class="card neg"><div class="row head"><h3>${esc(n.name)}</h3><span class="tag">${n.qty} ${P[n.p].n}</span></div><p class="muted small">${BT[n.type].hint}</p>
      <div class="talk ${n.mood}"><span class="face" aria-hidden="true">${face}</span><p class="bubble">${esc(n.line)}</p></div>
      <div class="row"><div><span class="small muted">Teklifi, tanesi</span><div class="offer ${n.mood === 'pop' ? 'bump' : ''}">${fmt1(n.offer)}</div></div><div class="small" style="text-align:right"><span class="muted">olağan ${fmt1(n.base)}</span><br><span class="${diff >= 0 ? 'up' : 'down'}">${diff >= 0 ? '+' : '−'}%${Math.abs(diff).toFixed(0)}</span></div></div>
      <div class="row small"><span class="muted">Sabır</span><span class="pips" aria-label="Kalan sabır ${Math.max(0, n.pat)}">${Array.from({ length: n.maxPat }, (_, i) => `<i class="${i < n.pat ? 'on' : ''}"></i>`).join('')}</span></div>`;
    if (!n.done) h += `<div class="moves">${btn('Biraz artır<small>az risk</small>', 'negMove', { v: 'soft' }, 'ghost')}${btn('Sıkı pazarlık<small>çok kazanç, çok risk</small>', 'negMove', { v: 'hard' }, 'ghost')}${n.bluffed ? '' : btn('Blöf yap<small>başka alıcım var</small>', 'negMove', { v: 'bluff' }, 'ghost')}</div><div class="row wrap">${btn('Anlaştık ' + fmt(n.offer * n.qty), 'negAccept')}${n.moved ? '' : btn('Pazarlıksız sat ' + fmt(n.base * n.qty), 'negAuto', {}, 'ghost')}</div>`;
    else h += `<div class="result">${n.done === 'left' ? '<b>Alıcı gitti.</b><span class="small">Malın sende kaldı.</span>' : `<b>${n.done === 'deal' ? n.rate : 'Satıldı'} · ${fmt(n.offer * n.qty)}</b><span class="small">Olağan fiyata göre ${n.gain >= 0 ? '+' : '−'}${fmt(Math.abs(n.gain)).replace('−', '')}${n.done === 'deal' && s.hag.streak > 1 ? ' · ' + s.hag.streak + ' anlaşmalık seri' : ''}</span>`}</div>${btn('Tamam', 'negClose')}`;
    return h + '</div>';
  }

  function viewPlots() {
    if (ui.neg) return [['neg', negCard(ui.neg)]];
    const out = [];
    if (s.hag.offer) { const o = s.hag.offer; out.push(['buyer', `<div class="card buyer"><div class="row"><div><b>Kapıda bir alıcı var</b><p class="small muted">${esc(o.name)}, ${o.qty} ${P[o.p].n.toLocaleLowerCase('tr-TR')} istiyor · bugün ${s.hag.left} pazarlık hakkın kaldı</p></div>${btn('Pazarlık et', 'negStart')}</div></div>`]); }
    const next = GOALS.findIndex((g, i) => !s.goals[i]);
    out.push(['goal', next < 0 ? '<div class="goal">Bütün hedefler tamamlandı. Şirketini büyütmeye devam et.</div>' : `<div class="goal"><span class="small">Sıradaki hedef ${next + 1}/${GOALS.length}</span><b>${GOALS[next][0]}</b></div>`]);
    out.push(['lm', `<div class="row small"><label for="listMul">Pazara ilan fiyatı</label><select id="listMul" data-c="listMul"><option value="0.9" ${ui.listMul === 0.9 ? 'selected' : ''}>olağanın %10 altı (hızlı satar)</option><option value="1" ${ui.listMul === 1 ? 'selected' : ''}>olağan fiyat</option><option value="1.1" ${ui.listMul === 1.1 ? 'selected' : ''}>olağanın %10 üstü (yavaş satar)</option></select></div>`]);
    for (const pl of s.plots) out.push(['p' + pl.id, plotCard(pl)]);
    return out;
  }

  function viewMarket() {
    const out = [], dst = plot(ui.dest) || s.plots[0];
    out.push(['dest', `<div class="card"><div class="row wrap"><label for="dest">Teslim arsası</label><select id="dest" data-c="dest">${s.plots.map(p => `<option value="${p.id}" ${p.id === dst.id ? 'selected' : ''}>Arsa ${p.id} · ${R[p.region].n}${p.b ? ' · ' + B[p.b.type].n : ' · boş'}</option>`).join('')}</select><label for="qty">Adet</label><input id="qty" class="price" inputmode="numeric" data-c="qty" value="${ui.qty}"></div><p class="muted small">Fiyatlar teslim fiyatıdır: mal bedeli ve ${R[dst.region].n} bölgesine taşıma dahil.${transMult() > 1 ? ' Taşıma ücretleri şu an zamlı.' : ''}</p></div>`]);
    if (s.mine.length) out.push(['mine', '<div class="card"><h3>İlanlarım</h3>' + s.mine.map(l => `<div class="row"><span>${P[l.p].n} · ${l.qty} adet · ${fmt1(l.price)}</span>${btn('Geri çek', 'unlist', { id: l.id }, 'ghost')}</div>`).join('') + '<p class="muted small">Satışlardan %3 komisyon kesilir.</p></div>']);
    for (const k of PK) {
      const wU = price(k) * W_BUY + trans(1, k, dst.region, dst.region);
      let h = `<div class="card"><div class="row head"><h3>${P[k].n}</h3><span class="small">${trend(k)}</span></div><p class="muted small">Olağan fiyat ${fmt1(price(k))} · ${WNAME[P[k].w]} yük</p><div class="row"><span>Sistem toptancısı</span><span class="num">${fmt1(wU)}</span>${btn('Al', 'buy', { p: k })}</div>`;
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
      out.push(['a' + a.id, `<div class="card"><div class="row head"><h3>${R[a.region].n} arsası</h3><span class="tag ${a.bidder === 'me' ? 'own' : ''}">${who}</span></div><p class="muted small">${R[a.region].note} · referans değer ${fmt(a.ref)} · kalan süre ${hoursLeft(a)}</p><div class="row"><span>Güncel teklif</span><span class="num">${a.bid ? fmt(a.bid) : '—'}</span>${a.plot || a.bidder === 'me' ? '' : btn('Teklif ver ' + fmt(next), 'bid', { id: a.id })}</div></div>`]);
    }
    if (!s.auctions.length) out.push(['none', '<p class="muted">Şu an açık artırma yok. Yenisi gün başında açılır.</p>']);
    const owned = s.plots.filter(p => !p.rented);
    if (owned.length) out.push(['hd', '<h2>Arsalarını sat</h2>']);
    for (const pl of owned) {
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
    out.push(['rs', `<div class="row">${btn(ui.confirmReset ? 'Emin misin? Tekrar dokun' : 'Oyunu sıfırla', 'reset', {}, 'ghost')}</div>`]);
    return out;
  }

  const VIEWS = { plots: viewPlots, market: viewMarket, auction: viewAuction, news: viewNews, report: viewReport };
  const TABS = [['plots', 'Arsalar'], ['market', 'Pazar'], ['auction', 'Artırma'], ['news', 'Gazete'], ['report', 'Rapor']];
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
      ['tabs', `<nav class="tabs">${TABS.map(([k, l]) => `<button type="button" data-a="tab" data-v="${k}" class="${ui.tab === k ? 'on' : ''}">${l}</button>`).join('')}</nav>`],
    ]);
    paint(main, VIEWS[ui.tab]());
    main.querySelectorAll('[data-prog]').forEach(el => { const [id, i] = el.dataset.prog.split(':'); const pl = plot(+id), ln = pl && pl.b && pl.b.lines[+i]; el.style.width = ln && ln.busy ? Math.min(100, ln.prog / P[ln.r].t * 100) + '%' : '0%'; });
  }

  function start() {
    root = document.getElementById('app');
    root.innerHTML = '<header id="hud"></header><main id="main"></main><div id="toast" role="status" hidden></div>';
    hud = document.getElementById('hud'); main = document.getElementById('main');
    if (!load()) newGame();
    if (!plot(ui.dest)) ui.dest = s.plots[0].id;
    root.addEventListener('click', e => { const el = e.target.closest('[data-a]'); if (!el || !A[el.dataset.a]) return; A[el.dataset.a](el.dataset); render(); });
    root.addEventListener('change', e => { const el = e.target.closest('[data-c]'); if (!el || !C[el.dataset.c]) return; C[el.dataset.c](el); el.blur(); render(); });
    setInterval(() => { if (s.speed > 0 && !ui.neg) step(3.75 * s.speed); render(); }, 250);
    setInterval(save, 8000);
    render();
  }

  window.__tezgah = { get state() { return s; }, advance(min) { for (let i = 0; i < min; i += 5) step(5); render(); }, reset() { newGame(); render(); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
