// 颜色格式转换工具
const ColorConverter = {
    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        // 事件监听器将在主应用中设置
    },

    convert() {
        const input = document.getElementById(SELECTORS.colorInput).value.trim();
        if (!input) return;

        let r, g, b, h, s, l;
        let hex = '';

        try {
            if (input.startsWith('#')) {
                hex = input;
                const result = this.hexToRgb(input);
                if (result) {
                    r = result.r; g = result.g; b = result.b;
                    const hslResult = this.rgbToHsl(r, g, b);
                    h = hslResult.h; s = hslResult.s; l = hslResult.l;
                } else {
                    Utils.showToast('无效的HEX颜色值', 'error');
                    return;
                }
            } else if (input.startsWith('rgb')) {
                const result = input.match(/\d+/g);
                if (result && result.length >= 3) {
                    r = parseInt(result[0]); g = parseInt(result[1]); b = parseInt(result[2]);
                    hex = this.rgbToHex(r, g, b);
                    const hslResult = this.rgbToHsl(r, g, b);
                    h = hslResult.h; s = hslResult.s; l = hslResult.l;
                } else {
                    Utils.showToast('无效的RGB颜色值', 'error');
                    return;
                }
            } else if (input.startsWith('hsl')) {
                const result = input.match(/[\d.]+/g);
                if (result && result.length >= 3) {
                    h = parseFloat(result[0]); s = parseFloat(result[1]); l = parseFloat(result[2]);
                    const rgbResult = this.hslToRgb(h, s, l);
                    r = rgbResult.r; g = rgbResult.g; b = rgbResult.b;
                    hex = this.rgbToHex(r, g, b);
                } else {
                    Utils.showToast('无效的HSL颜色值', 'error');
                    return;
                }
            } else {
                Utils.showToast('请输入有效的颜色值（HEX、RGB或HSL）', 'error');
                return;
            }

            this.updateDisplay(hex, r, g, b, h, s, l);
        } catch (error) {
            Utils.showToast('颜色转换失败', 'error');
            console.error(error);
        }
    },

    updateDisplay(hex, r, g, b, h, s, l) {
        document.getElementById(SELECTORS.colorPreview).style.backgroundColor = hex;
        document.getElementById(SELECTORS.hexOutput).value = hex;
        document.getElementById(SELECTORS.rgbOutput).value = `rgb(${r}, ${g}, ${b})`;
        document.getElementById(SELECTORS.hslOutput).value = `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
        Utils.toggleElement(SELECTORS.colorOutputs, true);
    },

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    },

    rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        return { h: h * 360, s: s * 100, l: l * 100 };
    },

    hslToRgb(h, s, l) {
        h /= 360; s /= 100; l /= 100;
        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    },

    copyValue(id) {
        const value = document.getElementById(id).value;
        if (!value) return;
        Utils.copyToClipboard(value);
    }
};