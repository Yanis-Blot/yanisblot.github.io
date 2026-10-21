# Yanis Blot–El Mazouzi

Personal website, live at [yanisblot.com](https://yanisblot.com).

Plain HTML, CSS and JavaScript. No dependencies and no build step.

## Editing content

All text, links, projects and publications live in `content.js`.
Save the file and reload the page to see the change.

### Adding a project

Copy an existing `{ … }` block in the `projects` list and edit it.

- Projects are sorted by `date` (`"YYYY-MM"`), newest first.
- The home page shows the 6 most recent projects. The rest are listed on `projects.html`.

### Adding a publication

Same principle, in the `publications` list.

### Project images

Images go in `assets/projects/`, then their path goes in the project's `image` field.

| | |
|---|---|
| Shape | Landscape 16:10, ideally 800 × 500 px. Other shapes are cropped to fit, centered. |
| Mobile | Thumbnails switch to 4:3, so the left and right edges get trimmed. Keep the subject centered. |
| File types | `.jpg`, `.png`, `.webp`, `.svg`, `.gif`, or a short `.mp4` / `.webm` video (autoplays, loops, muted). |
| Size | Under 300 KB per image. A short `.mp4` is much lighter than a GIF. |

Converting a GIF to MP4:

```sh
ffmpeg -i demo.gif -movflags +faststart -pix_fmt yuv420p demo.mp4
```

### Profile photo

A square image in `assets/`, with its path in the `photo` field. It is cropped to a circle.

### Page title and search description

These sit in the `<head>` of `index.html` and `projects.html`.

## Previewing locally

Opening `index.html` in a browser is enough.
To match the live site exactly, run a local server and open http://localhost:8000:

```sh
python3 -m http.server
```

## Publishing

The site is hosted on GitHub Pages. Every push to the `main` branch updates it within about a minute.

```sh
git add -A
git commit -m "Describe the change"
git push
```

### Domain setup

The domain is registered at OVH and points to GitHub Pages. This is already configured and only needs revisiting if the domain changes.

- The `CNAME` file in this repository holds the domain name, so GitHub knows which site to serve.
- The DNS zone at OVH contains these records:

  | Type | Name | Target |
  |---|---|---|
  | A | `@` | `185.199.108.153` |
  | A | `@` | `185.199.109.153` |
  | A | `@` | `185.199.110.153` |
  | A | `@` | `185.199.111.153` |
  | CNAME | `www` | `yanis-blot.github.io.` |

- HTTPS is managed by GitHub under *Settings → Pages → Enforce HTTPS*.

## Customizing the look

Colors, fonts and column width are variables at the top of `style.css`.

Fonts (EB Garamond for headings, Inter for body text) are stored in `assets/fonts/`, with no request to Google Fonts.
Contact icons come from Tabler Icons (MIT license) and are defined in `main.js`.

## File structure

```
index.html      home page with header, projects (up to 6) and publications
projects.html   full project list
content.js      site content, the only file to edit day to day
main.js         renders content.js into the pages
style.css       layout and colors
assets/         photo, project images, fonts, favicon
CNAME           custom domain for GitHub Pages
```
