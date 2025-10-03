(() => {
  if (globalThis.feHelperMain) return;
  globalThis.feHelperMain = (() => {
    window.addEventListener("message", (event) => {
      if (event.source !== window) return;

      if (event.data.type === "TO_MAIN") {
        console.log("EXTENSION에게 온 메시지:", event.data.payload);
      }
    });

    return {
      sendMessage: (message) =>
        window.postMessage(
          {
            type: "TO_EXTENSION",
            payload: { message },
          },
          "*"
        ),
    };
  })();
})();
