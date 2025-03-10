"""
Code Language Plugin
===================

Bu eklenti kod bloklarına dil bilgisini ekler.
"""

from pelican import signals
from bs4 import BeautifulSoup
import re

# Pygments sınıf isimlerinden dil tahmini için eşleştirme
LANG_PATTERNS = {
    # Sistem ve Shell
    r"(\$ |\# |apt-get|yum|pacman|systemctl|sudo|bash|zsh|sh\b)": "bash",
    r"(powershell|posh|\$PSVersionTable)": "powershell",
    # Web Teknolojileri
    r"(const |let |function |document\.|window\.|var |=>|npm|yarn|node |async |await)": "javascript",
    r"(<html|<div|<body|<head|<script|<style|<link|<meta|<!DOCTYPE)": "html",
    r"(@media|@import|{.*:.*}|@keyframes|\$|@mixin|@include)": "css",
    r"(<\?php|\$_GET|\$_POST|echo |namespace |use |\->)": "php",
    r"(import\s+React|<\w+\s+.*/>|jsx)": "jsx",
    r"(Vue\.component|<template>|<script>|vue)": "vue",
    # Programlama Dilleri
    r"(import |def |class |print\(|if __name__|\.py|pip|python)": "python",
    r"(public class |private |protected |package |import java|@Override)": "java",
    r"(#include|int main|void|printf|cout|cin|std::)": "cpp",
    r'(package |import "|func |go |fmt\.)': "go",
    r"(fn |let mut|impl|pub |use |cargo)": "rust",
    r"(require |def |class |puts |gem |rails |bundle)": "ruby",
    r"(using System|namespace|public class|\.NET)": "csharp",
    r"(module |puts |end |def |class |require)": "ruby",
    r"(interface |type |implements |extends |abstract)": "typescript",
    r"(defn |defmacro |\(ns |\(def )": "clojure",
    r"(module|let|type|match|with)": "fsharp",
    r"(data|module|where|import|class|instance)": "haskell",
    r"(defmodule|def |defp |do|end|iex>)": "elixir",
    r"(object |trait |def |val |var |scala>)": "scala",
    r"(fun |val |var |kotlin)": "kotlin",
    r"(program|begin|end\.|unit|uses)": "pascal",
    r"(procedure|function|begin|end;)": "delphi",
    # Markup ve Config
    r"^\[.*\]|^\w+\s*=\s*": "toml",
    r'^{[\s]*"|^\[[\s]*{': "json",
    r"^#+ |^\*\*|^- |\[.*\]\(.*\)|^>|^```": "markdown",
    r"^[-\s]*[\w-]+:\s|^---": "yaml",
    r"(<\?xml|<!DOCTYPE|<[\w-]+>)": "xml",
    r"^\[.*\]$|^\w+\s*=\s*\w+": "ini",
    # Veritabanı
    r"(SELECT |INSERT |UPDATE |DELETE |CREATE TABLE|ALTER |DROP )": "sql",
    r"(db\.|collection\.|find\(|aggregate\()": "mongodb",
    # DevOps ve Altyapı
    r"(FROM |RUN |CMD |ENTRYPOINT |WORKDIR |COPY |ADD )": "dockerfile",
    r"(resource |provider |terraform|variable )": "terraform",
    r"(server {|location |proxy_pass |listen |server_name )": "nginx",
    r"(<VirtualHost|RewriteEngine|DocumentRoot|AllowOverride)": "apache",
    r"(apiVersion:|kind:|metadata:|spec:)": "kubernetes",
    # Yeni Eklenen Diller
    r"(REPORT|FUNCTION|METHOD|CLASS|ENDCLASS|DATA)": "abap",
    r"(package|import flash|extends Sprite|function)": "actionscript",
    r"(BEGIN\s+BIML|<Biml>|</Biml>)": "biml",
    r"(\+\+\+|>>>|\[\]|,|\.|\+|-|<|>)": "brainfuck",
    r"(Процедура|КонецПроцедуры|Функция|КонецФункции)": "bsl",
    r"(shared|abstract|formal|actual|satisfies|dynamic)": "ceylon",
    r"(BEGIN\s+TRANSACTION|COMMIT|ROLLBACK|cfquery|cffunction)": "cfscript",
    r"(protocol|extension|struct|enum|guard|defer)": "swift",
    r"(SELECT\s+TOP|INNER JOIN|LEFT JOIN|GROUP BY|ORDER BY)": "sql",
    r"(async|await|Promise|constructor|super|static)": "typescript",
    r"(component|template|script|style scoped|v-if|v-for)": "vue",
    r"(pragma|entity|architecture|process|signal)": "vhdl",
    r"(module|endmodule|always|initial|reg|wire)": "verilog",
    r"(xojo|dim|sub|function|#if|#else|#endif)": "xojo",
    r"(program|uses|type|var|begin|end\.)": "pascal",
    r"(procedure|function|constructor|destructor)": "delphi",
    r"(namespace|interface|enum|using|delegate)": "csharp",
    r"(import scala|case class|trait|object|def)": "scala",
    r"(fun|val|var|when|object|companion)": "kotlin",
    r"(defun|setq|let|cond|lambda|quote)": "lisp",
    r"(let rec|match|type|module|open)": "ocaml",
    r"(query|mutation|type|input|interface)": "graphql",
    r"(program|subroutine|function|module)": "fortran",
    r"(shader|uniform|varying|attribute)": "glsl",
    r"(Feature:|Scenario:|Given|When|Then)": "gherkin",
    r"(task|input|output|group|workflow)": "gradle",
    r"(<?hh|namespace|use|class|function)": "hack",
    r"(%\w+|!!!|\-|=|~)": "haml",
    r"({{|}}|\{\{#|\{\{/|\{\{>)": "handlebars",
    r"(resource|provider|variable|output)": "hcl",
    r"(defn|defrec|defmacro|defprotocol)": "hylang",
    r"(pro|function|compile_opt|return)": "idlang",
    r"(function|wave|macro|string)": "igorpro",
    r"(method|slot|proto|clone|self)": "io",
    r"(<%@|<%=|<%!|<jsp:)": "jsp",
    r"(using|import|macro|template)": "jinja",
    r"(function|method|slot|class)": "lasso",
    r"({%|{{|assign|capture|if)": "liquid",
    r"(local|function|end|then|do)": "lua",
    r"(move|movea|moveq|bra|beq)": "m68k",
    r"(_method|_proc|_block|_endblock)": "magik",
    r"(Plot|Solve|Table|Module)": "mathematica",
    r"(function|class|extends|import)": "moonscript",
    r"(model|uses|maximise|minimise)": "mosel",
    r"(<mx:|<fx:|xmlns:mx=)": "mxml",
    r"(section|global|bits|byte)": "nasm",
    r"(proc|type|let|var|when)": "nim",
    r"(let|rec|in|with|inherit)": "nix",
    r"(@interface|@implementation|@end)": "objective_c",
    r"(:-|consult|assert|retract)": "prolog",
    r"(Form|procedure|endproc)": "praat",
    r"(message|syntax|option|enum)": "protobuf",
    r"(class|define|node|include)": "puppet",
    r"(library|require|source)": "r",
    r"(define|lambda|let|cond)": "racket",
    r"(require|if|elsif|vacation)": "sieve",
    r"(doctype|html|body|head)": "slim",
    r"(class|method|super|self)": "smalltalk",
    r"({if}|{/if}|{foreach}|{/foreach})": "smarty",
    r"(fun|val|datatype|structure)": "sml",
    r"(private|scopeName|params)": "sqf",
    r"(SynthDef|Server|Pattern)": "supercollider",
    r"(set|proc|expr|namespace)": "tcl",
    r"(\begin|\end|usepackage|document)": "tex",
    r"(@prefix|@base|a|<|>|\.)": "turtle",
    r"({%|{{|{#|extends|block)": "twig",
    r"(class|interface|enum|namespace)": "vala",
    r"(Sub|Function|Dim|ReDim|As)": "vb",
    r"(noremap|nnoremap|inoremap)": "viml",
    r"(class|method|WKO|test)": "wollok",
}


def detect_language(code_text, existing_classes):
    """Kod metninden ve mevcut sınıflardan dil tespiti yap"""

    # Önce class'lardan kontrol et
    for cls in existing_classes:
        if cls.startswith("language-"):
            return cls.replace("language-", "")
        elif cls.startswith("highlight-"):
            return cls.replace("highlight-", "")

    # Metin içeriğinden tahmin et
    code_lines = code_text.strip().split("\n")
    if not code_lines:
        return None

    # Her satırı kontrol et
    for pattern, lang in LANG_PATTERNS.items():
        for line in code_lines:
            if re.search(pattern, line):
                return lang

    return None


def add_language_class(content):
    if not content._content:
        return

    soup = BeautifulSoup(content._content, "html.parser")

    # Tüm kod bloklarını bul
    for block in soup.find_all("div", class_="highlight"):
        # İlk code elementini bul
        code = block.find("code")
        if not code:
            continue

        # Mevcut sınıfları al
        classes = []
        if "class" in code.attrs:
            classes = code.get("class", [])

        # Kullanıcının belirttiği dili kontrol et
        user_specified_lang = None
        for cls in classes:
            if cls.startswith("language-"):
                user_specified_lang = cls.replace("language-", "").upper()
                break
            elif cls.startswith("highlight-"):
                user_specified_lang = cls.replace("highlight-", "").upper()
                break

        if user_specified_lang:
            # Kullanıcı bir dil belirttiyse, onu kullan
            block["data-language"] = user_specified_lang
        else:
            # Kod metnini al
            code_text = code.get_text()

            # Dil tespiti yap
            lang = detect_language(code_text, classes)

            if lang:
                # Dil sınıfını ekle
                block["data-language"] = lang.upper()
            else:
                # Dil tespit edilemediğinde TEXT kullan
                block["data-language"] = "TEXT"

    content._content = str(soup)


def register():
    signals.content_object_init.connect(add_language_class)
