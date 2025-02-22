const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const CHATBOT_API_URL = "https://app.chatbot.com/api";
const CHATBOT_API_KEY = process.env.CHATBOT_API_KEY; // Secure API key

// Route to handle chatbot requests
app.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await axios.post(
      `${CHATBOT_API_URL}/chat`,
      { message },
      { headers: { Authorization: `Bearer ${CHATBOT_API_KEY}` } }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to communicate with chatbot" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
