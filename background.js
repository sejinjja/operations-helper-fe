// // 열린 탭들을 저장
// const openedTabs = {};

// // 이미 스크립트가 주입된 탭 ID를 저장
// const injectedTabs = new Set();


// // content script나 popup에서 메시지 받기
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "openTab") {
//     const { url, name } = request;
    
//     if (openedTabs[name]) {
//       chrome.tabs.get(openedTabs[name], (tab) => {
//         if (chrome.runtime.lastError || !tab) {
//           createNewTab(url, name);
//         } else {
//           chrome.tabs.update(openedTabs[name], { active: true });
//           sendResponse({ success: true, action: "focused" });
//         }
//       });
//     } else {
//       createNewTab(url, name);
//     }
    
//     return true; // 비동기 응답을 위해
//   }
// });

// // 탭이 활성화될 때마다 실행
// chrome.tabs.onActivated.addListener((activeInfo) => {
//   injectScriptOnce(activeInfo.tabId);
// });

// function injectScriptOnce(tabId) {
//   // 이미 주입된 탭이면 실행하지 않음
//   if (injectedTabs.has(tabId)) {
//     console.log(`Script already injected in tab ${tabId}`);
//     return;
//   }
  
//   chrome.scripting
//     .executeScript({
//       target: { tabId: tabId },
//       files: ["src/elements/index.js"],
//     })
//     .then(() => {
//       console.log(`Script injected in tab ${tabId}`);
//       // 주입 성공 시 Set에 추가
//       injectedTabs.add(tabId);
//     })
//     .catch((error) => {
//       console.error(`Failed to inject script in tab ${tabId}:`, error);
//     });
// }

// // 탭이 닫힐 때 Set에서 제거
// chrome.tabs.onRemoved.addListener((tabId) => {
//   injectedTabs.delete(tabId);
//   console.log(`Tab ${tabId} removed from tracking`);
// });

// // 현재 활성 탭에 대해서도 실행 (확장 프로그램 로드 시)
// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   if (tabs[0]) {
//     injectScriptOnce(tabs[0].id);
//   }
// });

// function createNewTab(url, name) {
//   chrome.tabs.create({ url: url, active: true }, (tab) => {
//     openedTabs[name] = tab.id;

//     chrome.tabs.onRemoved.addListener((tabId) => {
//       if (openedTabs[name] === tabId) {
//         delete openedTabs[name];
//       }
//     });
//   });
// }
