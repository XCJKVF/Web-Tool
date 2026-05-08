// URL 编码/解码工具
const URLCodec = {
    currentMode: 'encode',

    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        // 事件监听器将在主应用中设置
    },

    setMode(mode) {
        this.currentMode = mode;
        Utils.toggleClass(SELECTORS.urlEncodeBtn, 'active', mode === 'encode');
        Utils.toggleClass(SELECTORS.urlDecodeBtn, 'active', mode === 'decode');
    },

    process() {
        const input = document.getElementById(SELECTORS.urlInput).value;
        if (!input) {
            Utils.showToast('请输入URL或文本', 'error');
            return;
        }

        let result;
        try {
            if (this.currentMode === 'encode') {
                result = encodeURIComponent(input);
            } else {
                result = decodeURIComponent(input);
            }

            document.getElementById(SELECTORS.urlOutput).value = result;
            Utils.toggleElement(SELECTORS.urlResultBox, true);
            Utils.showToast('转换成功');
        } catch (error) {
            Utils.showToast('解码失败，请检查输入是否有效', 'error');
            console.error(error);
        }
    },

    copy() {
        const output = document.getElementById(SELECTORS.urlOutput);
        if (!output.value) return;
        Utils.copyToClipboard(output.value);
    }
};