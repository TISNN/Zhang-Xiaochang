export function initNavigation() {
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        // 只处理站内链接
        if (link.href.includes(window.location.origin)) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.href;

                // 直接加载新页面
                window.location.href = target;
            });
        }
    });
} 