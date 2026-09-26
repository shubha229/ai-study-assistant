import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { validateAIResponse } from "../utils/validateAIResponse.js";

dotenv.config();

// -----------------------------------
// Check API Key
// -----------------------------------

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing from .env");
}

console.log(
  "Gemini API key loaded:",
  Boolean(process.env.GEMINI_API_KEY)
);

// -----------------------------------
// Initialize Gemini
// -----------------------------------

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// -----------------------------------
// Structured Output Schema
// -----------------------------------

const studySchema = {
  type: "object",

  properties: {
    title: {
      type: "string",
    },

    summary: {
      type: "string",
    },

    flashcards: {
      type: "array",

      items: {
        type: "object",

        properties: {
          id: {
            type: "string",
          },

          question: {
            type: "string",
          },

          answer: {
            type: "string",
          },
        },

        required: [
          "id",
          "question",
          "answer",
        ],
      },
    },

    quiz: {
      type: "array",

      items: {
        type: "object",

        properties: {
          id: {
            type: "string",
          },

          question: {
            type: "string",
          },

          options: {
            type: "array",

            items: {
              type: "string",
            },
          },

          correctAnswer: {
            type: "string",
          },

          explanation: {
            type: "string",
          },
        },

        required: [
          "id",
          "question",
          "options",
          "correctAnswer",
          "explanation",
        ],
      },
    },
  },

  required: [
    "title",
    "summary",
    "flashcards",
    "quiz",
  ],
};

// -----------------------------------
// Generate Study Set
// -----------------------------------

export async function generateStudySet(userInput) {
  const prompt = `
You are an AI Study Assistant.

Convert the following notes or topic into an interactive study set.

USER INPUT:
${userInput}

Requirements:

1. Generate a meaningful and concise title.

2. Generate a short summary of the topic.

3. Generate between 5 and 8 flashcards.

4. Every flashcard must contain:
   - unique id
   - question
   - answer

5. Generate exactly 5 quiz questions.

6. Every quiz question must contain exactly 4 options.

7. The correctAnswer must exactly match one of the options.

8. Include a short explanation for every quiz answer.

9. Questions must be based only on the user's input.

10. Do not generate unrelated information.

11. Make the questions useful for studying.

12. Return ONLY the JSON structure matching the provided schema.

Do not use Markdown.
Do not add explanations outside the JSON.
`;

  let response = null;

  // -----------------------------------
  // Retry Gemini up to 3 times
  // -----------------------------------

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(
        `Calling Gemini... Attempt ${attempt}/3`
      );

      response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",

        contents: prompt,

        config: {
          responseMimeType: "application/json",
          responseSchema: studySchema,
        },
      });

      console.log("Gemini request successful.");

      break;
    } catch (error) {
      console.error(
        `Gemini attempt ${attempt} failed:`,
        error.message
      );

      // If this was the final attempt
      if (attempt === 3) {
        throw error;
      }

      // Wait before retrying
      const delay = 1500 * attempt;

      console.log(
        `Retrying in ${delay}ms...`
      );

      await new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }
  }

  // -----------------------------------
  // Check Gemini response
  // -----------------------------------

  if (!response) {
    throw new Error(
      "Gemini did not return a response."
    );
  }

  if (!response.text) {
    throw new Error(
      "Gemini returned an empty response."
    );
  }

  // -----------------------------------
  // Parse JSON
  // -----------------------------------

  console.log("Gemini response received.");
  console.log("Parsing Gemini JSON...");

  let studySet;

  try {
    studySet = JSON.parse(response.text);
  } catch (error) {
    console.error(
      "Failed to parse Gemini JSON:",
      error.message
    );

    throw new Error(
      "Gemini returned invalid JSON."
    );
  }

  // -----------------------------------
  // Validate JSON structure
  // -----------------------------------

  console.log("Validating Gemini response...");

  const validation = validateAIResponse(studySet);

  if (!validation.valid) {
    console.error(
      "Gemini response validation failed:",
      validation.error
    );

    throw new Error(
      validation.error ||
        "Gemini returned an invalid study set."
    );
  }

  console.log(
    "Gemini response passed validation."
  );

  // -----------------------------------
  // Return validated study set
  // -----------------------------------

  return studySet;
}