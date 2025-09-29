// 열린 창들을 저장
const openedWindows = {};

// content script나 popup에서 메시지 받기
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openWindow") {
    const { url, name } = request;
    
    // 이미 열린 창이 있는지 확인
    if (openedWindows[name]) {
      chrome.windows.get(openedWindows[name], (win) => {
        if (chrome.runtime.lastError || !win) {
          // 창이 닫혔거나 없으면 새로 열기
          createNewWindow(url, name);
        } else {
          // 창이 있으면 focus
          chrome.windows.update(openedWindows[name], { focused: true });
          sendResponse({ success: true, action: "focused" });
        }
      });
    } else {
      // 새 창 열기
      createNewWindow(url, name);
    }
    
    return true; // 비동기 응답을 위해
  }
});

function createNewWindow(url, name) {
  chrome.windows.create({
    url: url,
    type: "normal",
    width: 1200,
    height: 800
  }, (window) => {
    openedWindows[name] = window.id;
    
    // 창이 닫히면 저장소에서 제거
    chrome.windows.onRemoved.addListener((windowId) => {
      if (openedWindows[name] === windowId) {
        delete openedWindows[name];
      }
    });
  });
}