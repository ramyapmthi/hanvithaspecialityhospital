import os
import glob

html_files = glob.glob('d:\\websites\\Hanvithahospital\\*.html')

old_tag = '<span class="header-brand-name">Hanvitha Speciality Hospital</span>'
new_tag = '<span class="header-brand-name">Hanvitha Speciality<br>Hospital</span>'

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if old_tag in content:
        content = content.replace(old_tag, new_tag)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {os.path.basename(f)}")

print("Done updates")
