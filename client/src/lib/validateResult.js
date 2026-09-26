export function validateStudyResult(data) {
  // -----------------------------------
  // Check basic response
  // -----------------------------------

  if (!data || typeof data !== "object") {
    return {
      valid: false,
      error: "Invalid response from AI.",
    };
  }

  // -----------------------------------
  // Validate title
  // -----------------------------------

  if (
    typeof data.title !== "string" ||
    !data.title.trim()
  ) {
    return {
      valid: false,
      error: "Study title is missing.",
    };
  }

  // -----------------------------------
  // Validate summary
  // -----------------------------------

  if (
    typeof data.summary !== "string" ||
    !data.summary.trim()
  ) {
    return {
      valid: false,
      error: "Study summary is missing.",
    };
  }

  // -----------------------------------
  // Validate flashcards
  // -----------------------------------

  if (
    !Array.isArray(data.flashcards) ||
    data.flashcards.length < 5 ||
    data.flashcards.length > 8
  ) {
    return {
      valid: false,
      error: "Flashcards must contain between 5 and 8 cards.",
    };
  }

  // -----------------------------------
  // Validate each flashcard
  // -----------------------------------

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
        error: "One or more flashcards have an invalid format.",
      };
    }
  }

  // -----------------------------------
  // Validate quiz
  // -----------------------------------

  if (
    !Array.isArray(data.quiz) ||
    data.quiz.length !== 5
  ) {
    return {
      valid: false,
      error: "Quiz must contain exactly 5 questions.",
    };
  }

  // -----------------------------------
  // Validate each quiz question
  // -----------------------------------

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
        error: "One or more quiz questions have an invalid format.",
      };
    }

    // Exactly 4 options
    if (question.options.length !== 4) {
      return {
        valid: false,
        error: "Each quiz question must have exactly 4 options.",
      };
    }

    // Every option must be a non-empty string
    for (const option of question.options) {
      if (
        typeof option !== "string" ||
        !option.trim()
      ) {
        return {
          valid: false,
          error: "Quiz options must be non-empty strings.",
        };
      }
    }

    // Correct answer must match an option
    if (!question.options.includes(question.correctAnswer)) {
      return {
        valid: false,
        error: "A quiz answer does not match its options.",
      };
    }
  }

  // -----------------------------------
  // Validation successful
  // -----------------------------------

  return {
    valid: true,
    data,
  };
}