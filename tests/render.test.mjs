import { test } from 'node:test';
import assert from 'node:assert/strict';
import { render } from '../site.mjs';
test('text and control colors meet AA against all surface endpoints',()=>{
 const luminance = hex => {
  const channels=hex.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
  return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
 };
 for(const foreground of ['253244','556477','285c83']) for(const background of ['fafafc','ffffff','f9e4ee','dff0fc','eee9fa','f3f3f8','cde8fa','e9f5fd','fdf1f6','f4effb','e7f3fd','edf6fc']){
  const ratio=(luminance(background)+.05)/(luminance(foreground)+.05);
  assert.ok(ratio>=4.5,`${foreground} / ${background}: ${ratio}`);
 }
});
for (const page of ['/', '/prudential']) for (const lang of ['id','en']) {
 test(`${page} ${lang}: language, semantics, privacy, destinations`, () => {
  const html = render(page,lang);
  assert.match(html,new RegExp(`<html lang="${lang}">`));
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.match(html,/noindex, nofollow/);
  assert.ok(!/<form|https?:\/\/|mailto:|tel:|wa\.me/.test(html));
  assert.equal((html.match(/<script/g)||[]).length,1);
  assert.match(html, /<script src="\/motion.js" defer><\/script>/);
  assert.match(html, new RegExp(`/assets/retno-${page === '/' ? 'introduction' : 'insurance'}-v3-640.webp`));
  assert.match(html, /retno-chibi-wave.webp/);
  assert.match(html,new RegExp(`href="/prudential${lang==='en'?'\\?lang=en':''}"|href="/${lang==='en'?'\\?lang=en':''}"`));
  for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`),`missing anchor ${id}`);
 });
 test(`${page} ${lang}: public mode omits unresolved sections`,()=>{
  const html=render(page,lang,false);
  assert.ok(!/class="pending"|portrait-monogram|<details>|id="process"/.test(html));
  for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`));
 });
}
