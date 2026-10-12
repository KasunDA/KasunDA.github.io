# Kasun Dananjaya — portfolio site

A static, single-page portfolio. Plain HTML, CSS and JavaScript: no build step, no dependencies, works on any host.

```
index.html     all content (edit text here)
styles.css     design, light/dark themes, responsive layout
main.js        theme toggle, mobile menu, project filters, copy e-mail, scroll effects
favicon.svg    "KD" icon
assets/        photo, MBCS badge, social-share image
```

## Editing

- **Projects**: each project is an `<article class="project">` in the Work section. `data-cat` sets which filter buttons show it (`enterprise ai payments mobile desktop web`). Add `featured` to the class for the lime top border.
- **Experience**: each role is an `<li>` in `<ol class="timeline">`.
- **"Open to new opportunities"** badge: the `<p class="status">` line at the top of the hero. Delete it once you've accepted a role.
- **Colours**: change the variables at the top of `styles.css` (`--accent` is the lime, `--brand` the navy).

## Preview locally

```bash
python -m http.server 8765 --directory .
```

Then open http://localhost:8765.

## Deploy (pick one)

**GitHub Pages (free):** create a repository named `KasunDA.github.io`, upload these files to it, and the site goes live at `https://kasunda.github.io`. For any other repo name, enable *Settings → Pages → Deploy from branch*.

**Netlify (free):** sign in at netlify.com, open *Add new site → Deploy manually*, and drag this folder onto the page.

**Your own hosting (cPanel etc.):** upload the folder's contents into `public_html` (or a subfolder).

After deploying, change `og:image` in `index.html` to the full address (for example `https://kasunda.github.io/assets/og.jpg`) so LinkedIn and WhatsApp previews show the image.
