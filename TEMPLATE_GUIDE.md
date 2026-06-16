# Template Guide

Templates are JSON files used by `docs/builder.html` to create ready-made personal start pages.

## Where templates live

Template definitions live in:

```text
docs/templates/*.json
```

The public catalogue metadata lives in:

```text
docs/templates/catalog.json
```

Standalone example pages live in:

```text
docs/examples/*.html
```

## Template file shape

A typical template file looks like this:

```json
{
  "format": "personal-start-page-creator-v1",
  "title": "Example Start Page",
  "description": "A short description of the template.",
  "filename": "start-page-example.html",
  "columns": 4,
  "colours": "primary",
  "showTitle": true,
  "sections": [
    {
      "name": "Useful Links",
      "colour": "blue",
      "column": 1,
      "included": true,
      "links": [
        {
          "label": "Example",
          "url": "https://example.com/",
          "colour": "blue",
          "included": true
        }
      ]
    }
  ]
}
```

## Required top-level fields

- `format`: use `personal-start-page-creator-v1`.
- `title`: the title loaded into the builder and optionally shown on the exported page.
- `description`: short helper text shown when the template is selected.
- `filename`: suggested export filename.
- `columns`: recommended desktop column count, usually 3, 4 or 5.
- `colours`: `primary` or `pastel`.
- `showTitle`: `true` or `false`.
- `sections`: array of menu sections.

## Section fields

- `name`: section heading.
- `colour`: default header/button colour for the section.
- `column`: preferred desktop column number. This keeps layout stable.
- `included`: optional boolean; use `true` for normal template content.
- `links`: array of link objects.

## Link fields

- `label`: short button text.
- `url`: full URL, including `https://` where possible.
- `colour`: optional per-link colour override.
- `included`: optional boolean; use `true` for normal template content.

## Colour names

Use the colour names already supported by the builder. Existing templates commonly use:

```text
blue, green, orange, purple, red
```

These are enforced by the shared renderer. Unsupported colour values are normalised to blue. Prefer using a consistent colour for a whole section unless a template has a clear reason to vary individual links.

## Content rules

Good templates should be immediately useful, not just placeholders.

Use these editorial rules:

- Prefer stable, well-known and official sources.
- Prefer country-specific links for UK/US variants where the task genuinely differs by country.
- Use short practical labels that work well as buttons.
- Avoid labels that are too similar within one section.
- Avoid login-only links unless they are common enough to be useful.
- Avoid obscure blogs, temporary campaign pages and fragile search-result URLs.
- Keep the tone neutral and user-friendly.
- Avoid political or adult content in general-purpose templates.
- Check that the section mix covers the user journey, not just one narrow aspect of the topic.

## Size and layout guidance

For fuller templates, the recent pattern is:

- about 8–12 sections;
- about 6–10 links per section;
- balanced columns using the `column` field;
- 3 columns for simpler templates;
- 4 columns for richer everyday/work templates;
- 5 columns for large, broad templates.

The exact count can vary. A smaller excellent template is better than a large thin one.

## Files to update when adding or completing a template

For a new available template, update all of these:

1. Add or edit `docs/templates/<template-code>.json`.
2. Add or update the entry in `docs/templates/catalog.json`.
3. Add the template to the dropdown in `docs/builder.html`.
4. Add or update the card in `docs/templates.html`.
5. Generate `docs/examples/start-page-<template-code>.html` with `node tools/generate-examples.js --template <template-code>`.
6. Add or update the example entry in `docs/examples/README.md`.
7. Run `node tools/validate-templates.js`.
8. Add a changelog note in `CHANGELOG.md` for a notable batch.

## Available vs coming soon

In `docs/templates/catalog.json`:

- `available: true` means the template should have a complete JSON file, a builder dropdown option, a public **Build with this** action and a working example page.
- `available: false` means the template may appear as **Coming soon** and should not offer a broken build or example link.


## Generation and validation tools

Run maintainer tools from the repository root:

```bash
node tools/generate-examples.js
node tools/generate-examples.js --template <template-code>
node tools/generate-examples.js --check
node tools/validate-templates.js
```

`generate-examples.js` reads the available entries in `docs/templates/catalog.json` and uses the shared renderer to write the matching files under `docs/examples/`. You can run it locally or use the manual **Generate examples** GitHub Actions workflow. `validate-templates.js` checks the JSON shape, catalogue metadata, builder dropdown, public template links, example README entries, generated examples and local static links.

## Example page expectations

Each example page should be a standalone exported start page created by the same renderer used by the builder. The shared renderer lives in `docs/assets/start-page-renderer.js`; future generation tools should call `htmlFromProject(projectJson)` rather than duplicating export logic.

Each example should also include the embedded builder-readable config block:

```html
<script type="application/json" id="spb-menu-config">
```

This allows the builder to reload the example as structured menu data rather than guessing from visible HTML.

## Final checks for template changes

Before finishing a template change, check:

- the JSON parses;
- labels are short and readable;
- URLs are complete and stable;
- sections have sensible names and colours;
- column placement is balanced;
- catalogue metadata matches the JSON file;
- the builder can load the template;
- the templates page links work;
- `node tools/generate-examples.js --check` reports that examples are up to date;
- `node tools/validate-templates.js` passes;
- the generated example opens and can be reloaded into the builder.
