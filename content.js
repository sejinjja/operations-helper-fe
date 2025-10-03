(async function () {
    console.log('customElements', customElements, useNuxtApp)
  "use strict";
  // await import(chrome.runtime.getURL("src/elements/index.js"));
  // 중복 방지
  if (document.getElementById("ext-controls-bar")) return;

  // 허용된 경로 설정
  const allowedPaths = [
    "/",
    "/modules",
    "/templates",
    "/admin",
    "/dashboard"
  ];

  // 현재 경로 체크
  const currentPath = window.location.pathname;
  if (!allowedPaths.includes(currentPath)) {
    console.log("허용되지 않은 경로:", currentPath);
    return;
  }

  const base = window.location.origin;
  const controls = document.createElement("div");
  controls.id = "ext-controls-bar";
  
  Object.assign(controls.style, {
    position: "sticky",
    bottom: "0",
    left: "0",
    right: "0",
    background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)",
    padding: "12px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    zIndex: "999999",
    boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
    borderTop: "1px solid #444"
  });

  // 버튼 설정
  const buttons = [
    { text: "홈", url: `${base}/`, icon: "🏠", name: "ext-window-home" },
    { text: "모듈", url: `${base}/modules`, icon: "📦", name: "ext-window-modules" },
    { text: "템플릿", url: `${base}/templates`, icon: "📄", name: "ext-window-templates" }
  ];

  buttons.forEach(({ text, url, icon, name }) => {
    const btn = document.createElement("button");
    btn.innerText = `${icon} ${text}`;
    btn.className = "ext-control-btn";
    
    Object.assign(btn.style, {
      padding: "8px 16px",
      background: "#444",
      color: "#fff",
      border: "1px solid #666",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "all 0.2s ease",
      fontFamily: "sans-serif"
    });
    
    btn.onmouseenter = () => {
      btn.style.background = "#555";
      btn.style.borderColor = "#888";
      btn.style.transform = "translateY(-2px)";
    };
    btn.onmouseleave = () => {
      btn.style.background = "#444";
      btn.style.borderColor = "#666";
      btn.style.transform = "translateY(0)";
    };
    
    // btn.onclick = () => {
    //   chrome.runtime.sendMessage({
    //     action: "openTab",
    //     url: url,
    //     name: name
    //   });
    // };
    
    controls.appendChild(btn);
  });

  document.body.appendChild(controls);
})();