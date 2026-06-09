# Personal Start Page Creator

Live website: https://markbeachill.github.io/start-page-builder

GitHub repository: https://github.com/markbeachill/start-page-builder

A static GitHub Pages site for creating personal browser start pages.

## Current stage

Stage 1.7 adds public-site messaging and real example pages:

- UK everyday start page example
- US everyday start page example
- Software developer start page example
- UK and US templates with equal billing
- clearer user-facing wording: “download start page”, “save editable project”, “open saved project/template”
- better default filenames such as `start-page-uk.html`, `start-page-us.html`, and `start-page-software.html`
- a Build with AI guide for Markdown, CSV and JSON menu creation
- a GitHub Pages publishing guide
- mobile support messaging

## GitHub Pages setup

Publish from the `/docs` folder.

## Structure

```text
README.md
docs/
  index.html
  builder.html
  templates.html
  help.html
  ai-menu-help.html
  github-pages.html
  .nojekyll
  assets/
    site.css
  templates/
    typical-uk-user.json
    typical-us-consumer.json
    software-developer.json
    blank.json
  examples/
    start-page-uk-links.html
    start-page-us-links.html
    start-page-software.html
```

## Design rule

The public information pages may use the integrated website design. The builder uses only a light wrapper. Exported start pages remain standalone-friendly and should not depend on the website design.

## Protected layout rule

The classic five-column start page renderer is treated as protected. Improve the surrounding service, templates and guidance without redesigning the proven menu layout.
