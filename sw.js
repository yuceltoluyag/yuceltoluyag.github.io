importScripts("/assets/js/workbox-v5.1.4/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v5.1.4"});

self.__precacheManifest = [{"url":"/gulpfile.js","revision":"71e37b94f92bf07bee317a6d759bbba9"},{"url":"/index.json","revision":"2fcee243fe45b1d42dc8d80aa85df7c6"},{"url":"/manifest.json","revision":"221984d6e1aadbc4c76cf14e080efc6a"},{"url":"/lighthouserc.json","revision":"c098b22f3567d468beab551436f2c8f6"},{"url":"/sw-register.js","revision":"a69664ce4f95cdc68c56be75187fd936"},{"url":"/assets/css/style.min.css","revision":"43a8383b6978af31cf2422ffa66d0267"},{"url":"/assets/js/snackbar.js","revision":"2ffd93e5a7883f46e008c194606c1504"},{"url":"/assets/js/theme.js","revision":"0e17a545736688d4e37ff51bf4cc9404"},{"url":"/assets/js/sw-registration.js","revision":"619d9755236fef7eae9969e4a06708c7"},{"url":"/assets/js/pvreport.js","revision":"eb026bbf3847d03e2d58195a59bb8f41"},{"url":"/assets/js/main.js","revision":"0be05bbf8a81c0f40051105be6fc15c6"},{"url":"/favicon.ico","revision":"21620055c8f33fd16aaf550f58d4c67c"},{"url":"/assets/images/spotify-2.webp","revision":"970c0d6743738e3b80d3e25f744e46fb"},{"url":"/assets/images/faucetcrypto.webp","revision":"050862944cec7d171f80071328e9f98d"},{"url":"/assets/images/exen.webp","revision":"b903f7d8bb697c9b35fc84753d76f821"},{"url":"/assets/images/nvidia-grafik-karti-indirme2.webp","revision":"793b48e657609703d205f66df19e26e0"},{"url":"/assets/images/optirun-performansi.webp","revision":"b384bab9c7a21dfcd23a0ebbcdfdda00"},{"url":"/assets/images/nvidia-grafik-karti-indirme.webp","revision":"a6e5eebcf53423b04ea9004d9ef4453b"},{"url":"/assets/images/linux_windows10_uefi_disk.webp","revision":"c7e3d36b908bf826ee8c228bb652871a"},{"url":"/assets/images/linux_samba.webp","revision":"bdd637d780a59a08111526f66b03afca"},{"url":"/assets/images/configure_lampp.webp","revision":"508221fc95869bd6398b5009756e0fd6"},{"url":"/assets/images/spotify.webp","revision":"533d458a387a7bb08211021ba9c6aff4"},{"url":"/assets/images/sublime-text-eklentileri.webp","revision":"8aab27e268f7ba9dbc0dc8268e4cae48"},{"url":"/assets/images/ntfs_yetki_hatasi.webp","revision":"7a1550a9dc72297cb4fb4c4e8e86e600"},{"url":"/assets/images/imap_openssl_terminal.webp","revision":"6ec2b0292b301abf65b823e73d2f053a"},{"url":"/assets/images/linux_browser_obs_custom.webp","revision":"55dd71b02c1c5ac5fdea9ab84f1db96f"},{"url":"/assets/images/spotify-5.webp","revision":"bb480984ccf04341f13b1f23d701fff3"},{"url":"/assets/images/spotify-4.webp","revision":"da63d4cc5520bb61dce0177c371d5e80"},{"url":"/assets/images/uygulama_sifresi_gmail.webp","revision":"5f9338ff72dc5cabfc38eec79ca299ad"},{"url":"/assets/images/optirun-dahili-gpu.webp","revision":"e04da748e8200a89045ad4a445016eb4"},{"url":"/assets/images/linux_browser_kaynaklar.webp","revision":"bc91490d10ae48c037d94556256e6c64"},{"url":"/assets/images/php_phpstorm_csfixer.webp","revision":"83a93612627040621084013e6a0f174b"},{"url":"/assets/images/Screenshot_2018-11-17_17-22-17.webp","revision":"bdd637d780a59a08111526f66b03afca"},{"url":"/assets/images/linux_browser_settings.webp","revision":"b468c573344f4fb62a9a7250345e1fb1"},{"url":"/assets/images/AFileIcon.webp","revision":"af099aba60a19ac48e4455fb1bd32e29"},{"url":"/assets/images/oh_my_zsh.webp","revision":"cbe657cbdf74089308874bf87ca0c470"},{"url":"/assets/images/php_phpstorm_csfixer5.webp","revision":"d0903de50ff662c9da6291f1769acab4"},{"url":"/assets/images/telegram_bot_join_group.webp","revision":"4cb9be70d1db04003d56590f28153c1c"},{"url":"/assets/images/ortam_degiskenleri3.webp","revision":"08543ce78a725910bc3c36c64f119249"},{"url":"/assets/images/sweetalert.webp","revision":"17b5b77435313d55d8d1f2a5a66b33bf"},{"url":"/assets/images/facebookgrupkodu.webp","revision":"1712a153ce20c74532733c2c48eec1b7"},{"url":"/assets/images/balance.webp","revision":"94370fde1ce6bf81db84c679244d649b"},{"url":"/assets/images/coin_sec.webp","revision":"9e642bc7a8bc94be7e790654dca301fd"},{"url":"/assets/images/odeme_kaniti.webp","revision":"cc6c653e72ac336d7ed3fa9819e80593"},{"url":"/assets/images/airdrop_flx_coin.webp","revision":"ae443ee498d1c293a148a43a9764af4f"},{"url":"/assets/images/nvidia-grafik-ayari-maximum-performans.webp","revision":"fcccdb36b654182c799e49bbf1318210"},{"url":"/assets/images/esigara-yararlimi-zararlimi.webp","revision":"431c21e58d8555b42d58263dc1bfa648"},{"url":"/assets/images/ortam_degiskenleri2.webp","revision":"4564d1e11107ce2984bd99881dc1854a"},{"url":"/assets/images/ol_vbox_vagrant-min.webp","revision":"c3840048540029a83429a47bd66de4d7"},{"url":"/assets/images/ortam_degiskenleri1.webp","revision":"8ccdb4c1835492ad70b74bb5ffeda557"},{"url":"/assets/images/phpstorm_terminal.webp","revision":"b5cf0e965aac44dd1bc3963600461850"},{"url":"/assets/images/git_bash.webp","revision":"345e2326731e35ad458d539d632331ad"},{"url":"/assets/images/redshift_windows.webp","revision":"d1d6d720764ea199ece90f2cdea18f18"},{"url":"/assets/images/linux_windows10_uefi.webp","revision":"3d6249079327ac4058d00dd17f2974a7"},{"url":"/assets/images/spotify-3.webp","revision":"e3a2a0e815b383f8ece3b39567fdd38d"},{"url":"/assets/images/touch/icon-512x512.webp","revision":"e430cb5db12631db36815db99b555e59"},{"url":"/assets/images/touch/icon-384x384.webp","revision":"646b05244879714ead1fcda3b1ab76c5"},{"url":"/assets/images/touch/icon-192x192.webp","revision":"189a567bbccad42885f8ec652dd63919"},{"url":"/assets/images/touch/icon-256x256.webp","revision":"551ee369aa34e525e925c7a7741a8ddf"},{"url":"/assets/images/pic-full-190916-0808-36.webp","revision":"af537a30223613d1e96c13249bcd41b5"},{"url":"/assets/images/newsboaticerik.webp","revision":"0585e46b40bd07c422958e6ec22252f7"},{"url":"/assets/images/AlignTab.webp","revision":"b50821bc9fa914a5e730f73959e67b71"},{"url":"/assets/images/newsboat.webp","revision":"481d94576a44335077bd4653821e1da5"},{"url":"/assets/images/Side​Bar​Enhancements.webp","revision":"2942f38a814966cd1d038556b88ef929"},{"url":"/assets/images/vlbsub.webp","revision":"ee122756e7ef9bf0739dd96b0cff4563"},{"url":"/assets/images/hosts.webp","revision":"e8f6539fd5d282095a7051aec65cfecc"},{"url":"/assets/images/php_phpstorm_csfixer3.webp","revision":"da175d76464f2f1fcfbd186fc929b19e"},{"url":"/assets/images/nvidia-linux-performans-ayari.webp","revision":"8935cd6aa76e9ed1f8dc1d105d4714ce"},{"url":"/assets/images/facebookgrupistatistik.webp","revision":"04b368be907e478ae7b16d0f86d04016"},{"url":"/assets/images/vlsub0.webp","revision":"78efad2c694cf188184a606689ca83a1"},{"url":"/assets/images/facebook-5000-arkadas-ekleme-kodu-v2.webp","revision":"1e267fe8c42a2ed5aaaa6a3941228329"},{"url":"/assets/images/GitHubinator.webp","revision":"d7ed7edba13e6b3f2c4313bd163f730d"},{"url":"/assets/images/flxcoin.webp","revision":"4f7f3a7efe1a84c446a97783125e2524"},{"url":"/assets/images/linux_browser_obs.webp","revision":"3b19f483fdbfb38e2d47a6ae939f0158"},{"url":"/assets/images/php_morris.webp","revision":"d974b8d1670052940c685846184aa13d"},{"url":"/assets/images/laravel-valet-kurulumu-linux.webp","revision":"83929b628ac86f3721711044841faa28"},{"url":"/assets/images/GutterColor.webp","revision":"acc00fcc0729cd0dd55698f9b5edf99c"},{"url":"/assets/images/vlsub1.webp","revision":"ca0294099a49d031f00854764fca0f3b"},{"url":"/assets/images/linux_windows10_uefi_boot_2.webp","revision":"7bfa4607f62f3b3d77422d6d9c26bd93"},{"url":"/assets/images/telegrambotmenu.webp","revision":"f79b8f78d94c5090da6cb1edee1a4e1c"},{"url":"/assets/images/keyscrambler.webp","revision":"4ea3d26412cd23975057a316a2d5f5ab"},{"url":"/assets/images/linux_browser_discord.webp","revision":"227fcddd15a39c25df67d50262d79082"},{"url":"/assets/images/duyuru.webp","revision":"0fb1fff3e2a7abb33194006b2abb1abd"},{"url":"/assets/images/favicons/favicon-96x96.webp","revision":"1482ee6a2ecfbc90afad308a4d4b7d1b"},{"url":"/assets/images/favicons/apple-icon-152x152.webp","revision":"81cde44686eadb896c277f9bf3242839"},{"url":"/assets/images/favicons/apple-icon.webp","revision":"26b300a7b612db7e96d3c54ed7ea3a38"},{"url":"/assets/images/favicons/apple-icon-180x180.webp","revision":"65e416387809ad78f49d07fb90c5f885"},{"url":"/assets/images/favicons/ms-icon-70x70.webp","revision":"04bce77a3ae0c8d7ece5f23b8abd4490"},{"url":"/assets/images/favicons/ms-icon-310x310.webp","revision":"aa16a4991e98351ba7268b9d4bcd6864"},{"url":"/assets/images/favicons/android-icon-96x96.webp","revision":"1482ee6a2ecfbc90afad308a4d4b7d1b"},{"url":"/assets/images/favicons/apple-icon-120x120.webp","revision":"1d12238e91908b3d40bd260e941efbe7"},{"url":"/assets/images/favicons/apple-icon-precomposed.webp","revision":"26b300a7b612db7e96d3c54ed7ea3a38"},{"url":"/assets/images/favicons/apple-icon-57x57.webp","revision":"876e156f66de75ca0f0a33b0d6d2ffe2"},{"url":"/assets/images/favicons/favicon-16x16.webp","revision":"04ba1fe8bba645cd1671ac6dc04b2f24"},{"url":"/assets/images/favicons/android-icon-144x144.webp","revision":"c49b7dead78290a61494b41c69e166d6"},{"url":"/assets/images/favicons/apple-icon-60x60.webp","revision":"f13ca757dd3abdc7848e689a7b8d640d"},{"url":"/assets/images/favicons/android-icon-72x72.webp","revision":"d2aa9c356eb2582c306119f7f71e0da9"},{"url":"/assets/images/favicons/apple-icon-144x144.webp","revision":"c49b7dead78290a61494b41c69e166d6"},{"url":"/assets/images/favicons/ms-icon-144x144.webp","revision":"c49b7dead78290a61494b41c69e166d6"},{"url":"/assets/images/favicons/android-icon-192x192.webp","revision":"26b300a7b612db7e96d3c54ed7ea3a38"},{"url":"/assets/images/favicons/favicon.ico","revision":"b6c08b614b34477951dbe46ffeba5f63"},{"url":"/assets/images/favicons/android-icon-36x36.webp","revision":"0c5fd3ccf785df416f9c782769bcd79b"},{"url":"/assets/images/favicons/apple-icon-76x76.webp","revision":"661cd57d9f71f0bed7a9be668b39e3bd"},{"url":"/assets/images/favicons/apple-icon-72x72.webp","revision":"d2aa9c356eb2582c306119f7f71e0da9"},{"url":"/assets/images/favicons/ms-icon-150x150.webp","revision":"7d3588d6bf671bc66d548bb2186e8a34"},{"url":"/assets/images/favicons/apple-icon-114x114.webp","revision":"86c92c17f9c94b815ea5c1e67bf515b2"},{"url":"/assets/images/favicons/android-icon-48x48.webp","revision":"bec8815fe216941290e5f9643bc96dbc"},{"url":"/assets/images/favicons/favicon-32x32.webp","revision":"f175bac5eeff4bbd491f004bd912d818"},{"url":"/assets/images/normal/linux_browser_obs.png","revision":"dc697113ad38c91e86cbb45d452724e9"},{"url":"/assets/images/normal/primeperformansi.png","revision":"b6e2d5e937ed4dafc0d4e8325c00f0e2"},{"url":"/assets/images/normal/linux_browser_obs_custom.png","revision":"0a21a34749904ffcd7e07b5f0411b6fb"},{"url":"/assets/images/normal/optirun-dahili-gpu.png","revision":"aa4d01c32834779eef82430aa036493d"},{"url":"/assets/images/normal/keyscrambler2.png","revision":"e103ccba0c9b89e78871319ccf1b57ab"},{"url":"/assets/images/normal/flxcoin.png","revision":"5d8fbe3f2bebc7995b2ede01e7cb5436"},{"url":"/assets/images/normal/ucretsiz-oyunlar.jpg","revision":"85612265b9f7fa2e0ced29f2fd2379a1"},{"url":"/assets/images/normal/phpstorm_terminal.png","revision":"39b66f893ac02b688d59018552eb3dce"},{"url":"/assets/images/normal/laravel-valet-kurulumu-linux.jpeg","revision":"d40f05979896b720bf47323dfaafd949"},{"url":"/assets/images/normal/php_phpstorm_csfixer5.png","revision":"5d07bf63b738fa22b38aee02992b89f1"},{"url":"/assets/images/normal/configure_lampp.jpeg","revision":"5b0855b35ce265f8c395091a15d263b1"},{"url":"/assets/images/normal/neomutt_senkron.png","revision":"ad571df05c831739ef8aabb3f90591b4"},{"url":"/assets/images/normal/AFileIcon.png","revision":"fadf1de10c6b9fc820fc8cd5754407eb"},{"url":"/assets/images/normal/comodo_firewall.png","revision":"3df5f306f988b8d169cefc7392e7bf1c"},{"url":"/assets/images/normal/laravel-valet-link-archlinux.png","revision":"9fdb54163eecebfc48372f0021703c41"},{"url":"/assets/images/normal/oh_my_zsh.png","revision":"cb0cbf3e74a815009a323efb6dd6e8ec"},{"url":"/assets/images/normal/linux_browser_settings.png","revision":"49ec6cd10ff6cdb8fc723ce4b2700334"},{"url":"/assets/images/normal/baba.test.png","revision":"63101f2152c4dc726765c3c63d021c95"},{"url":"/assets/images/normal/GitHubinator.png","revision":"e0a2e0aef4598b58a779322e19b4fd63"},{"url":"/assets/images/normal/spotify-5.png","revision":"fc30278ace3f4a4183343a0e243298df"},{"url":"/assets/images/normal/AlignTab.png","revision":"7136881b17e0a50bb9a024e4822629ed"},{"url":"/assets/images/normal/facebookgrupistatistik.png","revision":"186c524720f1067ea8acd52479411595"},{"url":"/assets/images/normal/facebook-5000-arkadas-ekleme-kodu-v2.jpg","revision":"108858926c8964fc1ea7ca076e89b5e9"},{"url":"/assets/images/normal/exen.png","revision":"a08879702e26f850f3dcccd38a1b36df"},{"url":"/assets/images/normal/bonus_mininig.png","revision":"59354d38a65a4341fc703af0370e1b4c"},{"url":"/assets/images/normal/linux_browser_final.png","revision":"62563a97930e224cfd29374b5dd8b208"},{"url":"/assets/images/normal/linux_browser.png","revision":"5fe091be7dd7a3719fc0c5236bfc6cf3"},{"url":"/assets/images/normal/vlsub1.png","revision":"bd2a4be1a2a20eb9073034a704fd62ea"},{"url":"/assets/images/normal/uygulama_sifresi_gmail.png","revision":"4542e02b128df6aa9d692b3451da4e87"},{"url":"/assets/images/normal/php_morris.png","revision":"7caf1497b177beb06616b613593e9f18"},{"url":"/assets/images/normal/keyscrambler.png","revision":"9c827c587dd6cf0578e20ade505fea0d"},{"url":"/assets/images/normal/vlbsub.png","revision":"c79c8fd13300cd1721996b94ecd9fa43"},{"url":"/assets/images/normal/airdrop_flx_coin.png","revision":"76ee8d66ea9facd6fdd358e078119fbf"},{"url":"/assets/images/normal/imap_openssl_terminal.png","revision":"29f3c559a9326dbac8f1f2b8f9fb9d61"},{"url":"/assets/images/normal/optirun-performansi.png","revision":"8f7c5080408665692c3c460a4ec0eee0"},{"url":"/assets/images/normal/Side​Bar​Enhancements.png","revision":"6efc507422964197a2c987ecb7047d5f"},{"url":"/assets/images/normal/sublime-text-eklentileri.jpeg","revision":"4383a1d6d585219be90bb873aa24a7e4"},{"url":"/assets/images/normal/phpstorm_terminal2.png","revision":"d3447d8d9d5d21baf36bbb057e912e73"},{"url":"/assets/images/normal/spotify.png","revision":"091ddc592b389b076200a39695cda9ee"},{"url":"/assets/images/normal/php_phpstorm_csfixer.png","revision":"852f68243fa5581362f8f1ee7cd4b944"},{"url":"/assets/images/normal/odeme_kaniti.png","revision":"beda7c915c7cc987c4143c2f2b66a0d2"},{"url":"/assets/images/normal/ortam_degiskenleri3.png","revision":"3284e965fe5b30f7f6f1c534d03e1db4"},{"url":"/assets/images/normal/nvidia-linux-performans-ayari.png","revision":"9ebb9792622b9877b2152cf851e2343e"},{"url":"/assets/images/normal/spotify-4.png","revision":"0e763b06d82d058f7b2d35482f1688e4"},{"url":"/assets/images/normal/nvidia-grafik-karti-indirme.png","revision":"a867db0df592f5f5d1689e8994a92c66"},{"url":"/assets/images/normal/linux_windows10_uefi_boot.jpeg","revision":"a583b0945ae2c7bb77d3289c633a1c0d"},{"url":"/assets/images/normal/esigara-yararlimi-zararlimi.jpg","revision":"3c3d029b70c8fc6e9130fe5cdb033c9f"},{"url":"/assets/images/normal/linux_windows10_uefi_format_error.jpeg","revision":"345bc488a02d7fcbf3ad92aeb0e576be"},{"url":"/assets/images/normal/nvidia-grafik-ayari-maximum-performans.png","revision":"bbc48e20e26ea0caa0ec43245d40e3fa"},{"url":"/assets/images/normal/pic-selected-190916-0818-54.png","revision":"aa37c3f662b1eafe7adeaed46c1cc996"},{"url":"/assets/images/normal/coin_sec.png","revision":"25bd3b115dea7538806c561ed7b69728"},{"url":"/assets/images/normal/nvidia-grafik-karti-indirme2.png","revision":"92eca345dac825384f6a1c46d826f367"},{"url":"/assets/images/normal/duyuru.jpg","revision":"14f87a2bca502cde1ee53d7439cb5054"},{"url":"/assets/images/normal/sweetalert.png","revision":"01ce0ac5951540636ddf80d7cbf1da0d"},{"url":"/assets/images/normal/linux_windows10_uefi_format.jpeg","revision":"fdd9fd8ff4e8f4f601f407dd36089ad2"},{"url":"/assets/images/normal/redshift_windows.png","revision":"6108bf219773ea65aab61e4fe13bd97d"},{"url":"/assets/images/normal/touch/icon-512x512.png","revision":"fec2cdd70f48fcea8f8dd004fcbfec46"},{"url":"/assets/images/normal/touch/icon-384x384.png","revision":"228e72d60166f2e1687f905deed55638"},{"url":"/assets/images/normal/touch/icon-192x192.png","revision":"22b0807fc10493579c3d05a493a67c61"},{"url":"/assets/images/normal/touch/icon-256x256.png","revision":"bd8a08474b84e9afd3592c9d5cc6a486"},{"url":"/assets/images/normal/BracketHighlighter.png","revision":"17614926582a27e23d2f6b2b33aa4245"},{"url":"/assets/images/normal/composer.jpeg","revision":"01c478a1a8ee879c4119f7ec7a908d31"},{"url":"/assets/images/normal/linux_browser_kaynaklar.png","revision":"e2f0c05f0d46c9964a42e5b88d99bc2a"},{"url":"/assets/images/normal/facebookgrupkodu.png","revision":"78ab1a53f3539dd0bf0abda10175817c"},{"url":"/assets/images/normal/linux_windows10_uefi_boot_2.jpeg","revision":"7faa73ef4a1f08e4972af5ba9061079c"},{"url":"/assets/images/normal/php_phpstorm_csfixer4.png","revision":"22724fd7d104f8646f669d6353ce96a6"},{"url":"/assets/images/normal/SublimeLinter.png","revision":"8e13355a54fed10074be5a1cefaf6418"},{"url":"/assets/images/normal/php_phpstorm_csfixer2.png","revision":"285bfad927ae895fc940ef8d99795033"},{"url":"/assets/images/normal/vlsub0.png","revision":"119c872c7e05a82004e6335feb70c5a5"},{"url":"/assets/images/normal/faucetcrypto.png","revision":"95fb66639ab46b9201da01b2439f79af"},{"url":"/assets/images/normal/linux_windows10_uefi_disk.jpeg","revision":"329c5333837900443c9a9cd25de164de"},{"url":"/assets/images/normal/linux_windows10_uefi.jpeg","revision":"3b04065c088a0dc4635484e4921a4ece"},{"url":"/assets/images/normal/git_bash.png","revision":"880e677c7b23f3fd35b5ef667ce97839"},{"url":"/assets/images/normal/telegrambotmenu.png","revision":"00ff9bf7fa501f86ce269867d80df0cd"},{"url":"/assets/images/normal/favicons/favicon-96x96.png","revision":"f9ad6bf999a5b586e92b62ac67238c7f"},{"url":"/assets/images/normal/favicons/ms-icon-70x70.png","revision":"2f3e077b37f81ebbce5798cccf35b2bd"},{"url":"/assets/images/normal/favicons/apple-icon-76x76.png","revision":"7f3910f525efdd2467bb3340a520e712"},{"url":"/assets/images/normal/favicons/apple-icon-60x60.png","revision":"bfb493f29f775ce71669d0d1edc9a10e"},{"url":"/assets/images/normal/favicons/android-icon-48x48.png","revision":"ac73e7bb985f10b3103849931a6cb0fd"},{"url":"/assets/images/normal/favicons/apple-icon-72x72.png","revision":"f7c4ae5312cee2c149b5edb262b1d89f"},{"url":"/assets/images/normal/favicons/favicon-32x32.png","revision":"58308a03757ce92657036a8eebbd7176"},{"url":"/assets/images/normal/favicons/apple-icon-precomposed.png","revision":"591bd3c16e887764281d6a89c9a17a1e"},{"url":"/assets/images/normal/favicons/android-icon-144x144.png","revision":"91401f7a5fc4e7a3efa2481ddedc862e"},{"url":"/assets/images/normal/favicons/ms-icon-310x310.png","revision":"58771c90abff795e224434090cfef366"},{"url":"/assets/images/normal/favicons/apple-icon-57x57.png","revision":"e159f40a5a5cb9f1869187f241644d8b"},{"url":"/assets/images/normal/favicons/android-icon-96x96.png","revision":"f9ad6bf999a5b586e92b62ac67238c7f"},{"url":"/assets/images/normal/favicons/android-icon-36x36.png","revision":"a81c221e98b551b8ef223f49a263fc55"},{"url":"/assets/images/normal/favicons/apple-icon-120x120.png","revision":"593f32dd9e5e00869d6787a93c1dafb0"},{"url":"/assets/images/normal/favicons/apple-icon-152x152.png","revision":"b787388e74afcf8c505cebaad58ed608"},{"url":"/assets/images/normal/favicons/apple-icon-144x144.png","revision":"91401f7a5fc4e7a3efa2481ddedc862e"},{"url":"/assets/images/normal/favicons/android-icon-72x72.png","revision":"f7c4ae5312cee2c149b5edb262b1d89f"},{"url":"/assets/images/normal/favicons/ms-icon-150x150.png","revision":"533cac6f9902c87221178d56d1108c2c"},{"url":"/assets/images/normal/favicons/apple-icon-114x114.png","revision":"023926244f31d038106b4765b08f5cef"},{"url":"/assets/images/normal/favicons/favicon.ico","revision":"b6c08b614b34477951dbe46ffeba5f63"},{"url":"/assets/images/normal/favicons/apple-icon-180x180.png","revision":"8879b1af3a2095779f215ffab3194ee9"},{"url":"/assets/images/normal/favicons/ms-icon-144x144.png","revision":"91401f7a5fc4e7a3efa2481ddedc862e"},{"url":"/assets/images/normal/favicons/android-icon-192x192.png","revision":"591bd3c16e887764281d6a89c9a17a1e"},{"url":"/assets/images/normal/favicons/favicon-16x16.png","revision":"e08b984750780e2ebd2500d9ab28a7dd"},{"url":"/assets/images/normal/favicons/apple-icon.png","revision":"591bd3c16e887764281d6a89c9a17a1e"},{"url":"/assets/images/normal/php_morris_grafik.png","revision":"0036ada04d7e6d32a51097f2524ce38f"},{"url":"/assets/images/normal/balance.png","revision":"2f671014d2215de63fffd7a949ab95bd"},{"url":"/assets/images/normal/telegram_bot_join_group.png","revision":"7fff7fca55e09b796fed43eab4f0b561"},{"url":"/assets/images/normal/laravel_7x_ide_helper.png","revision":"5f18fa2ed6ee3f1ad47c272ed00cc1da"},{"url":"/assets/images/normal/ortam_degiskenleri1.png","revision":"85ff7ae3fb24662a3e44ad8090b3fda6"},{"url":"/assets/images/normal/hosts.png","revision":"31f42d34f98abe59f420788360518631"},{"url":"/assets/images/normal/newsboat.png","revision":"32c34feddc5d6d83516a01a250c8a6d5"},{"url":"/assets/images/normal/php_phpstorm_csfixer3.png","revision":"1ce1c07e419abccf2580c4c91f29a269"},{"url":"/assets/images/normal/linux_samba.png","revision":"decc4b5f7ea06fb9bbe856c46a68e949"},{"url":"/assets/images/normal/linux_browser_discord.png","revision":"eeb328f01020ea80b6df6f3459a85e84"},{"url":"/assets/images/normal/pic-full-190916-0808-36.png","revision":"f0b1464db93678588295590be3eb2064"},{"url":"/assets/images/normal/spotify-3.png","revision":"349560f94c22e4a55e8a9b6e74521f17"},{"url":"/assets/images/normal/GutterColor.png","revision":"bd3ced9047c97328e66f91fb140278d7"},{"url":"/assets/images/normal/spotify-2.png","revision":"2ec3ea7053a765460afa9184574c52ef"},{"url":"/assets/images/normal/ntfs_yetki_hatasi.png","revision":"1630b8ab2c7210e53f682b6bfd89a41e"},{"url":"/assets/images/normal/ol_vbox_vagrant-min.png","revision":"0823f5fcd3c712cae8090dd709e906aa"},{"url":"/assets/images/normal/newsboaticerik.png","revision":"d9ae1a385e7f3f343fc4edb3ccdf3453"},{"url":"/assets/images/normal/Screenshot_2018-11-17_17-22-17.png","revision":"decc4b5f7ea06fb9bbe856c46a68e949"},{"url":"/assets/images/normal/ortam_degiskenleri2.png","revision":"bb5f2172252f702bfdc7008a89145b2b"},{"url":"/assets/images/normal/pic-selected-190916-0747-49.png","revision":"4bd8d61798760cd0db9f19e4b17899f4"},{"url":"/assets/images/phpstorm_terminal2.webp","revision":"69d2b682a7dd588782939b49053497b8"},{"url":"/assets/images/linux_windows10_uefi_format_error.webp","revision":"f5ff3a58b70fad13341111935d8c371d"},{"url":"/assets/images/ucretsiz-oyunlar.webp","revision":"005f931f9d9206be611c67d9e25dceed"},{"url":"/assets/images/neomutt_senkron.webp","revision":"8f681f7900ef402fec221442205c0ceb"},{"url":"/assets/images/php_phpstorm_csfixer4.webp","revision":"ea7aee45cd8e6dea57acb3aee01f3d85"},{"url":"/assets/images/comodo_firewall.webp","revision":"c3f85f0406c6c97fd64a0651fb3f3077"},{"url":"/assets/images/primeperformansi.webp","revision":"0cbdf79cc66aedd8a639a3a64cc25fff"},{"url":"/assets/images/php_phpstorm_csfixer2.webp","revision":"c47c408b36f73d57e75a9703e134d56d"},{"url":"/assets/images/linux_windows10_uefi_format.webp","revision":"90c27e3ad772e01c7ef1f741b4bea3a9"},{"url":"/assets/images/pic-selected-190916-0747-49.webp","revision":"c8ac8f83f45b5c4cc3bb59bdb2833eae"},{"url":"/assets/images/laravel-valet-link-archlinux.webp","revision":"43ec9b315696a1c911fecf47fe312769"},{"url":"/assets/images/pic-selected-190916-0818-54.webp","revision":"d78b86b22bf599707a0bfb0e699e1cb8"},{"url":"/assets/images/linux_browser.webp","revision":"3c130316892739cbf8d7299e966ad6ca"},{"url":"/assets/images/linux_windows10_uefi_boot.webp","revision":"c8f780e8089d75439b837341a7beb513"},{"url":"/assets/images/BracketHighlighter.webp","revision":"cec0ae5f33772a900394e647e0c9b3c6"},{"url":"/assets/images/composer.webp","revision":"12c2bea8b095cff4f1ba2d7aefe5f9ef"},{"url":"/assets/images/SublimeLinter.webp","revision":"66eae196394181507c1338583f49c9af"},{"url":"/assets/images/php_morris_grafik.webp","revision":"c6687ea048646416128d59d6503efc41"},{"url":"/assets/images/linux_browser_final.webp","revision":"5a87c3c27ad5ea81dc05e57f15b9048a"},{"url":"/assets/images/baba.test.webp","revision":"5dd7269b7f5b53267db76b7bf507cd73"},{"url":"/assets/images/laravel_7x_ide_helper.webp","revision":"81a6eeb2c777fd42753e2f07f62f3482"},{"url":"/assets/images/keyscrambler2.webp","revision":"48af89864677ff75bb6f563c5541c44c"},{"url":"/assets/images/bonus_mininig.webp","revision":"83499b23608b44a22f9c41557be5fbde"},{"url":"/assets/svg/icon-search.svg","revision":"205dedf4c9e67decaa7e62807a55e3c0"},{"url":"/assets/svg/icon-copy.svg","revision":"cf82ed85455c5b0576870c4e55d46d6c"},{"url":"/assets/svg/icon-spinner2.svg","revision":"907e8465ddfe1d9585e641f5b5830eb0"},{"url":"/assets/svg/icon-quotes-left.svg","revision":"e81186143c41fd173c48361a5c2d67dc"},{"url":"/assets/svg/icon-info.svg","revision":"94f562e9c02273c3be1ca9763bf2022e"},{"url":"/assets/svg/icon-pinterest2.svg","revision":"49f9dc7d7a146d523d26bfd1c100f74e"},{"url":"/assets/svg/icon-digg.svg","revision":"5843ec41f9788c6d77849028654876e7"},{"url":"/assets/svg/icon-blocked.svg","revision":"efbe061e8171f8fdcf490a2826514db7"},{"url":"/assets/svg/icon-eye.svg","revision":"2e905590fac40d30fedd77a66ebd1606"},{"url":"/assets/svg/icon-pencil.svg","revision":"6a5fa413e925157dc5a6b494de565237"},{"url":"/assets/svg/icon-whatsapp.svg","revision":"d08a9c518b43cdf932c9894370451606"},{"url":"/assets/svg/icon-logo.svg","revision":"8c4309f5fe21f04ecde4a592cd0d1ae2"},{"url":"/assets/svg/icon-cross.svg","revision":"0a2d0673e8f08f6273f25a7d361bcc35"},{"url":"/assets/svg/icon-arrow-up.svg","revision":"97df247c9ebc289ea5bfe5fefaf0b161"},{"url":"/assets/svg/icon-warning.svg","revision":"a74b91376920bf9c905c670d22e2c75a"},{"url":"/assets/svg/icon-droplet.svg","revision":"be72a36884fc22719771512c7fc71505"},{"url":"/assets/svg/icon-tumblr.svg","revision":"1adbdf1bfed9a2a42dbb9bfa119eb737"},{"url":"/assets/svg/icon-stumbleupon.svg","revision":"0f7c926d36f7542eddb5bddc51eb5721"},{"url":"/assets/svg/icon-facebook.svg","revision":"7c0dadf7b7b5c94bfc99634fa054510c"},{"url":"/assets/svg/icon-bug.svg","revision":"b1d967ed16acf9027331e790b5f2f6c5"},{"url":"/assets/svg/icon-circle-right.svg","revision":"04e22a956270ac57368f998e1f1911fe"},{"url":"/assets/svg/icon-diamonds.svg","revision":"a1475bb490d08faa50905ec30d57c72d"},{"url":"/assets/svg/icon-linkedin2.svg","revision":"f58c8a43eb3eea6c140fc68c42299995"},{"url":"/assets/svg/icon-price-tags.svg","revision":"ef1e8993ad0188ea8b75aac0ac83181a"},{"url":"/assets/svg/icon-bubble.svg","revision":"eb798399b4660f0e0f06164f337bd4f8"},{"url":"/assets/svg/icon-circle-down.svg","revision":"eac0996ae53f9523eb60be6edce8de00"},{"url":"/assets/svg/icon-telegram.svg","revision":"ea53f469b4623fb58f90e8f76924bef6"},{"url":"/assets/svg/icon-checkmark2.svg","revision":"8bcc16f8752e6d2d468403526746e967"},{"url":"/assets/svg/icon-clock.svg","revision":"93f8d2296178bcbc470bef43f276398e"},{"url":"/assets/svg/icon-vk.svg","revision":"9eda3a26463c09e0699e706bbbbcddb7"},{"url":"/assets/svg/icon-circle-left.svg","revision":"ac80186b8b6057cd1e22671537f4fbf2"},{"url":"/assets/svg/icon-binoculars.svg","revision":"0fb185404602357766b62ca4f297eacd"},{"url":"/assets/svg/icon-notification.svg","revision":"23c874bea321b295b3cb63bb7b64fc6c"},{"url":"/assets/svg/icon-reddit.svg","revision":"02ac775639c888cab85766bbb45434c2"},{"url":"/assets/svg/icon-twitter.svg","revision":"a765e3e3967432b51eaa7ed06e737939"},{"url":"/assets/svg/icon-calendar.svg","revision":"2b5c37dd95f62fb0b8774e089c448929"},{"url":"/assets/svg/icon-rss.svg","revision":"94dcf4da7179cc529090089a6c254fdf"},{"url":"/assets/svg/icon-tv.svg","revision":"9cecd88f233b4bcede7a818bf94bb73b"},{"url":"/assets/svg/icon-calculator.svg","revision":"cb3d9d544d1e682d2c44524a3fc9cfdd"},{"url":"/assets/svg/icon-question.svg","revision":"bfec788ad0bd8de0eaeebb12447f12bb"},{"url":"/assets/svg/icon-folder.svg","revision":"6c4b3a8e183331b57c310293b1e0b000"},{"url":"/assets/svg/icon-algolia.svg","revision":"d069a34f034bbfe2f3a0f90f0371f302"},{"url":"/pdo-sum-fonksiyonu-kullanmmorrisjs/index.html","revision":"67e7aecdf985fad6be03ce2e699e4377"},{"url":"/guncel-ucretsiz-steam-gog-epic-oyunlari/index.html","revision":"cd19a236dd781bf3c757015a77c4ee74"},{"url":"/facebook-otomatik-arkadas-ekleme-sureli/index.html","revision":"d16f431a6d709db46c2cdd8b4a588f83"},{"url":"/index.html","revision":"c5c5c6a39687b1c3f5cbd1f0fdc6f531"},{"url":"/about/index.html","revision":"e1ce68d2a4ff34d81c4dae8cacb03503"},{"url":"/windows-uzerinde-redshift-kullanm/index.html","revision":"ef68db1e07186876b4d7f66d9df004ed"},{"url":"/spotifydan-muzik-nasl-indirilir-resimli/index.html","revision":"bada221ef81ca6941af3f77f7471c5fc"},{"url":"/phpstorm-icerisinde-phpcsfixer/index.html","revision":"3dcdc4aeb4831db0a1b09e6a26d7ca69"},{"url":"/zsh-icerisine-shopt-kullanmak/index.html","revision":"743556bac25923baf6cc7cac1b48a7f5"},{"url":"/linux-httrack-kullanm/index.html","revision":"d3ac3582bb20ae01453aae8e66c6e98c"},{"url":"/phpstorm-icerisinde-cmder-kullanmak/index.html","revision":"d59785957241a853213566f834a1ec92"},{"url":"/tags/vagrant/index.html","revision":"873cef03f3b6745bf28b65e8a6d455cb"},{"url":"/tags/ssh/index.html","revision":"6e1e6af5714044b314f69aff47c083ea"},{"url":"/tags/unixporn/index.html","revision":"2aeda206133c7e2e2b68814a331f9a64"},{"url":"/tags/index.html","revision":"f09bce3ee5178824cf1bf404bd9437d5"},{"url":"/tags/yazılım/index.html","revision":"9b97c6c9c4bb0890c48518fed89362fa"},{"url":"/tags/cmder/index.html","revision":"532e991d8a2b1bfd7e827478cd248793"},{"url":"/tags/composer/index.html","revision":"7f7640eeba5b110df9789b377fea73cc"},{"url":"/tags/mp3/index.html","revision":"56f03c2de59926e11c5d926af9f2674e"},{"url":"/tags/linux/index.html","revision":"3cffcb9e46ae2a2f9d6b25d4de210e78"},{"url":"/tags/windows10/index.html","revision":"8250b0fac98c0fa5ef8a21e840439525"},{"url":"/tags/steam/index.html","revision":"a033b02307f6c7408b7fe2835cb2599b"},{"url":"/tags/newsboat/index.html","revision":"dbc6d99e14c4021e2027a06f337ac922"},{"url":"/tags/laravel/index.html","revision":"108a5f4863d170548e761a78c7133488"},{"url":"/tags/codeigniter/index.html","revision":"89c500bf545a12e91533e0ad0e3c2503"},{"url":"/tags/phpstorm/index.html","revision":"d3834c70eeb61caa7aab9abd040c91a6"},{"url":"/tags/zsh/index.html","revision":"bbff6ca71f1f5ab44684594c7696f7f0"},{"url":"/tags/facebook/index.html","revision":"ce7d550341313e49ec511192bdaf044d"},{"url":"/tags/apache/index.html","revision":"024dd460a1abf12a35997a79a35c2636"},{"url":"/tags/sublime/index.html","revision":"044b8c0a4b686ca1d225956322bf0e34"},{"url":"/tags/pdo/index.html","revision":"848509e70402adb9bc3ab6c3656c1c3a"},{"url":"/tags/imap/index.html","revision":"32a38796dd805301d36736d0759e29ca"},{"url":"/tags/ipucu/index.html","revision":"f6ad17b1efdc5bf853ea121b0649062d"},{"url":"/tags/nvidia/index.html","revision":"4ff72fcd811efc5616d530c4f377e9ef"},{"url":"/tags/php/index.html","revision":"f03840d7c5d618564fb52dd18ccd8369"},{"url":"/tags/vlc/index.html","revision":"1ab570e07edb7787d7e21755f4f78ccf"},{"url":"/tags/httrack/index.html","revision":"f5baf12df40e6fef55257d2054dc69e3"},{"url":"/tags/program/index.html","revision":"095823e07c8c1c9a961e5c636108dd32"},{"url":"/tags/github/index.html","revision":"70d37311bf7b2b9f0654fcf49f16ec7b"},{"url":"/tags/discord/index.html","revision":"b9c949fb8494102e3c16b545e8085648"},{"url":"/tags/internetten-para-kazanma/index.html","revision":"84abd0cc1692ef4b28084fff4a36f03b"},{"url":"/tags/spotify/index.html","revision":"c7d8228010d1faf356d22b61d780cd0a"},{"url":"/tags/e-mail/index.html","revision":"32ba9a0f2813c00fc122e633a823cbf0"},{"url":"/tags/site/index.html","revision":"56abe5d9b193c87cf20ce2405582d25b"},{"url":"/tags/terminal/index.html","revision":"8c89a5d0582a11318e16a41563054cdb"},{"url":"/tags/belgesel/index.html","revision":"3c2c1a11313b1cdea704ac82dfec5bff"},{"url":"/tags/ntfs/index.html","revision":"9cc893957fbc98d4565ddd4fe39305cd"},{"url":"/tags/laptop/index.html","revision":"a1639748b9a1b1fcbf0df604973f1f67"},{"url":"/tags/earn/index.html","revision":"4710d4ab6435855a6dd6bce8fab9cd8b"},{"url":"/tags/film/index.html","revision":"dbdde49e699afc3a536061dd56efb494"},{"url":"/tags/tanıtım/index.html","revision":"bd79ef7d8afec40c8393cea97fc04937"},{"url":"/tags/obs/index.html","revision":"a4162a0a90d37e5de1e8b2d1e5762253"},{"url":"/tags/sweetalert/index.html","revision":"6c114dfd97875c2c7de94888d467b74d"},{"url":"/kullandgm-enfes-sublime-text-eklentileri/index.html","revision":"15fff1675de7e73bbd68dc0de2c31b0e"},{"url":"/virtualbox-vagrant-laravel-arch-linux/index.html","revision":"ab9b0965ff798d1b47ea7b3ec7f4680c"},{"url":"/imap-openssl-terminalde-kullanim/index.html","revision":"46d3bb9509b598ee663f61bd299d84a0"},{"url":"/linuxta-uefi-windows-10-format-usb/index.html","revision":"079992e9ac44963557493c2f97878d6b"},{"url":"/terminatorgitcurlfish-yukleme/index.html","revision":"e9bf93d956738a285b37c47163b0f9d5"},{"url":"/vlsub-ile-altyaz-aramaya-son-resimli/index.html","revision":"476c28edd18b94a86c6ef70d186c409f"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/index.html","revision":"1478a8a70b65bbf0ad45caf025f505ad"},{"url":"/oh-my-zsh-kurulumu-tema-ve-eklentiler/index.html","revision":"71fc37abbf0d7c8dc8439c2ad9448a5e"},{"url":"/facebook-toplu-arkadas-eklemegruba/index.html","revision":"cdfeafa5d6f5fc4e816ae4f3510f9f63"},{"url":"/internetten-para-kazanma-guncel-yatirimsiz/index.html","revision":"551e5d20501889454d3601e7513c1998"},{"url":"/:title/index.html","revision":"565bfa514d0f521f79e0725ccd9ce3c5"},{"url":"/tavsiye-ettigim-programlar-ve-uygulamalar/index.html","revision":"a80a7d15e381ec101cd0e7a42700456d"},{"url":"/windows-uzerinden-paylaslan-dosya-ve/index.html","revision":"848641b079ae94a2000fa3d6bb915aad"},{"url":"/archlinux-valet-kurulumu/index.html","revision":"9182127921f016f7502bb4d00ed9cf5d"},{"url":"/earncom-nedir-nasl-kullanlr/index.html","revision":"69ba54d8b4619debaff1f35650f01f47"},{"url":"/vagrant-virtualbox-61-ile-uyumlu-hale/index.html","revision":"8b88890c783db755da3a98d6838f5997"},{"url":"/404.html","revision":"e67b47948f4045f71da702fef0b109a5"},{"url":"/xampp-kullanarak-localhosta-ozel-alan/index.html","revision":"1f9ebd7e6ef595c15c44ba9dd96d75d1"},{"url":"/composer-yavas-indirme-sorunu-cozumu/index.html","revision":"947b1e34ddbc327f908a0d311dd93e4b"},{"url":"/yeni-baslayanlar-hangi-linux-surumunu/index.html","revision":"6d6571b1d391fa1cfef2cf7bd0de5623"},{"url":"/linux-ozellestirebilir-mp3-oynatcs/index.html","revision":"2a8eb1a4a63f50e30456298f3f2d086a"},{"url":"/linux-uzerinde-apache2-mysql-phpmyadmin/index.html","revision":"d697922c083a4a2ead155f72b4b803c7"},{"url":"/git-ssh-key-olusturma-windows/index.html","revision":"b19b986395dcb6f1ba49650a44028bd2"},{"url":"/sweet-alert-snf-kullanm-detayl-anlatm/index.html","revision":"ae1c857b7316e16e65158ace09949ae1"},{"url":"/her-turk-gencinin-izlemesi-gereken/index.html","revision":"655244a6364c3e4a43fa149145e18197"},{"url":"/linux-codeigniter-son-surum-nasl/index.html","revision":"a58a536fb376b4462643038e365b8e2c"},{"url":"/laravel-ide-helper-kullanimi/index.html","revision":"f0c1e34cb005a910ec1d37f3ba335c80"},{"url":"/facebook-toplu-grup-2021/index.html","revision":"f5eb827424724d9762bb009ab190653f"},{"url":"/categories/index.html","revision":"22141285d1f30e6305d111828ee884f0"},{"url":"/categories/linux/index.html","revision":"6c9d5e2b014f581c1b20a538fbc7da72"},{"url":"/categories/editor/index.html","revision":"69b82fd0d1e9576f4fc085379a7f5037"},{"url":"/categories/tavsiye/index.html","revision":"a8aa9ff2d33fd8d3d32b8075dbc02d51"},{"url":"/categories/facebook/index.html","revision":"3030434550a93b7a7fa51ea7c341082f"},{"url":"/categories/program/index.html","revision":"d652f3562875ea63d6358c41161ced2b"},{"url":"/categories/kutuphane/index.html","revision":"122cdab82cbb6f9f1fe88fe66ca697e6"},{"url":"/categories/site/index.html","revision":"1ce37ae4843cefbec26c96617ff1d304"},{"url":"/categories/para-kazanma/index.html","revision":"d571c203e551a5c0bf23ce71382c7f69"},{"url":"/categories/tanıtım/index.html","revision":"1e04867aad96ce38b5baf785afe1aeba"},{"url":"/linux-tema-nasl-yuklenir-gnome-shell-ve/index.html","revision":"ca0f07ed06654cccbde0bd7fc23a546d"},{"url":"/modern-mutt-kurulumu/index.html","revision":"6208bc84d837df1f66e52b1b82e34ac9"},{"url":"/archlinux-ntfs-nasil-yapilandirilir/index.html","revision":"f6776e0a1a26031734d9e573b039dd6e"},{"url":"/offline.html","revision":"c3e9fdd7ade10dac363bb4ee287f2112"},{"url":"/linux-ekran-karti-kurulumu/index.html","revision":"30d70aa4d48be65ecf60f66a25ad79b7"},{"url":"/obs-linux-browser-eklentisi-kurulumu/index.html","revision":"b3c9a57e0dd07b0d5e9d6e50ef178b2e"},{"url":"/onemli-gelismeler/index.html","revision":"ca2df7499553468427893b9df0f219f4"},{"url":"/newsboat-kullanimi/index.html","revision":"39926c39b426c568539bbc6bfdd9d205"},{"url":"/arch-linux-apachelampp-sanal-sunucu/index.html","revision":"051b20ca0d164f05c694ff5e87aaa09a"},{"url":"/arch-linux-lampp-kurulumuphp7xmariadbmy/index.html","revision":"61bd623404696ab269fde84fc77fc45a"},{"url":"/elektronik-sigara-zararlimi-faydalimi/index.html","revision":"3dc0353528f3d1034ca696b1a43ea7b9"},{"url":"/onemli-gelismeler/","revision":"48d5aa5d209346a3aae61c2d2cb7c815"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/","revision":"b805b3fd46e6c1322e7fa0cc2b0a3c5c"},{"url":"/facebook-toplu-grup-2021/","revision":"695ac341bdd7ed043e7f3fd1896ddbc3"},{"url":"/elektronik-sigara-zararlimi-faydalimi/","revision":"bea123d9a23f438829240e5fbdbf8c29"},{"url":"/newsboat-kullanimi/","revision":"4fe49aaf17b567b5fd3b5825f912f67e"},{"url":"/archlinux-ntfs-nasil-yapilandirilir/","revision":"6002f290b6d0319dea86da7721bc1f88"},{"url":"/laravel-ide-helper-kullanimi/","revision":"2ca9df1bc86e2787bfa1f69392a53587"},{"url":"/internetten-para-kazanma-guncel-yatirimsiz/","revision":"8b1d37287fc68226f22867b7287d45a5"}];

/* ===========================================================
 * sw.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * service worker scripting
 * ========================================================== */

// CACHE_NAMESPACE
// CacheStorage is shared between all sites under same domain.
// A namespace can prevent potential name conflicts and mis-deletion.
const CACHE_NAMESPACE = "main-";

const CACHE = CACHE_NAMESPACE + "precache-then-runtime";
const PRECACHE_LIST = [
  "./",
  "./offline.html",
  "./assets/js/theme.js",
  "./assets/js/snackbar.js",
  "./assets/css/style.min.css",
  "//cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css",
  "//cdn.jsdelivr.net/npm/smooth-scroll@16.1.3/dist/smooth-scroll.min.js",
  "//cdn.jsdelivr.net/npm/autocomplete.js@0.38.0/dist/autocomplete.min.js",
  "//cdn.jsdelivr.net/npm/lunr@2.3.9/lunr.min.js",
  "//cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js",
  "//cdn.jsdelivr.net/npm/clipboard@2.0.8/dist/clipboard.min.js",
  "//cdn.jsdelivr.net/npm/sharer.js@0.4.2/sharer.min.js",
];
const HOSTNAME_WHITELIST = [
  self.location.hostname,
  "yuceltoluyag.github.io",
  "cdn.jsdelivr.net",
  "www.googletagmanager.com",
  "www.google-analytics.com",
  "fonts.gstatic.com",
  "fonts.googleapis.com",
  "polyfill.io",
];
const DEPRECATED_CACHES = [
  "precache-v1",
  "runtime",
  "main-precache-v1",
  "main-runtime",
];

// The Util Function to hack URLs of intercepted requests
const getCacheBustingUrl = (req) => {
  var now = Date.now();
  url = new URL(req.url);

  // 1. fixed http URL
  // Just keep syncing with location.protocol
  // fetch(httpURL) belongs to active mixed content.
  // And fetch(httpRequest) is not supported yet.
  url.protocol = self.location.protocol;

  // 2. add query for caching-busting.
  // Github Pages served with Cache-Control: max-age=600
  // max-age on mutable content is error-prone, with SW life of bugs can even extend.
  // Until cache mode of Fetch API landed, we have to workaround cache-busting with query string.
  // Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
  url.search += (url.search ? "&" : "?") + "cache-bust=" + now;
  return url.href;
};

// The Util Function to detect and polyfill req.mode="navigate"
// request.mode of 'navigate' is unfortunately not supported in Chrome
// versions older than 49, so we need to include a less precise fallback,
// which checks for a GET request with an Accept: text/html header.
const isNavigationReq = (req) =>
  req.mode === "navigate" ||
  (req.method === "GET" && req.headers.get("accept").includes("text/html"));

// The Util Function to detect if a req is end with extension
// Accordin to Fetch API spec <https://fetch.spec.whatwg.org/#concept-request-destination>
// Any HTML's navigation has consistently mode="navigate" type="" and destination="document"
// including requesting an img (or any static resources) from URL Bar directly.
// So It ends up with that regExp is still the king of URL routing ;)
// P.S. An url.pathname has no '.' can not indicate it ends with extension (e.g. /api/version/1.2/)
const endWithExtension = (req) =>
  Boolean(new URL(req.url).pathname.match(/\.\w+$/));

// Redirect in SW manually fixed github pages arbitray 404s on things?blah
// what we want:
//    repo?blah -> !(gh 404) -> sw 302 -> repo/?blah
//    .ext?blah -> !(sw 302 -> .ext/?blah -> gh 404) -> .ext?blah
// If It's a navigation req and it's url.pathname isn't end with '/' or '.ext'
// it should be a dir/repo request and need to be fixed (a.k.a be redirected)
// Tracking https://twitter.com/Huxpro/status/798816417097224193
const shouldRedirect = (req) =>
  isNavigationReq(req) &&
  new URL(req.url).pathname.substr(-1) !== "/" &&
  !endWithExtension(req);

// The Util Function to get redirect URL
// `${url}/` would mis-add "/" in the end of query, so we use URL object.
// P.P.S. Always trust url.pathname instead of the whole url string.
const getRedirectUrl = (req) => {
  url = new URL(req.url);
  url.pathname += "/";
  return url.href;
};

/**
 *  @Lifecycle Install
 *  Precache anything static to this version of your app.
 *  e.g. App Shell, 404, JS/CSS dependencies...
 *
 *  waitUntil() : installing ====> installed
 *  skipWaiting() : waiting(installed) ====> activating
 */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache
        .addAll(PRECACHE_LIST)
        .then(self.skipWaiting())
        .catch((err) => console.log(err));
    })
  );
});

/**
 *  @Lifecycle Activate
 *  New one activated when old isnt being used.
 *
 *  waitUntil(): activating ====> activated
 */
self.addEventListener("activate", (event) => {
  // delete old deprecated caches.
  caches
    .keys()
    .then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => DEPRECATED_CACHES.includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      )
    );
  console.log("SW Etkinleştirildi.");
  event.waitUntil(self.clients.claim());
});

var fetchHelper = {
  fetchThenCache: function (request) {
    // Requests with mode "no-cors" can result in Opaque Response,
    // Requests to Allow-Control-Cross-Origin: * can't include credentials.
    const init = { mode: "cors", credentials: "omit" };

    const fetched = fetch(request, init);
    const fetchedCopy = fetched.then((resp) => resp.clone());

    // NOTE: Opaque Responses have no hedaders so [[ok]] make no sense to them
    //       so Opaque Resp will not be cached in this case.
    Promise.all([fetchedCopy, caches.open(CACHE)])
      .then(([response, cache]) => response.ok && cache.put(request, response))
      .catch((_) => {
        /* eat any errors */
      });

    return fetched;
  },

  cacheFirst: function (url) {
    return caches
      .match(url)
      .then((resp) => resp || this.fetchThenCache(url))
      .catch((_) => {
        /* eat any errors */
      });
  },
};

/**
 *  @Functional Fetch
 *  All network requests are being intercepted here.
 *
 *  void respondWith(Promise<Response> r);
 */
self.addEventListener("fetch", (event) => {
  // logs for debugging
  //console.log(`fetch ${event.request.url}`)
  //console.log(` - type: ${event.request.type}; destination: ${event.request.destination}`)
  //console.log(` - mode: ${event.request.mode}, accept: ${event.request.headers.get('accept')}`)

  // Skip some of cross-origin requests, like those for Google Analytics.
  if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
    // Redirect in SW manually fixed github pages 404s on repo?blah
    if (shouldRedirect(event.request)) {
      event.respondWith(Response.redirect(getRedirectUrl(event.request)));
      return;
    }

    // Cache-only Startgies for ys.static resources
    if (event.request.url.indexOf("ys.static") > -1) {
      event.respondWith(fetchHelper.cacheFirst(event.request.url));
      return;
    }

    // Stale-while-revalidate for possiblily dynamic content
    // similar to HTTP's stale-while-revalidate: https://www.mnot.net/blog/2007/12/12/stale
    // Upgrade from Jake's to Surma's: https://gist.github.com/surma/eb441223daaedf880801ad80006389f1
    const cached = caches.match(event.request);
    const fetched = fetch(getCacheBustingUrl(event.request), {
      cache: "no-store",
    });
    const fetchedCopy = fetched.then((resp) => resp.clone());

    // Call respondWith() with whatever we get first.
    // Promise.race() resolves with first one settled (even rejected)
    // If the fetch fails (e.g disconnected), wait for the cache.
    // If there’s nothing in cache, wait for the fetch.
    // If neither yields a response, return offline pages.
    event.respondWith(
      Promise.race([fetched.catch((_) => cached), cached])
        .then((resp) => resp || fetched)
        .catch((_) => caches.match("offline.html"))
    );

    // Update the cache with the version we fetched (only for ok status)
    event.waitUntil(
      Promise.all([fetchedCopy, caches.open(CACHE)])
        .then(
          ([response, cache]) =>
            response.ok && cache.put(event.request, response)
        )
        .catch((_) => {
          /* eat any errors */
        })
    );

    // If one request is a HTML naviagtion, checking update!
    if (isNavigationReq(event.request)) {
      // you need "preserve logs" to see this log
      // cuz it happened before navigating
      console.log(`fetch ${event.request.url}`);
      event.waitUntil(revalidateContent(cached, fetchedCopy));
    }
  }
});

/**
 * Broadcasting all clients with MessageChannel API
 */
function sendMessageToAllClients(msg) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      console.log(client);
      client.postMessage(msg);
    });
  });
}

/**
 * Broadcasting all clients async
 */
function sendMessageToClientsAsync(msg) {
  // waiting for new client alive with "async" setTimeout hacking
  // https://twitter.com/Huxpro/status/799265578443751424
  // https://jakearchibald.com/2016/service-worker-meeting-notes/#fetch-event-clients
  setTimeout(() => {
    sendMessageToAllClients(msg);
  }, 1000);
}

/**
 * if content modified, we can notify clients to refresh
 * TODO: Gh-pages rebuild everything in each release. should find a workaround (e.g. ETag with cloudflare)
 *
 * @param  {Promise<response>} cachedResp  [description]
 * @param  {Promise<response>} fetchedResp [description]
 * @return {Promise}
 */
function revalidateContent(cachedResp, fetchedResp) {
  // revalidate when both promise resolved
  return Promise.all([cachedResp, fetchedResp])
    .then(([cached, fetched]) => {
      const cachedVer = cached.headers.get("last-modified");
      const fetchedVer = fetched.headers.get("last-modified");
      console.log(`"${cachedVer}" vs. "${fetchedVer}"`);
      if (cachedVer !== fetchedVer) {
        sendMessageToClientsAsync({
          command: "UPDATE_FOUND",
          url: fetched.url,
        });
      }
    })
    .catch((err) => console.log(err));
}

