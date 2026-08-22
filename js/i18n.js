/* =========================================================
   AUTO LANGUAGE / LANGUAGE SWITCHER
   - Detects browser language automatically.
   - Chinese (zh-*) -> 中文
   - Other languages -> English
   - Manual choice is remembered in localStorage.
========================================================= */

(() => {
    const STORAGE_KEY = "xiohu-language";

    const translations = {
        "首页": "Home",
        "关于我": "About Me",
        "我的能力": "My Skills",
        "我的作品": "My Works",
        "联系我": "Contact Me",
        "摄影": "Photography",
        "一名热爱视觉设计、网页设计与创意创作的设计师。": "A designer passionate about visual design, web design and creative work.",
        "我喜欢通过设计将想法转化为视觉作品。": "I enjoy turning ideas into visual work through design.",
        "查看我的作品": "View My Works",
        "关于我": "About Me",
        "我的能力": "My Skills",
        "设计工具": "Design Tools",
        "我的作品": "My Works",
        "你好，我是 Xiaohu。": "Hello, I'm Xiaohu.",
        "我是一名专注于视觉设计与数字创作的设计师。": "I am a designer focused on visual design and digital creation.",
        "我喜欢研究不同的设计风格，并尝试将艺术、设计与技术结合在一起。": "I enjoy exploring different design styles and combining art, design and technology.",
        "我的设计方向包括平面设计、网页设计、UI设计、插画以及品牌视觉设计等。": "My design areas include graphic design, web design, UI design, illustration and brand visual design.",
        "海报、宣传设计、排版、视觉设计。": "Posters, promotional design, typography and visual design.",
        "网页视觉设计、UI设计、网页排版。": "Web visual design, UI design and web layout.",
        "数字插画、角色设计、概念设计。": "Digital illustration, character design and concept design.",
        "动画、视频编辑、动态视觉设计。": "Animation, video editing and motion visual design.",
        "品牌视觉设计": "Brand Visual Design",
        "品牌 Logo、包装以及视觉系统设计。": "Brand logos, packaging and visual identity systems.",
        "摄影拍摄": "Photography",
        "野外，生活与产品拍摄": "Outdoor, lifestyle and product photography.",
        "角色设计": "Character Design",
        "原创角色与数字插画作品。": "Original characters and digital illustration.",
        "动态设计": "Motion Design",
        "视频、动画以及动态视觉作品。": "Video, animation and motion visual work.",
        "春节": "Chinese New Year",
        "Produk": "Product",
        "GET IN TOUCH": "GET IN TOUCH",
        "Let's connect": "Let's connect",
        "with me.": "with me.",
        "抖音": "Douyin",
        "小红书": "Xiaohongshu",
        "关闭": "Close",
        "ALL MY WORKS": "ALL MY WORKS",
        "全部": "All",
        "品牌设计": "Brand Design",
        "插画": "Illustration",
        "动画": "Motion",
        "原创角色设计": "Original Character Design",
        "生活、环境与人物摄影作品。": "Lifestyle, environment and portrait photography.",
        "产品摄影": "Product Photography",
        "产品与商业视觉摄影。": "Product and commercial visual photography.",
        "动态视觉设计": "Motion Visual Design",
        "极简人物设计": "Minimal Character Design",
        "极简的卡通人物设计": "Minimal cartoon character design",
        "您的浏览器不支持视频播放。": "Your browser does not support video playback.",
        "返回首页": "Back to Home",
        "BACK TO HOME": "BACK TO HOME",
        "VIEW WORK ↗": "VIEW WORK ↗",
        "VIEW PHOTO ↗": "VIEW PHOTO ↗",
        "VIEW VIDEO ↗": "VIEW VIDEO ↗",
        "我的作品": "My Works",
        "摄影作品 01": "Photography 01",
        "摄影作品 02": "Photography 02",
        "品牌视觉设计": "Brand Visual Design",
        "原创角色设计": "Original Character Design",
        "春节摄影": "Chinese New Year Photography",
        "产品摄影": "Product Photography",
        "动态视觉设计": "Motion Visual Design"
    };

    const reverse = {};
    Object.entries(translations).forEach(([zh, en]) => {
        reverse[en] = zh;
    });

    function getLanguage() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "zh" || saved === "en") return saved;

        const browser = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
        return browser.toLowerCase().startsWith("zh") ? "zh" : "en";
    }

    function translateTextNode(node, language) {
        const value = node.nodeValue;
        const normalized = value.replace(/\s+/g, " ").trim();
        if (!normalized) return;

        const target = language === "en" ? translations[normalized] : reverse[normalized];
        if (!target) return;

        const leading = value.match(/^\s*/)?.[0] || "";
        const trailing = value.match(/\s*$/)?.[0] || "";
        node.nodeValue = leading + target + trailing;
    }

    function translateAttributes(language) {
        const attrs = ["alt", "title", "aria-label"];
        document.querySelectorAll("*").forEach(element => {
            attrs.forEach(attr => {
                if (!element.hasAttribute(attr)) return;
                const value = element.getAttribute(attr);
                const target = language === "en" ? translations[value] : reverse[value];
                if (target) element.setAttribute(attr, target);
            });
        });
    }

    function translatePage(language) {
        document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(node => translateTextNode(node, language));
        translateAttributes(language);

        if (document.title === "My Works - XioHu" || document.title === "我的作品 - XioHu") {
            document.title = language === "en" ? "My Works - XioHu" : "我的作品 - XioHu";
        }

        document.querySelectorAll("[data-language-switch]").forEach(button => {
            button.textContent = language === "en" ? "中文" : "EN";
            button.setAttribute("aria-label", language === "en" ? "Switch to Chinese" : "切换到英文");
        });
    }

    function addSwitcher() {
        if (document.querySelector("[data-language-switch]")) return;

        const nav = document.querySelector(".navbar nav");
        if (!nav) return;

        const button = document.createElement("button");
        button.type = "button";
        button.dataset.languageSwitch = "true";
        button.className = "language-switch";
        button.style.cssText = "margin-left:12px;padding:8px 12px;border:1px solid currentColor;background:transparent;color:inherit;cursor:pointer;font:inherit;";

        button.addEventListener("click", () => {
            const current = getLanguage();
            const next = current === "en" ? "zh" : "en";
            localStorage.setItem(STORAGE_KEY, next);
            location.reload();
        });

        nav.appendChild(button);
    }

    document.addEventListener("DOMContentLoaded", () => {
        addSwitcher();
        translatePage(getLanguage());
    });
})();
