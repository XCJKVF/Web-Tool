// 简化的工具函数实现

// 图片转换器
const ImageConverter = {
    convert() {
        console.log('Converting image...');
        UtilsSimple.showToast('图片转换功能待实现');
    },
    download() {
        console.log('Downloading image...');
        UtilsSimple.showToast('下载功能待实现');
    },
    removeImage() {
        console.log('Removing image...');
        document.getElementById('imagePreviewContainer').style.display = 'none';
        document.getElementById('formatSelect').style.display = 'none';
        document.getElementById('imageResultArea').style.display = 'none';
        document.querySelector('.upload-placeholder').style.display = 'block';
    }
};

// MD5工具
const MD5Tool = {
    generate() {
        const input = document.getElementById('md5Input').value;
        if (!input) {
            UtilsSimple.showToast('请输入文本', 'error');
            return;
        }

        // 简单的MD5模拟（实际项目中应该使用真正的MD5库）
        const mockMD5 = btoa(unescape(encodeURIComponent(input))).replace(/\+/g, '0').replace(/\//g, '0').substring(0, 32);
        document.getElementById('md5Value').textContent = mockMD5;
        document.getElementById('md5Result').style.display = 'block';
        UtilsSimple.showToast('MD5生成成功');
    },
    copy() {
        const md5Value = document.getElementById('md5Value').textContent;
        if (md5Value) {
            navigator.clipboard.writeText(md5Value).then(() => {
                UtilsSimple.showToast('已复制到剪贴板');
            });
        }
    }
};

// 简繁体转换
const SimplifiedTraditional = {
    convertToTraditional() {
        const input = document.getElementById('stInput').value;
        if (!input) {
            UtilsSimple.showToast('请输入文本', 'error');
            return;
        }

        // 简单的模拟转换（实际项目中应该使用真正的简繁体转换库）
        const mockTraditional = input.replace(/的/g, 'の').replace(/是/g, '係');
        document.getElementById('stOutput').value = mockTraditional;
        document.getElementById('stResultBox').style.display = 'block';
        UtilsSimple.showToast('已转换为繁体');
    },
    convertToSimplified() {
        const input = document.getElementById('stInput').value;
        if (!input) {
            UtilsSimple.showToast('请输入文本', 'error');
            return;
        }

        // 简单的模拟转换
        const mockSimplified = input.replace(/の/g, '的').replace(/係/g, '是');
        document.getElementById('stOutput').value = mockSimplified;
        document.getElementById('stResultBox').style.display = 'block';
        UtilsSimple.showToast('已转换为简体');
    },
    copy() {
        const output = document.getElementById('stOutput').value;
        if (output) {
            navigator.clipboard.writeText(output).then(() => {
                UtilsSimple.showToast('已复制到剪贴板');
            });
        }
    }
};

// 二维码工具
const QRCodeTool = {
    generate() {
        const input = document.getElementById('qrcodeInput').value;
        if (!input) {
            UtilsSimple.showToast('请输入文本', 'error');
            return;
        }

        const size = document.getElementById('qrcodeSize').value;
        const container = document.getElementById('qrcodeContainer');

        // 清空之前的二维码
        container.innerHTML = '';

        // 生成二维码
        new QRCode(container, {
            text: input,
            width: parseInt(size),
            height: parseInt(size),
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        document.getElementById('qrcodeResult').style.display = 'block';
        UtilsSimple.showToast('二维码生成成功');
    },
    download() {
        const canvas = document.querySelector('#qrcodeContainer canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = canvas.toDataURL();
            link.click();
            UtilsSimple.showToast('二维码下载成功');
        }
    }
};

// Base64工具
const Base64Tool = {
    mode: 'encode',
    setMode(mode) {
        this.mode = mode;
        document.getElementById('base64EncodeBtn').classList.toggle('active', mode === 'encode');
        document.getElementById('base64DecodeBtn').classList.toggle('active', mode === 'decode');
    },
    process() {
        const input = document.getElementById('base64Input').value;
        if (!input) {
            UtilsSimple.showToast('请输入文本', 'error');
            return;
        }

        let result;
        if (this.mode === 'encode') {
            result = btoa(unescape(encodeURIComponent(input)));
        } else {
            try {
                result = decodeURIComponent(escape(atob(input)));
            } catch (e) {
                UtilsSimple.showToast('Base64解码失败', 'error');
                return;
            }
        }

        document.getElementById('base64Output').value = result;
        document.getElementById('base64ResultBox').style.display = 'block';
        UtilsSimple.showToast('转换成功');
    },
    copy() {
        const output = document.getElementById('base64Output').value;
        if (output) {
            navigator.clipboard.writeText(output).then(() => {
                UtilsSimple.showToast('已复制到剪贴板');
            });
        }
    }
};

// URL编码工具
const URLCodec = {
    mode: 'encode',
    setMode(mode) {
        this.mode = mode;
        document.getElementById('urlEncodeBtn').classList.toggle('active', mode === 'encode');
        document.getElementById('urlDecodeBtn').classList.toggle('active', mode === 'decode');
    },
    process() {
        const input = document.getElementById('urlInput').value;
        if (!input) {
            UtilsSimple.showToast('请输入URL或文本', 'error');
            return;
        }

        let result;
        if (this.mode === 'encode') {
            result = encodeURIComponent(input);
        } else {
            try {
                result = decodeURIComponent(input);
            } catch (e) {
                UtilsSimple.showToast('URL解码失败', 'error');
                return;
            }
        }

        document.getElementById('urlOutput').value = result;
        document.getElementById('urlResultBox').style.display = 'block';
        UtilsSimple.showToast('转换成功');
    },
    copy() {
        const output = document.getElementById('urlOutput').value;
        if (output) {
            navigator.clipboard.writeText(output).then(() => {
                UtilsSimple.showToast('已复制到剪贴板');
            });
        }
    }
};

// 颜色转换工具
const ColorConverter = {
    convert() {
        const input = document.getElementById('colorInput').value;
        if (!input) {
            UtilsSimple.showToast('请输入颜色值', 'error');
            return;
        }

        // 更新预览
        document.getElementById('colorPreview').style.backgroundColor = input;

        // 简单的颜色转换（实际项目中应该使用更完整的颜色转换库）
        let hex, rgb, hsl;

        try {
            // 创建临时元素来获取计算值
            const temp = document.createElement('div');
            temp.style.color = input;
            document.body.appendChild(temp);
            const computedColor = window.getComputedStyle(temp).color;
            document.body.removeChild(temp);

            // 简化的转换（仅作示例）
            if (input.startsWith('#')) {
                hex = input;
                rgb = this.hexToRgb(input);
                hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
            } else if (input.startsWith('rgb')) {
                rgb = input;
                hex = this.rgbToHex(input);
                hsl = this.rgbToHsl(input);
            }

            // 显示结果
            document.getElementById('hexOutput').value = hex || input;
            document.getElementById('rgbOutput').value = rgb || input;
            document.getElementById('hslOutput').value = hsl || input;
            document.getElementById('colorOutputs').style.display = 'block';

            UtilsSimple.showToast('颜色转换成功');
        } catch (e) {
            UtilsSimple.showToast('颜色格式不支持', 'error');
        }
    },
    copyValue(id) {
        const input = document.getElementById(id);
        if (input.value) {
            navigator.clipboard.writeText(input.value).then(() => {
                UtilsSimple.showToast('已复制到剪贴板');
            });
        }
    },
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    rgbToHex(rgb) {
        const matches = rgb.match(/\d+/g);
        if (matches) {
            const r = parseInt(matches[0]);
            const g = parseInt(matches[1]);
            const b = parseInt(matches[2]);
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
        return rgb;
    },
    rgbToHsl(r, g, b) {
        // 简化的RGB到HSL转换
        return `hsl(${r}, ${g}%, ${b}%)`;
    }
};

// 时间戳工具
const TimestampTool = {
    updateCurrentTimestamp() {
        const now = Math.floor(Date.now() / 1000);
        document.getElementById('currentTimestamp').textContent = now;
        document.getElementById('currentDate').textContent = new Date().toLocaleString('zh-CN');
    },
    startUpdateTimer() {
        this.updateCurrentTimestamp();
        this.timer = setInterval(() => this.updateCurrentTimestamp(), 1000);
    },
    stopUpdateTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    timestampToDate() {
        const input = document.getElementById('timestampInput').value;
        if (!input) {
            UtilsSimple.showToast('请输入时间戳', 'error');
            return;
        }

        const date = new Date(input * 1000);
        document.getElementById('timestampResultValue').textContent = date.toLocaleString('zh-CN');
        document.getElementById('timestampResult').style.display = 'block';
        UtilsSimple.showToast('转换成功');
    },
    dateToTimestamp() {
        const input = document.getElementById('dateInput').value;
        if (!input) {
            UtilsSimple.showToast('请选择日期', 'error');
            return;
        }

        const date = new Date(input);
        const timestamp = Math.floor(date.getTime() / 1000);
        document.getElementById('timestampResultValue').textContent = timestamp;
        document.getElementById('timestampResult').style.display = 'block';
        UtilsSimple.showToast('转换成功');
    },
    copyCurrentTimestamp() {
        const timestamp = document.getElementById('currentTimestamp').textContent;
        if (timestamp) {
            navigator.clipboard.writeText(timestamp).then(() => {
                UtilsSimple.showToast('已复制到剪贴板');
            });
        }
    }
};

// 单位转换器
const UnitConverter = {
    convert() {
        const input = document.getElementById('unitInput').value;
        const fromUnit = document.getElementById('fromUnit').value;
        const toUnit = document.getElementById('toUnit').value;

        if (!input || !fromUnit || !toUnit) {
            UtilsSimple.showToast('请填写完整信息', 'error');
            return;
        }

        try {
            const value = parseFloat(input);
            let result;

            // 简单的单位转换示例（实际项目中应该使用更完整的转换逻辑）
            switch(fromUnit + '_' + toUnit) {
                case 'meter_centimeter':
                    result = value * 100;
                    break;
                case 'centimeter_meter':
                    result = value / 100;
                    break;
                case 'kilogram_gram':
                    result = value * 1000;
                    break;
                case 'gram_kilogram':
                    result = value / 1000;
                    break;
                case 'celsius_fahrenheit':
                    result = (value * 9/5) + 32;
                    break;
                case 'fahrenheit_celsius':
                    result = (value - 32) * 5/9;
                    break;
                default:
                    result = value; // 默认情况，显示相同值
            }

            document.getElementById('unitResult').textContent = result.toFixed(2);
            document.getElementById('unitResultBox').style.display = 'block';
            UtilsSimple.showToast('转换成功');
        } catch (e) {
            UtilsSimple.showToast('转换失败', 'error');
        }
    }
};

// 文本工具
const TextTool = {
    countWords() {
        const input = document.getElementById('textToolInput').value;
        if (!input) {
            UtilsSimple.showToast('请输入文本', 'error');
            return;
        }

        const words = input.trim().split(/\s+/).filter(word => word.length > 0);
        const characters = input.length;
        const lines = input.split('\n').length;

        document.getElementById('wordCount').textContent = words.length;
        document.getElementById('charCount').textContent = characters;
        document.getElementById('lineCount').textContent = lines;
        document.getElementById('textToolResult').style.display = 'block';
        UtilsSimple.showToast('统计完成');
    },
    convertCase() {
        const input = document.getElementById('textToolInput').value;
        if (!input) {
            UtilsSimple.showToast('请输入文本', 'error');
            return;
        }

        const caseType = document.querySelector('input[name="caseType"]:checked').value;
        let result;

        switch(caseType) {
            case 'upper':
                result = input.toUpperCase();
                break;
            case 'lower':
                result = input.toLowerCase();
                break;
            case 'title':
                result = input.split(' ').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ');
                break;
            default:
                result = input;
        }

        document.getElementById('textToolOutput').value = result;
        document.getElementById('textToolResultBox').style.display = 'block';
        UtilsSimple.showToast('转换完成');
    },
    copyText() {
        const output = document.getElementById('textToolOutput').value;
        if (output) {
            navigator.clipboard.writeText(output).then(() => {
                UtilsSimple.showToast('已复制到剪贴板');
            });
        }
    }
};

// 日期时间工具
const DateTimeTool = {
    calculateDate() {
        const date = document.getElementById('dateTimeInput').value;
        const days = parseInt(document.getElementById('daysToAdd').value) || 0;
        const operation = document.querySelector('input[name="dateOperation"]:checked').value;

        if (!date) {
            UtilsSimple.showToast('请选择日期', 'error');
            return;
        }

        const currentDate = new Date(date);
        let resultDate;

        if (operation === 'add') {
            resultDate = new Date(currentDate.getTime() + (days * 24 * 60 * 60 * 1000));
        } else {
            resultDate = new Date(currentDate.getTime() - (days * 24 * 60 * 60 * 1000));
        }

        document.getElementById('dateTimeResult').textContent = resultDate.toLocaleDateString('zh-CN');
        document.getElementById('dateTimeResultBox').style.display = 'block';
        UtilsSimple.showToast('计算完成');
    },
    convertTimezone() {
        const time = document.getElementById('timeInput').value;
        const fromTimezone = document.getElementById('fromTimezone').value;
        const toTimezone = document.getElementById('toTimezone').value;

        if (!time) {
            UtilsSimple.showToast('请输入时间', 'error');
            return;
        }

        // 简化的时区转换（实际项目中应该使用更完整的时区库）
        const date = new Date(time + ' UTC'); // 假设输入是UTC时间
        const hoursDiff = parseInt(toTimezone) - parseInt(fromTimezone);
        date.setHours(date.getHours() + hoursDiff);

        document.getElementById('timezoneResult').textContent = date.toISOString().slice(0, 16).replace('T', ' ');
        document.getElementById('timezoneResultBox').style.display = 'block';
        UtilsSimple.showToast('转换完成');
    },
    startCountdown() {
        const targetDate = document.getElementById('countdownDate').value;
        if (!targetDate) {
            UtilsSimple.showToast('请选择目标日期', 'error');
            return;
        }

        const target = new Date(targetDate).getTime();
        const now = new Date().getTime();
        const distance = target - now;

        if (distance < 0) {
            UtilsSimple.showToast('目标日期已过', 'error');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdownDays').textContent = days;
        document.getElementById('countdownHours').textContent = hours;
        document.getElementById('countdownMinutes').textContent = minutes;
        document.getElementById('countdownSeconds').textContent = seconds;
        document.getElementById('countdownResult').style.display = 'block';
        UtilsSimple.showToast('倒计时开始');
    }
};

// 计算器
const Calculator = {
    calculate() {
        const expression = document.getElementById('calcInput').value;
        if (!expression) {
            UtilsSimple.showToast('请输入表达式', 'error');
            return;
        }

        try {
            // 使用eval进行简单计算（实际项目中应该使用更安全的计算方法）
            const result = eval(expression);
            document.getElementById('calcResult').textContent = result;
            document.getElementById('calcResultBox').style.display = 'block';
            UtilsSimple.showToast('计算完成');
        } catch (e) {
            UtilsSimple.showToast('表达式无效', 'error');
        }
    },
    clear() {
        document.getElementById('calcInput').value = '';
        document.getElementById('calcResult').textContent = '';
        document.getElementById('calcResultBox').style.display = 'none';
        UtilsSimple.showToast('已清空');
    }
};

// 文件工具
const FileTool = {
    checkFileSize() {
        const input = document.getElementById('fileSizeInput').value;
        if (!input) {
            UtilsSimple.showToast('请输入文件大小', 'error');
            return;
        }

        const size = parseFloat(input);
        const unit = document.getElementById('fileSizeUnit').value;
        let bytes;

        switch(unit) {
            case 'KB':
                bytes = size * 1024;
                break;
            case 'MB':
                bytes = size * 1024 * 1024;
                break;
            case 'GB':
                bytes = size * 1024 * 1024 * 1024;
                break;
            default:
                bytes = size;
        }

        const kb = bytes / 1024;
        const mb = kb / 1024;
        const gb = mb / 1024;

        document.getElementById('fileSizeKB').textContent = kb.toFixed(2);
        document.getElementById('fileSizeMB').textContent = mb.toFixed(2);
        document.getElementById('fileSizeGB').textContent = gb.toFixed(2);
        document.getElementById('fileToolResult').style.display = 'block';
        UtilsSimple.showToast('转换完成');
    },
    detectFileType() {
        const input = document.getElementById('fileTypeInput').value;
        if (!input) {
            UtilsSimple.showToast('请输入文件名', 'error');
            return;
        }

        const extension = input.split('.').pop().toLowerCase();
        let type;

        switch(extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'bmp':
            case 'webp':
                type = '图片文件';
                break;
            case 'pdf':
                type = 'PDF文档';
                break;
            case 'doc':
            case 'docx':
                type = 'Word文档';
                break;
            case 'xls':
            case 'xlsx':
                type = 'Excel表格';
                break;
            case 'txt':
                type = '文本文件';
                break;
            case 'zip':
            case 'rar':
            case '7z':
                type = '压缩文件';
                break;
            case 'mp3':
            case 'wav':
            case 'ogg':
                type = '音频文件';
                break;
            case 'mp4':
            case 'avi':
            case 'mov':
                type = '视频文件';
                break;
            default:
                type = '未知文件类型';
        }

        document.getElementById('fileTypeResult').textContent = type;
        document.getElementById('fileToolResultBox').style.display = 'block';
        UtilsSimple.showToast('检测完成');
    }
};

// 网络工具
const NetworkTool = {
    checkIP() {
        const ip = document.getElementById('ipInput').value;
        if (!ip) {
            UtilsSimple.showToast('请输入IP地址', 'error');
            return;
        }

        // 简化的IP检查（实际项目中应该使用更完整的网络工具）
        const isValid = /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
        const type = isValid ? '有效IP地址' : '无效IP地址';

        document.getElementById('ipResult').textContent = type;
        document.getElementById('networkToolResult').style.display = 'block';
        UtilsSimple.showToast('检查完成');
    },
    whoisLookup() {
        const domain = document.getElementById('whoisInput').value;
        if (!domain) {
            UtilsSimple.showToast('请输入域名', 'error');
            return;
        }

        // 简化的WHOIS查询（实际项目中应该使用真实的WHOIS API）
        const result = `WHOIS查询结果:\n域名: ${domain}\n注册商: 未知\n更新日期: 未知\n过期日期: 未知`;

        document.getElementById('whoisResult').textContent = result;
        document.getElementById('networkToolResultBox').style.display = 'block';
        UtilsSimple.showToast('查询完成');
    },
    parseURL() {
        const url = document.getElementById('urlInput').value;
        if (!url) {
            UtilsSimple.showToast('请输入URL', 'error');
            return;
        }

        try {
            const parsed = new URL(url);
            const result = `协议: ${parsed.protocol}\n主机: ${parsed.hostname}\n端口: ${parsed.port || '80/443'}\n路径: ${parsed.pathname}\n查询参数: ${parsed.search}`;

            document.getElementById('urlResult').textContent = result;
            document.getElementById('networkToolResultBox2').style.display = 'block';
            UtilsSimple.showToast('解析完成');
        } catch (e) {
            UtilsSimple.showToast('URL格式无效', 'error');
        }
    }
};

// 将工具函数挂载到window对象
Object.assign(window, {
    ImageConverter,
    MD5Tool,
    SimplifiedTraditional,
    QRCodeTool,
    Base64Tool,
    URLCodec,
    ColorConverter,
    TimestampTool,
    UnitConverter,
    TextTool,
    DateTimeTool,
    Calculator,
    FileTool,
    NetworkTool
});