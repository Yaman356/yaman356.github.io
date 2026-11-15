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
      pins = PINS.map((p, i) => ({ i, x: p.x, y: p.y, vx: 0, vy: 0, down: false, gone: false, ang: 0, on: ids === 'all' || ids.includes(i) })).filter(p => p.on);
      ball = { x: aimX, y: BALL_Y, vx: 0, vy: 0, spin: 0, gutter: false, gone: false };
      state = 'aim';
    }
    setPins('all');

    // Ekran koordinatı → kulvar koordinatı (kulvarın sol kenarı 0)
    function toLane(e) {
      const r = cv.getBoundingClientRect(), k = VW / r.width;
      return { x: (e.clientX - r.left) * k - WALL, y: (e.clientY - r.top) * k, t: performance.now() };
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
      let sp = Math.hypot(vx, vy); const cap = Math.max(380, Math.min(1000, sp * 0.9));
      const ang = Math.max(-0.16, Math.min(0.16, Math.atan2(vx, -vy)));
      ball.vx = Math.sin(ang) * cap; ball.vy = -Math.cos(ang) * cap; ball.spin = spin;
      state = 'roll'; settleT = 0;
    }

    function step(dt) {
      const b = ball;
      if (!b.gone) {
        // Falso: top kulvarın sonuna doğru kancalanır (kaydırma yönünün tersine kıvrılır)
        if (!b.gutter && b.y < 470) b.vx += -b.spin * 260 * dt;
        b.x += b.vx * dt; b.y += b.vy * dt;
        if (!b.gutter && (b.x < 0 || b.x > LW) && b.y > 205) { b.gutter = true; b.x = b.x < 0 ? -GUT / 2 : LW + GUT / 2; b.vx = 0; }
        if (b.y < -40) b.gone = true;
      }
      for (const p of pins) {
        if (p.gone) continue;
        p.x += p.vx * dt; p.y += p.vy * dt;
        const f = Math.exp(-(p.down ? 2.2 : 6) * dt); p.vx *= f; p.vy *= f;
        if (p.down) p.ang += Math.hypot(p.vx, p.vy) * dt * 0.02;
        // Yan duvarlar lobutları geri sektirir (kickback)
        if (p.y < 240 && (p.x < -GUT || p.x > LW + GUT)) { p.x = p.x < 0 ? -GUT : LW + GUT; p.vx = -p.vx * 0.5; }
        if (p.y < -30 || p.y > 320) p.gone = true;
      }
      // Top-lobut çarpışmaları
      if (!b.gone && !b.gutter) for (const p of pins) if (!p.gone) hit(b, BALL_M, BR, p, PIN_M, PR);
      // Lobut-lobut çarpışmaları
      for (let i = 0; i < pins.length; i++) for (let j = i + 1; j < pins.length; j++) if (!pins[i].gone && !pins[j].gone) hit(pins[i], PIN_M, PR, pins[j], PIN_M, PR);
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
      if (j / mp > 45) p.down = true;
      if (a.down === false && j / ma > 45) a.down = true;
    }

    function finish() {
      state = 'done';
      const fell = pins.filter(p => p.down || p.gone), stand = pins.filter(p => !p.down && !p.gone);
      st.onRoll(fell.length, stand.map(p => p.i), ball.gutter);
    }

    // ---------- Çizim ----------
    function draw() {
      const r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.round(r.width * dpr), h = Math.round(r.width * H / VW * dpr);
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      const k = w / VW; ctx.setTransform(k, 0, 0, k, WALL * k, 0);
      // Duvarlar ve oluklar
      ctx.fillStyle = '#1d3047'; ctx.fillRect(-WALL, 0, VW, H);
      ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-GUT, 0, GUT, H); ctx.fillRect(LW, 0, GUT, H);
      const g = ctx.createLinearGradient(0, 0, LW, 0); g.addColorStop(0, '#c98d4e'); g.addColorStop(0.5, '#e2b679'); g.addColorStop(1, '#c98d4e');
      ctx.fillStyle = g; ctx.fillRect(0, 0, LW, H);
      // Tahta şeritler
      ctx.strokeStyle = 'rgba(110,62,20,.18)'; ctx.lineWidth = 1;
      for (let x = LW / 39; x < LW; x += LW / 39) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      // Lobut alanı ve faul çizgisi
      ctx.fillStyle = 'rgba(255,245,225,.25)'; ctx.fillRect(0, 0, LW, 215);
      ctx.fillStyle = '#8f4319'; ctx.fillRect(0, 548, LW, 3);
      // Nişan okları ve noktaları
      ctx.fillStyle = '#1d3047';
      for (let i = 1; i <= 7; i++) { const x = i * LW / 8, y = 400 + Math.abs(i - 4) * 12; ctx.beginPath(); ctx.moveTo(x, y - 9); ctx.lineTo(x - 4, y + 5); ctx.lineTo(x + 4, y + 5); ctx.fill(); }
      for (let i = 1; i <= 7; i++) { ctx.beginPath(); ctx.arc(i * LW / 8, 520, 2, 0, 7); ctx.fill(); }
      // Lobut yerleri
      ctx.fillStyle = 'rgba(29,48,71,.22)'; for (const p of PINS) { ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, 7); ctx.fill(); }
      // Lobutlar: önce devrilenler, sonra ayaktakiler
      for (const p of pins) if (!p.gone && p.down) drawPin(p);
      for (const p of pins) if (!p.gone && !p.down) drawPin(p);
      // Nişan çizgisi
      if (state === 'aim') {
        ctx.setLineDash([4, 7]); ctx.strokeStyle = 'rgba(29,48,71,.55)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(ball.x, ball.y - BR - 4);
        const last = drag && drag[drag.length - 1], tx = last && drag.length > 1 ? ball.x + (last.x - drag[0].x) * 3 : ball.x;
        ctx.lineTo(tx, 205); ctx.stroke(); ctx.setLineDash([]);
      }
      if (!ball.gone) drawBall(ball);
      if (state === 'aim' && !drag && enabled) {
        ctx.fillStyle = 'rgba(29,48,71,.82)'; ctx.font = '600 13px Bitter, Georgia, serif'; ctx.textAlign = 'center';
        ctx.fillText('Topu yukarı kaydırarak at', LW / 2, 632 - 6);
      }
    }
    function drawPin(p) {
      ctx.save(); ctx.translate(p.x, p.y);
      if (p.down) {
        ctx.rotate(Math.atan2(p.vy, p.vx) + p.ang);
        ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(2, 3, 20, 7, 0, 0, 7); ctx.fill();
        ctx.fillStyle = '#fbf6ec'; ctx.beginPath(); ctx.ellipse(0, 0, 19, 6.5, 0, 0, 7); ctx.fill();
        ctx.fillStyle = '#b3261e'; ctx.fillRect(4, -5.5, 3, 11);
      } else {
        ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.beginPath(); ctx.arc(2, 3, PR, 0, 7); ctx.fill();
        ctx.fillStyle = '#fbf6ec'; ctx.beginPath(); ctx.arc(0, 0, PR, 0, 7); ctx.fill();
        ctx.strokeStyle = '#b3261e'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(0, 0, 6.5, 0, 7); ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-1.5, -1.5, 3, 0, 7); ctx.fill();
      }
      ctx.restore();
    }
    function drawBall(b) {
      ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.arc(b.x + 3, b.y + 4, BR, 0, 7); ctx.fill();
      const g = ctx.createRadialGradient(b.x - 7, b.y - 7, 2, b.x, b.y, BR);
      g.addColorStop(0, '#4b6d96'); g.addColorStop(0.6, '#1d3047'); g.addColorStop(1, '#0f1b2a');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, BR, 0, 7); ctx.fill();
      ctx.strokeStyle = '#d9a441'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#0a121c'; for (const [dx, dy] of [[-5, -6], [3, -7], [-1, 2]]) { ctx.beginPath(); ctx.arc(b.x + dx, b.y + dy, 2.4, 0, 7); ctx.fill(); }
    }

    let prev = performance.now();
    function frame(now) {
      if (dead || !cv.isConnected) { dead = true; return; }
      let dt = Math.min(0.05, (now - prev) / 1000); prev = now;
      if (state === 'roll') {
        const n = Math.ceil(dt / (1 / 240)); for (let i = 0; i < n; i++) step(dt / n);
        settleT += dt;
        const moving = pins.some(p => !p.gone && Math.hypot(p.vx, p.vy) > 4);
        if ((ball.gone && !moving) || settleT > 7) finish();
      }
      draw();
      requestAnimationFrame(frame);
    }
    cv.style.touchAction = 'none';
    cv.addEventListener('pointerdown', down); cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', () => { drag = null; });
    requestAnimationFrame(frame);

    return {
      setPins, get state() { return state; }, get dead() { return dead; },
      setEnabled(v) { enabled = v; },
      // Test için: hız (birim/sn), sapma (radyan) ve falso ile doğrudan atış; anında sonuçlandırır
      simulate(x, speed, ang, spin) { ball.x = aimX = x; ball.vx = Math.sin(ang) * speed; ball.vy = -Math.cos(ang) * speed; ball.spin = spin || 0; state = 'roll'; settleT = 0; for (let i = 0; i < 240 * 8 && state === 'roll'; i++) { step(1 / 240); settleT += 1 / 240; if ((ball.gone && !pins.some(p => !p.gone && Math.hypot(p.vx, p.vy) > 4)) || settleT > 7) finish(); } },
    };
  }
  window.TezgahBowling = { mount };
})();
