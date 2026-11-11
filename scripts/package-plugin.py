import os
import sys
import zipfile

def package_plugin():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    plugin_dir = os.path.join(base_dir, 'wp-content', 'plugins', 'poprio-visual-editor')
    dest_zip = os.path.join(base_dir, 'poprio-visual-editor.zip')
    
    if not os.path.exists(plugin_dir):
        print(f"Error: Plugin directory not found at {plugin_dir}")
        sys.exit(1)
        
    if os.path.exists(dest_zip):
        os.remove(dest_zip)
        
    print("Packaging poprio-visual-editor into installable ZIP (with standard forward slashes)...")
    with zipfile.ZipFile(dest_zip, 'w', compression=zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(plugin_dir):
            for file in files:
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, plugin_dir)
                arcname = ('poprio-visual-editor/' + rel_path).replace('\\', '/')
                zipf.write(abs_path, arcname)
                
    size_kb = os.path.getsize(dest_zip) / 1024
    print(f"✓ Created installable plugin ZIP: poprio-visual-editor.zip ({round(size_kb, 2)} KB)")

if __name__ == '__main__':
    package_plugin()

