import os
import re

def optimize_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Remove // ========= type banners
    content = re.sub(r'//\s*={3,}\s*\n', '', content)
    content = re.sub(r'/\*\s*={3,}.*?\*/', '', content, flags=re.DOTALL)
    
    # Also remove generic commented-out sections of uppercase words with banners
    # e.g. // SHIPS or // NEW ANALYTICS DATA
    content = re.sub(r'//\s*[A-Z\s]+\s*\n', '', content)
    
    # Remove block comments entirely for cleanup if requested, but let's be careful not to break TSX logic.
    # The user said "no comments needed, no /* no need of /* ===============================". 
    # Let's just remove all block comments entirely.
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    # Remove standard single line comments if they are purely descriptive (optional, but requested "no comments needed")
    # Let's kill lines starting only with // (not inline ones like code // comment to be safe)
    content = re.sub(r'^\s*//.*$\n', '', content, flags=re.MULTILINE)

    # 2. Convert px to rem
    # We match any number followed by px, e.g. 16px, 1.5px
    def px_to_rem(match):
        val_str = match.group(1)
        val = float(val_str)
        rem = val / 16.0
        # format nicely up to 4 decimal places, removing trailing zeros
        formatted = f"{rem:.4f}".rstrip('0').rstrip('.')
        return f"{formatted}rem"
    
    # But wait, what if px is part of a URL or something? e.g. image100px.png.
    # It usually has \d+px in CSS and JSX inline styles. We enforce \b or negative lookarounds.
    content = re.sub(r'(?<![A-Za-z])(\d+(?:\.\d+)?)px\b', px_to_rem, content)

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Optimized {path}")

def main():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.css')):
                path = os.path.join(root, file)
                optimize_file(path)

if __name__ == "__main__":
    main()
