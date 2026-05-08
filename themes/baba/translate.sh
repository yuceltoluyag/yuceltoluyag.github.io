#!/usr/bin/env bash

function extract_pot() {
    pybabel extract -s --no-wrap --project="Baba" --copyright-holder="Yücel Toluyag" --version="2.1.0" --mapping themes/baba/babel.cfg --output themes/baba/messages.pot ./
}

function new_translation() {
    pybabel init --no-wrap --input-file themes/baba/messages.pot --output-dir themes/baba/translations/ --locale $1 --domain messages
}

function update_translation() {
    pybabel update --no-wrap --input-file themes/baba/messages.pot --output-dir themes/baba/translations/ --domain messages
}

function compile_translations() {
    pybabel compile -f --directory themes/baba/translations/ --domain messages
}

function can_run() {
    if ! [ -x "$(command -v pybabel)" ]; then
        echo "Missing translation tool. Please, install Flask-Babel to continue."
        echo ""
        echo "    pip install Flask-Babel"
        echo ""
        exit 1
    fi
}

function usage {
    echo "Translate Flex theme tool"
    echo ""
    echo "Usage:"
    echo ""
    echo "    new [language]  create new translation."
    echo "    compile         compile all PO files into MO files."
    echo "    update          update all translations based on POT file."
    echo "    extract         extract all messages from templates and create the POT file."
}

case "$1" in
   "new")
        can_run

        if [ -z "$2" ]
        then
            echo "Error: missing translation code."
            echo ""
            usage
            exit 1
        else
            new_translation $2
        fi
      ;;
   "compile")
      can_run
      compile_translations
      ;;
   "update")
      can_run
      update_translation
      ;;
   "extract")
      can_run
      extract_pot
      ;;
   *)
    usage
    exit 1
    ;;
esac
