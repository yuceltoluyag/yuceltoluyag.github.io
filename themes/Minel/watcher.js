const chokidar = require('chokidar');
const path = require('path');  // path modülünü ekliyoruz
const { exec } = require('child_process');

// Kaynak dosyaların bulunduğu dizin
const inputDir = path.join(__dirname, '_assets/js');

// Watcher, dosyaları izler ve değişiklik olduğunda `baba.js` dosyasını çalıştırır
chokidar.watch(inputDir, { persistent: true, ignoreInitial: true })
  .on('change', (path) => {
    console.log(`${path} dosyasında değişiklik yapıldı!`);
    exec('npm run build:js', (err, stdout, stderr) => {
      if (err) {
        console.error(`Hata: ${stderr}`);
        return;
      }
      console.log(`Çıktı: ${stdout}`);
    });
  });

console.log('JS dosyaları izleniyor...');
