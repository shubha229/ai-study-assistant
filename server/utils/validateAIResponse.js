export function validateAIResponse(data) {
  // 1. Check that response is an object
  if (!data || typeof data !== "object") {
    return {
      valid: false,
      error: "Invalid response format",
    };
  }

  // 2. Check title and summary
  if (
    typeof data.title !== "string" ||
    !data.title.trim() ||
    typeof data.summary !== "string" ||
    !data.summary.trim()
  ) {
    return {
      valid: false,
      error: "Missing title or summary",
    };
  }

  // 3. Check flashcards
  if (
    !Array.isArray(data.flashcards) ||
    data.flashcards.length < 5 ||
    data.flashcards.length > 8
  ) {
    return {
      valid: false,
      error: "Flashcards must contain between 5 and 8 cards",
    };
  }

  // 4. Validate every flashcard
  for (const card of data.flashcards) {
    if (
      !card ||
      typeof card.id !== "string" ||
      !card.id.trim() ||
      typeof card.question !== "string" ||
      !card.question.trim() ||
      typeof card.answer !== "string" ||
      !card.answer.trim()
    ) {
      return {
        valid: false,
        error: "Invalid flashcard structure",
      };
    }
  }

  // 5. Check quiz
  if (
    !Array.isArray(data.quiz) ||
    data.quiz.length !== 5
  ) {
    return {
      valid: false,
      error: "Quiz must contain exactly 5 questions",
    };
  }

  // 6. Validate every quiz question
  for (const question of data.quiz) {
    if (
      !question ||
      typeof question.id !== "string" ||
      !question.id.trim() ||
      typeof question.question !== "string" ||
      !question.question.trim() ||
      !Array.isArray(question.options) ||
      typeof question.correctAnswer !== "string" ||
      !question.correctAnswer.trim() ||
      typeof question.explanation !== "string" ||
      !question.explanation.trim()
    ) {
      return {
        valid: false,
        error: "Invalid quiz structure",
      };
    }

    // 7. Every quiz question must have exactly 4 options
    if (question.options.length !== 4) {
      return {
        valid: false,
        error: "Each quiz question must have exactly 4 options",
      };
    }

    // 8. Every option must be a non-empty string
    for (const option of question.options) {
      if (
        typeof option !== "string" ||
        !option.trim()
      ) {
        return {
          valid: false,
          error: "Quiz options must be non-empty strings",
        };
      }
    }

    // 9. Correct answer must exist in options
    if (!question.options.includes(question.correctAnswer)) {
      return {
        valid: false,
        error: "Correct answer is not one of the options",
      };
    }
  }

  // 10. Everything is valid
  return {
    valid: true,
  };
}