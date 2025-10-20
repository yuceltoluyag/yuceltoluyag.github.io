import os
import re
from bs4 import BeautifulSoup

def convert_infobox_to_admonition(markdown_content):
    # Regex to find the entire info-box div structure
    # This regex is designed to be as broad as possible to catch variations
    # It captures the type, and the inner content including title and paragraph
    # It also handles cases where there's no SVG or alert-title div directly
    pattern = re.compile(r'<div class="info-box\s+(?P<type>\w+)">\s*(?:<svg.*?</svg>\s*)?(?:<div>\s*<div class="alert-title">(?P<title>.*?)</div>\s*)?(?P<content>(?:<p>.*?</p>|\s*.*?))?\s*</div>', re.DOTALL)

    def replace_match(match):
        box_type = match.group('type')
        title = match.group('title')
        content = match.group('content')

        # Clean up content: remove <p> tags and extra whitespace
        if content:
            # Use BeautifulSoup to parse the content and extract text, preserving inner HTML like <a> or <b>
            soup_content = BeautifulSoup(content, 'html.parser')
            # If content is wrapped in <p> tags, extract its inner HTML
            if soup_content.p:
                extracted_content = str(soup_content.p.decode_contents()).strip()
            else:
                extracted_content = str(soup_content.decode_contents()).strip()
        else:
            extracted_content = ""

        # Determine the admonition title
        admonition_title = f' "{title}"' if title else '""'

        # Format the new admonition block
        # Indent the content by 4 spaces
        indented_content = "\n".join(["    " + line for line in extracted_content.splitlines()])

        return f'!!! {box_type}{admonition_title}\n{indented_content}'

    # Perform replacements iteratively until no more matches are found
    new_content = markdown_content
    while True:
        old_new_content = new_content
        new_content = pattern.sub(replace_match, new_content)
        if old_new_content == new_content:
            break
    return new_content

def process_markdown_files(root_dir):
    for subdir, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(subdir, file)
                print(f"Processing {filepath}...")
                with open(filepath, 'r', encoding='utf-8') as f:
                    original_content = f.read()

                modified_content = convert_infobox_to_admonition(original_content)

                if original_content != modified_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(modified_content)
                    print(f"Modified {filepath}")
                else:
                    print(f"No changes needed for {filepath}")

if __name__ == "__main__":
    articles_dir = "content/articles"  # Adjust this path if your articles are in a different directory
    process_markdown_files(articles_dir)
    print("Conversion complete!")
