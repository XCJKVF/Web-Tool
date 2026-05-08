// Base64 编码/解码工具
const Base64Tool = {
    currentMode: 'encode',

    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        // 事件监听器将在主应用中设置
    },

    setMode(mode) {
        this.currentMode = mode;
        Utils.toggleClass(SELECTORS.base64EncodeBtn, 'active', mode === 'encode');
        Utils.toggleClass(SELECTORS.base64DecodeBtn, 'active', mode === 'decode');
    },

    process() {
        const input = document.getElementById(SELECTORS.base64Input).value;
        if (!input) {
            Utils.showToast('请输入文本', 'error');
            return;
        }

        let result;
        try {
            if (this.currentMode === 'encode') {
                result = btoa(unescape(encodeURIComponent(input)));
            } else {
                result = decodeURIComponent(escape(atob(input)));
            }

            document.getElementById(SELECTORS.base64Output).value = result;
            Utils.toggleElement(SELECTORS.base64ResultBox, true);
            Utils.showToast('转换成功');
        } catch (error) {
            Utils.showToast('解码失败，请检查输入是否有效', 'error');
            console.error(error);
        }
    },

    copy() {
        const output = document.getElementById(SELECTORS.base64Output);
        if (!output.value) return;
        Utils.copyToClipboard(output.value);
    }
};