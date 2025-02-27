
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Popup.js Loaded!");

    // 🔹 Fetch and display daily website data
    chrome.storage.local.get("websiteData", (data) => {
        let websiteList = document.getElementById("website-list");

        if (!websiteList) {
            console.error("❌ Error: Element #website-list not found");
            return;
        }

        websiteList.innerHTML = "";

        if (!data.websiteData || Object.keys(data.websiteData).length === 0) {
            websiteList.innerHTML = "<p>⚠️ No daily data available</p>";
            console.warn("⚠️ No daily data found");
            return;
        }

        console.log("📊 Displaying daily website data:", data.websiteData);

        for (let site in data.websiteData) {
            let timeSpent = Math.round(data.websiteData[site] / 60000); // Convert ms to min
            let listItem = document.createElement("li");
            listItem.textContent = `${site}: ${timeSpent} min`;
            websiteList.appendChild(listItem);
        }
    });

    // 🔹 Weekly analytics functionality
    const weeklyReportBtn = document.getElementById("weekly-report-btn");
    const weeklyReportDiv = document.getElementById("weekly-report");
    const weeklyDataList = document.getElementById("weekly-data");

    if (!weeklyReportBtn || !weeklyReportDiv || !weeklyDataList) {
        console.error("❌ Error: Weekly report elements not found in popup.html");
        return;
    }

    weeklyReportBtn.addEventListener("click", async () => {
        console.log("📌 Weekly report button clicked!");
        weeklyReportDiv.classList.toggle("hidden"); // Toggle visibility

        try {
            console.log("🔄 Fetching weekly analytics...");
            const response = await fetch("http://127.0.0.1:5000/get-weekly-report");

            if (!response.ok) {
                throw new Error(`❌ Server error: ${response.status}`);
            }

            const data = await response.json();
            console.log("📊 Weekly data received:", data);
            weeklyDataList.innerHTML = ""; // Clear previous data

            // ✅ Handle cases where no data is found
            if (!data || Object.keys(data).length === 0 || data.message) {
                weeklyDataList.innerHTML = "<li>⚠️ No weekly data available</li>";
                console.warn("⚠️ No weekly data found");
                return;
            }

            // ✅ Extract domain name properly
            for (let site in data) {
                let timeSpent = Math.round(data[site] / 60000); // Convert ms to min
                try {
                    let domain = new URL(`https://${site}`).hostname.replace("www.", ""); // Extract domain
                    let listItem = document.createElement("li");
                    listItem.textContent = `${domain}: ${timeSpent} min`;
                    weeklyDataList.appendChild(listItem);
                } catch (error) {
                    console.warn(`⚠️ Invalid URL: ${site}`);
                }
            }
        } catch (error) {
            console.error("❌ Error fetching weekly report:", error);
            weeklyDataList.innerHTML = "<li>❌ Error loading weekly data</li>";
        }
    });
});
