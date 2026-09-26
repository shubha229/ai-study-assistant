import { useState } from "react";

function Quiz({ questions }) {
  // Questions currently being tested
  const [quizQuestions, setQuizQuestions] = useState(questions);

  // Current question
  const [currentIndex, setCurrentIndex] = useState(0);

  // Selected answer for current question
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Answers for ONLY the current attempt
  // Stored using question ID as the key
  const [answers, setAnswers] = useState({});

  // Questions answered incorrectly
  const [wrongQuestions, setWrongQuestions] = useState([]);

  // Whether quiz is finished
  const [finished, setFinished] = useState(false);


  // -----------------------------------
  // Current question
  // -----------------------------------

  const currentQuestion = quizQuestions[currentIndex];


  // -----------------------------------
  // Select answer
  // -----------------------------------

  const handleAnswer = (option) => {
    // Don't allow changing answer
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(option);

    setAnswers((previousAnswers) => ({
      ...previousAnswers,

      [currentQuestion.id]: {
        selected: option,
        correct:
          option === currentQuestion.correctAnswer
      }
    }));
  };


  // -----------------------------------
  // Next / Finish
  // -----------------------------------

  const handleNext = () => {

    // ---------------------------------
    // Finish current attempt
    // ---------------------------------

    if (currentIndex === quizQuestions.length - 1) {

      // Find questions answered incorrectly
      const incorrect = quizQuestions.filter(
        (question) => {

          const answer =
            answers[question.id];

          return answer && !answer.correct;
        }
      );

      // Store wrong questions
      setWrongQuestions(incorrect);

      // Finish quiz
      setFinished(true);

      return;
    }


    // ---------------------------------
    // Move to next question
    // ---------------------------------

    setCurrentIndex(
      (previousIndex) => previousIndex + 1
    );

    setSelectedAnswer(null);
  };


  // -----------------------------------
  // Retry wrong answers
  // -----------------------------------

  const handleRetryWrong = () => {

    if (wrongQuestions.length === 0) {
      return;
    }

    console.log(
      "Retrying wrong questions:",
      wrongQuestions
    );

    // Only keep questions that were wrong
    setQuizQuestions(wrongQuestions);

    // Start from first wrong question
    setCurrentIndex(0);

    // IMPORTANT:
    // Completely reset answers from previous attempt
    setAnswers({});

    // Reset selected answer
    setSelectedAnswer(null);

    // Reset wrong-question list
    setWrongQuestions([]);

    // Return to quiz
    setFinished(false);
  };


  // -----------------------------------
  // Calculate score
  // -----------------------------------

  const score = Object.values(answers).filter(
    (answer) => answer.correct
  ).length;


  // -----------------------------------
  // Quiz result
  // -----------------------------------

  if (finished) {

    return (
      <section className="quiz-result">

        <span className="section-label">
          QUIZ COMPLETE
        </span>

        <h2>
          You scored {score}/{quizQuestions.length}
        </h2>


        {wrongQuestions.length === 0 ? (

          <p>
            Excellent! You got every question
            correct.
          </p>

        ) : (

          <>
            <p>
              You got{" "}
              {wrongQuestions.length}{" "}
              question
              {wrongQuestions.length === 1
                ? ""
                : "s"}{" "}
              wrong.
            </p>

            <button
              type="button"
              className="retry-button"
              onClick={handleRetryWrong}
            >
              Retry Wrong Answers
            </button>
          </>

        )}

      </section>
    );
  }


  // -----------------------------------
  // Safety check
  // -----------------------------------

  if (!currentQuestion) {
    return null;
  }


  // -----------------------------------
  // Quiz UI
  // -----------------------------------

  return (
    <section className="quiz-section">

      <div className="section-heading">

        <div>

          <span className="section-label">
            QUIZ
          </span>

          <h2>
            Question {currentIndex + 1} of{" "}
            {quizQuestions.length}
          </h2>

        </div>

      </div>


      <div className="quiz-card">

        <h3>
          {currentQuestion.question}
        </h3>


        <div className="options">

          {currentQuestion.options.map(
            (option) => {

              let className = "option";


              // Show answer result
              if (selectedAnswer !== null) {

                // Correct answer
                if (
                  option ===
                  currentQuestion.correctAnswer
                ) {
                  className += " correct";
                }

                // User selected wrong answer
                else if (
                  option === selectedAnswer
                ) {
                  className += " incorrect";
                }
              }


              return (
                <button
                  key={option}
                  type="button"
                  className={className}
                  onClick={() =>
                    handleAnswer(option)
                  }
                  disabled={
                    selectedAnswer !== null
                  }
                >
                  {option}
                </button>
              );

            }
          )}

        </div>


        {/* Explanation */}

        {selectedAnswer !== null && (

          <div className="explanation">

            <strong>
              {selectedAnswer ===
              currentQuestion.correctAnswer
                ? "Correct!"
                : "Not quite!"}
            </strong>

            <p>
              {currentQuestion.explanation}
            </p>

          </div>

        )}


        {/* Next / Finish */}

        {selectedAnswer !== null && (

          <button
            type="button"
            className="next-button"
            onClick={handleNext}
          >
            {currentIndex ===
            quizQuestions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>

        )}

      </div>

    </section>
  );
}

export default Quiz;