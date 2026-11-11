import os
import sys
import zipfile

def package_zip(source_dir, dest_zip, root_folder_name):
    """
    Creates a standard cross-platform ZIP file using forward slashes (/)
    ensuring 100% compatibility with WordPress's PHP ZipArchive extractor on Linux and Windows.
    """
    if os.path.exists(dest_zip):
        os.remove(dest_zip)
        
    with zipfile.ZipFile(dest_zip, 'w', compression=zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, source_dir)
                # Force forward slashes so Linux PHP ZipArchive treats folders properly
                arcname = (root_folder_name + '/' + rel_path).replace('\\', '/')
                zipf.write(abs_path, arcname)
                
    size_mb = os.path.getsize(dest_zip) / (1024 * 1024)
    return round(size_mb, 2)

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    theme_dir = os.path.join(base_dir, 'wp-content', 'themes', 'poprio-theme')
    dest_zip = os.path.join(base_dir, 'poprio-theme.zip')
    
    if not os.path.exists(theme_dir):
        print(f"Error: Theme directory not found at {theme_dir}")
        sys.exit(1)
        
    print(f"Packaging poprio-theme with standard forward-slash archive structure...")
    size = package_zip(theme_dir, dest_zip, 'poprio-theme')
    print(f"✓ Created installable theme ZIP: poprio-theme.zip ({size} MB)")

