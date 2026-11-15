// Tüccarlar Kulübü bowling pisti: kuşbakışı kulvar, parmakla yukarı kaydırarak atış.
// Ölçek gerçek pisti izler: kulvar 105 cm = 200 birim; top yarıçapı ~11 cm, lobut ~6 cm, lobut arası 30,5 cm.
// Oyun mantığı (frame, skor, rakip) game.js'tedir; bu dosya yalnızca fiziği ve çizimi yapar.
(function () {
  'use strict';
  const LW = 200, GUT = 22, WALL = 34, H = 640, BR = 20, PR = 11.5, BALL_Y = 590;
  const PIN_M = 1, BALL_M = 4.5, REST = 0.72;
  const PINS = (() => { const a = []; for (let r = 0; r < 4; r++) for (let j = 0; j <= r; j++) a.push({ x: LW / 2 + (j - r / 2) * 58, y: 182 - r * 50 }); return a; })();
  const VW = LW + 2 * WALL;

  function mount(cv, opt) {
    const ctx = cv.getContext('2d');
    let pins = [], ball = null, drag = null, state = 'aim', settleT = 0, enabled = true, dead = false, aimX = LW / 2;
    const st = { onRoll: opt.onRoll || (() => {}) };

    function setPins(ids) {
      pins = PINS.map((p, i) => ({ i, x: p.x, y: p.y, vx: 0, vy: 0, down: false, gone: false, ang: 0, tilt: 0, wob: 0, head: 0, spinR: 0, on: ids === 'all' || ids.includes(i) })).filter(p => p.on);
      ball = { x: aimX, y: BALL_Y, vx: 0, vy: 0, spin: 0, drift: 0, rot: 0, gutter: false, gone: false };
      state = 'aim';
    }
    setPins('all');

    // Ekran koordinatı → kulvar koordinatı (kulvarın sol kenarı 0)
    // Yatay konum topun derinliğinde kulvara çevrilir; dikey kaydırma ekran ölçeğinde kalır
    function toLane(e) {
      const r = cv.getBoundingClientRect(), k = H / (r.width * H / VW), sx = e.clientX - r.left;
      return { x: (sx - r.width / 2) * dep0(BALL_Y) / (r.width * 0.8) + LW / 2, y: (e.clientY - r.top) * k, t: performance.now() };
    }
    function down(e) {
      if (!enabled || state !== 'aim') return;
      const p = toLane(e); if (p.y < H * 0.45) return;
      cv.setPointerCapture(e.pointerId); drag = [p];
      ball.x = aimX = Math.max(BR, Math.min(LW - BR, p.x));
      e.preventDefault();
    }
    function move(e) {
      if (!drag) return; const p = toLane(e); drag.push(p); if (drag.length > 60) drag.shift();
      if (p.y > drag[0].y - 8) { ball.x = aimX = Math.max(BR, Math.min(LW - BR, p.x)); drag = [p]; }
    }
    function up(e) {
      if (!drag) return; const pts = drag; drag = null;
      const last = pts[pts.length - 1], t0 = last.t - 140;
      const first = pts.find(p => p.t >= t0) || pts[0];
      const dt = Math.max(16, last.t - first.t) / 1000, dx = last.x - first.x, dy = last.y - first.y;
      if (dy > -18) return; // yeterince yukarı kaydırılmadı
      throwBall(dx / dt, dy / dt, curve(pts));
    }
    // Kaydırma yolunun eğriliği: başlangıç-bitiş doğrusundan ortadaki sapma topa falso verir
    function curve(pts) {
      if (pts.length < 4) return 0;
      const a = pts[0], b = pts[pts.length - 1], m = pts[Math.floor(pts.length / 2)];
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const off = ((b.x - a.x) * (m.y - a.y) - (b.y - a.y) * (m.x - a.x)) / len;
      return Math.max(-1, Math.min(1, off / 25));
    }
    function throwBall(vx, vy, spin) {
      release(Math.hypot(vx, vy) * 0.9, Math.atan2(vx, -vy), spin);
    }
    const randn = () => (Math.random() + Math.random() + Math.random() - 1.5) * 1.15;
    // Bırakış: elin titremesi hızlı atışta daha çok saptırır; kulvarın küçük kusurları topu hafifçe kaydırır
    function release(sp, ang, spin) {
      sp = Math.max(380, Math.min(1000, sp)) * (1 + randn() * 0.03);
      ang = Math.max(-0.12, Math.min(0.12, ang)) + randn() * (0.005 + 0.009 * sp / 1000);
      ball.vx = Math.sin(ang) * sp; ball.vy = -Math.cos(ang) * sp;
      ball.spin = Math.max(-1, Math.min(1, spin + randn() * 0.08)); ball.drift = randn() * 5; ball.rot = 0;
      state = 'roll'; settleT = 0;
    }
    // Yağ deseni: kulvarın ön üçte ikisi yağlı (top kayar, falso tutmaz), son bölüm kuru (top kancalanır)
    const grip = y => y > 380 ? 0.06 : y > 250 ? 0.06 + 0.94 * (380 - y) / 130 : 1;

    function step(dt) {
      const b = ball;
      if (!b.gone) {
        // Falso: top kulvarın sonuna doğru kancalanır (kaydırma yönünün tersine kıvrılır)
        if (!b.gutter && b.y > -10) {
          const sp = Math.max(300, -b.vy);
          b.vx += (-b.spin * 1500 * grip(b.y) * Math.pow(650 / sp, 1.5) + b.drift) * dt;
          b.vy *= Math.exp(-0.05 * dt);
        }
        b.rot += Math.hypot(b.vx, b.vy) * dt / BR;
        b.x += b.vx * dt; b.y += b.vy * dt;
        if (b.entry == null && b.y < 200) b.entry = [b.x, Math.atan2(b.vx, -b.vy)];
        if (!b.gutter && (b.x < 0 || b.x > LW) && b.y > 205) { b.gutter = true; b.x = b.x < 0 ? -GUT / 2 : LW + GUT / 2; b.vx = 0; }
        if (b.y < -40) b.gone = true;
      }
      for (const p of pins) {
        if (p.gone) continue;
        p.x += p.vx * dt; p.y += p.vy * dt;
        const f = Math.exp(-(p.down ? 2.2 : 6) * dt); p.vx *= f; p.vy *= f;
        if (p.down) p.ang += p.spinR * Math.min(1, Math.hypot(p.vx, p.vy) / 150) * dt;
        else if (p.tilt) { p.wob += dt * 28; p.tilt *= Math.exp(-0.9 * dt); if (p.tilt < 0.05) p.tilt = 0; }
        // Yan duvarlar lobutları geri sektirir (kickback)
        if (p.y < 240 && (p.x < -GUT || p.x > LW + GUT)) { p.x = p.x < 0 ? -GUT : LW + GUT; p.vx = -p.vx * 0.5; }
        if (p.y < -30 || p.y > 320) p.gone = true;
      }
      // Top-lobut çarpışmaları
      if (!b.gone && !b.gutter) for (const p of pins) if (!p.gone) hit(b, BALL_M, BR, p, PIN_M, rad(p));
      // Lobut-lobut çarpışmaları
      for (let i = 0; i < pins.length; i++) for (let j = i + 1; j < pins.length; j++) if (!pins[i].gone && !pins[j].gone) hit(pins[i], PIN_M, rad(pins[i]), pins[j], PIN_M, rad(pins[j]));
    }
    function hit(a, ma, ra, p, mp, rp) {
      const dx = p.x - a.x, dy = p.y - a.y, d = Math.hypot(dx, dy), min = ra + rp;
      if (d >= min || d === 0) return;
      const nx = dx / d, ny = dy / d, ov = min - d, tm = ma + mp;
      a.x -= nx * ov * mp / tm; a.y -= ny * ov * mp / tm; p.x += nx * ov * ma / tm; p.y += ny * ov * ma / tm;
      const rv = (p.vx - a.vx) * nx + (p.vy - a.vy) * ny; if (rv > 0) return;
      const j = -(1 + REST) * rv / (1 / ma + 1 / mp);
      a.vx -= j * nx / ma; a.vy -= j * ny / ma; p.vx += j * nx / mp; p.vy += j * ny / mp;
      // Yeterince sert vurulan lobut devrilir; devrilen lobut da sertçe çarptığını devirir
      // Hafif değen lobut yalnızca sallanır; sarsıntı birikirse ya da sert vurulursa devrilir
      knock(p, j / mp);
      if (a.down === false) knock(a, j / ma);
    }
    const FALL_V = 105;
    // Devrilen lobut yere yatar, boyu (~38 cm) kadar alanı süpürür
    const rad = p => p.down ? 17 : PR;
    function knock(p, v) {
      if (p.down || v < 6) return;
      p.tilt = (p.tilt || 0) + v / FALL_V;
      if (p.tilt >= 1) topple(p);
    }
    function topple(p) {
      p.down = true; p.tilt = 0;
      p.head = (Math.hypot(p.vx, p.vy) > 1 ? Math.atan2(p.vy, p.vx) : Math.random() * 6.3) + randn() * 0.6;
      p.spinR = randn() * 7;
      const k = 0.25 * randn(); const vx = p.vx; p.vx += -p.vy * k; p.vy += vx * k;
    }

    function finish() {
      // Sallanan lobut, sarsıntısı büyükse son anda devrilebilir
      for (const p of pins) if (!p.down && !p.gone && p.tilt > 0.45 && Math.random() < (p.tilt - 0.45) * 1.8) topple(p);
      state = 'done';
      const fell = pins.filter(p => p.down || p.gone), stand = pins.filter(p => !p.down && !p.gone);
      st.onRoll(fell.length, stand.map(p => p.i), ball.gutter);
    }

    // ---------- Çizim: oyuncunun arkasından perspektif ----------
    // Fizik düz kulvar koordinatlarında kalır; çizimde her nokta kameraya uzaklığına göre küçülür.
    // Derinlik yarıya sıkıştırılır ki lobutlar telefonda seçilebilir büyüklükte kalsın.
    let SW = 300, SH = 716, F = 240, HC = 800, HZ = 0;
    // follow: kamera atıştan sonra topu izleyerek lobutlara doğru ilerler
    const D0 = 160, CAMY = 690, FAR = -30, DK = 0.4;
    let follow = 0;
    const dep0 = y => D0 + (CAMY - y) * DK, dep = y => D0 + (CAMY - follow - y) * DK;
    const P = (x, y, z) => { const s = F / dep(y); return [SW / 2 + (x - LW / 2) * s, HZ + (HC - (z || 0)) * s, s]; };
    function camera() {
      F = SW * 0.8;
      const db = dep0(BALL_Y), df = dep0(FAR);
      HC = 0.74 * SH / (F * (1 / db - 1 / df));
      HZ = 0.9 * SH - HC * F / db;
    }
    function quad(x0, x1, y0, y1, fill) {
      const a = P(x0, y0), b = P(x1, y0), c = P(x1, y1), d = P(x0, y1);
      ctx.fillStyle = fill; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.closePath(); ctx.fill();
    }
    function draw() {
      const r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      SW = r.width; SH = r.width * H / VW;
      const w = Math.round(SW * dpr), h = Math.round(SH * dpr);
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); camera();
      // Salon: arka duvar ve zemin
      const top = P(0, FAR)[1];
      const bg = ctx.createLinearGradient(0, 0, 0, SH); bg.addColorStop(0, '#0f1b2a'); bg.addColorStop(0.35, '#1d3047'); bg.addColorStop(1, '#284260');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, SW, SH);
      // Lobut makinesinin perdesi ve altın pervaz
      const wl = P(-60, FAR), wr = P(LW + 60, FAR), ht = 150 * wl[2];
      ctx.fillStyle = '#132235'; ctx.fillRect(wl[0], top - ht, wr[0] - wl[0], ht);
      ctx.fillStyle = '#d9a441'; ctx.fillRect(wl[0], top - ht, wr[0] - wl[0], 3); ctx.fillRect(wl[0], top - 4, wr[0] - wl[0], 2);
      const lamp = ctx.createRadialGradient(SW / 2, top - ht * 0.4, 2, SW / 2, top - ht * 0.4, ht * 1.6);
      lamp.addColorStop(0, 'rgba(255,214,140,.35)'); lamp.addColorStop(1, 'rgba(255,214,140,0)'); ctx.fillStyle = lamp; ctx.fillRect(0, 0, SW, top + 40);
      // Yan kanallar, oluklar ve kulvar
      quad(-GUT - 40, -GUT, FAR, H + 40, '#2b1d12'); quad(LW + GUT, LW + GUT + 40, FAR, H + 40, '#2b1d12');
      quad(-GUT, 0, FAR, H + 40, '#3d2c1e'); quad(LW, LW + GUT, FAR, H + 40, '#3d2c1e');
      const a = P(0, FAR), b = P(LW, H + 40), g = ctx.createLinearGradient(0, a[1], 0, b[1]);
      g.addColorStop(0, '#f0cf98'); g.addColorStop(0.25, '#e4b578'); g.addColorStop(1, '#c58848');
      quad(0, LW, FAR, H + 40, g);
      // Parlak ışık yansıması kulvarın ortasında
      const sh = ctx.createLinearGradient(P(0, 300)[0], 0, P(LW, 300)[0], 0);
      sh.addColorStop(0, 'rgba(255,255,255,0)'); sh.addColorStop(0.5, 'rgba(255,248,230,.28)'); sh.addColorStop(1, 'rgba(255,255,255,0)');
      quad(0, LW, FAR, H + 40, sh);
      // Tahta şeritler
      ctx.strokeStyle = 'rgba(110,62,20,.2)'; ctx.lineWidth = 1;
      for (let x = LW / 39; x < LW; x += LW / 39) { const p0 = P(x, FAR), p1 = P(x, H + 40); ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke(); }
      quad(0, LW, FAR, 215, 'rgba(255,245,225,.22)');
      quad(0, LW, 547, 551, '#8f4319');
      // Nişan okları ve noktaları
      ctx.fillStyle = '#1d3047';
      for (let i = 1; i <= 7; i++) { const x = i * LW / 8, y = 400 + Math.abs(i - 4) * 12, t = P(x, y - 12), l = P(x - 4, y + 6), rr = P(x + 4, y + 6); ctx.beginPath(); ctx.moveTo(t[0], t[1]); ctx.lineTo(l[0], l[1]); ctx.lineTo(rr[0], rr[1]); ctx.fill(); }
      for (let i = 1; i <= 7; i++) { const p = P(i * LW / 8, 520); ctx.beginPath(); ctx.ellipse(p[0], p[1], 2.2 * p[2], 1, 0, 0, 7); ctx.fill(); }
      // Nişan çizgisi
      if (state === 'aim') {
        const last = drag && drag[drag.length - 1], tx = last && drag.length > 1 ? ball.x + (last.x - drag[0].x) * 3 : ball.x;
        const p0 = P(ball.x, ball.y - BR - 4), p1 = P(tx, 205);
        ctx.setLineDash([5, 7]); ctx.strokeStyle = 'rgba(29,48,71,.55)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke(); ctx.setLineDash([]);
      }
      // Nesneler uzaktan yakına sıralanıp çizilir
      const objs = [];
      for (const p of pins) if (!p.gone) objs.push([p.y, () => p.down ? drawFallen(p) : drawPin(p)]);
      if (!ball.gone) objs.push([ball.y, () => drawBall(ball)]);
      objs.sort((u, v) => u[0] - v[0]).forEach(o => o[1]());
      if (state === 'aim' && !drag && enabled) {
        ctx.fillStyle = 'rgba(255,248,230,.92)'; ctx.font = '600 14px Bitter, Georgia, serif'; ctx.textAlign = 'center';
        ctx.fillText('Topu yukarı kaydırarak at', SW / 2, SH - 10);
      }
    }
    function shadow(x, y, rad, a) {
      const p = P(x + 3, y + 2);
      ctx.fillStyle = 'rgba(40,20,5,' + a + ')'; ctx.beginPath(); ctx.ellipse(p[0], p[1], rad * p[2], rad * p[2] * 0.4, 0, 0, 7); ctx.fill();
    }
    // Ayakta lobut: profili gerçek lobut gibi (geniş gövde, ince boyun, yuvarlak baş)
    const PROF = [[0, 0.5], [0.12, 0.85], [0.28, 1], [0.45, 0.82], [0.6, 0.42], [0.7, 0.45], [0.8, 0.56], [0.92, 0.46], [1, 0.12]];
    function drawPin(p) {
      shadow(p.x, p.y, PR * 1.1, 0.28);
      const [bx, by, s] = P(p.x, p.y), h = 72 * s, w = PR * s;
      const lean = p.tilt ? Math.sin(p.wob) * p.tilt * 0.25 : 0;
      ctx.beginPath();
      PROF.forEach(([f, k], i) => { const x = bx - k * w + lean * f * h, y = by - f * h; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
      for (let i = PROF.length - 1; i >= 0; i--) { const [f, k] = PROF[i]; ctx.lineTo(bx + k * w + lean * f * h, by - f * h); }
      ctx.closePath();
      const gr = ctx.createLinearGradient(bx - w, 0, bx + w, 0);
      gr.addColorStop(0, '#d8d2c6'); gr.addColorStop(0.35, '#ffffff'); gr.addColorStop(1, '#bdb5a6');
      ctx.fillStyle = gr; ctx.fill(); ctx.strokeStyle = 'rgba(80,60,40,.35)'; ctx.lineWidth = 0.7; ctx.stroke();
      ctx.save(); ctx.clip(); ctx.fillStyle = '#b3261e';
      for (const f of [0.6, 0.67]) ctx.fillRect(bx - w + lean * f * h, by - f * h - 0.035 * h, w * 2, 0.03 * h);
      ctx.restore();
    }
    // Devrilmiş lobut: yerde yatan, boyuna uzanan bir gövde
    function drawFallen(p) {
      const hd = p.head + p.ang, dx = Math.cos(hd) * 18, dy = Math.sin(hd) * 18;
      const a = P(p.x - dx, p.y - dy, 6), b = P(p.x + dx, p.y + dy, 6), c = P(p.x + dx * 0.55, p.y + dy * 0.55, 6);
      shadow(p.x, p.y, 16, 0.18);
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#efe9dd'; ctx.lineWidth = 12 * (a[2] + b[2]) / 2; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 5 * (a[2] + b[2]) / 2; ctx.beginPath(); ctx.moveTo(a[0], a[1] - 1); ctx.lineTo(b[0], b[1] - 1); ctx.stroke();
      ctx.fillStyle = '#b3261e'; ctx.beginPath(); ctx.arc(c[0], c[1], 3 * c[2], 0, 7); ctx.fill();
    }
    function drawBall(b) {
      shadow(b.x, b.y, BR, 0.35);
      const [x, y, s] = P(b.x, b.y, BR), r = BR * s;
      const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
      g.addColorStop(0, '#5f86b5'); g.addColorStop(0.55, '#1d3047'); g.addColorStop(1, '#0a1420');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      ctx.strokeStyle = 'rgba(217,164,65,.8)'; ctx.lineWidth = 1.2; ctx.stroke();
      // Parmak delikleri top yuvarlandıkça yukarı döner ve arkaya geçince kaybolur
      ctx.fillStyle = '#060b12';
      for (const [hx, ph] of [[-0.28, 0], [0.22, 0.12], [-0.02, -0.55]]) {
        const ang = ph - b.rot, vis = Math.cos(ang); if (vis < 0.15) continue;
        ctx.beginPath(); ctx.ellipse(x + (hx + b.spin * 0.25 * Math.sin(b.rot)) * r, y + Math.sin(ang) * r * 0.75, 0.13 * r, 0.13 * r * vis, 0, 0, 7); ctx.fill();
      }
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(x - r * 0.38, y - r * 0.45, r * 0.22, r * 0.12, -0.6, 0, 7); ctx.fill();
    }

    let prev = performance.now();
    function frame(now) {
      if (dead || !cv.isConnected) { dead = true; return; }
      tick(Math.min(0.05, (now - prev) / 1000)); prev = now;
      draw();
      requestAnimationFrame(frame);
    }
    function tick(dt) {
      if (state === 'roll') {
        const n = Math.ceil(dt / (1 / 240)); for (let i = 0; i < n; i++) step(dt / n);
        settleT += dt;
        const moving = pins.some(p => !p.gone && Math.hypot(p.vx, p.vy) > 4);
        if ((ball.gone && !moving) || settleT > 7) finish();
      }
      const tgt = state === 'aim' ? 0 : state === 'roll' ? (ball.gone ? 330 : Math.max(0, Math.min(330, (BALL_Y - ball.y) * 0.65))) : follow;
      follow += (tgt - follow) * Math.min(1, dt * (state === 'aim' ? 5 : 3));
    }
    cv.style.touchAction = 'none';
    cv.addEventListener('pointerdown', down); cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', () => { drag = null; });
    requestAnimationFrame(frame);

    return {
      setPins, get state() { return state; }, get dead() { return dead; },
      setEnabled(v) { enabled = v; },
      get entry() { return ball.entry; },
      // Test için: gerçek zamanlı atış ve görüntüyü dondurma
      throwNow(x, speed, ang, spin) { ball.x = aimX = x; release(speed, ang, spin || 0); },
      run(sec) { for (let t = 0; t < sec; t += 1 / 60) tick(1 / 60); draw(); },
      // Test için: hız (birim/sn), sapma (radyan) ve falso ile doğrudan atış; anında sonuçlandırır
      simulate(x, speed, ang, spin) { ball.x = aimX = x; release(speed, ang, spin || 0); for (let i = 0; i < 240 * 8 && state === 'roll'; i++) { step(1 / 240); settleT += 1 / 240; if ((ball.gone && !pins.some(p => !p.gone && Math.hypot(p.vx, p.vy) > 4)) || settleT > 7) finish(); } },
    };
  }
  window.TezgahBowling = { mount };
})();
