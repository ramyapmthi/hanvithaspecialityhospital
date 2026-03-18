import os
import re
import glob

html_files = glob.glob('d:\\websites\\Hanvithahospital\\*.html')

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We replace the img tag inside <a ... class="logo"> with img + span
    # Let's target the exact string from the previous step which was:
    # <img src="logo/hanlg-rbg.png" alt="Hanvitha Speciality Hospital Logo" style="height: 50px; width: auto;">
    
    old_logo_html = '<img src="logo/hanlg-rbg.png" alt="Hanvitha Speciality Hospital Logo" style="height: 50px; width: auto;">'
    new_logo_html = '<img src="logo/hanlg-rbg.png" alt="Hanvitha Speciality Hospital Logo" style="height: 50px; width: auto;">\n                <span class="header-brand-name">Hanvitha Speciality Hospital</span>'
    
    # But ONLY in the header, not footer. 
    # Fortunately the footer logo has `height: 60px` and `margin-bottom: 20px`, so the above string matches EXACTLY only the header logo.
    
    if old_logo_html in content:
        content = content.replace(old_logo_html, new_logo_html)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {os.path.basename(f)}")
        
print("Updated all HTML files.")
