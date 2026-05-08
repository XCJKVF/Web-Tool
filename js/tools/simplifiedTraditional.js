// 简繁体转换工具
const SimplifiedTraditional = {
    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        // 事件监听器将在主应用中设置
    },

    toTraditional(simplified) {
        const traditionalMap = {
            '义': '義', '饥': '饑', '厂': '廠', '广': '廣', '门': '門', '为': '為', '丰': '豐', '开': '開', '关': '關', '观': '觀', '欢': '歡', '孙': '孫', '阳': '陽', '严': '嚴', '并': '併', '戏': '戲', '买': '買', '卖': '賣', '学': '學', '对': '對', '寻': '尋', '导': '導', '层': '層', '屡': '屢', '岛': '島', '云': '雲', '专': '專', '体': '體', '余': '餘', '系': '係', '纤': '纖', '约': '約', '划': '劃', '迈': '邁', '艰': '艱', '咸': '鹹', '戚': '戚', '戈': '戈', '戊': '戊', '戡': '戡', '戢': '戢', '戤': '戤', '岁': '歲', '岂': '豈', '凯': '凱', '志': '誌', '决': '決', '兑': '兌', '况': '況', '凶': '兇', '具': '具', '杂': '雜', '杆': '桿', '杠': '槓', '杖': '杖', '材': '材', '村': '村', '杏': '杏', '杉': '杉', '巫': '巫', '巨': '巨', '丧': '喪', '个': '個', '临': '臨', '丸': '丸', '丹': '丹', '主': '主', '举': '舉', '乃': '乃', '久': '久', '么': '么', '之': '之', '乌': '烏', '乍': '乍', '乎': '乎', '乏': '乏', '乐': '樂', '乒': '乒', '丘': '丘', '丙': '丙', '业': '業', '丛': '叢', '东': '東', '丝': '絲', '丢': '丟', '两': '兩', '严': '嚴', '中': '中', '丰': '豐', '临': '臨', '个': '個'
        };
        return simplified.split('').map(char => traditionalMap[char] || char).join('');
    },

    toSimplified(traditional) {
        const simplifiedMap = {
            '義': '义', '饑': '饥', '廠': '厂', '廣': '广', '門': '门', '為': '为', '豐': '丰', '開': '开', '關': '关', '觀': '观', '歡': '欢', '孫': '孙', '陽': '阳', '嚴': '严', '併': '并', '戲': '戏', '買': '买', '賣': '卖', '學': '学', '對': '对', '尋': '寻', '導': '导', '層': '层', '屢': '屡', '島': '岛', '雲': '云', '專': '专', '體': '体', '餘': '余', '係': '系', '纖': '纤', '約': '约', '劃': '划', '邁': '迈', '艱': '艰', '鹹': '咸', '戚': '戚', '戈': '戈', '戊': '戊', '戡': '戡', '戢': '戢', '戤': '戤', '歲': '岁', '豈': '岂', '凱': '凯', '誌': '志', '決': '決', '兌': '兑', '況': '況', '兇': '凶', '具': '具', '雜': '杂', '桿': '杆', '槓': '槓', '杖': '杖', '材': '材', '村': '村', '杏': '杏', '杉': '杉', '巫': '巫', '巨': '巨', '喪': '丧', '個': '个', '臨': '临', '丸': '丸', '丹': '丹', '主': '主', '舉': '举', '乃': '乃', '久': '久', '么': '么', '之': '之', '烏': '乌', '乍': '乍', '乎': '乎', '乏': '乏', '樂': '乐', '乒': '乒', '丘': '丘', '丙': '丙', '業': '业', '叢': '丛', '東': '东', '絲': '丝', '丟': '丢', '兩': '两', '嚴': '严', '豐': '丰', '臨': '临'
        };
        return traditional.split('').map(char => simplifiedMap[char] || char).join('');
    },

    convertToTraditional() {
        const input = document.getElementById(SELECTORS.stInput).value;
        if (!input) {
            Utils.showToast('请输入要转换的文本', 'error');
            return;
        }
        const output = this.toTraditional(input);
        document.getElementById(SELECTORS.stOutput).value = output;
        Utils.toggleElement(SELECTORS.stResultBox, true);
        Utils.showToast('已转换为繁体');
    },

    convertToSimplified() {
        const input = document.getElementById(SELECTORS.stInput).value;
        if (!input) {
            Utils.showToast('请输入要转换的文本', 'error');
            return;
        }
        const output = this.toSimplified(input);
        document.getElementById(SELECTORS.stOutput).value = output;
        Utils.toggleElement(SELECTORS.stResultBox, true);
        Utils.showToast('已转换为简体');
    },

    copy() {
        const output = document.getElementById(SELECTORS.stOutput);
        if (!output.value) return;
        Utils.copyToClipboard(output.value);
    }
};