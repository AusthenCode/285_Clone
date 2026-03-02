const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("dotenv").config();
const API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("User:", userMessage);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: userMessage
      })
    });

    const data = await response.json();
    console.log("OpenAI response:", data);

    const reply = data.output[0].content[0].text;
    res.json({ reply });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ reply: "Error talking to AI" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));