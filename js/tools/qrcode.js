// 二维码生成工具
const QRCodeTool = {
    currentQRCodeInstance: null,

    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        // 事件监听器将在主应用中设置
    },

    generate() {
        const input = document.getElementById(SELECTORS.qrcodeInput).value;
        if (!input) {
            Utils.showToast('请输入文本或网址', 'error');
            return;
        }

        const size = parseInt(document.getElementById(SELECTORS.qrcodeSize).value);
        const container = document.getElementById(SELECTORS.qrcodeContainer);
        container.innerHTML = '';

        if (this.currentQRCodeInstance) {
            this.currentQRCodeInstance.clear();
        }

        try {
            this.currentQRCodeInstance = new QRCode(container, {
                text: input,
                width: size,
                height: size
            });
            Utils.toggleElement(SELECTORS.qrcodeResult, true);
            Utils.showToast('二维码生成成功');
        } catch (error) {
            Utils.showToast('二维码生成失败', 'error');
            console.error(error);
        }
    },

    download() {
        const img = document.querySelector('#qrcodeContainer img');
        if (!img) {
            Utils.showToast('请先生成二维码', 'error');
            return;
        }
        Utils.createDownloadLink(img.src, 'qrcode.png');
    }
};