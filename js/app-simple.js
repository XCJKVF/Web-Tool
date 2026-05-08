// 简化的主应用
class WebToolAppSimple {
    constructor() {
        this.currentTool = null;
        this.init();
    }

    init() {
        this.setupFunctions();
        console.log('WebToolAppSimple initialized');
    }

    setupFunctions() {
        // 将函数挂载到 window 对象
        window.switchTool = (toolName) => this.switchTool(toolName);
        window.showHome = () => this.showHome();
        window.filterTools = (category) => this.filterTools(category);
        window.toggleMobileMenu = () => this.toggleMobileMenu();

        console.log('Functions set up');
    }

    switchTool(toolName) {
        console.log('Switching to tool:', toolName);

        // 隐藏所有面板
        document.querySelectorAll('.tool-panel').forEach(panel => {
            panel.style.display = 'none';
        });

        // 显示选中面板
        const panel = document.getElementById(toolName + 'Panel');
        if (panel) {
            panel.style.display = 'block';
            console.log('Panel shown:', toolName + 'Panel');
        }

        // 更新界面
        document.getElementById('heroSection').style.display = 'none';
        document.getElementById('toolsSection').style.display = 'none';
        document.querySelector('.back-btn').style.display = 'inline-block';

        // 更新标题
        const titles = {
            'imageConverter': '图片格式转换',
            'md5': 'MD5加密',
            'simplifiedTraditional': '简繁体转换',
            'qrcode': '二维码生成',
            'base64': 'Base64编码/解码',
            'urlCodec': 'URL编码/解码',
            'colorConverter': '颜色格式转换',
            'timestamp': '时间戳转换',
            'unitConverter': '单位转换器',
            'textTool': '文本工具',
            'dateTimeTool': '日期时间工具',
            'calculator': '计算器',
            'fileTool': '文件工具',
            'networkTool': '网络工具'
        };

        // 如果存在 workspaceTitle，更新标题
        const workspaceTitle = document.getElementById('workspaceTitle');
        if (workspaceTitle) {
            workspaceTitle.textContent = titles[toolName] || '工具';
        }

        this.currentTool = toolName;
    }

    showHome() {
        console.log('Showing home');

        // 隐藏所有面板
        document.querySelectorAll('.tool-panel').forEach(panel => {
            panel.style.display = 'none';
        });

        // 显示首页
        document.getElementById('heroSection').style.display = 'block';
        document.getElementById('toolsSection').style.display = 'block';
        document.querySelector('.back-btn').style.display = 'none';

        this.currentTool = null;
    }

    filterTools(category) {
        console.log('Filtering tools:', category);
        document.querySelectorAll('.nav-list a').forEach(a => a.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        document.querySelectorAll('.tool-card').forEach(card => {
            card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
        });
    }

    toggleMobileMenu() {
        document.getElementById('navList').classList.toggle('show');
    }
}

// 简化的工具函数
const UtilsSimple = {
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.className = `toast ${type} show`;
            setTimeout(() => toast.className = 'toast', 2000);
        }
    },

    setToolActive(toolName) {
        document.querySelectorAll('.tool-card').forEach(card => {
            card.classList.remove('active');
        });
        const activeCard = document.querySelector(`[data-tool="${toolName}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
    }
};

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new WebToolAppSimple();
    console.log('DOM content loaded and app initialized');
});