# Abdulrahman Hasanen — Portfolio

A personal portfolio website built with **Django**, **Python**, **SQLite**, and **Tailwind CSS**.

The project showcases my work, technical skills, learning resources, and provides a contact system.

## Tech Stack

- **Backend:** Python, Django
- **Database:** SQLite
- **Frontend:** HTML, CSS, JavaScript
- **Styling:** Tailwind CSS
- **Static Files:** WhiteNoise
- **Image Processing:** Pillow
- **Production Server:** Gunicorn

## Features

- Responsive portfolio website.
- Dynamic project management through Django Admin.
- Project image uploads.
- Contact form with messages saved in the database.
- Custom styling with locally compiled Tailwind CSS.
- Automatic image resizing and WebP optimization.
- Production-ready static file handling with WhiteNoise.

---

## Local Development

### Requirements

Make sure you have the following installed:

- Python
- pip
- Git

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

Replace the repository URL and folder name with your actual project details.

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

Create your local `.env` file from the example:

**Windows (PowerShell):**

```powershell
Copy-Item .env.example .env
```

**Linux / macOS:**

```bash
cp .env.example .env
```

Keep `DJANGO_DEBUG=1` for local development.

Do not overwrite an existing `.env` file.

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

Open the website:

`http://127.0.0.1:8000/`

Django Admin:

`http://127.0.0.1:8000/admin/`

---

## Django Admin

The admin dashboard allows managing:

- **Projects:** Add, edit, publish, and manage projects, including image uploads.
- **Contact Messages:** View messages submitted through the contact form.

---

## Tailwind CSS

Tailwind CSS is compiled locally into:

`static/css/tailwind.css`

The compiled CSS file is committed to the repository.

After changing Tailwind classes in HTML templates or JavaScript files, rebuild the CSS.

### Build Commands

The build script is:

`tools/build_css.sh`

**One-time build:**

```bash
./tools/build_css.sh
```

**Watch mode:**

```bash
./tools/build_css.sh --watch
```

**Windows users:** Run these commands using Git Bash or WSL. The `.sh` script is a Bash script and does not run directly in PowerShell.

Design tokens, including brand colors, `surface-0` to `surface-3`, and fonts, are configured in:

`tailwind.config.js`

---

## Running Tests

Run the Django test suite:

**Windows (PowerShell):**

```powershell
$env:DJANGO_SECRET_KEY = "test"
python manage.py test
```

**Linux / macOS:**

```bash
DJANGO_SECRET_KEY=test python manage.py test
```

---

## Image Optimization

The project includes a custom Django management command for optimizing existing project images.

### Preview Changes

```bash
python manage.py optimize_images --dry-run
```

### Apply Optimization

```bash
python manage.py optimize_images
```

New project image uploads are automatically:

- Resized to a maximum dimension of 1600 pixels.
- Converted to WebP format.
- Stored in the media directory.

---

## Production Deployment

The project can be deployed to a hosting platform that supports Python and Django.

### Required Environment Variables

Configure the following variables in your hosting platform:

| Variable | Purpose |
|---|---|
| `DJANGO_SECRET_KEY` | Django secret key |
| `DJANGO_ALLOWED_HOSTS` | Allowed production domains |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | Trusted HTTPS origins |

For production, make sure debug mode is disabled.

See `.env.example` for the available configuration options.

### Build and Deployment Commands

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

### Static Files

Static files are served using **WhiteNoise**.

### Media Files

Project screenshots and uploaded media files should be stored in persistent storage.

Configure `DJANGO_MEDIA_ROOT` to point to a persistent disk.

Set:

```env
DJANGO_SERVE_MEDIA=1
```

to let Django serve media files. This can be suitable for a small portfolio.

Alternatively, configure your web server or object storage to serve `/media/`.

### Reverse Proxy

When running behind a reverse proxy that terminates HTTPS, configure:

```env
DJANGO_BEHIND_PROXY=1
```

### Contact Email Notifications

Contact messages are always saved in Django Admin.

To enable email notifications, configure:

- `EMAIL_HOST`
- `EMAIL_HOST_USER`
- `EMAIL_HOST_PASSWORD`
- `CONTACT_NOTIFY_EMAIL`
- `DEFAULT_FROM_EMAIL`

### Deployment Security Checks

The Django deployment check may report two HSTS warnings:

- `SECURE_HSTS_INCLUDE_SUBDOMAINS`
- `SECURE_HSTS_PRELOAD`

These settings are intentionally disabled.

Enable them only when every relevant subdomain is guaranteed to use HTTPS.

---

## Security Notes

- Never commit `.env` files.
- Never commit private credentials or secret keys.
- Never expose database credentials or production configuration.
- Do not commit your local `db.sqlite3` unless there is a specific reason to share it.
- Keep `.venv/` out of version control.
- If an old copy of this project containing the previous `SECRET_KEY` was ever publicly exposed, treat that key as compromised and generate a new one.

---

## Project Structure

```text
project/
│
├── config/
├── core/
├── media/
├── static/
├── templates/
├── tools/
│
├── .env.example
├── .gitignore
├── db.sqlite3
├── manage.py
├── requirements.txt
├── tailwind.config.js
└── README.md
```

The structure above represents the main project directories and files. Some local or generated files may differ depending on the development environment.