let activeTab = null;
let startTime = null;
let websiteData = {};

// Ensure service worker stays alive
chrome.runtime.onStartup.addListener(() => {
    console.log("⏳ Extension started!");
});

chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 Extension installed");
});

// Listen for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (chrome.runtime.lastError) {
            console.warn("Error getting tab:", chrome.runtime.lastError);
            return;
        }
        if (tab && tab.url) {
            trackTime(tab.url);
        }
    });
});

// Listen for URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        trackTime(changeInfo.url);
    }
});

// Track time spent on websites
function trackTime(url) {
    if (!url.startsWith("http")) return; // Ignore invalid URLs

    if (activeTab) {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;

        if (!websiteData[activeTab]) {
            websiteData[activeTab] = 0;
        }
        websiteData[activeTab] += elapsedTime;
    }

    try {
        activeTab = new URL(url).hostname;
    } catch (error) {
        console.warn("⚠️ Invalid URL:", url);
        return;
    }
    startTime = Date.now();

    // Save data to Chrome storage
    chrome.storage.local.set({ websiteData }, () => {
        console.log("✅ Website data saved:", websiteData);
    });
}

// Periodically log storage data for debugging
setInterval(() => {
    chrome.storage.local.get("websiteData", (data) => {
        console.log("📊 Fetched websiteData:", data);
    });
}, 10000); // Log every 10 seconds
