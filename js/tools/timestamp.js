// 时间戳转换工具
const TimestampTool = {
    updateTimer: null,

    init() {
        this.setupEventListeners();
        this.updateCurrentTimestamp();
    },

    setupEventListeners() {
        // 事件监听器将在主应用中设置
    },

    updateCurrentTimestamp() {
        const now = Date.now();
        const timestamp = Math.floor(now / 1000);
        document.getElementById(SELECTORS.currentTimestamp).textContent = timestamp;
        const date = new Date();
        document.getElementById(SELECTORS.currentDate).textContent = date.toLocaleString('zh-CN', { hour12: false });
    },

    startUpdateTimer() {
        this.stopUpdateTimer();
        this.updateTimer = setInterval(() => this.updateCurrentTimestamp(), 1000);
    },

    stopUpdateTimer() {
        if (this.updateTimer) {
            clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
    },

    timestampToDate() {
        const input = document.getElementById(SELECTORS.timestampInput).value;
        if (!input) {
            Utils.showToast('请输入时间戳', 'error');
            return;
        }

        try {
            const timestamp = parseInt(input) * 1000;
            const date = new Date(timestamp);
            if (isNaN(date.getTime())) throw new Error('Invalid date');

            const result = date.toLocaleString('zh-CN', { hour12: false });
            document.getElementById(SELECTORS.timestampResultValue).textContent = result;
            Utils.toggleElement(SELECTORS.timestampResult, true);
            Utils.showToast('转换成功');
        } catch (error) {
            Utils.showToast('无效的时间戳', 'error');
        }
    },

    dateToTimestamp() {
        const input = document.getElementById(SELECTORS.dateInput).value;
        if (!input) {
            Utils.showToast('请选择日期', 'error');
            return;
        }

        try {
            const date = new Date(input);
            const timestamp = Math.floor(date.getTime() / 1000);
            document.getElementById(SELECTORS.timestampResultValue).textContent = timestamp;
            Utils.toggleElement(SELECTORS.timestampResult, true);
            Utils.showToast('转换成功');
        } catch (error) {
            Utils.showToast('无效的日期', 'error');
        }
    },

    copyCurrentTimestamp() {
        const value = document.getElementById(SELECTORS.currentTimestamp).textContent;
        if (!value) return;
        Utils.copyToClipboard(value);
    }
};