# Canonical team-image storage

All profile images used by the lab website should live under `assets/images/team/`.

This folder is the designated location for member portraits and the page should reference the files there using lowercase, consistent names.

Example canonical names:
- `pi-nabanita-deb.jpg`
- `archisman.jpg`
- `brotin.jpg`
- `sukanya.jpg`
- `anushree-dutta.jpg`

The `scripts/fix-assets.sh` helper normalizes the current repo names into this structure and updates `index.html` references.
