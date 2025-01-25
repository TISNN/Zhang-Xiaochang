import { OceanScene } from './ocean.js';
import { initNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
    // 初始化海面背景
    const oceanScene = new OceanScene();
    oceanScene.animate();
    initNavigation();
}); 