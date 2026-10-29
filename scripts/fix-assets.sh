#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p assets/images/team

# Canonical profile image names used by the lab website.
# The repo currently contains uppercase extensions and some inconsistent names,
# so these commands normalize them into the designated team folder.

# Rename and move the existing files into the canonical, lowercase structure.
for src in \
  "assets/images/archisman.JPG" \
  "assets/images/brotin.JPG" \
  "assets/images/sukanya.JPG" \
  "assets/images/anushree_dutta.JPG" \
  "assets/images/pi-nabanita-deb.jpg"
 do
  if [ -f "$src" ]; then
    case "$src" in
      "assets/images/archisman.JPG")  mv -f "$src" "assets/images/team/archisman.jpg" ;;
      "assets/images/brotin.JPG")     mv -f "$src" "assets/images/team/brotin.jpg" ;;
      "assets/images/sukanya.JPG")     mv -f "$src" "assets/images/team/sukanya.jpg" ;;
      "assets/images/anushree_dutta.JPG") mv -f "$src" "assets/images/team/anushree-dutta.jpg" ;;
      "assets/images/pi-nabanita-deb.jpg") mv -f "$src" "assets/images/team/pi-nabanita-deb.jpg" ;;
    esac
  fi
done

# Optional: update HTML references to the canonical paths if they are still
# using the old names. This keeps the page loading without broken image requests.
python3 - "$@" <<'PY'
from pathlib import Path

html = Path('index.html')
if not html.exists():
    raise SystemExit(0)

text = html.read_text(encoding='utf-8')
replacements = {
    'src="assets/images/archisman.JPG"': 'src="assets/images/team/archisman.jpg"',
    'src="assets/images/brotin.JPG"': 'src="assets/images/team/brotin.jpg"',
    'src="assets/images/sukanya.JPG"': 'src="assets/images/team/sukanya.jpg"',
    'src="assets/images/anushree_dutta.JPG"': 'src="assets/images/team/anushree-dutta.jpg"',
    'src="assets/images/pi-nabanita-deb.jpg"': 'src="assets/images/team/pi-nabanita-deb.jpg"',
    'assets/images/archisman.JPG': 'assets/images/team/archisman.jpg',
    'assets/images/brotin.JPG': 'assets/images/team/brotin.jpg',
    'assets/images/sukanya.JPG': 'assets/images/team/sukanya.jpg',
    'assets/images/anushree_dutta.JPG': 'assets/images/team/anushree-dutta.jpg',
    'assets/images/pi-nabanita-deb.jpg': 'assets/images/team/pi-nabanita-deb.jpg',
}

updated = text
for old, new in replacements.items():
    updated = updated.replace(old, new)

if updated != text:
    html.write_text(updated, encoding='utf-8')
PY

echo "Profile images normalized into assets/images/team/ and HTML references updated."
