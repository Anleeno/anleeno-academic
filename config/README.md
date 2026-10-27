# Website configuration

You can update the website by editing the JSON files in this folder. You do not
need to edit React or CSS source code for the content listed below.

| File | What it controls |
| --- | --- |
| `site.json` | Browser title, search description, document language, and copyright name |
| `hero.json` | Profile, title, labels, résumé, and social links |
| `about.json` | Biography and quote |
| `news.json` | News timeline |
| `publications.json` | Publication cards |
| `publication-previews.json` | Optional custom paper preview content and layouts |
| `paper-recommendations.json` | Related Papers and optional Daily Papers |
| `experience.json` | Experience cards |
| `education.json` | Optional education section and its visibility |
| `awards.json` | Optional selected awards section and its visibility |
| `projects.json` | Project cards |
| `theme.jsonc` | Website colors, with inline comments |

## Configuration structure

The JSON files contain website content; `theme.jsonc` contains theme settings.
`schemas/` defines validation rules and is not website content. Configuration
is shared through `src/siteConfig.js`, keeping content separate from components.

## Site identity

Edit `site.json` for site-wide metadata. `title` sets the browser tab title,
`description` sets the HTML search description, `language` is a language tag such
as `en` or `zh-CN`, and `copyrightName` sets the footer name. The copyright year
and Last updated date remain automatic. Profile details stay in `hero.json`.
Refresh the development page after editing metadata; rebuild and redeploy for production.

## Editing JSON

- Text must be inside double quotation marks.
- Each field uses the format `"field": "value"`.
- Separate neighboring fields and list items with a comma.
- `{ }` represents one item, while `[ ]` represents a list of items.
- JSON does not support comments, so use this guide rather than adding comment
  lines inside a configuration file.
- Image paths begin with `assets/` and refer to files inside `src/assets/`.

In `theme.jsonc`, use the comments to find the color you want to change, then
edit its value inside quotation marks. Keep the existing setting names.

The existing items can be copied when adding new content. Most editors will
highlight a missing comma or quotation mark. After editing, run `npm run dev`
to preview the result.

## Validation and publishing

Run `npm run validate:config` to check your edits. If an error appears, correct
the indicated file and field. Configuration is also checked when you start or
build the site.

Validation checks required fields, value types, asset paths, publication IDs,
and preview references. The included JSON Schemas also provide completion and
inline diagnostics in supported editors.

Use double-quoted strings and no trailing commas, including in `theme.jsonc`.
Configuration changes on a published site require a new build and deployment.

Google Scholar citation fetching uses the social link with `"icon": "scholar"`
in `hero.json`. Remove that link to disable fetching; no source-code edit is needed.

## Resume PDF preview

Set `"preview": "pdf"` on a primary link in `hero.json` to open a custom PDF
window. For example: `{ "label": "Resume", "asset": "assets/Anleeno-Xu-Resume-mini.pdf", "preview": "pdf" }`.
The viewer supports page navigation, zoom, text selection, and download.
Remove `preview` to use the regular link behavior.

## Paper preview modals

Publications have a basic preview automatically. Add `abstract` in
`publications.json` for the abstract, and optionally `pdfUrl` for the paper's PDF link.

To customize a preview, add an entry in `publication-previews.json` keyed by the
publication's `id`:

```json
{
  "paper-id": {
    "template": "basic",
    "abstractExpanded": true
  }
}
```

Available templates: `basic`, `narrative`, `comparison`, `budget`, and `challenge`.
Copy an existing entry for chart layouts and replace its content and figures.
Set `abstractExpanded` to control the initial abstract state, or
`blendFigureBackground: false` to preserve white image backgrounds.
Remove the entry to return to the basic preview. Run `npm run validate:config`
to check required fields.

Click Paper to open the PDF reader. Select an annotation tool to highlight,
draw, or add text, then use Save to keep your annotations in the current browser.

## Education and Selected Awards

These sections appear after Experience and before Selected Projects, in that
order. Each has an independent `enabled` switch. Set it to `true` to show the
section, or `false` to hide it without deleting its entries. An empty `items`
list also hides the section. Navigation entries follow the same visibility rules.
Both sections are hidden by default. The included entries are layout-testing
placeholders, not real education or award records. Replace them before enabling
these sections on a published site.

Copy these examples and replace the placeholder text with your own information.
Items display in the order you enter them (normally newest first).

### `education.json`

```json
{
  "enabled": true,
  "items": [
    {
      "institution": "Your university",
      "degree": "Your degree",
      "field": "Your field of study",
      "period": "Start year – End year",
      "location": "City, Country",
      "description": "Optional research focus or additional details."
    }
  ]
}
```

`institution` is required; all other entry fields can be omitted.

### `awards.json`

```json
{
  "enabled": true,
  "items": [
    {
      "title": "Your award",
      "organization": "Awarding organization or competition",
      "year": "Year",
      "description": "Optional award details."
    }
  ]
}
```

`title` is required; all other entry fields can be omitted. Do not publish these
placeholder examples as personal achievements.

## Paper recommendations

Edit `paper-recommendations.json`:

- `enabled`: enable or disable all recommendations.
- `endpoint`: leave empty to use the default settings.
- `limit`: Related Papers count (1–6). Search keywords come from each publication's `tags` in `publications.json`.
- `cacheMinutes`: how long to reuse fetched results (15–1440 minutes).
- `daily.enabled`: show or hide Daily Papers on the homepage.
- `daily.limit`: initial Daily Papers count (1–6); More shows up to eight available papers.
- `daily.keywords`: up to five search phrases, such as `"Multimodal"` and `"AI Agents"`.

The navigation includes Trends for Daily Papers when enabled and hides its link when disabled,
just as it does for Education and Selected Awards.

Click a recommended paper to open it in the built-in PDF reader. Rebuild and
redeploy after changing configuration on a published site.
