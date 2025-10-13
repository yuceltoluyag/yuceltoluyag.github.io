#!/usr/bin/env python
# -*- coding: utf-8 -*- #

import os
import sys
from livereload import Server
from livereload.handlers import StaticFileHandler
import http.server
import socketserver

# Pelican yapılandırma dosyasını içe aktarma
sys.path.append(os.curdir)
from pelicanconf import *


# Özel 404 işleyicisi
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Dosya yolunu oluştur
        path = self.translate_path(self.path)

        # Dosya mevcut mu kontrol et
        if os.path.exists(path) and not os.path.isdir(path):
            # Normal dosya işleme
            super().do_GET()
        else:
            # 404 sayfasına yönlendir
            self.send_response(404)
            self.send_header("Content-type", "text/html")
            self.end_headers()

            # 404.html dosyasını oku ve gönder
            try:
                with open("output/404.html", "rb") as f:
                    self.wfile.write(f.read())
            except:
                self.wfile.write(b"404 - Sayfa Bulunamadi")


def main():
    # Çıktı dizinini kontrol et
    if not os.path.exists("output"):
        print(
            "Hata: 'output' dizini bulunamadı. Önce 'pelican content' komutunu çalıştırın."
        )
        sys.exit(1)

    # Çalışma dizinini output olarak değiştir
    os.chdir("output")

    # Sunucu ayarları
    PORT = 8080
    Handler = CustomHandler

    # Sunucuyu başlat
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Sunucu http://localhost:{PORT} adresinde çalışıyor")
        print("Çıkmak için Ctrl+C tuşlarına basın")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nSunucu kapatılıyor...")
            httpd.server_close()


if __name__ == "__main__":
    main()
