/* =========================================================
   WORK FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const portfolioCards =
    document.querySelectorAll(".portfolio-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.dataset.filter;


        /* 移除所有 active */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        /* 当前按钮 */

        button.classList.add("active");


        /* 筛选作品 */

        portfolioCards.forEach((card, index) => {

            const category =
                card.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hidden");


                /* 重新播放出现动画 */

                card.style.animation = "none";

                void card.offsetWidth;

                card.style.animation =
                    `cardReveal 0.7s cubic-bezier(.16,1,.3,1) ${index * 0.08}s both`;


            } else {

                card.classList.add("hidden");

            }

        });

    });

});



/* =========================================================
   LIGHTBOX ELEMENTS
========================================================= */

const lightbox =
    document.getElementById("workLightbox");

const lightboxInner =
    document.getElementById("lightboxInner");

const lightboxClose =
    document.getElementById("lightboxClose");



/* =========================================================
   OPEN LIGHTBOX
========================================================= */

function openLightbox() {

    if (!lightbox) return;


    lightbox.classList.add("active");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}



/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    if (!lightbox) return;


    lightbox.classList.remove("active");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    setTimeout(() => {

        if (lightboxInner) {

            lightboxInner.innerHTML = "";

        }

    }, 400);

}



/* =========================================================
   IMAGE LIGHTBOX
========================================================= */

document
    .querySelectorAll(".portfolio-media img")
    .forEach(image => {


        image.addEventListener(
            "click",
            () => {


                if (!lightboxInner) return;


                /* 清空 */

                lightboxInner.innerHTML =
                    "";


                /* 创建新图片 */

                const newImage =
                    document.createElement("img");


                newImage.src =
                    image.currentSrc ||
                    image.src;


                newImage.alt =
                    image.alt;


                lightboxInner.appendChild(
                    newImage
                );


                openLightbox();

            }
        );

    });



/* =========================================================
   VIDEO LIGHTBOX
========================================================= */

document
    .querySelectorAll(".portfolio-media video")
    .forEach(video => {


        video.addEventListener(
            "click",
            event => {


                event.preventDefault();


                if (!lightboxInner) return;


                /* 清空 */

                lightboxInner.innerHTML =
                    "";


                /* 创建视频 */

                const newVideo =
                    document.createElement("video");


                newVideo.src =
                    video.currentSrc ||
                    video.querySelector(
                        "source"
                    )?.src ||
                    "";


                newVideo.controls =
                    true;


                newVideo.autoplay =
                    true;


                newVideo.loop =
                    true;


                newVideo.playsInline =
                    true;


                newVideo.setAttribute(
                    "playsinline",
                    ""
                );


                lightboxInner.appendChild(
                    newVideo
                );


                openLightbox();


                /* 播放 */

                newVideo
                    .play()
                    .catch(() => {});

            }
        );

    });



/* =========================================================
   CLOSE BUTTON
========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}



/* =========================================================
   CLICK BACKGROUND TO CLOSE
========================================================= */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {


            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );

}



/* =========================================================
   ESC CLOSE
========================================================= */

document.addEventListener(
    "keydown",
    event => {


        if (
            event.key === "Escape" &&
            lightbox &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    }
);



/* =========================================================
   CLICK LIGHTBOX CONTENT
   防止点击图片本身关闭
========================================================= */

if (lightboxInner) {

    lightboxInner.addEventListener(
        "click",
        event => {

            event.stopPropagation();

        }
    );

}
