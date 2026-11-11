import os
import sys
import zipfile
import shutil

def zip_directory(src_dir, dest_zip, root_slug, exclude_dirs=None):
    if exclude_dirs is None:
        exclude_dirs = []
    if os.path.exists(dest_zip):
        os.remove(dest_zip)

    with zipfile.ZipFile(dest_zip, 'w', compression=zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(src_dir):
            # Check if this directory should be excluded
            rel_from_src = os.path.relpath(root, src_dir).replace('\\', '/')
            if any(rel_from_src == ex or rel_from_src.startswith(ex + '/') for ex in exclude_dirs):
                continue

            for file in files:
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, src_dir)
                # Filter out excluded sub-paths
                rel_norm = rel_path.replace('\\', '/')
                if any(rel_norm.startswith(ex + '/') for ex in exclude_dirs):
                    continue

                arcname = (root_slug + '/' + rel_path).replace('\\', '/')
                zipf.write(abs_path, arcname)

    return os.path.getsize(dest_zip)

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    theme_dir = os.path.join(base_dir, 'wp-content', 'themes', 'poprio-theme')
    plugin_dir = os.path.join(base_dir, 'wp-content', 'plugins', 'poprio-visual-editor')

    full_theme_zip = os.path.join(base_dir, 'poprio-theme.zip')
    lite_theme_zip = os.path.join(base_dir, 'poprio-theme-lite.zip')
    plugin_zip = os.path.join(base_dir, 'poprio-visual-editor.zip')

    print("====================================================")
    print("POPRIO Cross-Platform Packaging Suite (Forward Slashes)")
    print("====================================================")

    # 1. Full Theme ZIP
    print("\n[1/3] Packaging Full Theme (poprio-theme.zip)...")
    full_bytes = zip_directory(theme_dir, full_theme_zip, 'poprio-theme')
    print(f"✓ Created: poprio-theme.zip ({round(full_bytes / (1024 * 1024), 2)} MB)")

    # 2. Lite Theme ZIP (excludes heavy media in assets/, but retains brand logo and compiled JS/CSS)
    print("\n[2/3] Packaging Ultra-Lite Theme (poprio-theme-lite.zip)...")
    exclude_lite = [
        'assets/packages',
        'assets/story',
        'assets/floating-corns',
        'assets/videos'
    ]
    lite_bytes = zip_directory(theme_dir, lite_theme_zip, 'poprio-theme', exclude_dirs=exclude_lite)
    print(f"✓ Created: poprio-theme-lite.zip ({round(lite_bytes / 1024, 2)} KB / {round(lite_bytes / (1024 * 1024), 2)} MB)")

    # 3. Companion Plugin ZIP
    print("\n[3/3] Packaging Visual Editor Plugin (poprio-visual-editor.zip)...")
    plugin_bytes = zip_directory(plugin_dir, plugin_zip, 'poprio-visual-editor')
    print(f"✓ Created: poprio-visual-editor.zip ({round(plugin_bytes / 1024, 2)} KB)")

    print("\nAll ZIP archives generated with POSIX forward slashes for 100% WordPress update compatibility!")

if __name__ == '__main__':
    main()

