let currentTool = null;
let currentBase64Mode = 'encode';
let currentUrlMode = 'encode';
let uploadedImageFile = null;
let convertedImageData = null;
let currentQRCodeInstance = null;
let updateTimer = null;

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + type + ' show';
    setTimeout(() => { toast.className = 'toast'; }, 2000);
}

function toggleMobileMenu() {
    document.getElementById('navList').classList.toggle('show');
}

function filterTools(category) {
    document.querySelectorAll('.nav-list a').forEach(a => a.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    document.querySelectorAll('.tool-card').forEach(card => {
        card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
    });
}

function switchTool(toolName) {
    document.querySelectorAll('.tool-card').forEach(card => card.classList.remove('active'));
    document.querySelector(`[data-tool="${toolName}"]`)?.classList.add('active');
    document.querySelectorAll('.tool-panel').forEach(panel => panel.style.display = 'none');
    document.getElementById(toolName + 'Panel').style.display = 'block';
    document.getElementById('heroSection').style.display = 'none';
    document.getElementById('toolsSection').style.display = 'none';
    document.querySelector('.back-btn').style.display = 'inline-block';

    const titles = {
        imageConverter: '图片格式转换',
        md5: 'MD5加密',
        simplifiedTraditional: '简繁体转换',
        qrcode: '二维码生成',
        base64: 'Base64编码/解码',
        urlCodec: 'URL编码/解码',
        colorConverter: '颜色格式转换',
        timestamp: '时间戳转换'
    };
    document.getElementById('workspaceTitle').textContent = titles[toolName] || '工具';
    currentTool = toolName;

    if (toolName === 'timestamp') {
        updateCurrentTimestamp();
        if (updateTimer) clearInterval(updateTimer);
        updateTimer = setInterval(updateCurrentTimestamp, 1000);
    }

    if (toolName === 'colorConverter') convertColor();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHome() {
    document.querySelectorAll('.tool-panel').forEach(panel => panel.style.display = 'none');
    document.getElementById('heroSection').style.display = 'block';
    document.getElementById('toolsSection').style.display = 'block';
    document.querySelector('.back-btn').style.display = 'none';
    document.querySelectorAll('.tool-card').forEach(card => card.classList.remove('active'));
    currentTool = null;
    if (updateTimer) clearInterval(updateTimer);
}

document.addEventListener('DOMContentLoaded', function() {
    const imageUploadArea = document.getElementById('imageUploadArea');
    const imageFileInput = document.getElementById('imageFileInput');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const formatSelect = document.getElementById('formatSelect');

    imageUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        imageUploadArea.classList.add('dragover');
    });

    imageUploadArea.addEventListener('dragleave', function() {
        imageUploadArea.classList.remove('dragover');
    });

    imageUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        imageUploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) handleImageFile(files[0]);
    });

    imageFileInput.addEventListener('change', function() {
        if (this.files.length > 0) handleImageFile(this.files[0]);
    });

    function handleImageFile(file) {
        if (!file.type.startsWith('image/')) {
            showToast('请上传图片文件', 'error');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            showToast('图片大小不能超过10MB', 'error');
            return;
        }
        uploadedImageFile = file;
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreviewContainer.style.display = 'block';
            document.querySelector('.upload-placeholder').style.display = 'none';
            formatSelect.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }
});

function resetImageTool() {
    document.getElementById('imageFileInput').value = '';
    document.getElementById('imagePreviewContainer').style.display = 'none';
    document.querySelector('.upload-placeholder').style.display = 'block';
    document.getElementById('formatSelect').style.display = 'none';
    document.getElementById('imageResultArea').style.display = 'none';
    uploadedImageFile = null;
    convertedImageData = null;
}

function removeImage() { resetImageTool(); }

function convertImage() {
    if (!uploadedImageFile) { showToast('请先上传图片', 'error'); return; }
    const targetFormat = document.getElementById('targetFormat').value;
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0);
            convertedImageData = canvas.toDataURL(targetFormat);
            document.getElementById('convertedImage').src = convertedImageData;
            document.getElementById('imageResultArea').style.display = 'block';
            showToast('转换成功');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(uploadedImageFile);
}

function downloadConvertedImage() {
    if (!convertedImageData) return;
    const link = document.createElement('a');
    link.download = 'converted_image.' + document.getElementById('targetFormat').value.split('/')[1];
    link.href = convertedImageData;
    link.click();
}

function generateMD5() {
    const input = document.getElementById('md5Input').value;
    if (!input) { showToast('请输入要加密的文本', 'error'); return; }
    document.getElementById('md5Value').textContent = md5(input);
    document.getElementById('md5Result').style.display = 'block';
    showToast('MD5生成成功');
}

function copyMD5() {
    const value = document.getElementById('md5Value').textContent;
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => showToast('已复制到剪贴板')).catch(() => showToast('复制失败', 'error'));
}

function md5(string) {
    function RotateLeft(lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)); }
    function AddUnsigned(lX, lY) {
        let lX8 = (lX & 0x80000000), lY8 = (lY & 0x80000000);
        let lX4 = (lX & 0x40000000), lY4 = (lY & 0x40000000);
        let lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
        if (lX4 | lY4) { return (lResult & 0x40000000) ? lResult ^ 0xC0000000 ^ lX8 ^ lY8 : lResult ^ 0x40000000 ^ lX8 ^ lY8; }
        return lResult ^ lX8 ^ lY8;
    }
    function F(x, y, z) { return (x & y) | (~x & z); }
    function G(x, y, z) { return (x & z) | (y & ~z); }
    function H(x, y, z) { return x ^ y ^ z; }
    function I(x, y, z) { return y ^ (x | ~z); }
    function FF(a, b, c, d, x, s, ac) { return AddUnsigned(RotateLeft(AddUnsigned(AddUnsigned(F(b, c, d), x), ac), s), b); }
    function GG(a, b, c, d, x, s, ac) { return AddUnsigned(RotateLeft(AddUnsigned(AddUnsigned(G(b, c, d), x), ac), s), b); }
    function HH(a, b, c, d, x, s, ac) { return AddUnsigned(RotateLeft(AddUnsigned(AddUnsigned(H(b, c, d), x), ac), s), b); }
    function II(a, b, c, d, x, s, ac) { return AddUnsigned(RotateLeft(AddUnsigned(AddUnsigned(I(b, c, d), x), ac), s), b); }
    function ConvertToWordArray(str) {
        let lWordCount = (((str.length + 8) >>> 6) + 1) * 16;
        let lWordArray = new Array(lWordCount).fill(0);
        let lByteCount = 0;
        while (lByteCount < str.length) {
            let lWordIndex = (lByteCount - (lByteCount % 4)) / 4;
            let lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordIndex] = lWordArray[lWordIndex] | (str.charCodeAt(lByteCount) << lBytePosition);
            lByteCount++;
        }
        let lWordIndex = (lByteCount - (lByteCount % 4)) / 4;
        let lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordIndex] = lWordArray[lWordIndex] | (0x80 << lBytePosition);
        lWordArray[lWordCount - 2] = str.length << 3;
        lWordArray[lWordCount - 1] = str.length >>> 29;
        return lWordArray;
    }
    function WordToHex(lValue) {
        let sHex = '';
        for (let i = 0; i <= 3; i++) sHex += ('0' + ((lValue >>> (i * 8)) & 255).toString(16)).slice(-2);
        return sHex;
    }
    const x = ConvertToWordArray(string);
    let a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476;
    const S11 = 7, S12 = 12, S13 = 17, S14 = 22, S21 = 5, S22 = 9, S23 = 14, S24 = 20, S31 = 4, S32 = 11, S33 = 16, S34 = 23, S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    for (let k = 0; k < x.length; k += 16) {
        let AA = a, BB = b, CC = c, DD = d;
        a = FF(a, b, c, d, x[k], S11, 0xD76AA478); d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB); b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF); d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613); b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8); d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1); b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122); d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E); b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562); d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51); b = GG(b, c, d, a, x[k], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D); d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681); b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6); d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87); b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905); d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9); b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942); d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122); b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44); d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60); b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6); d = HH(d, a, b, c, x[k], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085); b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039); d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8); b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k], S41, 0xF4292244); d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7); b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3); d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D); b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F); d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314); b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82); d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB); b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA); b = AddUnsigned(b, BB); c = AddUnsigned(c, CC); d = AddUnsigned(d, DD);
    }
    return (WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)).toLowerCase();
}

function toTraditional(simplified) {
    const traditionalMap = {'义':'義','饥':'饑','厂':'廠','广':'廣','门':'門','为':'為','丰':'豐','开':'開','关':'關','观':'觀','欢':'歡','孙':'孫','阳':'陽','严':'嚴','并':'併','戏':'戲','买':'買','卖':'賣','学':'學','对':'對','寻':'尋','导':'導','层':'層','屡':'屢','岛':'島','云':'雲','专':'專','体':'體','余':'餘','系':'係','纤':'纖','约':'約','划':'劃','迈':'邁','艰':'艱','咸':'鹹','戚':'戚','戈':'戈','戊':'戊','戡':'戡','戢':'戢','戤':'戤','岁':'歲','岂':'豈','凯':'凱','志':'誌','决':'決','兑':'兌','况':'況','凶':'兇','具':'具','杂':'雜','杆':'桿','杠':'槓','杖':'杖','材':'材','村':'村','杏':'杏','杉':'杉','巫':'巫','巨':'巨','丧':'喪','个':'個','临':'臨','丸':'丸','丹':'丹','主':'主','举':'舉','乃':'乃','久':'久','么':'么','之':'之','乌':'烏','乍':'乍','乎':'乎','乏':'乏','乐':'樂','乒':'乒','丘':'丘','丙':'丙','业':'業','丛':'叢','东':'東','丝':'絲','丢':'丟','两':'兩','严':'嚴','中':'中','丰':'豐','临':'臨','个':'個'};
    return simplified.split('').map(char => traditionalMap[char] || char).join('');
}

function toSimplified(traditional) {
    const simplifiedMap = {'義':'义','饑':'饥','廠':'厂','廣':'广','門':'门','為':'为','豐':'丰','開':'开','關':'关','觀':'观','歡':'欢','孫':'孙','陽':'阳','嚴':'严','併':'并','戲':'戏','買':'买','賣':'卖','學':'学','對':'对','尋':'寻','導':'导','層':'层','屢':'屡','島':'岛','雲':'云','專':'专','體':'体','餘':'余','係':'系','纖':'纤','約':'约','劃':'划','邁':'迈','艱':'艰','鹹':'咸','戚':'戚','戈':'戈','戊':'戊','戡':'戡','戢':'戢','戤':'戤','歲':'岁','豈':'岂','凱':'凯','誌':'志','決':'决','兌':'兑','況':'况','兇':'凶','具':'具','雜':'杂','桿':'杆','槓':'杠','杖':'杖','材':'材','村':'村','杏':'杏','杉':'杉','巫':'巫','巨':'巨','喪':'丧','個':'个','臨':'临','丸':'丸','丹':'丹','主':'主','舉':'举','乃':'乃','久':'久','么':'么','之':'之','烏':'乌','乍':'乍','乎':'乎','乏':'乏','樂':'乐','乒':'乒','丘':'丘','丙':'丙','業':'业','叢':'丛','東':'东','絲':'丝','丟':'丢','兩':'两','嚴':'严','豐':'丰','臨':'临'};
    return traditional.split('').map(char => simplifiedMap[char] || char).join('');
}

function copySTResult() {
    const output = document.getElementById('stOutput');
    if (!output.value) return;
    navigator.clipboard.writeText(output.value).then(() => showToast('已复制到剪贴板')).catch(() => showToast('复制失败', 'error'));
}

function generateQRCode() {
    const input = document.getElementById('qrcodeInput').value;
    if (!input) { showToast('请输入文本或网址', 'error'); return; }
    const size = parseInt(document.getElementById('qrcodeSize').value);
    const container = document.getElementById('qrcodeContainer');
    container.innerHTML = '';
    if (currentQRCodeInstance) {
        currentQRCodeInstance.clear();
    }
    currentQRCodeInstance = new QRCode(container, { text: input, width: size, height: size });
    document.getElementById('qrcodeResult').style.display = 'block';
    showToast('二维码生成成功');
}

function downloadQRCode() {
    const img = document.querySelector('#qrcodeContainer img');
    if (!img) { showToast('请先生成二维码', 'error'); return; }
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = img.src;
    link.click();
}

function setBase64Mode(mode) {
    currentBase64Mode = mode;
    document.getElementById('base64EncodeBtn').classList.toggle('active', mode === 'encode');
    document.getElementById('base64DecodeBtn').classList.toggle('active', mode === 'decode');
}

function processBase64() {
    const input = document.getElementById('base64Input').value;
    if (!input) { showToast('请输入文本', 'error'); return; }
    let result;
    try {
        result = currentBase64Mode === 'encode'
            ? btoa(unescape(encodeURIComponent(input)))
            : decodeURIComponent(escape(atob(input)));
        document.getElementById('base64Output').value = result;
        document.getElementById('base64ResultBox').style.display = 'block';
        showToast('转换成功');
    } catch (e) {
        showToast('解码失败，请检查输入是否有效', 'error');
    }
}

function copyBase64Result() {
    const output = document.getElementById('base64Output');
    if (!output.value) return;
    navigator.clipboard.writeText(output.value).then(() => showToast('已复制到剪贴板')).catch(() => showToast('复制失败', 'error'));
}

function setUrlMode(mode) {
    currentUrlMode = mode;
    document.getElementById('urlEncodeBtn').classList.toggle('active', mode === 'encode');
    document.getElementById('urlDecodeBtn').classList.toggle('active', mode === 'decode');
}

function processUrl() {
    const input = document.getElementById('urlInput').value;
    if (!input) { showToast('请输入文本', 'error'); return; }
    let result;
    try {
        result = currentUrlMode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
        document.getElementById('urlOutput').value = result;
        document.getElementById('urlResultBox').style.display = 'block';
        showToast('转换成功');
    } catch (e) {
        showToast('解码失败，请检查输入是否有效', 'error');
    }
}

function copyUrlResult() {
    const output = document.getElementById('urlOutput');
    if (!output.value) return;
    navigator.clipboard.writeText(output.value).then(() => showToast('已复制到剪贴板')).catch(() => showToast('复制失败', 'error'));
}

function convertColor() {
    const input = document.getElementById('colorInput').value.trim();
    if (!input) return;

    let r, g, b, h, s, l;
    let hex = '';

    if (input.startsWith('#')) {
        hex = input;
        const result = hexToRgb(input);
        if (result) {
            r = result.r; g = result.g; b = result.b;
            const hslResult = rgbToHsl(r, g, b);
            h = hslResult.h; s = hslResult.s; l = hslResult.l;
        } else {
            showToast('无效的HEX颜色值', 'error');
            return;
        }
    } else if (input.startsWith('rgb')) {
        const result = input.match(/\d+/g);
        if (result && result.length >= 3) {
            r = parseInt(result[0]); g = parseInt(result[1]); b = parseInt(result[2]);
            hex = rgbToHex(r, g, b);
            const hslResult = rgbToHsl(r, g, b);
            h = hslResult.h; s = hslResult.s; l = hslResult.l;
        } else {
            showToast('无效的RGB颜色值', 'error');
            return;
        }
    } else if (input.startsWith('hsl')) {
        const result = input.match(/[\d.]+/g);
        if (result && result.length >= 3) {
            h = parseFloat(result[0]); s = parseFloat(result[1]); l = parseFloat(result[2]);
            const rgbResult = hslToRgb(h, s, l);
            r = rgbResult.r; g = rgbResult.g; b = rgbResult.b;
            hex = rgbToHex(r, g, b);
        } else {
            showToast('无效的HSL颜色值', 'error');
            return;
        }
    } else {
        showToast('请输入有效的颜色值（HEX、RGB或HSL）', 'error');
        return;
    }

    document.getElementById('colorPreview').style.backgroundColor = hex;
    document.getElementById('hexOutput').value = hex;
    document.getElementById('rgbOutput').value = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('hslOutput').value = `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
    document.getElementById('colorOutputs').style.display = 'block';
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r, g, b) {
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
}

function hslToRgb(h, s, l) {
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
}

function copyColorValue(id) {
    const value = document.getElementById(id).value;
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => showToast('已复制到剪贴板')).catch(() => showToast('复制失败', 'error'));
}

function updateCurrentTimestamp() {
    const now = Date.now();
    const timestamp = Math.floor(now / 1000);
    document.getElementById('currentTimestamp').textContent = timestamp;
    const date = new Date();
    document.getElementById('currentDate').textContent = date.toLocaleString('zh-CN', { hour12: false });
}

function timestampToDate() {
    const input = document.getElementById('timestampInput').value;
    if (!input) { showToast('请输入时间戳', 'error'); return; }
    try {
        const timestamp = parseInt(input) * 1000;
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) throw new Error('Invalid date');
        document.getElementById('timestampResultValue').textContent = date.toLocaleString('zh-CN', { hour12: false });
        document.getElementById('timestampResult').style.display = 'block';
        showToast('转换成功');
    } catch (e) {
        showToast('无效的时间戳', 'error');
    }
}

function dateToTimestamp() {
    const input = document.getElementById('dateInput').value;
    if (!input) { showToast('请选择日期', 'error'); return; }
    try {
        const date = new Date(input);
        const timestamp = Math.floor(date.getTime() / 1000);
        document.getElementById('timestampResultValue').textContent = timestamp;
        document.getElementById('timestampResult').style.display = 'block';
        showToast('转换成功');
    } catch (e) {
        showToast('无效的日期', 'error');
    }
}

function copyTimestamp() {
    const value = document.getElementById('currentTimestamp').textContent;
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => showToast('已复制到剪贴板')).catch(() => showToast('复制失败', 'error'));
}
