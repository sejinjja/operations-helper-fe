(() => {
  if (globalThis.feHelperExtension) return;
  globalThis.feHelperExtension = (() => {
    window.addEventListener("message", (event) => {
      if (event.source !== window) return;

      if (event.data.type === "TO_EXTENSION") {
        console.log("MAIN에게 온 메시지:", event.data.payload);
      }
    });

    return {
      sendMessage: (message) =>
        window.postMessage(
          {
            type: "TO_MAIN",
            payload: { message },
          },
          "*"
        ),
    };
  })();
})();
