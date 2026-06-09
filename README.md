# Personal Start Page Creator — Stage 1.6

**Live website:** https://markbeachill.github.io/start-page-builder  
**GitHub repository:** https://github.com/markbeachill/start-page-builder

A static GitHub Pages website for creating standalone personal start pages.

## GitHub Pages

Set GitHub Pages to publish from:

```text
/docs
```

## Structure

```text
docs/
  index.html          integrated public home page
  templates.html      integrated templates / manual demo workflow page
  help.html           integrated help page
  builder.html        light-wrapper app page
  assets/site.css     public site styling
  templates/*.json    starter templates
  examples/README.md  place exported demo menus here
```

## Design rule

The public informational pages use the integrated site design. The builder uses only a light top navigation wrapper. Exported start pages remain standalone HTML and do not depend on the website design.

## Stage 1.1 features

- Integrated home, templates and help pages.
- Light-wrapper builder page.
- Template selector: Typical UK User, Software Developer, Typical US User, Blank.
- Import JSON, Markdown, CSV and plain text.
- Export standalone HTML, project JSON, Markdown and plain text.
- Manual example workflow: export demo pages from the builder and place them in `docs/examples/`.
- No framework, no backend, no account, no external library dependency.

## Local testing

```bash
cd docs
python3 -m http.server 8000
```

Open `http://localhost:8000`.


## Stage 1.2 note

The builder page has been adjusted back toward the original unconstrained workspace model: top navigation, compact action toolbar, wide editor pane, and standalone-friendly preview. JSON import accepts saved project JSON, internal builder config JSON, and friendly template JSON with a `sections` array.

## Stage 1.6 note

The builder now loads the selected starter template on first page load instead of silently restoring browser auto-save. If an auto-save exists, a **Restore browser save** button appears in the toolbar. This avoids the empty-preview problem caused by a previous saved state with all sections excluded.


## Stage 1.6 point update

This point update keeps the section **Use** control, but makes it safer and clearer:

- Sections are used by default when templates or imported lists are loaded.
- The label remains **Use**, because it means “use this section in the final menu”, not merely “show it in the editor”.
- Added **Use all** and **Use none** controls.
- Added an editor hint explaining what Use does.
- If every section is unticked, the preview now explains what has happened instead of looking broken.
- The builder remains a wide, top-nav-only workspace.
