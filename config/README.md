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
| `experience.json` | Experience cards |
| `education.json` | Optional education section and its visibility |
| `awards.json` | Optional selected awards section and its visibility |
| `projects.json` | Project cards |
| `theme.jsonc` | Website colors, with inline comments |

## Configuration boundaries

`schemas/` contains validation rules for maintainers, not editable website content.
Keep configuration free of secrets: all these files can be included in the public build.

## Site identity

Edit `site.json` for site-wide metadata. `title` sets the browser tab title,
`description` sets the HTML search description, `language` is a language tag such
as `en` or `zh-CN`, and `copyrightName` sets the footer name. The copyright year
and Last updated date remain automatic. Profile details stay in `hero.json`.
Refresh the development page after editing metadata; rebuild and redeploy for production.
HTML metadata is generated during development/build, so it is present even before JavaScript runs.

## Editing JSON

- Text must be inside double quotation marks.
- Each field uses the format `"field": "value"`.
- Separate neighboring fields and list items with a comma.
- `{ }` represents one item, while `[ ]` represents a list of items.
- JSON does not support comments, so use this guide rather than adding comment
  lines inside a configuration file.
- Image paths begin with `assets/` and refer to files inside `src/assets/`.

`theme.jsonc` supports `/* block comments */` and `// line comments`, so every color can include a nearby
explanation. Its keys use the same complete CSS variable names as the website,
such as `--theme-color-surface-strong`. Change only the color value inside
quotation marks; the comments do not affect the website.

The existing items can be copied when adding new content. Most editors will
highlight a missing comma or quotation mark. After editing, run `npm run dev`
to preview the result.

## Validation and publishing

`npm run dev` and `npm run build` validate configuration before starting. You can
also run `npm run validate:config` on its own. Errors identify the filename and
field; checks include required fields, types, unknown keys, missing assets,
duplicate publication IDs, and preview references. VS Code uses the included
JSON Schema associations for completion and inline diagnostics. Other editors
can associate each file with the corresponding definition in
`schemas/site.schema.json`.

Use double-quoted strings and no trailing commas, including in `theme.jsonc`.
All asset paths are relative to `src/` and start with `assets/`, including preview
figures. Configuration changes on a published site require a new build and
deployment. `enabled: false` hides a section but does not make its data private.

Google Scholar citation fetching uses the social link with `"icon": "scholar"`
in `hero.json`. Remove that link to disable fetching; no source-code edit is needed.

## Resume PDF preview

Set `"preview": "pdf"` on a primary link in `hero.json` to open a custom PDF
window. For example: `{ "label": "Resume", "asset": "assets/Anleeno-Xu-Resume-mini.pdf", "preview": "pdf" }`.
The viewer supports page navigation, zoom, fit-to-width, text selection, download,
and opening the original PDF. Remove `preview` to use the regular link behavior.
Local PDF assets are recommended; remote PDFs must allow cross-origin fetching.
The viewer is loaded only when opened. Its appearance is in `src/css/ResumePreview.css`.

## Paper preview modals

Every publication can open a basic preview showing its title, authors, abstract,
paper link, and citation action. No additional configuration is required. The
`abstract` field is optional; if omitted, the preview says it is not provided.

For a richer preview, add an entry to `publication-previews.json` whose key exactly
matches the publication's `id`. Select a fixed template with `template`:

| Template | Presentation | When to use |
| --- | --- | --- |
| `basic` | Title, authors, links and abstract | A minimal paper preview; no extra content required |
| `narrative` | Research idea, large method figure and steps | A visual explanation without numeric results |
| `comparison` | Summary and paired result bars | Reference vs. proposed method, values from 0 to 1 |
| `budget` | Budget curves and ablation bars | Human-label budget vs. SRCC/PLCC |
| `challenge` | Task image, team method and ranking | Challenge accuracy and subgroup results |

The existing three paper entries are complete examples of the chart templates.
Their chart data follows these rules:

- `comparison`: paired reference/model correlation bars; rows use `label`,
  `referenceLabel`, `reference`, and `value`.
- `budget`: annotation-budget curves and ablation bars; curve rows use a percentage
  `label` (such as `"10%"`), `value` (SRCC), and `secondary` (PLCC).
- `challenge`: ranked percentage results; rows use `rank`, `label`, `value`
  (such as `"75.60%"`), and optional `highlighted`.

`budget` and `challenge` also require `ablationRows`, using `label` and `value`,
plus `secondary` for a second correlation metric. Correlations range from 0 to 1;
percentages range from 0% to 100%. Numeric strings retain display precision.
`steps` contains objects with `title` and `text`, rather than positional arrays.

Shared preview fields cover the summary (`takeaway`, `intro`), highlighted result
(`highlight`, `highlightLabel`, `highlightContext`), method (`headline`, `method`,
`figure`, `figureCaption`, `steps`), evidence (`resultTitle`, `resultNote`, `rows`,
`footnote`), and source (`source`, `sourceLabel`). `name` is the short display name;
`category` is the small heading. Optional `openingLabel`, `chartTitle`,
`metricTitle`, and `taskCaption` customize layout-specific captions.

Optional controls apply to all templates:

- `abstractExpanded`: whether the abstract starts open (default: true for `basic`, false otherwise).
- `blendFigureBackground`: fade near-white method-image pixels into the glass background (default: true). Set false for photographs or figures whose white areas should stay opaque.
- `labels`: override section titles. Keys: `idea`, `method`, `results`, `abstract`, `entry`, `reference`, `ranking`, `groups`, `groupTitle`.

Minimal configuration (replace `paper-id` with the publication ID):

```json
{
  "paper-id": {
    "template": "basic",
    "abstractExpanded": true
  }
}
```

Illustrated narrative example; use your own existing image path:

```json
{
  "paper-id": {
    "template": "narrative",
    "name": "Short paper name",
    "takeaway": "The central research idea in one sentence.",
    "intro": "The problem and why it matters.",
    "headline": "How the method works",
    "method": "A concise explanation of the approach.",
    "figure": "assets/publications/your-method.png",
    "figureCaption": "Overview of the proposed method.",
    "steps": [{ "title": "First stage", "text": "What happens at this stage." }],
    "abstractExpanded": false,
    "blendFigureBackground": false,
    "labels": { "idea": "Research question", "method": "Approach" }
  }
}
```

`name` and `source` fall back to the publication title and paper URL. Chart
templates require the shared summary/method/result fields described above;
`narrative` only requires `takeaway`, `intro`, `headline`, `method`, `figure`,
`figureCaption`, and `steps`. Validation reports missing fields for the chosen
template. The old `layout` key remains supported; use `template` for new entries.
If both keys are present they must agree.

The chart templates retain their documented metric meanings; select `narrative`
for other research content. Remove a preview entry to return to the basic preview;
do not remove the publication itself unless you also want to remove its card.

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
