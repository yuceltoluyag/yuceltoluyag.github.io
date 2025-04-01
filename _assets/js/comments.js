"use strict";
// Daha modern ve strict-mode uyumlu yaklaşım
(function () {
    // Genel yardımcı fonksiyonlar
    const select = (selector) => document.querySelector(selector);
    const getById = (id) => document.getElementById(id);

    // Global addComment nesnesi
    window.addComment = window.addComment || {};

    // Form elemanları
    const submitButton = select("#comment-form-submit");
    const commentForm = select(".js-form");

    // Modal işleme fonksiyonu
    function showModal(title, message) {
        const modalTitle = select(".js-modal-title");
        const modalText = select(".js-modal-text");

        if (modalTitle) modalTitle.textContent = title;
        if (modalText) modalText.innerHTML = message;

        select("body").classList.add("show-modal");
    }

    // Form sıfırlama
    if (commentForm) {
        commentForm.doReset = function () {
            if (submitButton) submitButton.innerHTML = "Gönder";
            this.classList.remove("disabled");
            if (window.grecaptcha) grecaptcha.reset();
        };

        // Form gönderimi
        commentForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (submitButton) {
                submitButton.innerHTML =
                    '<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Gönderiliyor...';
            }

            const handleError = function (title, error) {
                console.error(error);
                showModal(title, "Bilinmeyen Bir Hata Oluştu.<br>[" + (error.errorCode || "Hata") + "]");
                commentForm.doReset();
            };

            commentForm.classList.add("disabled");

            // Form gönderimi
            fetch(this.getAttribute("action"), {
                method: "POST",
                body: new URLSearchParams(new FormData(this)),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Origin: window.location.origin,
                },
                mode: "cors",
            })
                .then(function (response) {
                    console.log("Staticman yanıt:", response);

                    if (response.ok) {
                        // Başarı mesajı
                        showModal(
                            "Yorum gönderildi",
                            'Teşekkürler! Yorumunuz <a href="https://github.com/yuceltoluyag/yuceltoluyag.github.io/pulls">beklemede</a>. Onaylandığında görünecektir.'
                        );
                        commentForm.reset();
                        commentForm.doReset();
                    } else {
                        response
                            .json()
                            .then(function (data) {
                                handleError("Sunucu Hatası", data);
                            })
                            .catch(function () {
                                handleError("JSON Ayrıştırma Hatası", { message: "Sunucu yanıtı ayrıştırılamadı" });
                            });
                    }
                })
                .catch(function (error) {
                    console.error("Form gönderim hatası:", error);
                    handleError("Form Gönderim Hatası", error);
                });
        });
    }

    // Modal kapatma
    const closeModalButton = select(".js-close-modal");
    if (closeModalButton) {
        closeModalButton.addEventListener("click", function () {
            select("body").classList.remove("show-modal");
        });
    }

    // Yorum yanıtlama fonksiyonu
    window.addComment.moveForm = function (commentId, respondId, replyToUid) {
        const comment = getById(commentId);
        const respond = getById(respondId);
        const cancelButton = getById("cancel-comment-reply-link");
        const replyingToField = getById("comment-replying-to-uid");

        if (!comment || !respond || !cancelButton || !replyingToField) {
            return false;
        }

        // Geçici div oluşturma
        let tempDiv = getById("sm-temp-form-div");
        if (!tempDiv) {
            tempDiv = document.createElement("div");
            tempDiv.id = "sm-temp-form-div";
            tempDiv.style.display = "none";
            respond.parentNode.insertBefore(tempDiv, respond);
        }

        // Yanıt formunu yorumun altına taşı
        comment.parentNode.insertBefore(respond, comment.nextSibling);
        replyingToField.value = replyToUid;
        cancelButton.style.display = "";

        // İptal butonu işlevi
        cancelButton.onclick = function () {
            const tempDiv = getById("sm-temp-form-div");
            const respond = getById(respondId);

            if (tempDiv && respond) {
                replyingToField.value = "";
                tempDiv.parentNode.insertBefore(respond, tempDiv);
                tempDiv.parentNode.removeChild(tempDiv);
                this.style.display = "none";
                this.onclick = null;
                return false;
            }
        };

        return false;
    };
})();
//# sourceMappingURL=comments.js.map
