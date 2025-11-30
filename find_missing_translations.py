
import os
import sys

def find_missing_translations(base_path):
    turkish_articles_base_names = set()
    english_articles_base_names = set()

    articles_path = os.path.join(base_path, 'content', 'articles')
    en_articles_path = os.path.join(articles_path, 'en')

    # Get all Turkish article base names
    for root, _, files in os.walk(articles_path):
        for file in files:
            if file.endswith('.md') and not file.endswith('.en.md'):
                # Exclude files directly under 'en' folder if they are not .en.md
                if not os.path.basename(root) == 'en':
                    base_name = file.replace('.md', '')
                    turkish_articles_base_names.add(base_name)

    # Get all English article base names
    if os.path.exists(en_articles_path):
        for root, _, files in os.walk(en_articles_path):
            for file in files:
                if file.endswith('.en.md'):
                    base_name = file.replace('.en.md', '')
                    english_articles_base_names.add(base_name)
                elif file.endswith('.md') and not file.endswith('.en.md'):
                    # Handle cases where English articles might not follow the .en.md convention
                    # but are directly in the 'en' folder
                    base_name = file.replace('.md', '')
                    english_articles_base_names.add(base_name)


    missing_english_translations = sorted(list(turkish_articles_base_names - english_articles_base_names))

    for article in missing_english_translations:
        print(article)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        base_directory = sys.argv[1]
        find_missing_translations(base_directory)
    else:
        print("Usage: python find_missing_translations.py <base_directory>")
