#!/usr/bin/env bash
# Rebuild assets/css/tailwind.css. Run it after adding/changing Tailwind classes
# in the HTML pages or in assets/js/*.js, then commit the generated file.
# Uses the standalone Tailwind CLI (no Node.js needed).
#   ./tools/build_css.sh          one-off minified build
#   ./tools/build_css.sh --watch  rebuild on change while developing
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION="3.4.17"
BIN="tools/tailwindcss"
if [ ! -x "$BIN" ]; then
  case "$(uname -s)-$(uname -m)" in
    Linux-x86_64)  ASSET="tailwindcss-linux-x64" ;;
    Linux-aarch64) ASSET="tailwindcss-linux-arm64" ;;
    Darwin-arm64)  ASSET="tailwindcss-macos-arm64" ;;
    Darwin-x86_64) ASSET="tailwindcss-macos-x64" ;;
    *) echo "Unsupported platform. Get the CLI from github.com/tailwindlabs/tailwindcss/releases/tag/v$VERSION"; exit 1 ;;
  esac
  curl -sLo "$BIN" "https://github.com/tailwindlabs/tailwindcss/releases/download/v$VERSION/$ASSET"
  chmod +x "$BIN"
fi
if [ "${1:-}" = "--watch" ]; then
  "$BIN" -c tailwind.config.js -i assets/src/tailwind.css -o assets/css/tailwind.css --watch
else
  "$BIN" -c tailwind.config.js -i assets/src/tailwind.css -o assets/css/tailwind.css --minify
fi
