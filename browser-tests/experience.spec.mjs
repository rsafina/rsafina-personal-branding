import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

for(const lang of ['id','en']) for(const width of [360,1440]) {
 test(`editorial experience ${lang} ${width}`,async({page})=>{
  await page.setViewportSize({width,height:1100});
  await page.goto(`/${lang==='en'?'?lang=en':''}`);
  const entries=page.locator('.experience-entry');
  await expect(entries).toHaveCount(4);
  expect(await entries.locator('h3').allTextContents()).toEqual(['Gameloft','AccelByte','Golfer',lang==='en'?'Independent Software Builder':'Pengembang Produk Digital Independen']);
  expect(await page.locator('[data-experience="golfer"] a').getAttribute('href')).toBe('https://topgolfer.app/zh');
  await expect(page.locator('[data-experience="golfer"] .experience-label')).toHaveText(lang==='en'?'Selected portfolio work':'Karya portofolio pilihan');
  const text=await page.locator('#experience').innerText();
  expect(text).not.toMatch(/intoch|current employ|current workplace|saat ini|perusahaan saat ini/i);
  await expect(page.locator('.experience-editorial')).toHaveCount(0);
  await expect(entries.locator('.experience-contribution')).toHaveCount(4);
  await expect(entries.locator('.experience-connection')).toHaveCount(4);
  await entries.nth(2).scrollIntoViewIfNeeded();
  await expect(entries.nth(2)).toHaveClass(/is-revealed/);
  expect(await entries.nth(2).evaluate(el=>el.getAnimations().some(a=>a.playState==='running'&&a.effect.getTiming().duration===540))).toBe(true);
  await page.waitForTimeout(650);
  expect(await entries.nth(2).evaluate(el=>getComputedStyle(el).opacity)).toBe('1');
  await page.emulateMedia({reducedMotion:'reduce'});
  expect(await entries.evaluateAll(elements=>elements.every(el=>getComputedStyle(el).opacity==='1'&&getComputedStyle(el).transform==='none'))).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const introBox=await page.locator('.experience-introduction').boundingBox();
  const entryBox=await entries.first().boundingBox();
  expect(width===360?entryBox.y>introBox.y+introBox.height:entryBox.x>introBox.x+introBox.width).toBe(true);
  for(const link of await page.locator('#experience a').all()){
   await link.focus();await expect(link).toHaveCSS('outline-style','solid');
  }
  await mkdir('artifacts/experience',{recursive:true});
  await page.locator('#experience').screenshot({path:`artifacts/experience/${lang}-${width}.png`,style:'.site-header, .skip { visibility: hidden !important; } a:focus { outline: none !important; }'});
 });
}
