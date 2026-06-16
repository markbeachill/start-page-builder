# Release Checklist

Use this checklist before publishing repository changes, especially after template batches or builder changes.

## Manual GitHub Actions

From the GitHub Actions tab, use:

- **Validate site** to check the committed repository without making changes.
- **Generate examples** to regenerate `docs/examples/*.html` from the template JSON files, validate the result and commit generated example changes back to the branch.

GitHub Pages publishing should stay configured separately to publish from `/docs`.

## Command-line checks

From the repository root, run:

```bash
node tools/generate-examples.js --check
node tools/validate-templates.js
node --check docs/assets/start-page-renderer.js
node --check tools/generate-examples.js
node --check tools/validate-templates.js
```

If templates or renderer output changed, regenerate examples first:

```bash
node tools/generate-examples.js
```

## General checks

- [ ] The site runs from `docs/` using a local static server.
- [ ] `docs/index.html` opens correctly.
- [ ] `docs/templates.html` opens correctly.
- [ ] `docs/builder.html` opens correctly.
- [ ] `docs/assets/start-page-renderer.js` loads correctly.
- [ ] Main navigation links work from the edited pages.
- [ ] No accidental editor/temp files are included.

## Template checks

- [ ] `node tools/validate-templates.js` passes.
- [ ] Every changed template JSON file parses successfully.
- [ ] `docs/templates/catalog.json` parses successfully.
- [ ] Available catalogue entries point to real template files.
- [ ] Available catalogue entries point to real example pages.
- [ ] Coming-soon entries do not expose broken build/example links.
- [ ] Template titles, descriptions, columns, colours and filenames match their catalogue entries.
- [ ] The builder dropdown includes every available template.
- [ ] The public templates page includes every available template.
- [ ] `docs/examples/README.md` lists new example pages.

## Builder checks

- [ ] A changed template loads from the builder dropdown.
- [ ] A changed template loads from `builder.html?template=<template-code>`.
- [ ] Preview updates after editing title, columns, colours and links.
- [ ] Section movement still works within and between columns.
- [ ] Link movement still works within and between expanded sections.
- [ ] Saving menu config still downloads valid JSON.
- [ ] Loading menu config still restores the page.
- [ ] Exporting start page still downloads standalone HTML.
- [ ] Renderer output still includes the embedded menu config block.
- [ ] Loading an exported page still prefers the embedded config.

## Example page checks

- [ ] Each new example page opens directly under `docs/examples/`.
- [ ] Each new example has the expected title and sections.
- [ ] Each new example includes the embedded config block:

  ```html
  <script type="application/json" id="spb-menu-config">
  ```

- [ ] Each **Try it** link on `docs/templates.html` points to the correct example.
- [ ] Each **Build with this** link points to the correct builder template query.

## Documentation checks

- [ ] `README.md` still gives a concise project overview.
- [ ] `CHANGELOG.md` records notable user-facing or maintainer-facing changes.
- [ ] `TEMPLATE_GUIDE.md` still matches the actual template format.
- [ ] `ARCHITECTURE.md` still matches the actual builder/site structure.
- [ ] Renderer/tooling notes still match `docs/assets/start-page-renderer.js` and `tools/*.js`.
- [ ] `CONTRIBUTING.md` still matches the actual workflow.

## Packaging check

Check the zip file after packaging, if a zip is being shared:

```bash
unzip -t start-page-builder-updated.zip
```
