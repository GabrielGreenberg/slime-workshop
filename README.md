# SLIME Workshop website

The website for **SLIME** — *Studies in Language, Information, Meaning and Expression*,
an annual workshop at UCLA. This is a plain static site (HTML/CSS/JS, no build step,
no framework) hosted on GitHub Pages at **https://slime-workshop.com**.

It was migrated off Weebly; the original Weebly export is kept locally in
`_weebly-source/` for reference and is **not** committed (see `.gitignore`).

## Structure

```
index.html        SLIME 5 — current edition (home page)
slime-4.html      past editions, newest first
slime-3.html
slime-2.html
slime-1.html
gallery.html      photo tour of UCLA / the Philosophy dept.
css/style.css     all styles (Poppins via Google Fonts; per-conference colours)
js/main.js        mobile menu, sticky header, active nav, gallery lightbox
assets/images/    logos (slimeN-logo.png), hero/ backgrounds, gallery/ photos, favicon
CNAME             custom domain (slime-workshop.com)
.nojekyll         tells GitHub Pages to serve files as-is
```

Each page is self-contained: the header/nav/footer markup is duplicated in every
file (no build step). The current page is highlighted automatically — `js/main.js`
reads `<body data-page="…">` and marks the matching nav link `active`.

## Preview locally

From the repo root:

```bash
python3 -m http.server 8000
```

then open <http://localhost:8000>. (Opening the files directly via `file://` also
works, but a server matches the live behaviour exactly.)

## Deploy (GitHub Pages + custom domain)

1. Push this repo to GitHub.
2. **Settings → Pages →** Build and deployment: *Deploy from a branch*, branch
   `main`, folder `/ (root)`.
3. The `CNAME` file already pins the domain to `slime-workshop.com`. In your DNS,
   point the domain at GitHub Pages:
   - apex `slime-workshop.com` → four `A` records: `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (and/or `AAAA` records for IPv6), **or** an `ALIAS`/`ANAME` to
     `<username>.github.io`.
   - `www.slime-workshop.com` → `CNAME` to `<username>.github.io`.
4. In **Settings → Pages**, tick **Enforce HTTPS** once the certificate is issued.

## Adding next year's conference (e.g. SLIME 6)

1. Rename the current `index.html` → `slime-5.html` (the edition that's ending).
2. Copy an existing conference page (e.g. `slime-4.html`) to a fresh `index.html`
   and fill in the new year's hero logo, dates, logistics, schedule, speakers, and
   commentators. Set `<body class="conf conf--slime6" data-page="slime6">`.
3. Add the new logo to `assets/images/` (`slime6-logo.png`) and a hero photo to
   `assets/images/hero/`.
4. In `css/style.css`, add a `.hero--slime6 { background-image: … }` rule and (if you
   want a distinct accent) a `body.conf--slime6 { … }` block.
5. Add one nav `<li>` for **SLIME 6** to the nav in **every** page (both the
   `.main-nav` and `.mobile-nav` lists), with `data-nav="slime6"`.
6. Preview locally, then push.
