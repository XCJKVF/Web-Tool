// 工具函数
const Utils = {
    // 显示提示信息
    showToast(message, type = 'success') {
        const toast = document.getElementById(SELECTORS.toast);
        if (!toast) return;

        toast.textContent = message;
        toast.className = `toast ${type} show`;
        setTimeout(() => {
            toast.className = 'toast';
        }, 2000);
    },

    // 复制文本到剪贴板
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('已复制到剪贴板');
        } catch (err) {
            this.showToast('复制失败', 'error');
            console.error('复制失败:', err);
        }
    },

    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // 验证文件类型
    validateFileType(file, allowedTypes) {
        return allowedTypes.includes(file.type);
    },

    // 验证文件大小
    validateFileSize(file, maxSize) {
        return file.size <= maxSize;
    },

    // 生成下载链接
    createDownloadLink(content, filename) {
        const link = document.createElement('a');
        link.download = filename;
        link.href = content;
        link.click();
    },

    // 显示/隐藏元素
    toggleElement(selector, show) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = show ? 'block' : 'none';
        }
    },

    // 添加/移除类
    toggleClass(selector, className, add) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.toggle(className, add);
        }
    },

    // 切换工具激活状态
    setToolActive(toolName) {
        document.querySelectorAll(SELECTORS.toolCards).forEach(card => {
            card.classList.remove('active');
        });
        const activeCard = document.querySelector(`[data-tool="${toolName}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
    }
};