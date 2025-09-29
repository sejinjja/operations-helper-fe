// 열린 탭들을 저장
const openedTabs = {};

// content script나 popup에서 메시지 받기
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openTab") {
    const { url, name } = request;
    
    if (openedTabs[name]) {
      chrome.tabs.get(openedTabs[name], (tab) => {
        if (chrome.runtime.lastError || !tab) {
          createNewTab(url, name);
        } else {
          chrome.tabs.update(openedTabs[name], { active: true });
          sendResponse({ success: true, action: "focused" });
        }
      });
    } else {
      createNewTab(url, name);
    }
    
    return true; // 비동기 응답을 위해
  }
});

function createNewTab(url, name) {
  chrome.tabs.create({ url: url, active: true }, (tab) => {
    openedTabs[name] = tab.id;

    chrome.tabs.onRemoved.addListener((tabId) => {
      if (openedTabs[name] === tabId) {
        delete openedTabs[name];
      }
    });
  });
}
