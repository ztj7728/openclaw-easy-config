const sendBtn = document.getElementById("sendBtn");
const statusEl = document.getElementById("status");
const outputEl = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");
const modelListEl = document.getElementById("modelList");
const addModelBtn = document.getElementById("addModelBtn");

// Provider to Base URL mapping - ONLY MAINTAIN THIS!
const providerBaseUrlMap = {
  "DeepSeek": "https://api.deepseek.com",
  "SiliconFlow": "https://api.siliconflow.cn",
  "ollama": "http://localhost:11434",
  "ephone": "https://api.ephone.chat",
  "ephone-v1": "https://api.ephone.chat/v1",
  "MiloCode": "https://api.joyzhi.com",
  "MiloCode-v1": "https://api.joyzhi.com/v1"
};

// Model to API mode mapping - ONLY MAINTAIN THIS!
const modelApiModeMap = {
  "deepseek-chat": "openai-completions",
  "deepseek-reasoner": "openai-completions",
  "claude-sonnet-4-6": "anthropic-messages",
  "gpt-5.4": "openai-responses",
  "gpt-5.3-codex": "openai-responses",
  "gpt-5-mini": "openai-responses",
  "gemini-3-pro-preview": "google-generative-ai"
};

// Model capability presets - ONLY MAINTAIN THIS!
const modelCapabilityPresetMap = {
  "deepseek-reasoner": {
    reasoning: true
  },
  "gpt-5.4": {
    input: ["text", "image"],
    reasoning: true
  },
  "gpt-5.3-codex": {
    reasoning: true
  },
  "gemini-3-pro-preview": {
    reasoning: true,
    input: ["text", "image"]
  }
};

const modelOptions = Object.keys(modelApiModeMap);
const apimodeOptions = [...new Set(Object.values(modelApiModeMap))];

// Dynamically populate provider select
const providerSelect = document.getElementById("provider");
Object.keys(providerBaseUrlMap).forEach(provider => {
  const option = document.createElement("option");
  option.value = provider;
  option.textContent = provider;
  providerSelect.appendChild(option);
});
const customProviderOption = document.createElement("option");
customProviderOption.value = "custom";
customProviderOption.textContent = t("custom");
providerSelect.appendChild(customProviderOption);

// Dynamically populate baseurl select
const baseurlSelect = document.getElementById("baseurl");
const uniqueUrls = [...new Set(Object.values(providerBaseUrlMap))];
uniqueUrls.forEach(url => {
  const option = document.createElement("option");
  option.value = url;
  option.textContent = url;
  baseurlSelect.appendChild(option);
});
const customBaseurlOption = document.createElement("option");
customBaseurlOption.value = "custom";
customBaseurlOption.textContent = t("custom");
baseurlSelect.appendChild(customBaseurlOption);

// Handle custom input visibility
const fields = ["baseurl", "provider"];
fields.forEach(field => {
  const select = document.getElementById(field);
  const customInput = document.getElementById(`${field}_custom`);

  select.addEventListener("change", () => {
    if (select.value === "custom") {
      customInput.classList.add("show");
    } else {
      customInput.classList.remove("show");
    }
  });
});

function updateModelRemoveState() {
  const removeButtons = modelListEl.querySelectorAll(".remove-model");
  const disableRemove = removeButtons.length <= 1;
  removeButtons.forEach(btn => {
    btn.disabled = disableRemove;
  });
}

function syncApimodeWithModel(modelId, apimodeSelect, customInput) {
  if (!modelId || !modelApiModeMap[modelId] || !apimodeSelect) {
    return;
  }

  apimodeSelect.value = modelApiModeMap[modelId];
  if (customInput) {
    customInput.classList.remove("show");
  }
}

function syncCapabilitiesWithModel(modelId, reasoningCheckbox, imageCheckbox) {
  if (!reasoningCheckbox || !imageCheckbox) {
    return;
  }

  const capabilityPreset = modelCapabilityPresetMap[modelId] || {};
  const inputTypes = Array.isArray(capabilityPreset.input) ? capabilityPreset.input : [];

  reasoningCheckbox.checked = capabilityPreset.reasoning === true;
  imageCheckbox.checked = inputTypes.includes("image");
}

function createCapabilityOption(translationKey, className) {
  const label = document.createElement("label");
  label.className = "capability-option";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = className;

  const text = document.createElement("span");
  text.setAttribute("data-i18n", translationKey);
  text.textContent = t(translationKey);

  label.appendChild(checkbox);
  label.appendChild(text);

  return { label, checkbox };
}

function createModelRow(initialModel) {
  const row = document.createElement("div");
  row.className = "model-row";

  const modelWrapper = document.createElement("div");
  modelWrapper.className = "field-wrapper";

  const modelSelect = document.createElement("select");
  modelSelect.className = "model-select";

  modelOptions.forEach(modelId => {
    const option = document.createElement("option");
    option.value = modelId;
    option.textContent = modelId;
    modelSelect.appendChild(option);
  });

  const customOption = document.createElement("option");
  customOption.value = "custom";
  customOption.textContent = t("custom");
  modelSelect.appendChild(customOption);

  const modelCustomInput = document.createElement("input");
  modelCustomInput.type = "text";
  modelCustomInput.className = "custom-input model-custom";
  modelCustomInput.setAttribute("data-i18n-placeholder", "placeholder_model_id");
  modelCustomInput.placeholder = t("placeholder_model_id");

  const apimodeWrapper = document.createElement("div");
  apimodeWrapper.className = "field-wrapper";

  const apimodeSelect = document.createElement("select");
  apimodeSelect.className = "model-apimode-select";

  apimodeOptions.forEach(mode => {
    const option = document.createElement("option");
    option.value = mode;
    option.textContent = mode;
    apimodeSelect.appendChild(option);
  });

  const customApimodeOption = document.createElement("option");
  customApimodeOption.value = "custom";
  customApimodeOption.textContent = t("custom");
  apimodeSelect.appendChild(customApimodeOption);

  const apimodeCustomInput = document.createElement("input");
  apimodeCustomInput.type = "text";
  apimodeCustomInput.className = "custom-input model-apimode-custom";
  apimodeCustomInput.setAttribute("data-i18n-placeholder", "placeholder_apimode");
  apimodeCustomInput.placeholder = t("placeholder_apimode");

  const capabilityWrapper = document.createElement("div");
  capabilityWrapper.className = "model-capabilities";

  const reasoningOption = createCapabilityOption("label_model_reasoning", "model-reasoning");
  const imageOption = createCapabilityOption("label_model_image", "model-image");

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "ghost-btn remove-model";
  removeBtn.setAttribute("data-i18n", "btn_remove_model");
  removeBtn.textContent = t("btn_remove_model");

  modelSelect.addEventListener("change", () => {
    if (modelSelect.value === "custom") {
      modelCustomInput.classList.add("show");
    } else {
      modelCustomInput.classList.remove("show");
      syncApimodeWithModel(modelSelect.value, apimodeSelect, apimodeCustomInput);
      syncCapabilitiesWithModel(modelSelect.value, reasoningOption.checkbox, imageOption.checkbox);
    }
  });

  apimodeSelect.addEventListener("change", () => {
    if (apimodeSelect.value === "custom") {
      apimodeCustomInput.classList.add("show");
    } else {
      apimodeCustomInput.classList.remove("show");
    }
  });

  removeBtn.addEventListener("click", () => {
    row.remove();
    updateModelRemoveState();
  });

  modelWrapper.appendChild(modelSelect);
  modelWrapper.appendChild(modelCustomInput);
  apimodeWrapper.appendChild(apimodeSelect);
  apimodeWrapper.appendChild(apimodeCustomInput);
  capabilityWrapper.appendChild(reasoningOption.label);
  capabilityWrapper.appendChild(imageOption.label);
  row.appendChild(modelWrapper);
  row.appendChild(apimodeWrapper);
  row.appendChild(capabilityWrapper);
  row.appendChild(removeBtn);

  if (initialModel) {
    if (modelOptions.includes(initialModel.id)) {
      modelSelect.value = initialModel.id;
      syncApimodeWithModel(initialModel.id, apimodeSelect, apimodeCustomInput);
    } else {
      modelSelect.value = "custom";
      modelCustomInput.classList.add("show");
      modelCustomInput.value = initialModel.id;
    }

    if (initialModel.api) {
      if (apimodeOptions.includes(initialModel.api)) {
        apimodeSelect.value = initialModel.api;
      } else {
        apimodeSelect.value = "custom";
        apimodeCustomInput.classList.add("show");
        apimodeCustomInput.value = initialModel.api;
      }
    }

    reasoningOption.checkbox.checked = initialModel.reasoning === true;
    imageOption.checkbox.checked = Array.isArray(initialModel.input) && initialModel.input.includes("image");
  } else {
    modelSelect.value = modelOptions[0];
    syncApimodeWithModel(modelOptions[0], apimodeSelect, apimodeCustomInput);
    syncCapabilitiesWithModel(modelOptions[0], reasoningOption.checkbox, imageOption.checkbox);
  }

  modelListEl.appendChild(row);
  updateModelRemoveState();
}

function getModelConfigs() {
  const rows = modelListEl.querySelectorAll(".model-row");
  const modelConfigs = [];

  rows.forEach(row => {
    const modelSelect = row.querySelector(".model-select");
    const modelCustomInput = row.querySelector(".model-custom");
    const apimodeSelect = row.querySelector(".model-apimode-select");
    const apimodeCustomInput = row.querySelector(".model-apimode-custom");
    const reasoningCheckbox = row.querySelector(".model-reasoning");
    const imageCheckbox = row.querySelector(".model-image");
    const modelId = modelSelect.value === "custom" ? modelCustomInput.value.trim() : modelSelect.value;
    const apiMode = apimodeSelect.value === "custom" ? apimodeCustomInput.value.trim() : apimodeSelect.value;

    if (modelId || apiMode) {
      modelConfigs.push({
        id: modelId,
        api: apiMode,
        reasoning: reasoningCheckbox.checked,
        supportsImageInput: imageCheckbox.checked
      });
    }
  });

  return modelConfigs;
}

addModelBtn.addEventListener("click", () => {
  createModelRow();
});

createModelRow();

// Bind provider to baseurl
const baseurlCustom = document.getElementById("baseurl_custom");

providerSelect.addEventListener("change", () => {
  const provider = providerSelect.value;

  if (provider === "custom") {
    // Don't change baseurl when provider is custom
    return;
  }

  if (providerBaseUrlMap[provider]) {
    baseurlSelect.value = providerBaseUrlMap[provider];
    baseurlCustom.classList.remove("show");
  }
});

function setStatus(text) { statusEl.textContent = text; }

function parseConfigInput(rawConfig) {
  if (!rawConfig) {
    throw new Error(t("err_no_config"));
  }

  if (window.JSON5 && typeof window.JSON5.parse === "function") {
    try {
      return window.JSON5.parse(rawConfig);
    } catch (error) {
      throw new Error(t("err_json_parse") + ": " + error.message);
    }
  }

  try {
    return JSON.parse(rawConfig);
  } catch (error) {
    throw new Error(t("err_json5_unavailable") + "\n" + t("err_json_parse") + ": " + error.message);
  }
}

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(outputEl.textContent || "");
    copyBtn.textContent = t("copied");
    setTimeout(() => (copyBtn.textContent = t("btn_copy")), 1200);
  } catch {
    copyBtn.textContent = t("status_failed");
    setTimeout(() => (copyBtn.textContent = t("btn_copy")), 1200);
  }
});

sendBtn.addEventListener("click", async () => {
  const getValue = (field) => {
    const select = document.getElementById(field);
    if (select.value === "custom") {
      return document.getElementById(`${field}_custom`).value.trim();
    }
    return select.value;
  };

  const payload = {
    config: document.getElementById("config").value.trim(),
    baseurl: getValue("baseurl"),
    apikey: document.getElementById("apikey").value.trim(),
    provider: getValue("provider"),
    models: getModelConfigs()
  };

  // Validation
  if (!payload.config) {
    outputEl.textContent = t("err_no_config");
    setStatus(t("status_failed"));
    return;
  }
  if (!payload.baseurl) {
    outputEl.textContent = t("err_no_baseurl");
    setStatus(t("status_failed"));
    return;
  }
  if (!payload.apikey) {
    outputEl.textContent = t("err_no_apikey");
    setStatus(t("status_failed"));
    return;
  }
  if (!payload.models.length) {
    outputEl.textContent = t("err_no_model");
    setStatus(t("status_failed"));
    return;
  }
  if (payload.models.some(model => !model.id)) {
    outputEl.textContent = t("err_no_model");
    setStatus(t("status_failed"));
    return;
  }
  if (payload.models.some(model => !model.api)) {
    outputEl.textContent = t("err_no_apimode");
    setStatus(t("status_failed"));
    return;
  }

  setStatus(t("status_processing"));
  sendBtn.disabled = true;
  outputEl.textContent = "";

  try {
    const result = processConfig(payload);
    outputEl.textContent = JSON.stringify(result, null, 2);
    setStatus(t("status_done"));
  } catch (err) {
    outputEl.textContent = String(err.message || err);
    setStatus(t("status_failed"));
  } finally {
    sendBtn.disabled = false;
  }
});

function processConfig(payload) {
  try {
    const modelConfigs = payload.models;
    const primaryModelId = modelConfigs[0].id;
    const primaryImageModel = modelConfigs.find(model => model.supportsImageInput);

    // Step 1: Build agents object
    const agentModels = {};
    modelConfigs.forEach(model => {
      agentModels[`${payload.provider}/${model.id}`] = { alias: model.id };
    });

    const agents = {
      "defaults": {
        "model": {
          "primary": `${payload.provider}/${primaryModelId}`
        },
        "models": agentModels
      }
    };

    // Step 2: Build models object
    const models = {
      "mode": "merge",
      "providers": {
        [payload.provider]: {
          "baseUrl": payload.baseurl,
          "apiKey": payload.apikey,
          "models": modelConfigs.map(model => ({
            "id": model.id,
            "name": model.id,
            "api": model.api,
            ...(model.reasoning ? { "reasoning": true } : {}),
            ...(model.supportsImageInput ? { "input": ["text", "image"] } : {})
          }))
        }
      }
    };

    // Step 3: Parse user's config
    const userConfig = parseConfigInput(payload.config);

    const existingAgents = userConfig.agents && typeof userConfig.agents === "object" && !Array.isArray(userConfig.agents)
      ? userConfig.agents
      : {};
    const existingAgentDefaults = existingAgents.defaults && typeof existingAgents.defaults === "object" && !Array.isArray(existingAgents.defaults)
      ? existingAgents.defaults
      : {};
    const existingImageModelDefaults = existingAgentDefaults.imageModel && typeof existingAgentDefaults.imageModel === "object" && !Array.isArray(existingAgentDefaults.imageModel)
      ? existingAgentDefaults.imageModel
      : {};
    const nextImageModelDefaults = primaryImageModel
      ? {
          ...existingImageModelDefaults,
          primary: `${payload.provider}/${primaryImageModel.id}`
        }
      : undefined;

    // Step 4: Merge everything while only replacing agents.defaults.model/models
    const result = {
      ...userConfig,
      models: models,
      agents: {
        ...existingAgents,
        defaults: {
          ...existingAgentDefaults,
          model: agents.defaults.model,
          models: agents.defaults.models,
          ...(nextImageModelDefaults ? { imageModel: nextImageModelDefaults } : {})
        }
      }
    };

    // Remove auth field if exists
    delete result.auth;

    return result;
  } catch (error) {
    throw error;
  }
}
