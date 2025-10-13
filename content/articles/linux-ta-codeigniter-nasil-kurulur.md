Title: Linux'ta CodeIgniter Nasıl Kurulur?
Date: 2018-12-01 12:00 10:00
Modified: 2025-08-11 22:59
Category: Web Geliştirme
Tags: codeigniter, linux
Slug: linux-ta-codeigniter-nasil-kurulur
Authors: yuceltoluyag
Summary: Bu yazıda, Linux üzerinde CodeIgniter kurulumunu adım adım anlatıyorum. Gerekli ayarlarla birlikte kurulum sürecini detaylı bir şekilde öğreneceksiniz.
Translation: false
Status: published
Template: article
Image: images/codeigniter-xl.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/114983947794837501


**Gökhan Kandemir**’in **CodeIgniter Kitabı** ’nı aldıktan sonra, çalışma yapabilmek için CodeIgniter’ı kurmam gerekti. Kurulum işlemi oldukça basit ve lokal geliştirme ortamında çalışmak için ekstra bir ayar gerekmiyor. Ancak, sunucu tarafında bazı ek yapılandırmalar yapmanız gerekebilir. Bu yazıda, temel kurulum işlemi ile ilgili detayları paylaşıyorum. Sunucu ayarları ile ilgili isteyenlere ayrıca yardımcı olabilirim.

[responsive_img src="/images/codeigniter-xl.webp" alt="codeigniter" /]

 1. Adım 1: [Apache Kurulumu](/linux-apache2-mysql-phpmyadmin-kurulumu/){: target="_blank" rel="noopener noreferrer"} (Arch Linux için [tıklayın](/arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin/){: target="_blank" rel="noopener noreferrer"}))  
 2. Adım 2: [CodeIgniter İndirme Bağlantısı](https://codeigniter.com/download){: target="_blank" rel="noopener noreferrer"
 3.
Mevcut versiyon: 3.1.9

Aşağıdaki komutları kullanarak CodeIgniter’ı kurabilirsiniz:

```bash

wget  https://github.com/bcit-ci/CodeIgniter/archive/3.1.9.zip

unzip  3.1.6.zip

mv  CodeIgniter-3.1.6  codeigniter

sudo  chown  -R  sistemkullaniciadiniz:sistemkullanıcıadınız  /var/www/html/

cp  -R  codeigniter  /var/www/html/codeigniter

service  apache2  restart

```

- [Codeigniter 4](https://github.com/Baba-Project/ci4){: target="_blank" rel="noopener noreferrer"}  sürümüyle ilgili yaptığım testlere buradan ulaşabilirsiniz.
Kurulum tamamlandıktan sonra, [http://localhost/codeigniter](http://localhost/codeigniter){: target="_blank" rel="noopener noreferrer"} adresinden CodeIgniter’a ulaşabilirsiniz.

Adım 3: [YouTube Kanalım](https://www.youtube.com/channel/UCJyK4D5BcoPXjV5T8N8-liA?view_as=subscriber){: target="_blank" rel="noopener noreferrer"}
Burada daha fazla video ve rehber bulabilirsiniz.