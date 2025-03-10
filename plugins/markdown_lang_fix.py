"""
Markdown Language Fix Plugin
===========================

Bu eklenti, Markdown kod bloklarındaki dil bilgisini HTML çıktısına aktarır.
"""

from pelican import signals
import re
import os
from bs4 import BeautifulSoup


def fix_html_files(pelican):
    """
    HTML dosyalarını düzenler ve kod bloklarına dil bilgisini ekler.
    """
    output_path = pelican.settings.get("OUTPUT_PATH", "output")
    content_path = pelican.settings.get("PATH", "content")

    # Markdown dosyalarını ve karşılık gelen HTML dosyalarını eşleştir
    markdown_html_map = {}

    # Tüm Markdown dosyalarını bul
    for root, dirs, files in os.walk(content_path):
        for file in files:
            if file.endswith((".md", ".markdown")):
                md_path = os.path.join(root, file)
                # Slug'ı çıkar
                with open(md_path, "r", encoding="utf-8") as f:
                    content = f.read()
                    slug_match = re.search(r"Slug:\s*(.+)", content)
                    if slug_match:
                        slug = slug_match.group(1).strip()
                        markdown_html_map[slug] = {"md_path": md_path}

    # Tüm HTML dosyalarını bul ve Markdown dosyalarıyla eşleştir
    for root, dirs, files in os.walk(output_path):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                # Dizin adını al (slug olarak kullanılabilir)
                dir_name = os.path.basename(os.path.dirname(file_path))
                if dir_name in markdown_html_map and file == "index.html":
                    markdown_html_map[dir_name]["html_path"] = file_path

    # Eşleşen dosyaları işle
    for slug, paths in markdown_html_map.items():
        if "md_path" in paths and "html_path" in paths:
            fix_html_file_with_markdown(paths["md_path"], paths["html_path"])


def extract_code_blocks_from_markdown(md_path):
    """
    Markdown dosyasından kod bloklarını ve dil belirteçlerini çıkarır.
    """
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Kod bloklarını bul
    code_blocks = []
    # ```dil\nkod\n``` formatındaki kod bloklarını bul
    pattern = r"```(\w*)\n(.*?)```"
    matches = re.finditer(pattern, content, re.DOTALL)

    for match in matches:
        lang = (
            match.group(1).strip().upper() if match.group(1).strip() else "TEXT"
        )
        code = match.group(2)
        code_blocks.append({"lang": lang, "code": code})

    return code_blocks


def fix_html_file_with_markdown(md_path, html_path):
    """
    Markdown dosyasındaki dil belirteçlerini kullanarak HTML dosyasını düzenler.
    """
    try:
        # Markdown dosyasından kod bloklarını çıkar
        code_blocks = extract_code_blocks_from_markdown(md_path)

        if not code_blocks:
            return

        # HTML dosyasını oku
        with open(html_path, "r", encoding="utf-8") as f:
            content = f.read()

        # BeautifulSoup ile HTML'i parse et
        soup = BeautifulSoup(content, "html.parser")

        # Tüm kod bloklarını bul
        html_code_blocks = soup.find_all("div", class_="highlight")

        # Kod bloklarını eşleştir ve dil bilgisini ekle
        if len(html_code_blocks) == len(code_blocks):
            for i, (html_block, md_block) in enumerate(
                zip(html_code_blocks, code_blocks)
            ):
                lang = md_block["lang"]
                if lang:
                    html_block["data-language"] = lang

                # Kod içindeki ` işaretlerini temizle
                for code_element in html_block.find_all("code"):
                    code_html = str(code_element)
                    # ` işaretlerini kaldır
                    cleaned_code_html = re.sub(r"`", "", code_html)
                    # BeautifulSoup nesnesini güncelle
                    new_code = BeautifulSoup(
                        cleaned_code_html, "html.parser"
                    ).code
                    if new_code:
                        code_element.replace_with(new_code)
        else:
            # Kod blokları sayısı eşleşmiyorsa, otomatik dil tespiti yap
            fix_html_file(html_path)

        # Değişiklikleri kaydet
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(str(soup))

    except Exception as e:
        print(f"Hata: {html_path} dosyası işlenirken bir sorun oluştu: {e}")
        # Hata durumunda otomatik dil tespiti yap
        fix_html_file(html_path)


def fix_html_file(file_path):
    """
    HTML dosyasını düzenler ve kod bloklarına dil bilgisini otomatik olarak ekler.
    """
    try:
        # Dosyayı oku
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # BeautifulSoup ile HTML'i parse et
        soup = BeautifulSoup(content, "html.parser")

        # Tüm kod bloklarını bul
        code_blocks = soup.find_all("div", class_="highlight")

        for block in code_blocks:
            # Kod bloğunun içeriğini kontrol et
            code_text = block.get_text()

            # Dil bilgisini belirle
            lang = None

            # Kod içeriğine göre dil tespiti
            if re.search(r"function|var|let|const|=>|document\.", code_text):
                lang = "JAVASCRIPT"
            elif re.search(
                r'import\s+\w+|from\s+\w+\s+import|def\s+\w+\(|class\s+\w+:|if\s+__name__\s*==\s*[\'"]__main__[\'"]:',
                code_text,
            ):
                lang = "PYTHON"
            elif re.search(
                r"<html|<div|<span|<p>|<a\s+href|<img\s+src", code_text
            ):
                lang = "HTML"
            elif re.search(
                r"body\s*{|margin:|padding:|@media|\.class|#id", code_text
            ):
                lang = "CSS"
            elif re.search(
                r"SELECT|FROM|WHERE|INSERT INTO|UPDATE|DELETE FROM",
                code_text,
                re.IGNORECASE,
            ):
                lang = "SQL"
            elif re.search(
                r"public\s+class|private\s+void|protected|extends|implements",
                code_text,
            ):
                lang = "JAVA"
            elif re.search(
                r"#include|namespace|std::|cout|cin|int\s+main", code_text
            ):
                lang = "CPP"
            elif re.search(
                r"package\s+main|func\s+\w+\(|import\s+\(|fmt\.", code_text
            ):
                lang = "GO"
            elif re.search(
                r"require|def\s+\w+\s*\(|class\s+\w+\s*<|module\s+\w+",
                code_text,
            ):
                lang = "RUBY"
            elif re.search(r"<?php|echo|namespace|use\s+\w+\\", code_text):
                lang = "PHP"
            elif re.search(r"fn\s+\w+|let\s+mut|impl|struct|enum", code_text):
                lang = "RUST"
            elif re.search(
                r"func\s+\w+\(|var\s+\w+:|let\s+\w+:|import\s+\w+", code_text
            ):
                lang = "SWIFT"
            elif re.search(
                r"fun\s+\w+\(|val\s+\w+:|var\s+\w+:|class\s+\w+\(", code_text
            ):
                lang = "KOTLIN"
            elif re.search(
                r"interface\s+\w+|type\s+\w+\s*=|export\s+class|implements",
                code_text,
            ):
                lang = "TYPESCRIPT"
            elif re.search(r"^\s*-\s+\w+:|^\s*\w+:", code_text, re.MULTILINE):
                lang = "YAML"
            elif re.search(r'{\s*"\w+":', code_text):
                lang = "JSON"
            elif re.search(
                r"^#\s+|^\*\*\w+\*\*|^>\s+|^\d+\.\s+", code_text, re.MULTILINE
            ):
                lang = "MARKDOWN"
            elif re.search(
                r"Set-ExecutionPolicy|Get-ChildItem|New-Item|\$\w+\s*=|Write-Host|Invoke-Expression",
                code_text,
            ):
                lang = "POWERSHELL"
            elif re.search(
                r"apt-get|yum install|pacman -S|systemctl|sudo|grep|ls -la|cd\s+\w+|mkdir|rm -rf",
                code_text,
            ):
                lang = "SHELL"

            # Eğer dil tespit edildiyse, data-language özelliğini ekle
            if lang:
                block["data-language"] = lang

            # Kod içindeki ` işaretlerini temizle
            for code_element in block.find_all("code"):
                code_html = str(code_element)
                # ` işaretlerini kaldır
                cleaned_code_html = re.sub(r"`", "", code_html)
                # BeautifulSoup nesnesini güncelle
                new_code = BeautifulSoup(cleaned_code_html, "html.parser").code
                if new_code:
                    code_element.replace_with(new_code)

        # Değişiklikleri kaydet
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(str(soup))

    except Exception as e:
        print(f"Hata: {file_path} dosyası işlenirken bir sorun oluştu: {e}")


def register():
    """
    Eklentiyi kaydeder.
    """
    signals.finalized.connect(fix_html_files)
