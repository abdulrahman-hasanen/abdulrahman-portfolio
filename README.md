# Abdulrahman Hasanen — Portfolio

A personal portfolio project maintained in one repository with **two separate versions**:

1. **Static portfolio** — HTML, Tailwind CSS, and vanilla JavaScript. This is the version published with GitHub Pages.
2. **Django application** — Python and Django project with templates, database-backed project management, and a contact-message system. Run it locally or deploy it to a host that supports Django.

> **Important:** GitHub Pages only serves the static files. It does not run Python, Django, SQLite, Django Admin, or the Django contact form. The static website and the Django application are separate implementations that share this repository.

**Repository:** <https://github.com/abdulrahman-hasanen/abdulrahman-portfolio>  
**GitHub Pages URL:** <https://abdulrahman-hasanen.github.io/abdulrahman-portfolio/>

---

## Contents

- [Project structure](#project-structure)
- [Technologies](#technologies)
- [1. Static website](#1-static-website)
  - [Run locally](#run-the-static-website-locally)
  - [Update projects](#update-projects-on-the-static-website)
  - [Build Tailwind CSS](#build-the-static-sites-tailwind-css)
  - [Check before publishing](#check-the-static-site-before-publishing)
  - [Publish with GitHub Pages](#publish-the-static-website-with-github-pages)
- [2. Django application](#2-django-application)
  - [Requirements](#django-requirements)
  - [Clone and create environment](#clone-and-create-the-django-environment)
  - [Configure environment variables](#configure-django-environment-variables)
  - [Run migrations and create admin](#run-migrations-and-create-an-admin-user)
  - [Run Django locally](#run-django-locally)
  - [Django Admin and contact messages](#django-admin-and-contact-messages)
  - [Email notifications](#configure-contact-email-notifications-optional)
  - [Tests](#run-django-tests)
  - [Deploy Django](#deploy-the-django-application)
- [Security and files that must stay local](#security-and-files-that-must-stay-local)
- [Git workflow](#git-workflow)
- [Troubleshooting](#troubleshooting)

---

## Project structure

The repository root contains the static website, while the Django source remains in its own folders.

```text
abdulrahman-portfolio/
│
├── index.html                 # Static website home page (GitHub Pages entry point)
├── about.html                 # Static About page
├── resources.html             # Static Resources page
├── 404.html                   # Static not-found page
├── robots.txt
├── sitemap.xml
├── .nojekyll                  # Prevents GitHub Pages/Jekyll processing
│
├── assets/                    # Static website assets
│   ├── css/                   # Page styles and compiled Tailwind CSS
│   ├── js/                    # Static website JavaScript
│   ├── images/                # Static website images and project screenshots
│   ├── files/                 # Public downloadable files, when present
│   └── src/                   # Tailwind source CSS
│
├── config/                    # Django settings, URLs, ASGI and WSGI configuration
├── core/                      # Django app: models, views, forms, admin and commands
├── templates/                 # Django templates (separate from root HTML files)
├── static/                    # Django static files
├── media/                     # Django uploaded media; only approved project images are tracked
├── tools/                     # Static-site build and validation scripts
│   ├── build_css.sh
│   └── check_site.py
│
├── manage.py
├── requirements.txt
├── tailwind.config.js
├── .env.example                # Example environment configuration; safe to commit
├── .gitignore
└── README.md
```

### Why are there HTML files in two places?

- Root `index.html`, `about.html`, and `resources.html` belong to the **static website** and are used by GitHub Pages.
- `templates/pages/` contains the **Django template versions** rendered by Django when the application runs locally or on Django hosting.
- Editing a root HTML file does not automatically edit its Django template, and editing a Django template does not automatically edit the static page.

---

## Technologies

| Area | Technologies |
|---|---|
| Static frontend | HTML5, CSS3, Tailwind CSS, vanilla JavaScript |
| Django frontend | Django Templates, HTML, CSS, JavaScript, Tailwind CSS |
| Backend | Python, Django |
| Database | SQLite (default local database) |
| Image processing | Pillow |
| Static-file serving for Django | WhiteNoise |
| Production application server | Gunicorn |
| Static hosting | GitHub Pages |

---

# 1. Static website

The static website is the public version that GitHub Pages can host. It uses ordinary HTML, CSS, JavaScript, and image files; it does not need Python or a database to display.

### Pages

- `index.html` — home page.
- `about.html` — About page and project information.
- `resources.html` — resources page.
- `404.html` — not-found page used by GitHub Pages.

### Run the static website locally

You can open `index.html` directly in a browser. For a local web server, run this from the repository root:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000/>.

Stop the server with `Ctrl + C` in the terminal.

### Update projects on the static website

Static project information is maintained in:

```text
assets/js/projects-data.js
```

To add or update a project:

1. Add or edit the project's data entry in `assets/js/projects-data.js`.
2. Add its image to `assets/images/projects/` (WebP is recommended to keep the site light).
3. Use a correct relative image path in the project data.
4. Open the home and About pages locally and confirm the project card, image, title, and links work.
5. Run the site checker before publishing.

The static pages use relative asset paths so that they work under the GitHub Pages project URL, which includes `/abdulrahman-portfolio/`.

### Build the static site's Tailwind CSS

The static site's Tailwind source file is:

```text
assets/src/tailwind.css
```

The generated/minified file used by the static HTML pages is:

```text
assets/css/tailwind.css
```

After adding or changing Tailwind classes in the root HTML pages or in `assets/js/*.js`, rebuild the generated CSS:

```bash
./tools/build_css.sh
```

To rebuild automatically while editing:

```bash
./tools/build_css.sh --watch
```

**Windows note:** `tools/build_css.sh` is a Bash script and the current script's built-in binary selection is for Linux and macOS. On Windows, run it through WSL with a supported Linux environment, or use the matching Tailwind CLI executable and ensure the script can find it as `tools/tailwindcss`. Do not run the `.sh` script directly in PowerShell.

The Tailwind configuration for the static site is in `tailwind.config.js`.

### Check the static site before publishing

Run:

```bash
python tools/check_site.py
```

The checker currently validates the static pages for common structural issues, missing local files, and placeholder links. A successful run prints:

```text
OK: no problems found
```

This check is useful but does not replace opening the pages in a browser and manually testing navigation, images, buttons, and responsive layouts.

### Publish the static website with GitHub Pages

1. Push the project to the `main` branch of this repository.
2. Open the repository on GitHub.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **`main`** and folder **`/(root)`**.
6. Save the settings and wait for the Pages deployment to finish.

The expected website URL is:

<https://abdulrahman-hasanen.github.io/abdulrahman-portfolio/>

After deployment, check:

- The home page loads.
- `about.html` and `resources.html` open.
- Images, CSS, JavaScript, and favicon load correctly.
- Internal links stay inside `/abdulrahman-portfolio/` rather than pointing to the domain root.
- The 404 page is displayed for an unknown path.

**GitHub Pages does not run Django.** The public static version cannot use Django Admin, save contact form submissions to SQLite, or send Django email notifications. Those features belong to the Django application and need Django-capable hosting.

---

# 2. Django application

The Django source is retained in this same repository. It provides the server-rendered portfolio, database-backed project records, uploaded project images, and contact messages.

## Django requirements

- Python (use a version supported by the installed Django release).
- `pip`.
- Git.

Python dependencies are listed in `requirements.txt`:

- Django `>=6.1.2,<6.2`
- Pillow `>=10.0`
- WhiteNoise `>=6.7`
- Gunicorn `>=22.0`

## Clone and create the Django environment

Clone the repository:

```bash
git clone https://github.com/abdulrahman-hasanen/abdulrahman-portfolio.git
cd abdulrahman-portfolio
```

Create a virtual environment:

**Windows PowerShell:**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, run this in the same PowerShell session and activate again:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

**Git Bash, Linux, or macOS:**

```bash
python -m venv .venv
source .venv/Scripts/activate
```

For Linux/macOS, use:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

## Configure Django environment variables

Create a local `.env` file from the example.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**Git Bash, Linux, or macOS:**

```bash
cp .env.example .env
```

Edit `.env` for local development. A basic local configuration is:

```env
DJANGO_DEBUG=1
DJANGO_SECRET_KEY=replace-this-with-a-local-secret
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost
DJANGO_CSRF_TRUSTED_ORIGINS=http://127.0.0.1:8000,http://localhost:8000
```

The settings module also permits `DJANGO_DEBUG=1` to run locally without a production secret key, but setting a local secret explicitly is preferable. Never use a development key in production.

The main environment variables are:

| Variable | Purpose |
|---|---|
| `DJANGO_DEBUG` | Enables Django debug mode for local development (`1` locally, `0` in production). |
| `DJANGO_SECRET_KEY` | Django secret key; required when debug mode is disabled. |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated host names accepted by Django. |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | Comma-separated trusted origins, including `https://` in production. |
| `DJANGO_BEHIND_PROXY` | Set to `1` when a trusted reverse proxy terminates HTTPS and forwards the scheme header. |
| `DJANGO_DB_PATH` | Optional path to the SQLite database file. |
| `DJANGO_MEDIA_ROOT` | Optional location for uploaded media. |
| `DJANGO_SERVE_MEDIA` | Set to `1` only when Django should serve media files. |
| `EMAIL_HOST` | SMTP host; leave empty if email notifications are not configured. |
| `EMAIL_PORT` | SMTP port (the example uses `587`). |
| `EMAIL_HOST_USER` | SMTP account username. |
| `EMAIL_HOST_PASSWORD` | SMTP password or provider app password. |
| `EMAIL_USE_TLS` | Enables SMTP TLS (`1` or `0`). |
| `DEFAULT_FROM_EMAIL` | Sender address for notifications. |
| `CONTACT_NOTIFY_EMAIL` | Destination address for new contact notifications. |

The `.env` file contains local settings and credentials. It must remain untracked and must never be committed to GitHub.

## Run migrations and create an admin user

Apply database migrations:

```bash
python manage.py migrate
```

Create a Django Admin account:

```bash
python manage.py createsuperuser
```

Follow the prompts to set the username, email, and password.

## Run Django locally

Start the development server:

```bash
python manage.py runserver
```

Open the Django website:

<http://127.0.0.1:8000/>

Open Django Admin:

<http://127.0.0.1:8000/admin/>

Stop the server with `Ctrl + C`.

## Django Admin and contact messages

The Django Admin interface is used to manage the database-backed content exposed by the Django application. Depending on the configured models and admin registration, this includes:

- Portfolio projects and their details/images.
- Contact messages submitted through the Django contact form.

Contact messages are stored in the Django database. Email notification is optional; it requires SMTP settings. A failed email notification does not mean the saved database message is necessarily lost.

## Configure contact email notifications (optional)

To receive an email notification when someone submits the Django contact form, configure these values in `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-address@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=1
DEFAULT_FROM_EMAIL=your-address@gmail.com
CONTACT_NOTIFY_EMAIL=your-address@gmail.com
```

Use an email provider's app password or SMTP credential where required. Do not put a normal account password in the repository. Do not share the `.env` file or commit it.

Without SMTP configuration, contact messages can still be stored in Django Admin; email notifications will not be sent.

## Run Django tests

Run the test suite:

```bash
python manage.py test
```

If the test settings require a secret key in your environment, set a temporary one for that command.

## Deploy the Django application

Deploy the Django application to a hosting provider that supports Python/Django. GitHub Pages is not a Django host.

At minimum, configure the following environment variables in the hosting provider:

```env
DJANGO_DEBUG=0
DJANGO_SECRET_KEY=use-a-new-long-random-secret
DJANGO_ALLOWED_HOSTS=your-domain.com,www.your-domain.com
DJANGO_CSRF_TRUSTED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

Also configure SMTP variables if email notifications are required.

Typical deployment commands are:

```bash
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn config.wsgi:application
```

The project includes WhiteNoise for Django static files. Uploaded media should be placed on persistent storage in production; configure `DJANGO_MEDIA_ROOT` for the host's persistent disk or use object storage. Do not rely on an ephemeral deployment filesystem for user uploads.

When running behind a reverse proxy that terminates HTTPS, set `DJANGO_BEHIND_PROXY=1` only when the proxy is trusted and correctly forwards the HTTPS scheme.

Review Django's deployment security checks and provider-specific instructions before going live. Configure secure hosts, HTTPS, secret keys, database backups, and persistent media storage for the selected host.

---

## Security and files that must stay local

Do not commit:

- `.env` or files containing real secrets/credentials.
- `db.sqlite3` or other local database files unless there is a deliberate, reviewed reason.
- `.venv/`, `venv/`, or other virtual environments.
- `__pycache__/` and Python bytecode files.
- Generated `staticfiles/` output.
- Private uploads or personal files that are not intended to be public.

The repository's `.gitignore` is configured to exclude local secrets, database state, Python cache, virtual environments, and generated files. Django project images intentionally stored in `media/projects/` may be tracked; keep only public portfolio images there. Static-site images under `assets/images/` are public website assets and should be committed so GitHub Pages can display them.

Before every push, review staged files:

```bash
git status
git diff --cached --stat
```

If `.env`, `db.sqlite3`, or private files appear in the staged list, unstage them and fix `.gitignore` before committing.

---

## Git workflow

Check the current state:

```bash
git status
```

Stage selected changes (recommended):

```bash
git add README.md index.html about.html resources.html assets/ .gitignore
```

For a reviewed complete set of changes, `git add -A` can be used only after confirming `.gitignore` correctly excludes secrets, local databases, virtual environments, and private uploads.

Review what will be committed:

```bash
git status
git diff --cached --stat
git diff --cached --check
```

Commit and push:

```bash
git commit -m "Describe the changes"
git push origin main
```

Confirm the working tree is clean:

```bash
git status
```

Expected result:

```text
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

---

## Troubleshooting

### GitHub Pages shows an old version

- Check **Settings → Pages** and confirm `main` / `/(root)` is selected.
- Check the **Actions** tab for the Pages deployment status.
- Hard-refresh the browser (`Ctrl + F5`) or test in a private/incognito window.

### CSS or JavaScript changes do not appear on the static site

- Confirm the HTML page references the correct file under `assets/`.
- Rebuild the static Tailwind stylesheet after changing Tailwind utility classes.
- Check browser developer tools for missing asset paths or JavaScript errors.

### Django says `DisallowedHost`

Add the local host names to `DJANGO_ALLOWED_HOSTS` in `.env`, for example:

```env
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost
```

### Django reports a CSRF trusted-origin error

For local development, include the exact local origins in `.env`:

```env
DJANGO_CSRF_TRUSTED_ORIGINS=http://127.0.0.1:8000,http://localhost:8000
```

For production, use the real HTTPS origin(s).

### Django does not send contact emails

Check SMTP host, port, username, app password, TLS setting, `DEFAULT_FROM_EMAIL`, and `CONTACT_NOTIFY_EMAIL`. Confirm that the Django application is running with the updated environment variables. Contact messages should still be checked in Django Admin.

### `tools/build_css.sh` does not run on Windows

The script is Bash-based and its current platform detection targets Linux/macOS. Use WSL with a supported Linux distribution, or configure the matching Tailwind CLI binary as described in the [Tailwind section](#build-the-static-sites-tailwind-css).

---

## License and use

This repository contains personal portfolio content, project descriptions, and images. Contact the owner before reusing personal branding, photographs, or project assets.
