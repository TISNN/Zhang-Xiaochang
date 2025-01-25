import { OceanScene } from './ocean.js';
import { initNavigation } from './navigation.js';

// 等待 DOM 加载完成后初始化场景
document.addEventListener('DOMContentLoaded', () => {
    const oceanScene = new OceanScene();
    oceanScene.animate();
    initNavigation();

    // 其他代码...
});

// 鼠标跟随效果
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.card');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - cardX;
        const distanceY = mouseY - cardY;
        
        const rotateY = 35 + (distanceX * 0.01);
        const rotateZ = -2 + (distanceY * 0.01);
        
        card.style.transform = `rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    });
});

// 卡片点击效果
document.querySelectorAll('.card').forEach((card, index) => {
    card.style.zIndex = -index;
    
    card.addEventListener('click', function() {
        const projectView = document.querySelector('.project-view');
        const projectImage = projectView.querySelector('.project-image img');
        const projectTitle = projectView.querySelector('.project-title');
        
        // 获取当前卡片的图片和标题
        const cardImage = this.querySelector('img');
        const cardTitle = this.dataset.title;
        
        // 设置项目展示页的内容
        projectImage.src = cardImage.src;
        projectTitle.textContent = cardTitle;
        
        // 显示项目展示页
        projectView.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// 关闭按钮点击事件
document.querySelector('.close-view').addEventListener('click', () => {
    document.querySelector('.project-view').classList.remove('active');
    document.body.style.overflow = '';
});

// 点击空白处关闭
document.addEventListener('click', (e) => {
    if (!e.target.closest('.card') && !e.target.closest('.close-button')) {
        const activeCard = document.querySelector('.card.active');
        if (activeCard) {
            activeCard.classList.remove('active');
            document.body.style.overflow = '';
            
            setTimeout(() => {
                activeCard.style.position = '';
                activeCard.style.left = '';
                activeCard.style.top = '';
                activeCard.style.width = '';
                activeCard.style.height = '';
            }, 1000);
        }
    }
});

// 为每张卡片添加位置偏移变量
document.querySelectorAll('.card').forEach((card, index) => {
    card.style.setProperty('--offset', index);
    
    // 鼠标移动时的3D效果
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 30;
        const angleY = (x - centerX) / 30;
        
        card.style.transform = `
            translateZ(${200 - index * 50}px)
            rotateX(${-angleX}deg)
            rotateY(${angleY + 35}deg)
            scale(${card.classList.contains('hover') ? 1.1 : 1})
        `;
    });
    
    // 恢复原始位置
    card.addEventListener('mouseleave', () => {
        card.style.transform = `
            translateX(${index * -30}px)
            translateZ(${200 - index * 50}px)
            rotateY(35deg)
        `;
    });
});

// CV 预览功能
document.getElementById('cv-link').addEventListener('click', function(e) {
    e.preventDefault();
    
    // 直接在新窗口打开 PDF
    window.open('./Xiaochang Zhang CV.pdf', '_blank');
}); 