// server.js
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/science", async (req, res) => {
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/facts", {
      headers: { "X-Api-Key": process.env.API_KEY }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No facts returned from API");
    }

    // Pick one random fact from the array
    const randomFact = data[Math.floor(Math.random() * data.length)];
    res.json({ fact: randomFact.fact });

  } catch (error) {
    console.error("Error fetching science fact:", error.message);
    res.status(500).json({ error: "Failed to fetch science fact" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
