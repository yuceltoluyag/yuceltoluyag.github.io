importScripts("/assets/js/workbox-v5.1.4/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v5.1.4"});

self.__precacheManifest = [{"url":"/lighthouserc.json","revision":"c098b22f3567d468beab551436f2c8f6"},{"url":"/sw-register.js","revision":"de59f359c9020b613ab75b2a8511baca"},{"url":"/index.json","revision":"19a72a2ac049873fe903727e5383ad55"},{"url":"/gulpfile.js","revision":"71e37b94f92bf07bee317a6d759bbba9"},{"url":"/assets/css/style.min.css","revision":"dabd4a21bee7f7227ae9693e0f6a1847"},{"url":"/assets/js/main.js","revision":"0be05bbf8a81c0f40051105be6fc15c6"},{"url":"/assets/js/pvreport.js","revision":"eb026bbf3847d03e2d58195a59bb8f41"},{"url":"/assets/js/theme.js","revision":"5fa8989e6be141b92cbea792042240ae"},{"url":"/assets/js/sw-registration.js","revision":"619d9755236fef7eae9969e4a06708c7"},{"url":"/assets/js/snackbar.js","revision":"2ffd93e5a7883f46e008c194606c1504"},{"url":"/manifest.json","revision":"221984d6e1aadbc4c76cf14e080efc6a"},{"url":"/favicon.ico","revision":"21620055c8f33fd16aaf550f58d4c67c"},{"url":"/assets/svg/icon-circle-left.svg","revision":"ac80186b8b6057cd1e22671537f4fbf2"},{"url":"/assets/svg/icon-eye.svg","revision":"2e905590fac40d30fedd77a66ebd1606"},{"url":"/assets/svg/icon-clock.svg","revision":"93f8d2296178bcbc470bef43f276398e"},{"url":"/assets/svg/icon-copy.svg","revision":"cf82ed85455c5b0576870c4e55d46d6c"},{"url":"/assets/svg/icon-info.svg","revision":"94f562e9c02273c3be1ca9763bf2022e"},{"url":"/assets/svg/icon-circle-down.svg","revision":"eac0996ae53f9523eb60be6edce8de00"},{"url":"/assets/svg/icon-circle-right.svg","revision":"04e22a956270ac57368f998e1f1911fe"},{"url":"/assets/svg/icon-tumblr.svg","revision":"1adbdf1bfed9a2a42dbb9bfa119eb737"},{"url":"/assets/svg/icon-reddit.svg","revision":"02ac775639c888cab85766bbb45434c2"},{"url":"/assets/svg/icon-stumbleupon.svg","revision":"0f7c926d36f7542eddb5bddc51eb5721"},{"url":"/assets/svg/icon-tv.svg","revision":"9cecd88f233b4bcede7a818bf94bb73b"},{"url":"/assets/svg/icon-digg.svg","revision":"5843ec41f9788c6d77849028654876e7"},{"url":"/assets/svg/icon-facebook.svg","revision":"7c0dadf7b7b5c94bfc99634fa054510c"},{"url":"/assets/svg/icon-search.svg","revision":"205dedf4c9e67decaa7e62807a55e3c0"},{"url":"/assets/svg/icon-whatsapp.svg","revision":"d08a9c518b43cdf932c9894370451606"},{"url":"/assets/svg/icon-bubble.svg","revision":"eb798399b4660f0e0f06164f337bd4f8"},{"url":"/assets/svg/icon-linkedin2.svg","revision":"f58c8a43eb3eea6c140fc68c42299995"},{"url":"/assets/svg/icon-rss.svg","revision":"94dcf4da7179cc529090089a6c254fdf"},{"url":"/assets/svg/icon-quotes-left.svg","revision":"e81186143c41fd173c48361a5c2d67dc"},{"url":"/assets/svg/icon-calendar.svg","revision":"2b5c37dd95f62fb0b8774e089c448929"},{"url":"/assets/svg/icon-droplet.svg","revision":"be72a36884fc22719771512c7fc71505"},{"url":"/assets/svg/icon-algolia.svg","revision":"d069a34f034bbfe2f3a0f90f0371f302"},{"url":"/assets/svg/icon-vk.svg","revision":"9eda3a26463c09e0699e706bbbbcddb7"},{"url":"/assets/svg/icon-pencil.svg","revision":"6a5fa413e925157dc5a6b494de565237"},{"url":"/assets/svg/icon-checkmark2.svg","revision":"8bcc16f8752e6d2d468403526746e967"},{"url":"/assets/svg/icon-folder.svg","revision":"6c4b3a8e183331b57c310293b1e0b000"},{"url":"/assets/svg/icon-logo.svg","revision":"8c4309f5fe21f04ecde4a592cd0d1ae2"},{"url":"/assets/svg/icon-pinterest2.svg","revision":"49f9dc7d7a146d523d26bfd1c100f74e"},{"url":"/assets/svg/icon-telegram.svg","revision":"ea53f469b4623fb58f90e8f76924bef6"},{"url":"/assets/svg/icon-spinner2.svg","revision":"907e8465ddfe1d9585e641f5b5830eb0"},{"url":"/assets/svg/icon-warning.svg","revision":"a74b91376920bf9c905c670d22e2c75a"},{"url":"/assets/svg/icon-blocked.svg","revision":"efbe061e8171f8fdcf490a2826514db7"},{"url":"/assets/svg/icon-cross.svg","revision":"0a2d0673e8f08f6273f25a7d361bcc35"},{"url":"/assets/svg/icon-notification.svg","revision":"23c874bea321b295b3cb63bb7b64fc6c"},{"url":"/assets/svg/icon-calculator.svg","revision":"cb3d9d544d1e682d2c44524a3fc9cfdd"},{"url":"/assets/svg/icon-arrow-up.svg","revision":"97df247c9ebc289ea5bfe5fefaf0b161"},{"url":"/assets/svg/icon-price-tags.svg","revision":"ef1e8993ad0188ea8b75aac0ac83181a"},{"url":"/assets/svg/icon-question.svg","revision":"bfec788ad0bd8de0eaeebb12447f12bb"},{"url":"/assets/svg/icon-twitter.svg","revision":"a765e3e3967432b51eaa7ed06e737939"},{"url":"/assets/svg/icon-diamonds.svg","revision":"a1475bb490d08faa50905ec30d57c72d"},{"url":"/assets/svg/icon-binoculars.svg","revision":"0fb185404602357766b62ca4f297eacd"},{"url":"/assets/svg/icon-bug.svg","revision":"b1d967ed16acf9027331e790b5f2f6c5"},{"url":"/assets/images/facebookgrupistatistik.webp","revision":"04b368be907e478ae7b16d0f86d04016"},{"url":"/assets/images/newsboaticerik.webp","revision":"0585e46b40bd07c422958e6ec22252f7"},{"url":"/assets/images/staticman4.webp","revision":"b810d88b50cb49e3c84b0acce3988d44"},{"url":"/assets/images/linux_browser_obs.webp","revision":"3b19f483fdbfb38e2d47a6ae939f0158"},{"url":"/assets/images/ucretsiz-oyunlar.webp","revision":"005f931f9d9206be611c67d9e25dceed"},{"url":"/assets/images/keyscrambler2.webp","revision":"48af89864677ff75bb6f563c5541c44c"},{"url":"/assets/images/amazon-openvpn-kurulumu-9.webp","revision":"4423526d5027abf6d596a77ff51c8902"},{"url":"/assets/images/linux_windows10_uefi_boot_2.webp","revision":"7bfa4607f62f3b3d77422d6d9c26bd93"},{"url":"/assets/images/GitHubinator.webp","revision":"d7ed7edba13e6b3f2c4313bd163f730d"},{"url":"/assets/images/linux_samba.webp","revision":"bdd637d780a59a08111526f66b03afca"},{"url":"/assets/images/hosts.webp","revision":"e8f6539fd5d282095a7051aec65cfecc"},{"url":"/assets/images/superproxy11.webp","revision":"67c1d141896e2817fac72910a87afb72"},{"url":"/assets/images/spotify.webp","revision":"533d458a387a7bb08211021ba9c6aff4"},{"url":"/assets/images/favicons/apple-icon-152x152.webp","revision":"db5f59bf4bce4e2044c04943bd4316ed"},{"url":"/assets/images/favicons/android-icon-192x192.webp","revision":"047d328052c38dd934611f18701e63e9"},{"url":"/assets/images/favicons/android-icon-144x144.webp","revision":"d5fe8c6d1fa536b66cc19d505ce94089"},{"url":"/assets/images/favicons/android-icon-72x72.webp","revision":"0cb59b7bfeb5e920ac10dcd623cf18a5"},{"url":"/assets/images/favicons/apple-icon-60x60.webp","revision":"ace2824938b657b75efe950673535101"},{"url":"/assets/images/favicons/apple-icon-144x144.webp","revision":"d5fe8c6d1fa536b66cc19d505ce94089"},{"url":"/assets/images/favicons/favicon-32x32.webp","revision":"82b352d72ecee52e37fbd243f7ce1264"},{"url":"/assets/images/favicons/ms-icon-70x70.webp","revision":"ba9fc26d4009d1da86a349caaec04558"},{"url":"/assets/images/favicons/ms-icon-144x144.webp","revision":"d5fe8c6d1fa536b66cc19d505ce94089"},{"url":"/assets/images/favicons/ms-icon-310x310.webp","revision":"81cbaf57caa71d3c7236520beac4f4c8"},{"url":"/assets/images/favicons/apple-icon-57x57.webp","revision":"3bad444d64cd5fa510598985c4692676"},{"url":"/assets/images/favicons/android-icon-96x96.webp","revision":"743e7a7ab90340c270bff09d9f1a2bfa"},{"url":"/assets/images/favicons/apple-icon-76x76.webp","revision":"a219578d705ca8f97db1d4bb7533a7e6"},{"url":"/assets/images/favicons/android-icon-48x48.webp","revision":"ed519840f80e381aa05c882fba99fde5"},{"url":"/assets/images/favicons/apple-icon.webp","revision":"53f83abd6d9fccd07986c950ee84a025"},{"url":"/assets/images/favicons/favicon-16x16.webp","revision":"c51493e4ee2a07bf39509cc2da14a8b5"},{"url":"/assets/images/favicons/ms-icon-150x150.webp","revision":"9d1d0b0f078e3ffe4b6bc6da931bc5f1"},{"url":"/assets/images/favicons/favicon-96x96.webp","revision":"321b86ac1417aa60b94692824fb6c54a"},{"url":"/assets/images/favicons/apple-icon-120x120.webp","revision":"75476257d256743998d969244ccba5ca"},{"url":"/assets/images/favicons/apple-icon-180x180.webp","revision":"7beb00f49c7c46895fe78bbe0770358e"},{"url":"/assets/images/favicons/apple-icon-precomposed.webp","revision":"53f83abd6d9fccd07986c950ee84a025"},{"url":"/assets/images/favicons/favicon.ico","revision":"21620055c8f33fd16aaf550f58d4c67c"},{"url":"/assets/images/favicons/apple-icon-114x114.webp","revision":"1a1139db5de1f10e94d71a623c814598"},{"url":"/assets/images/favicons/android-icon-36x36.webp","revision":"20a3792604ff5ab818938c65343b218e"},{"url":"/assets/images/favicons/apple-icon-72x72.webp","revision":"1b42525c51202d7b6edfde72a41cf869"},{"url":"/assets/images/amazon-openvpn-kurulumu-11.webp","revision":"d06c42761d3b49d11197a80e782fd243"},{"url":"/assets/images/php_phpstorm_csfixer5.webp","revision":"d0903de50ff662c9da6291f1769acab4"},{"url":"/assets/images/Extended- test.webp","revision":"39a1866b507035c9f11208f929086283"},{"url":"/assets/images/imap_openssl_terminal.webp","revision":"6ec2b0292b301abf65b823e73d2f053a"},{"url":"/assets/images/sweetalert.webp","revision":"17b5b77435313d55d8d1f2a5a66b33bf"},{"url":"/assets/images/phpstorm_terminal.webp","revision":"b5cf0e965aac44dd1bc3963600461850"},{"url":"/assets/images/airdrop_flx_coin.webp","revision":"ae443ee498d1c293a148a43a9764af4f"},{"url":"/assets/images/AFileIcon.webp","revision":"af099aba60a19ac48e4455fb1bd32e29"},{"url":"/assets/images/spotify-3.webp","revision":"e3a2a0e815b383f8ece3b39567fdd38d"},{"url":"/assets/images/esigara-yararlimi-zararlimi.webp","revision":"431c21e58d8555b42d58263dc1bfa648"},{"url":"/assets/images/configure_lampp.webp","revision":"508221fc95869bd6398b5009756e0fd6"},{"url":"/assets/images/comodo_firewall.webp","revision":"c3f85f0406c6c97fd64a0651fb3f3077"},{"url":"/assets/images/spotify-5.webp","revision":"bb480984ccf04341f13b1f23d701fff3"},{"url":"/assets/images/amazon-openvpn-kurulumu-14.webp","revision":"22c80e4ee1f0897e5b7df7bb5b279f1c"},{"url":"/assets/images/exen.webp","revision":"b903f7d8bb697c9b35fc84753d76f821"},{"url":"/assets/images/pic-full-190916-0808-36.webp","revision":"af537a30223613d1e96c13249bcd41b5"},{"url":"/assets/images/superproxy4.webp","revision":"edd078f54fcf829a8a8802c782def127"},{"url":"/assets/images/nvidia-grafik-ayari-maximum-performans.webp","revision":"fcccdb36b654182c799e49bbf1318210"},{"url":"/assets/images/staticman7.webp","revision":"029a9d8d949e2948ad034abd82e605a9"},{"url":"/assets/images/laravel_7x_ide_helper.webp","revision":"81a6eeb2c777fd42753e2f07f62f3482"},{"url":"/assets/images/baba.test.webp","revision":"5dd7269b7f5b53267db76b7bf507cd73"},{"url":"/assets/images/ortam_degiskenleri2.webp","revision":"4564d1e11107ce2984bd99881dc1854a"},{"url":"/assets/images/SublimeLinter.webp","revision":"66eae196394181507c1338583f49c9af"},{"url":"/assets/images/amazon-openvpn-kurulumu-3.webp","revision":"42fe8a5ebe6b6eb74eaff7476e7e5391"},{"url":"/assets/images/superproxy2.webp","revision":"8a7026dd4b75243a6b3aed3859c13dc5"},{"url":"/assets/images/amazon-openvpn-kurulumu-10.webp","revision":"5dc700ea1a9bae7bca1020168de8701a"},{"url":"/assets/images/php_phpstorm_csfixer.webp","revision":"83a93612627040621084013e6a0f174b"},{"url":"/assets/images/GutterColor.webp","revision":"acc00fcc0729cd0dd55698f9b5edf99c"},{"url":"/assets/images/optirun-performansi.webp","revision":"b384bab9c7a21dfcd23a0ebbcdfdda00"},{"url":"/assets/images/ol_vbox_vagrant-min.webp","revision":"c3840048540029a83429a47bd66de4d7"},{"url":"/assets/images/amazon-openvpn-kurulumu-12.webp","revision":"3a95ed90b79a99c139ed9f4b93f91d23"},{"url":"/assets/images/php_phpstorm_csfixer2.webp","revision":"c47c408b36f73d57e75a9703e134d56d"},{"url":"/assets/images/staticman8.webp","revision":"39f36d59b9bae07f29e8ba019128e806"},{"url":"/assets/images/staticman9.webp","revision":"3978cf9dade4b8e886e132634e5c9ef2"},{"url":"/assets/images/oh_my_zsh.webp","revision":"cbe657cbdf74089308874bf87ca0c470"},{"url":"/assets/images/linux_browser_kaynaklar.webp","revision":"bc91490d10ae48c037d94556256e6c64"},{"url":"/assets/images/superproxy7.webp","revision":"b68a3d0ee9aeb610604f44e37b60dc6b"},{"url":"/assets/images/nvidia-grafik-karti-indirme2.webp","revision":"793b48e657609703d205f66df19e26e0"},{"url":"/assets/images/AlignTab.webp","revision":"b50821bc9fa914a5e730f73959e67b71"},{"url":"/assets/images/Screenshot_2018-11-17_17-22-17.webp","revision":"bdd637d780a59a08111526f66b03afca"},{"url":"/assets/images/newsboat.webp","revision":"481d94576a44335077bd4653821e1da5"},{"url":"/assets/images/duyuru.webp","revision":"0fb1fff3e2a7abb33194006b2abb1abd"},{"url":"/assets/images/composer.webp","revision":"12c2bea8b095cff4f1ba2d7aefe5f9ef"},{"url":"/assets/images/BracketHighlighter.webp","revision":"cec0ae5f33772a900394e647e0c9b3c6"},{"url":"/assets/images/amazon-openvpn-kurulumu-8.webp","revision":"6f26dc7ae8eb02f285867465ad1d723b"},{"url":"/assets/images/linux_browser.webp","revision":"3c130316892739cbf8d7299e966ad6ca"},{"url":"/assets/images/linux_browser_settings.webp","revision":"b468c573344f4fb62a9a7250345e1fb1"},{"url":"/assets/images/facebook-5000-arkadas-ekleme-kodu-v2.webp","revision":"1e267fe8c42a2ed5aaaa6a3941228329"},{"url":"/assets/images/Side​Bar​Enhancements.webp","revision":"2942f38a814966cd1d038556b88ef929"},{"url":"/assets/images/touch/icon-192x192.webp","revision":"189a567bbccad42885f8ec652dd63919"},{"url":"/assets/images/touch/icon-384x384.webp","revision":"646b05244879714ead1fcda3b1ab76c5"},{"url":"/assets/images/touch/icon-512x512.webp","revision":"e430cb5db12631db36815db99b555e59"},{"url":"/assets/images/touch/icon-256x256.webp","revision":"551ee369aa34e525e925c7a7741a8ddf"},{"url":"/assets/images/php_morris.webp","revision":"d974b8d1670052940c685846184aa13d"},{"url":"/assets/images/superproxy6.webp","revision":"2443fa209f9addc4ed56a01b05508bce"},{"url":"/assets/images/spotify-2.webp","revision":"970c0d6743738e3b80d3e25f744e46fb"},{"url":"/assets/images/superproxy3.webp","revision":"c5c2b63d1000626acf67216ee7746fe0"},{"url":"/assets/images/linux_windows10_uefi_format.webp","revision":"90c27e3ad772e01c7ef1f741b4bea3a9"},{"url":"/assets/images/amazon-openvpn-kurulumu-2.webp","revision":"dd171482f3ee09e9632d281d1d548f98"},{"url":"/assets/images/ortam_degiskenleri3.webp","revision":"08543ce78a725910bc3c36c64f119249"},{"url":"/assets/images/staticman10.webp","revision":"e1efbc65e8f027c0984e53d44cee361b"},{"url":"/assets/images/git_bash.webp","revision":"345e2326731e35ad458d539d632331ad"},{"url":"/assets/images/spotify-4.webp","revision":"da63d4cc5520bb61dce0177c371d5e80"},{"url":"/assets/images/linux_windows10_uefi_format_error.webp","revision":"f5ff3a58b70fad13341111935d8c371d"},{"url":"/assets/images/neomutt_senkron.webp","revision":"8f681f7900ef402fec221442205c0ceb"},{"url":"/assets/images/uygulama_sifresi_gmail.webp","revision":"5f9338ff72dc5cabfc38eec79ca299ad"},{"url":"/assets/images/php_phpstorm_csfixer4.webp","revision":"ea7aee45cd8e6dea57acb3aee01f3d85"},{"url":"/assets/images/keyscrambler.webp","revision":"4ea3d26412cd23975057a316a2d5f5ab"},{"url":"/assets/images/amazon-openvpn-kurulumu-13.webp","revision":"4ff501c8fe2d2371fa85da52a2027ff3"},{"url":"/assets/images/staticman3.webp","revision":"181909cb89573cbc5497f17ab06ce1d3"},{"url":"/assets/images/superproxy.webp","revision":"ff0e4c9bcc49b7a4d93aa3fec01b41c4"},{"url":"/assets/images/pic-selected-190916-0747-49.webp","revision":"c8ac8f83f45b5c4cc3bb59bdb2833eae"},{"url":"/assets/images/pic-selected-190916-0818-54.webp","revision":"d78b86b22bf599707a0bfb0e699e1cb8"},{"url":"/assets/images/nvidia-grafik-karti-indirme.webp","revision":"a6e5eebcf53423b04ea9004d9ef4453b"},{"url":"/assets/images/superproxy10.webp","revision":"65c9005b6ad17c7058d65bc1e86bceba"},{"url":"/assets/images/redshift_windows.webp","revision":"d1d6d720764ea199ece90f2cdea18f18"},{"url":"/assets/images/optirun-dahili-gpu.webp","revision":"e04da748e8200a89045ad4a445016eb4"},{"url":"/assets/images/vlsub0.webp","revision":"78efad2c694cf188184a606689ca83a1"},{"url":"/assets/images/vlsub1.webp","revision":"ca0294099a49d031f00854764fca0f3b"},{"url":"/assets/images/superproxy8.webp","revision":"6079998942af93987e984c73e53d8653"},{"url":"/assets/images/staticman11.webp","revision":"c5dca7071723a95b0668806528ef4a48"},{"url":"/assets/images/amazon-openvpn-kurulumu.webp","revision":"da3bfe99f5baafb7cb3394705836c0ca"},{"url":"/assets/images/php_phpstorm_csfixer3.webp","revision":"da175d76464f2f1fcfbd186fc929b19e"},{"url":"/assets/images/primeperformansi.webp","revision":"0cbdf79cc66aedd8a639a3a64cc25fff"},{"url":"/assets/images/staticman6.webp","revision":"a84a0af25bc97b0dd30545a5c686a365"},{"url":"/assets/images/staticman5.webp","revision":"def71be1899f40bf0bb91fa8bec2a7f6"},{"url":"/assets/images/linux_windows10_uefi_disk.webp","revision":"c7e3d36b908bf826ee8c228bb652871a"},{"url":"/assets/images/vlbsub.webp","revision":"ee122756e7ef9bf0739dd96b0cff4563"},{"url":"/assets/images/superproxy5.webp","revision":"f86da45aa3c6d23329468e42da3d39da"},{"url":"/assets/images/amazon-openvpn-kurulumu-6.webp","revision":"5a9cf67593aa0e85168d13c2707de026"},{"url":"/assets/images/amazon-openvpn-kurulumu-5.webp","revision":"b39c3a25ead4cff3cc744b1650bb2c1d"},{"url":"/assets/images/linux_windows10_uefi.webp","revision":"3d6249079327ac4058d00dd17f2974a7"},{"url":"/assets/images/ntfs_yetki_hatasi.webp","revision":"7a1550a9dc72297cb4fb4c4e8e86e600"},{"url":"/assets/images/superproxy9.webp","revision":"4be0f061f24754b1f733cc3b0d1d8e0b"},{"url":"/assets/images/facebookgrupkodu.webp","revision":"1712a153ce20c74532733c2c48eec1b7"},{"url":"/assets/images/staticman2.webp","revision":"1f054c4b6786b252ec2d453cae86b78f"},{"url":"/assets/images/linux_browser_obs_custom.webp","revision":"55dd71b02c1c5ac5fdea9ab84f1db96f"},{"url":"/assets/images/ortam_degiskenleri1.webp","revision":"8ccdb4c1835492ad70b74bb5ffeda557"},{"url":"/assets/images/laravel-valet-link-archlinux.webp","revision":"43ec9b315696a1c911fecf47fe312769"},{"url":"/assets/images/laravel-valet-kurulumu-linux.webp","revision":"83929b628ac86f3721711044841faa28"},{"url":"/assets/images/linux_browser_final.webp","revision":"5a87c3c27ad5ea81dc05e57f15b9048a"},{"url":"/assets/images/normal/ortam_degiskenleri1.png","revision":"85ff7ae3fb24662a3e44ad8090b3fda6"},{"url":"/assets/images/normal/staticman7.png","revision":"d20c3c34a9a92b47b9c2524b77735821"},{"url":"/assets/images/normal/staticman2.png","revision":"d823af6d9be371f3482533961d2572e4"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-3.png","revision":"36196bf3eca965599153e793a51ac9b3"},{"url":"/assets/images/normal/facebookgrupkodu.png","revision":"78ab1a53f3539dd0bf0abda10175817c"},{"url":"/assets/images/normal/uygulama_sifresi_gmail.png","revision":"4542e02b128df6aa9d692b3451da4e87"},{"url":"/assets/images/normal/phpstorm_terminal2.png","revision":"d3447d8d9d5d21baf36bbb057e912e73"},{"url":"/assets/images/normal/staticman3.png","revision":"576c159ca0d68da1f2dca32db7f9e144"},{"url":"/assets/images/normal/AFileIcon.png","revision":"fadf1de10c6b9fc820fc8cd5754407eb"},{"url":"/assets/images/normal/pic-full-190916-0808-36.png","revision":"f0b1464db93678588295590be3eb2064"},{"url":"/assets/images/normal/favicons/android-icon-48x48.png","revision":"9cd2809f6c08445dc419306eca193fd9"},{"url":"/assets/images/normal/favicons/favicon-16x16.png","revision":"25ca9743b1faac94c20344559fa875b2"},{"url":"/assets/images/normal/favicons/android-icon-144x144.png","revision":"40425d9bb195fc695ee31722c9a1a7e0"},{"url":"/assets/images/normal/favicons/apple-icon-57x57.png","revision":"4bfafae95f631cc3e3be9114ee86f487"},{"url":"/assets/images/normal/favicons/ms-icon-144x144.png","revision":"40425d9bb195fc695ee31722c9a1a7e0"},{"url":"/assets/images/normal/favicons/apple-icon-60x60.png","revision":"7a962959511d83a2d09afc76cd0b9e0c"},{"url":"/assets/images/normal/favicons/android-icon-36x36.png","revision":"452c4e8e85b0b6d6002e597d109537be"},{"url":"/assets/images/normal/favicons/apple-icon-120x120.png","revision":"bc1c17a7b069b00c6745f1d5c92088de"},{"url":"/assets/images/normal/favicons/android-icon-96x96.png","revision":"ad0a7a219c792bd3efe99d8f7adb7032"},{"url":"/assets/images/normal/favicons/favicon-32x32.png","revision":"3c0327d8db6f5bbee3a637dda98f1694"},{"url":"/assets/images/normal/favicons/favicon-96x96.png","revision":"8c2f75cabe72ca4e5dba95506c228460"},{"url":"/assets/images/normal/favicons/ms-icon-310x310.png","revision":"f1377cdf09eec4998ddfae76816dedcd"},{"url":"/assets/images/normal/favicons/android-icon-192x192.png","revision":"66c5244cbedb5089e9c0d7e57ab14062"},{"url":"/assets/images/normal/favicons/apple-icon-76x76.png","revision":"6c230fd0108e6714ed735ce6290ae3d3"},{"url":"/assets/images/normal/favicons/apple-icon-152x152.png","revision":"6a6aa82423225180e3cbe79b979f0a04"},{"url":"/assets/images/normal/favicons/apple-icon.png","revision":"82f0eb264402fd84816b550002322ee2"},{"url":"/assets/images/normal/favicons/apple-icon-114x114.png","revision":"0ba91416aa69abc8c1b200b6003320df"},{"url":"/assets/images/normal/favicons/ms-icon-150x150.png","revision":"c1af72624d37714a1fbd1ec434a60a29"},{"url":"/assets/images/normal/favicons/apple-icon-precomposed.png","revision":"82f0eb264402fd84816b550002322ee2"},{"url":"/assets/images/normal/favicons/android-icon-72x72.png","revision":"00203bfc4efd16569d748ed1d93a6cfb"},{"url":"/assets/images/normal/favicons/ms-icon-70x70.png","revision":"95ae97b79856e9d9c96557ce697756e6"},{"url":"/assets/images/normal/favicons/favicon.ico","revision":"21620055c8f33fd16aaf550f58d4c67c"},{"url":"/assets/images/normal/favicons/apple-icon-144x144.png","revision":"40425d9bb195fc695ee31722c9a1a7e0"},{"url":"/assets/images/normal/favicons/apple-icon-72x72.png","revision":"b06f167f2212e055e5cf938fe764c6dd"},{"url":"/assets/images/normal/favicons/apple-icon-180x180.png","revision":"5286e3715b4889f1e0162ddc8ec6debc"},{"url":"/assets/images/normal/spotify.png","revision":"091ddc592b389b076200a39695cda9ee"},{"url":"/assets/images/normal/vlbsub.png","revision":"c79c8fd13300cd1721996b94ecd9fa43"},{"url":"/assets/images/normal/superproxy.png","revision":"c41f62f7e41960238d95e5222e71e127"},{"url":"/assets/images/normal/SublimeLinter.png","revision":"8e13355a54fed10074be5a1cefaf6418"},{"url":"/assets/images/normal/exen.png","revision":"a08879702e26f850f3dcccd38a1b36df"},{"url":"/assets/images/normal/vlsub0.png","revision":"119c872c7e05a82004e6335feb70c5a5"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-6.png","revision":"45bab625b7171d2bc3b48bfb391e43a7"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu.png","revision":"8b5d94948953c87b774fdadbe97d5260"},{"url":"/assets/images/normal/facebookgrupistatistik.png","revision":"186c524720f1067ea8acd52479411595"},{"url":"/assets/images/normal/linux_windows10_uefi_format_error.jpeg","revision":"345bc488a02d7fcbf3ad92aeb0e576be"},{"url":"/assets/images/normal/php_phpstorm_csfixer2.png","revision":"285bfad927ae895fc940ef8d99795033"},{"url":"/assets/images/normal/vlsub1.png","revision":"bd2a4be1a2a20eb9073034a704fd62ea"},{"url":"/assets/images/normal/primeperformansi.png","revision":"b6e2d5e937ed4dafc0d4e8325c00f0e2"},{"url":"/assets/images/normal/staticman10.png","revision":"88abf586854ca3415f66eb877df489d0"},{"url":"/assets/images/normal/linux_windows10_uefi_boot_2.jpeg","revision":"7faa73ef4a1f08e4972af5ba9061079c"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-12.png","revision":"39584886596baf39bfbc6f18b60f59f4"},{"url":"/assets/images/normal/staticman11.png","revision":"587c0b37bf76892da9afea22fba5ae38"},{"url":"/assets/images/normal/newsboat.png","revision":"32c34feddc5d6d83516a01a250c8a6d5"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-10.png","revision":"1a231c61622cc91c599f2ec1eed59ae2"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-11.png","revision":"5e80098bb268c13dc99d2cc97d7a5825"},{"url":"/assets/images/normal/optirun-performansi.png","revision":"8f7c5080408665692c3c460a4ec0eee0"},{"url":"/assets/images/normal/facebook-5000-arkadas-ekleme-kodu-v2.jpg","revision":"108858926c8964fc1ea7ca076e89b5e9"},{"url":"/assets/images/normal/spotify-4.png","revision":"0e763b06d82d058f7b2d35482f1688e4"},{"url":"/assets/images/normal/Screenshot_2018-11-17_17-22-17.png","revision":"decc4b5f7ea06fb9bbe856c46a68e949"},{"url":"/assets/images/normal/GutterColor.png","revision":"bd3ced9047c97328e66f91fb140278d7"},{"url":"/assets/images/normal/hosts.png","revision":"31f42d34f98abe59f420788360518631"},{"url":"/assets/images/normal/laravel_7x_ide_helper.png","revision":"5f18fa2ed6ee3f1ad47c272ed00cc1da"},{"url":"/assets/images/normal/redshift_windows.png","revision":"6108bf219773ea65aab61e4fe13bd97d"},{"url":"/assets/images/normal/imap_openssl_terminal.png","revision":"29f3c559a9326dbac8f1f2b8f9fb9d61"},{"url":"/assets/images/normal/neomutt_senkron.png","revision":"ad571df05c831739ef8aabb3f90591b4"},{"url":"/assets/images/normal/staticman4.png","revision":"5584ec78fa4d49afa3c9190017484d48"},{"url":"/assets/images/normal/configure_lampp.jpeg","revision":"5b0855b35ce265f8c395091a15d263b1"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-8.png","revision":"5784809595ec20015f380c8704b36480"},{"url":"/assets/images/normal/laravel-valet-link-archlinux.png","revision":"9fdb54163eecebfc48372f0021703c41"},{"url":"/assets/images/normal/airdrop_flx_coin.png","revision":"76ee8d66ea9facd6fdd358e078119fbf"},{"url":"/assets/images/normal/keyscrambler2.png","revision":"e103ccba0c9b89e78871319ccf1b57ab"},{"url":"/assets/images/normal/linux_browser_discord.png","revision":"eeb328f01020ea80b6df6f3459a85e84"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-14.png","revision":"857c163c19387e92ee15c1d8dbda7571"},{"url":"/assets/images/normal/composer.jpeg","revision":"01c478a1a8ee879c4119f7ec7a908d31"},{"url":"/assets/images/normal/touch/icon-384x384.png","revision":"228e72d60166f2e1687f905deed55638"},{"url":"/assets/images/normal/touch/icon-192x192.png","revision":"22b0807fc10493579c3d05a493a67c61"},{"url":"/assets/images/normal/touch/icon-512x512.png","revision":"fec2cdd70f48fcea8f8dd004fcbfec46"},{"url":"/assets/images/normal/touch/icon-256x256.png","revision":"bd8a08474b84e9afd3592c9d5cc6a486"},{"url":"/assets/images/normal/pic-selected-190916-0747-49.png","revision":"4bd8d61798760cd0db9f19e4b17899f4"},{"url":"/assets/images/normal/linux_browser_settings.png","revision":"49ec6cd10ff6cdb8fc723ce4b2700334"},{"url":"/assets/images/normal/php_phpstorm_csfixer3.png","revision":"1ce1c07e419abccf2580c4c91f29a269"},{"url":"/assets/images/normal/linux_windows10_uefi.jpeg","revision":"3b04065c088a0dc4635484e4921a4ece"},{"url":"/assets/images/normal/duyuru.jpg","revision":"14f87a2bca502cde1ee53d7439cb5054"},{"url":"/assets/images/normal/linux_browser_obs_custom.png","revision":"0a21a34749904ffcd7e07b5f0411b6fb"},{"url":"/assets/images/normal/nvidia-grafik-ayari-maximum-performans.png","revision":"bbc48e20e26ea0caa0ec43245d40e3fa"},{"url":"/assets/images/normal/staticman8.png","revision":"464d1f34c9597138bbf4aefd9600d332"},{"url":"/assets/images/normal/superproxy9.png","revision":"48424a3e8e5342ecd7a0cf4e40894649"},{"url":"/assets/images/normal/ucretsiz-oyunlar.jpg","revision":"85612265b9f7fa2e0ced29f2fd2379a1"},{"url":"/assets/images/normal/ortam_degiskenleri3.png","revision":"3284e965fe5b30f7f6f1c534d03e1db4"},{"url":"/assets/images/normal/keyscrambler.png","revision":"9c827c587dd6cf0578e20ade505fea0d"},{"url":"/assets/images/normal/spotify-2.png","revision":"2ec3ea7053a765460afa9184574c52ef"},{"url":"/assets/images/normal/superproxy10.png","revision":"cfe66b1b2948cba504a9e32eb5115475"},{"url":"/assets/images/normal/staticman5.png","revision":"16e54f98f6b92b253c4beee006b8c6ce"},{"url":"/assets/images/normal/superproxy5.png","revision":"1674fc212c006b5cebecdb888a809b88"},{"url":"/assets/images/normal/sublime-text-eklentileri.jpeg","revision":"4383a1d6d585219be90bb873aa24a7e4"},{"url":"/assets/images/normal/php_phpstorm_csfixer.png","revision":"852f68243fa5581362f8f1ee7cd4b944"},{"url":"/assets/images/normal/optirun-dahili-gpu.png","revision":"aa4d01c32834779eef82430aa036493d"},{"url":"/assets/images/normal/BracketHighlighter.png","revision":"17614926582a27e23d2f6b2b33aa4245"},{"url":"/assets/images/normal/superproxy7.png","revision":"e6c39615630a8ab8fc57c0624cffac73"},{"url":"/assets/images/normal/php_morris_grafik.png","revision":"0036ada04d7e6d32a51097f2524ce38f"},{"url":"/assets/images/normal/ortam_degiskenleri2.png","revision":"bb5f2172252f702bfdc7008a89145b2b"},{"url":"/assets/images/normal/oh_my_zsh.png","revision":"cb0cbf3e74a815009a323efb6dd6e8ec"},{"url":"/assets/images/normal/php_phpstorm_csfixer4.png","revision":"22724fd7d104f8646f669d6353ce96a6"},{"url":"/assets/images/normal/ol_vbox_vagrant-min.png","revision":"0823f5fcd3c712cae8090dd709e906aa"},{"url":"/assets/images/normal/spotify-3.png","revision":"349560f94c22e4a55e8a9b6e74521f17"},{"url":"/assets/images/normal/nvidia-grafik-karti-indirme.png","revision":"a867db0df592f5f5d1689e8994a92c66"},{"url":"/assets/images/normal/linux_browser_obs.png","revision":"dc697113ad38c91e86cbb45d452724e9"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-9.png","revision":"fee13de10d77cd624093e84e372437d6"},{"url":"/assets/images/normal/git_bash.png","revision":"880e677c7b23f3fd35b5ef667ce97839"},{"url":"/assets/images/normal/linux_browser.png","revision":"5fe091be7dd7a3719fc0c5236bfc6cf3"},{"url":"/assets/images/normal/linux_browser_kaynaklar.png","revision":"e2f0c05f0d46c9964a42e5b88d99bc2a"},{"url":"/assets/images/normal/superproxy3.png","revision":"add864d90cf23f0aaa2223c600bd2c78"},{"url":"/assets/images/normal/esigara-yararlimi-zararlimi.jpg","revision":"3c3d029b70c8fc6e9130fe5cdb033c9f"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-5.png","revision":"1ad0dce25fea6a2c83b0aaf41ab2913c"},{"url":"/assets/images/normal/linux_windows10_uefi_boot.jpeg","revision":"a583b0945ae2c7bb77d3289c633a1c0d"},{"url":"/assets/images/normal/comodo_firewall.png","revision":"3df5f306f988b8d169cefc7392e7bf1c"},{"url":"/assets/images/normal/ntfs_yetki_hatasi.png","revision":"1630b8ab2c7210e53f682b6bfd89a41e"},{"url":"/assets/images/normal/linux_windows10_uefi_disk.jpeg","revision":"329c5333837900443c9a9cd25de164de"},{"url":"/assets/images/normal/staticman-postman.png","revision":"27727ed4d562cb7d498b34ecf4aef541"},{"url":"/assets/images/normal/baba.test.png","revision":"63101f2152c4dc726765c3c63d021c95"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-2.png","revision":"a4266e8b3a24e5fd98603e2ab3fd9780"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-13.png","revision":"a843a9729caa0be0c22f7d9df76b83eb"},{"url":"/assets/images/normal/nvidia-linux-performans-ayari.png","revision":"9ebb9792622b9877b2152cf851e2343e"},{"url":"/assets/images/normal/superproxy8.png","revision":"03f5fc6d5758a25931db4c5b9a006998"},{"url":"/assets/images/normal/nvidia-grafik-karti-indirme2.png","revision":"92eca345dac825384f6a1c46d826f367"},{"url":"/assets/images/normal/AlignTab.png","revision":"7136881b17e0a50bb9a024e4822629ed"},{"url":"/assets/images/normal/staticman.png","revision":"fc7e7ef39d85b8435d4916e03e3f134e"},{"url":"/assets/images/normal/GitHubinator.png","revision":"e0a2e0aef4598b58a779322e19b4fd63"},{"url":"/assets/images/normal/superproxy11.png","revision":"03c088f32087732dc0caefb3da66e486"},{"url":"/assets/images/normal/linux_browser_final.png","revision":"62563a97930e224cfd29374b5dd8b208"},{"url":"/assets/images/normal/php_morris.png","revision":"7caf1497b177beb06616b613593e9f18"},{"url":"/assets/images/normal/pic-selected-190916-0818-54.png","revision":"aa37c3f662b1eafe7adeaed46c1cc996"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-7.png","revision":"f47f3e94ddd8e5d41143128ccb9dede5"},{"url":"/assets/images/normal/sweetalert.png","revision":"01ce0ac5951540636ddf80d7cbf1da0d"},{"url":"/assets/images/normal/Extended- test.png","revision":"500e2532bdfc53e6ee8655086f0b494d"},{"url":"/assets/images/normal/Side​Bar​Enhancements.png","revision":"6efc507422964197a2c987ecb7047d5f"},{"url":"/assets/images/normal/superproxy4.png","revision":"d3850f3dddcad737f8415b7d657217bb"},{"url":"/assets/images/normal/laravel-valet-kurulumu-linux.jpeg","revision":"d40f05979896b720bf47323dfaafd949"},{"url":"/assets/images/normal/linux_windows10_uefi_format.jpeg","revision":"fdd9fd8ff4e8f4f601f407dd36089ad2"},{"url":"/assets/images/normal/superproxy2.png","revision":"e5bec38576844fd96454256ebc158923"},{"url":"/assets/images/normal/linux_samba.png","revision":"decc4b5f7ea06fb9bbe856c46a68e949"},{"url":"/assets/images/normal/newsboaticerik.png","revision":"d9ae1a385e7f3f343fc4edb3ccdf3453"},{"url":"/assets/images/normal/staticman9.png","revision":"15434fa14bf89c1b789b8e32458bc3d4"},{"url":"/assets/images/normal/phpstorm_terminal.png","revision":"39b66f893ac02b688d59018552eb3dce"},{"url":"/assets/images/normal/staticman6.png","revision":"e2cff5981e816131fdaab8a3d7a5edfc"},{"url":"/assets/images/normal/superproxy6.png","revision":"9df7a36a6ffc3c671340491c18e53b5c"},{"url":"/assets/images/normal/spotify-5.png","revision":"fc30278ace3f4a4183343a0e243298df"},{"url":"/assets/images/normal/php_phpstorm_csfixer5.png","revision":"5d07bf63b738fa22b38aee02992b89f1"},{"url":"/assets/images/normal/amazon-openvpn-kurulumu-4.png","revision":"639be58e75693e6779a305bb6123b450"},{"url":"/assets/images/linux_windows10_uefi_boot.webp","revision":"c8f780e8089d75439b837341a7beb513"},{"url":"/assets/images/phpstorm_terminal2.webp","revision":"69d2b682a7dd588782939b49053497b8"},{"url":"/assets/images/php_morris_grafik.webp","revision":"c6687ea048646416128d59d6503efc41"},{"url":"/assets/images/sublime-text-eklentileri.webp","revision":"8aab27e268f7ba9dbc0dc8268e4cae48"},{"url":"/assets/images/staticman-postman.webp","revision":"8ff9ae4a597919be3c48f19ba965b477"},{"url":"/assets/images/linux_browser_discord.webp","revision":"227fcddd15a39c25df67d50262d79082"},{"url":"/assets/images/staticman.webp","revision":"8948ad467aa90a588fcd7df6a2000c94"},{"url":"/assets/images/amazon-openvpn-kurulumu-4.webp","revision":"3550430d5751899a930535b323c471c7"},{"url":"/assets/images/amazon-openvpn-kurulumu-7.webp","revision":"cb787fedb4d913b7e3fa3ab4c71c52df"},{"url":"/assets/images/nvidia-linux-performans-ayari.webp","revision":"8935cd6aa76e9ed1f8dc1d105d4714ce"},{"url":"/obs-linux-browser-eklentisi-kurulumu/index.html","revision":"31640bb61be7c5c5517efd8efd1df553"},{"url":"/modern-mutt-kurulumu/index.html","revision":"cccdcf5ae11e9e46aa133131dc9ba690"},{"url":"/terminatorgitcurlfish-yukleme/index.html","revision":"9d6ec8526e177b7758dbefba05b80cfb"},{"url":"/openvpn-nasil-kurulur/index.html","revision":"3b784ebb03e9c4501e153aebddbd413d"},{"url":"/archlinux-valet-kurulumu/index.html","revision":"1aa4924bd404ca8dd2645584d328af12"},{"url":"/kullandgm-enfes-sublime-text-eklentileri/index.html","revision":"f3d32139a62bfba65043c75f6a8f6efd"},{"url":"/earncom-nedir-nasl-kullanlr/index.html","revision":"75757c4c915bce0d5e4be12332403966"},{"url":"/about/index.html","revision":"2b906442b009d441d3e254d8cf830dce"},{"url":"/facebook-toplu-arkadas-eklemegruba/index.html","revision":"6a0ebc48f357ed78da285601ea52dcf8"},{"url":"/phpstorm-icerisinde-phpcsfixer/index.html","revision":"2eca23edd29714e4d0f492c229e7d94f"},{"url":"/tags/windows10/index.html","revision":"a892b84ddea5427a03f26042abcaceef"},{"url":"/tags/github/index.html","revision":"7956f8249bd33d845418cb771ae2360a"},{"url":"/tags/cmder/index.html","revision":"25785356054ef69cd62f26e138aa2a64"},{"url":"/tags/laravel/index.html","revision":"55ddf258a1816e17a81fe0badf4fe8f7"},{"url":"/tags/ntfs/index.html","revision":"7247c6e62c0d64b3d7be8e0875556edd"},{"url":"/tags/e-mail/index.html","revision":"3e7746e2c536cbcde538d0884e96be8c"},{"url":"/tags/sweetalert/index.html","revision":"cf3eb98434675ca648a372e111ceca2d"},{"url":"/tags/codeigniter/index.html","revision":"a7b587f401f19c0e99f01d6f17bf2e27"},{"url":"/tags/sublime/index.html","revision":"79dee35b69a9b1bafb3d1bf06ef83678"},{"url":"/tags/superproxy/index.html","revision":"5fee123a4d1fa1e991447ad134f63f58"},{"url":"/tags/spotify/index.html","revision":"e263c5158ad13d13b110d8d2f2388b05"},{"url":"/tags/belgesel/index.html","revision":"3181d9a22ba57cb4ecf88be111c756db"},{"url":"/tags/tanitim/index.html","revision":"f8673989a6e1adef6e3fb73ff7b292bb"},{"url":"/tags/film/index.html","revision":"5762bac46414db9d65f1095220b560b0"},{"url":"/tags/phpstorm/index.html","revision":"b35cdbdf9ca7995aec1ea95bdb30d75e"},{"url":"/tags/newsboat/index.html","revision":"9b512b1beec801ba807d236f93a5bcf5"},{"url":"/tags/imap/index.html","revision":"692b78e1596749857d9aff3e669c159f"},{"url":"/tags/mp3/index.html","revision":"ec2c4ef97b87e40683e5fe6c25198c90"},{"url":"/tags/index.html","revision":"d3e769d833e1fc232b64d34428dc774f"},{"url":"/tags/steam/index.html","revision":"e49ee7b06d786622b1e28b5b6342bca8"},{"url":"/tags/facebook/index.html","revision":"4a3b03062460b6ce2856362a7b853e5d"},{"url":"/tags/earn/index.html","revision":"a55424256a7d1dc4746b402c5f7f3a69"},{"url":"/tags/internetten-para-kazanma/index.html","revision":"6d216b079937b2c0a32b0b8ea282fdc1"},{"url":"/tags/vagrant/index.html","revision":"63a5216eb9bee6ff1cd2ad0680c02c13"},{"url":"/tags/php/index.html","revision":"1e85fe7e879c8f6fb1ffa89fba039dde"},{"url":"/tags/staticman/index.html","revision":"fa73946ed9a73c0097769e7efb574098"},{"url":"/tags/apache/index.html","revision":"a1ae06d1b72e32eb059cc797af33ea37"},{"url":"/tags/vpn/index.html","revision":"c72436a1b5043b0b0fca42eb03a4f2ed"},{"url":"/tags/yazılım/index.html","revision":"f364e013122be6cbb7099cdf6697457c"},{"url":"/tags/jekyll/index.html","revision":"dd9712ec3f3bf00ed4c7baacccd7f8b6"},{"url":"/tags/laptop/index.html","revision":"5ecba850a619f4e6c1909c0db8f9ae9d"},{"url":"/tags/composer/index.html","revision":"e48893b6d0f2e94583a92d3be9e56bc6"},{"url":"/tags/nvidia/index.html","revision":"7f9ff39405c191803e329d6a34eae976"},{"url":"/tags/ipucu/index.html","revision":"458537a1ed0e044072d7ff87b89767dc"},{"url":"/tags/site/index.html","revision":"a8d4f6738f2ce4d7a6fd18af50002478"},{"url":"/tags/httrack/index.html","revision":"eb457bfcea0fb06690c7d3ea5f11e61a"},{"url":"/tags/discord/index.html","revision":"c3543c4f0fe9ea34181fad4e3bc92c4b"},{"url":"/tags/linux/index.html","revision":"2149d601ae33945169ffbd33a3066ae8"},{"url":"/tags/pdo/index.html","revision":"b81af6c70706c3aec94865c9aeb6232e"},{"url":"/tags/zsh/index.html","revision":"36d408bfa84852ba0b36be010e21cbd8"},{"url":"/tags/terminal/index.html","revision":"e10cccbf5b837ee3c5ec7784a0739bed"},{"url":"/tags/obs/index.html","revision":"496cc4b14769992bf6672ab426ad7209"},{"url":"/tags/unixporn/index.html","revision":"3cca624f40719c53dacadae17a4b70a5"},{"url":"/tags/ssh/index.html","revision":"295410b800e88270bd9d5226613c7d5e"},{"url":"/tags/vlc/index.html","revision":"b0cd7736e99a79706b97b5060df0fe6d"},{"url":"/tags/program/index.html","revision":"9f32d136ea4cafaa53c192a48b97045e"},{"url":"/:title/index.html","revision":"937484255025fbdc55f3d4d8df0cb021"},{"url":"/yeni-baslayanlar-hangi-linux-surumunu/index.html","revision":"b6c9e77c5d2a591d94ca989946f42843"},{"url":"/archlinux-ntfs-nasil-yapilandirilir/index.html","revision":"4a921f8b82d61f016d75e46babad5272"},{"url":"/categories/tanitim/index.html","revision":"c2f9962dc691bde416e4d0ddf8d87877"},{"url":"/categories/index.html","revision":"dd717f20c0fd8714ad2df41d66b1a32c"},{"url":"/categories/facebook/index.html","revision":"f1096d373a8053077ec3edca9fd7d3ed"},{"url":"/categories/site/index.html","revision":"c9ce994470085d95d7932996b267c965"},{"url":"/categories/linux/index.html","revision":"9b939a128e3760d41fda9324ba2766bb"},{"url":"/categories/tavsiye/index.html","revision":"1a9cc8cec2e2cfb4af6a53273b2d32a5"},{"url":"/categories/para-kazanma/index.html","revision":"fe74b19988c367aabb42d5328fe29972"},{"url":"/categories/kutuphane/index.html","revision":"17325508205e9f07550ee210c52d3ce4"},{"url":"/categories/editor/index.html","revision":"2499f600b1332a0fdc456322a6c5a45c"},{"url":"/categories/program/index.html","revision":"8a6e31ea73320700b914f129ce8c58c2"},{"url":"/linux-uzerinde-apache2-mysql-phpmyadmin/index.html","revision":"629cd26a8cc5162413524c0589623d2f"},{"url":"/index.html","revision":"627e92df9b7134e3c783ff2d5e148119"},{"url":"/oh-my-zsh-kurulumu-tema-ve-eklentiler/index.html","revision":"3e98103c1c7541e502e9932b619873ef"},{"url":"/sweet-alert-snf-kullanm-detayl-anlatm/index.html","revision":"29769e91a3d155e7acd95949bb8f5018"},{"url":"/phpstorm-icerisinde-cmder-kullanmak/index.html","revision":"918f066372a125948eab371a484e2033"},{"url":"/linuxta-uefi-windows-10-format-usb/index.html","revision":"e36fa28abe3544cffd8864bcd7512545"},{"url":"/vlsub-ile-altyaz-aramaya-son-resimli/index.html","revision":"89ee978df9515f8adce2c53a220b6524"},{"url":"/linux-httrack-kullanm/index.html","revision":"c09c355236be4794b7a9705f53c14ef3"},{"url":"/pdo-sum-fonksiyonu-kullanmmorrisjs/index.html","revision":"f7303e1bac142fb9da4be23ebf48f15a"},{"url":"/offline.html","revision":"729b1dd3c0d061945765913f677536b5"},{"url":"/facebook-otomatik-arkadas-ekleme-sureli/index.html","revision":"be779dabb9b352e9753c1074e1a0334a"},{"url":"/elektronik-sigara-zararlimi-faydalimi/index.html","revision":"7cc7e3278cce7b0d145472c44e4d4214"},{"url":"/her-turk-gencinin-izlemesi-gereken/index.html","revision":"39a8cc3f719d935b104ddb576c80557c"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/index.html","revision":"f2cf3853f34e786f72d922a1a35f44c7"},{"url":"/jekyll-google-superproxy/index.html","revision":"cfc2b8c2887361b7884a582c63ba9d1c"},{"url":"/linux-tema-nasl-yuklenir-gnome-shell-ve/index.html","revision":"f834225525ae1e794a460cda75efcbac"},{"url":"/virtualbox-vagrant-laravel-arch-linux/index.html","revision":"721f7891a946466ddc66c4ee3d5cfd67"},{"url":"/linux-codeigniter-son-surum-nasl/index.html","revision":"7c9d0616eacad410ef7e046d24ac0ec5"},{"url":"/arch-linux-apachelampp-sanal-sunucu/index.html","revision":"3bab86be66623bf83ef4093522455cf2"},{"url":"/404.html","revision":"8d098c57f60b9b12e2833cdee79f5838"},{"url":"/jekyll-staticman-eklentisi/index.html","revision":"ddf338d16762897a271cac2e7d4c82f9"},{"url":"/imap-openssl-terminalde-kullanim/index.html","revision":"9ca19b2e6e272da7c472742cce35031a"},{"url":"/arch-linux-lampp-kurulumuphp7xmariadbmy/index.html","revision":"e1bcff2a3098c3a6829246ad4440fe5b"},{"url":"/windows-uzerinden-paylaslan-dosya-ve/index.html","revision":"3a9de95f0b8e9df0cda556344cbcc449"},{"url":"/xampp-kullanarak-localhosta-ozel-alan/index.html","revision":"8ac42b7a58d268334199f19a00569ff2"},{"url":"/git-ssh-key-olusturma-windows/index.html","revision":"a662a2a53e8d6d7658f38ce569a4a338"},{"url":"/newsboat-kullanimi/index.html","revision":"e411497ad2753082df430522c0c1421f"},{"url":"/tavsiye-ettigim-programlar-ve-uygulamalar/index.html","revision":"b1c7bba5965a73ed0ff07cf4ad20e43e"},{"url":"/windows-uzerinde-redshift-kullanm/index.html","revision":"7603f39492f98893330775779e322da1"},{"url":"/guncel-ucretsiz-steam-gog-epic-oyunlari/index.html","revision":"319f9805598700b8a170312c615568dd"},{"url":"/linux-ekran-karti-kurulumu/index.html","revision":"9b2f59b57af1fa761dfdbcc2be5a519f"},{"url":"/onemli-gelismeler/index.html","revision":"9b4657c1746e57f641aba8958fa1e303"},{"url":"/facebook-toplu-grup-2021/index.html","revision":"18ca09b94096d4077fd1fed031094b3c"},{"url":"/composer-yavas-indirme-sorunu-cozumu/index.html","revision":"387ddb4b9d7a9747ca6ba0c4728bc863"},{"url":"/linux-ozellestirebilir-mp3-oynatcs/index.html","revision":"be7648980d62a1120fcab610d8020e71"},{"url":"/vagrant-virtualbox-61-ile-uyumlu-hale/index.html","revision":"fc6d55ea1cde5519d16721824beefc4b"},{"url":"/laravel-ide-helper-kullanimi/index.html","revision":"d0ff5c3d9d3af72a6bcad3fb188da283"},{"url":"/spotifydan-muzik-nasl-indirilir-resimli/index.html","revision":"0a927057bd66a01a87657ee2a4b1590c"},{"url":"/zsh-icerisine-shopt-kullanmak/index.html","revision":"34133cbc25d0e9f269d9d3fd714fe2df"},{"url":"/jekyll-google-superproxy/","revision":"1521819fb8625fd030e7f12bb0d30c54"},{"url":"/jekyll-staticman-eklentisi/","revision":"07846aad8a547f83a1e83466d2f0f1b3"},{"url":"/openvpn-nasil-kurulur/","revision":"e2c8e06471fce3f9aca211bec8712469"},{"url":"/onemli-gelismeler/","revision":"48d5aa5d209346a3aae61c2d2cb7c815"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/","revision":"b805b3fd46e6c1322e7fa0cc2b0a3c5c"},{"url":"/facebook-toplu-grup-2021/","revision":"695ac341bdd7ed043e7f3fd1896ddbc3"},{"url":"/elektronik-sigara-zararlimi-faydalimi/","revision":"2c2dc3f9f94a563409b952ea410da5d0"},{"url":"/newsboat-kullanimi/","revision":"4fe49aaf17b567b5fd3b5825f912f67e"}];

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

