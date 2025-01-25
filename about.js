import { OceanScene } from './ocean.js';
import { initNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
    // 初始化海面背景
    const oceanScene = new OceanScene();
    oceanScene.animate();
    initNavigation();

    // 初始化技能条
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const level = bar.dataset.level;
        bar.style.setProperty('--level', `${level}%`);
    });
}); 