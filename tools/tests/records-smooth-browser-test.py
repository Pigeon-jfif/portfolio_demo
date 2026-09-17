"""Checks for native carousel motion and compact landing.
Run: python tools/tests/records-smooth-browser-test.py
Uses the production CSS/JS and local Blob fixtures; no HTTP navigation.
"""
from pathlib import Path
import json, os
from playwright.sync_api import sync_playwright
from browser_harness import load_site
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'docs/records/SMOOTH-TESTS.json'
checks=[]
def check(name, condition, **details):
    checks.append({'test':name,'passed':bool(condition),**details})
    print(('PASS ' if condition else 'FAIL ')+name, details, flush=True)
    if not condition: raise AssertionError(name)
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('BROWSER_EXECUTABLE','/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':900})
    page.set_default_timeout(10000)
    errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    try:
        load_site(page,ROOT,{'fetchCSV':False})
        check('Autoplay starts without a click',page.locator('[data-r-presentation]').get_attribute('data-motion-state')=='running')
        native=page.evaluate('''()=>document.getAnimations().filter(a=>a.effect.target.matches('[data-r-featured-card]')).map(a=>({duration:a.effect.getTiming().duration,easing:a.effect.getTiming().easing,iterations:String(a.effect.getTiming().iterations),start:a.startTime,state:a.playState}))''')
        check('Four persistent native linear animations',len(native)==4 and all(a['duration']==18000 and a['easing']=='linear' and a['iterations']=='Infinity' and a['state']=='running' for a in native),animations=native)
        check('The four timelines stay exactly one slot apart',all(abs(native[i+1]['start']-native[i]['start']-4500)<.01 for i in range(3)))
        page.evaluate('''()=>{window.__styleWrites=0;window.__swaps=[];window.__motionObserver=new MutationObserver(ms=>{for(const m of ms){if(m.attributeName==='style')__styleWrites++;if(m.attributeName==='data-record-id'){const n=m.target,r=n.getBoundingClientRect(),v=document.querySelector('[data-r-motion-viewport]').getBoundingClientRect();__swaps.push({id:n.dataset.recordId,hidden:r.right<=v.left+.2||r.left>=v.right-.2,decoded:n.querySelector('img').complete&&n.querySelector('img').naturalWidth>0});}}});__motionObserver.observe(document.querySelector('[data-r-featured-track]'),{attributes:true,subtree:true});}''')
        samples=page.evaluate('''()=>new Promise(resolve=>{const out=[];const start=performance.now();function sample(time){out.push({time,cards:[...document.querySelector('[data-r-featured-track]').children].map(n=>n.getBoundingClientRect().x)});if(time-start<9500)requestAnimationFrame(sample);else resolve(out);}requestAnimationFrame(sample);})''')
        expected=page.locator('[data-r-featured-track]').evaluate('n=>n.getBoundingClientRect().width*.34/4500')
        wraps=0; velocity=[]
        for a,b in zip(samples,samples[1:]):
            dt=b['time']-a['time']
            if dt<=0:continue
            for x,y in zip(a['cards'],b['cards']):
                dx=x-y
                if dx < -100:wraps+=1
                elif 0<=dx<100:velocity.append(dx/dt)
        check('Motion remains linear over at least two native wraps',wraps>=2 and len(velocity)>100 and min(velocity)>expected*.95 and max(velocity)<expected*1.05,wraps=wraps,frames=len(samples),target_px_s=round(expected*1000,3),min_px_s=round(min(velocity)*1000,3),max_px_s=round(max(velocity)*1000,3))
        check('No per-frame inline style writes',page.evaluate('__styleWrites')==0)
        swaps=page.evaluate('__swaps')
        check('New covers replace decoded content only outside the viewport',len(swaps)>=2 and all(s['hidden'] and s['decoded'] for s in swaps),swaps=swaps)
        check('DOM stays at four cover links',page.locator('[data-r-featured-card]').count()==4)
        requested=page.evaluate('''()=>{const reverse=Object.fromEntries(Object.entries(__localAssets).map(([k,v])=>[v,k]));return [...new Set(__preloadRequests.map(u=>reverse[u]||u))];}''')
        check('Only thumbnails are preloaded, not the full catalogue',len(requested)<12 and all('/thumbs/' in u for u in requested),count=len(requested))
        toggle=page.locator('[data-r-motion-toggle]')
        toggle.click();page.wait_for_timeout(50)
        times=page.evaluate('document.getAnimations().map(a=>a.currentTime)')
        page.wait_for_timeout(220)
        check('Pause preserves the exact native animation times',times==page.evaluate('document.getAnimations().map(a=>a.currentTime)'))
        toggle.click();page.wait_for_timeout(120)
        check('Resume continues from the held time',page.evaluate('document.getAnimations().every(a=>a.playState==="running")') and page.evaluate('document.getAnimations()[0].currentTime')>times[0])
        page.locator('[data-r-motion-viewport]').hover();page.wait_for_timeout(80)
        check('Hover does not pause the carousel',page.locator('[data-r-presentation]').get_attribute('data-motion-state')=='running')
        page.locator('[data-r-featured-card]:not([aria-hidden="true"])').first.focus();page.wait_for_timeout(70)
        check('Keyboard focus safely pauses cover links',page.locator('[data-r-presentation]').get_attribute('data-motion-state')=='paused')
        toggle.focus();page.wait_for_timeout(70)
        check('Leaving cover focus restores playback',page.locator('[data-r-presentation]').get_attribute('data-motion-state')=='running')
        link=page.locator('.r-collection-word')
        check('The discreet collection word still has its destination',link.get_attribute('href')=='./collezione.html')
        for state in ['normal','hover','focus']:
            if state=='hover':link.hover()
            if state=='focus':
                link.focus();page.keyboard.press('Tab');page.keyboard.press('Shift+Tab')
            style=link.evaluate('n=>({line:getComputedStyle(n).textDecorationLine,color:getComputedStyle(n).color,cursor:getComputedStyle(n).cursor,outline:getComputedStyle(n).outlineStyle})')
            check('Collection word has color only, without underline: '+state,style['line']=='none' and style['color']=='rgb(53, 94, 120)' and style['cursor']=='text',style=style)
        check('Keyboard users retain a visible focus outline',link.evaluate('n=>getComputedStyle(n).outlineStyle')!='none')
        link.evaluate('n=>n.blur()')
        check('Copyright is plain text, not a link',page.locator('.footer-records-secret,.footer-bottom p a').count()==0)
        for w,h in [(1366,650),(1280,720),(1366,768),(1440,900),(1536,864),(1920,1080),(1024,768)]:
            page.set_viewport_size({'width':w,'height':h});page.wait_for_timeout(120)
            metrics=page.evaluate('''()=>({scroll:document.documentElement.scrollHeight,height:innerHeight,width:document.documentElement.scrollWidth,viewportWidth:innerWidth,gap:document.querySelector('.site-footer').getBoundingClientRect().top-document.querySelector('#main').getBoundingClientRect().bottom,overflow:getComputedStyle(document.body).overflowY})''')
            check(f'Desktop {w}x{h}: content and footer fit without scroll or clipping',metrics['scroll']<=h and metrics['width']<=w and abs(metrics['gap'])<1 and metrics['overflow'] not in ['hidden','clip'],**metrics)
            if w==1440:page.screenshot(path=str(ROOT.parent/'plastic-pizzas-smooth-desktop.png'),full_page=True)
        for w,h in [(390,844),(320,667)]:
            page.set_viewport_size({'width':w,'height':h});page.wait_for_timeout(120)
            check(f'Mobile {w}: no horizontal overflow or forced crop',page.evaluate('document.documentElement.scrollWidth<=innerWidth && !["hidden","clip"].includes(getComputedStyle(document.body).overflowY)'))
        check('No JavaScript errors',not errors,errors=errors)
    finally:
        OUT.write_text(json.dumps({'environment':'Chromium; production scripts and CSS with local Blob assets, no real HTTP/file navigation. Desktop viewport sizes are CSS pixels.','checks':checks},ensure_ascii=False,indent=2)+'\n')
        browser.close()
print(str(len(checks))+' checks passed.')
