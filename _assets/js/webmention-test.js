// Webmention.io API test aracı
(function () {
    // Token ve API endpoint
    const apiToken = "-WNw5YpxvCMIj8LDM0bScg";
    const apiEndpoint = `https://webmention.io/api/mentions.jf2?token=${apiToken}&per-page=20`;

    console.log("Webmention API Test Aracı");
    console.log("-------------------------");
    console.log("API Endpoint:", apiEndpoint);

    // DOM elementlerini oluştur
    function createTestUI() {
        // Test container oluştur
        const container = document.createElement("div");
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            padding: 20px;
            z-index: 9999;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #333;
            line-height: 1.5;
        `;

        // URL düzenleme fonksiyonu
        function formatTestUrl(url) {
            if (url.includes("localhost:8000")) {
                return url.replace("http://localhost:8000", "https://yuceltoluyag.dev");
            }
            return url;
        }

        // Başlık
        const title = document.createElement("h3");
        title.textContent = "Webmention Test Aracı";
        title.style.cssText =
            "margin-top: 0; margin-bottom: 16px; color: #1a365d; font-size: 18px; font-weight: 600; border-bottom: 2px solid #edf2f7; padding-bottom: 10px;";
        container.appendChild(title);

        // URL giriş alanı
        const inputWrapper = document.createElement("div");
        inputWrapper.style.cssText = "margin-bottom: 20px;";

        const urlLabel = document.createElement("label");
        urlLabel.textContent = "Test edilecek URL:";
        urlLabel.style.cssText =
            "display: block; margin-bottom: 8px; font-weight: 600; color: #4a5568; font-size: 14px;";
        inputWrapper.appendChild(urlLabel);

        const urlInput = document.createElement("input");
        urlInput.type = "text";
        urlInput.value = formatTestUrl(window.location.href.split("#")[0].split("?")[0]);
        urlInput.style.cssText =
            "width: 100%; padding: 10px; box-sizing: border-box; margin-bottom: 15px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px;";
        inputWrapper.appendChild(urlInput);

        // URL bilgi metni
        const urlInfo = document.createElement("div");
        urlInfo.style.cssText = "margin-bottom: 15px; font-size: 13px; color: #718096;";
        if (window.location.href.includes("localhost")) {
            urlInfo.innerHTML = `
                <strong style="color: #4a5568;">Not:</strong> Localhost ortamında test yapıyorsunuz. 
                URL otomatik olarak production adresine çevrildi. Production URL: 
                <span style="color: #2b6cb0;">${formatTestUrl(window.location.href)}</span>
            `;
        }
        inputWrapper.appendChild(urlInfo);

        // Buton konteyner
        const buttonContainer = document.createElement("div");
        buttonContainer.style.cssText = "display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;";

        // Butonlar
        const testButton = document.createElement("button");
        testButton.textContent = "Bu URL için Webmention'ları Göster";
        testButton.style.cssText = `
            padding: 10px 15px; 
            background: #3182ce; 
            color: white; 
            border: none; 
            border-radius: 6px; 
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.2s;
            flex-grow: 1;
        `;
        testButton.onmouseover = () => {
            testButton.style.background = "#2c5282";
        };
        testButton.onmouseout = () => {
            testButton.style.background = "#3182ce";
        };
        buttonContainer.appendChild(testButton);

        const allButton = document.createElement("button");
        allButton.textContent = "Tüm Webmention'ları Göster";
        allButton.style.cssText = `
            padding: 10px 15px; 
            background: #38a169; 
            color: white; 
            border: none; 
            border-radius: 6px; 
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.2s;
            flex-grow: 1;
        `;
        allButton.onmouseover = () => {
            allButton.style.background = "#2f855a";
        };
        allButton.onmouseout = () => {
            allButton.style.background = "#38a169";
        };
        buttonContainer.appendChild(allButton);

        inputWrapper.appendChild(buttonContainer);
        container.appendChild(inputWrapper);

        // Sonuçlar alanı
        const resultsContainer = document.createElement("div");
        resultsContainer.style.cssText =
            "background-color: #f8fafc; border-radius: 6px; padding: 15px; margin-top: 10px; max-height: 50vh; overflow-y: auto;";
        container.appendChild(resultsContainer);

        // Kapatma butonu
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "&times;"; // × işareti
        closeButton.style.cssText = `
            position: absolute; 
            top: 15px; 
            right: 15px; 
            background: none; 
            border: none; 
            font-size: 24px;
            color: #a0aec0;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s, color 0.2s;
        `;
        closeButton.onmouseover = () => {
            closeButton.style.background = "#fee2e2";
            closeButton.style.color = "#e53e3e";
        };
        closeButton.onmouseout = () => {
            closeButton.style.background = "none";
            closeButton.style.color = "#a0aec0";
        };
        closeButton.addEventListener("click", () => container.remove());
        container.appendChild(closeButton);

        // Event listeners
        testButton.addEventListener("click", () => {
            fetchWebmentions(urlInput.value, resultsContainer);
        });

        allButton.addEventListener("click", () => {
            fetchAllWebmentions(resultsContainer);
        });

        document.body.appendChild(container);
    }

    // Belirli URL için webmention'ları getir
    function fetchWebmentions(url, resultsContainer) {
        resultsContainer.innerHTML =
            '<p style="text-align:center; padding: 20px; color: #718096;"><iconify-icon icon="tabler:loader-2" width="24" height="24" class="spin"></iconify-icon> Webmention\'lar yükleniyor...</p>';

        const endpoint = `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(url)}&token=${apiToken}`;

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                displayResults(data, resultsContainer);
            })
            .catch((error) => {
                resultsContainer.innerHTML = `<p style="color: #e53e3e; padding: 15px; background-color: #fff5f5; border-radius: 6px;">Hata: ${error.message}</p>`;
                console.error("Webmention API hatası:", error);
            });
    }

    // Tüm webmention'ları getir
    function fetchAllWebmentions(resultsContainer) {
        resultsContainer.innerHTML =
            '<p style="text-align:center; padding: 20px; color: #718096;"><iconify-icon icon="tabler:loader-2" width="24" height="24" class="spin"></iconify-icon> Tüm webmention\'lar yükleniyor...</p>';

        fetch(apiEndpoint)
            .then((response) => response.json())
            .then((data) => {
                displayResults(data, resultsContainer);
            })
            .catch((error) => {
                resultsContainer.innerHTML = `<p style="color: #e53e3e; padding: 15px; background-color: #fff5f5; border-radius: 6px;">Hata: ${error.message}</p>`;
                console.error("Webmention API hatası:", error);
            });
    }

    // Sonuçları göster
    function displayResults(data, resultsContainer) {
        if (!data.children || data.children.length === 0) {
            resultsContainer.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #718096; background-color: #f8fafc; border-radius: 6px;">
                    <iconify-icon icon="tabler:message-off" width="40" height="40"></iconify-icon>
                    <p style="margin-top: 10px;">Hiç webmention bulunamadı.</p>
                    <p style="font-size: 13px; color: #a0aec0;">Webmention göndermek için bu sayfaya bağlantı veren bir blog yazısı yayınlayın veya <a href="https://telegraph.p3k.io/" target="_blank" style="color: #4299e1; text-decoration: underline;">Telegraph</a> kullanın.</p>
                </div>
            `;
            return;
        }

        const mentions = data.children;

        let html = `
            <div style="margin-bottom: 15px; padding: 10px; background-color: #ebf8ff; border-radius: 6px; color: #2c5282;">
                <iconify-icon icon="tabler:info-circle" style="vertical-align: middle; margin-right: 5px;"></iconify-icon>
                <span style="font-weight: 500;">${mentions.length} webmention bulundu</span>
            </div>
        `;

        mentions.forEach((mention) => {
            html += `
                <div style="margin-bottom: 20px; padding: 15px; background-color: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="display: flex; margin-bottom: 12px; align-items: center;">
                        ${
                            mention.author && mention.author.photo
                                ? `<img src="${mention.author.photo}" alt="${
                                      mention.author.name || "Yazar"
                                  }" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 12px; object-fit: cover;">`
                                : `<div style="width: 40px; height: 40px; border-radius: 50%; background-color: #e2e8f0; display: flex; align-items: center; justify-content: center; margin-right: 12px;"><iconify-icon icon="tabler:user" style="color: #718096;"></iconify-icon></div>`
                        }
                        <div>
                            ${
                                mention.author && mention.author.name
                                    ? `<div style="font-weight: 600; color: #2d3748;">${mention.author.name}</div>`
                                    : `<div style="font-weight: 600; color: #2d3748;">Anonim</div>`
                            }
                            ${
                                mention.published
                                    ? `<div style="font-size: 12px; color: #718096;">${new Date(
                                          mention.published
                                      ).toLocaleString("tr-TR", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                      })}</div>`
                                    : ``
                            }
                        </div>
                    </div>
                    ${
                        mention.content && mention.content.text
                            ? `<div style="padding: 10px 0; margin-bottom: 10px; border-bottom: 1px solid #edf2f7; color: #4a5568; font-size: 14px; line-height: 1.6;">${mention.content.text}</div>`
                            : ``
                    }
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
                        <a href="${
                            mention.url
                        }" target="_blank" style="color: #4299e1; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;">
                            <iconify-icon icon="tabler:external-link"></iconify-icon> Kaynağa git
                        </a>
                        <div style="color: #a0aec0;">
                            Hedef: ${mention.target.split("//")[1].split("/")[0]}
                        </div>
                    </div>
                </div>
            `;
        });

        resultsContainer.innerHTML = html;

        // Ikon animasyonu için stil ekle
        const style = document.createElement("style");
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .spin {
                animation: spin 1s linear infinite;
            }
        `;
        document.head.appendChild(style);
    }

    // Sayfaya eklenmesi için bir bağlantı oluştur
    function createTestLauncher() {
        const launcher = document.createElement("div");
        launcher.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #3182ce, #2c5282);
            color: white;
            padding: 12px 18px;
            border-radius: 30px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            z-index: 9998;
            font-family: system-ui, -apple-system, sans-serif;
            font-weight: 500;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: transform 0.2s, box-shadow 0.2s;
        `;
        launcher.innerHTML =
            '<iconify-icon icon="tabler:messages" width="18" height="18"></iconify-icon> Webmention Test';

        launcher.onmouseover = () => {
            launcher.style.transform = "translateY(-2px)";
            launcher.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
        };
        launcher.onmouseout = () => {
            launcher.style.transform = "translateY(0)";
            launcher.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
        };

        launcher.addEventListener("click", () => {
            launcher.remove();
            createTestUI();
        });

        document.body.appendChild(launcher);
    }

    // Sayfa tamamen yüklendikten sonra test aracını başlat
    window.addEventListener("load", createTestLauncher);
})();
