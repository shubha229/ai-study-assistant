import { useRef, useState } from "react";

import PromptInput from "./components/PromptInput";
import StudyDashboard from "./components/StudyDashboard";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

import { generateStudySet } from "./lib/api";

import "./App.css";

function App() {
  const [studySet, setStudySet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastInput, setLastInput] = useState("");

  // Used to prevent older requests from
  // overwriting newer requests
  const requestId = useRef(0);

  // -----------------------------------
  // Generate study material
  // -----------------------------------

  const handleGenerate = async (input) => {
    // Create a unique ID for this request
    const currentRequestId = ++requestId.current;

    try {
      setLoading(true);
      setError("");
      setStudySet(null);
      setLastInput(input);

      const data = await generateStudySet(input);

      // Ignore response if a newer request exists
      if (currentRequestId !== requestId.current) {
        return;
      }

      setStudySet(data);
    } catch (err) {
      // Ignore errors from old requests
      if (currentRequestId !== requestId.current) {
        return;
      }

      console.error("Frontend error:", err);

      setError(
        err.message ||
          "Failed to generate study material. Please try again."
      );
    } finally {
      // Only update loading state for the latest request
      if (currentRequestId === requestId.current) {
        setLoading(false);
      }
    }
  };

  // -----------------------------------
  // Return to input screen
  // -----------------------------------

  const handleReset = () => {
    // Invalidate any previous request
    requestId.current++;

    setStudySet(null);
    setError("");
    setLoading(false);
    setLastInput("");
  };

  // -----------------------------------
  // Retry last request
  // -----------------------------------

  const handleRetry = () => {
    if (!lastInput) {
      setError("Please enter a topic or notes first.");
      return;
    }

    handleGenerate(lastInput);
  };

  return (
    <div className="app">

      {/* =========================
          LANDING / INPUT
      ========================== */}

      {!studySet && !loading && !error && (
        <>
          <header className="hero">
            <p className="eyebrow">
              AI STUDY ASSISTANT
            </p>

            <h1>
              Turn your notes into practice.
            </h1>

            <p className="subtitle">
              Paste your notes or enter a topic and
              generate interactive flashcards and quizzes.
            </p>
          </header>

          <main>
            <PromptInput
              onGenerate={handleGenerate}
              loading={loading}
            />
          </main>
        </>
      )}

      {/* =========================
          LOADING
      ========================== */}

      {loading && <LoadingState />}

      {/* =========================
          ERROR
      ========================== */}

      {error && !loading && (
        <ErrorState
          message={error}
          onRetry={handleRetry}
        />
      )}

      {/* =========================
          SUCCESS / STUDY DASHBOARD
      ========================== */}

      {studySet && !loading && !error && (
        <main>
          <button
            type="button"
            className="new-study-button"
            onClick={handleReset}
          >
            ← Create New Study Set
          </button>

          <StudyDashboard
            studySet={studySet}
          />
        </main>
      )}
    </div>
  );
}

export default App;