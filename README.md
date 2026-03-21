**English** | [中文](README_zh.md)

# OpenClaw 3rd-Party API Config Generator

A lightweight web tool for quickly generating OpenClaw configuration files.

🌐 **Live Demo**: [https://openclaw-easy-config.pages.dev/](https://openclaw-easy-config.pages.dev/)

## ✨ Features

- 🎯 Supports multiple 3rd-party API providers (ollama, etc.)
- 🔧 Customizable Base URL, provider, per-model API mode and model IDs, plus optional reasoning and image understanding flags
- 🧩 Supports JSON5 input for Config, including comments and trailing commas
- 📋 One-click copy of generated config JSON
- 💻 No backend required — runs entirely in the browser
- 🌐 Bilingual support (English / Chinese)

## ✅ Tested Providers

| Provider | Base URL | Status | Api Mode |
|----------|----------|--------|--------|
| OpenRouter | `https://openrouter.ai/api/v1` | ✅ Tested | openai-completions |
| DeepSeek | `https://api.deepseek.com` | ✅ Tested | openai-completions |
| SiliconFlow | `https://api.siliconflow.cn` | ✅ Tested | openai-completions/anthropic-messages |
| ollama | `http://localhost:11434/v1` | ✅ Tested | openai-completions |

> Providers marked ✅ have been verified to work with OpenClaw. Untested providers may still work — contributions welcome!
> Some providers' openai-completions endpoints only support /v1 (such as the new-api base), so if you cannot connect, I suggest you try adding /v1 after the api endpoint.

## 🚀 Quick Start

### Cloud Deployment (Recommended)

#### Option 1: Cloudflare Pages (Free + CDN)

1. Fork this repository to your GitHub account
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
4. Select your forked repository
5. Build settings:
   - **Build command**: leave empty
   - **Build output directory**: `/`
6. Click **Save and Deploy**
7. Access via `https://your-project.pages.dev`

#### Option 2: GitHub Pages (Free)

1. Fork this repository
2. Go to repository **Settings** → **Pages**
3. Set Source to `main` branch, directory `/` (root)
4. Access via `https://your-username.github.io/repo-name/`

#### Option 3: Vercel (One-click Deploy)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ztj7728/openclaw-easy-config)

**Why deploy to the cloud?**
- ✅ No installation needed — access from anywhere
- ✅ Global CDN for faster loading
- ✅ Free and always available
- ✅ HTTPS secure connection
- ✅ Auto-deploy on push

### Local Usage

Open `index.html` directly in your browser.

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/ztj7728/openclaw-easy-config.git
cd openclaw-easy-config
```

2. Open `index.html` directly or use an HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📖 Usage

1. **Select or enter Base URL** — pick a preset API address from the dropdown, or choose "Custom"
2. **Select Provider** — choose an API provider (Base URL auto-fills accordingly)
3. **Add Models** — add one or more model IDs
4. **Set API Mode for Each Model** — choose `anthropic-messages`, `openai-completions`, or a custom mode for every model
5. **Toggle Capabilities When Needed** — enable reasoning to output `"reasoning": true`, and enable image understanding to output `"input": ["text", "image"]`
6. **Enter API Key** — paste the token from your 3rd-party API provider
7. **Paste Config** — paste your `~/.openclaw/openclaw.json` content in JSON or JSON5 format
8. **Click Send** — generate the new configuration
9. **Copy Result** — click the "Copy" button to copy the output to clipboard

## 🛠️ Tech Stack

- Pure HTML + CSS + JavaScript
- Browser-side JSON5 parsing via CDN
- Modern ES6+ syntax

## 📦 File Structure

```
openclaw_3rd_api_config/
├── index.html      # Main page
├── script.js       # Application logic
├── lang.js         # i18n translations
├── README.md       # Documentation (English)
├── README_zh.md    # Documentation (Chinese)
└── LICENSE         # MIT License
```

## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork this repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Thanks to all contributors and the OpenClaw community!

---

**Tip**: To add a new API provider, edit `providerBaseUrlMap`; to define a default API mode for a model, edit `modelApiModeMap` in `script.js`.
