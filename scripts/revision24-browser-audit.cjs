/* Targeted revision 24 browser audit. Run with the primary-runtime Node binary. */
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('C:/Users/Marco Quevedo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const args=Object.fromEntries(process.argv.slice(2).map(a=>a.split('=')));
const root=path.resolve(__dirname,'..');
const out=path.resolve(root,'..','qa-revision24');
const base=process.env.R24_PREVIEW_URL||args.R24_PREVIEW_URL||'http://127.0.0.1:4173/en/';
(async()=>{
 await fs.mkdir(out,{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--disable-gpu','--no-first-run']});
 const results=[];
 const report=process.env.R24_REPORT||args.R24_REPORT||'catalog-map-results.json';
 for(const locale of (process.env.R24_LOCALES||args.R24_LOCALES||'en').split(',')){
 const localeBase=base.replace(/\/(?:en|es|pt-br|de|fr|it|ru)\/$/,'/'+locale+'/');
 const shotPrefix='catalog-map-'+(locale==='en'?'':locale+'-');
 for(const width of (process.env.R24_WIDTHS||args.R24_WIDTHS||'1440,390,320').split(',').map(Number)){
  const context=await browser.newContext({viewport:{width,height:width===1440?1000:844},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage();let errors=[],failed=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('requestfailed',r=>{if(/\.(?:js|css|webp|jpe?g|png|svg)(?:\?|$)/i.test(r.url()))failed.push({url:r.url(),error:r.failure()?.errorText});});
  for(const route of (process.env.R24_ROUTES||args.R24_ROUTES||'world,vehicles,items,people').split(',')){
   errors=[];failed=[];
   await page.goto(localeBase+'#'+route,{waitUntil:'domcontentloaded'});
   await page.waitForTimeout(1300);
   const result={locale,width,route};
   const expected={world:'.r24-map-room',vehicles:'.cinematic-vehicles',items:'.r24-equipment-hero',people:'.r24-people-hero'};
   result.integrated=await page.locator(expected[route]).count()>0;
   if(route==='world'){
    await page.locator('#map-categories input').first().waitFor({timeout:15000}).catch(()=>{});
    result.map=await page.evaluate(()=>({titles:[...document.querySelectorAll('.map-heading h1,.map-heading .eyebrow')].map(n=>n.textContent),categories:document.querySelectorAll('[data-map-category]').length,state:window.ViceMap?.getViewState?.(),heading:document.querySelector('.map-heading')?.getBoundingClientRect().toJSON()}));
    if(width<=700)await page.locator('#map-filters-toggle').click();
    const category=page.locator('[data-map-category]').first();
    if(await category.count()){
     const label=await category.getAttribute('data-map-category');
     const before=await category.isChecked();await category.setChecked(!before);await page.waitForTimeout(100);
     result.map.categoryToggle={label,before,after:await category.isChecked(),enabled:await page.evaluate(()=>window.ViceMap.getViewState().enabledCategories.length)};
     await category.setChecked(before);
    }
    if(width<=700)await page.locator('#map-filters-toggle').click();
    await page.locator('#map-expand').click();
    result.map.expanded=await page.locator('#atlas-map-room').evaluate(e=>e.classList.contains('map-expanded'));
    await page.locator('#map-expand').click();
   }
   if(route==='items')result.items=await page.evaluate(()=>({evidence:document.querySelectorAll('#main .catalog-evidence').length,standaloneCompare:document.querySelectorAll('#main .catalog-compare-link').length,tabs:[...document.querySelectorAll('[data-catalog-tab]')].map(x=>x.textContent),heroHeight:document.querySelector('.cinematic-items')?.getBoundingClientRect().height}));
   result.layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>i.complete&&i.naturalWidth===0&&i.currentSrc).map(i=>i.currentSrc),wideElements:[...document.querySelectorAll('#main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>innerWidth+2&&r.height>0&&getComputedStyle(e).position!=='fixed';}).slice(0,8).map(e=>({tag:e.tagName,className:typeof e.className==='string'?e.className:'svg',width:Math.round(e.getBoundingClientRect().width)}))}));
   await page.screenshot({path:path.join(out,shotPrefix+route+'-'+width+'.png'),fullPage:false});
   if(route==='items'){
    await page.locator('#weapon-group-handguns').scrollIntoViewIfNeeded().catch(()=>{});await page.screenshot({path:path.join(out,shotPrefix+'items-handguns-'+width+'.png'),fullPage:false});
    for(const tab of ['gear','services','weapons']){await page.locator('[data-catalog-tab="'+tab+'"]').click();await page.waitForTimeout(100);}
    result.items.tabsFunctional=await page.locator('[data-catalog-tab="weapons"]').evaluate(e=>e.classList.contains('active'));
   }
   if(route==='vehicles'){
    await page.goto(localeBase+'#vehicles?entry=cheetah',{waitUntil:'domcontentloaded'});await page.locator('#detail-dialog[open] .r24-vehicle-dossier').waitFor({timeout:10000});await page.waitForTimeout(200);
    await page.locator('.dossier-opening').scrollIntoViewIfNeeded();
    result.vehicle=await page.evaluate(()=>({compact:!!document.querySelector('.r24-vehicle-dossier'),compare:!!document.querySelector('.dossier-compare'),dataRows:document.querySelectorAll('.r24-vehicle-dossier .dossier-facts>div').length,notes:[...document.querySelectorAll('.r24-vehicle-dossier .evidence-note')].map(p=>p.textContent),overflow:document.querySelector('#detail-dialog').scrollWidth>document.querySelector('#detail-dialog').clientWidth+1}));
    await page.screenshot({path:path.join(out,shotPrefix+'vehicle-detail-'+width+'.png'),fullPage:false});
    await page.locator('.dossier-history').scrollIntoViewIfNeeded().catch(()=>{});await page.screenshot({path:path.join(out,shotPrefix+'vehicle-history-'+width+'.png'),fullPage:false});
    await page.keyboard.press('Escape');
   }
   result.errors=[...new Set(errors)];result.failed=failed;results.push(result);
   await fs.writeFile(path.join(out,report),JSON.stringify(results,null,2));
   console.log(JSON.stringify({width,route,integrated:result.integrated,overflow:result.layout.overflow,brokenImages:result.layout.brokenImages.length,errors:result.errors.length}));
  }
  await context.close();
 }
 }
 await browser.close();console.log('Audit complete: '+out);
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
