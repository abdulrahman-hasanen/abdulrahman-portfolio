# Abdulrahman Hasanen — Portfolio

A personal portfolio project with **two versions of the website in one repository**:

1. A **static portfolio website** built with HTML, CSS, and JavaScript, published through GitHub Pages.
2. A **Django application** that preserves the Python backend, database, admin dashboard, and contact-message functionality for local development or deployment to a Django-compatible hosting platform.

The repository keeps both versions together. GitHub Pages serves the static files only; it does not run Django or Python.

## Live Website

- **Static Portfolio:** [Open the portfolio](https://abdulrahman-hasanen.github.io/abdulrahman-portfolio/)
- **Source Code:** [GitHub Repository](https://github.com/abdulrahman-hasanen/abdulrahman-portfolio)

> The Live Website link becomes available after GitHub Pages is enabled for the `main` branch using the `/(root)` folder.

## Project Versions

### 1. Static Website — GitHub Pages

The static version is located in the repository root:

- `index.html` — Home page
- `about.html` — About page
- `resources.html` — Resources page
- `assets/` — CSS, JavaScript, images, and other front-end assets

This version is intended for public viewing through GitHub Pages. It does not execute Python code, connect to the Django database, or provide Django Admin functionality.

### 2. Django Application

The Django source remains part of the same repository:

- `config/` — Django project configuration and URL routing
- `core/` — Main application, models, views, forms, and admin configuration
- `templates/` — Django templates
- `static/` — Django static files, including the compiled Tailwind CSS and CV file
- `media/` — Project images and uploaded media
- `tools/` — Development scripts

## Tech Stack

### Static Website

- HTML5
- CSS3
- JavaScript
- Tailwind CSS
- GitHub Pages

### Django Application

- **Backend:** Python, Django
- **Database:** SQLite
- **Frontend:** Django Templates, HTML, CSS, and JavaScript
- **Styling:** Tailwind CSS
- **Static File Serving:** WhiteNoise
- **Image Processing:** Pillow
- **Production Server:** Gunicorn

## Django Features

- Responsive Django portfolio website.
- Dynamic project management through Django Admin.
- Project image uploads.
- Contact messages saved in the database.
- Custom styling with locally compiled Tailwind CSS.
- Automatic image resizing and WebP optimization.
- Production-ready static file handling with WhiteNoise.

## GitHub Pages Setup

To publish the static website:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/(root)`.
5. Save the settings.

GitHub Pages will publish the root-level `index.html` and its referenced assets. Make sure the static pages use relative asset and page links (for example, `./assets/...` and `./about.html`) so they work under the repository URL.

**Important:** GitHub Pages is a static hosting service. It cannot run Django, Python, database queries, Django Admin, or server-side contact forms. The Django application must be run locally or deployed separately to a hosting service that supports Django.

## Local Django Development

### Requirements

Install the following:

- Python
- pip
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/abdulrahman-hasanen/abdulrahman-portfolio.git
cd abdulrahman-portfolio
```

### 2. Create a Virtual Environment

**Windows (PowerShell):**

```powershell
python -m venv .venv
```

**Linux / macOS:**

```bash
python3 -m venv .venv
```

### 3. Activate the Virtual Environment

**Windows (PowerShell):**

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks script execution, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then activate the environment again.

**Linux / macOS:**

```bash
source .venv/bin/activate
```

### 4. Install Dependencies

```bash
python -m pip install -r requirements.txt
```

### 5. Configure Environment Variables

Create a local `.env` file from the example.

**Windows (PowerShell):**

```powershell
Copy-Item .env.example .env
```

**Linux / macOS:**

```bash
cp .env.example .env
```

Keep `DJANGO_DEBUG=1` for local development. Do not overwrite an existing `.env` file.

### 6. Apply Database Migrations

```bash
python manage.py migrate
```

### 7. Create an Admin Account

```bash
python manage.py createsuperuser
```

This step is optional if you do not need to access Django Admin immediately.

### 8. Run the Development Server

```bash
python manage.py runserver
```

Open the Django website at `http://127.0.0.1:8000/`.

Django Admin is available at `http://127.0.0.1:8000/admin/`.

## Django Admin

The admin dashboard allows you to manage:

- **Projects:** Add, edit, publish, and manage projects, including image uploads.
- **Contact Messages:** View messages submitted through the Django contact form.

## Tailwind CSS

For the Django application, Tailwind CSS is compiled into:

`static/css/tailwind.css`

The compiled CSS file is committed to the repository. After changing Tailwind classes in Django templates or JavaScript files, rebuild the CSS.

The build script is `tools/build_css.sh`.

**One-time build:**

```bash
./tools/build_css.sh
```

**Watch mode:**

```bash
./tools/build_css.sh --watch
```

**Windows:** Run these commands using Git Bash or WSL. The `.sh` script does not run directly in PowerShell.

Design tokens, including brand colors, `surface-0` to `surface-3`, and fonts, are configured in `tailwind.config.js`.

## Running Tests

Run the Django test suite.

**Windows (PowerShell):**

```powershell
$env:DJANGO_SECRET_KEY = "test"
python manage.py test
```

**Linux / macOS:**

```bash
DJANGO_SECRET_KEY=test python manage.py test
```

## Image Optimization

The Django project includes a custom management command for optimizing existing project images.

**Preview changes:**

```bash
python manage.py optimize_images --dry-run
```

**Apply optimization:**

```bash
python manage.py optimize_images
```

New project image uploads are automatically resized to a maximum dimension of 1600 pixels, converted to WebP format, and stored in the media directory.

## Django Production Deployment

The Django application can be deployed separately to a hosting platform that supports Python and Django.

### Required Environment Variables

Configure the following variables in your hosting platform:

| Variable | Purpose |
|---|---|
| `DJANGO_SECRET_KEY` | Django secret key |
| `DJANGO_ALLOWED_HOSTS` | Allowed production domains |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | Trusted HTTPS origins |

For production, disable debug mode. See `.env.example` for the available configuration options.

### Build and Start Commands

Install dependencies:

```bash
pip install -r requirements.txt
```

Apply database migrations:

```bash
python manage.py migrate
```

Collect static files:

```bash
python manage.py collectstatic --noinput
```

Start the production server:

```bash
gunicorn config.wsgi:application
```

### Static and Media Files

- Static files are served using **WhiteNoise**.
- Project screenshots and uploaded media should be stored in persistent storage.
- Configure `DJANGO_MEDIA_ROOT` to point to a persistent disk.
- Set `DJANGO_SERVE_MEDIA=1` to let Django serve media files. This may be suitable for a small portfolio. Alternatively, configure the web server or object storage to serve `/media/`.

### Reverse Proxy

When running behind a reverse proxy that terminates HTTPS, configure:

```env
DJANGO_BEHIND_PROXY=1
```

### Contact Email Notifications

Contact messages are saved in Django Admin. To enable email notifications, configure:

- `EMAIL_HOST`
- `EMAIL_HOST_USER`
- `EMAIL_HOST_PASSWORD`
- `CONTACT_NOTIFY_EMAIL`
- `DEFAULT_FROM_EMAIL`

### Deployment Security Checks

The Django deployment check may report the following HSTS warnings:

- `SECURE_HSTS_INCLUDE_SUBDOMAINS`
- `SECURE_HSTS_PRELOAD`

These settings are intentionally disabled. Enable them only when every relevant subdomain is guaranteed to use HTTPS.

## Security Notes

- Never commit `.env` files.
- Never commit private credentials or secret keys.
- Do not expose database credentials or production configuration.
- Do not commit your local `db.sqlite3` unless there is a specific reason to share it.
- Keep `.venv/` out of version control.
- If an old copy of this project containing a previously public `SECRET_KEY` was exposed, treat that key as compromised and generate a new one.

## Repository Structure

```text
abdulrahman-portfolio/
│
├── index.html                 # Static website home page (GitHub Pages)
├── about.html                 # Static About page
├── resources.html             # Static Resources page
├── assets/                    # Static website assets
│
├── config/                    # Django project configuration
├── core/                      # Django application
├── templates/                 # Django templates
├── static/                    # Django static files and CV
├── media/                     # Project images and uploaded media
├── tools/                     # Development tools and scripts
│
├── .env.example
├── .gitignore
├── manage.py
├── requirements.txt
├── tailwind.config.js
└── README.md
```

Local-only files such as `.env`, `.venv/`, and `db.sqlite3` should remain excluded from Git.
