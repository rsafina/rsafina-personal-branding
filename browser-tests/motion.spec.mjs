import {test,expect} from '@playwright/test';

for(const path of ['/','/prudential']) {
 test(`live motion, sticky navigation and hover: ${path}`,async({page})=>{
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(path,{waitUntil:'domcontentloaded'});
  const timings=await page.locator('.hero-enter').evaluateAll(elements=>elements.map(el=>({duration:getComputedStyle(el).animationDuration,delay:getComputedStyle(el).animationDelay})));
  expect(timings.map(t=>t.delay)).toEqual(['0s','0.085s','0.17s','0.255s']);
  expect(timings.every(t=>t.duration==='0.58s')).toBe(true);
  // Sample the rendered property across real animation time, rather than relying on screenshots.
  const startOpacity=Number(await page.locator('h1').evaluate(el=>getComputedStyle(el).opacity));
  expect(startOpacity).toBeGreaterThan(0);
  expect(startOpacity).toBeLessThan(1);
  await page.waitForTimeout(850);
  expect(await page.locator('h1').evaluate(el=>getComputedStyle(el).opacity)).toBe('1');
  const driftBefore=await page.locator('.glow-blue').evaluate(el=>getComputedStyle(el).transform);
  await page.waitForTimeout(400);
  expect(await page.locator('.glow-blue').evaluate(el=>getComputedStyle(el).transform)).not.toBe(driftBefore);
  const button=page.locator('.hero .button');await button.hover();await page.waitForTimeout(250);
  await expect(button).toHaveCSS('background-color','rgb(40, 92, 131)');
  expect(await button.evaluate(el=>getComputedStyle(el).transform)).not.toBe('none');
  await button.focus();await expect(button).toHaveCSS('outline-style','solid');
  const target=path==='/'?page.locator('.role-grid'):page.locator('.process');
  await target.scrollIntoViewIfNeeded();
  await expect(page.locator('.site-header')).toHaveClass(/is-scrolled/);
  expect((await page.locator('.site-header').boundingBox()).y).toBe(0);
  if(path==='/'){
   await page.waitForTimeout(650);
   const card=page.locator('.role-card').first();await card.hover();await page.waitForTimeout(250);
   expect(await card.evaluate(el=>getComputedStyle(el).transform)).toContain('-4');
  }else{
   await expect(page.locator('.process')).toHaveClass(/is-revealed/);
   expect(await page.locator('.process').evaluate(el=>getComputedStyle(el).opacity)).toBe('1');
   const live=await page.locator('.steps li').evaluateAll(els=>els.flatMap(el=>el.getAnimations().map(a=>({state:a.playState,duration:a.effect.getTiming().duration,transform:getComputedStyle(el).transform}))));
   expect(live.some(a=>a.state==='running' && a.duration===520)).toBe(true);
   await page.waitForTimeout(850);
   expect(await page.locator('.steps li').evaluateAll(els=>els.every(el=>getComputedStyle(el).opacity==='1'))).toBe(true);
   expect(await page.locator('.steps').evaluate(el=>getComputedStyle(el,'::before').transform)).toBe('matrix(1, 0, 0, 1, 0, 0)');
  }
  await page.locator('.greeting').scrollIntoViewIfNeeded();
  await expect(page.locator('.greeting')).toHaveClass(/is-revealed/);
  expect(await page.locator('.chibi').evaluate(el=>el.getAnimations().some(a=>a.playState==='running'))).toBe(true);
  await page.waitForTimeout(750);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.locator('.greeting').scrollIntoViewIfNeeded();
  expect(await page.locator('.chibi').evaluate(el=>el.getAnimations().length)).toBe(0);
  await page.locator('.site-header nav a[href="#about"]').click();
  await page.waitForTimeout(900);
  const anchorTop=(await page.locator('#about').boundingBox()).y;
  expect(anchorTop).toBeGreaterThan((await page.locator('.site-header').boundingBox()).height);
  await expect(page.locator('.site-header nav a[href="#about"]')).toHaveAttribute('aria-current','location');
  await page.emulateMedia({reducedMotion:'reduce'});
  expect(await page.locator('.glow-blue').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
  expect(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length)).toBe(0);
 });
}

test('JavaScript disabled: both pages retain visible content and working native controls',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,reducedMotion:'reduce'});
 const page=await context.newPage();
 for(const path of ['/','/prudential']){
  await page.goto(`http://127.0.0.1:3000${path}?lang=en`);
  await expect(page.locator('h1')).toHaveCSS('opacity','1');
  await expect(page.locator('#about')).toBeVisible();
  await page.locator('.languages a[lang="id"]').click();await expect(page.locator('html')).toHaveAttribute('lang','id');
  if(path==='/prudential') {await page.locator('summary').first().click();await expect(page.locator('details').first()).toHaveAttribute('open','');}
 }
 await context.close();
});

test('missing animation API: initialization fails open',async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.addInitScript(()=>{window.IntersectionObserver=undefined;});
 await page.goto('/prudential');
 await expect(page.locator('.process')).toBeVisible();
 expect(await page.locator('.process').evaluate(el=>getComputedStyle(el).opacity)).toBe('1');
 expect(errors).toEqual([]);
});

test('mobile process reveals as a connected vertical sequence',async({page})=>{
 await page.setViewportSize({width:360,height:900});await page.goto('/prudential?lang=en');
 await page.locator('.process').scrollIntoViewIfNeeded();
 await expect(page.locator('.process')).toHaveClass(/is-revealed/);
 expect(await page.locator('.steps').evaluate(el=>getComputedStyle(el,'::before').animationName)).toBe('process-line-vertical');
 const positions=await page.locator('.step-number').evaluateAll(elements=>elements.map(el=>({x:el.getBoundingClientRect().x,y:el.getBoundingClientRect().y})));
 expect(new Set(positions.map(p=>p.x)).size).toBe(1);
 expect(positions.every((p,i)=>i===0||p.y>positions[i-1].y)).toBe(true);
 await page.waitForTimeout(900);
 expect(await page.locator('.steps li').evaluateAll(elements=>elements.every(el=>getComputedStyle(el).opacity==='1'))).toBe(true);
});

test('reduced motion on initial load shows everything without movement',async({browser})=>{
 const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();
 for(const path of ['/','/prudential']) for(const lang of ['id','en']){
  await page.goto(`http://127.0.0.1:3000${path}${lang==='en'?'?lang=en':''}`);
  expect(await page.locator('[data-reveal],.hero-enter').evaluateAll(elements=>elements.every(el=>getComputedStyle(el).opacity==='1'&&getComputedStyle(el).transform==='none'))).toBe(true);
  expect(await page.evaluate(()=>document.getAnimations().length)).toBe(0);
 }
 await context.close();
});

// Regression: groups already painted must never be hidden again (the former 1 → 0.1 blink).
for(const [path,width] of [['/',1440],['/prudential',1440],['/?lang=en',390],['/prudential?lang=en',390]]) {
 test(`no blink while scrolling down and back: ${path} ${width}`,async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.addInitScript(()=>{
   window.__drops=[];const last=new WeakMap();
   const tick=()=>{document.querySelectorAll('[data-reveal],.steps li,.hero-enter').forEach(el=>{
    const r=el.getBoundingClientRect();if(r.bottom<=0||r.top>=innerHeight)return;
    const o=+getComputedStyle(el).opacity,prev=last.get(el);
    if(prev!==undefined&&o<prev-.05)window.__drops.push(`${el.className} ${prev}→${o}`);last.set(el,o);});
    requestAnimationFrame(tick);};requestAnimationFrame(tick);
  });
  await page.goto(path);await page.waitForTimeout(700);
  for(let i=0;i<40;i++){await page.mouse.wheel(0,150);await page.waitForTimeout(30);}
  for(let i=0;i<4;i++){await page.mouse.wheel(0,-1500);await page.waitForTimeout(20);}
  await page.waitForTimeout(900);
  expect(await page.evaluate(()=>window.__drops)).toEqual([]);
  await page.evaluate(()=>scrollTo({top:document.body.scrollHeight,behavior:'instant'}));await page.waitForTimeout(900);
  expect(await page.locator('[data-reveal]').evaluateAll(els=>els.every(el=>getComputedStyle(el).opacity==='1'))).toBe(true);
 });
}

test('content already in view at load is never hidden or replayed',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/');await page.evaluate(()=>scrollTo({top:1800,behavior:'instant'}));await page.waitForTimeout(300);
 await page.reload();await page.waitForTimeout(100);
 const visible=await page.locator('[data-reveal]').evaluateAll(els=>els.filter(el=>{const r=el.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;}).map(el=>({pending:el.classList.contains('reveal-pending'),opacity:getComputedStyle(el).opacity})));
 expect(visible.length).toBeGreaterThan(0);
 expect(visible.every(v=>!v.pending&&v.opacity==='1')).toBe(true);
});
