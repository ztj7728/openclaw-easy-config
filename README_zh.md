[English](README.md) | **中文**

# OpenClaw 第三方 API 配置生成器

一个简洁的 Web 工具，用于快速生成 OpenClaw 配置文件。

🌐 **在线体验**：[https://openclaw-easy-config.pages.dev/](https://openclaw-easy-config.pages.dev/)

## ✨ 功能特点

- 🎯 支持多个第三方 API 提供商（ollama 等）
- 🔧 可自定义 Base URL、提供商，以及按模型绑定的 API 模式、多个模型 ID，并可选声明思考与图像理解能力
- 🧩 Config 输入支持 JSON5，包括注释、尾随逗号等语法
- 📋 一键复制生成的配置 JSON
- 💻 无需后端，纯前端实现
- 🌐 支持中英文双语切换

## ✅ 已测试供应商

| 供应商 | Base URL | 状态 | API模式 |
|--------|----------|------|------|
| OpenRouter | `https://openrouter.ai/api/v1` | ✅ 已测试 | openai-completions |
| DeepSeek | `https://api.deepseek.com` | ✅ 已测试 | openai-completions |
| SiliconFlow | `https://api.siliconflow.cn` | ✅ 已测试 | openai-completions/anthropic-messages |
| ollama | `http://localhost:11434/v1` | ✅ 已测试 | openai-completions |

> 标记 ✅ 的供应商已验证可在 OpenClaw 中正常使用。未测试的供应商可能同样可用，欢迎贡献测试结果！
> 某些提供商的openai-completions端点仅支持/v1（如new-api基座），所以若无法连通，我希望您可以尝试在api端点后方添加/v1。

## 🚀 快速开始

### 在线部署（推荐）

#### 方式 1：Cloudflare Pages（免费 + CDN 加速）

1. Fork 本仓库到你的 GitHub 账号
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 **Workers & Pages** → **Create application** → **想要部署 Pages？开始使用** → **Connect to Git**
4. 选择你 Fork 的仓库
5. 构建设置：
   - **Build command**: 留空
   - **Build output directory**: `/`
6. 点击 **Save and Deploy**
7. 几秒后即可通过 `https://your-project.pages.dev` 访问

#### 方式 2：GitHub Pages（免费）

1. Fork 本仓库
2. 进入仓库 **Settings** → **Pages**
3. Source 选择 `main` 分支，目录选择 `/`（root）
4. 保存后通过 `https://你的用户名.github.io/仓库名/` 访问

#### 方式 3：Vercel（一键部署）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ztj7728/openclaw-easy-config)

**为什么推荐部署到云端？**
- ✅ 无需安装，随时随地访问
- ✅ 全球 CDN 加速，速度更快
- ✅ 免费且永久可用
- ✅ 支持 HTTPS 安全连接
- ✅ 自动更新，push 代码即部署

### 本地使用

直接在浏览器中打开 `index.html` 文件即可使用。

### 本地开发

1. 克隆仓库：
```bash
git clone https://github.com/ztj7728/openclaw-easy-config.git
cd openclaw-easy-config
```

2. 双击打开 `index.html` 或使用 HTTP 服务器：

```bash
# Python 3
python -m http.server 8000

# Node.js (需要安装 http-server)
npx http-server

# PHP
php -S localhost:8000
```

然后访问 `http://localhost:8000`

## 📖 使用说明

1. **选择或输入 Base URL**：从下拉列表选择预设的 API 地址，或选择"自定义"输入自己的地址
2. **选择提供商**：选择 API 提供商（会自动匹配对应的 Base URL）
3. **添加模型**：可添加多个模型 ID，不需要的可删除
4. **为每个模型配置 API 模式**：为每个模型选择 `anthropic-messages`、`openai-completions` 或自定义模式
5. **按需勾选能力**：勾选“支持思考”会写入 `"reasoning": true`，勾选“支持图像理解”会写入 `"input": ["text", "image"]`
6. **输入 API Key**：填入从第三方 API 站获取的令牌
7. **粘贴原配置**：粘贴您的 `~/.openclaw/openclaw.json` 内容，支持 JSON 或 JSON5 格式
8. **点击发送**：生成新的配置文件
9. **复制结果**：点击"复制"按钮将生成的配置复制到剪贴板

## 🛠️ 技术栈

- 纯 HTML + CSS + JavaScript
- 通过 CDN 在浏览器端解析 JSON5
- 使用现代 ES6+ 语法

## 📦 文件结构

```
openclaw_3rd_api_config/
├── index.html      # 主页面
├── script.js       # JavaScript 逻辑
├── lang.js         # 国际化（i18n）翻译
├── README.md       # 项目说明（英文）
├── README_zh.md    # 项目说明（中文）
└── LICENSE         # MIT 许可证
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建新分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 致谢

感谢所有贡献者和 OpenClaw 社区的支持！

---

**提示**：如需添加新的 API 提供商，请编辑 `script.js` 中的 `providerBaseUrlMap`；如需为模型预设默认 API 模式，请编辑 `script.js` 中的 `modelApiModeMap`。
