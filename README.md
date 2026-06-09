# Personal Start Page Creator — Stage 1.1

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


## Live site and repository

- Website: https://markbeachill.github.io/start-page-builder
- Repository: https://github.com/markbeachill/start-page-builder

## Stage 1.2 note

The builder page has been adjusted back toward the original unconstrained workspace model: top navigation, compact action toolbar, wide editor pane, and standalone-friendly preview. JSON import accepts saved project JSON, internal builder config JSON, and friendly template JSON with a `sections` array.
