// JSON 格式化工具
const JSONFormatter = {
    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        // 事件监听器将在主应用中设置
    },

    format() {
        const input = document.getElementById('jsonInput').value;
        const output = document.getElementById('jsonOutput');
        const errorDiv = document.getElementById('jsonError');

        if (!input.trim()) {
            UtilsSimple.showToast('请输入JSON文本', 'error');
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            output.textContent = formatted;
            errorDiv.style.display = 'none';
            UtilsSimple.showToast('JSON格式化成功');
        } catch (e) {
            errorDiv.textContent = 'JSON格式错误: ' + e.message;
            errorDiv.style.display = 'block';
            output.textContent = '';
            UtilsSimple.showToast('JSON格式错误', 'error');
        }
    },

    minify() {
        const input = document.getElementById('jsonInput').value;
        const output = document.getElementById('jsonOutput');
        const errorDiv = document.getElementById('jsonError');

        if (!input.trim()) {
            UtilsSimple.showToast('请输入JSON文本', 'error');
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            output.textContent = minified;
            errorDiv.style.display = 'none';
            UtilsSimple.showToast('JSON压缩成功');
        } catch (e) {
            errorDiv.textContent = 'JSON格式错误: ' + e.message;
            errorDiv.style.display = 'block';
            output.textContent = '';
            UtilsSimple.showToast('JSON格式错误', 'error');
        }
    },

    validate() {
        const input = document.getElementById('jsonInput').value;
        const output = document.getElementById('jsonOutput');
        const errorDiv = document.getElementById('jsonError');
        const resultDiv = document.getElementById('jsonResult');

        if (!input.trim()) {
            resultDiv.innerHTML = '<span class="text-warning">请输入JSON文本</span>';
            errorDiv.style.display = 'none';
            output.textContent = '';
            return;
        }

        try {
            JSON.parse(input);
            resultDiv.innerHTML = '<span class="text-success">✓ 有效的JSON</span>';
            errorDiv.style.display = 'none';
            output.textContent = input;
            UtilsSimple.showToast('JSON验证通过');
        } catch (e) {
            resultDiv.innerHTML = '<span class="text-error">✗ 无效的JSON</span>';
            errorDiv.textContent = '错误: ' + e.message;
            errorDiv.style.display = 'block';
            output.textContent = '';
        }
    },

    clear() {
        document.getElementById('jsonInput').value = '';
        document.getElementById('jsonOutput').textContent = '';
        document.getElementById('jsonError').style.display = 'none';
        document.getElementById('jsonResult').innerHTML = '';
    },

    copy() {
        const output = document.getElementById('jsonOutput').textContent;
        if (!output) {
            UtilsSimple.showToast('没有可复制的内容', 'error');
            return;
        }
        UtilsSimple.copyToClipboard(output);
    },

    loadSample() {
        const sample = {
            "name": "示例对象",
            "version": "1.0.0",
            "description": "这是一个JSON示例对象",
            "properties": {
                "id": 123,
                "active": true,
                "tags": ["json", "example", "demo"],
                "metadata": {
                    "created": "2024-01-01T00:00:00Z",
                    "modified": "2024-01-01T00:00:00Z"
                }
            },
            "array": [
                {"item": 1},
                {"item": 2},
                {"item": 3}
            ]
        };
        document.getElementById('jsonInput').value = JSON.stringify(sample, null, 2);
        UtilsSimple.showToast('已加载示例JSON');
    }
};