// Tezgâh çevrim içi sunucu prototipi (1. aşama): hesaplar, bulut kaydı ve sezon sıralaması.
// Bağımlılık yok: Node 18+ ile `node server/server.js` çalışır. Veriler server/data.json dosyasında tutulur.
// Bu aşamada simülasyon hâlâ istemcide döner; sunucu yalnızca kaydı saklar ve bildirilen net değeri
// makullük kontrolünden geçirir. Hedef mimari (sunucu otoriteli ekonomi) için: tasarim/oyun-tasarim-belgesi.md, bölüm 12.
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = +process.env.PORT || 8790;
const DATA = process.env.TEZGAH_DATA || path.join(__dirname, 'data.json');
const STATIC = path.join(__dirname, '..', 'demo');
const MAX_BODY = 2 * 1024 * 1024;          // bir kayıt ~100-300 KB
const START_MONEY = 2500000;
const MAX_GROWTH_PER_DAY = 1.6;            // net değer bir oyun gününde en fazla 1,6 katına çıkabilir (bot en hızlı ~1,15)

let db = { users: {}, tokens: {}, season: 1 };
try { db = JSON.parse(fs.readFileSync(DATA, 'utf8')); } catch (e) { /* ilk çalıştırma */ }
let dirty = false;
const persist = () => { if (!dirty) return; dirty = false; fs.writeFileSync(DATA + '.tmp', JSON.stringify(db)); fs.renameSync(DATA + '.tmp', DATA); };
setInterval(persist, 2000).unref();

const hash = (pw, salt) => crypto.scryptSync(pw, salt, 32).toString('hex');
const json = (res, code, body) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(body)); };
const userOf = req => { const m = /^Bearer (\w+)$/.exec(req.headers.authorization || ''); const t = m && db.tokens[m[1]]; return t ? db.users[t.u] : null; };
const nameOk = n => typeof n === 'string' && /^[\p{L}\p{N} ._-]{3,24}$/u.test(n.trim());

function readBody(req) {
  return new Promise((ok, bad) => {
    let n = 0; const parts = [];
    req.on('data', c => { n += c.length; if (n > MAX_BODY) { bad(new Error('çok büyük')); req.destroy(); } else parts.push(c); });
    req.on('end', () => { try { ok(parts.length ? JSON.parse(Buffer.concat(parts).toString('utf8')) : {}); } catch (e) { bad(e); } });
  });
}
function login(res, u) {
  const tok = crypto.randomBytes(24).toString('hex');
  db.tokens[tok] = { u: u.key, at: Date.now() }; dirty = true;
  json(res, 200, { token: tok, name: u.name });
}

const routes = {
  'POST /api/register': async (req, res) => {
    const { name, password } = await readBody(req);
    if (!nameOk(name)) return json(res, 400, { error: 'Ad 3-24 karakter olmalı (harf, rakam, boşluk, . _ -)' });
    if (typeof password !== 'string' || password.length < 8) return json(res, 400, { error: 'Şifre en az 8 karakter olmalı' });
    const key = name.trim().toLocaleLowerCase('tr-TR');
    if (db.users[key]) return json(res, 409, { error: 'Bu ad alınmış' });
    const salt = crypto.randomBytes(16).toString('hex');
    db.users[key] = { key, name: name.trim(), salt, pw: hash(password, salt), created: Date.now(), save: null, nw: START_MONEY, day: 0, season: db.season, badges: [] };
    dirty = true; login(res, db.users[key]);
  },
  'POST /api/login': async (req, res) => {
    const { name, password } = await readBody(req);
    const u = typeof name === 'string' && db.users[name.trim().toLocaleLowerCase('tr-TR')];
    if (!u || typeof password !== 'string' || !crypto.timingSafeEqual(Buffer.from(hash(password, u.salt), 'hex'), Buffer.from(u.pw, 'hex'))) return json(res, 401, { error: 'Ad ya da şifre yanlış' });
    login(res, u);
  },
  'GET /api/save': async (req, res) => { const u = userOf(req); if (!u) return json(res, 401, { error: 'Giriş gerekli' }); json(res, 200, { save: u.save }); },
  // Kayıt yükleme: net değer ve oyun günü istemciden gelir; önceki kayda göre makul değilse reddedilir.
  'PUT /api/save': async (req, res) => {
    const u = userOf(req); if (!u) return json(res, 401, { error: 'Giriş gerekli' });
    const { state, nw, day } = await readBody(req);
    if (!state || typeof state !== 'object' || !(nw >= -1e12 && nw < 1e13) || !(day >= 0)) return json(res, 400, { error: 'Geçersiz kayıt' });
    const sameSeason = (state.comp && state.comp.season) === u.season;
    const dd = Math.max(1, day - (sameSeason ? u.day : 0)), base = sameSeason ? Math.max(u.nw, START_MONEY) : START_MONEY;
    if (nw > base * Math.pow(MAX_GROWTH_PER_DAY, dd)) return json(res, 422, { error: 'Net değer artışı olağan dışı; kayıt reddedildi' });
    if (sameSeason && day < u.day) return json(res, 409, { error: 'Sunucudaki kayıt daha yeni' });
    Object.assign(u, { save: state, nw, day, season: (state.comp && state.comp.season) || u.season, savedAt: Date.now() }); dirty = true;
    json(res, 200, { ok: true });
  },
  'GET /api/board': async (req, res) => {
    const list = Object.values(db.users).filter(u => u.season === db.season).sort((a, b) => b.nw - a.nw).slice(0, 50).map((u, i) => ({ place: i + 1, name: u.name, nw: Math.round(u.nw), day: u.day }));
    json(res, 200, { season: db.season, board: list });
  },
};

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.json': 'application/json' };
function serveStatic(req, res) {
  const rel = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+/, '') || 'index.html';
  const file = path.resolve(STATIC, rel);
  if (!file.startsWith(STATIC + path.sep) && file !== STATIC) return json(res, 403, { error: 'yasak' });
  fs.readFile(file, (err, buf) => { if (err) return json(res, 404, { error: 'bulunamadı' }); res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' }); res.end(buf); });
}

const server = http.createServer(async (req, res) => {
  const route = routes[req.method + ' ' + new URL(req.url, 'http://x').pathname];
  try { if (route) await route(req, res); else if (req.method === 'GET') serveStatic(req, res); else json(res, 404, { error: 'bulunamadı' }); }
  catch (e) { json(res, 400, { error: 'İstek okunamadı' }); }
});
if (require.main === module) server.listen(PORT, () => console.log('Tezgâh sunucusu: http://localhost:' + PORT));
process.on('SIGINT', () => { dirty = true; persist(); process.exit(0); });
module.exports = { server, routes };
