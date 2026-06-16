# Personal Start Page Creator

**Live website:** https://markbeachill.github.io/start-page-builder  
**GitHub repository:** https://github.com/markbeachill/start-page-builder

A static GitHub Pages website for creating standalone personal browser start pages. The site lets people choose a jump-start template, customise sections and links in the browser, then export a self-contained HTML start page that can be used locally or published online.

## What it does

- Builds personal start pages made from grouped link sections.
- Loads ready-made templates for everyday, education, work, business, creative, life and hobby use cases.
- Imports and exports menu configurations as JSON.
- Imports link lists from Markdown, CSV and plain text.
- Exports standalone HTML pages that do not depend on this website after saving.
- Provides example pages for completed templates.

## Quick start

Open the live builder:

```text
https://markbeachill.github.io/start-page-builder/builder.html
```

Or run the site locally from the repository:

```bash
cd docs
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Publishing model

This repository is designed to publish GitHub Pages from:

```text
/docs
```

For a user's own exported start page, the simplest publishing rule is to rename the saved file to `index.html` and place it at the top of the chosen GitHub Pages publishing source:

```text
/index.html        if publishing from the repository root
/docs/index.html   if publishing from /docs
```

## Repository structure

```text
README.md                 project overview and entry point
CHANGELOG.md              stage-by-stage project history
CONTRIBUTING.md           maintainer workflow and validation notes
TEMPLATE_GUIDE.md         how to write and update templates
ARCHITECTURE.md           how the static site and builder work
RELEASE_CHECKLIST.md      repeatable checks before publishing changes

.github/
  workflows/
    validate.yml           manually check templates, examples and local links
    generate-examples.yml  manually regenerate example pages and commit changes

tools/
  generate-examples.js     regenerate public example pages from template JSON
  validate-templates.js    validate catalogue, templates, examples and local links

docs/
  .nojekyll
  index.html              public home page
  templates.html          jump-start template catalogue
  why-start-page.html     explanation of custom start pages
  ai-menu-help.html       AI-assisted menu workflow
  github-pages.html       publishing guide
  about.html              about this tool
  help.html               help and notes
  builder.html            browser-based builder app

  assets/
    site.css              public site styling
    start-page-renderer.js shared renderer/export logic

  templates/
    catalog.json          public template catalogue metadata
    *.json                builder template definitions

  examples/
    README.md             index of example pages
    *.html                exported demo start pages
```

## Main project docs

- [Architecture](ARCHITECTURE.md) explains how the static site, builder, templates and exported pages fit together.
- [Template Guide](TEMPLATE_GUIDE.md) explains the content and technical rules for creating new templates.
- [Contributing](CONTRIBUTING.md) explains the recommended editing and validation workflow.
- [Release Checklist](RELEASE_CHECKLIST.md) gives a repeatable checklist for template batches and builder changes.
- [Changelog](CHANGELOG.md) contains the previous stage history.


## Maintainer tools

The repository includes dependency-free Node tools for template maintenance:

```bash
node tools/generate-examples.js
node tools/generate-examples.js --check
node tools/validate-templates.js
```

`generate-examples.js` uses the shared renderer to regenerate `docs/examples/*.html` from the available entries in `docs/templates/catalog.json`. `validate-templates.js` checks catalogue metadata, template JSON shape, builder/template-page consistency, generated examples and local links.

The same checks are available from GitHub Actions as manual workflows:

- **Validate site** runs the syntax, generation check and validation commands without changing the repository.
- **Generate examples** runs the example generator from the template JSON files, validates the result and commits changed example files back to the branch.

## Current status

The current repository stage is **Stage 1.36 — manual GitHub Actions tooling**.

The public site has integrated informational pages, a browser-based builder, a jump-start template catalogue, completed example pages for ready-to-use templates, import/export tools, AI-list paste support, stable section column placement and standalone exported start pages with embedded reload configuration.

## Design rule

The public informational pages use the integrated site design. The builder uses a lighter wrapper around a wide editor and preview workspace. Exported start pages remain standalone HTML and do not depend on the website design.

The classic menu structure is protected: sections, headers, buttons, search bar and collapse behaviour are preserved. Shared renderer/export logic lives in `docs/assets/start-page-renderer.js` so the browser builder and maintainer tooling can create the same standalone HTML from the same JSON. The renderer supports controlled 2–5 column layouts, primary/pastel colour styles, optional title display, namespaced exported classes and embedded reload config.
