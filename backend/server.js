const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow all origins

require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Error: " + err));

// Define Schema
const WebsiteSchema = new mongoose.Schema({
    url: { type: String, required: true },
    timeSpent: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now } // ✅ Ensure `lastUpdated` is always set
});



const Website = mongoose.model("Website", WebsiteSchema);

app.post("/save-data", async (req, res) => {
    try {
        if (!req.body.url || !req.body.timeSpent) {
            return res.status(400).json({ error: "❌ Missing URL or timeSpent" });
        }

        await Website.updateOne(
            { url: req.body.url }, 
            { 
                $inc: { timeSpent: req.body.timeSpent },
                $set: { lastUpdated: new Date() } // ✅ Ensure `lastUpdated` is always updated
            },
            { upsert: true }
        );

        res.json({ message: "✅ Data saved successfully" });
    } catch (error) {
        console.error("❌ Error saving data:", error);
        res.status(500).json({ error: error.message });
    }
});



// ✅ API Endpoint to Fetch Total Data
app.get("/get-data", async (req, res) => {
    try {
        const data = await Website.find({});
        
        if (data.length === 0) {
            return res.json({ message: "⚠️ No data available" });
        }

        res.json(data.reduce((acc, item) => ({ ...acc, [item.url]: item.timeSpent }), {}));
    } catch (error) {
        res.status(500).json({ error: "❌ Error fetching data: " + error.message });
    }
});

app.get("/get-weekly-report", async (req, res) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const weeklyData = await Website.find({
            lastUpdated: { $gte: oneWeekAgo }
        });

        if (weeklyData.length === 0) {
            return res.json({ message: "⚠️ No weekly data found" });
        }

        // 🔹 Transform URLs to domain names
        const formattedData = weeklyData.reduce((acc, item) => {
            try {
                const domain = new URL(`https://${item.url}`).hostname.replace("www.", ""); // ✅ Extract domain name
                acc[domain] = (acc[domain] || 0) + item.timeSpent;
            } catch (error) {
                console.warn(`⚠️ Invalid URL: ${item.url}`);
            }
            return acc;
        }, {});

        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ error: "❌ Error fetching weekly data: " + error.message });
    }
});


// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
