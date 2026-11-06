#!/usr/bin/env python3
"""Pre-publish sanity check: python tools/check_site.py  (run from the project root)."""
import re, sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ["index.html", "about.html", "resources.html", "404.html"]
VOID = {"meta", "link", "img", "br", "hr", "input", "source", "area", "base", "col", "embed", "param", "track", "wbr"}
problems = []


class Balance(HTMLParser):
    def __init__(self):
        super().__init__(); self.stack = []; self.errors = []
    def handle_starttag(self, tag, attrs):
        if tag not in VOID: self.stack.append(tag)
    def handle_endtag(self, tag):
        if tag in VOID: return
        if self.stack and self.stack[-1] == tag: self.stack.pop(); return
        self.errors.append(f"unexpected </{tag}> at line {self.getpos()[0]}")


for name in PAGES:
    text = (ROOT / name).read_text(encoding="utf8")
    b = Balance(); b.feed(text)
    if b.errors or b.stack: problems.append(f"{name}: unbalanced tags {b.errors[:2]} {b.stack[:2]}")
    if text.count("<main") != 1: problems.append(f"{name}: expected exactly one <main>, found {text.count('<main')}")
    for bad in ("YOUR_", "cdn.tailwindcss.com", "<form"):
        if bad in text: problems.append(f"{name}: contains {bad!r}")
    if "<title>" not in text or (name != "404.html" and 'name="description"' not in text):
        problems.append(f"{name}: missing title/description")
    # local references must exist (absolute site URLs in 404.html are skipped)
    for m in re.finditer(r'(?:src|href)="(\./[^"#?]+)', text):
        if not (ROOT / m.group(1)).exists(): problems.append(f"{name}: missing file {m.group(1)}")

for js in (ROOT / "assets/js").glob("*.js"):
    data = "\n".join(l for l in js.read_text(encoding="utf8").splitlines() if not l.strip().startswith(("*", "//", "/*")))
    for m in re.finditer(r'"(\./assets/[^"]+)"', data):
        if not (ROOT / m.group(1)).exists(): problems.append(f"{js.name}: missing file {m.group(1)}")

print("OK: no problems found" if not problems else "\n".join(problems))
sys.exit(1 if problems else 0)
