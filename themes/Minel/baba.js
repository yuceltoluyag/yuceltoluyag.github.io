const fs = require("fs");
const path = require("path");
const terser = require("terser");
const babel = require("@babel/core");

const inputDir = path.join(__dirname, "_assets/js"); // Kaynak dosyaların bulunduğu dizin
const outputDir = path.join(__dirname, "static/js"); // Çıktı dosyalarının yazılacağı dizin

// static/js klasörünün var olup olmadığını kontrol et ve yoksa oluştur
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Klasördeki tüm dosyaları oku
fs.readdirSync(inputDir).forEach((file) => {
    if (file.endsWith(".js")) {
        const filePath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);

        // Kaynak dosyayı oku
        const code = fs.readFileSync(filePath, "utf-8");

        // Babel ile ES6+ kodunu dönüştür
        babel.transform(code, { presets: ["@babel/preset-env"] }, (err, result) => {
            if (err) {
                console.error("Babel hatası:", err);
                return;
            }

            // Terser ile küçültme işlemi yap
            terser.minify(result.code).then((minified) => {
                if (minified.error) {
                    console.error("Terser hatası:", minified.error);
                } else {
                    // Küçültülmüş ve dönüştürülmüş dosyayı yaz
                    fs.writeFileSync(outputPath, minified.code);
                    console.log(`${file} başarıyla dönüştürüldü ve küçültüldü.`);
                }
            });
        });
    }
});
