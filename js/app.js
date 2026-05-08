// 主应用
class WebToolApp {
    constructor() {
        this.currentTool = null;
        this.panelManager = null;
        this.init();
    }

    init() {
        // 初始化面板管理器
        this.panelManager = panelManager;

        this.setupGlobalEventListeners();
        this.initAllTools();
        this.setupWindowFunctions();
    }

    setupWindowFunctions() {
        // 将函数挂载到 window 对象，供 HTML 中的 onclick 使用
        window.switchTool = (toolName) => this.switchTool(toolName);
        window.showHome = () => this.showHome();
        window.filterTools = (category) => this.filterTools(category);
        window.toggleMobileMenu = () => this.toggleMobileMenu();

        // 工具函数
        window.convertImage = () => ImageConverter.convert();
        window.downloadConvertedImage = () => ImageConverter.download();
        window.removeImage = () => ImageConverter.removeImage();
        window.generateMD5 = () => MD5Tool.generate();
        window.copyMD5 = () => MD5Tool.copy();
        window.toTraditional = () => SimplifiedTraditional.convertToTraditional();
        window.toSimplified = () => SimplifiedTraditional.convertToSimplified();
        window.copySTResult = () => SimplifiedTraditional.copy();
        window.generateQRCode = () => QRCodeTool.generate();
        window.downloadQRCode = () => QRCodeTool.download();
        window.setBase64Mode = (mode) => Base64Tool.setMode(mode);
        window.processBase64 = () => Base64Tool.process();
        window.copyBase64Result = () => Base64Tool.copy();
        window.setUrlMode = (mode) => URLCodec.setMode(mode);
        window.processUrl = () => URLCodec.process();
        window.copyUrlResult = () => URLCodec.copy();
        window.convertColor = () => ColorConverter.convert();
        window.copyColorValue = (id) => ColorConverter.copyValue(id);
        window.updateCurrentTimestamp = () => TimestampTool.updateCurrentTimestamp();
        window.timestampToDate = () => TimestampTool.timestampToDate();
        window.dateToTimestamp = () => TimestampTool.dateToTimestamp();
        window.copyTimestamp = () => TimestampTool.copyCurrentTimestamp();
    }

    setupGlobalEventListeners() {
        // 导航菜单
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.dataset.category;
                this.filterTools(category);
            });
        });

        // 移动端菜单
        document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
            document.getElementById(SELECTORS.navList).classList.toggle('show');
        });
    }

    filterTools(category) {
        // 更新导航激活状态
        document.querySelectorAll('.nav-list a').forEach(a => a.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        // 显示/隐藏工具卡片
        document.querySelectorAll(SELECTORS.toolCards).forEach(card => {
            card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
        });
    }

    toggleMobileMenu() {
        document.getElementById(SELECTORS.navList).classList.toggle('show');
    }

    switchTool(toolName) {
        console.log('Switching to tool:', toolName);

        // 更新工具激活状态
        Utils.setToolActive(toolName);

        // 使用面板管理器显示对应的面板
        if (this.panelManager) {
            this.panelManager.showPanel(toolName);
            console.log('Panel shown for:', toolName);
        }

        // 更新界面显示
        Utils.toggleElement(SELECTORS.heroSection, false);
        Utils.toggleElement(SELECTORS.toolsSection, false);
        document.querySelector(SELECTORS.backBtn).style.display = 'inline-block';

        // 更新标题
        const title = CONFIG.TOOL_NAMES[toolName] || '工具';
        document.getElementById(SELECTORS.workspaceTitle).textContent = title;

        this.currentTool = toolName;

        // 特殊工具初始化
        if (toolName === 'timestamp') {
            TimestampTool.startUpdateTimer();
        } else if (toolName === 'colorConverter') {
            setTimeout(() => ColorConverter.convert(), 100);
        }

        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showHome() {
        console.log('Showing home');

        // 隐藏所有工具面板
        this.panelManager.hideAllPanels();

        // 显示首页内容
        Utils.toggleElement(SELECTORS.heroSection, true);
        Utils.toggleElement(SELECTORS.toolsSection, true);
        document.querySelector(SELECTORS.backBtn).style.display = 'none';

        // 清除工具激活状态
        document.querySelectorAll(SELECTORS.toolCards).forEach(card => {
            card.classList.remove('active');
        });

        this.currentTool = null;

        // 停止时间戳更新
        TimestampTool.stopUpdateTimer();
    }

    initAllTools() {
        // 初始化所有工具
        ImageConverter.init();
        MD5Tool.init();
        SimplifiedTraditional.init();
        QRCodeTool.init();
        Base64Tool.init();
        URLCodec.init();
        ColorConverter.init();
        TimestampTool.init();

        // 设置工具事件监听器
        this.setupToolEventListeners();
    }

    setupWindowFunctions() {
        // 将函数挂载到 window 对象，供 HTML 中的 onclick 使用
        window.switchTool = (toolName) => this.switchTool(toolName);
        window.showHome = () => this.showHome();
        window.filterTools = (category) => this.filterTools(category);
        window.toggleMobileMenu = () => this.toggleMobileMenu();

        // 工具函数
        window.convertImage = () => ImageConverter.convert();
        window.downloadConvertedImage = () => ImageConverter.download();
        window.removeImage = () => ImageConverter.removeImage();
        window.generateMD5 = () => MD5Tool.generate();
        window.copyMD5 = () => MD5Tool.copy();
        window.toTraditional = () => SimplifiedTraditional.convertToTraditional();
        window.toSimplified = () => SimplifiedTraditional.convertToSimplified();
        window.copySTResult = () => SimplifiedTraditional.copy();
        window.generateQRCode = () => QRCodeTool.generate();
        window.downloadQRCode = () => QRCodeTool.download();
        window.setBase64Mode = (mode) => Base64Tool.setMode(mode);
        window.processBase64 = () => Base64Tool.process();
        window.copyBase64Result = () => Base64Tool.copy();
        window.setUrlMode = (mode) => URLCodec.setMode(mode);
        window.processUrl = () => URLCodec.process();
        window.copyUrlResult = () => URLCodec.copy();
        window.convertColor = () => ColorConverter.convert();
        window.copyColorValue = (id) => ColorConverter.copyValue(id);
        window.updateCurrentTimestamp = () => TimestampTool.updateCurrentTimestamp();
        window.timestampToDate = () => TimestampTool.timestampToDate();
        window.dateToTimestamp = () => TimestampTool.dateToTimestamp();
        window.copyTimestamp = () => TimestampTool.copyCurrentTimestamp();
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new WebToolApp();
});