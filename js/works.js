/* =========================================================
   WORK FILTER
========================================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;


        /* 移除所有 active */
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        /* 当前按钮 active */
        button.classList.add("active");


        /* 筛选作品 */
        portfolioCards.forEach(card => {

            const category = card.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});



/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox = document.getElementById("workLightbox");
const lightboxInner = document.getElementById("lightboxInner");
const lightboxClose = document.getElementById("lightboxClose");



/* =========================================================
   打开 Lightbox
========================================================= */

function openLightbox() {

    if (!lightbox) return;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}



/* =========================================================
   关闭 Lightbox
========================================================= */

function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("active");

    document.body.style.overflow = "";


    setTimeout(() => {

        if (lightboxInner) {
            lightboxInner.innerHTML = "";
        }

    }, 400);

}



/* =========================================================
   图片全屏
========================================================= */

document
    .querySelectorAll(".portfolio-media img")
    .forEach(image => {

        image.addEventListener("click", () => {

            if (!lightboxInner) return;


            lightboxInner.innerHTML = "";


            const newImage = document.createElement("img");

            newImage.src = image.src;

            newImage.alt = image.alt;


            lightboxInner.appendChild(newImage);


            openLightbox();

        });

    });



/* =========================================================
   视频全屏
========================================================= */

document
    .querySelectorAll(".portfolio-media video")
    .forEach(video => {

        video.addEventListener("click", event => {

            event.preventDefault();


            if (!lightboxInner) return;


            lightboxInner.innerHTML = "";


            const newVideo = document.createElement("video");


            newVideo.src =
                video.currentSrc ||
                video.querySelector("source")?.src;


            newVideo.controls = true;

            newVideo.autoplay = true;

            newVideo.loop = true;

            newVideo.playsInline = true;


            lightboxInner.appendChild(newVideo);


            openLightbox();


            newVideo.play().catch(() => {});

        });

    });



/* =========================================================
   关闭按钮
========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}



/* =========================================================
   点击黑色背景关闭
========================================================= */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {

                closeLightbox();

            }

        }
    );

}



/* =========================================================
   ESC 关闭
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeLightbox();

        }

    }
);
