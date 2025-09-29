const { default: ExtButton }  = await import(chrome.runtime.getURL("src/elements/ExtButton.js"));
await Promise.all([ExtButton()]).then((res) => {});