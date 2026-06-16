/*
  Shared Classic Responsive Renderer
  -----------------------------------
  This file contains the project/template conversion and standalone HTML export
  logic used by both the browser builder and maintainer tooling. Keep rendering
  behaviour here so generated examples and browser exports stay in sync.
*/
(function(root, factory){
  const api = factory();
  if(typeof module === "object" && module.exports){ module.exports = api; }
  if(root){ root.StartPageRenderer = api; }
})(typeof globalThis !== "undefined" ? globalThis : this, function(){
const defaultPalette = {
  blue:   "#4d90fe",
  green:  "#35aa47",
  orange: "#d84a38",
  purple: "#852b99",
  red:    "#bd121d"
};
const pastelPalette = {
  blue:   "#8bbcff",
  green:  "#8fd6a3",
  orange: "#f3aa8f",
  purple: "#c69ad6",
  red:    "#e88f96"
};
const allowedColours = ["blue","green","orange","purple","red"];
const allowedColourStyles = ["primary","pastel"];
const MIN_COLUMNS = 2;
const MAX_COLUMNS = 5;
const DEFAULT_COLUMNS = 5;
function escapeHtml(str){
  return String(str ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#39;");
}
function cleanColour(colour){ return allowedColours.includes(colour) ? colour : "blue"; }
function cleanColourStyle(value){ return allowedColourStyles.includes(value) ? value : "primary"; }
function cleanShowTitle(value){ return value !== false && value !== "false" && value !== 0 && value !== "0"; }
function cleanColumnCount(value){
  const n = Number.parseInt(value, 10);
  return n >= MIN_COLUMNS && n <= MAX_COLUMNS ? n : DEFAULT_COLUMNS;
}
function cleanSectionColumn(value, columns){
  const n = Number.parseInt(value, 10);
  const max = cleanColumnCount(columns);
  return n >= 1 && n <= max ? n : null;
}
function sectionWeight(section){
  return 1 + (section.links || []).filter(link => link.included !== false).length;
}
function assignMissingSectionColumns(p){
  const columnCount = cleanColumnCount(p.columns);
  const counts = Array.from({length:columnCount}, () => 0);

  // First honour any valid existing column choices, clamping them to the
  // current column count and adding their weight to that column.
  (p.sections || []).forEach(section => {
    const existing = cleanSectionColumn(section.column ?? section.col ?? section.columnNumber, columnCount);
    if(existing){
      section.column = existing;
      counts[existing - 1] += sectionWeight(section);
    }else{
      section.column = null;
    }
  });

  // Sections without a column are assigned once using the old balancing logic.
  // After that, column placement is stable and controlled by the user.
  (p.sections || []).forEach(section => {
    if(section.column) return;
    let targetIndex = 0;
    let fewest = Infinity;
    counts.forEach((count, i) => {
      if(count < fewest){ fewest = count; targetIndex = i; }
    });
    section.column = targetIndex + 1;
    counts[targetIndex] += sectionWeight(section);
  });
  return p;
}
function normaliseSectionOrder(p){
  // The editor should read like the finished menu: Column 1 sections first,
  // then Column 2, and so on. Existing order within each column is preserved.
  assignMissingSectionColumns(p);
  const columnCount = cleanColumnCount(p.columns);
  p.sections = (p.sections || [])
    .map((section, originalIndex) => ({section, originalIndex}))
    .sort((a, b) => {
      const aColumn = cleanSectionColumn(a.section.column, columnCount) || columnCount;
      const bColumn = cleanSectionColumn(b.section.column, columnCount) || columnCount;
      return aColumn - bColumn || a.originalIndex - b.originalIndex;
    })
    .map(entry => entry.section);
  return p;
}
function makeColumns(count){
  return Array.from({length:cleanColumnCount(count)}, () => ({items:[]}));
}
function ensureHtmlFilename(name){
  let filename = String(name || "start-page.html").trim() || "start-page.html";
  if(!/\.html?$/i.test(filename)) filename += ".html";
  return filename.replace(/[\\/:*?"<>|]+/g,"-");
}
function defaultProject(){
  return {format:"personal-start-page-creator-v1",title:"Personal Start Page",description:"",filename:"start-page.html",columns:DEFAULT_COLUMNS,colours:"primary",showTitle:true,sections:[]};
}
function defaultState(){
  return {
    settings:{pageTitle:"Personal Start Page",pageHeadline:"",menuFilename:"start-page.html",columns:DEFAULT_COLUMNS,colours:"primary",showTitle:true,theme:"light",palette:{...defaultPalette}},
    menu:{columns:makeColumns(DEFAULT_COLUMNS)}
  };
}
function ensureColumnCount(menu, columns){
  const desired = cleanColumnCount(columns);
  const cols = menu.columns || [];
  if(cols.length < desired){ while(cols.length < desired) cols.push({items:[]}); menu.columns = cols; }
  else if(cols.length > desired){
    const keep = cols.slice(0, desired);
    const extra = cols.slice(desired);
    const target = keep[keep.length - 1];
    extra.forEach(c => target.items.push(...(c.items || [])));
    menu.columns = keep;
  }
}
function colorToClasses(color){
  const c = cleanColour(color || "blue");
  return {btn:`spb-${c}-btn`, hdr:`spb-${c}-hdr`};
}
function buildClassicMenuCss(settings){
  const colourStyle = cleanColourStyle(settings.colours || settings.colourStyle || "primary");
  const pal = colourStyle === "pastel" ? pastelPalette : (settings.palette || defaultPalette);
  const isPastel = colourStyle === "pastel";
  const bodyBg = settings.theme === "dark" ? "#111" : "#ffffff";
  const bodyColor = settings.theme === "dark" ? "#e6e6e6" : "#333333";
  const searchBg = settings.theme === "dark" ? "#222" : (isPastel ? "#f8f3f6" : "#f1f1f1");
  const searchBorder = settings.theme === "dark" ? "#444" : (isPastel ? "#eadde6" : "#ddd");
  const headerText = isPastel ? "#222" : "#fff";
  const btnBg = isPastel ? "#f7f5f2" : "#eee";
  const btnHoverBg = isPastel ? "#e9e3dc" : "#aaa";
  return `
:root{--spb-columns:${cleanColumnCount(settings.columns)};--spb-c-blue:${pal.blue};--spb-c-green:${pal.green};--spb-c-orange:${pal.orange};--spb-c-purple:${pal.purple};--spb-c-red:${pal.red};}
body[data-spb-skin="classic"]{margin:0;padding:0;background:${bodyBg};color:${bodyColor};}
.spb-start-page{font-family:Arial,Helvetica,sans-serif;background:${bodyBg};color:${bodyColor};}
.spb-searchbar-wrapper{background:${searchBg};padding:12px 15px;border-bottom:1px solid ${searchBorder};}
.spb-searchbar-inner{width:84%;max-width:96em;margin:0 auto;display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;}
.spb-menu-title{font-family:"Segoe UI",Helvetica,Arial,sans-serif;font-size:20px;line-height:1.2;font-weight:700;color:${bodyColor};white-space:nowrap;}
.spb-searchbar-form{flex:1 1 520px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:14px;min-width:260px;}
.spb-searchbar-form input[type="text"]{flex:1 1 320px;padding:8px 10px;border:1px solid #ccc;border-radius:2px;font-size:15px;min-width:0;}
.spb-searchbar-form input[type="text"]:focus{outline:2px solid var(--spb-c-blue);outline-offset:0;border-color:var(--spb-c-blue);}
.spb-searchbar-form button{padding:8px 16px;border-radius:2px;border:1px solid var(--spb-c-blue);background:var(--spb-c-blue);color:${isPastel ? "#222" : "#fff"};cursor:pointer;font-size:14px;font-weight:700;}
.spb-searchbar-form button:hover{filter:brightness(.92);}
.spb-searchbar-form label{display:inline-flex;align-items:center;gap:4px;font-size:13px;}
.spb-page-headline{padding:12px 15px 0 15px;font-size:20px;font-weight:bold;text-align:center;}
.spb-maincontent{clear:both;width:84%;font-size:.8125em;max-width:96em;margin:0 auto;padding:1em 0;color:${bodyColor};line-height:1.5em;position:relative;}
.spb-section{clear:both;padding:0;margin:0;}
.spb-group{display:flex;flex-wrap:wrap;gap:0 2%;}
.spb-col{box-sizing:border-box;flex:0 0 calc((100% - (var(--spb-columns) - 1)*2%)/var(--spb-columns));max-width:calc((100% - (var(--spb-columns) - 1)*2%)/var(--spb-columns));margin:1% 0;}
@media only screen and (max-width:767px){.spb-col{flex:1 1 100%;max-width:100%;margin:1% 0;}.spb-searchbar-inner,.spb-maincontent{width:100%;padding-left:0;padding-right:0;}.spb-searchbar-inner{display:block;}.spb-menu-title{white-space:normal;margin-bottom:8px;}.spb-maincontent{padding:1em 12px;width:auto;}}
.spb-btn{box-sizing:border-box;text-align:left;display:block;width:100%;color:#333;position:relative;overflow:hidden;margin:8px 0 0;padding:10px 14px;cursor:pointer;outline:0;border-style:none none none solid;border-width:0 0 0 3px;background:${btnBg};z-index:1;font-family:"Segoe UI",Helvetica,Arial,sans-serif;font-size:16px;line-height:18px;text-shadow:#fff 0 1px 0;text-decoration:none;white-space:nowrap;text-overflow:ellipsis;font-weight:600;}
.spb-btn:hover{background-color:${btnHoverBg};color:#000;}
.spb-btn[hidden]{display:none;}
.spb-blue-btn{border-left-color:var(--spb-c-blue);}.spb-green-btn{border-left-color:var(--spb-c-green);}.spb-orange-btn{border-left-color:var(--spb-c-orange);}.spb-purple-btn{border-left-color:var(--spb-c-purple);}.spb-red-btn{border-left-color:var(--spb-c-red);}
.spb-hdr{box-sizing:border-box;text-align:left;display:block;width:100%;color:${headerText};position:relative;overflow:hidden;margin:8px 0 0;padding:10px 14px;cursor:pointer;outline:0;border:0;z-index:1;font-family:"Segoe UI",Helvetica,Arial,sans-serif;font-size:14px;line-height:14px;text-decoration:none;white-space:nowrap;text-overflow:ellipsis;font-weight:700;appearance:none;-webkit-appearance:none;}
.spb-hdr:focus{outline:2px solid #111;outline-offset:2px;}
.spb-blue-hdr{background-color:var(--spb-c-blue);}.spb-green-hdr{background-color:var(--spb-c-green);}.spb-orange-hdr{background-color:var(--spb-c-orange);}.spb-purple-hdr{background-color:var(--spb-c-purple);}.spb-red-hdr{background-color:var(--spb-c-red);}
.spb-hdr-para{margin:0;line-height:160%;}
`;
}
function renderClassicMenuBody(menu, settings, options = {}){
  const columnCount = cleanColumnCount(settings.columns);
  ensureColumnCount(menu, columnCount);
  let body = "";
  const autofocusAttr = options.autofocusSearch ? " autofocus" : "";
  const showTitle = cleanShowTitle(settings.showTitle);
  const titleMarkup = showTitle ? `<div class="spb-menu-title">${escapeHtml(settings.pageTitle || "Personal Start Page")}</div>` : "";
  body += `<div class="spb-start-page" data-spb-menu-root="true">`;
  if(settings.pageHeadline){ body += `<div class="spb-page-headline">${escapeHtml(settings.pageHeadline)}</div>
`; }
  body += `
<div class="spb-searchbar-wrapper">
  <div class="spb-searchbar-inner">
    ${titleMarkup}
    <form class="spb-searchbar-form" method="get" action="https://www.google.co.uk/search">
      <input type="text" name="q" placeholder="Search…" aria-label="Search the web"${autofocusAttr}>
      <label><input type="radio" name="searchtype" value="web" checked> Web</label>
      <label><input type="radio" name="searchtype" value="wiki"> Wikipedia</label>
      <button type="submit">Search</button>
    </form>
  </div>
</div>
<div class="spb-maincontent">
  <div class="spb-section spb-group">
`;
  menu.columns.forEach(col => {
    body += `<div class="spb-col">`;
    (col.items || []).forEach(item => {
      const classes = colorToClasses(item.color || "blue");
      if(item.type === "header"){
        body += `
    <p class="spb-hdr-para">
      <button type="button" class="spb-hdr ${classes.hdr}" data-spb-section-header="true" aria-expanded="true">${escapeHtml(item.text || "")}</button>
    </p>
`;
      }else{
        body += `
    <a class="spb-btn ${classes.btn}" href="${escapeHtml(item.url || "#")}" target="_blank" rel="noopener noreferrer">
      ${escapeHtml(item.text || "")}
    </a>
`;
      }
    });
    body += `</div>`;
  });
  body += `
  </div>
</div>
</div>`;
  return body;
}
function attachClassicMenuBehaviour(root=document, options = {}){
  // Search form: submit a normal Google search, or append a Wikipedia site filter.
  const form = root.querySelector(".spb-searchbar-form, .searchbar-form");
  if(form){
    form.addEventListener("submit", function(){
      const type = form.querySelector('input[name="searchtype"]:checked');
      const q = form.querySelector('input[name="q"]');
      if(type && type.value === "wiki" && q){ q.value = q.value + " site:wikipedia.org"; }
    });

    // Exported pages autofocus the search box. Builder preview disables this.
    const q = form.querySelector('input[name="q"]');
    if(options.focusSearch !== false && q && q.hasAttribute("autofocus")){
      try{ q.focus(); }catch(err){}
    }
  }

  // Section headers collapse or expand the link buttons beneath them.
  // New exports use data-spb-section-header and .spb-btn. The old selectors are
  // retained here so copied/older menu fragments remain understandable.
  const headerSelector = '[data-spb-section-header="true"], [data-section-header="true"]';
  const linkSelector = 'a.spb-btn, a.btn';
  const headerParaSelector = '.spb-hdr-para, .hdr-para';
  const containsHeader = el => !!(el && (el.matches?.(headerSelector) || el.querySelector?.(headerSelector)));
  const isLink = el => !!(el && el.matches?.(linkSelector));

  root.querySelectorAll(headerSelector).forEach(function(header){
    header.addEventListener("click", function(ev){
      ev.preventDefault();

      let current = (header.closest(headerParaSelector) || header).nextElementSibling;
      let shouldHide = false;
      while(current){
        if(containsHeader(current)) break;
        if(isLink(current)){
          shouldHide = !current.hidden && current.style.display !== "none";
          break;
        }
        current = current.nextElementSibling;
      }

      current = (header.closest(headerParaSelector) || header).nextElementSibling;
      while(current){
        if(containsHeader(current)) break;
        if(isLink(current)){
          current.hidden = shouldHide;
          current.style.display = "";
        }
        current = current.nextElementSibling;
      }
      header.setAttribute("aria-expanded", String(!shouldHide));
    });
  });
}
function escapeJsonForScript(json){
  return String(json)
    .replace(/<\/script/gi, "<\\/script")
    .replace(/<!--/g, "<\u0021--")
    .replace(/-->/g, "--\u003e");
}
function exportedProjectFromState(state){
  const exported = internalStateToProject(state);
  exported.description = "Embedded menu config for reloading this exported start page in the Start Page Builder.";
  return normaliseFriendlyProject(exported);
}
function buildEmbeddedMenuConfigScript(state){
  const json = JSON.stringify(exportedProjectFromState(state), null, 2);
  return `<script type="application/json" id="spb-menu-config">\n${escapeJsonForScript(json)}\n<\/script>`;
}
function exportClassicStandaloneHtml(state){
  const css = buildClassicMenuCss(state.settings);
  const body = renderClassicMenuBody(JSON.parse(JSON.stringify(state.menu)), state.settings, {autofocusSearch:true});
  const embeddedConfig = buildEmbeddedMenuConfigScript(state);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(state.settings.pageTitle || "Personal Start Page")}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
${css}
  </style>
</head>
<body data-spb-skin="classic" data-spb-columns="${cleanColumnCount(state.settings.columns)}" data-spb-colours="${cleanColourStyle(state.settings.colours)}" data-spb-show-title="${cleanShowTitle(state.settings.showTitle) ? "true" : "false"}">
${body}
${embeddedConfig}
<script>
  (${attachClassicMenuBehaviour.toString()})(document);
<\/script>
</body>
</html>`;
}

function normaliseFriendlyProject(input){
  const p = defaultProject();
  p.title = input.title || input.settings?.pageTitle || "Personal Start Page";
  p.description = input.description || "";
  p.filename = ensureHtmlFilename(input.filename || input.settings?.menuFilename || "start-page.html");
  p.columns = cleanColumnCount(input.columns ?? input.settings?.columns ?? input.settings?.columnCount ?? DEFAULT_COLUMNS);
  p.colours = cleanColourStyle(input.colours ?? input.colourStyle ?? input.settings?.colours ?? input.settings?.colourStyle ?? "primary");
  p.showTitle = cleanShowTitle(input.showTitle ?? input.settings?.showTitle ?? true);
  p.sections = (input.sections || []).map(section => ({
    name: section.name || section.text || "Section",
    colour: cleanColour(section.colour || section.color || "blue"),
    included: section.included !== false,
    column: cleanSectionColumn(section.column ?? section.col ?? section.columnNumber, p.columns),
    links: (section.links || []).map(link => ({
      label: link.label || link.text || "Link",
      url: link.url || "#",
      colour: cleanColour(link.colour || link.color || section.colour || section.color || "blue"),
      included: link.included !== false
    }))
  }));
  return normaliseSectionOrder(p);
}
function internalStateToProject(input){
  const p = defaultProject();
  p.title = input.settings?.pageTitle || "Personal Start Page";
  p.description = input.settings?.pageHeadline || "";
  p.filename = ensureHtmlFilename(input.settings?.menuFilename || "start-page.html");
  p.columns = cleanColumnCount(input.settings?.columns ?? input.menu?.columns?.length ?? DEFAULT_COLUMNS);
  p.colours = cleanColourStyle(input.settings?.colours ?? input.settings?.colourStyle ?? "primary");
  p.showTitle = cleanShowTitle(input.settings?.showTitle ?? true);
  const sections = [];
  (input.menu?.columns || []).forEach((col, colIndex) => {
    let current = null;
    (col.items || []).forEach(item => {
      if(item.type === "header"){
        current = {name:item.text || "Section", colour:cleanColour(item.color || "blue"), included:true, column:colIndex + 1, links:[]};
        sections.push(current);
      }else if(item.type === "link"){
        if(!current){ current = {name:"Links", colour:cleanColour(item.color || "blue"), included:true, column:colIndex + 1, links:[]}; sections.push(current); }
        current.links.push({label:item.text || "Link", url:item.url || "#", colour:cleanColour(item.color || current.colour), included:true});
      }
    });
  });
  p.sections = sections;
  return normaliseSectionOrder(p);
}
function projectToInternalState(p){
  const state = defaultState();
  state.settings.pageTitle = p.title || "Personal Start Page";
  state.settings.pageHeadline = "";
  state.settings.menuFilename = ensureHtmlFilename(p.filename || "start-page.html");
  state.settings.columns = cleanColumnCount(p.columns);
  state.settings.colours = cleanColourStyle(p.colours || "primary");
  state.settings.palette = state.settings.colours === "pastel" ? {...pastelPalette} : {...defaultPalette};
  state.settings.showTitle = cleanShowTitle(p.showTitle);
  state.menu.columns = makeColumns(state.settings.columns);
  normaliseSectionOrder(p);
  (p.sections || []).filter(s => s.included !== false).forEach(section => {
    const colour = cleanColour(section.colour || "blue");
    const block = [{type:"header", text:section.name || "Section", color:colour}];
    (section.links || []).filter(link => link.included !== false).forEach(link => {
      block.push({type:"link", text:link.label || "Link", url:link.url || "#", color:cleanColour(link.colour || colour)});
    });
    const targetIndex = (cleanSectionColumn(section.column, state.settings.columns) || 1) - 1;
    state.menu.columns[targetIndex].items.push(...block);
  });
  ensureColumnCount(state.menu, state.settings.columns);
  return state;
}
function htmlFromProject(projectJson){
  const project = normaliseFriendlyProject(projectJson || {});
  const state = projectToInternalState(project);
  return exportClassicStandaloneHtml(state);
}

return {
  defaultPalette,
  pastelPalette,
  allowedColours,
  allowedColourStyles,
  MIN_COLUMNS,
  MAX_COLUMNS,
  DEFAULT_COLUMNS,
  escapeHtml,
  cleanColour,
  cleanColourStyle,
  cleanShowTitle,
  cleanColumnCount,
  cleanSectionColumn,
  sectionWeight,
  assignMissingSectionColumns,
  normaliseSectionOrder,
  makeColumns,
  ensureHtmlFilename,
  defaultProject,
  defaultState,
  ensureColumnCount,
  colorToClasses,
  buildClassicMenuCss,
  renderClassicMenuBody,
  attachClassicMenuBehaviour,
  escapeJsonForScript,
  exportedProjectFromState,
  buildEmbeddedMenuConfigScript,
  exportClassicStandaloneHtml,
  normaliseFriendlyProject,
  internalStateToProject,
  projectToInternalState,
  htmlFromProject
};
});
