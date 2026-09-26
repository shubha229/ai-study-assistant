# 📚 AI Study Assistant

An interactive AI-powered study assistant that transforms user-provided notes or topics into structured study material consisting of **flashcards and quizzes**.

The application uses **React** for the frontend, **Express.js** for the backend, and the **Google Gemini API** for generating structured study content.

Instead of behaving like a traditional chatbot, the application converts AI-generated content into an interactive learning experience.

---

## 🚀 Features

### 📝 Notes / Topic Input

- Users can paste their notes or enter a topic.
- Supports free-form text input.
- Input is limited to 5000 characters.
- Empty input cannot be submitted.

### 🧠 AI-Generated Study Material

The application sends the user's input to Gemini and generates:

- A study title
- A concise summary
- 5–8 flashcards
- Exactly 5 quiz questions
- 4 options for every quiz question
- Correct answer for every question
- Explanation for every answer

### 🃏 Interactive Flashcards

- Displays generated flashcards.
- Users can flip between the question and answer.
- Users can navigate through the flashcard deck.
- Flashcards are generated dynamically from the user's input.

### ❓ Interactive Quiz

- Users can answer multiple-choice questions.
- Each question contains four options.
- The selected answer is checked against the AI-generated correct answer.
- Explanations are displayed for quiz answers.
- Incorrect questions can be re-tested.

### 🔄 Retry Wrong Answers

Users can retry questions they answered incorrectly instead of repeating the complete quiz.

### 📊 Quiz Progress

The application tracks quiz progress and displays the user's result.

### ⚠️ Error Handling

The application handles:

- Empty input
- Malformed JSON
- Invalid AI responses
- Missing fields
- Wrong data types
- Invalid flashcard structures
- Invalid quiz structures
- Incorrect number of quiz options
- Correct answers that don't match available options
- Empty server responses
- Failed API requests
- Slow requests
- Network errors
- Stale API responses

### ⏳ Loading State

While Gemini generates the study material, the application displays a loading state instead of leaving the interface blank.

### 📱 Responsive UI

The interface is designed to work across desktop and smaller screen sizes.

---

# 🏗️ Architecture

The application follows a frontend-backend architecture.

```text
                    ┌──────────────────────┐
                    │       User           │
                    │ Notes / Topic Input  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    React Frontend    │
                    │                      │
                    │ PromptInput          │
                    │ LoadingState         │
                    │ ErrorState           │
                    │ StudyDashboard       │
                    │ Flashcards           │
                    │ Quiz                 │
                    └──────────┬───────────┘
                               │
                         POST /api/generate
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express Backend    │
                    │                      │
                    │ API Route            │
                    │ AI Service           │
                    │ Response Validation  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Gemini API       │
                    │                      │
                    │ Structured JSON      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Backend Validation   │
                    │ validateAIResponse() │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Frontend Validation  │
                    │ validateStudyResult()│
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Interactive Study    │
                    │      Dashboard       │
                    └──────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- JavaScript
- HTML
- CSS
- React Hooks

## Backend

- Node.js
- Express.js
- CORS
- dotenv

## AI

- Google Gemini API
- `@google/genai`

## Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

---

# 📁 Project Structure

```text
study-assistant/
│
├── client/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── ErrorState.jsx
│   │   │   ├── Flashcard.jsx
│   │   │   ├── FlashcardDeck.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── PromptInput.jsx
│   │   │   ├── Quiz.jsx
│   │   │   └── StudyDashboard.jsx
│   │   │
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   └── validateResult.js
│   │   │
│   │   ├── types/
│   │   │   └── result.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server/
│   │
│   ├── services/
│   │   └── aiService.js
│   │
│   ├── utils/
│   │   └── validateAIResponse.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

# 🔄 How the Application Works

The application follows this process:

```text
1. User enters notes or a topic
                ↓
2. React sends the input to Express
                ↓
3. Express sends the request to Gemini
                ↓
4. Gemini generates structured JSON
                ↓
5. Backend parses the JSON
                ↓
6. Backend validates the response
                ↓
7. Valid data is returned to React
                ↓
8. Frontend validates the response again
                ↓
9. Study dashboard is rendered
                ↓
10. User studies using flashcards
                ↓
11. User takes the quiz
                ↓
12. Incorrect answers can be retried
```

---

# 🤖 AI Integration

The application uses Google's Gemini API to transform free-form user input into structured study material.

The backend sends a prompt requesting a strict JSON structure.

The expected structure is:

```json
{
  "title": "Introduction to React",
  "summary": "A short summary of React concepts.",
  "flashcards": [
    {
      "id": "fc1",
      "question": "What is React?",
      "answer": "A JavaScript library for building user interfaces."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "What is React used for?",
      "options": [
        "Building user interfaces",
        "Managing databases",
        "Creating operating systems",
        "Writing SQL queries"
      ],
      "correctAnswer": "Building user interfaces",
      "explanation": "React is a JavaScript library used to build user interfaces."
    }
  ]
}
```

The backend uses Gemini structured output configuration so that the generated response follows the expected schema.

---

# 🔐 API Key Security

The Gemini API key is stored only on the backend.

The API key is **not included in the React frontend**.

The frontend communicates with the Express backend:

```text
React
  ↓
Express Backend
  ↓
Gemini API
```

The API key is stored in:

```text
server/.env
```

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
```

The `.env` file should never be committed to GitHub.

---

# 🛡️ Defensive Response Validation

AI-generated responses cannot be blindly trusted.

The application validates the generated response before rendering it.

## Backend Validation

The backend uses:

```text
server/utils/validateAIResponse.js
```

It verifies:

- Response is an object
- Title exists
- Summary exists
- Flashcards exist
- Flashcards contain 5–8 items
- Flashcards contain valid IDs
- Flashcards contain questions
- Flashcards contain answers
- Quiz exists
- Quiz contains exactly 5 questions
- Each question has exactly 4 options
- Options are valid strings
- Correct answer exists in the options
- Quiz explanations exist

Invalid AI responses are rejected before being sent to the frontend.

## Frontend Validation

The frontend also validates the returned data using:

```text
client/src/lib/validateResult.js
```

This provides an additional safety layer before rendering the study dashboard.

The validation flow is:

```text
Gemini Response
      ↓
JSON.parse()
      ↓
Backend Validation
      ↓
Express Response
      ↓
Frontend Validation
      ↓
Interactive UI
```

Invalid data never reaches the rendering components.

---

# ⚠️ Error Handling

Error handling is an important part of the application.

## 1. Malformed JSON

If Gemini returns invalid JSON, the backend catches the parsing error.

```text
Gemini Response
      ↓
JSON.parse()
      ↓
Parse Error
      ↓
Error State
```

The application does not crash.

## 2. Wrong JSON Shape

Valid JSON can still have an incorrect structure.

For example:

```json
{
  "title": "Operating Systems"
}
```

This is valid JSON but does not contain the required flashcards and quiz.

The validation layer detects this and returns an error instead of rendering incomplete content.

## 3. Empty Response

The application checks whether Gemini returned a response.

It also checks whether the response contains actual study data.

Empty responses are treated as failures.

## 4. Slow Response

The frontend displays a loading state while waiting for Gemini.

An `AbortController` is also used to stop requests that take longer than 30 seconds.

```text
Request starts
     ↓
Loading state
     ↓
30 seconds
     ↓
No response
     ↓
Request aborted
     ↓
Error state
```

## 5. Failed Request

Network and API failures are caught and displayed using the error state.

The user is given a retry option.

## 6. Retry

If a request fails, the user can click:

```text
Try Again
```

The application stores the last submitted input and sends the request again.

## 7. Stale Responses

The application protects against stale responses.

For example:

```text
Request A starts
       ↓
Request B starts
       ↓
Request B finishes
       ↓
B is displayed
       ↓
Request A finishes later
       ↓
A is ignored
```

A request ID is used to ensure an older request cannot overwrite the result of a newer request.

---

# 🧩 React Component Structure

The application is divided into reusable functional components.

## PromptInput

Responsible for:

- Accepting user notes/topic
- Character count
- Preventing empty submission
- Calling the generation function

## LoadingState

Displays feedback while the AI is generating content.

## ErrorState

Displays:

- Error message
- Retry button

## StudyDashboard

Displays the generated study material.

## FlashcardDeck

Manages the collection of generated flashcards.

## Flashcard

Displays the individual question/answer card.

## Quiz

Handles:

- Question display
- Option selection
- Answer checking
- Score
- Explanations
- Wrong-answer retry

---

# 🧠 React State Management

The application uses React Hooks.

Main state includes:

```text
studySet
loading
error
lastInput
requestId
```

`useState` is used for UI and application state.

`useRef` is used for request tracking so that stale responses can be ignored.

---

# 📦 Installation

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

---

# 🔧 Backend Setup

Open a terminal and navigate to the server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create:

```text
server/.env
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Replace `your_gemini_api_key` with your actual Gemini API key.

---

# ▶️ Start the Backend

From the `server` directory:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open another terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

Open the URL shown in the terminal if Vite uses a different port.

---

# 🧪 Testing the Application

After starting both servers:

1. Open the frontend in the browser.
2. Enter a topic or paste notes.
3. Click **Generate Study Set**.
4. Wait for the AI-generated content.
5. Review the summary.
6. Flip through the flashcards.
7. Take the quiz.
8. Check your result.
9. Retry incorrect answers.
10. Click **Create New Study Set** to start again.

---

# 🧪 Error Handling Test Cases

| Test Case | Expected Result |
|---|---|
| Empty input | Submission disabled |
| Valid topic | Study set generated |
| Valid notes | Study set generated |
| Malformed JSON | Error state |
| Missing title | Validation error |
| Missing summary | Validation error |
| Missing flashcards | Validation error |
| Missing quiz | Validation error |
| Less than 5 flashcards | Validation error |
| More than 8 flashcards | Validation error |
| Less than 5 quiz questions | Validation error |
| More than 5 quiz questions | Validation error |
| Quiz with fewer than 4 options | Validation error |
| Quiz with more than 4 options | Validation error |
| Correct answer not in options | Validation error |
| Empty server response | Error state |
| Server unavailable | Error state |
| Request takes over 30 seconds | Timeout error |
| Failed request | Retry option |
| Multiple requests | Older response ignored |

---

# 🎨 User Experience

The application provides separate states for different stages of the workflow.

```text
EMPTY
  ↓
LOADING
  ↓
SUCCESS
```

or:

```text
EMPTY
  ↓
LOADING
  ↓
ERROR
  ↓
TRY AGAIN
```

This prevents the interface from showing blank or confusing states while the AI request is being processed.

---

# 🔄 Study Flow

```text
                 ┌─────────────────┐
                 │ Enter Notes /   │
                 │ Topic           │
                 └────────┬────────┘
                          ↓
                 ┌─────────────────┐
                 │ Generate Study  │
                 │ Set             │
                 └────────┬────────┘
                          ↓
                 ┌─────────────────┐
                 │ AI Generated    │
                 │ Content         │
                 └────────┬────────┘
                          ↓
              ┌───────────┴───────────┐
              ↓                       ↓
       ┌─────────────┐         ┌─────────────┐
       │ Flashcards  │         │    Quiz     │
       └──────┬──────┘         └──────┬──────┘
              ↓                       ↓
       Review concepts          Answer questions
                                      ↓
                                View result
                                      ↓
                              Retry wrong answers
```

---

# 🔒 Security Considerations

- Gemini API key is stored in backend environment variables.
- API keys are not exposed to the frontend.
- `.env` is excluded from version control.
- CORS is configured on the backend.
- AI responses are validated before rendering.
- User input is sent to the backend rather than directly to Gemini from the browser.

---

# 📌 Environment Variables

The backend requires:

```env
GEMINI_API_KEY=your_gemini_api_key
```

A `.env.example` file can be provided without the real API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit the actual `.env` file.

---

# 🤖 AI Usage

AI tools were used as development assistance during this project.

I used ChatGPT to:

- Brainstorm the application architecture.
- Plan the React component structure.
- Design the structured JSON format.
- Develop and review validation logic.
- Debug React and JavaScript issues.
- Debug API integration issues.
- Improve error handling.
- Review loading and error states.
- Review timeout handling.
- Implement stale-response protection.
- Review the project against the assignment requirements.
- Improve the README and documentation.

The AI-generated suggestions were reviewed, adapted, integrated, and tested as part of the implementation.

I understand the code used in the final application and can explain the implementation and design decisions.

---

# 👩‍💻 Original Work

This project was developed specifically as a Study Assistant application.

The implementation includes:

- React functional components
- React Hooks
- Express backend
- Gemini API integration
- Structured AI output
- Backend response validation
- Frontend response validation
- Interactive flashcards
- Interactive quizzes
- Quiz scoring
- Wrong-answer retry
- Loading state
- Error state
- Retry functionality
- API timeout handling
- Stale-response protection
- Responsive UI

The project was implemented and tested as an integrated application rather than submitting an existing tutorial project.

---

# 📚 Key Technical Concepts Demonstrated

## React

- Functional components
- `useState`
- `useRef`
- Props
- Conditional rendering
- Component composition
- Event handling
- Form handling

## API Integration

- `fetch`
- POST requests
- JSON request/response handling
- HTTP error handling
- Request timeout
- `AbortController`

## Backend

- Express.js
- API routes
- Middleware
- CORS
- Environment variables

## AI Integration

- Gemini API
- Structured JSON generation
- Response schema
- Prompt engineering
- AI response validation

## Error Handling

- JSON parsing errors
- Validation errors
- Network errors
- Empty responses
- Timeout handling
- Retry handling
- Stale request protection

---

# ⚖️ Design Decisions

## Why use a backend?

The Gemini API key should not be exposed in the browser.

Therefore:

```text
Frontend → Backend → Gemini
```

is used instead of:

```text
Frontend → Gemini
```

## Why structured JSON?

The application is an interactive tool rather than a chatbot.

Structured data makes it possible to reliably render:

- Flashcards
- Quiz questions
- Options
- Correct answers
- Explanations

Instead of trying to parse conversational text, the frontend receives predictable data.

## Why validate twice?

The backend validation protects the API boundary.

The frontend validation protects the rendering layer.

Therefore:

```text
Backend Validation
        +
Frontend Validation
        =
Safer Rendering
```

## Why use request IDs?

AI requests can take different amounts of time.

A newer request may finish before an older request.

Request IDs prevent an older response from replacing newer content.

---

# 🚧 Limitations

- The application currently does not include user authentication.
- Study sets are not permanently stored.
- Refreshing the page removes the current study set.
- The application depends on Gemini API availability.
- AI-generated content may occasionally require user verification.
- The application currently generates a fixed number of quiz questions.
- The application currently supports a single study set at a time.

---

# 🔮 Future Improvements

Possible future improvements include:

- Save study sets
- User accounts
- Study history
- Difficulty selection
- Custom flashcard count
- Custom quiz length
- Multiple AI model support
- Export study sets
- Spaced repetition
- Progress tracking
- Dark mode
- More advanced analytics
- Deploy the frontend and backend
- Streaming AI responses

---

# 🌐 Deployment

The application is currently designed to run locally.

For deployment, the frontend and backend can be hosted separately.

Example architecture:

```text
React Frontend
      ↓
Hosted Backend API
      ↓
Gemini API
```

The Gemini API key should remain stored as a server-side environment variable.

---

# 📹 Demo

A short screen recording can demonstrate:

1. Opening the application
2. Entering notes/topic
3. Generating the study set
4. Viewing the summary
5. Flipping flashcards
6. Taking the quiz
7. Viewing the score
8. Retrying incorrect answers
9. Demonstrating the error/retry state

Add your recording link here:

```text
Demo Video: [ADD YOUR VIDEO LINK]
```

---

# 📸 Screenshots

Add screenshots of the main application here after capturing them.

### Landing Page

```text
[ADD SCREENSHOT]
```

### Generated Study Set

```text
[ADD SCREENSHOT]
```

### Flashcards

```text
[ADD SCREENSHOT]
```

### Quiz

```text
[ADD SCREENSHOT]
```

### Error State

```text
[ADD SCREENSHOT]
```

---

# ⏱️ Development Time

Approximate development time:

```text
[ADD YOUR ACTUAL TIME]
```

---

# 📋 Assignment Requirement Coverage

| Requirement | Implementation |
|---|---|
| React application | React + Vite |
| Free-form text input | `PromptInput.jsx` |
| Real LLM API | Google Gemini API |
| Backend API | Express.js |
| API key security | Gemini key stored on backend |
| Structured AI output | Gemini response schema |
| Flashcards | `Flashcard.jsx` / `FlashcardDeck.jsx` |
| Quiz | `Quiz.jsx` |
| Wrong-answer retry | Quiz retry functionality |
| Loading state | `LoadingState.jsx` |
| Error state | `ErrorState.jsx` |
| Malformed JSON handling | `JSON.parse()` error handling |
| Wrong-shape handling | Backend + frontend validation |
| Empty response handling | Response/data checks |
| Slow request handling | `AbortController` timeout |
| Failed request handling | Error state + retry |
| Stale response handling | Request ID with `useRef` |
| Responsive UI | CSS responsive design |
| AI usage disclosure | README AI Usage section |
| Original implementation | Custom React + Express implementation |

---

# 📝 License

This project was created for educational and internship assignment purposes.

---

# 👩‍💻 Author

**Shubhashree Baburaya Nayak**

Computer Science and Engineering Student

Sir M. Visvesvaraya Institute of Technology, Bengaluru

---

## ⭐ Final Note

This project demonstrates how a generative AI model can be integrated into a React application as a structured interactive tool rather than simply as a chatbot.

The main focus is on:

```text
User Input
    ↓
AI Generation
    ↓
Structured Data
    ↓
Validation
    ↓
Interactive UI
    ↓
Learning / Practice
```

The application is designed with defensive handling of AI-generated data so that malformed, incomplete, slow, or failed responses do not result in a blank screen or application crash.
