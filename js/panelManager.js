// 工具面板管理器
class PanelManager {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        // 创建工具面板容器
        this.createContainer();
        // 移动所有工具面板到新容器
        this.moveToolPanels();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'toolPanelsContainer';
        this.container.className = 'tool-panels-container';

        // 插入到 toolWorkspace 之后
        const toolWorkspace = document.getElementById('toolWorkspace');
        if (toolWorkspace) {
            toolWorkspace.parentNode.insertBefore(this.container, toolWorkspace.nextSibling);
        }
    }

    moveToolPanels() {
        const panels = document.querySelectorAll('.tool-panel');
        panels.forEach(panel => {
            if (panel.id && panel.id.endsWith('Panel')) {
                this.container.appendChild(panel);
            }
        });
    }

    showPanel(toolName) {
        // 隐藏所有工具面板
        const panels = this.container.querySelectorAll('.tool-panel');
        panels.forEach(panel => {
            panel.style.display = 'none';
        });

        // 显示选中的工具面板
        const panel = document.getElementById(toolName + 'Panel');
        if (panel) {
            panel.style.display = 'block';
        }
    }

    hideAllPanels() {
        const panels = this.container.querySelectorAll('.tool-panel');
        panels.forEach(panel => {
            panel.style.display = 'none';
        });
    }
}

// 创建面板管理器实例
const panelManager = new PanelManager();