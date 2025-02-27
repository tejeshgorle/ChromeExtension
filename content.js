let startTime = Date.now();

window.addEventListener("beforeunload", () => {
    const timeSpent = Date.now() - startTime;
    fetch("http://127.0.0.1:5000/save-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: window.location.href, timeSpent })
    });
});
