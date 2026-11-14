(() => {
  'use strict';

  // ---------- Sabit veriler ----------
  // Ürünler. Birim (u) ve olağan fiyat (ref, TL, toptan) Kasım 2026 Türkiye fiyatlarına dayanır:
  // reports/Türkiye işletme maliyetleri ve fiyatlar.md. kg: birimin ağırlığı (taşıma ücreti buna göre).
  // Tarifler gerçek dönüşüm oranlarıdır (100 kg buğday ≈ 72 kg un, 1 kg peynir ≈ 5 L süt, 1 kg lif ≈ 2,3 kg kütlü pamuk).
  // op: 10 birimlik partinin işletme gideri (işçilik, enerji, bakım). d: dükkânda saatlik talep (birim).
  const P = {
    bugday: { n: 'Buğday', u: '100 kg', kg: 100, ref: 1650, w: 1, b: 'tarla', t: 30, op: 12400, in: {} },          // TMO 2026: 16,5 TL/kg
    sut: { n: 'Süt', u: '100 L', kg: 100, ref: 2430, w: 1, b: 'tarla', t: 30, op: 19500, in: {}, d: 4 },          // USK: 24,3 TL/L
    pamuk: { n: 'Pamuk', u: '100 kg kütlü', kg: 100, ref: 3100, w: 1, b: 'tarla', t: 45, op: 23200, in: {} },   // Çukobirlik: 31 TL/kg
    komur: { n: 'Kömür', u: 'ton', kg: 1000, ref: 4000, w: 2, b: 'maden', t: 45, op: 30000, in: {}, d: 2 },      // santrale ~4.000 TL/t
    demir: { n: 'Demir cevheri', u: 'ton', kg: 1000, ref: 6200, w: 2, b: 'maden', t: 60, op: 46500, in: {} },    // ~124 $/t
    un: { n: 'Un', u: '100 kg', kg: 100, ref: 3700, w: 1, b: 'fabrika', t: 60, op: 1650, in: { bugday: 14 }, d: 4 },
    kumas: { n: 'Kumaş', u: '100 m', kg: 25, ref: 11000, w: 0.5, b: 'fabrika', t: 120, op: 55000, in: { pamuk: 6 } },
    celik: { n: 'Çelik', u: 'ton', kg: 1000, ref: 29700, w: 2, b: 'fabrika', t: 120, op: 85000, in: { demir: 16, komur: 6 } },  // inşaat demiri
    ekmek: { n: 'Ekmek', u: '1.000 adet', kg: 200, ref: 13000, w: 0.5, b: 'fabrika', t: 60, op: 48000, in: { un: 14 }, d: 6 },  // rafta 17,5 TL
    peynir: { n: 'Peynir', u: '100 kg', kg: 100, ref: 28000, w: 1, b: 'fabrika', t: 180, op: 60000, in: { sut: 50 }, d: 2 },     // rafta ~380 TL/kg
    giysi: { n: 'Giysi', u: '100 adet', kg: 30, ref: 25000, w: 0.5, b: 'fabrika', t: 180, op: 25000, in: { kumas: 12 }, d: 3 },
    alet: { n: 'Alet', u: '100 adet', kg: 80, ref: 35000, w: 1, b: 'fabrika', t: 240, op: 233000, in: { celik: 1 }, d: 2 },
  };
  const PK = Object.keys(P);
  const WNAME = { 0.5: 'hafif', 1: 'orta', 2: 'ağır' };
  // Arsalar: büyüklük (size, birimi u) × birim fiyat (up, TL) × konum çarpanı. Kaynak: Endeksa Ekim-Aralık 2025, %20 yıllık artışla 2026'ya taşındı.
  // Merkez: büyükşehir ticari arsası (Ankara ~5.300, İzmir ~12.400, İstanbul ~19.400 TL/m²; ortası alındı).
  // Kırsal: tarım arazisi (Konya ~190 bin, Çanakkale ~470 bin TL/dönüm). Dağ: dağlık arazi + maden ruhsat sahası (tahmin).
  // tax: yıllık emlak vergisi oranı (büyükşehir: arsa binde 6, tarla/arazi binde 2, işyeri binde 4).
  const R = {
    merkez: { n: 'Merkez', dm: 1.6, u: 'm²', size: [350, 700], up: 12000, tax: 0.006, note: 'Şehir merkezi: dükkân talebi yüksek' },
    kirsal: { n: 'Kırsal', dm: 1.0, u: 'dönüm', size: [6, 16], up: 250000, tax: 0.002, bonus: 'tarla', note: 'Tarlalar %25 fazla ürün verir' },
    dag: { n: 'Dağ', dm: 0.7, u: 'dönüm', size: [25, 60], up: 37500, tax: 0.002, bonus: 'maden', note: 'Madenler %25 fazla ürün verir' },
    // Unvanla açılan bölgeler (rank: gereken servet basamağı). Ova: Konya ovası (~190 bin TL/dönüm); Liman: İzmir; Metropol: İstanbul (~19.400 TL/m², 2026'ya taşındı ~30.000).
    ova: { n: 'Ova', dm: 0.9, u: 'dönüm', size: [10, 25], up: 190000, tax: 0.002, bonus: 'tarla', bm: 1.4, rank: 1, note: 'Geniş ova: tarlalar %40 fazla ürün verir · Esnaf unvanıyla açılır' },
    liman: { n: 'Liman', dm: 1.3, u: 'm²', size: [400, 900], up: 14000, tax: 0.006, wsell: 0.92, rank: 2, note: 'İhracat limanı: toptancı malı %92’den alır (başka yerde %85) · Tüccar unvanıyla açılır' },
    metropol: { n: 'Metropol', dm: 2.4, u: 'm²', size: [250, 500], up: 30000, tax: 0.006, rank: 3, note: 'En kalabalık pazar: dükkân talebi Merkez’in 1,5 katı · Sanayici unvanıyla açılır' },
  };
  const LAND_GROWTH = 0.20, TAX_BUILT = 0.004, IDLE_TAX = 5, DEED = 0.02, LIST_FEE = 0.01;  // arsa değeri yılda %20 artar; tapu harcı alıcı ve satıcıya %2
  const midSize = r => Math.round((R[r].size[0] + R[r].size[1]) / 2);
  const landBase = r => midSize(r) * R[r].up * ((s && s.landIdx) || 1);
  const sizeOf = pl => pl.size || midSize(pl.region);
  const landTxt = pl => `${sizeOf(pl).toLocaleString('tr-TR')} ${R[pl.region].u} · ${R[pl.region].u === 'm²' ? 'm²' : 'dönümü'} ${fmt(pl.ref / sizeOf(pl))}`;
  const DIST = {
    merkez: { merkez: 0, kirsal: 1, dag: 2, ova: 1, liman: 2, metropol: 1 },
    kirsal: { merkez: 1, kirsal: 0, dag: 1, ova: 1, liman: 2, metropol: 2 },
    dag: { merkez: 2, kirsal: 1, dag: 0, ova: 2, liman: 3, metropol: 3 },
    ova: { merkez: 1, kirsal: 1, dag: 2, ova: 0, liman: 2, metropol: 2 },
    liman: { merkez: 2, kirsal: 2, dag: 3, ova: 2, liman: 0, metropol: 1 },
    metropol: { merkez: 1, kirsal: 2, dag: 3, ova: 2, liman: 1, metropol: 0 },
  };
  const B = {
    dukkan: { n: 'Dükkân', cost: 1200000, cap: 150, scale: 1, hint: 'Raf, soğutucu, kasa ve ruhsat · mal alır, perakende satar' },
    tarla: { n: 'Tarla', cost: 1600000, cap: 200, scale: 1, hint: 'Traktör, ekipman ve ahır · buğday, süt, pamuk üretir' },
    maden: { n: 'Maden', cost: 4500000, cap: 400, scale: 2, hint: 'Ruhsat, ekskavatör ve kamyon · kömür ve cevher çıkarır' },
    fabrika: { n: 'Fabrika', cost: 12000000, cap: 1250, scale: 5, hint: 'Bina, üretim hattı ve makineler · ham maddeyi işler' },
  };
  const EVENTS = {
    festival: { title: 'Merkez’de hasat festivali', body: 'Festival boyunca Merkez’de ekmek ve peynir talebi %50 artacak.', d: { region: 'merkez', ps: ['ekmek', 'peynir'], m: 1.5 } },
    kis: { title: 'Sert kış geliyor', body: 'Soğuk hava kömür ve giysi talebini tüm bölgelerde %50 artıracak.', d: { ps: ['komur', 'giysi'], m: 1.5 } },
    moda: { title: 'Merkez’de yeni moda akımı', body: 'Giysi talebi Merkez’de %60 artacak.', d: { region: 'merkez', ps: ['giysi'], m: 1.6 } },
    insaat: { title: 'Belediye inşaat hamlesi başlatıyor', body: 'Alet talebi tüm bölgelerde %60 artacak.', d: { ps: ['alet'], m: 1.6 } },
    kuraklik: { title: 'Kırsal’da kuraklık bekleniyor', body: 'Kırsal’daki tarlaların verimi %30 düşecek.', y: { region: 'kirsal', b: 'tarla', m: 0.7 } },
    don: { title: 'Kırsal’da zirai don', body: 'Geç gelen don Kırsal’daki tarlaların verimini %40 düşürecek.', y: { region: 'kirsal', b: 'tarla', m: 0.6 } },
    bereket: { title: 'Kırsal’da bereketli mevsim', body: 'Kırsal’daki tarlaların verimi %30 artacak.', y: { region: 'kirsal', b: 'tarla', m: 1.3 } },
    damar: { title: 'Dağ’da yeni damar bulundu', body: 'Dağ’daki madenlerin verimi %30 artacak.', y: { region: 'dag', b: 'maden', m: 1.3 } },
    yol: { title: 'Dağ yolunda bakım çalışması', body: 'Çalışma süresince tüm taşıma ücretleri %80 artacak.', tr: 1.8 },
  };
  // İşçiler: zorunlu değil; binayı bir konuda iyileştirir, günlük maaş alır
  const WK = {
    usta: { n: 'Usta', b: ['tarla', 'maden', 'fabrika'], eff: [0.05, 0.10, 0.15], wage: [16500, 25000, 33000], desc: e => `parti süresi %${e * 100} kısalır` },
    mudur: { n: 'Müdür', b: ['tarla', 'maden', 'fabrika', 'dukkan'], eff: [0.05, 0.10, 0.15], wage: [12500, 19000, 25000], desc: e => `işletme gideri ve toptancıdan alış %${e * 100} ucuzlar` },
    satis: { n: 'Satış görevlisi', b: ['dukkan'], eff: [1, 2, 3], wage: [8200, 12000, 16500], desc: e => `rafa ${e} ek ürün` },
    sofor: { n: 'Şoför', b: ['tarla', 'maden', 'fabrika', 'dukkan'], eff: [0.10, 0.20, 0.30], wage: [15700, 23500, 31500], desc: e => `taşıma ücreti %${e * 100} azalır` },
  };
  const REG_WK = { merkez: { mudur: 3, satis: 3, usta: 1, sofor: 1 }, kirsal: { usta: 3, sofor: 2, mudur: 1, satis: 1 }, dag: { usta: 3, sofor: 3, mudur: 1, satis: 1 }, ova: { usta: 3, sofor: 2, mudur: 1, satis: 1 }, liman: { sofor: 3, mudur: 2, satis: 2, usta: 1 }, metropol: { mudur: 3, satis: 3, usta: 1, sofor: 1 } };
  const NAMES = ['Ayşe', 'Mehmet', 'Zeynep', 'Can', 'Elif', 'Mert', 'Deniz', 'Selin', 'Burak', 'Ece', 'Emre', 'Derya', 'Kerem', 'Nil', 'Onur', 'Sena', 'Tuna', 'Melis'];
  const RETAIL = 1.35, W_BUY = 1.12, W_SELL = 0.85, RENT = 0.05, COMM = 0.03, FREE_UNTIL = 2 * 1440;
  // Hedefler: [metin, koşul, ödül]. Ödül hedef tamamlanınca kasaya eklenir.
  const GOALS = [
    ['Arsana bir bina kur', s => s.plots.some(p => p.b), 200000],
    ['İlk satışını yap', s => s.totalIncome > 0, 300000],
    ['Bir ürüne otomatik fiyat kuralı koy', s => s.plots.some(p => p.b && Object.values(p.b.rule || {}).some(r => r.mode !== 'elle')), 300000],
    [() => 'Kasanda ' + fmt(5e6) + ' biriktir', s => s.money >= 5e6, 600000],
    ['Bir arsa artırması kazan', s => s.plots.some(p => !p.rented), 1000000],
    ['Üç arsaya ulaş', s => s.plots.length >= 3, 1200000],
    [() => 'Net değerini ' + fmt(4e7) + ' yap', s => netWorth() >= 4e7, 2000000],
  ];
  // Uygulama kapalıyken geçen süre: gerçek 1 saniye = 1× hızda 15 oyun dakikası; en fazla bir oyun günü telafi edilir.
  // Servet basamakları: net değer eşiği geçilince unvan kalıcı olarak yükselir ve ayrıcalığı açılır.
  // tr: taşıma çarpanı, debt: borç faizi çarpanı, tax: emlak vergisi çarpanı. Oyun çevrim içi olduğu için bitiş yok; unvan herkese görünen sıralamadır.
  const RANKS = [
    { n: 'Seyyar esnaf', at: 0, perk: 'Başlangıç' },
    { n: 'Esnaf', at: 10e6, perk: 'Nakliyecilerle anlaşma: taşıma %10 ucuz', tr: 0.9 },
    { n: 'Tüccar', at: 30e6, perk: 'Bankalar güveniyor: borç faizi yarıya iner', debt: 0.5 },
    { n: 'Sanayici', at: 100e6, perk: 'Yatırım teşviki: emlak vergisi %25 indirimli', tax: 0.75 },
    { n: 'Fabrikatör', at: 300e6, perk: 'Kendi filon: taşıma %20 ucuz', tr: 0.8 },
    { n: 'Holding patronu', at: 1e9, perk: 'Emlak vergisi %50 indirimli', tax: 0.5 },
    { n: 'Sektör lideri', at: 2e9, perk: 'Taşıma %30 ucuz', tr: 0.7 },
    { n: 'Dünya markası', at: 5e9, perk: 'Borç faizi dörtte birine iner', debt: 0.25 },
  ];
  const rankNow = () => s.rank || 0;
  const perk = key => RANKS.slice(0, rankNow() + 1).reduce((m, r) => Math.min(m, r[key] || 1), 1);
  const goalText = i => typeof GOALS[i][0] === 'function' ? GOALS[i][0]() : GOALS[i][0];
  const AWAY_RATE = 15 / 1000, AWAY_MAX = 1440, AWAY_MIN = 30, DEBT_RATE = 0.008;
  // Başlangıç sermayesi ve taşıma ücreti (TL/ton): sabit + bölge adımı başına
  const START_MONEY = 2500000, TR_FIXED = 150, TR_STEP = 600;
  const SAVE_KEY = 'tezgah-demo-v3';

  // ---------- Durum ----------
  let s, ui = { tab: 'plots', dest: 1, qty: 20, listMul: 1, sel: {}, invTL: 1000, loanTL: 1000000 };
  let awayLog = null;  // çevrimdışı telafi sırasında gelir ve giderleri toplar
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
  // Para birimi: oyun içinde her tutar Türk lirası olarak tutulur; ekranda oyuncunun seçtiği birimde gösterilir.
  const CUR = { TRY: { n: 'Türk lirası', sym: '₺' }, USD: { n: 'ABD doları', sym: '$' }, EUR: { n: 'Euro', sym: '€' } };
  const rate = c => (c === 'TRY' || !s || !s.mkt ? 1 : s.mkt.px[c]);
  const disp = n => n / rate(s ? s.cur || 'TRY' : 'TRY');
  const sym = () => CUR[(s && s.cur) || 'TRY'].sym;
  const fmt = n => { const v = disp(n), big = Math.abs(v) >= 1e6; return (v < 0 ? '−' : '') + sym() + (Math.abs(v) >= 1e9 ? (Math.abs(v) / 1e9).toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' mlr' : big ? (Math.abs(v) / 1e6).toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' mn' : Math.abs(Math.round(v)).toLocaleString('tr-TR')); };
  const fmt1 = n => { const v = disp(n), d = Math.abs(v) < 100 ? 2 : 0; return sym() + v.toLocaleString('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d }); };
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function emptyStats() { return { inc: {}, exp: {} }; }
  function newGame() {
    s = {
      v: 3, cur: 'TRY', landIdx: 1, money: START_MONEY, t: 8 * 60, lastHour: 8, speed: 1, nextId: 100, nextPlot: 2, totalIncome: 0,
      plots: [{ id: 1, region: 'kirsal', rented: true, size: 10, ref: 10 * R.kirsal.up, b: null, inv: {}, last: -1e9, paid: 0 }],
      mult: {}, hist: {}, rivals: {}, unread: 0, workers: [], cands: {}, listings: [], mine: [], auctions: [], events: [], news: [],
      today: emptyStats(), prev: emptyStats(), goals: [], freeSwap: true, lastEvent: '', nextListAt: 0,
    };
    for (const k of PK) { s.mult[k] = 1; s.hist[k] = [1]; }
    s.mkt = newMarket(); s.pf = { cost: {}, DEP: 0 };
    for (const r in R) { s.rivals[r] = {}; for (const k of PK) if (P[k].d) s.rivals[r][k] = [rnd(0.97, 1.1), rnd(0.97, 1.1)]; }
    for (const r in R) s.cands[r] = genCands(r);
    genListings();
    spawnAuction();
    news('Tezgâh açıldı', 'Kırsal’da kiralık bir arsan ve ' + fmt(START_MONEY) + ' sermayen var. Tarla ya da dükkân kurmaya yeter; fabrika için büyümen gerekecek. İlk iki gün kira ve vergi alınmaz.');
    ui.dest = 1;
    initComp();
    migrate();
  }
  function save() { s.savedAt = Date.now(); try { localStorage.setItem(SAVE_KEY, JSON.stringify(s)); } catch (e) { /* depolama yoksa oyun yine çalışır */ } }
  // Uygulama kapalıyken ya da arka plandayken geçen gerçek süreyi 1× hızda oynatır ve özetini hazırlar.
  // Oyun duraklatılmışsa zaman işlemez.
  function catchUp(ms) {
    if (!(ms > 0) || !s.speed) return;
    const min = Math.min(AWAY_MAX, Math.floor(ms * AWAY_RATE));
    if (min < 5) return;
    const log = { min, capped: ms * AWAY_RATE > AWAY_MAX, inc: {}, exp: {}, money: s.money, news: s.news.length };
    awayLog = log;
    for (let i = 0; i < min; i += 5) step(5);
    awayLog = null;
    log.news = Math.max(0, s.news.length - log.news);
    if (min >= AWAY_MIN) ui.away = log;
  }
  function load() {
    try { const d = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); if (d && d.v === 3 && Array.isArray(d.plots)) { s = d; for (const pl of s.plots) if (pl.b && !pl.b.out) pl.b.out = {}; if (!s.workers) { s.workers = []; s.cands = {}; for (const r in R) s.cands[r] = genCands(r); } migrate(); return true; } } catch (e) { /* yoksay */ }
    return false;
  }

  // ---------- Ekonomi yardımcıları ----------
  const price = p => P[p].ref * s.mult[p];
  // Bir birimlik alım-satımın piyasa fiyatına etkisi: birimin değeri arttıkça etki büyür (eski ölçekle aynı aralıkta)
  // Ulusal piyasa büyüktür: tek oyuncunun alımı fiyatı az etkiler. Fabrika ölçeğinde alım-satım fiyatı tavana ya da tabana itmesin.
  const impact = p => Math.min(15, P[p].ref / 1600) / B[P[p].b].scale / depth();
  // Pazardaki bir ilanın saatlik satış hızı: ürünün üretildiği binanın ölçeğiyle büyür (fabrika malının alıcısı da çoktur)
  const listRate = p => 15 * B[P[p].b].scale * depth();
  const retailRef = p => price(p) * RETAIL;
  const activeEvents = () => s.events.filter(e => s.t >= e.start && s.t < e.end);
  function demandMult(region, p) { let m = 1; for (const e of activeEvents()) { const d = EVENTS[e.key].d; if (d && d.ps.includes(p) && (!d.region || d.region === region)) m *= d.m; } return m; }
  function yieldMult(region, b, p) { let m = (R[region].bonus === b ? R[region].bm || 1.25 : 1) * seasonYield(p); for (const e of activeEvents()) { const y = EVENTS[e.key].y; if (y && y.b === b && y.region === region) m *= y.m; } return m; }
  function transMult() { let m = perk('tr') * (s.comp && s.comp.holding ? HOLD_PERK : 1); for (const e of activeEvents()) if (EVENTS[e.key].tr) m *= EVENTS[e.key].tr; return m; }
  // Taşıma: ton başına sabit ücret + bölge adımı başına ücret (yaklaşık 3 TL/ton-km, bir adım ≈ 200 km)
  const trans = (qty, p, from, to) => qty * P[p].kg / 1000 * (TR_FIXED + DIST[from][to] * TR_STEP) * transMult();
  const invTotal = pl => Object.values(pl.inv).reduce((a, b) => a + b, 0);
  const cap = pl => (pl.b ? B[pl.b.type].cap * (pl.b.level + (pl.b.parts || []).length) : 0);
  // Üretim binasında seviye partiyi büyütür: 1. seviye 10, 2. seviye 15, 3. seviye 20 birim (girdi ve gider de aynı oranda)
  const batch = pl => pl.b.type === 'dukkan' ? 1 : B[pl.b.type].scale * (1 + 0.5 * (pl.b.level - 1));
  // n birimi gerçek miktar olarak yazar: 48 × 100 kg → "4,8 ton", 12 × 1.000 adet → "12.000 adet"
  function qtyTxt(p, n) {
    const m = P[p].u.match(/^([\d.]+) (.+)$/), base = m ? +m[1].replace(/\./g, '') : 1, word = m ? m[2] : P[p].u;
    let v = n * base, w = word;
    if (word.startsWith('kg') && v >= 1000) { v /= 1000; w = 'ton' + word.slice(2); }
    return (+v.toFixed(v < 10 ? 2 : 1)).toLocaleString('tr-TR') + ' ' + w;
  }
  const durTxt = min => min < 60 ? Math.round(min) + ' dk' : (+(min / 60).toFixed(1)).toLocaleString('tr-TR') + ' sa';
  // Bir hattın oyun günü başına üretimi (usta hızı ve bölge/olay verimi dahil)
  const lineInfo = (pl, p) => { const k = batch(pl), t = P[p].t / (1 + wEff(pl, 'usta')), n = 10 * k * yieldMult(pl.region, pl.b.type, p);
    return `Parti ${qtyTxt(p, n)} ${P[p].n.toLocaleLowerCase('tr-TR')} · her ${durTxt(t)} · günde ~${qtyTxt(p, n * 1440 / t)}`; };
  // Yeni hat için aynı bölgedeki boş arsalar (binanın genişleyebileceği yer)
  const freePlots = pl => s.plots.filter(x => x !== pl && !x.b && !x.part && x.region === pl.region);
  const plot = id => s.plots.find(p => p.id === id);
  function add(pl, p, q) { pl.inv[p] = (pl.inv[p] || 0) + q; if (pl.inv[p] <= 0) delete pl.inv[p]; }
  function inc(kind, amt) { if (s.acct && !NOTAX.has(kind)) s.acct.inc += amt; s.money += amt; s.totalIncome += amt; s.today.inc[kind] = (s.today.inc[kind] || 0) + amt; if (awayLog) awayLog.inc[kind] = (awayLog.inc[kind] || 0) + amt; }
  function exp(kind, amt) { if (s.acct && !NOTAX.has(kind)) s.acct.exp += amt; s.money -= amt; s.today.exp[kind] = (s.today.exp[kind] || 0) + amt; if (awayLog) awayLog.exp[kind] = (awayLog.exp[kind] || 0) + amt; }
  // Hedef ödülü, temettü ve faiz kasaya girer ama ticari gelir sayılmaz (totalIncome'a eklenmez).
  // inPlace: tutar kasaya değil başka yere (ör. mevduat bakiyesine) eklendi, yalnızca kayda geçer.
  function finInc(kind, amt, inPlace) { if (!inPlace) s.money += amt; s.today.inc[kind] = (s.today.inc[kind] || 0) + amt; if (awayLog) awayLog.inc[kind] = (awayLog.inc[kind] || 0) + amt; }
  const reward = amt => finInc('Hedef ödülü', amt);
  function rentOn(pl, amt) { if (pl.rented && s.t >= FREE_UNTIL) exp('Kira', amt * RENT); }
  function news(title, body, alert) { s.news.unshift({ t: s.t, title, body }); if (s.news.length > 40) s.news.pop(); if (ui.tab !== 'news') s.unread = (s.unread || 0) + 1; if (alert && !awayLog) toast(title); }
  function shopRate(pl, p) {
    const pr = pl.b.prices[p] || retailRef(p), ref = retailRef(p) * qPrem(p);
    const A = Math.pow(ref / pr, 2) * (1 + 0.1 * (pl.b.level - 1));
    const D = (P[p].d || 0) * R[pl.region].dm * demandMult(pl.region, p) * buySpeed(pr / ref) * brandShop() * depth();
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
  const shopCost = (pl, p) => pl.b.cost[p] || price(p) * wBuy();
  function ruleFloor(pl, p) { const r = pl.b.rule[p]; return shopCost(pl, p) * (1 + (r ? r.margin : 0.1)) / (pl.rented ? 1 - RENT : 1); }
  function applyRule(pl, p) {
    const r = pl.b.rule[p]; if (!r || r.mode === 'elle' || !P[p].d) return;
    const target = r.mode === 'ucuz' ? rivalLo(pl.region, p) * 0.99 : rivalAvg(pl.region, p);
    pl.b.prices[p] = Math.round(Math.min(retailRef(p) * 1.5, Math.max(ruleFloor(pl, p), target)) * 10) / 10;
  }
  // Satın alma: pazardaki ilanlar ve sistem toptancısı, teslim fiyatına göre
  function sources(p, region) {
    const src = s.listings.filter(l => l.p === p).map(l => ({ l, unit: l.price + trans(1, p, l.region, region) }));
    src.push({ l: null, unit: price(p) * wBuy() + trans(1, p, region, region) });
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
    const unit = (l ? l.price : price(p) * wBuy() * (1 - wEff(to, 'mudur'))), tu = trans(1, p, l ? l.region : to.region, to.region) * (1 - wEff(to, 'sofor'));
    q = Math.min(q, l ? l.qty : Infinity, cap(to) - invTotal(to), Math.floor(s.money / (unit + tu)));
    if (q <= 0) return 0;
    exp('Mal alımı', unit * q); exp('Taşıma', tu * q); addCost(to, p, q, unit + tu); add(to, p, q);
    if (l) { l.qty -= q; if (l.qty <= 0) s.listings = s.listings.filter(x => x !== l); }
    s.mult[p] = clamp(s.mult[p] + 0.00002 * impact(p) * q, 0.6, 1.5);
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
        if (l) l.price = Math.round(price(p) * qPrem(p) * +rule.slice(5) * 10) / 10;
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
  function checkRank() {
    const nx = RANKS[rankNow() + 1];
    if (!nx || netWorth() < nx.at) return;
    s.rank = rankNow() + 1;
    const day = Math.floor(s.t / 1440) + 1;
    news('Yeni unvan: ' + nx.n, 'Net değerin ' + fmt(nx.at) + ' sınırını aştı (' + day + '. gün). Açılan ayrıcalık: ' + nx.perk + '.', true);
    for (const r in R) if (R[r].rank === s.rank) { spawnAuction(null, r); news('Yeni bölge açıldı: ' + R[r].n, R[r].note.split(' · ')[0] + '. Artırma sekmesinde ilk arsası satışta.', true); }
  }
  function landValue() { return s.plots.filter(p => !p.rented).reduce((a, p) => a + p.ref, 0); }
  function netWorth() {
    let v = s.money + landValue();
    for (const pl of s.plots) { if (pl.b) v += pl.b.spent * 0.5; for (const p in pl.inv) v += pl.inv[p] * price(p) * W_SELL; }
    for (const l of s.mine) v += l.qty * price(l.p) * W_SELL;
    v += portfolioValue() - loanDebt();
    for (const a of s.auctions) { if (a.bidder === 'me') v += a.bid; if (a.plot) v += a.plot.ref; }
    return v;
  }
  // Yıllık emlak vergisi oranı. Boş ya da son günde üretim/satış yapmamış arsaya oyun kuralı olarak 5 kat atıl arsa vergisi uygulanır.
  function taxRate(pl) {
    const base = R[pl.region].tax, built = pl.region === 'merkez' ? TAX_BUILT : base;
    if (pl.part) { const m = plot(pl.part); return m && s.t - m.last < 1440 ? built : built * IDLE_TAX; }
    return !pl.b ? base * IDLE_TAX : (s.t - pl.last < 1440 ? built : built * IDLE_TAX);
  }
  function taxFactor() { const n = s.plots.filter(p => !p.rented).length; return (1 + 0.1 * Math.max(0, n - 1)) * perk('tax'); }
  // Bir oyun günü bir hafta sayıldığı için vergi yıllık tutarın 52'de biridir
  const dailyTax = pl => pl.rented ? 0 : pl.ref * taxRate(pl) * taxFactor() / 52;

  // ---------- Sanal piyasa: döviz, altın, mevduat, hisse ----------
  // Gerçek piyasa değildir; oranlar araştırma raporundaki seviye ve oynaklıklara göre ayarlanmış rastgele yürüyüştür.
  // Bir oyun günü piyasada bir işlem haftası (5 gün) sayılır, yoksa fiyatlar oyun süresince neredeyse kıpırdamaz.
  const MKT_DAYS = 5;
  // Kaynak: reports/Türkiye işletme maliyetleri ve fiyatlar.md (13 Kasım 2026 kapanışları; oynaklıklar tahmindir)
  const FXP = {  // başlangıç kuru (TL), yıllık beklenen değişim, yıllık oynaklık
    USD: { n: 'ABD doları', p0: 50.37, mu: 0.20, vol: 0.06 },   // kontrollü değer kaybı: ayda %1,5-2
    EUR: { n: 'Euro', p0: 55.6, mu: 0.17, vol: 0.10 },
  };
  const GOLD = { n: 'Gram altın', ons0: 3880, mu: 0.12, vol: 0.20, spread: 0.03 };  // ons dolar; bankalarda alış-satış farkı %3-4
  // Bankada döviz alış-satış farkı, hisse komisyonu (binde 2 + %5 BSMV), mevduat yıllık brüt faizi (politika faizi %36)
  const FX_SPREAD = 0.01, COMMISSION = 0.002 * 1.05, DEPOSIT_RATE = 0.36;
  const INDEX = { p0: 11843, mu: 0.20, vol: 0.30, crash: 0.03 };  // TZ-30, BIST 100 seviyesinde başlar; crash: bir günde sert düşüş olasılığı
  // Kurgusal şirketler; her biri oyundaki ürünlere bağlıdır: o ürünlerin fiyatı yükselince hissesi de destek bulur
  const STOCKS = {
    AUN: { n: 'Anadolu Un', sec: 'Gıda', p0: 48, beta: 0.8, vol: 0.32, div: 0.03, ps: ['un', 'ekmek', 'bugday'] },
    YSU: { n: 'Yayla Süt', sec: 'Gıda', p0: 36, beta: 0.7, vol: 0.30, div: 0.025, ps: ['sut', 'peynir'] },
    ETK: { n: 'Ege Tekstil', sec: 'Tekstil', p0: 22, beta: 1.1, vol: 0.42, div: 0.01, ps: ['pamuk', 'kumas', 'giysi'] },
    DMC: { n: 'Demirkaya Çelik', sec: 'Metal', p0: 64, beta: 1.2, vol: 0.40, div: 0.02, ps: ['celik', 'alet', 'demir'] },
    KMD: { n: 'Kuzey Madencilik', sec: 'Madencilik', p0: 31, beta: 1.3, vol: 0.48, div: 0.0, ps: ['komur', 'demir'] },
    PZM: { n: 'Pazar Marketler', sec: 'Perakende', p0: 120, beta: 0.9, vol: 0.30, div: 0.02, ps: ['ekmek', 'peynir', 'giysi'] },
  };
  const ASSETS = ['USD', 'EUR', 'XAU', ...Object.keys(STOCKS)];
  const assetName = a => a === 'XAU' ? GOLD.n : FXP[a] ? FXP[a].n : STOCKS[a].n;
  const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const avgMult = ps => ps.reduce((a, p) => a + s.mult[p], 0) / ps.length;
  function newMarket() {
    const px = { USD: FXP.USD.p0, EUR: FXP.EUR.p0, ons: GOLD.ons0 };
    px.XAU = px.ons * px.USD / 31.1035;
    for (const k in STOCKS) px[k] = STOCKS[k].p0;
    const m = { px, hist: {}, idx: INDEX.p0, idxHist: [INDEX.p0], link: {}, open: {} };
    for (const a of ASSETS) { m.hist[a] = [px[a]]; m.open[a] = px[a]; }
    for (const k in STOCKS) m.link[k] = avgMult(STOCKS[k].ps);
    return m;
  }
  // Saatlik fiyat adımı: log getiri = beklenen + oynaklık × rastgele şok. Hisseler genel endekse (beta) ve bağlı ürün fiyatlarına tepki verir.
  function marketHour(h) {
    const m = s.mkt, dt = MKT_DAYS / 252 / 24, sq = Math.sqrt(dt), step1 = (mu, vol, z) => Math.exp((mu - vol * vol / 2) * dt + vol * sq * z);
    for (const c in FXP) m.px[c] *= step1(FXP[c].mu, FXP[c].vol, gauss());
    m.px.ons *= step1(GOLD.mu, GOLD.vol, gauss());
    m.px.XAU = m.px.ons * m.px.USD / 31.1035;
    const zi = gauss(), ri = step1(INDEX.mu, INDEX.vol, zi);
    m.idx *= ri;
    for (const k in STOCKS) {
      const st = STOCKS[k], idio = Math.sqrt(Math.max(0.01, st.vol * st.vol - (st.beta * INDEX.vol) ** 2));
      const now = avgMult(st.ps), dLink = Math.log(now / (m.link[k] || now)); m.link[k] = now;
      m.px[k] *= Math.exp(st.beta * Math.log(ri) + (INDEX.mu * (1 - st.beta)) * dt - idio * idio / 2 * dt + idio * sq * gauss() + 0.6 * dLink);
    }
    for (const e of activeEvents()) { const d = EVENTS[e.key].d; if (!d) continue; for (const k in STOCKS) if (STOCKS[k].ps.some(p => d.ps.includes(p))) m.px[k] *= 1 + 0.004 * (d.m - 1); }
    if (h % 2 === 0) { for (const a of ASSETS) { m.hist[a].push(m.px[a]); if (m.hist[a].length > 48) m.hist[a].shift(); } m.idxHist.push(m.idx); if (m.idxHist.length > 48) m.idxHist.shift(); }
  }
  function marketDay() {
    const m = s.mkt, pf = s.pf;
    // Temettü: yıllık verimin bir oyun gününe (MKT_DAYS işlem günü) düşen payı
    let div = 0; for (const k in STOCKS) div += (pf[k] || 0) * m.px[k] * STOCKS[k].div * MKT_DAYS / 252;
    if (div > 0.5) finInc('Temettü', div);
    // Vadeli mevduat: brüt faizden %15 stopaj düşülür
    if (pf.DEP > 0) { const it = pf.DEP * DEPOSIT_RATE * MKT_DAYS / 365 * 0.85; pf.DEP += it; finInc('Mevduat faizi', it, true); }
    // Ender kriz günü: endeks %6-9 düşer, devre kesici çalışır; hisseler betalarına göre etkilenir, altın ve dolar biraz yükselir
    if (Math.random() < INDEX.crash) {
      const f = rnd(0.06, 0.09); m.idx *= 1 - f;
      for (const k in STOCKS) m.px[k] *= 1 - f * STOCKS[k].beta * rnd(0.8, 1.2);
      m.px.USD *= 1 + f / 4; m.px.EUR *= 1 + f / 4; m.px.ons *= 1 + f / 6; m.px.XAU = m.px.ons * m.px.USD / 31.1035;
      news('Borsada sert düşüş', 'TZ-30 endeksi bir günde %' + (f * 100).toFixed(1) + ' düştü, devre kesici devreye girdi. Dolar ve altın değer kazandı.', true);
    }
    const moves = ASSETS.map(a => [a, m.px[a] / m.open[a] - 1]).sort((x, y) => Math.abs(y[1]) - Math.abs(x[1]));
    const [a, r] = moves[0];
    if (Math.abs(r) > 0.04) news('Piyasa: ' + assetName(a) + (r > 0 ? ' yükseldi' : ' düştü'), assetName(a) + ' günü %' + Math.abs(r * 100).toFixed(1) + (r > 0 ? ' artıyla' : ' kayıpla') + ' kapattı.');
    for (const x of ASSETS) m.open[x] = m.px[x];
  }
  // Alış ve satış fiyatı: döviz ve altında kur farkı (makas), hissede komisyon
  const spreadOf = a => a === 'XAU' ? GOLD.spread : FXP[a] ? FX_SPREAD : COMMISSION;
  const askPx = a => s.mkt.px[a] * (1 + spreadOf(a) / 2 * (STOCKS[a] ? 2 : 1));
  const bidPx = a => s.mkt.px[a] * (1 - spreadOf(a) / 2 * (STOCKS[a] ? 2 : 1));
  const unitName = a => a === 'XAU' ? 'gram' : FXP[a] ? CUR[a].sym : 'lot';
  function portfolioValue() { let v = s.pf.DEP || 0; for (const a of ASSETS) v += (s.pf[a] || 0) * bidPx(a); return v; }
  // Tutar (TL) karşılığı alım: döviz ve altın kesirli, hisse tam lot alınır
  function trade(a, side, amt) {
    const pf = s.pf;
    if (a === 'DEP') {
      if (side === 'buy') { amt = Math.min(amt, s.money); if (amt <= 0) return 0; s.money -= amt; pf.DEP = (pf.DEP || 0) + amt; return amt; }
      amt = Math.min(amt, pf.DEP || 0); if (amt <= 0) return 0; pf.DEP -= amt; s.money += amt; return amt;
    }
    const whole = !!STOCKS[a];
    if (side === 'buy') {
      let q = Math.min(amt, s.money) / askPx(a); if (whole) q = Math.floor(q); else q = Math.floor(q * 100) / 100;
      if (q <= 0) return 0;
      s.money -= q * askPx(a); pf[a] = (pf[a] || 0) + q;
      pf.cost[a] = (pf.cost[a] || 0) + q * askPx(a); return q;
    }
    let q = Math.min(pf[a] || 0, amt / bidPx(a)); if (whole) q = Math.min(pf[a] || 0, Math.ceil(q)); q = Math.round(q * 100) / 100;
    if (q <= 0) return 0;
    const avg = (pf.cost[a] || 0) / (pf[a] || 1), gain = q * (bidPx(a) - avg);
    s.money += q * bidPx(a); pf.cost[a] -= avg * q; pf[a] -= q; if (pf[a] < 0.005) { pf[a] = 0; pf.cost[a] = 0; }
    const k = gain >= 0 ? 'Yatırım kârı' : 'Yatırım zararı';
    if (gain >= 0) { s.today.inc[k] = (s.today.inc[k] || 0) + gain; } else s.today.exp[k] = (s.today.exp[k] || 0) - gain;
    return q;
  }

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
            add(pl, p, -n); sold(p, n); kdv(pl, p, n, pr); inc('Perakende', n * pr); rentOn(pl, n * pr); pl.last = s.t;
            s.mult[p] = clamp(s.mult[p] + 0.00001 * impact(p) * n, 0.6, 1.5);
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
          add(pl, ln.r, Math.round(10 * k * yieldMult(pl.region, pl.b.type, ln.r))); ln.busy = false; ln.carry = ln.prog - rc.t; ln.prog = 0; pl.last = s.t;
        }
        const need = Object.entries(rc.in).find(([x, q]) => (pl.inv[x] || 0) < q * k);
        if (need) { ln.st = 'Girdi yok: ' + qtyTxt(need[0], need[1] * k) + ' ' + P[need[0]].n.toLocaleLowerCase('tr-TR'); continue; }
        if (invTotal(pl) + 13 * k > cap(pl) + Object.values(rc.in).reduce((a, b) => a + b, 0) * k) { ln.st = 'Depo dolu'; continue; }
        const opc = rc.op * k * (1 - wEff(pl, 'mudur'));
        if (s.money < opc) { ln.st = 'Para yetersiz'; continue; }
        for (const x in rc.in) add(pl, x, -rc.in[x] * k);
        exp('Üretim', opc); ln.busy = true; ln.prog = Math.min(ln.carry || 0, rc.t * 0.99); ln.carry = 0; ln.st = '';
      }
    }
    // Pazardaki ilanlarım
    for (const l of s.mine) {
      l.acc += listRate(l.p) * coopSell() * brandList() * buySpeed(l.price / (price(l.p) * qPrem(l.p))) * dt / 60;
      const n = Math.min(Math.floor(l.acc), l.qty);
      if (n > 0) { l.acc -= n; l.qty -= n; const v = n * l.price; sold(l.p, n); inc('Pazar', v); exp('Komisyon', v * COMM); s.mult[l.p] = clamp(s.mult[l.p] - 0.00002 * impact(l.p) * n, 0.6, 1.5); }
    }
    s.mine = s.mine.filter(l => l.qty > 0);
    // Artırmalar
    for (const a of s.auctions.filter(a => s.t >= a.end)) endAuction(a);
    s.auctions = s.auctions.filter(a => s.t < a.end);
    while (Math.floor(s.t / 60) > s.lastHour) { s.lastHour++; hourly(s.lastHour); }
    checkRank();
    if (s.compDue) { s.compDue = false; compDay(); }
    checkQuests();
    checkTut();
    for (let i = 0; i < GOALS.length; i++) if (!s.goals[i] && GOALS[i][1](s)) {
      s.goals[i] = true; reward(GOALS[i][2]);
      news('Hedef tamamlandı: ' + goalText(i), 'Ödül olarak kasana ' + fmt(GOALS[i][2]) + ' eklendi.', true);
    }
  }

  function hourly(h) {
    marketHour(h);
    for (const k of PK) {
      s.mult[k] = clamp(s.mult[k] + (seasonPrice(k) - s.mult[k]) * 0.03 + rnd(-0.012, 0.012), 0.6, 1.5);
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
    dealsHour();
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
    marketDay();
    landDay();
    s.compDue = true;
    financeDay(day);
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
    if (s.money < 0) {
      const fee = -s.money * DEBT_RATE * perk('debt') * coopDebt(); exp('Borç faizi', fee);
      news('Kasan ekside', 'Borcun var: ' + fmt(-s.money) + '. Borca günde %' + (DEBT_RATE * perk('debt') * 100).toLocaleString('tr-TR') + ' faiz işler (yıllık ~%40 ticari kredi); bugün ' + fmt(fee) + ' faiz ödendi. Para yetmeyen üretim hatları durur. Mal sat ya da bir arsanı sisteme devret.', true);
    }
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
      for (let i = 0; i < n; i++) s.listings.push({ id: s.nextId++, p: k, region: pick(home[P[k].b]), qty: Math.round(rnd(2, 8)) * 10, price: Math.round(price(k) * rnd(0.86, 1.14) * 10) / 10, from: sellerOf(k) });
    }
    s.nextListAt = s.t + 240;
  }

  // Arsa değerleri enflasyonla birlikte artar (yılda ~%20, enflasyonun altında). Bir oyun günü bir hafta.
  function landDay() {
    const g = 1 + LAND_GROWTH * 7 / 365;
    s.landIdx = (s.landIdx || 1) * g;
    for (const pl of s.plots) pl.ref *= g;
    for (const a of s.auctions) { a.ref *= g; a.npc = a.npc.map(x => x * g); if (a.plot) a.plot.ref *= g; }
  }

  function spawnAuction(pl, at) {
    const region = pl ? pl.region : at || pick(openR());
    // Yeni arsa: bölgenin büyüklük aralığından, konum çarpanı (yol kenarı, köşe, eğim) ±%20
    const size = pl ? sizeOf(pl) : Math.round(rnd(R[region].size[0], R[region].size[1]) / (region === 'merkez' ? 10 : 1)) * (region === 'merkez' ? 10 : 1);
    const ref = pl ? pl.ref : Math.round(size * R[region].up * (s.landIdx || 1) * rnd(0.8, 1.2) / 1000) * 1000;
    // Artırma tabanı: güncel değerin yarısı, ama bölgenin ortalama değerinin %40'ından az değil
    s.auctions.push({ id: s.nextId++, region, size, ref, start: Math.round(Math.max(ref * 0.5, landBase(region) * 0.4)), bid: 0, bidder: null, end: s.t + 720, npc: [0, 0, 0].map(() => ref * rnd(0.6, 1.1)) });
  }

  function endAuction(a) {
    const name = R[a.region].n + ' arsası';
    if (a.plot) {
      if (a.bidder === 'npc') {
        const gross = Math.min(a.bid, a.ref * 1.5), net = gross * (1 - DEED - LIST_FEE);
        inc('Arsa satışı', net);
        news('Arsan satıldı', name + ' ' + fmt(a.bid) + ' teklifle satıldı. Tapu harcı (%2) ve ilan ücreti (%1) sonrası eline geçen: ' + fmt(net) + '.');
      } else { s.plots.push(a.plot); news('Arsana teklif gelmedi', name + ' satılamadı ve sana geri döndü.'); }
    } else if (a.bidder === 'me') {
      const id = s.nextPlot++;
      s.plots.push({ id, region: a.region, rented: false, size: a.size, ref: a.ref, b: null, inv: {}, last: -1e9, paid: a.bid });
      s.today.exp['Arsa alımı'] = (s.today.exp['Arsa alımı'] || 0) + a.bid;
      exp('Tapu harcı', a.bid * DEED);
      news('Artırmayı kazandın', name + ' ' + fmt(a.bid) + ' karşılığında senin oldu. Tapu harcı olarak ' + fmt(a.bid * DEED) + ' ödendi.', true);
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
    tab(d) { ui.tab = d.v; if (d.v === 'news') { s.unread = 0; ui.away = null; } },
    awayOk() { ui.away = null; },
    tutOff() { s.tutOff = true; },
    loanTake(d) {
      const n = +d.v, amt = Math.min(ui.loanTL || 0, loanLimit()); if (!LOAN_TERMS.includes(n)) return;
      if (amt < 1e5) return toast('Limitin yetersiz ya da tutar çok küçük');
      const r = loanRate() / 52, inst = installment(amt, n, r);
      s.loans.push({ id: s.nextId++, amt, left: amt, n, k: 0, r, inst, miss: 0 }); finInc('Kredi', amt);
      news('Kredi çektin', fmt(amt) + ', ' + n + ' hafta vadeli, yıllık %' + Math.round(r * 5200) + ' faizle. Her gün ' + fmt(inst) + ' taksit kasandan alınacak.');
    },
    loanPay(d) {
      const l = s.loans.find(x => x.id === +d.id); if (!l) return;
      if (s.money < l.left * 1.01) return toast('Para yetersiz');
      exp('Kredi anapara', l.left); exp('Kredi faizi', l.left * 0.01); s.loans = s.loans.filter(x => x !== l); toast('Kredi kapandı');
    },
    dealAcc(d) {
      const D = s.deals, o = D.offers.find(x => x.id === +d.id); if (!o) return;
      if (D.active.length >= DEAL_MAX) return toast('Aynı anda en fazla ' + DEAL_MAX + ' sözleşme');
      D.offers = D.offers.filter(x => x !== o); D.active.push({ ...o, got: 0, due: s.t + o.days * 1440, auto: true });
      toast(o.from + ' ile sözleşme imzalandı');
    },
    dealGive(d) { const x = s.deals.active.find(y => y.id === +d.id); if (!x) return; const n = deliver(x); if (!n) toast('Depolarında ' + P[x.p].n.toLocaleLowerCase('tr-TR') + ' yok'); else toast(qtyTxt(x.p, n) + ' teslim edildi'); s.deals.active = s.deals.active.filter(y => y.got < y.qty); },
    ad(d) { const a = ADS[+d.v]; if (!a) return; if (s.money < a.c) return toast('Para yetersiz'); exp('Reklam', a.c); s.brand = Math.min(100, brand() + a.g * (1 - brand() / 100)); toast(a.n + ' yayında'); },
    rd(d) {
      const p = d.p; if (!P[p] || qual(p) >= QMAX) return; const c = rdCost(p); if (s.money < c) return toast('Para yetersiz');
      exp('Ar-Ge', c); s.qual[p] = qual(p) + 1; news(P[p].n + ' kalitesi ' + qual(p) + '. seviyede', 'Ar-Ge çalışması bitti. Alıcılar ' + P[p].n.toLocaleLowerCase('tr-TR') + ' için artık olağan fiyatın %' + Math.round((qPrem(p) - 1) * 100) + ' fazlasını kabul ediyor.');
    },
    haggle(d) {
      const l = s.listings.find(x => x.id === +d.id); if (!l || l.hg) return; const v = +d.v; l.hg = true;
      const ch = (v <= 0.05 ? 0.55 : 0.25) + (coopIs('alim') ? 0.1 : 0) + (l.price > price(l.p) ? 0.15 : 0);
      if (Math.random() < ch) { l.price = Math.round(l.price * (1 - v) * 10) / 10; toast(l.from + ' %' + v * 100 + ' indirimi kabul etti'); } else toast(l.from + ' pazarlığı reddetti');
    },
    joinH(d) { ensureComp(); const h = HOLDINGS.find(x => x.id === d.v); if (!h || s.comp.holding) return; s.comp.holding = h.id; s.comp.week.hTarget = holdingTarget(); news(h.n + '’na katıldın', 'Ortak haftalık gelir hedefine katkı veriyorsun; üyeler %5 ucuz taşır.'); },
    coopFound(d) {
      ensureComp(); if (s.comp.coop || !COOP_T[d.v]) return;
      const n = (ui.coopName || '').trim(); if (n.length < 3) return toast('Önce kooperatife bir ad ver');
      if (s.money < COOP_FEE) return toast('Para yetersiz');
      exp('Kooperatif', COOP_FEE); s.comp.coop = { n, type: d.v, members: [], asked: {}, founded: s.t }; ui.coopName = '';
      news(n + ' kuruldu', COOP_T[d.v].n + ' olarak kuruldu. Diğer şirketleri davet ettikçe ayrıcalığı güçlenir: ' + COOP_T[d.v].perk.toLocaleLowerCase('tr-TR') + '.');
    },
    coopInvite(d) {
      const c = s.comp && s.comp.coop, x = c && s.comp.npc.find(n => n.n === d.v); if (!x || c.members.includes(x.n)) return;
      const wk = s.comp.week.n, day = Math.floor(s.t / 1440); if (c.asked[x.n] === wk) return;
      if (c.lastInvite === day) return toast('Günde bir davet gönderebilirsin');
      c.lastInvite = day;
      if (Math.random() < coopChance(x)) { c.members.push(x.n); delete c.asked[x.n]; news(x.n + ' kooperatife katıldı', c.n + ' artık ' + (c.members.length + 1) + ' üyeli; ayrıcalık gücü %' + Math.round(coopPow() * 100) + '.'); }
      else { c.asked[x.n] = wk; toast(x.n + ' daveti reddetti'); }
    },
    coopClose() { if (!s.comp || !s.comp.coop) return; if (!ui.confirmCoop) { ui.confirmCoop = true; setTimeout(() => { ui.confirmCoop = false; }, 4000); return; } ui.confirmCoop = false; news(s.comp.coop.n + ' dağıtıldı', 'Kooperatif kapandı; ayrıcalıkları sona erdi.'); s.comp.coop = null; },
    leaveH() { if (!s.comp || !s.comp.holding) return; const h = HOLDINGS.find(x => x.id === s.comp.holding); s.comp.holding = null; s.comp.week.hTarget = 0; toast(h.n + '’ndan ayrıldın'); },
    trade(d) {
      const tl = d.side === 'sellall' ? Infinity : ui.invTL;
      if (!(tl > 0)) return toast('Önce bir tutar yaz');
      const q = trade(d.asset, d.side === 'buy' ? 'buy' : 'sell', tl);
      if (!q) return toast(d.side === 'buy' ? 'Para yetersiz' : 'Elinde yok');
      toast(d.asset === 'DEP' ? (d.side === 'buy' ? 'Mevduata yatırıldı' : 'Mevduattan çekildi') : assetName(d.asset) + ': ' + q.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' ' + unitName(d.asset) + (d.side === 'buy' ? ' alındı' : ' satıldı'));
    },
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
    sellw(d) { const pl = plot(+d.plot), q = pl.inv[d.p]; sold(d.p, q); inc('Toptancı', q * wSell(pl, d.p)); rentOn(pl, q * wSell(pl, d.p)); s.mult[d.p] = clamp(s.mult[d.p] - 0.00002 * impact(d.p) * q, 0.6, 1.5); add(pl, d.p, -q); pl.last = s.t; },
    list(d) { const pl = plot(+d.plot), q = pl.inv[d.p]; s.mine.push({ id: s.nextId++, p: d.p, qty: q, price: Math.round(price(d.p) * qPrem(d.p) * ui.listMul * 10) / 10, acc: 0 }); add(pl, d.p, -q); pl.last = s.t; },
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
      s.auctions.push({ id: s.nextId++, region: pl.region, size: sizeOf(pl), ref: pl.ref, start: Math.round(pl.ref * 0.7), bid: 0, bidder: null, end: s.t + 720, npc: [0, 0, 0].map(() => pl.ref * rnd(0.6, 1.25)), plot: pl });
      if (ui.dest === pl.id) ui.dest = s.plots[0].id;
    },
  };
  const C = {
    recipe(el) { const ln = plot(+el.dataset.plot).b.lines[+el.dataset.i]; ln.r = el.value || null; ln.busy = false; ln.prog = 0; },
    price(el) { const v = parseFloat(el.value.replace(',', '.')) * rate(s.cur), pl = plot(+el.dataset.plot); if (v > 0) { pl.b.prices[el.dataset.p] = v; if (pl.b.rule[el.dataset.p]) pl.b.rule[el.dataset.p].mode = 'elle'; } },
    rule(el) { const pl = plot(+el.dataset.plot), p = el.dataset.p, r = pl.b.rule[p] || { mode: 'elle', margin: 0.1 }; r[el.dataset.f] = el.dataset.f === 'mode' ? el.value : +el.value; pl.b.rule[p] = r; applyRule(pl, p); },
    auto(el) { const pl = plot(+el.dataset.plot); pl.b.auto[el.dataset.p] = +el.value; autoRestock(pl, el.dataset.p); },
    lineAuto(el) { const pl = plot(+el.dataset.plot), ln = pl.b.lines[+el.dataset.i]; ln.auto = +el.value; if (ln.auto && ln.r) autoInputs(pl, ln); },
    out(el) { const pl = plot(+el.dataset.plot); pl.b.out[el.dataset.p] = el.value; if (el.value) autoOut(pl); },
    addShelf(el) { if (!el.value) return; const pl = plot(+el.dataset.plot), p = el.value; if (shelf(pl).length >= shelfMax(pl)) { el.value = ''; return toast('Raf dolu: dükkânı yükselt ya da satış görevlisi al'); } pl.b.auto[p] = pl.b.auto[p] || 1.1; pl.b.rule[p] = pl.b.rule[p] || { mode: 'ucuz', margin: 0.1 }; autoRestock(pl, p); applyRule(pl, p); },
    qty(el) { ui.qty = clamp(parseInt(el.value, 10) || 1, 1, 500); },
    dest(el) { ui.dest = +el.value; },
    listMul(el) { ui.listMul = +el.value; },
    sel(el) { ui.sel[el.dataset.k] = el.value; },
    cur(el) { if (CUR[el.value]) s.cur = el.value; },
    loanAmt(el) { ui.loanTL = clamp(parseFloat(el.value.replace(',', '.')) || 0, 0, 1e12) * rate(s.cur); },
    dealAuto(el) { const x = s.deals.active.find(y => y.id === +el.dataset.id); if (x) x.auto = el.checked; },
    coopName(el) { ui.coopName = el.value.slice(0, 28); },
    invAmt(el) { ui.invTL = clamp(parseFloat(el.value.replace(',', '.')) || 0, 0, 1e12) * rate(s.cur); },
  };
  const eligible = c => s.plots.filter(pl => pl.b && pl.region === Object.keys(s.cands).find(r => s.cands[r].includes(c)) && WK[c.type].b.includes(pl.b.type) && crew(pl).length < slots(pl));
  const ic = (k, n) => (window.TezgahArt ? window.TezgahArt.icon(k, n) : '');
  // Harita için görünüm modeli: her bölgede oyuncunun arsaları ve artırmadaki arsalar
  function mapModel() {
    const regions = {};
    for (const r of openR()) regions[r] = { name: R[r].n, plots: [], auctions: s.auctions.filter(a => a.region === r && !a.plot) };
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
  const pixiMap = () => window.TezgahMap && window.TezgahMap.ok;
  const focusFromMap = id => { A.focus({ plot: id }); render(); focusCard(); };

  // ---------- Görünüm ----------
  let toastT = 0;
  function toast(msg) { const el = document.getElementById('toast'); el.textContent = msg; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { el.hidden = true; }, 2200); }
  const btn = (label, action, data = {}, cls = '') => `<button type="button" class="btn ${cls}" data-a="${action}" ${Object.entries(data).map(([k, v]) => `data-${k}="${esc(v)}"`).join(' ')}>${label}</button>`;
  const clock = () => { const d = Math.floor(s.t / 1440) + 1, h = Math.floor(s.t / 60) % 24; return `Gün ${d} · ${curSeason().n} · ${String(h).padStart(2, '0')}:00`; };
  const hoursLeft = a => { const h = (a.end - s.t) / 60; return h <= 1 ? '1 saatten az' : Math.ceil(h) + ' saat'; };
  const trend = k => { const m = s.mult[k]; return m > 1.04 ? `<span class="up">▲ %${Math.round((m - 1) * 100)}</span>` : m < 0.96 ? `<span class="down">▼ %${Math.round((1 - m) * 100)}</span>` : '<span class="muted">olağan</span>'; };
  function spark(k) { const h = s.hist[k]; if (h.length < 2) return ''; const pts = h.map((v, i) => `${(i / (h.length - 1) * 78 + 1).toFixed(1)},${(21 - (v - 0.6) / 0.9 * 20).toFixed(1)}`).join(' '); return `<svg class="spark" viewBox="0 0 80 22" width="80" height="22" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`; }

  function plotCard(pl) {
    const reg = R[pl.region];
    let h = `<div class="card"><div class="row head"><h3>Arsa ${pl.id} · ${reg.n}</h3><span class="tag ${pl.rented ? '' : 'own'}">${pl.rented ? 'Kiralık' : 'Senin'}</span></div><p class="muted small">${reg.note}</p><p class="small">${landTxt(pl)} · ${pl.rented ? 'kira: cironun %' + RENT * 100 + '’i (ortakçılık usulü)' : 'değeri ' + fmt(pl.ref) + ' · emlak vergisi ' + fmt(dailyTax(pl)) + '/gün'}</p>`;
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
    if (prod) h += `<p class="muted small">Parti ${10 * k} birim · ${b.lines.length} hat · usta parti süresini kısaltır${parts.length ? ' · ' + (parts.length + 1) + ' arsaya yayılıyor' : ''}</p>`;
    h += '<div class="row wrap">';
    if (b.level < 3) h += btn(prod ? `Kapasiteyi artır: parti ${10 * (k + 0.5 * B[b.type].scale)} birim · ${fmt(bt.cost * b.level)}` : `Yükselt ${fmt(bt.cost * b.level)}`, 'upgrade', { plot: pl.id });
    h += btn(`Yık (iade ${fmt(b.spent * (s.freeSwap ? 1 : 0.5))})`, 'demolish', { plot: pl.id }, 'ghost') + '</div>';
    if (prod && b.level >= 3 && b.lines.length < 3) {
      const free = freePlots(pl);
      h += free.length ? `<div class="row wrap small"><label for="ex${pl.id}">Yeni hat için genişle</label><select id="ex${pl.id}" data-c="sel" data-k="ex${pl.id}">${free.map(o => `<option value="${o.id}" ${ui.sel['ex' + pl.id] == o.id ? 'selected' : ''}>Arsa ${o.id}</option>`).join('')}</select>${btn('Genişlet ' + fmt(bt.cost), 'expand', { plot: pl.id })}</div><p class="muted small">Bina seçilen boş arsaya yayılır ve ikinci bir hat açılır; bina tek kalır.</p>`
        : `<p class="muted small">Yeni hat için ${R[pl.region].n} bölgesinde boş bir arsan olmalı.</p>`;
    } else if (prod && b.level < 3) h += '<p class="muted small">3. seviyeden sonra bina, aynı bölgedeki boş bir arsaya genişleyerek yeni hat açabilir.</p>';
    b.lines.forEach((ln, i) => {
      const opts = PK.filter(k => P[k].b === b.type).map(k => `<option value="${k}" ${ln.r === k ? 'selected' : ''}>${P[k].n}${Object.keys(P[k].in).length ? ' ← ' + Object.entries(P[k].in).map(([x, q]) => qtyTxt(x, q * batch(pl)) + ' ' + P[x].n.toLocaleLowerCase('tr-TR')).join(', ') : ''}</option>`).join('');
      h += `<div class="line"><label class="small muted" for="rc${pl.id}_${i}">Hat ${i + 1}</label><select id="rc${pl.id}_${i}" data-c="recipe" data-plot="${pl.id}" data-i="${i}"><option value="">Tarif seç</option>${opts}</select><div class="bar"><i data-prog="${pl.id}:${i}"></i></div>${ln.r ? `<span class="small muted">${lineInfo(pl, ln.r)}</span>` : ''}<span class="small ${ln.busy ? 'muted' : 'warn'}">${ln.busy ? 'Üretiyor · parti gideri ' + fmt(P[ln.r].op * batch(pl)) : esc(ln.st || '') + (ln.auto && ln.st && ln.st.startsWith('Girdi') ? ' · bu fiyata uygun satıcı yok' : '')}</span>${ln.r && Object.keys(P[ln.r].in).length ? `<label class="small muted" for="la${pl.id}_${i}">Girdi bitince</label><select id="la${pl.id}_${i}" data-c="lineAuto" data-plot="${pl.id}" data-i="${i}">${[[0, 'Elle alırım'], [1, 'Olağan fiyata kadar al'], [1.1, 'Olağanın %10 fazlasına kadar al'], [1.35, 'Toptancı dahil al (%35 fazlası)']].map(([v, l]) => `<option value="${v}" ${(ln.auto || 0) === v ? 'selected' : ''}>${l}</option>`).join('')}</select>` : ''}</div>`;
    });
    const items = b.type === 'dukkan' ? shelf(pl) : [...new Set([...b.lines.filter(l => l.r).map(l => l.r), ...Object.keys(pl.inv), ...Object.keys(b.out || {}).filter(p => b.out[p])])];
    if (!items.length) h += `<p class="muted small">${b.type === 'dukkan' ? 'Raflar boş. Pazar sekmesinden mal al ya da kendi üretimini buraya taşı.' : 'Depo boş.'}</p>`;
    const others = otherPlots(pl);
    if (items.length && others.length) h += `<div class="row small"><label for="mv${pl.id}">Taşıma hedefi</label><select id="mv${pl.id}" data-c="sel" data-k="mv${pl.id}">${others.map(o => `<option value="${o.id}" ${ui.sel['mv' + pl.id] == o.id ? 'selected' : ''}>Arsa ${o.id} · ${R[o.region].n}</option>`).join('')}</select></div>`;
    for (const p of items) {
      const q = pl.inv[p] || 0;
      h += `<div class="item"><div class="row"><b class="named">${ic(p, 26)}${P[p].n}</b><span class="num">${q.toLocaleString('tr-TR')} × ${P[p].u} <span class="muted small">(${qtyTxt(p, q)})</span></span></div>`;
      if (b.type === 'dukkan' && P[p].d) h += shopControls(pl, p);
      else if (b.type === 'dukkan') h += '<p class="warn small">Şehir halkı bu ürünü almaz; pazarda sat ya da fabrikaya taşı.</p>';
      else h += outControls(pl, p);
      if (q > 0) h += `<div class="row wrap">${btn('Toptancıya sat ' + fmt(q * wSell(pl, p)), 'sellw', { plot: pl.id, p })}${btn('Pazara ilan ver', 'list', { plot: pl.id, p }, 'ghost')}${others.length ? btn('Taşı', 'move', { plot: pl.id, p }, 'ghost') : ''}</div>`;
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
    if (cur.startsWith('ship:')) { const to = plot(+cur.slice(5)); note = to ? `10 birim birikince taşınır · birim taşıma ${fmt1(trans(1, p, pl.region, to.region))}` : 'Hedef arsa artık yok'; }
    else if (cur.startsWith('list:')) { const l = s.mine.find(x => x.auto && x.plot === pl.id && x.p === p); note = (l ? `Pazarda ${l.qty} × ${P[p].u}, birimi ${fmt1(l.price)} · ` : 'Üretim çıktıkça ilana eklenir · ') + speedNote(+cur.slice(5)); }
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
        <label for="pr${id}">Raf fiyatı (${sym()})</label><input id="pr${id}" class="price" inputmode="decimal" data-c="price" data-plot="${pl.id}" data-p="${p}" value="${disp(pr).toFixed(2)}" ${r.mode !== 'elle' ? 'disabled' : ''}>
        <label for="au${id}">Stok azalınca</label><select id="au${id}" data-c="auto" data-plot="${pl.id}" data-p="${p}">${opt([[0, 'Elle alırım'], [1, 'Olağan fiyata kadar al'], [1.1, 'Olağanın %10 fazlasına kadar al'], [1.35, 'Toptancı dahil al (%35 fazlası)']], au)}</select>
      </div>
      <p class="small">${speedNote(pr / retailRef(p))} <span class="muted">(piyasa fiyatı ${fmt1(retailRef(p))})</span></p>
      <p class="muted small">Birim maliyetin ${fmt1(shopCost(pl, p))} · saatte ≈${shopRate(pl, p).toFixed(1)} satış${au ? ' · stok 20’nin altına inince 60’a tamamlanır' : ''}</p>`;
  }

  function viewPlots() {
    const out = [];
    const next = GOALS.findIndex((g, i) => !s.goals[i]);
    if (ui.away) out.push(['away', awayCard(ui.away)]);
    if (tutOn()) out.push(['tut', tutCard()]);
    else out.push(['goal', next < 0 ? `<div class="goal"><span class="small">Sıradaki unvan</span><b>${RANKS[rankNow() + 1] ? RANKS[rankNow() + 1].n + ' ol: net değer ' + fmt(RANKS[rankNow() + 1].at) : 'En üst unvandasın. Büyümeye devam et'}</b></div>` : `<div class="goal"><span class="small">Sıradaki hedef ${next + 1}/${GOALS.length} · ödül ${fmt(GOALS[next][2])}</span><b>${goalText(next)}</b></div>`]);
    const hint = '<p class="muted small maphint">Haritada bir binaya dokununca kartına gidersin. Ünlem işareti, binanın ilgilenilmesi gereken bir durumu olduğunu gösterir.</p>';
    // PixiJS haritası kendi tuvallerini yönetir; buradaki kutu sabit kalır ve render() içinde doldurulur
    if (pixiMap()) out.push(['map', '<div class="map" data-pixi></div>' + hint]);
    else if (window.TezgahArt) out.push(['svgmap', window.TezgahArt.map(mapModel()) + hint]);
    out.push(['lm', `<div class="row small"><label for="listMul">Pazara ilan fiyatı</label><select id="listMul" data-c="listMul"><option value="0.9" ${ui.listMul === 0.9 ? 'selected' : ''}>olağanın %10 altı (%20 daha hızlı satar)</option><option value="1" ${ui.listMul === 1 ? 'selected' : ''}>olağan fiyat</option><option value="1.1" ${ui.listMul === 1.1 ? 'selected' : ''}>olağanın %10 üstü (%20 daha yavaş satar)</option></select></div>`]);
    for (const pl of s.plots) out.push(['p' + pl.id, plotCard(pl)]);
    return out;
  }

  function awayCard(a) {
    const i = Object.entries(a.inc), e = Object.entries(a.exp);
    const ti = i.reduce((x, y) => x + y[1], 0), te = e.reduce((x, y) => x + y[1], 0);
    const h = Math.floor(a.min / 60), m = a.min % 60, dur = (h ? h + ' saat' : '') + (h && m ? ' ' : '') + (m ? m + ' dakika' : '');
    const rows = i.map(([k, v]) => `<tr><td>${k}</td><td class="up">${fmt(v)}</td></tr>`).join('') + e.map(([k, v]) => `<tr><td>${k}</td><td class="down">${fmt(-v)}</td></tr>`).join('');
    return `<div class="card away"><div class="row head"><h3>Sen yokken</h3><span class="muted small">${dur} geçti</span></div>`
      + (rows ? `<table class="t">${rows}<tr><th>Net</th><th class="${ti - te < 0 ? 'down' : 'up'}">${fmt(ti - te)}</th></tr></table>` : '<p class="muted small">Binaların boştaydı; para girişi ya da çıkışı olmadı.</p>')
      + `<p class="muted small">${a.capped ? 'Uygulama kapalıyken en fazla bir oyun günü işler. ' : ''}${a.news ? `Gazetede ${a.news} yeni haber var.` : ''}</p>`
      + `<div class="row wrap">${btn('Tamam', 'awayOk')}${a.news ? btn('Gazeteyi aç', 'tab', { v: 'news' }, 'ghost') : ''}</div></div>`;
  }

  function viewMarket() {
    const out = [], dst = plot(ui.dest) || s.plots[0];
    out.push(['dest', `<div class="card"><div class="row wrap"><label for="dest">Teslim arsası</label><select id="dest" data-c="dest">${s.plots.filter(p => !p.part).map(p => `<option value="${p.id}" ${p.id === dst.id ? 'selected' : ''}>Arsa ${p.id} · ${R[p.region].n}${p.b ? ' · ' + B[p.b.type].n : ' · boş'}</option>`).join('')}</select><label for="qty">Miktar (birim)</label><input id="qty" class="price" inputmode="numeric" data-c="qty" value="${ui.qty}"></div><p class="muted small">Fiyatlar teslim fiyatıdır: mal bedeli ve ${R[dst.region].n} bölgesine taşıma dahil.${transMult() > 1 ? ' Taşıma ücretleri şu an zamlı.' : ''}</p></div>`]);
    if (s.mine.length) out.push(['mine', '<div class="card"><h3>İlanlarım</h3>' + s.mine.map(l => `<div class="row"><span>${P[l.p].n} · ${l.qty} × ${P[l.p].u} · ${fmt1(l.price)}${l.auto ? ' · otomatik' : ''}<br><span class="small">${speedNote(l.price / price(l.p))}</span></span>${btn('Geri çek', 'unlist', { id: l.id }, 'ghost')}</div>`).join('') + '<p class="muted small">Satışlardan %3 komisyon kesilir.</p></div>']);
    for (const k of PK) {
      const wU = price(k) * wBuy() + trans(1, k, dst.region, dst.region);
      let h = `<div class="card"><div class="row head"><h3 class="named">${ic(k, 28)}${P[k].n}</h3><span class="small">${trend(k)}</span></div><p class="muted small">Olağan fiyat ${fmt1(price(k))} / ${P[k].u} · ${WNAME[P[k].w]} yük · 1. seviye ${B[P[k].b].n.toLocaleLowerCase('tr-TR')}: ${qtyTxt(k, 10 * B[P[k].b].scale)} / ${durTxt(P[k].t)}${Object.keys(P[k].in).length ? ' (' + Object.entries(P[k].in).map(([x, q]) => qtyTxt(x, q * B[P[k].b].scale) + ' ' + P[x].n.toLocaleLowerCase('tr-TR')).join(' + ') + ')' : ''}</p><div class="row"><span>Sistem toptancısı</span><span class="num">${fmt1(wU)}</span>${btn('Al', 'buy', { p: k })}</div>`;
      for (const l of s.listings.filter(x => x.p === k)) {
        const u = l.price + trans(1, k, l.region, dst.region);
        h += `<div class="row"><span>${esc(l.from || R[l.region].n + ' satıcısı')} · ${R[l.region].n} · ${l.qty} × ${P[k].u} (${qtyTxt(k, l.qty)})${l.hg ? ' <span class="small muted">· pazarlık yapıldı</span>' : ''}</span><span class="num ${u < wU ? 'up' : ''}">${fmt1(u)}</span>${btn('Al', 'buy', { p: k, id: l.id })}</div>${l.hg ? '' : `<div class="row wrap small haggle"><span class="muted">Pazarlık:</span>${btn('%5 indirim iste', 'haggle', { id: l.id, v: 0.05 }, 'ghost')}${btn('%10 indirim iste', 'haggle', { id: l.id, v: 0.1 }, 'ghost')}</div>`}`;
      }
      out.push(['m' + k, h + '</div>']);
    }
    return out;
  }

  function viewAuction() {
    const out = [];
    out.push(['info', '<p class="muted small">Arsalar yalnızca isimsiz açık artırmayla satılır. Teklifin kadar para teminat olarak bloke edilir; geçilirsen iade edilir. Son saatte gelen teklif süreyi uzatır. Arsa değerleri yılda yaklaşık %20 artar; alıcı ve satıcı %2 tapu harcı öder.</p>']);
    for (const a of s.auctions) {
      const next = Math.ceil(Math.max(a.start, a.bid * 1.05));
      const who = a.plot ? 'Senin ilanın' : a.bidder === 'me' ? 'En yüksek teklif sende' : a.bidder ? 'Başka bir teklif önde' : 'Henüz teklif yok';
      out.push(['a' + a.id, `<div class="card"><div class="row head"><h3>${R[a.region].n} arsası</h3><span class="tag ${a.bidder === 'me' ? 'own' : ''}">${who}</span></div><p class="muted small">${R[a.region].note} · ${landTxt(a)} · referans değer ${fmt(a.ref)} · <span class="${a.end - s.t < 60 ? 'warn' : ''}">kalan süre ${hoursLeft(a)}</span></p><div class="row"><span>Güncel teklif</span><span class="num">${a.bid ? fmt(a.bid) : '—'}</span>${a.plot || a.bidder === 'me' ? '' : btn('Teklif ver ' + fmt(next), 'bid', { id: a.id })}</div>${a.plot ? '' : `<p class="muted small">Kazanırsan teklifin üstüne %2 tapu harcı (${fmt(Math.max(next, a.bid) * DEED)}) ödersin.</p>`}</div>`]);
    }
    if (!s.auctions.length) out.push(['none', '<p class="muted">Şu an açık artırma yok. Yenisi gün başında açılır.</p>']);
    const owned = s.plots.filter(p => !p.rented);
    if (owned.length) out.push(['hd', '<h2>Arsalarını sat</h2>']);
    for (const pl of owned) {
      if (pl.part || (pl.b && (pl.b.parts || []).length)) { out.push(['s' + pl.id, `<div class="card"><div class="row head"><h3>Arsa ${pl.id} · ${R[pl.region].n}</h3><span class="muted small">emlak vergisi ${fmt(dailyTax(pl))}/gün</span></div><p class="muted small">Bu arsa birden çok arsaya yayılan bir binanın parçası. Satmak için önce binayı yık.</p></div>`]); continue; }
      const mv = +(ui.sel['ss' + pl.id] || 0), q = systemSaleQuote(pl, mv), others = otherPlots(pl);
      let h = `<div class="card"><div class="row head"><h3>Arsa ${pl.id} · ${R[pl.region].n}</h3><span class="muted small">emlak vergisi ${fmt(dailyTax(pl))}/gün</span></div><table class="t"><tr><td>Arsa (referans ${fmt(pl.ref)})</td><td>${fmt(q.land)}</td></tr><tr><td>Bina, harcananın yarısı</td><td>${fmt(q.bld)}</td></tr>`;
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
    out.push(['rk', '<div class="card"><h3>Servet basamakları</h3><p class="muted small">Net değerin her eşiği geçtiğinde unvanın kalıcı olarak yükselir ve bir ayrıcalık açılır. Oyunun sonu yok; unvanın diğer oyunculara görünür.</p>' + RANKS.map((r, i) => `<div class="row"><span class="${i <= rankNow() ? 'done' : ''}"><b>${r.n}</b><br><span class="small muted">${r.perk}</span></span><span class="num small ${i <= rankNow() ? 'muted' : ''}">${i <= rankNow() ? '✓ ' : ''}${fmt(r.at)}</span></div>`).join('') + '</div>']);
    out.push(['gl', '<div class="card"><h3>Hedefler</h3>' + GOALS.map((g, i) => `<div class="row"><span class="${s.goals[i] ? 'done' : ''}">${goalText(i)}</span><span class="num small ${s.goals[i] ? 'muted' : ''}">${s.goals[i] ? '✓ ' : ''}${fmt(g[2])}</span></div>`).join('') + '</div>']);
    out.push(['credit', '<p class="muted small">Bina, harita ve ürün görselleri bu oyun için üretildi. Bina türü rozetleri: game-icons.net (Lorc, Delapouite ve katkıda bulunanlar), CC BY 3.0. Harita çizimi: PixiJS (MIT).</p>']);
    out.push(['rs', `<div class="row">${btn(ui.confirmReset ? 'Emin misin? Tekrar dokun' : 'Oyunu sıfırla', 'reset', {}, 'ghost')}</div>`]);
    return out;
  }

  const sparkVals = h => { if (h.length < 2) return ''; const lo = Math.min(...h), hi = Math.max(...h), r = hi - lo || 1; const pts = h.map((v, i) => `${(i / (h.length - 1) * 78 + 1).toFixed(1)},${(21 - (v - lo) / r * 20).toFixed(1)}`).join(' '); return `<svg class="spark" viewBox="0 0 80 22" width="80" height="22" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`; };
  const pct = r => `<span class="${r > 0.0005 ? 'up' : r < -0.0005 ? 'down' : 'muted'}">${r > 0 ? '▲' : r < 0 ? '▼' : ''} %${Math.abs(r * 100).toFixed(1)}</span>`;
  function assetRow(a) {
    const m = s.mkt, q = s.pf[a] || 0, cost = s.pf.cost[a] || 0, val = q * bidPx(a), pl = val - cost;
    const sub = a === 'XAU' ? `Ons ${'$' + Math.round(m.px.ons).toLocaleString('tr-TR')} · alış-satış farkı %${GOLD.spread * 100}`
      : FXP[a] ? `Kur farkı %${(FX_SPREAD * 100).toFixed(1)}` : `${STOCKS[a].sec} · temettü verimi %${(STOCKS[a].div * 100).toFixed(1)} · bağlı ürünler: ${STOCKS[a].ps.map(p => P[p].n).join(', ')}`;
    return `<div class="item"><div class="row"><span><b>${STOCKS[a] ? a + ' · ' : ''}${assetName(a)}</b><br><span class="small muted">${sub}</span></span><span class="num right">${fmt1(m.px[a])}<br><span class="small">${pct(m.px[a] / m.open[a] - 1)}</span></span></div>`
      + `<div class="row small"><span class="muted">${q ? `Elinde ${q.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ${unitName(a)} · ${fmt(val)} · <span class="${pl >= 0 ? 'up' : 'down'}">${pl >= 0 ? '+' : ''}${fmt(pl)}</span>` : 'Elinde yok'}</span>${sparkVals(m.hist[a])}</div>`
      + `<div class="row wrap">${btn('Al', 'trade', { asset: a, side: 'buy' })}${q ? btn('Sat', 'trade', { asset: a, side: 'sell' }, 'ghost') + btn('Tümünü sat', 'trade', { asset: a, side: 'sellall' }, 'ghost') : ''}</div></div>`;
  }
  function viewInvest() {
    const out = [], m = s.mkt, pv = portfolioValue(), ir = m.idx / m.idxHist[Math.max(0, m.idxHist.length - 13)] - 1;
    out.push(['sum', `<div class="card"><div class="row"><span>Yatırımların</span><b class="num">${fmt(pv)}</b></div><div class="row"><span>Kasa</span><span class="num">${fmt(s.money)}</span></div>`
      + `<div class="row wrap small"><label for="invAmt">İşlem tutarı (${sym()})</label><input id="invAmt" class="price" inputmode="decimal" data-c="invAmt" value="${+disp(ui.invTL).toFixed(s.cur === 'TRY' ? 0 : 2)}"></div>`
      + `<p class="muted small">Al ve Sat düğmeleri bu tutar kadar işlem yapar. Bu piyasa oyun içidir ve gerçek piyasayı izlemez; bir oyun günü piyasada bir haftaya denk gelir.</p></div>`]);
    out.push(['dep', `<div class="card"><h3>Vadeli mevduat</h3><div class="row"><span>Yıllık faiz %${Math.round(DEPOSIT_RATE * 100)} · %15 stopaj sonrası her gün eklenir</span><b class="num">${fmt(s.pf.DEP || 0)}</b></div><div class="row wrap">${btn('Yatır', 'trade', { asset: 'DEP', side: 'buy' })}${s.pf.DEP > 0 ? btn('Çek', 'trade', { asset: 'DEP', side: 'sell' }, 'ghost') + btn('Tümünü çek', 'trade', { asset: 'DEP', side: 'sellall' }, 'ghost') : ''}</div></div>`]);
    out.push(['fx', '<div class="card"><h3>Döviz ve altın</h3>' + ['USD', 'EUR', 'XAU'].map(assetRow).join('') + '</div>']);
    out.push(['st', `<div class="card"><div class="row head"><h3>Tezgâh Borsası</h3><span class="small num">TZ-30 ${Math.round(m.idx).toLocaleString('tr-TR')} ${pct(ir)}</span></div><p class="muted small">Kurgusal şirketler. Hisseler genel piyasayla birlikte hareket eder; bağlı oldukları ürünlerin fiyatı ve gazetedeki olaylar da etkiler. Alımda ve satışta %${(COMMISSION * 100).toFixed(2)} komisyon alınır.</p>` + Object.keys(STOCKS).map(assetRow).join('') + '</div>']);
    return out;
  }

  function viewCrew() {
    const out = [], total = s.workers.reduce((a, w) => a + w.wage, 0);
    out.push(['info', `<div class="card"><div class="row"><span>Günlük maaş toplamı</span><b class="num">${fmt(total)}</b></div><p class="muted small">İşçi zorunlu değil. Bina boşta kalırsa işçi maaşını kazandırmaz. İşçi 7 çalışma gününde bir yıldız atlar ve maaşı yükselir.</p></div>`]);
    if (s.workers.length) out.push(['mine', '<div class="card"><h3>Çalışanların</h3>' + s.workers.map(w => { const pl = plot(w.plot); return `<div class="row"><span>${WK[w.type].n} ${esc(w.name)} ${stars(w.star)}<br><span class="small muted">Arsa ${w.plot}${pl ? ' · ' + R[pl.region].n : ''} · ${WK[w.type].desc(WK[w.type].eff[w.star - 1])} · ${w.star < 3 ? 'sonraki yıldıza ' + (7 - (w.xp || 0)) + ' gün' : 'en üst yıldız'}</span></span><span class="num">${fmt(w.wage)}/gün</span>${btn('Bırak', 'fire', { id: w.id }, 'ghost')}</div>`; }).join('') + '</div>']);
    for (const r of openR()) {
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

  // ---------- Rekabet: sezon, sektör hakimiyeti, haftalık görevler, holdingler ----------
  // Çevrim içi sürümde rakipler gerçek oyunculardır. Demoda sanal şirketler, bot simülasyonundaki
  // büyüme eğrisine (₺2,5 mn → ~₺1 mlr, 85 oyun günü; pazar ~₺3 mlr civarında doyar) göre büyür.
  const SEASON_DAYS = 60, WEEK = 7;
  const HOLDINGS = [
    { id: 'anadolu', n: 'Anadolu Birliği', note: 'Tarım ve gıda ağırlıklı' },
    { id: 'ege', n: 'Ege Ortaklığı', note: 'Tekstil ve ticaret ağırlıklı' },
    { id: 'karadeniz', n: 'Karadeniz Grubu', note: 'Maden ve sanayi ağırlıklı' },
  ];
  const NPC = [
    ['Çınar Ticaret', 'anadolu', ['bugday', 'un']], ['Bereketli Gıda', 'anadolu', ['sut', 'peynir']], ['Akıncı Un', 'anadolu', ['un', 'ekmek']], ['Sarıkız Süt', 'anadolu', ['sut', 'peynir']],
    ['Ege Lif', 'ege', ['pamuk', 'kumas']], ['Mavi Kıyı Tekstil', 'ege', ['kumas', 'giysi']], ['Gökçe Pazarlama', 'ege', ['giysi', 'ekmek']],
    ['Toroslu Maden', 'karadeniz', ['komur', 'demir']], ['Kayalar Çelik', 'karadeniz', ['celik', 'demir']], ['Demirhan Alet', 'karadeniz', ['alet', 'celik']], ['Kuzeyli Sanayi', 'karadeniz', ['komur', 'alet']],
  ];
  const KING = { bugday: 'Buğday Ağası', sut: 'Süt Kralı', pamuk: 'Pamuk Ağası', komur: 'Kömür Baronu', demir: 'Demir Baronu', un: 'Un Kralı', kumas: 'Kumaş Kralı', celik: 'Çelik Baronu', ekmek: 'Ekmek Kralı', peynir: 'Peynir Kralı', giysi: 'Moda Kralı', alet: 'Alet Baronu' };
  const MEDAL = ['Altın', 'Gümüş', 'Bronz'];
  const HOLD_PERK = 0.95;  // holding üyeleri ortak nakliye anlaşmasıyla %5 ucuz taşır

  function initComp(keep) {
    const k = keep || {};
    s.comp = {
      season: k.season || 1, start: Math.floor(s.t / 1440), badges: k.badges || [], best: k.best || null,
      holding: k.holding || null, coop: k.coop || null, kings: [],
      npc: NPC.map(([n, h, f]) => ({ n, h, f, nw: START_MONEY * rnd(0.9, 1.1), skill: rnd(0.7, 1.3), vol: {} })),
      sold: {}, week: null,
    };
    for (const p of PK) s.comp.sold[p] = [0];
    newWeek();
  }
  const ensureComp = () => { if (!s.comp) initComp(); };
  // Satış kaydı: sektör payı ve görevler için (perakende, pazar ilanı, toptancı)
  function sold(p, n) { if (!s.comp) return; const a = s.comp.sold[p]; a[a.length - 1] += n; if (s.comp.week) s.comp.week.sold[p] = (s.comp.week.sold[p] || 0) + n; }
  const soldWeek = p => s.comp.sold[p].reduce((a, b) => a + b, 0);
  // Sanal şirketin bir üründe haftalık satışı: net değerinin ~%30'u kadar günlük ciro, iki odak ürüne bölünür
  const npcVol = (c, p) => c.f.includes(p) ? c.nw * 0.3 * WEEK * 0.5 / P[p].ref * c.skill : 0;
  const seasonDay = () => Math.floor(s.t / 1440) - s.comp.start + 1;
  function board() {
    const me = { n: 'Sen', me: true, nw: netWorth(), h: s.comp.holding };
    return [me, ...s.comp.npc].sort((a, b) => b.nw - a.nw);
  }
  function holdingBoard() {
    const all = board();
    return HOLDINGS.map(h => ({ ...h, members: all.filter(c => c.h === h.id), nw: all.filter(c => c.h === h.id).reduce((a, c) => a + c.nw, 0) })).sort((a, b) => b.nw - a.nw);
  }
  function sectorLeaders() {
    return PK.map(p => {
      const me = soldWeek(p); let top = { n: 'Sen', v: me, me: true };
      for (const c of s.comp.npc) { const v = npcVol(c, p); if (v > top.v) top = { n: c.n, v }; }
      return { p, top, me };
    });
  }

  // Haftalık görev zinciri: üç görev; hepsi bitince zincir ödülü. Ödüller net değerle ölçeklenir.
  function newWeek() {
    const nw = Math.max(netWorth(), START_MONEY), mine = [...new Set(s.plots.flatMap(pl => pl.b && pl.b.lines ? pl.b.lines.map(l => l.r).filter(Boolean) : []))];
    const p = mine.length ? mine[Math.floor(Math.random() * mine.length)] : 'bugday';
    const want = Math.max(50, Math.round((soldWeek(p) || 10 * 24 * 3) * 1.3 / 10) * 10);
    const pool = [
      { k: 'sell', p, n: want, t: `${P[p].n} sat: ${qtyTxt(p, want)}` },
      { k: 'income', amt: Math.round(nw * 0.5 / 1e5) * 1e5, t: `Bu hafta ${fmt(Math.round(nw * 0.5 / 1e5) * 1e5)} ticari gelir elde et` },
      { k: 'nw', amt: Math.round(nw * 1.25 / 1e5) * 1e5, t: `Net değerini ${fmt(Math.round(nw * 1.25 / 1e5) * 1e5)} yap` },
      { k: 'upgrade', t: 'Bir binanın kapasitesini artır' },
      { k: 'hire', t: 'Bir işçi işe al' },
      { k: 'auction', t: 'Bir arsa artırması kazan' },
    ];
    const pick = [pool[0], ...pool.slice(1).sort(() => Math.random() - 0.5).slice(0, 2)];
    s.comp.week = {
      n: (s.comp.week ? s.comp.week.n : 0) + 1, end: (Math.floor(s.t / 1440) + WEEK) * 1440, sold: {}, inc0: s.totalIncome,
      lv0: s.plots.reduce((a, pl) => a + (pl.b ? pl.b.level : 0), 0), wk0: s.workers.length, own0: s.plots.filter(pl => !pl.rented).length,
      reward: Math.max(150000, Math.round(nw * 0.03 / 1e4) * 1e4), q: pick.map(x => ({ ...x, done: false })), chain: false,
      hTarget: holdingTarget(),
    };
  }
  function questProgress(q) {
    const w = s.comp.week;
    switch (q.k) {
      case 'sell': return Math.min(1, (w.sold[q.p] || 0) / q.n);
      case 'income': return Math.min(1, (s.totalIncome - w.inc0) / q.amt);
      case 'nw': return Math.min(1, netWorth() / q.amt);
      case 'upgrade': return s.plots.reduce((a, pl) => a + (pl.b ? pl.b.level : 0), 0) > w.lv0 ? 1 : 0;
      case 'hire': return s.workers.length > w.wk0 ? 1 : 0;
      case 'auction': return s.plots.filter(pl => !pl.rented).length > w.own0 ? 1 : 0;
    }
    return 0;
  }
  function checkQuests() {
    const w = s.comp && s.comp.week; if (!w) return;
    for (const q of w.q) if (!q.done && questProgress(q) >= 1) { q.done = true; reward(w.reward); news('Görev tamamlandı', q.t + '. Ödül: ' + fmt(w.reward) + '.', true); }
    if (!w.chain && w.q.every(q => q.done)) { w.chain = true; reward(w.reward * 2); news('Haftalık zincir tamamlandı', 'Bu haftanın üç görevini de bitirdin. Zincir ödülü: ' + fmt(w.reward * 2) + '.', true); }
  }
  // Holdingin haftalık ortak hedefi: üyelerin toplam ticari geliri
  function holdingTarget() { const h = s.comp.holding; if (!h) return 0; return Math.round(s.comp.npc.filter(c => c.h === h).reduce((a, c) => a + c.nw * 0.3 * WEEK, 0) * 1.1 / 1e6) * 1e6 + Math.round(Math.max(netWorth(), START_MONEY) * 0.3 * WEEK / 1e6) * 1e6; }
  function holdingDone() {
    const w = s.comp.week, h = s.comp.holding; if (!h || !w.hTarget) return 0;
    const npcPart = s.comp.npc.filter(c => c.h === h).reduce((a, c) => a + c.nw * 0.3 * Math.min(WEEK, (s.t - (w.end - WEEK * 1440)) / 1440), 0);
    return npcPart + (s.totalIncome - w.inc0);
  }

  function compDay() {
    ensureComp();
    const c = s.comp;
    for (const n of c.npc) n.nw *= Math.exp(n.skill * 0.072 * Math.max(0, 1 - n.nw / 3e9) + rnd(-0.03, 0.03));
    for (const p of PK) { c.sold[p].push(0); if (c.sold[p].length > WEEK) c.sold[p].shift(); }
    // Sektör liderliği değişimleri
    const kings = sectorLeaders().filter(x => x.top.me && x.me > 0).map(x => x.p);
    for (const p of kings) if (!c.kings.includes(p)) news('Yeni unvan: ' + KING[p], 'Son bir haftada en çok ' + P[p].n.toLocaleLowerCase('tr-TR') + ' satan şirket sensin.', true);
    for (const p of c.kings) if (!kings.includes(p)) news(KING[p] + ' unvanını kaybettin', 'Bir rakip son haftada senden fazla ' + P[p].n.toLocaleLowerCase('tr-TR') + ' sattı.');
    c.kings = kings;
    if (s.t >= c.week.end) {
      if (c.holding && holdingDone() >= c.week.hTarget) { const r = Math.max(200000, Math.round(netWorth() * 0.02 / 1e4) * 1e4); reward(r); news('Holding hedefi tutturuldu', HOLDINGS.find(h => h.id === c.holding).n + ' bu haftanın ortak gelir hedefine ulaştı. Payına düşen: ' + fmt(r) + '.', true); }
      newWeek();
    }
    if (seasonDay() > SEASON_DAYS) endSeason();
  }
  function endSeason() {
    const c = s.comp, b = board(), place = b.findIndex(x => x.me) + 1, nw = netWorth();
    const badge = { season: c.season, place, of: b.length, nw, rank: RANKS[rankNow()].n, kings: c.kings.map(p => KING[p]) };
    const badges = [...c.badges, badge], best = !c.best || place < c.best.place || (place === c.best.place && nw > c.best.nw) ? badge : c.best;
    const keep = { season: c.season + 1, badges, best, holding: c.holding, coop: c.coop }, cur = s.cur;
    newGame(); s.cur = cur; s.news = []; initComp(keep);
    news('Sezon ' + badge.season + ' bitti: ' + place + '. oldun', (place <= 3 ? MEDAL[place - 1] + ' rozet kazandın. ' : '') + 'Net değerin ' + fmt(nw) + ', unvanın ' + badge.rank + ' idi. Yeni sezonda herkes ' + fmt(START_MONEY) + ' ile sıfırdan başlıyor; rozetlerin profilinde kalıyor.', true);
  }

  function viewCompete() {
    ensureComp();
    const c = s.comp, out = [], b = board(), myPlace = b.findIndex(x => x.me) + 1, left = SEASON_DAYS - seasonDay() + 1;
    out.push(['ss', `<div class="card"><div class="row head"><h3>Sezon ${c.season}</h3><span class="tag own">${myPlace}. / ${b.length}</span></div><p class="muted small">${left} oyun günü kaldı. Sezon sonunda net değere göre sıralanır; ilk üçe altın, gümüş ve bronz rozet verilir. Sonra herkes ${fmt(START_MONEY)} ile sıfırdan başlar, rozetler kalır.</p><div class="bar"><i style="width:${(Math.min(1, seasonDay() / SEASON_DAYS) * 100).toFixed(1)}%"></i></div>
      <table class="t board">${b.map((x, i) => `<tr class="${x.me ? 'me' : ''}"><td class="num">${i + 1}</td><td>${esc(x.n)}${x.h ? ` <span class="small muted">${HOLDINGS.find(h => h.id === x.h).n}</span>` : ''}</td><td class="num">${fmt(x.nw)}</td></tr>`).join('')}</table></div>`]);
    // Haftalık görevler
    const w = c.week, dl = Math.max(0, Math.ceil((w.end - s.t) / 1440));
    out.push(['wq', `<div class="card"><div class="row head"><h3>Haftalık görevler</h3><span class="small muted">${dl} gün kaldı</span></div><p class="muted small">Her görev ${fmt(w.reward)}; üçü de bitince zincir ödülü ${fmt(w.reward * 2)}.</p>${w.q.map(q => { const f = questProgress(q); return `<div class="quest"><div class="row small"><span class="${q.done ? 'done' : ''}">${esc(q.t)}</span><span class="num muted">${q.done ? '✓' : '%' + Math.floor(f * 100)}</span></div><div class="bar"><i style="width:${(f * 100).toFixed(1)}%"></i></div></div>`; }).join('')}${w.chain ? '<p class="small up">Zincir tamamlandı.</p>' : ''}</div>`]);
    // Sektör hakimiyeti
    const L = sectorLeaders();
    out.push(['sk', `<div class="card"><h3>Sektör hakimiyeti</h3><p class="muted small">Son 7 günde bir üründe en çok satan şirket o sektörün unvanını alır.</p><div class="scroll"><table class="t">${L.map(x => `<tr><td>${KING[x.p]}</td><td class="${x.top.me ? 'up' : ''}">${x.top.me ? 'Sen' : esc(x.top.n)}</td><td class="num small muted">senin payın %${Math.round(x.me / Math.max(1, x.me + c.npc.reduce((a, n) => a + npcVol(n, x.p), 0)) * 100)}</td></tr>`).join('')}</table></div></div>`]);
    // Holdingler
    const hb = holdingBoard();
    let h = `<div class="card"><h3>Holdingler</h3><p class="muted small">Bir holdinge katılırsan ortak haftalık gelir hedefine katkı verirsin; hedef tutunca net değerinin %2'si kadar pay alırsın. Üyeler ortak nakliye anlaşmasıyla %5 ucuz taşır.</p>`;
    hb.forEach((x, i) => { const mine = c.holding === x.id; h += `<div class="row"><span><b>${i + 1}. ${x.n}</b>${mine ? ' <span class="tag own">üyesin</span>' : ''}<br><span class="small muted">${x.note} · ${x.members.length} üye · toplam ${fmt(x.nw)}</span></span>${mine ? btn('Ayrıl', 'leaveH', {}, 'ghost') : c.holding ? '' : btn('Katıl', 'joinH', { v: x.id })}</div>`; });
    if (c.holding && w.hTarget) { const f = Math.min(1, holdingDone() / w.hTarget); h += `<p class="small">Bu haftanın ortak hedefi: ${fmt(w.hTarget)} ticari gelir · %${Math.floor(f * 100)}</p><div class="bar"><i style="width:${(f * 100).toFixed(1)}%"></i></div>`; }
    out.push(['hd', h + '</div>']);
    out.push(['coop', coopCard()]);
    // Rozetler
    if (c.badges.length) out.push(['bd', `<div class="card"><h3>Rozetlerin</h3>${c.badges.map(x => `<div class="row"><span>Sezon ${x.season}: <b>${x.place}.</b> / ${x.of}${x.place <= 3 ? ' · ' + MEDAL[x.place - 1] : ''}<br><span class="small muted">${x.rank}${x.kings.length ? ' · ' + x.kings.join(', ') : ''}</span></span><span class="num small">${fmt(x.nw)}</span></div>`).join('')}</div>`]);
    return out;
  }

  // ---------- Kooperatifler: oyuncunun kurduğu ortaklık ----------
  // Türü bir ayrıcalık verir; ayrıcalığın gücü üye sayısıyla artar (5 üyede tam güç). Çevrim içi sürümde üyeler gerçek oyuncular olur.
  const COOP_FEE = 500000, COOP_FULL = 5;
  const COOP_T = {
    satis: { n: 'Satış kooperatifi', perk: 'Pazar ilanların %25’e kadar hızlı satar (ortak satış ağı)', ex: 'Tariş, Çukobirlik gibi' },
    alim: { n: 'Alım kooperatifi', perk: 'Toptancıdan alış %8’e kadar ucuz (toplu alım)', ex: 'ortak gübre, yem, hammadde alımı' },
    kredi: { n: 'Kredi kooperatifi', perk: 'Borç faizi %40’a kadar indirimli', ex: 'tarım kredi kooperatifleri gibi' },
  };
  const coopPow = () => { const c = s.comp && s.comp.coop; return c ? Math.min(1, (c.members.length + 1) / COOP_FULL) : 0; };
  const coopIs = k => s.comp && s.comp.coop && s.comp.coop.type === k;
  const coopSell = () => coopIs('satis') ? 1 + 0.25 * coopPow() : 1;
  const wBuy = () => W_BUY * (coopIs('alim') ? 1 - 0.08 * coopPow() : 1);
  const coopDebt = () => coopIs('kredi') ? 1 - 0.4 * coopPow() : 1;
  function coopCard() {
    const c = s.comp.coop;
    if (!c) {
      return `<div class="card"><h3>Kooperatif kur</h3><p class="muted small">Kendi kooperatifini kur, diğer şirketleri davet et. Türü bir ayrıcalık verir; ayrıcalık üye sayısıyla güçlenir (${COOP_FULL} üyede tam). Kuruluş sermaye payı ${fmt(COOP_FEE)}. Kooperatif sezonlar arasında kalır.</p>
        <div class="row wrap small"><label for="coopName">Adı</label><input id="coopName" class="price" data-c="coopName" maxlength="28" value="${esc(ui.coopName || '')}" placeholder="ör. Yeşilova Üreticileri"></div>
        ${Object.entries(COOP_T).map(([k, x]) => `<div class="row"><span><b>${x.n}</b><br><span class="small muted">${x.perk} · ${x.ex}</span></span>${btn('Kur', 'coopFound', { v: k })}</div>`).join('')}</div>`;
    }
    const T = COOP_T[c.type], pow = coopPow(), all = [{ n: 'Sen (kurucu)', nw: netWorth() }, ...c.members.map(m => s.comp.npc.find(x => x.n === m)).filter(Boolean)];
    const wk = s.comp.week ? s.comp.week.n : 0, others = s.comp.npc.filter(x => !c.members.includes(x.n));
    return `<div class="card"><div class="row head"><h3>${esc(c.n)}</h3><span class="tag own">${T.n}</span></div>
      <p class="small">${T.perk}. Şu anki güç: %${Math.round(pow * 100)} · ${all.length} üye (${COOP_FULL} üyede tam güç)</p><div class="bar"><i style="width:${(pow * 100).toFixed(0)}%"></i></div>
      <p class="muted small">Üyeler · toplam ${fmt(all.reduce((a, x) => a + x.nw, 0))}</p>
      ${all.map(x => `<div class="row small"><span>${esc(x.n)}</span><span class="num">${fmt(x.nw)}</span></div>`).join('')}
      ${others.length ? `<h3 class="small">Davet et</h3><p class="muted small">Aynı ürünlerle uğraşan şirketler ve büyük kooperatifler daveti daha kolay kabul eder. Günde bir davet gönderebilirsin; reddeden şirkete bir hafta sonra yeniden sorabilirsin.${c.lastInvite === Math.floor(s.t / 1440) ? ' <b>Bugünkü davetini gönderdin.</b>' : ''}</p>` + others.map(x => { const asked = c.asked[x.n] === wk; return `<div class="row small"><span>${esc(x.n)} <span class="muted">· ${fmt(x.nw)} · %${Math.round(coopChance(x) * 100)} kabul</span></span>${asked ? '<span class="muted">bu hafta reddetti</span>' : btn('Davet et', 'coopInvite', { v: x.n })}</div>`; }).join('') : ''}
      <div class="row">${btn(ui.confirmCoop ? 'Emin misin? Tekrar dokun' : 'Kooperatifi dağıt', 'coopClose', {}, 'ghost')}</div></div>`;
  }
  // Davet kabul olasılığı: kooperatif büyüdükçe ve odak ürünler kendi üretiminle örtüştükçe artar; çok büyük şirketler küçük kooperatife zor girer
  function coopChance(x) {
    const c = s.comp.coop, mine = new Set(s.plots.flatMap(pl => pl.b && pl.b.lines ? pl.b.lines.map(l => l.r) : []));
    const fit = x.f.filter(p => mine.has(p)).length, size = c.members.length + 1;
    const ratio = netWorth() / Math.max(1, x.nw);
    return Math.max(0.05, Math.min(0.9, 0.15 + 0.15 * fit + 0.04 * size + (ratio < 0.5 ? -0.2 : ratio > 2 ? 0.1 : 0)));
  }

  // ---------- Mevsimler ve hasat ----------
  // Bir oyun günü bir hafta: 52 günde bir yıl, her mevsim 13 gün. Oyun ilkbaharda başlar.
  // y: tarla verimi çarpanı, pm: fiyatın döndüğü mevsimsel seviye (hasatta bol ve ucuz, kışın kıt ve pahalı).
  const YEAR = 52, QUARTER = 13;
  const SEASONS = [
    { n: 'İlkbahar', note: 'Buğday başakta, pamuk yeni ekildi; süt verimi yüksek.', y: { bugday: 0.9, pamuk: 0.7, sut: 1.2 }, pm: { bugday: 1.06, pamuk: 1.04, sut: 0.95 } },
    { n: 'Yaz', note: 'Buğday hasadı: tarlalar bol buğday verir, buğday ucuzlar.', y: { bugday: 1.7, pamuk: 1.1, sut: 1.0 }, pm: { bugday: 0.88 } },
    { n: 'Sonbahar', note: 'Pamuk hasadı: pamuk bollaşır ve ucuzlar.', y: { bugday: 1.0, pamuk: 1.7, sut: 0.95 }, pm: { bugday: 0.96, pamuk: 0.88 } },
    { n: 'Kış', note: 'Tarlada verim düşük; buğday ve pamuk pahalanır, kömür talebi artar. Hasatta depoladığın ürünü şimdi satmanın tam zamanı.', y: { bugday: 0.5, pamuk: 0.4, sut: 0.85 }, pm: { bugday: 1.12, pamuk: 1.1, sut: 1.05, komur: 1.1, un: 1.05 } },
  ];
  const dayNo = () => Math.floor(s.t / 1440);
  const seasonOf = d => SEASONS[Math.floor((d % YEAR) / QUARTER)];
  const curSeason = () => seasonOf(dayNo());
  const seasonYield = p => (p && curSeason().y[p]) || 1;
  const seasonPrice = p => curSeason().pm[p] || 1;
  const seasonLeft = () => QUARTER - (dayNo() % QUARTER);

  // ---------- Bölgeler ve pazar derinliği ----------
  // Yeni bölgeler unvanla açılır (R[r].rank). Pazar derinliği: çevrim içi sürümde aktif şirket (oyuncu + sanal) sayısının
  // karekökü ve sezon içindeki ekonomik büyümeyle artar; talep, ilan satış hızı ve fiyat etkisi buna göre ölçeklenir.
  const openR = () => Object.keys(R).filter(r => rankNow() >= (R[r].rank || 0));
  const BASE_FIRMS = 12;
  const firms = () => 1 + (s.comp ? s.comp.npc.length : NPC.length);
  const depth = () => Math.sqrt(firms() / BASE_FIRMS) * (1 + 0.006 * (s.comp ? Math.min(SEASON_DAYS, Math.max(0, seasonDay() - 1)) : 0));
  const sellerOf = p => { const f = NPC.filter(x => x[2].includes(p)); return pick(f.length ? f : NPC)[0]; };

  // ---------- Marka ve kalite ----------
  // Kalite (1-5) Ar-Ge ile yükselir; her seviye ürünün kabul gören fiyatını %6 artırır. Marka bilinirliği (0-100)
  // reklamla yükselir, her gün %3 söner; dükkân talebini %50'ye, ilan satış hızını %25'e kadar artırır.
  const QMAX = 5;
  const qual = p => (s.qual && s.qual[p]) || 1;
  const qPrem = p => 1 + 0.06 * (qual(p) - 1);
  const rdCost = p => Math.round(P[p].ref * 400 * qual(p) ** 2 / 1e4) * 1e4;
  const brand = () => s.brand || 0;
  const brandShop = () => 1 + brand() / 200;
  const brandList = () => 1 + brand() / 400;
  const npcBrand = c => Math.min(95, 12 * Math.log10(c.nw / 1e6 + 1) * c.skill);
  const ADS = [
    { n: 'Yerel gazete ve afiş', c: 250000, g: 4 },
    { n: 'Bölgesel radyo kampanyası', c: 1500000, g: 12 },
    { n: 'Ulusal televizyon reklamı', c: 8000000, g: 30 },
  ];
  // Toptancıya satış birim fiyatı: liman ihracat primi ve kalite priminin yarısı dahil
  const wSell = (pl, p) => price(p) * (R[pl.region].wsell || W_SELL) * (1 + (qPrem(p) - 1) / 2);

  // ---------- Banka kredisi ----------
  // Yıllık ~%45 ticari kredi (2026 tahmini). Limit: teminatsız 1 mn + arsa ve bina değerinin %60'ı.
  // Taksit her oyun günü (bir hafta) eşit taksitle alınır; üç taksit üst üste ödenmezse banka en değerli arsaya el koyar.
  const LOAN_RATE = 0.45, LOAN_TERMS = [4, 8, 13], LOAN_BASE = 1e6, LTV = 0.6;
  const loanDebt = () => (s.loans || []).reduce((a, l) => a + l.left, 0);
  const collateral = () => landValue() + s.plots.reduce((a, pl) => a + (pl.b ? pl.b.spent * 0.5 : 0), 0);
  const loanLimit = () => Math.max(0, Math.floor((LOAN_BASE + LTV * collateral() - loanDebt()) / 1e4) * 1e4);
  const loanRate = () => LOAN_RATE * (0.5 + 0.5 * perk('debt') * coopDebt());
  const installment = (amt, n, r) => amt * r / (1 - Math.pow(1 + r, -n));
  function loanDay() {
    for (const l of s.loans) {
      const int = l.left * l.r, due = Math.min(l.inst, l.left + int);
      if (s.money >= due) { exp('Kredi faizi', int); exp('Kredi anapara', due - int); l.left -= due - int; l.k++; l.miss = 0; }
      else {
        l.miss++; l.left += int + l.left * 0.01;
        if (l.miss >= 3) foreclose(l);
        else news('Kredi taksiti ödenemedi', 'Kasanda ' + fmt(due) + ' taksiti karşılayacak para yoktu. Faiz ve %1 gecikme bedeli borca eklendi. Üst üste ' + (3 - l.miss) + ' taksit daha kaçırırsan banka teminattaki en değerli arsana el koyar.', true);
      }
      if (l.left < 1 && !l.seized) news('Kredi kapandı', fmt(l.amt) + ' tutarındaki kredinin bütün taksitleri ödendi.');
    }
    s.loans = s.loans.filter(l => l.left >= 1);
  }
  function foreclose(l) {
    const own = s.plots.filter(pl => !pl.rented && !pl.part).sort((a, b) => (b.ref + (b.b ? b.b.spent : 0)) - (a.ref + (a.b ? a.b.spent : 0)));
    const pl = s.plots.length > 1 ? own[0] : null;
    if (!pl) { s.money -= l.left; news('Kredi borcu kasana yazıldı', 'El konacak arsan olmadığı için kalan ' + fmt(l.left) + ' borç kasana eksi olarak yazıldı; borç faizi işler.', true); l.left = 0; l.seized = true; return; }
    const val = pl.ref * 0.7 + (pl.b ? pl.b.spent * 0.3 : 0); l.seized = true;
    for (const id of (pl.b && pl.b.parts) || []) { const x = plot(id); if (x) x.part = null; }
    fireCrew(pl, 'arsaya bankaca el konduğu için');
    s.plots = s.plots.filter(x => x !== pl); spawnAuction({ ...pl, b: null, inv: {} });
    l.left -= val; if (l.left < 0) { s.money -= l.left; l.left = 0; }
    if (ui.dest === pl.id) ui.dest = s.plots[0].id;
    news('Banka arsana el koydu', 'Üç taksit üst üste ödenmediği için Arsa ' + pl.id + ' (' + R[pl.region].n + '), binası ve deposuyla birlikte ' + fmt(val) + ' değerle borca sayıldı ve haciz artırmasına çıktı.', true);
  }

  // ---------- Sözleşmeler ----------
  // Sanal şirketler sabit fiyatlı sipariş verir. Süresinde teslim edilmeyen kısım için bedelin %25'i ceza ödenir.
  // Güvenilirlik (0-100) tamamlanan sözleşmeyle artar, cezayla düşer; teklif fiyatlarını yükseltir.
  const DEAL_MAX = 3, DEAL_PEN = 0.25;
  const dealsInit = () => ({ offers: [], active: [], rep: 50, done: 0, failed: 0 });
  const haveAll = p => s.plots.reduce((a, pl) => a + (pl.inv[p] || 0), 0);
  const dleft = t => { const h = (t - s.t) / 60; return h < 24 ? Math.max(1, Math.ceil(h)) + ' saat' : Math.ceil(h / 24) + ' gün'; };
  function genOffer() {
    const mine = [...new Set(s.plots.flatMap(pl => pl.b && pl.b.lines ? pl.b.lines.map(l => l.r).filter(Boolean) : []))];
    const p = mine.length && Math.random() < 0.7 ? pick(mine) : pick(PK);
    const buyers = NPC.filter(x => x[2].some(f => P[f].in[p]));
    const days = pick([3, 5, 7]), val = clamp(Math.max(netWorth(), START_MONEY) * rnd(0.05, 0.12) * days / 5, 3e5, 8e8);
    const qty = Math.max(10, Math.round(val / price(p) / 10) * 10);
    const prem = 1.04 + 0.002 * s.deals.rep + rnd(-0.02, 0.03);
    return { id: s.nextId++, p, qty, unit: Math.round(price(p) * prem * qPrem(p) * 10) / 10, days, region: pick(openR()), from: pick(buyers.length ? buyers : NPC)[0], exp: (dayNo() + 1) * 1440 };
  }
  // Depolardan teslim: taşıma ücreti arsanın bölgesinden teslim bölgesine
  function deliver(x) {
    let need = x.qty - x.got, n0 = 0;
    for (const pl of s.plots) {
      if (need <= 0) break;
      const q = Math.min(pl.inv[x.p] || 0, need); if (q <= 0) continue;
      const tr = trans(q, x.p, pl.region, x.region) * (1 - wEff(pl, 'sofor'));
      add(pl, x.p, -q); exp('Taşıma', tr); inc('Sözleşme', q * x.unit); sold(x.p, q); pl.last = s.t; need -= q; n0 += q;
    }
    x.got += n0;
    if (n0 && x.got >= x.qty) { const D = s.deals; D.rep = Math.min(100, D.rep + 5); D.done++; news('Sözleşme tamamlandı', x.from + ' siparişi (' + qtyTxt(x.p, x.qty) + ' ' + P[x.p].n.toLocaleLowerCase('tr-TR') + ') teslim edildi. Toplam ' + fmt(x.qty * x.unit) + '. Güvenilirliğin ' + Math.round(D.rep) + ' oldu.', true); }
    return n0;
  }
  function dealsHour() {
    const D = s.deals; if (!D) return;
    for (const x of D.active) if (x.auto && x.got < x.qty) deliver(x);
    for (const x of D.active.filter(x => s.t >= x.due && x.got < x.qty)) {
      const pen = (x.qty - x.got) * x.unit * DEAL_PEN; exp('Sözleşme cezası', pen); D.rep = Math.max(0, D.rep - 15); D.failed++;
      news('Sözleşme süresi doldu', x.from + ' siparişinin ' + qtyTxt(x.p, x.qty - x.got) + ' kısmı teslim edilmedi. Ceza: ' + fmt(pen) + '. Güvenilirliğin ' + Math.round(D.rep) + '’e düştü.', true);
    }
    D.active = D.active.filter(x => s.t < x.due && x.got < x.qty);
    D.offers = D.offers.filter(o => s.t < o.exp);
  }

  // ---------- Vergi ve muhasebe ----------
  // Kurumlar vergisi %25: her mevsim sonunda (çeyrek, 13 oyun günü) o çeyreğin kârı üzerinden; zarar sonraki çeyreğe devreder.
  // Gider sayılmayanlar: inşaat (yerine yıllık %10 amortisman), arsa alım-satımı, kredi anaparası, KDV, kooperatif sermayesi.
  // KDV yalnızca perakende satışta, katma değer (satış − maliyet) üzerinden: temel gıda %1, tekstil %10, diğerleri %20.
  const CORP_TAX = 0.25, AMORT = 0.10;
  const NOTAX = new Set(['Arsa satışı', 'İnşaat', 'Kooperatif', 'Kurumlar vergisi', 'Kredi anapara', 'KDV']);
  const KDV = { bugday: 0.01, sut: 0.01, un: 0.01, ekmek: 0.01, peynir: 0.01, kumas: 0.10, giysi: 0.10 };
  const kdvRate = p => KDV[p] || 0.20;
  function kdv(pl, p, n, pr) { const v = (pr - shopCost(pl, p)) * n * kdvRate(p) / (1 + kdvRate(p)); if (v > 0) exp('KDV', v); }
  const acctNew = carry => ({ inc: 0, exp: 0, am: 0, carry: carry || 0 });
  const taxBase = () => s.acct.inc - s.acct.exp - s.acct.am - s.acct.carry;
  function quarterTax() {
    const base = taxBase();
    if (base > 0) { const t = base * CORP_TAX; s.acct = acctNew(0); exp('Kurumlar vergisi', t); news('Kurumlar vergisi ödendi', 'Geçen çeyreğin vergiye tabi kârı ' + fmt(base) + '; %25 vergi olarak ' + fmt(t) + ' ödendi.', true); }
    else { s.acct = acctNew(-base); if (base < 0) news('Zarar devretti', 'Geçen çeyrek ' + fmt(-base) + ' zarar ettin; bu tutar sonraki çeyreklerin kârından düşülecek.'); }
  }
  function financeDay(day) {
    loanDay();
    s.acct.am += s.plots.reduce((a, pl) => a + (pl.b ? pl.b.spent * AMORT / YEAR : 0), 0);
    s.brand = brand() * 0.97 + (s.prev.inc['Perakende'] || s.prev.inc['Pazar'] || s.prev.inc['Sözleşme'] ? 0.3 : 0);
    const D = s.deals; D.offers = D.offers.filter(o => s.t < o.exp); while (D.offers.length < DEAL_MAX) D.offers.push(genOffer());
    if (day % QUARTER === 0) { quarterTax(); const S = curSeason(); news('Mevsim döndü: ' + S.n, S.note, true); }
  }
  // Eski kayıtları ve yeni oyunu yeni alanlarla tamamlar
  function migrate() {
    for (const r in R) {
      if (!s.rivals[r]) { s.rivals[r] = {}; for (const k of PK) if (P[k].d) s.rivals[r][k] = [rnd(0.97, 1.1), rnd(0.97, 1.1)]; }
      if (!s.cands[r]) s.cands[r] = genCands(r);
    }
    if (!s.loans) s.loans = [];
    if (!s.qual) s.qual = {};
    if (s.brand == null) s.brand = 0;
    if (!s.acct) s.acct = acctNew(0);
    if (s.tut == null) s.tut = 0;
    if (!s.deals) s.deals = dealsInit();
    if (!s.deals.offers.length) for (let i = 0; i < DEAL_MAX; i++) s.deals.offers.push(genOffer());
  }

  // ---------- İlk dakikalar için rehber ----------
  const TUT = [
    ['Arsa 1’e bir tarla kur', 'Aşağıdaki Arsa 1 kartında Tarla’ya dokun. Kırsal bölgede tarlalar %25 fazla ürün verir.', () => s.plots.some(p => p.b)],
    ['Bir ürün seç', 'Kartta Hat 1 için Buğday ya da Süt seç; üretim hemen başlar. Mevsim önemli: buğday yazın bol, kışın az çıkar.', () => s.plots.some(p => p.b && (p.b.type === 'dukkan' || p.b.lines.some(l => l.r)))],
    ['İlk partiyi bekle', 'Bir parti 30 oyun dakikasında biter (1× hızda ~2 saniye). Üstteki 2× ve 4× düğmeleri zamanı hızlandırır.', () => s.totalIncome > 0 || s.mine.length > 0 || s.plots.some(p => invTotal(p) > 0)],
    ['İlk satışını yap', 'Ürünün altındaki “Toptancıya sat” hemen nakit verir; “Pazara ilan ver” daha pahalıya ama yavaş satar.', () => s.totalIncome > 0],
    ['Satışı otomatiğe bağla', 'Ürünün “Üretim çıkınca” menüsünden “Pazara koy: piyasa fiyatı”nı seç. Sen yokken de satış sürer.', () => s.plots.some(p => p.b && Object.values(p.b.out || {}).some(Boolean)) || s.plots.some(p => p.b && p.b.type === 'dukkan')],
    ['Şirket sekmesine bak', 'Orada şirketlerin sabit fiyatlı siparişleri, banka kredisi, marka ve vergi bilgisi var.', () => ui.tab === 'company' || s.deals.active.length > 0],
    ['Büyümeyi planla', 'Kendi arsanı Artırma sekmesinden alırsın. Krediyle erken büyüyebilirsin ama taksitleri kaçırma.', () => s.plots.some(p => !p.rented) || s.loans.length > 0],
  ];
  const tutOn = () => !s.tutOff && s.tut < TUT.length;
  function checkTut() {
    while (tutOn() && TUT[s.tut][2]()) { s.tut++; if (s.tut === TUT.length) news('Rehber tamamlandı', 'Temel döngüyü öğrendin: üret, sat, büyü. Sıradaki hedeflerin ana ekranda.'); }
  }
  const tutCard = () => { const [t, d] = TUT[s.tut]; return `<div class="goal tut"><span class="small">Rehber · adım ${s.tut + 1}/${TUT.length}</span><b>${t}</b><span class="small">${d}</span><span>${btn('Rehberi kapat', 'tutOff', {}, 'ghost')}</span></div>`; };

  // ---------- Şirket sekmesi ----------
  function viewCompany() {
    const out = [], D = s.deals;
    // Sözleşmeler
    let h = `<div class="card"><div class="row head"><h3>Sözleşmeler</h3><span class="tag ${D.rep >= 60 ? 'own' : ''}">güvenilirlik ${Math.round(D.rep)}</span></div><p class="muted small">Şirketler sabit fiyatlı sipariş verir ve piyasanın üstünde öder. Süresinde teslim etmediğin kısmın bedelinin %${DEAL_PEN * 100}’i kadar ceza ödersin. Güvenilirliğin arttıkça teklif fiyatları yükselir. Teslimat depolarından yapılır, taşıma ücreti senden.</p>`;
    for (const x of D.active) {
      const f = x.got / x.qty;
      h += `<div class="item"><div class="row"><span><b>${esc(x.from)}</b> · ${P[x.p].n} ${qtyTxt(x.p, x.qty)}<br><span class="small muted">${R[x.region].n}’ye teslim · birimi ${fmt1(x.unit)} · toplam ${fmt(x.qty * x.unit)} · <span class="${x.due - s.t < 1440 ? 'warn' : ''}">kalan ${dleft(x.due)}</span></span></span><span class="num small">${x.got}/${x.qty}</span></div><div class="bar"><i style="width:${(f * 100).toFixed(1)}%"></i></div>
        <div class="row wrap small">${btn('Depodan teslim et', 'dealGive', { id: x.id })}<label class="chk"><input type="checkbox" data-c="dealAuto" data-id="${x.id}" ${x.auto ? 'checked' : ''}> Ürün depoya girdikçe otomatik teslim et</label></div><p class="small muted">Depolarında ${haveAll(x.p).toLocaleString('tr-TR')} birim ${P[x.p].n.toLocaleLowerCase('tr-TR')} var.</p></div>`;
    }
    h += `<h3 class="small">Teklifler ${D.active.length >= DEAL_MAX ? '<span class="muted">· en fazla ' + DEAL_MAX + ' sözleşme yürütebilirsin</span>' : ''}</h3>`;
    h += D.offers.map(o => `<div class="row"><span><b>${esc(o.from)}</b> · ${P[o.p].n} ${qtyTxt(o.p, o.qty)} · ${o.days} günde<br><span class="small muted">${R[o.region].n}’ye teslim · birimi ${fmt1(o.unit)} (piyasa ${fmt1(price(o.p))}, <span class="up">+%${Math.round((o.unit / price(o.p) - 1) * 100)}</span>) · toplam ${fmt(o.qty * o.unit)}</span></span>${D.active.length < DEAL_MAX ? btn('Kabul et', 'dealAcc', { id: o.id }) : ''}</div>`).join('');
    h += `<p class="muted small">Teklifler her gün yenilenir. Tamamlanan ${D.done} · cezalı ${D.failed}</p></div>`;
    out.push(['deals', h]);
    // Banka kredisi
    const lim = loanLimit(), r = loanRate(), amt = Math.min(ui.loanTL, lim);
    let b = `<div class="card"><h3>Banka kredisi</h3><p class="muted small">Arsaların ve binaların teminat sayılır: limit ${fmt(LOAN_BASE)} + teminatın %${LTV * 100}’ı. Yıllık faiz %${Math.round(r * 100)} (unvan ve kredi kooperatifi indirir). Taksit her oyun günü (bir hafta) kasadan alınır. Üç taksit üst üste ödenmezse banka en değerli arsana el koyar.</p>
      <div class="row"><span>Kullanılabilir limit</span><b class="num">${fmt(lim)}</b></div><div class="row"><span>Kalan kredi borcu</span><span class="num">${fmt(loanDebt())}</span></div>
      <div class="row wrap small"><label for="loanAmt">Tutar (${sym()})</label><input id="loanAmt" class="price" inputmode="decimal" data-c="loanAmt" value="${+disp(ui.loanTL).toFixed(s.cur === 'TRY' ? 0 : 2)}"></div>`;
    b += amt >= 1e5 ? LOAN_TERMS.map(n => { const i = installment(amt, n, r / 52); return `<div class="row small"><span>${fmt(amt)} · ${n} hafta vade<br><span class="muted">taksit ${fmt(i)}/gün · toplam faiz ${fmt(i * n - amt)}</span></span>${btn('Kredi çek', 'loanTake', { v: n })}</div>`; }).join('') : '<p class="small warn">Limitin şu an kredi için yetersiz.</p>';
    if (s.loans.length) b += '<h3 class="small">Kredilerin</h3>' + s.loans.map(l => `<div class="row small"><span>${fmt(l.amt)} · ${l.k}/${l.n} taksit · kalan ${fmt(l.left)}${l.miss ? ` · <span class="warn">${l.miss} taksit gecikti</span>` : ''}<br><span class="muted">taksit ${fmt(l.inst)}/gün</span></span>${btn('Erken kapat ' + fmt(l.left * 1.01), 'loanPay', { id: l.id }, 'ghost')}</div>`).join('') + '<p class="muted small">Erken kapamada kalan anaparanın %1’i kadar ücret alınır.</p>';
    out.push(['loan', b + '</div>']);
    // Marka ve kalite
    const top = [...(s.comp ? s.comp.npc : [])].map(c => ({ n: c.n, v: npcBrand(c) })).concat([{ n: 'Sen', v: brand(), me: true }]).sort((a, c) => c.v - a.v);
    const myB = top.findIndex(x => x.me) + 1;
    let m = `<div class="card"><div class="row head"><h3>Marka</h3><span class="tag ${myB === 1 ? 'own' : ''}">${myB === 1 ? 'En tanınan marka' : myB + '. sırada'}</span></div><div class="row"><span>Bilinirlik</span><b class="num">${brand().toFixed(1)} / 100</b></div><div class="bar"><i style="width:${brand().toFixed(1)}%"></i></div>
      <p class="muted small">Bilinirlik dükkân talebini %${Math.round((brandShop() - 1) * 100)}, pazar ilanlarının satış hızını %${Math.round((brandList() - 1) * 100)} artırıyor. Her gün %3 söner; satış yaptığın günler biraz yükselir. Bilinirlik arttıkça reklamın getirisi azalır.</p>`;
    m += ADS.map((a, i) => `<div class="row small"><span>${a.n}<br><span class="muted">+${(a.g * (1 - brand() / 100)).toFixed(1)} bilinirlik</span></span>${btn('Yayınla ' + fmt(a.c), 'ad', { v: i })}</div>`).join('');
    m += `<p class="muted small">En tanınan markalar: ${top.slice(0, 3).map(x => esc(x.n) + ' ' + x.v.toFixed(0)).join(' · ')}</p></div>`;
    out.push(['brand', m]);
    out.push(['qual', `<div class="card"><h3>Kalite ve Ar-Ge</h3><p class="muted small">Her kalite seviyesi ürünün alıcıların kabul ettiği fiyatı %6 artırır: dükkânda ve pazarda aynı fiyata daha hızlı, sözleşmede daha pahalı satarsın. Toptancı primin yarısını öder. Ar-Ge harcaması gider sayılır.</p><div class="scroll"><table class="t">${PK.map(p => `<tr><td>${P[p].n}</td><td>${stars5(qual(p))}</td><td class="num small">+%${Math.round((qPrem(p) - 1) * 100)}</td><td>${qual(p) < QMAX ? btn('Ar-Ge ' + fmt(rdCost(p)), 'rd', { p }, 'ghost') : '<span class="small muted">en üst</span>'}</td></tr>`).join('')}</table></div></div>`]);
    // Vergi
    const a = s.acct, base = taxBase();
    out.push(['tax', `<div class="card"><h3>Vergi ve muhasebe</h3><table class="t"><tr><td>Bu çeyrek ticari gelir</td><td class="up">${fmt(a.inc)}</td></tr><tr><td>Gider (vergiler ve faiz dahil)</td><td class="down">${fmt(-a.exp)}</td></tr><tr><td>Amortisman (binaların %10’u/yıl)</td><td class="down">${fmt(-a.am)}</td></tr>${a.carry ? `<tr><td>Devreden zarar</td><td class="down">${fmt(-a.carry)}</td></tr>` : ''}<tr><th>Vergiye tabi kâr</th><th>${fmt(base)}</th></tr><tr><td>Tahmini kurumlar vergisi (%${CORP_TAX * 100})</td><td>${fmt(Math.max(0, base) * CORP_TAX)}</td></tr></table>
      <p class="muted small">Ödeme ${seasonLeft()} gün sonra, mevsim dönünce. İnşaat ve arsa alımı gider sayılmaz; bunun yerine binalar yılda %10 amortismanla gider yazılır. Zarar sonraki çeyreğe devreder.</p>
      <p class="muted small">KDV dükkândaki perakende satışta, satış fiyatıyla maliyet arasındaki fark üzerinden kesilir: temel gıda (buğday, süt, un, ekmek, peynir) %1, kumaş ve giysi %10, diğerleri %20. Şirketler arası satışta KDV indirilerek sıfırlandığı için gösterilmez. Emlak vergisi ayrıca her gün alınır.</p></div>`]);
    return out;
  }
  const stars5 = n => '<span aria-label="' + n + ' / 5">' + '★'.repeat(n) + '<span class="muted">' + '★'.repeat(QMAX - n) + '</span></span>';

  const VIEWS = { company: viewCompany, compete: viewCompete, invest: viewInvest, crew: viewCrew, plots: viewPlots, market: viewMarket, auction: viewAuction, news: viewNews, report: viewReport };
  const TABS = [['plots', 'Arsalar'], ['market', 'Pazar'], ['company', 'Şirket'], ['crew', 'İşçiler'], ['invest', 'Yatırım'], ['auction', 'Artırma'], ['compete', 'Rekabet'], ['news', 'Gazete'], ['report', 'Rapor']];
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

  function rankBar() {
    const r = RANKS[rankNow()], nx = RANKS[rankNow() + 1], nw = netWorth();
    ensureComp(); const sp = `<span class="muted"> · Sezon ${s.comp.season}, ${board().findIndex(x => x.me) + 1}. sıra</span>`;
    if (!nx) return `<div class="rank"><div class="row small"><b>${r.n}</b><span class="muted">en üst unvan${sp}</span></div></div>`;
    const f = Math.max(0, Math.min(1, (nw - r.at) / (nx.at - r.at)));
    return `<div class="rank"><div class="row small"><span><b>${r.n}</b> <span class="muted">→ ${nx.n}</span>${sp}</span><span class="num muted">${fmt(nw)} / ${fmt(nx.at)}</span></div><div class="bar" role="progressbar" aria-label="Sonraki unvana ilerleme" aria-valuenow="${Math.round(f * 100)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${(f * 100).toFixed(1)}%"></i></div></div>`;
  }
  function render() {
    const bids = s.auctions.filter(a => a.bidder === 'me').reduce((a, x) => a + x.bid, 0);
    paint(hud, [
      ['top', `<div class="row"><div><span class="brand">Tezgâh</span> <span class="small muted">demo</span></div><div class="row small"><label class="sr" for="cur">Para birimi</label><select id="cur" class="cur" data-c="cur">${Object.keys(CUR).map(c => `<option value="${c}" ${s.cur === c ? 'selected' : ''}>${CUR[c].sym} ${c}</option>`).join('')}</select><span class="num">${clock()}</span></div></div>`],
      ['cash', `<div class="row"><div class="cash ${s.money < 0 ? 'down' : ''}">${fmt(s.money)}${bids ? `<span class="small muted"> · teminatta ${fmt(bids)}</span>` : ''}</div><div class="speed" role="group" aria-label="Oyun hızı">${[[0, 'Dur'], [1, '1×'], [2, '2×'], [4, '4×']].map(([v, l]) => `<button type="button" data-a="speed" data-v="${v}" class="${s.speed === v ? 'on' : ''}">${l}</button>`).join('')}</div></div>`],
      ['rank', rankBar()],
      ['tabs', `<nav class="tabs">${TABS.map(([k, l]) => `<button type="button" data-a="tab" data-v="${k}" class="${ui.tab === k ? 'on' : ''}">${l}${k === 'news' && s.unread ? `<span class="badge" aria-label="${s.unread} yeni">${s.unread}</span>` : ''}</button>`).join('')}</nav>`],
    ]);
    paint(main, VIEWS[ui.tab]());
    if (ui.tab === 'plots' && pixiMap()) window.TezgahMap.update(main.querySelector('[data-pixi]'), mapModel(), focusFromMap);
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
    if (load()) catchUp(Date.now() - (s.savedAt || Date.now())); else newGame();
    if (!plot(ui.dest)) ui.dest = s.plots[0].id;
    // Arka plandayken tarayıcı zamanlayıcıları yavaşlatır ya da durdurur; bu yüzden gizlenince
    // adımlamayı bırakıp kaydeder, geri gelince geçen süreyi telafi eder.
    let hiddenAt = 0;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { hiddenAt = Date.now(); save(); }
      else if (hiddenAt) { const ms = Date.now() - hiddenAt; hiddenAt = 0; catchUp(ms); render(); }
    });
    root.addEventListener('click', e => { const el = e.target.closest('[data-a]'); if (!el || !A[el.dataset.a]) return; A[el.dataset.a](el.dataset); render(); focusCard(); });
    root.addEventListener('keydown', e => { const el = e.target.closest('g[data-a]'); if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); A[el.dataset.a](el.dataset); render(); focusCard(); } });
    root.addEventListener('change', e => { const el = e.target.closest('[data-c]'); if (!el || !C[el.dataset.c]) return; C[el.dataset.c](el); el.blur(); render(); });
    setInterval(() => { if (document.hidden) return; if (s.speed > 0) step(3.75 * s.speed); render(); }, 250);
    window.addEventListener('pagehide', save);
    setInterval(save, 8000);
    render();
  }

  window.__tezgah = { get state() { return s; }, away(ms) { catchUp(ms); render(); }, advance(min) { for (let i = 0; i < min; i += 5) step(5); render(); }, reset() { newGame(); render(); },
    // Denge testleri için: oyun içi eylemler ve tablolar (bot simülasyonu)
    dbg: { A, C, B, P, R, RANKS, netWorth, price, step, compDay, endSeason, loanLimit, loanDebt, depth, curSeason, taxBase, wSell, openR } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
