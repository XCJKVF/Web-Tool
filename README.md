# 工具集合 - Web-Tool

一个集成了多个基础工具的前端网页，包括图片格式转换、MD5加密、简繁体转换、二维码生成等功能。

## 项目结构

```
Web-Tool/
├── css/
│   └── style.css          # 样式文件
├── js/
│   ├── app.js            # 主应用程序
│   ├── config.js         # 配置文件
│   ├── utils.js          # 工具函数
│   └── tools/           # 工具模块
│       ├── imageConverter.js  # 图片格式转换
│       ├── md5.js            # MD5加密
│       ├── simplifiedTraditional.js  # 简繁体转换
│       ├── qrcode.js         # 二维码生成
│       ├── base64.js         # Base64编码/解码
│       ├── urlCodec.js       # URL编码/解码
│       ├── colorConverter.js # 颜色格式转换
│       └── timestamp.js      # 时间戳转换
├── index.html            # 主页面
├── package.json          # 项目配置
└── README.md             # 说明文档
```

## 功能列表

### 格式转换
- **图片格式转换**：支持JPG、PNG、WebP、GIF、BMP互转
- **简繁体转换**：简体繁体实时互转
- **颜色格式转换**：HEX、RGB、HSL互转

### 编码加密
- **MD5加密**：文本MD5哈希加密
- **Base64编码**：Base64编码解码
- **URL编码**：URL编码解码

### 生成工具
- **二维码生成**：文本或URL生成二维码，支持自定义尺寸

### 其他工具
- **时间戳转换**：Unix时间戳与日期互转

## 技术特点

1. **模块化设计**：每个工具都是独立的模块，便于维护和扩展
2. **响应式布局**：适配各种屏幕尺寸
3. **用户友好**：清晰的操作界面和实时反馈
4. **无需后端**：纯前端实现，即开即用

## 使用方法

1. 直接打开 `index.html` 即可在浏览器中使用
2. 或者通过本地服务器启动：
   ```bash
   cd Web-Tool
   python -m http.server 8000
   ```
3. 访问 http://localhost:8000

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 开发说明

### 添加新工具

1. 在 `js/tools/` 目录下创建新的工具文件
2. 遵循现有的模块结构
3. 在 `js/app.js` 中注册新工具
4. 在 `index.html` 中添加工具卡片和面板

### 代码规范

- 使用 ES6+ 语法
- 遵循模块化开发
- 保持代码风格一致
- 添加适当的注释

## 许可证

MIT