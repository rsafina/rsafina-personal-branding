import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
for(const path of ['/','/prudential']) for(const lang of ['id','en']) for(const width of [360,390,768,1440]) {
 test(`${path} ${lang} ${width}`,async({page})=>{
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
  await page.setViewportSize({width,height:1000});
  const response=await page.goto(`${path}${lang==='en'?'?lang=en':''}`);
  expect(response.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang',lang);
  await expect(page.locator('.portrait-photo')).toBeVisible();
  await expect.poll(()=>page.locator('.portrait-photo').evaluate(img=>img.complete && img.naturalWidth>0)).toBe(true);
  expect(await page.locator('.portrait-photo').getAttribute('src')).toContain(path==='/'?'retno-introduction-v3':'retno-insurance-v3');
  const portraitBox=await page.locator('.portrait-frame').boundingBox();
  expect(portraitBox.width).toBeGreaterThanOrEqual(width<=700?120:180);
  expect(portraitBox.width).toBeLessThanOrEqual(width<=700?160:240);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  for(const a of await page.locator('a').all()){
   const href=await a.getAttribute('href');
   if(href.startsWith('#')) expect(await page.locator(href).count()).toBe(1);
   expect(href).not.toMatch(/^(mailto:|tel:)/);
   if(href.startsWith('https:')) expect(['https://www.gameloft.com/','https://accelbyte.io/','https://topgolfer.app/zh']).toContain(href);
  }
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip')).toBeFocused();
  await page.keyboard.press('Enter');
  await page.emulateMedia({reducedMotion:'reduce'});
  expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await expect(page.locator('h1')).toHaveCSS('opacity','1');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator('.chibi')).toBeVisible();
  await expect.poll(()=>page.locator('.chibi').evaluate(img=>img.complete && img.naturalWidth>0)).toBe(true);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  expect(errors).toEqual([]);
  if(width===360||width===1440){await mkdir('artifacts/screenshots',{recursive:true});await page.screenshot({path:`artifacts/screenshots/${path==='/'?'home':'insurance'}-${lang}-${width}.png`,fullPage:true});}
 });
}
test('language survives navigation, refresh and switch',async({page})=>{
 await page.goto('/?lang=en');
 await page.locator('header nav a[href="/prudential?lang=en"]').click();
 await expect(page).toHaveURL(/prudential\?lang=en$/);
 await page.reload();await expect(page.locator('html')).toHaveAttribute('lang','en');
 await page.locator('.brand').click();await expect(page).toHaveURL('/?lang=en');
 await page.locator('.languages a[lang="id"]').click();await expect(page.locator('html')).toHaveAttribute('lang','id');
});
test('FAQ is keyboard operable',async({page})=>{
 await page.goto('/prudential');await page.locator('summary').first().focus();await page.keyboard.press('Enter');await expect(page.locator('details').first()).toHaveAttribute('open','');
});
