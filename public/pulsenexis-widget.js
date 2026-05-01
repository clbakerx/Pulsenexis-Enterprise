/*!
 * Pulsenexis AI Sales Widget v1.0
 * Drop this script on any page. Configure window.PulsenexisWidget before loading.
 *
 * Usage:
 *   <script>
 *     window.PulsenexisWidget = {
 *       proxyUrl: "https://YOUR-VERCEL-PROJECT.vercel.app/api/chat"
 *     };
 *   </script>
 *   <script src="pulsenexis-widget.js" defer></script>
 */

(function () {
  const cfg = window.PulsenexisWidget || {};
  const PROXY_URL = cfg.proxyUrl || "/api/chat";
  const BRAND_COLOR = cfg.brandColor || "#534AB7";
  const AGENT_NAME = cfg.agentName || "Nova";
  const GREETING = cfg.greeting || "Hey! Looking for music for your next project? I can help you find the perfect tracks, stems, or vocals. What are you working on?";

  const css = `
    #pn-widget-bubble {
      position: fixed; bottom: 24px; right: 24px; z-index: 99999;
      width: 52px; height: 52px; border-radius: 50%;
      background: ${BRAND_COLOR}; cursor: pointer; border: none;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18); transition: transform 0.15s;
    }
    #pn-widget-bubble:hover { transform: scale(1.07); }
    #pn-widget-bubble svg { width: 22px; height: 22px; fill: #fff; }
    #pn-widget-badge {
      position: absolute; top: -2px; right: -2px;
      width: 14px; height: 14px; border-radius: 50%;
      background: #1D9E75; border: 2px solid #fff;
    }
    #pn-widget-panel {
      position: fixed; bottom: 88px; right: 24px; z-index: 99999;
      width: 340px; border-radius: 16px; overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.14);
      background: #fff; border: 1px solid rgba(0,0,0,0.08);
      display: none; flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    #pn-widget-panel.open { display: flex; }
    #pn-panel-header {
      background: #1a1a2e; padding: 12px 16px;
      display: flex; align-items: center; gap: 10px;
    }
    #pn-panel-header .av {
      width: 34px; height: 34px; border-radius: 50%;
      background: ${BRAND_COLOR}; display: flex;
      align-items: center; justify-content: center;
      font-size: 16px; flex-shrink: 0;
    }
    #pn-panel-header .name { font-size: 14px; font-weight: 500; color: #fff; margin: 0; }
    #pn-panel-header .sub { font-size: 11px; color: #aaa; margin: 0; }
    #pn-panel-close {
      margin-left: auto; background: none; border: none;
      color: #aaa; font-size: 18px; cursor: pointer; line-height: 1; padding: 0;
    }
    #pn-chat-area {
      flex: 1; overflow-y: auto; padding: 14px;
      display: flex; flex-direction: column; gap: 10px;
      min-height: 220px; max-height: 320px; background: #f8f8fb;
    }
    .pn-msg { display: flex; gap: 7px; align-items: flex-end; }
    .pn-msg.user { flex-direction: row-reverse; }
    .pn-bubble {
      padding: 9px 13px; border-radius: 14px;
      font-size: 13px; line-height: 1.5; max-width: 78%;
    }
    .pn-msg.agent .pn-bubble {
      background: #fff; border: 1px solid rgba(0,0,0,0.07);
      color: #111; border-bottom-left-radius: 3px;
    }
    .pn-msg.user .pn-bubble {
      background: ${BRAND_COLOR}; color: #fff; border-bottom-right-radius: 3px;
    }
    .pn-av {
      width: 26px; height: 26px; border-radius: 50%;
      background: ${BRAND_COLOR}; display: flex;
      align-items: center; justify-content: center;
      font-size: 11px; color: #fff; font-weight: 500; flex-shrink: 0;
    }
    .pn-av.user { background: #888; }
    #pn-quick-row {
      display: flex; flex-wrap: wrap; gap: 5px;
      padding: 6px 14px 0;
    }
    .pn-qbtn {
      padding: 5px 11px; border-radius: 20px; font-size: 11px;
      border: 1px solid rgba(83,74,183,0.3); background: #fff;
      color: ${BRAND_COLOR}; cursor: pointer; font-family: inherit;
      transition: background 0.12s;
    }
    .pn-qbtn:hover { background: #EEEDFE; }
    #pn-input-row {
      display: flex; gap: 7px; padding: 10px 14px 14px;
      border-top: 1px solid rgba(0,0,0,0.06); background: #fff;
    }
    #pn-input {
      flex: 1; padding: 8px 12px; font-size: 13px;
      border-radius: 20px; border: 1px solid rgba(0,0,0,0.12);
      background: #f4f4f8; outline: none; font-family: inherit;
    }
    #pn-input:focus { border-color: ${BRAND_COLOR}; background: #fff; }
    #pn-send {
      width: 34px; height: 34px; border-radius: 50%;
      background: ${BRAND_COLOR}; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: opacity 0.15s;
    }
    #pn-send:disabled { opacity: 0.4; cursor: not-allowed; }
    #pn-send svg { width: 14px; height: 14px; fill: #fff; }
    .pn-typing span {
      display: inline-block; width: 5px; height: 5px; border-radius: 50%;
      background: #aaa; margin: 0 1px;
      animation: pn-blink 1.2s infinite;
    }
    .pn-typing span:nth-child(2) { animation-delay: 0.2s; }
    .pn-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes pn-blink { 0%,80%,100%{opacity:0.2} 40%{opacity:1} }
    #pn-lead-bar {
      background: #EEEDFE; padding: 7px 14px;
      font-size: 11px; color: #534AB7;
      border-top: 1px solid rgba(83,74,183,0.15);
      display: none;
    }
    #pn-lead-bar span { font-weight: 500; }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const bubble = document.createElement("button");
  bubble.id = "pn-widget-bubble";
  bubble.setAttribute("aria-label", "Chat with Nova — Pulsenexis sales agent");
  bubble.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg><div id="pn-widget-badge"></div>`;

  const panel = document.createElement("div");
  panel.id = "pn-widget-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Pulsenexis chat");
  panel.innerHTML = `
    <div id="pn-panel-header">
      <div class="av">🎵</div>
      <div>
        <p class="name">${AGENT_NAME} — Pulsenexis</p>
        <p class="sub">Music assets · stems · vocals</p>
      </div>
      <button id="pn-panel-close" aria-label="Close chat">&#x2715;</button>
    </div>
    <div id="pn-chat-area"></div>
    <div id="pn-quick-row"></div>
    <div id="pn-lead-bar">Lead captured: <span id="pn-lead-score"></span></div>
    <div id="pn-input-row">
      <input id="pn-input" type="text" placeholder="Type a message..." autocomplete="off" />
      <button id="pn-send" aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
      </button>
    </div>
  `;

  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  const chatArea = document.getElementById("pn-chat-area");
  const quickRow = document.getElementById("pn-quick-row");
  const input = document.getElementById("pn-input");
  const sendBtn = document.getElementById("pn-send");
  const leadBar = document.getElementById("pn-lead-bar");
  const leadScore = document.getElementById("pn-lead-score");

  let history = [];
  let isOpen = false;
  let greeted = false;

  const quickSets = {
    start: ["Music for YouTube", "Need stems / samples", "Film or ad sync", "Building a library"],
    format: ["Full tracks", "Stems only", "Vocals", "Instrumentals"],
    budget: ["Under $50", "$50–$200", "$200+", "Not sure"],
    timeline: ["Active project now", "Building a library"],
  };

  function togglePanel() {
    isOpen = !isOpen;
    panel.classList.toggle("open", isOpen);
    if (isOpen && !greeted) { greeted = true; greet(); }
    if (isOpen) input.focus();
  }

  bubble.addEventListener("click", togglePanel);
  document.getElementById("pn-panel-close").addEventListener("click", togglePanel);
  input.addEventListener("keydown", e => { if (e.key === "Enter") send(); });
  sendBtn.addEventListener("click", send);

  function addMsg(role, text) {
    const div = document.createElement("div");
    div.className = "pn-msg " + role;
    const av = document.createElement("div");
    av.className = "pn-av" + (role === "user" ? " user" : "");
    av.textContent = role === "agent" ? "N" : "You"[0];
    const bub = document.createElement("div");
    bub.className = "pn-bubble";
    bub.textContent = text;
    div.appendChild(av);
    div.appendChild(bub);
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "pn-msg agent"; div.id = "pn-typing";
    const av = document.createElement("div"); av.className = "pn-av"; av.textContent = "N";
    const bub = document.createElement("div"); bub.className = "pn-bubble pn-typing";
    bub.innerHTML = "<span></span><span></span><span></span>";
    div.appendChild(av); div.appendChild(bub);
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById("pn-typing");
    if (el) el.remove();
  }

  function setQuick(key) {
    quickRow.innerHTML = "";
    (quickSets[key] || []).forEach(label => {
      const b = document.createElement("button");
      b.className = "pn-qbtn"; b.textContent = label;
      b.addEventListener("click", () => { input.value = label; send(); });
      quickRow.appendChild(b);
    });
  }

  function parseLead(text) {
    const m = text.match(/LEAD_DATA:(\{.*\})/);
    if (m) { try { return JSON.parse(m[1]); } catch(e) {} }
    return null;
  }

  function onLead(data) {
    leadBar.style.display = "block";
    const colors = { Hot: "#A32D2D", Warm: "#854F0B", Cold: "#185FA5" };
    leadScore.textContent = data.score + " lead";
    leadScore.style.color = colors[data.score] || "#534AB7";

    // Fire webhook if configured
    if (cfg.webhookUrl) {
      fetch(cfg.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead: data, timestamp: new Date().toISOString() })
      }).catch(() => {});
    }

    // Custom callback
    if (typeof cfg.onLeadCaptured === "function") cfg.onLeadCaptured(data);
  }

  async function callProxy(msgs) {
    const res = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: msgs })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data.text;
  }

  async function greet() {
    showTyping();
    try {
      const initMsg = [{ role: "user", content: "Hi" }];
      const text = await callProxy(initMsg);
      removeTyping();
      const clean = text.replace(/LEAD_DATA:\{.*\}/, "").trim();
      history.push({ role: "user", content: "Hi" });
      history.push({ role: "assistant", content: text });
      addMsg("agent", clean);
      setQuick("start");
    } catch(e) {
      removeTyping();
      addMsg("agent", GREETING);
      setQuick("start");
    }
  }

  async function send() {
    const text = input.value.trim();
    if (!text) return;
    input.value = ""; sendBtn.disabled = true; quickRow.innerHTML = "";
    addMsg("user", text);
    history.push({ role: "user", content: text });
    showTyping();
    try {
      const raw = await callProxy(history);
      removeTyping();
      const clean = raw.replace(/LEAD_DATA:\{.*\}/, "").trim();
      history.push({ role: "assistant", content: raw });
      addMsg("agent", clean);
      const lead = parseLead(raw);
      if (lead) { onLead(lead); setQuick([]); }
      else {
        const lower = clean.toLowerCase();
        if (lower.includes("format") || lower.includes("stems")) setQuick("format");
        else if (lower.includes("budget") || lower.includes("spend")) setQuick("budget");
        else if (lower.includes("timeline") || lower.includes("project")) setQuick("timeline");
      }
    } catch(e) {
      removeTyping();
      addMsg("agent", "Something went wrong — please try again.");
    }
    sendBtn.disabled = false;
    input.focus();
  }
})();
