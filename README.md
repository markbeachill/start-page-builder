# Personal Start Page Creator — Stage 1.31 — link drag between sections

**Live website:** https://markbeachill.github.io/start-page-builder  
**GitHub repository:** https://github.com/markbeachill/start-page-builder

A static GitHub Pages website for creating standalone personal browser start pages.

## Stage 1.31 — link drag between sections

Stage 1.31 lets links be moved between sections using the existing link drag handles.

- Link drag-and-drop now works across expanded sections, not only within the same section.
- Dropping a link onto another link row inserts it at that position.
- Dropping a link into the empty link area of a section appends it to that section.
- Empty sections can receive dragged links.
- Dragging still starts only from the link handle, so text fields, URL fields, selects and buttons remain safe to click and edit.
- Existing link ↑ / ↓ buttons still reorder within the current section.
- Section drag-and-drop remains limited to reordering sections within the same column.
- The preview, browser draft, saved menu config and exported start page all reflect the new link location.

## Previous Stage 1.30 — editor ordering by column

Stage 1.30 makes the builder editor match the new stable column model from Stage 1.29.

- Section cards are now grouped by column in the editor: Column 1 first, then Column 2, and so on.
- Added visible column dividers such as `Column 1 · 3 sections`.
- Empty columns are shown with a small placeholder message so users can see where sections can be moved.
- Ordering within each column is preserved.
- Section **←** and **→** movement now places the moved section at the bottom of the destination column.
- Section **↑** and **↓** continue to reorder within the current column.
- Section drag-and-drop still works within the current column only.
- The exported start page output is unchanged; this is an editor usability improvement.

## Previous Stage 1.29 — stable section column placement

Stage 1.29 changes section placement so columns are predictable rather than repeatedly auto-balanced.

- Each section now has a stored column number.
- Templates and older files without section column numbers are auto-assigned once using the previous balancing logic.
- After that, section placement stays stable unless the user changes it.
- Section cards now show their column number, for example `Col 3`.
- Added section **←** and **→** controls to move a section left or right between columns.
- Existing section **↑** and **↓** controls now reorder sections within the current column.
- Section drag-and-drop is kept to reordering within the same column.
- If the column count is reduced, sections in removed columns move into the last remaining column. For example, column 5 sections move to column 4 when changing from five to four columns.
- Menu config JSON and embedded exported-page config now include section-level `column` values.
- Example pages and templates were regenerated with stable section column values.

## Previous Stage 1.28 — editor expand/collapse controls

Stage 1.28 adds simple builder-wide editor controls for working with large menus.

- Added **Expand all** and **Collapse all** controls above the section editor.
- **Collapse all** hides link rows and add-link controls across all sections, leaving section headers, Use checkboxes, colours, drag handles and section movement buttons visible.
- This makes large templates easier to reorder without changing the exported start page.
- **Expand all** restores the full link editor.
- The collapse state is editor-only and is not saved into menu configs or exported start pages.

## Previous Stage 1.27 — section reordering

This stage adds section reordering to the builder editor.

- Section cards now have a dedicated drag handle.
- Sections can be dragged up or down to change their order.
- Existing ↑ / ↓ section movement buttons remain as a reliable fallback.
- Dragging is deliberately limited to the section handle so text fields, selects and buttons do not lose focus.
- Link dragging within a section still works as before.
- Reordered sections update the preview, browser draft, saved menu config and exported start page.

## Previous Stage 1.26 update

This stage improves another six jump-start templates with fuller, more practical menus and regenerated examples.

Enhanced templates:

- Creative Pros
- Creators
- News Buffs — UK
- News Buffs — US
- Health & Wellness — UK
- Health & Wellness — US

Each upgraded template now has a richer set of sections, practical short button labels, country-specific official links where useful, recommended columns, colour style and title display settings, and a regenerated standalone example page.

## Previous Stage 1.25 update

Stage 1.25 improved portability and the AI-assisted menu workflow.

- Exported start pages embed a builder-readable menu config in:

  ```html
  <script type="application/json" id="spb-menu-config">
  ```

- Loading an existing start page checks for that embedded config first, then falls back to parsing older visible HTML.
- The embedded config contains the exported/visible menu content and settings, making saved start pages easier to reload into the builder.
- The builder includes **Paste list from AI**.
- Pasted Markdown, CSV and plain-text lists can be imported without first saving a temporary file.
- If pasted text contains `START OF LIST` and `END OF LIST`, the builder imports only the marked block and ignores surrounding AI commentary.
- The AI Help page explains an interactive workflow: chat, refine, type **Menu finished**, copy the marked list, then paste it into the builder.

## Previous Stage 1.24 update

Stage 1.24 namespaced the exported menu HTML/CSS/JS so it is safer to copy into, or adapt for, an existing website.

- Exported menu CSS classes use an `spb-` prefix, for example `spb-btn`, `spb-hdr`, `spb-col`, `spb-searchbar-form` and `spb-menu-title`.
- Exported CSS variables use an `--spb-` prefix, for example `--spb-columns` and `--spb-c-blue`.
- Exported body data attributes use `data-spb-*`, for example `data-spb-columns`, `data-spb-colours` and `data-spb-show-title`.
- Section headers are real `<button type="button">` controls with `aria-expanded`.
- Collapse behaviour uses the `hidden` attribute.
- Import compatibility is retained for older exported files using `.btn`, `.hdr`, `.col`, `data-columns`, `data-colours`, `data-show-title` and `--columns`.

## GitHub Pages

Set this project website to publish from:

```text
/docs
```

For a user's own published start page, the simplest rule is:

```text
Rename the saved start page to index.html.
```

Then put `index.html` at the top of the chosen GitHub Pages publishing source:

```text
/index.html        if publishing from the repository root
/docs/index.html   if publishing from /docs
```

## Structure

```text
docs/
  index.html              integrated public home page
  templates.html          jump-start template catalogue and example pages
  why-start-page.html     explanation of why a custom start page is useful
  ai-menu-help.html       instructions for building a menu with AI
  github-pages.html       publishing guide
  about.html              about this tool
  help.html               help and notes
  builder.html            light-wrapper app page
  assets/site.css         public site styling
  templates/*.json        starter templates
  examples/*.html         exported demo start pages
```

## Design rule

The public informational pages use the integrated site design. The builder uses only a light top navigation wrapper. Exported start pages remain standalone HTML and do not depend on the website design.

The classic menu structure is still protected: sections, headers, buttons, search bar and collapse behaviour are preserved. The renderer now supports controlled 2–5 column layouts, Primary/Pastel colour styles, optional title display, namespaced exported classes, and embedded reload config.

## Current features

- Integrated home, templates, AI help, publishing, about and help pages.
- Light-wrapper builder page with wide editor and preview panes.
- Jump-start template catalogue with **Build with this** and **Try it** actions.
- Template selector with everyday, workplace, software, education, business, creative, life and hobbies templates.
- Real example start pages for ready-to-use templates.
- Adjustable desktop column count: 2, 3, 4 or 5 columns.
- Primary or Pastel colour style.
- Show/hide page title beside search.
- Mobile layout automatically stacks to one column.
- Save/load start page as first-class actions.
- Save/load menu config as first-class actions.
- Load existing exported start page HTML back into the builder.
- Exported start pages include embedded builder config for easier reloading.
- Import list from file: Markdown, CSV and plain text.
- Paste list from AI: Markdown, CSV and plain text, with START/END marker support.
- Export list dropdown: Markdown and plain text.
- Section cards are grouped by column in the editor, with ↑ / ↓ controls, ← / → column movement, and a drag handle for reordering within a column.
- Link rows have ↑ / ↓ controls and can be dragged within their section to reorder links.
- Section **Use** control remains, with sections used by default.
- Responsive classic renderer with full-width buttons, calculated column widths and search-first behaviour.
- Namespaced exported menu classes and attributes reduce clashes when adapting the menu for other sites.
- Publishing page recommends renaming saved start pages to `index.html` for GitHub Pages.
- AI instruction blocks include copy-to-clipboard buttons.
- No framework, no backend, no account, no external library dependency.

## File concepts

- **Start page**: the finished `.html` page used in a browser or published online.
- **Menu config**: the `.json` configuration file that lets this builder reload sections, links, colours, column count, title display and settings later.
- **List**: Markdown, CSV or plain text used for importing/exporting links.

## Local testing

```bash
cd docs
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Notes for future stages

- Continue improving thin jump-start templates in editorial batches.
- Keep exported menu compatibility with older files.
- Keep public wording aimed at ordinary users rather than technical users.
