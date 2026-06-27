/*!
 * Pulsenexis Nova Widget v2.0 — Local Responses (No API)
 * Drop this script on any page. Configure window.PulsenexisWidget before loading.
 *
 * Usage:
 *   <script>
 *     window.PulsenexisWidget = {};
 *   </script>
 *   <script src="pulsenexis-widget.js" defer></script>
 */

(function () {
  const cfg = window.PulsenexisWidget || {};
  const BRAND_COLOR = cfg.brandColor || "#534AB7";
  const AGENT_NAME = cfg.agentName || "Nova";

  // ─── LOCAL RESPONSE ENGINE ───────────────────────────────────────────────

  const INTENTS = [
    {
      id: "greeting",
      keywords: ["hello", "hi", "hey", "sup", "what's up", "howdy", "good morning", "good afternoon"],
      replies: [
        "Hey! Welcome to PulseNexis. I'm Nova — what kind of project are you working on?",
        "Hi there! Nova here. Tell me what you're building and I'll point you to the right tracks.",
        "Hey, glad you stopped by! What are you working on — film, YouTube, a game, something else?"
      ],
      quick: "start",
      score: 0
    },
    {
      id: "youtube",
      keywords: ["youtube", "yt", "channel", "content creator", "monetize", "shorts", "vlog", "reel"],
      replies: [
        "YouTube creators are our bread and butter. Our $29 standard license covers full monetization — no copyright strikes. Want a free sample first?",
        "For YouTube, you need tracks that won't get flagged. Our licenses are clean for monetization. Check the Grown & Sexy or After Hours series — what vibe fits your channel?",
        "We've got Neo-Soul, Quiet Storm, and R&B that works great for YouTube content. License starts at $29. Want me to point you somewhere specific?"
      ],
      quick: "format",
      score: 2
    },
    {
      id: "film",
      keywords: ["film", "movie", "cinema", "scene", "documentary", "short film", "sync", "commercial", "ad", "advertisement", "brand", "marketing"],
      replies: [
        "For film and ad sync, our $49 professional license covers broadcast and digital placements. What's the genre or mood you're going for?",
        "Sync licensing for film starts at $49 and covers commercial use. Our Quiet Storm and Neo-Soul tracks place really well in drama and lifestyle scenes. What's the project?",
        "Commercial sync is $49–$79 depending on distribution. Tell me about the project and I'll find the right fit."
      ],
      quick: "budget",
      score: 3
    },
    {
      id: "podcast",
      keywords: ["podcast", "show", "episode", "intro music", "outro music", "radio", "broadcast"],
      replies: [
        "Podcast intros and outros are a great use case. The $29 standard license covers you for ongoing episodes. Instrumental or something with a groove?",
        "For podcast use, $29 gets you a clean license for your show. Want something low-key or something with more energy?",
        "Podcast licensing is $29 and covers all your episodes. Our instrumentals work great for that. What's your show about?"
      ],
      quick: "format",
      score: 2
    },
    {
      id: "game",
      keywords: ["game", "gaming", "video game", "indie game", "unity", "unreal", "mobile game", "twitch", "stream", "streamer"],
      replies: [
        "Game audio is a specialty here. Depending on distribution size, licenses start at $49. Are you scoring a full game or need loop-ready tracks?",
        "For games and streaming, we have tracks that loop clean and don't feel repetitive. What platform — mobile, PC, console?",
        "Gaming projects are $49+ depending on how the music is used. Tell me more about the game and I'll put together some options."
      ],
      quick: "budget",
      score: 3
    },
    {
      id: "stems",
      keywords: ["stems", "multitrack", "acapella", "vocal stems", "instrumental stems", "remix", "producer", "beat"],
      replies: [
        "We offer stems on select tracks — great for producers who want to remix or layer. What genre are you working in?",
        "Stems are available on request. Tell me what you're building and I'll see what we have that fits.",
        "Producer packs with stems start at $49. Are you remixing or building something original on top?"
      ],
      quick: "format",
      score: 2
    },
    {
      id: "neosoul",
      keywords: ["neo soul", "neo-soul", "r&b", "rnb", "soul", "smooth", "quiet storm", "after hours", "midnight", "grown and sexy", "grown & sexy"],
      replies: [
        "That's our core catalog right there — Neo-Soul and Quiet Storm R&B. Check the After Hours and Midnight Lounge series. Anything specific you're looking for?",
        "Neo-Soul is what we do best. Every track is produced to the PulseNexis Blueprint — D Major, live-feeling instrumentation, real arrangements. Want a sample?",
        "The Quiet Storm and Grown & Sexy series are our most licensed catalogs. What's the use case?"
      ],
      quick: "start",
      score: 1
    },
    {
      id: "gospel",
      keywords: ["gospel", "church", "worship", "spiritual", "ministry", "christian", "praise"],
      replies: [
        "We have Gospel-influenced tracks with full choir builds and real arrangements. Are you licensing for a service, event, or media project?",
        "The Gospel influence runs deep in our catalog — choir stacks, organ, the whole thing. What do you need it for?",
        "Gospel and inspirational tracks are available. License starts at $29. Tell me about the project."
      ],
      quick: "format",
      score: 2
    },
    {
      id: "pricing",
      keywords: ["price", "pricing", "how much", "cost", "fee", "rates", "what does it cost", "license fee", "affordable"],
      replies: [
        "Three tiers: $29 standard (YouTube, podcasts, social), $49 professional (commercial, film, broadcast), $79 premium (full exclusive rights). Which fits your project?",
        "Licensing starts at $29 for standard use, $49 for commercial and broadcast, $79 for premium/exclusive. What's the intended use?",
        "Standard license is $29 — covers most digital use cases. Professional at $49 for broadcast and ads. Premium at $79 for exclusivity. What are you working on?"
      ],
      quick: "budget",
      score: 2
    },
    {
      id: "free",
      keywords: ["free", "free music", "free beats", "no cost", "freebie", "free sample", "free download", "broke", "no budget", "zero budget"],
      replies: [
        "We do have free samples — grab one at pulsenexis.com/free-sample. It's a great way to hear the quality before licensing.",
        "Free samples are available at pulsenexis.com/free-sample. When you're ready to license for a real project, plans start at $29.",
        "Head to pulsenexis.com/free-sample for a free track. No strings. When the project is ready, we'll be here."
      ],
      quick: "start",
      score: -1
    },
    {
      id: "ready_to_buy",
      keywords: ["ready to buy", "ready to license", "want to license", "checkout", "purchase", "buy now", "sign up", "get started", "invoice", "this week", "today", "deadline", "need it now", "urgent"],
      replies: [
        "Let's get you sorted. Head to pulsenexis.com to browse the catalog and checkout. If you need a specific track or custom license, reply here and I'll help.",
        "Ready to go — pulsenexis.com has the full catalog with instant licensing. Pick your tier and you're live.",
        "Let's do it. Browse at pulsenexis.com and grab your license. If you have questions about a specific track or use case, just ask."
      ],
      quick: [],
      score: 3
    },
    {
      id: "custom",
      keywords: ["custom", "custom song", "original song", "commission", "write a song", "made for me", "exclusive"],
      replies: [
        "We do custom songs — original compositions built to your brief. Timeline and pricing depend on the scope. What's the project?",
        "Custom compositions are available through Honey Drip Records. Tell me what you're envisioning and I'll give you a quote.",
        "A custom song is a real option here. What's the feel, the use case, and your timeline?"
      ],
      quick: "budget",
      score: 3
    },
    {
      id: "browse",
      keywords: ["browse", "look around", "just looking", "just browsing", "explore", "what do you have", "show me", "what's available", "catalog"],
      replies: [
        "The full catalog is at pulsenexis.com. Neo-Soul, Quiet Storm, Grown & Sexy, After Hours, Midnight Lounge — lots to explore. Anything grab your attention?",
        "Browse everything at pulsenexis.com. If something sounds right, licensing is instant. What genre are you in the mood for?",
        "Take your time at pulsenexis.com. If a track catches your ear and you want more info, come back and ask."
      ],
      quick: "start",
      score: 0
    }
  ];

  const FALLBACK_REPLIES = [
    "Tell me more about your project — the genre, format, and how you plan to use the music — and I'll find the right fit.",
    "I want to make sure I point you to the right tracks. What's the project and what vibe are you going for?",
    "Can you tell me a bit more? Once I know the use case I can narrow it down for you."
  ];

  const LEAD_THRESHOLDS = { HOT: 3, WARM: 1 };

  let sessionScore = 0;
  let replyCounters = {};

  function getReply(replies, intentId) {
    if (!replyCounters[intentId]) replyCounters[intentId] = 0;
    const idx = replyCounters[intentId] % replies.length;
    replyCounters[intentId]++;
    return replies[idx];
  }

  function getLocalResponse(userText) {
    const lower = userText.toLowerCase();
    let bestMatch = null;
    let bestCount = 0;

    for (const intent of INTENTS) {
      const count = intent.keywords.filter(k => lower.includes(k)).length;
      if (count > bestCount) {
        bestCount = count;
        bestMatch = intent;
      }
    }

    if (bestMatch) {
      sessionScore += bestMatch.score;
      return {
        text: getReply(bestMatch.replies, bestMatch.id),
        quick: bestMatch.quick,
        score: sessionScore
      };
    }

    return {
      text: getReply(FALLBACK_REPLIES, "fallback"),
      quick: "start",
      score: sessionScore
    };
  }

  function getLeadVerdict() {
    if (sessionScore >= LEAD_THRESHOLDS.HOT) return "Hot";
    if (sessionScore >= LEAD_THRESHOLDS.WARM) return "Warm";
    return "Cold";
  }

  // ─── CSS ─────────────────────────────────────────────────────────────────

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
    #pn-lead-bar { display: none !important; }
    .pn-email-card {
      margin: 4px 0; padding: 12px 14px;
      background: #EEEDFE; border-radius: 14px;
      border: 1px solid rgba(83,74,183,0.2);
      font-size: 12px;
    }
    .pn-email-card p { margin: 0 0 8px; color: #333; line-height: 1.4; }
    .pn-email-card strong { color: #534AB7; }
    .pn-email-row { display: flex; gap: 6px; }
    .pn-email-input {
      flex: 1; padding: 7px 10px; font-size: 12px;
      border-radius: 20px; border: 1px solid rgba(83,74,183,0.35);
      background: #fff; outline: none; font-family: inherit;
    }
    .pn-email-input:focus { border-color: ${BRAND_COLOR}; }
    .pn-email-submit {
      padding: 7px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
      background: ${BRAND_COLOR}; color: #fff; border: none; cursor: pointer;
      font-family: inherit; white-space: nowrap;
    }
    .pn-email-submit:disabled { opacity: 0.5; cursor: not-allowed; }
    .pn-email-success { color: #1D9E75; font-weight: 500; font-size: 12px; margin: 4px 0 0; }
    .pn-email-skip {
      background: none; border: none; font-size: 11px; color: #aaa;
      cursor: pointer; padding: 4px 0 0; font-family: inherit; display: block;
    }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ─── DOM ─────────────────────────────────────────────────────────────────

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
        <p class="sub">Music licensing · Neo-Soul · R&B</p>
      </div>
      <button id="pn-panel-close" aria-label="Close chat">&#x2715;</button>
    </div>
    <div id="pn-chat-area"></div>
    <div id="pn-quick-row"></div>
    <div id="pn-lead-bar">Lead: <span id="pn-lead-score"></span></div>
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

  // ─── QUICK REPLY SETS ────────────────────────────────────────────────────

  const quickSets = {
    start: ["Music for YouTube", "Film or ad sync", "Custom song", "Free sample"],
    format: ["Full tracks", "Stems / producer pack", "Vocals", "Instrumentals"],
    budget: ["Under $50", "$50–$200", "$200+", "Not sure yet"],
  };

  // ─── STATE ───────────────────────────────────────────────────────────────

  let isOpen = false;
  let greeted = false;
  let emailCaptured = false;
  let exchangeCount = 0;

  // ─── HELPERS ─────────────────────────────────────────────────────────────

  function addMsg(role, text) {
    const div = document.createElement("div");
    div.className = "pn-msg " + role;
    const av = document.createElement("div");
    av.className = "pn-av" + (role === "user" ? " user" : "");
    av.textContent = role === "agent" ? "N" : "Y";
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
    const buttons = Array.isArray(key) ? key : (quickSets[key] || []);
    buttons.forEach(label => {
      const b = document.createElement("button");
      b.className = "pn-qbtn"; b.textContent = label;
      b.addEventListener("click", () => { input.value = label; send(); });
      quickRow.appendChild(b);
    });
  }

  function updateLeadBar(score) {
    const verdict = getLeadVerdict();
    const colors = { Hot: "#A32D2D", Warm: "#854F0B", Cold: "#185FA5" };
    leadBar.style.display = "block";
    leadScore.textContent = verdict + " lead";
    leadScore.style.color = colors[verdict] || "#534AB7";
    if (cfg.onLeadCaptured && typeof cfg.onLeadCaptured === "function") {
      cfg.onLeadCaptured({ score: verdict, sessionScore: score });
    }
  }

  function showEmailCapture() {
    if (emailCaptured) return;
    emailCaptured = true;
    const card = document.createElement("div");
    card.className = "pn-email-card";
    card.innerHTML = `
      <p><strong>Stay connected with PulseNexis</strong><br/>Drop your email and I'll send you new drops + deals.</p>
      <div class="pn-email-row">
        <input class="pn-email-input" type="email" placeholder="your@email.com" autocomplete="email" />
        <button class="pn-email-submit" type="button">Send</button>
      </div>
      <button class="pn-email-skip" type="button">No thanks</button>
    `;
    chatArea.appendChild(card);
    chatArea.scrollTop = chatArea.scrollHeight;

    const emailInput = card.querySelector(".pn-email-input");
    const submitBtn = card.querySelector(".pn-email-submit");
    const skipBtn = card.querySelector(".pn-email-skip");

    function submitEmail() {
      const val = emailInput.value.trim();
      if (!val || !val.includes("@")) { emailInput.focus(); return; }
      submitBtn.disabled = true;
      const LEAD_URL = cfg.novaLeadUrl || "/api/nova-lead";
      fetch(LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: val })
      })
      .then(() => {
        card.innerHTML = `<p class="pn-email-success">✓ Got it! Check your inbox — I'll be in touch.</p>`;
        chatArea.scrollTop = chatArea.scrollHeight;
        if (typeof cfg.onEmailCaptured === "function") cfg.onEmailCaptured(val);
      })
      .catch(() => {
        card.innerHTML = `<p class="pn-email-success">✓ You're on the list!</p>`;
        chatArea.scrollTop = chatArea.scrollHeight;
      });
    }

    emailInput.addEventListener("keydown", function(e) { if (e.key === "Enter") submitEmail(); });
    submitBtn.addEventListener("click", submitEmail);
    skipBtn.addEventListener("click", function() { card.remove(); emailCaptured = false; });
  }

  // ─── CORE LOGIC ──────────────────────────────────────────────────────────

  function togglePanel() {
    isOpen = !isOpen;
    panel.classList.toggle("open", isOpen);
    if (isOpen && !greeted) {
      greeted = true;
      setTimeout(() => {
        addMsg("agent", "Hey! Welcome to PulseNexis. I'm Nova — what kind of project are you working on?");
        setQuick("start");
      }, 400);
    }
    if (isOpen) input.focus();
  }

  function send() {
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    sendBtn.disabled = true;
    quickRow.innerHTML = "";
    addMsg("user", text);
    showTyping();

    // Simulate a brief thinking delay so it feels natural
    setTimeout(() => {
      removeTyping();
      const result = getLocalResponse(text);
      addMsg("agent", result.text);
      exchangeCount++;

      updateLeadBar(result.score);

      if (Array.isArray(result.quick)) {
        setQuick(result.quick);
      } else {
        setQuick(result.quick || "start");
      }

      if (exchangeCount >= 2 && !emailCaptured) {
        showEmailCapture();
      }

      sendBtn.disabled = false;
      input.focus();
    }, 600 + Math.random() * 400);
  }

  bubble.addEventListener("click", togglePanel);
  document.getElementById("pn-panel-close").addEventListener("click", togglePanel);
  input.addEventListener("keydown", e => { if (e.key === "Enter") send(); });
  sendBtn.addEventListener("click", send);

})();