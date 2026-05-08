// 正则表达式测试工具
const RegexTester = {
    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        // 事件监听器将在主应用中设置
    },

    test() {
        const pattern = document.getElementById('regexPattern').value;
        const input = document.getElementById('regexInput').value;
        const flags = document.getElementById('regexFlags').value;
        const resultsDiv = document.getElementById('regexResults');
        const errorDiv = document.getElementById('regexError');

        if (!pattern || !input) {
            UtilsSimple.showToast('请输入正则表达式和测试文本', 'error');
            return;
        }

        try {
            const regex = new RegExp(pattern, flags);
            const matches = input.match(regex);

            let html = '<h4>测试结果:</h4>';

            if (matches) {
                html += '<div class="success-message">找到匹配项</div>';
                html += '<div><strong>匹配数量:</strong> ' + matches.length + '</div>';

                if (matches.length > 0) {
                    html += '<div><strong>匹配项:</strong></div><ul>';
                    matches.forEach((match, index) => {
                        html += `<li><strong>匹配 ${index + 1}:</strong> "${match}"</li>`;
                    });
                    html += '</ul>';

                    // 显示第一个匹配的详细信息
                    const match = matches[0];
                    const matchIndex = input.indexOf(match);
                    html += `<div><strong>位置:</strong> ${matchIndex} - ${matchIndex + match.length}</div>`;

                    if (match.length > 0) {
                        html += '<div><strong>捕获组:</strong></div><ol>';
                        for (let i = 1; i < matches.length; i++) {
                            html += `<li>组 ${i}: "${matches[i] || '未捕获'}"</li>`;
                        }
                        html += '</ol>';
                    }
                }
            } else {
                html += '<div class="error-message">未找到匹配项</div>';
            }

            // 显示正则表达式信息
            html += '<div class="regex-info"><h4>正则表达式信息:</h4>';
            html += `<div><strong>完整表达式:</strong> /${pattern}/${flags}</div>`;

            // 测试常用正则特性
            const tests = {
                'global': regex.global ? '是' : '否',
                'ignoreCase': regex.ignoreCase ? '是' : '否',
                'multiline': regex.multiline ? '是' : '否',
                'unicode': regex.unicode ? '是' : '否',
                'sticky': regex.sticky ? '是' : '否'
            };

            html += '<div><strong>标志:</strong></div>';
            html += '<ul>';
            for (const [key, value] of Object.entries(tests)) {
                html += `<li>${key}: ${value}</li>`;
            }
            html += '</ul>';
            html += '</div>';

            resultsDiv.innerHTML = html;
            errorDiv.style.display = 'none';

        } catch (e) {
            errorDiv.textContent = '正则表达式错误: ' + e.message;
            errorDiv.style.display = 'block';
            resultsDiv.innerHTML = '';
            UtilsSimple.showToast('正则表达式格式错误', 'error');
        }
    },

    escape() {
        const pattern = document.getElementById('regexPattern').value;
        const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        document.getElementById('regexPattern').value = escaped;
        UtilsSimple.showToast('已转义特殊字符');
    },

    clear() {
        document.getElementById('regexPattern').value = '';
        document.getElementById('regexInput').value = '';
        document.getElementById('regexFlags').value = 'g';
        document.getElementById('regexResults').innerHTML = '';
        document.getElementById('regexError').style.display = 'none';
    },

    loadCommonPatterns() {
        const commonPatterns = {
            '邮箱': '^[\\w.-]+@[\\w.-]+\\.\\w+$',
            '手机号': '^1[3-9]\\d{9}$',
            'URL': '^https?://[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=]*$',
            'IPv4': '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
            '身份证': '^\\d{17}[\\dXx]$',
            '中文': '[\\u4e00-\\u9fa5]+',
            '数字': '^\\d+$',
            '字母': '^[a-zA-Z]+$'
        };

        const select = document.getElementById('commonPatterns');
        select.innerHTML = '<option value="">选择常用模式...</option>';
        for (const [name, pattern] of Object.entries(commonPatterns)) {
            const option = document.createElement('option');
            option.value = pattern;
            option.textContent = name;
            select.appendChild(option);
        }
    },

    selectCommon() {
        const select = document.getElementById('commonPatterns');
        if (select.value) {
            document.getElementById('regexPattern').value = select.value;
            UtilsSimple.showToast('已选择常用模式');
        }
    }
};