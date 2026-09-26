import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { generateStudySet } from "./services/aiService.js";
import { validateAIResponse } from "./utils/validateAIResponse.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// -----------------------------------
// Health Routes
// -----------------------------------

app.get("/", (req, res) => {
  res.json({
    message: "Study Assistant API is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is healthy"
  });
});


// -----------------------------------
// AI Generate Route
// -----------------------------------

app.post("/api/generate", async (req, res) => {
  try {
    const { input } = req.body;

    // Check if input exists
    if (!input || typeof input !== "string") {
      return res.status(400).json({
        success: false,
        error: "Please provide valid study content."
      });
    }

    // Check empty input
    if (!input.trim()) {
      return res.status(400).json({
        success: false,
        error: "Study content cannot be empty."
      });
    }

    // Limit input size
    if (input.length > 5000) {
      return res.status(400).json({
        success: false,
        error: "Study content is too long. Maximum 5000 characters."
      });
    }

    console.log("Generating study set...");

    // Call Gemini
    const studySet = await generateStudySet(input.trim());

    // Validate Gemini response
    const validation = validateAIResponse(studySet);

    if (!validation.valid) {
      console.error("Invalid AI response:", validation.error);

      return res.status(502).json({
        success: false,
        error: validation.error
      });
    }

    console.log("Study set generated successfully.");

    return res.status(200).json({
      success: true,
      data: studySet
    });

  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("===================================");

    return res.status(500).json({
        success: false,
        error: error.message || "Failed to generate study material."
    });
  }
});


// -----------------------------------
// Start Server
// -----------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});