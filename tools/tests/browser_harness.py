"""Render the user's local site in Chromium without navigating restricted URLs.
Local assets are supplied as Blob URLs; scripts/styles are evaluated unchanged.
Only Pigeon.url is adapted to resolve local assets and fetch(CSV) is served in memory.
"""
from pathlib import Path
import base64, re, mimetypes

def load_site(page, root, config=None, hook=None, page_name="dischi.html"):
    page_type = "records" if page_name == "dischi.html" else "record-collection"
    root=Path(root)
    page.set_content(('<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body id="top" data-page="records" data-base="./" data-album=""><header class="site-header" id="site-header"></header><main id="main" tabindex="-1"></main><footer class="site-footer" id="site-footer"></footer></body></html>').replace('data-page="records"',f'data-page="{page_type}"'))
    assets={}
    for folder in ['assets/covers/thumbs','assets/brand'] + (['assets/covers/full'] if page_type == 'record-collection' else []):
        for f in (root/folder).rglob('*'):
            if f.is_file() and f.suffix.lower() in {'.webp','.jpg','.jpeg','.png','.svg'}:
                assets[str(f.relative_to(root))]=[mimetypes.guess_type(f.name)[0],base64.b64encode(f.read_bytes()).decode()]
    f=root/'assets/favicon.svg'
    assets['assets/favicon.svg']=['image/svg+xml',base64.b64encode(f.read_bytes()).decode()]
    page.evaluate('''files => {
        window.__localAssets = {};
        for (const [path, [type, data]] of Object.entries(files)) {
            const raw = atob(data), bytes = Uint8Array.from(raw, c => c.charCodeAt(0));
            window.__localAssets[path] = URL.createObjectURL(new Blob([bytes], {type}));
        }
    }''',assets)
    page.evaluate('''() => {
      window.__preloadRequests = [];
      const NativeImage = window.Image;
      window.Image = class extends NativeImage {
        set src(value) { window.__preloadRequests.push(value); super.src = value; }
        get src() { return super.src; }
      };
    }''')
    for name in ['theme.css','style.css','records.css']:
        page.add_style_tag(content=(root/'assets/css'/name).read_text())
    scripts=re.findall(r'<script[^>]*src="([^"?]+)',(root/page_name).read_text())
    for src in scripts:
        path=src.removeprefix('./')
        page.evaluate((root/path).read_text())
        if path=='assets/js/core.js':
            page.evaluate('''() => {
              const original = Pigeon.url;
              Pigeon.url = value => window.__localAssets[value] || original(value);
            }''')
        if path=='assets/data/records-config.js' and config:
            page.evaluate('c => Object.assign(PIGEON_RECORDS_CONFIG,c)',config)
        if path=='assets/js/records-view.js':
            if hook: page.evaluate(hook)
            page.evaluate('csv => { window.fetch = async () => new Response(csv,{status:200}); }',(root/'data/Dischi.csv').read_text())
    page.wait_for_timeout(350)
