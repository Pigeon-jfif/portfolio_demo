"""Chromium checks with local Blob fixtures; no network/server is required.
The production CSS and JS are executed unchanged. See browser_harness.py.
Usage: BROWSER_EXECUTABLE=/usr/bin/chromium python tools/tests/records-motion-browser-test.py
"""
from pathlib import Path
import json,os,sys
from playwright.sync_api import sync_playwright
from browser_harness import load_site
ROOT=Path(__file__).resolve().parents[2]
GROUP=sys.argv[1] if len(sys.argv)>1 else 'all'
if GROUP not in ('all','motion','preferences','small','network','catalog'): raise SystemExit('Use: motion | preferences | small | network | catalog | all')
OUT=ROOT/('docs/records/PRESENTATION-TESTS-'+GROUP+'.json')
checks=[]
def check(name, condition, **details):
    checks.append({'test':name,'passed':bool(condition),**details})
    print(('PASS ' if condition else 'FAIL ')+name,details,flush=True)
    if not condition: raise AssertionError(name)
def state(page):
    return page.locator('[data-r-presentation]').get_attribute('data-motion-state')
def positions(page):
    return page.locator('[data-r-featured-track]').evaluate('(t)=>[...t.children].map(n=>({id:n.dataset.recordId,x:n.getBoundingClientRect().x,y:n.getBoundingClientRect().y}))')
def trace(page,ms):
    return page.evaluate('''ms=>new Promise(resolve=>{
      const frames=[],root=document.querySelector('[data-r-featured-track]');
      const ids=new WeakMap();let serial=0,start=performance.now();
      const timer=setInterval(()=>{
        frames.push({time:performance.now(),cards:[...root.children].map(n=>{
          if(!ids.has(n))ids.set(n,++serial);
          return {uid:ids.get(n),x:n.getBoundingClientRect().x,id:n.dataset.recordId};
        })});
        if(performance.now()-start>=ms){clearInterval(timer);resolve(frames);}
      },65);
    })''',ms)
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('BROWSER_EXECUTABLE','/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
    def page_for(name='dischi.html',config=None,hook=None,reduced='no-preference',width=1440):
        page=browser.new_page(viewport={'width':width,'height':1000},reduced_motion=reduced)
        page.errors=[]
        page.on('pageerror',lambda e:page.errors.append(str(e)))
        load_site(page,ROOT,{'fetchCSV':False,**(config or {})},hook,page_name=name)
        return page
    try:
        if GROUP in ('all','motion'):
            page=page_for()
            page.wait_for_function("document.querySelector('[data-r-presentation]').dataset.motionState==='running'")
            check('Autoplay starts without a click',state(page)=='running')
            check('Landing has metrics, but no catalogue or dialog',page.locator('#records-metrics').count()==1 and page.locator('#record-results,#record-dialog,#numeri').count()==0)
            loaded=page.evaluate('''()=>{const reverse=Object.fromEntries(Object.entries(__localAssets).map(([k,v])=>[v,k]));return [...new Set(__preloadRequests.map(u=>reverse[u]||u))];}''')
            check('Startup preloads remain bounded after ZIP-backed cover loading',len(loaded) <= 5,requested=loaded)
            check('One word links to La collezione',page.locator('.r-featured-caption a').count()==1 and page.locator('.r-collection-word').get_attribute('href')=='./collezione.html')
            samples=trace(page,9500)
            wraps=0;velocities=[]
            for before,after in zip(samples,samples[1:]):
                previous={c['uid']:c for c in before['cards']}
                wraps+=sum(c['x']-previous[c['uid']]['x']>100 for c in after['cards'] if c['uid'] in previous)
                dt=after['time']-before['time'];prev={c['uid']:c for c in before['cards']}
                for c in after['cards']:
                    if c['uid'] in prev:
                        dx=prev[c['uid']]['x']-c['x']
                        if 0<=dx<50:velocities.append(dx/dt)
            expected=page.locator('[data-r-featured-track]').evaluate('t=>t.getBoundingClientRect().width*.34/4500')
            check('Native constant movement across two offscreen wraps',wraps>=2 and min(velocities)>expected*.45 and max(velocities)<expected*1.7,cycles=wraps,min_px_s=round(min(velocities)*1000,2),max_px_s=round(max(velocities)*1000,2),target_px_s=round(expected*1000,2))
            check('DOM stays at four cards',all(len(f['cards'])==4 for f in samples))
            page.locator('[data-r-motion-toggle]').click();page.wait_for_timeout(70)
            before=positions(page);page.wait_for_timeout(300)
            check('Pausa freezes the exact frame',positions(page)==before and state(page)=='paused')
            page.locator('[data-r-motion-toggle]').click();page.wait_for_timeout(250)
            check('Riprendi resumes without resetting the sequence',state(page)=='running' and positions(page)!=before)
            page.locator('[data-r-motion-viewport]').hover();page.wait_for_timeout(150)
            check('A stationary mouse does not stop autoplay',state(page)=='running')
            page.locator('[data-r-featured-card]').nth(1).focus();page.wait_for_timeout(70)
            before=positions(page);page.wait_for_timeout(150)
            check('Keyboard focus safely pauses the moving link',positions(page)==before and state(page)=='paused')
            page.locator('[data-r-motion-toggle]').focus();page.wait_for_timeout(100)
            check('Leaving the cover restores movement',state(page)=='running')
            for width in [320,390,768,1024,1440]:
                page.set_viewport_size({'width':width,'height':1000});page.wait_for_timeout(100)
                check('Landing responsive '+str(width),page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
            check('Landing has no JS errors',not page.errors,errors=page.errors)
            page.close()

        if GROUP in ('all','preferences'):
            page=page_for(reduced='reduce')
            page.wait_for_timeout(200)
            check('Requested autoplay also works with OS reduced motion',state(page)=='running')
            a=positions(page);page.wait_for_timeout(250)
            check('Reduced-motion CSS does not disable this explicit carousel setting',positions(page)!=a)
            page.close()
            page=page_for(config={'featuredRespectReducedMotion':True},reduced='reduce')
            check('Opt-in respect for OS preference remains available',state(page)=='paused')
            page.close()

        if GROUP in ('all','small'):
            for size in [1,3]:
                hook=f'Pigeon.records.all=Pigeon.records.featuredRecords({size});'
                page=page_for(config={'featuredAnimationMs':800},hook=hook)
                data=trace(page,2400)
                check(f'Small catalogue ({size} cover): loops, no empty slots',all(len(f['cards'])==4 for f in data) and any(a['cards'][1]['x']!=b['cards'][1]['x'] for a,b in zip(data,data[1:])))
                check(f'Small catalogue ({size}): all images decoded',page.locator('[data-r-featured-card] img').evaluate_all('(images)=>images.every(i=>i.complete&&i.naturalWidth>0)'))
                page.close()
        if GROUP in ('all','network'):
            slow='''(()=>{const Prev=window.Image;let n=0;window.Image=class extends Prev{set src(v){this.__pending=true;const delay=++n>4?2100:0;setTimeout(()=>{this.__pending=false;super.src=v;},delay);}get src(){return super.src;}get complete(){return this.__pending?false:super.complete;}};})()'''
            page=page_for(config={'featuredAnimationMs':800},hook=slow)
            data=trace(page,3000)
            check('Slow next image: movement continues using decoded covers',all(len(f['cards'])==4 for f in data) and len({round(f['cards'][1]['x'],1) for f in data})>15)
            check('Slow next image: no blank visible images',page.locator('[data-r-featured-card] img').evaluate_all('(images)=>images.every(i=>i.complete&&i.naturalWidth>0)'))
            page.close()
            page=page_for(hook='Pigeon.records.covers={};')
            check('No artwork: collection link remains usable',page.locator('.r-collection-word').is_visible() and page.locator('[data-r-featured-card]').count()==0)
            check('No artwork: no JS errors',not page.errors)
            page.close()
            page=page_for(hook="Pigeon.records.covers[Pigeon.records.featuredRecords()[0].id].thumb='assets/covers/thumbs/not-found.webp';")
            page.wait_for_timeout(800)
            check('A failed thumbnail is replaced without a global reshuffle',state(page)=='running' and page.locator('[data-r-featured-card] img').evaluate_all('(images)=>images.every(i=>i.complete&&i.naturalWidth>0)'))
            check('Failed thumbnail: no uncaught JS error',not page.errors)
            page.close()

        if GROUP in ('all','catalog'):
            page=page_for('collezione.html')
            check('Collection has no carousel and no landing metrics',page.locator('[data-r-presentation],#records-metrics').count()==0)
            check('Title, listening note and random picker are together',page.locator('.r-collection-intro h1').inner_text().replace('\n',' ')=='La collezione.' and page.locator('.r-collection-intro [data-r-action="random"]').count()==1 and page.locator('.r-collection-note').is_visible())
            check('Statistics are the last content section',page.locator('.records-collection>section').last.get_attribute('id')=='numeri')
            check('20 artists on the first page',page.locator('[data-r-artist]').count()==20)
            page.locator('#record-search').fill('Queen');page.wait_for_timeout(220)
            check('Search still works on the new page',page.locator('[data-r-artist]').count()==1 and 'Queen' in page.locator('[data-r-artist]').inner_text())
            page.locator('[data-r-action="random"]').click();page.wait_for_timeout(100)
            check('Cosa ascolto opens a filtered record',page.locator('#record-dialog').evaluate('(d)=>d.open') and 'Queen' in page.locator('.r-detail-artist').inner_text())
            page.locator('[data-r-action="close-record"]').click();page.wait_for_timeout(200)
            check('Record closes cleanly',not page.locator('#record-dialog').evaluate('(d)=>d.open'))
            page.locator('#record-search').fill('');page.wait_for_timeout(220)
            page.locator('[data-record-view="albums"]').click()
            check('Album view retained',page.locator('#record-results .r-record-card').count()==20)
            page.locator('[data-r-page-size]').select_option('40');page.wait_for_timeout(100)
            check('Page size switch retained',page.locator('#record-results .r-record-card').count()==40)
            page.locator('[data-record-view="list"]').click()
            check('List view retained',page.locator('#record-results .r-list-row').count()==40)
            page.locator('[data-record-view="artists"]').click()
            page.locator('[data-r-artist]').first.click();page.wait_for_timeout(400)
            check('Artist panel still opens',page.locator('.r-artist-panel:not([hidden])').count()==1)
            page.locator('.r-artist-panel:not([hidden]) [data-record-id]').first.click();page.wait_for_timeout(100)
            check('Artist album still opens a record',page.locator('#record-dialog').evaluate('(d)=>d.open'))
            page.locator('[data-r-action="close-record"]').click();page.wait_for_timeout(180)
            for width in [320,390,768,1024,1440]:
                page.set_viewport_size({'width':width,'height':1000});page.wait_for_timeout(150)
                check('Collection responsive '+str(width),page.evaluate('document.documentElement.scrollWidth<=innerWidth'))
            check('Collection has no JS errors',not page.errors,errors=page.errors)
            page.close()
    finally:
        OUT.write_text(json.dumps({'environment':'Chromium, production scripts/CSS, local Blob image fixtures; no real HTTP or file URL navigation (blocked by environment).','checks':checks},ensure_ascii=False,indent=2)+'\n')
        browser.close()
print(str(len(checks))+' checks passed.')
