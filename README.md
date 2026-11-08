# Abdulrahman Hasanen — Portfolio (static site)

Plain HTML + Tailwind CSS + vanilla JavaScript. Hosted for free on GitHub Pages
(no server, no database).

## Structure
```
index.html  about.html  resources.html  404.html
robots.txt  sitemap.xml  .nojekyll
assets/css   navbar, buttons, scroll-reveal, floating-actions, tailwind.css (built)
assets/js    navbar, projects-data (edit this to add projects), projects, about, ...
assets/images  site images (WebP) + projects/ screenshots
assets/files   CV (PDF)
tools/       build_css.sh, check_site.py
```
All internal links are relative, so the site works at `https://user.github.io/repo/`
and at a custom domain root.

## Add a project
Edit `assets/js/projects-data.js` and add an object to the list. Put a screenshot in
`assets/images/projects/` (use WebP, about 1600 px wide). The home page shows the first 3,
the About page shows all.

## Tailwind CSS
Styles are compiled to `assets/css/tailwind.css` (committed). After changing Tailwind
classes in the HTML pages or in `assets/js/*.js`, rebuild it:
```bash
./tools/build_css.sh            # one-off minified build
./tools/build_css.sh --watch    # while developing
```
Colors and fonts are defined in `tailwind.config.js` (`brand.*` and `surface-0..3`).

## Check before publishing
```bash
python3 tools/check_site.py
```
Verifies: balanced HTML, one `<main>` per page, no missing local files, no placeholder links.

## Publish on GitHub Pages
1. Push this folder's contents to a GitHub repository.
2. Repo → Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)`.
3. The site appears at `https://<user>.github.io/<repo>/`.

### Set your real site address (important)
Canonical links, social-preview image, `sitemap.xml`, `robots.txt` and `404.html` use
absolute URLs. They currently point to:

`https://abdulrahman-hasanen.github.io/abdulrahman-portfolio/`

If your address is different (other repo name, or a custom domain), replace it everywhere:
```bash
grep -rl "abdulrahman-hasanen.github.io/abdulrahman-portfolio/" . --include="*.html" --include="*.xml" --include="*.txt" \
  | xargs sed -i 's#https://abdulrahman-hasanen.github.io/abdulrahman-portfolio/#https://YOUR-ADDRESS/#g'
```

## Contact
There is no server, so there is no contact form. Visitors reach you by email,
Telegram, WhatsApp or the social links. To add a form later, use a form service
(Formspree, Web3Forms) rather than posting to GitHub Pages, which rejects POST requests.

## Privacy note
`assets/files/*.pdf` (CV) contains a phone number and email. In a public repository
this is visible to everyone and indexable by search engines.
