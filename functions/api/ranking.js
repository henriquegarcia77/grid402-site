// Ranking do tempo de reação (Cloudflare Pages Function + KV).
// Precisa de um namespace KV ligado ao projeto com o nome de variável RANKING.
const KEY = 'reacao';
const clean = n => String(n || '').replace(/[<>&"'\\]/g, '').replace(/\s+/g, ' ').trim().slice(0, 20);
const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const load = async env => { try { return JSON.parse(await env.RANKING.get(KEY)) || [] } catch (e) { return [] } };

export async function onRequestGet({ env }) {
  if (!env.RANKING) return json({ erro: 'sem KV' }, 503);
  return json(await load(env));
}

export async function onRequestPost({ request, env }) {
  if (!env.RANKING) return json({ erro: 'sem KV' }, 503);
  let b; try { b = await request.json() } catch (e) { return json({ erro: 'json' }, 400) }
  const n = clean(b.n), t = Math.round(Number(b.t) * 1000) / 1000;
  if (!n || !(t >= 0.1 && t <= 3)) return json({ erro: 'inválido' }, 400);
  const r = await load(env); const i = r.findIndex(x => x.n.toLowerCase() === n.toLowerCase());
  if (i < 0) r.push({ n, t, d: Date.now() }); else if (t < r[i].t) r[i] = { n, t, d: Date.now() };
  r.sort((a, b) => a.t - b.t); const top = r.slice(0, 100);
  await env.RANKING.put(KEY, JSON.stringify(top));
  return json(top);
}
