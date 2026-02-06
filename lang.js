const translations = {
  zh: {
    title: "OpenClaw第三方api配置生成器",
    label_baseurl: "Base URL",
    label_provider: "提供商（快捷选择）",
    label_apimode: "API模式",
    label_model_id: "模型ID",
    label_apikey: "API Key",
    label_config: "Config (JSON/String)",
    placeholder_baseurl: "输入自定义 Base URL",
    placeholder_provider: "输入自定义提供商",
    placeholder_apimode: "输入自定义 API 模式",
    placeholder_model_id: "输入自定义模型 ID",
    placeholder_apikey: "请输入 apikey，请至第三方API站中的令牌管理处获取",
    placeholder_config: "粘贴您的~/.openclaw/openclaw.json内容，或在您的openclaw的web控制台中的setting下的config选项卡中，切换为Raw模式找到",
    btn_send: "发送",
    btn_copy: "复制",
    status_ready: "就绪",
    status_processing: "处理中...",
    status_done: "完成",
    status_failed: "失败",
    copied: "已复制",
    custom: "自定义",
    output_placeholder: "响应将显示在这里",
    err_no_config: "错误: 请输入 Config JSON",
    err_no_baseurl: "错误: 请选择或输入 Base URL",
    err_no_apikey: "错误: 请输入 API Key",
    err_json_parse: "配置 JSON 格式错误"
  },
  en: {
    title: "OpenClaw 3rd-Party API Config Generator",
    label_baseurl: "Base URL",
    label_provider: "Provider (Quick Select)",
    label_apimode: "API Mode",
    label_model_id: "Model ID",
    label_apikey: "API Key",
    label_config: "Config (JSON/String)",
    placeholder_baseurl: "Enter custom Base URL",
    placeholder_provider: "Enter custom provider",
    placeholder_apimode: "Enter custom API mode",
    placeholder_model_id: "Enter custom model ID",
    placeholder_apikey: "Enter your API key from the 3rd-party API provider's token management",
    placeholder_config: "Paste your ~/.openclaw/openclaw.json content, or find it in the OpenClaw web console under Settings > Config tab (switch to Raw mode)",
    btn_send: "Send",
    btn_copy: "Copy",
    status_ready: "Ready",
    status_processing: "Processing...",
    status_done: "Done",
    status_failed: "Failed",
    copied: "Copied",
    custom: "Custom",
    output_placeholder: "Output will appear here",
    err_no_config: "Error: Please enter Config JSON",
    err_no_baseurl: "Error: Please select or enter Base URL",
    err_no_apikey: "Error: Please enter API Key",
    err_json_parse: "Invalid config JSON format"
  }
};

let currentLang = "zh";

function t(key) {
  return translations[currentLang][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = t("title");

  // Update text content
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // Update "custom" options in all selects
  document.querySelectorAll("option[value='custom']").forEach(opt => {
    opt.textContent = t("custom");
  });

  // Update lang switcher button
  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.textContent = lang === "zh" ? "EN" : "中文";
  }
}

// Initialize: localStorage > browser language > default zh
(function initLang() {
  const saved = localStorage.getItem("lang");
  if (saved && translations[saved]) {
    currentLang = saved;
  } else {
    const browserLang = navigator.language || navigator.userLanguage || "";
    currentLang = browserLang.startsWith("zh") ? "zh" : "en";
  }
  // setLang will be called after DOM is ready (in index.html)
})();
