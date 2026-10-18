import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
for(const path of ['/','/prudential']) for(const lang of ['id','en']) for(const width of [360,390,768,1440]) {
 test(`${path} ${lang} ${width}`,async({page})=>{
  await page.setViewportSize({width,height:1000});
  const response=await page.goto(`${path}${lang==='en'?'?lang=en':''}`);
  expect(response.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang',lang);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  for(const a of await page.locator('a').all()){
   const href=await a.getAttribute('href');
   if(href.startsWith('#')) expect(await page.locator(href).count()).toBe(1);
   expect(href).not.toMatch(/^(mailto:|tel:|https?:)/);
  }
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip')).toBeFocused();
  await page.keyboard.press('Enter');
  await page.emulateMedia({reducedMotion:'reduce'});
  expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
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
