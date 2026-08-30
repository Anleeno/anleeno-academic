# Website configuration

You can update the website by editing the JSON files in this folder. You do not
need to edit React or CSS source code for the content listed below.

| File | What it controls |
| --- | --- |
| `hero.json` | Profile, title, labels, résumé, and social links |
| `about.json` | Biography and quote |
| `news.json` | News timeline |
| `publications.json` | Publication cards |
| `experience.json` | Experience cards |
| `projects.json` | Project cards |
| `theme.jsonc` | Website colors, with inline comments |

## JSON basics

- Text must be inside double quotation marks.
- Each field uses the format `"field": "value"`.
- Separate neighboring fields and list items with a comma.
- `{ }` represents one item, while `[ ]` represents a list of items.
- JSON does not support comments, so use this guide rather than adding comment
  lines inside a configuration file.
- Image paths begin with `assets/` and refer to files inside `src/assets/`.

`theme.jsonc` supports `/* comments */`, so every color can include a nearby
explanation. Its keys use the same complete CSS variable names as the website,
such as `--theme-color-surface-strong`. Change only the color value inside
quotation marks; the comments do not affect the website.

The existing items can be copied when adding new content. Most editors will
highlight a missing comma or quotation mark. After editing, run `npm run dev`
to preview the result.
