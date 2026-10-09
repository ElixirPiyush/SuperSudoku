"""Builds the website's app images from the release package's real captures.

Run from the website root:  python tools/prepare_assets.py
Source: D:/Projects/Backup/sudoku backup/SuperSudoku_Release_2026-10-06
(English phone captures, per-theme QA captures, store icon + feature graphic).
Crops the phone status bar and navigation bar; writes WebP in two widths.
"""
from pathlib import Path
from PIL import Image

REL = Path(r"D:/Projects/Backup/sudoku backup/SuperSudoku_Release_2026-10-06")
CAP = REL / "screenshots_source" / "phone_en"
QA = REL / "design" / "theme_qa_2026-10-06"
OUT = Path(__file__).resolve().parent.parent / "public" / "images"
STATUS_BAR, NAV_BAR = 92, 130  # px on the 1080 x 2400 captures

SCREENS = ["home", "game", "league", "themes", "daily_result",
           "daily_complete", "awards", "play_sheet"]
THEMES = {  # id: capture (after_fix where the theme was fixed on 2026-10-06)
    "super-sudoku": "super_sudoku_game", "super-sudoku-dark": "super_sudoku_dark_game",
    "neon-pulse": "neon_pulse_game", "glow-light": "after_fix/glow_light_game",
    "classic": "classic_game", "ocean": "after_fix/ocean_game",
    "sakura": "sakura_game", "midnight": "after_fix/midnight_game",
    "lavender": "lavender_game", "monochrome": "monochrome_game",
}
BOARD_BOX = (0, 340, 1080, 1450)  # the 9x9 board (no text) on the game screen


def save(img, name, widths):
    for w in widths:
        h = round(img.height * w / img.width)
        img.resize((w, h), Image.LANCZOS).save(OUT / f"{name}-{w}.webp", "WEBP", quality=82, method=6)


def main():
    (OUT / "app").mkdir(parents=True, exist_ok=True)
    (OUT / "themes").mkdir(parents=True, exist_ok=True)
    for s in SCREENS:
        im = Image.open(CAP / f"{s}.png").convert("RGB")
        im = im.crop((0, STATUS_BAR, im.width, im.height - NAV_BAR))
        save(im, f"app/{s}", (360, 720))
    for tid, f in THEMES.items():
        im = Image.open(QA / f"{f}.png").convert("RGB").crop(BOARD_BOX)
        save(im, f"themes/{tid}", (320, 640))
    icon = Image.open(REL / "feature_graphic" / "app_icon_512.png").convert("RGBA")
    icon.save(OUT / "app-icon-512.png")
    icon.resize((192, 192), Image.LANCZOS).save(OUT / "app-icon-192.png")
    icon.resize((96, 96), Image.LANCZOS).save(OUT / "app-icon-96.webp", "WEBP", quality=90)
    fg = Image.open(REL / "feature_graphic" / "en.png").convert("RGB")
    fg.save(OUT / "og-image.png", optimize=True)
    print("ok")


if __name__ == "__main__":
    main()
