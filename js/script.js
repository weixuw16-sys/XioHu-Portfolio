/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    '.section-title, ' +
    '.about-content > div, ' +
    '.skill-card, ' +
    '.software-list span, ' +
    '.work-card, ' +
    '.photo-item, ' +
    '.contact > *, ' +
    'footer'
);


revealElements.forEach((element, index) => {

    element.classList.add('reveal');

    // 每个元素稍微延迟一点
    element.style.setProperty(
        '--delay',
        `${(index % 4) * 0.12}s`
    );

});


const observer = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('show');

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(element => {

    observer.observe(element);

});
/* =========================
   FULLSCREEN LIGHTBOX
========================= */

const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const lightboxClose = document.getElementById("lightboxClose");


/* =========================
   图片
========================= */

document.querySelectorAll(
    ".work-image img, .photo-item img, .hero-image img"
).forEach(image => {

    image.style.cursor = "pointer";

    image.addEventListener("click", function () {

        lightboxContent.innerHTML = "";

        const newImage = document.createElement("img");

        newImage.src = this.src;

        newImage.alt = this.alt;

        lightboxContent.appendChild(newImage);

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


/* =========================
   视频
========================= */

document.querySelectorAll(
    ".work-image video"
).forEach(video => {

    video.style.cursor = "pointer";

    video.addEventListener("click", function (event) {

        event.preventDefault();

        lightboxContent.innerHTML = "";

        const newVideo = document.createElement("video");

        newVideo.src = this.currentSrc || this.querySelector("source").src;

        newVideo.controls = true;

        newVideo.autoplay = true;

        newVideo.loop = true;

        newVideo.playsInline = true;

        lightboxContent.appendChild(newVideo);

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

        newVideo.play();

    });

});


/* =========================
   关闭
========================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

    setTimeout(() => {

        lightboxContent.innerHTML = "";

    }, 400);

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


/* 点击黑色背景关闭 */

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* ESC 关闭 */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeLightbox();

    }

});