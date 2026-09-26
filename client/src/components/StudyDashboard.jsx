import FlashcardDeck from "./FlashcardDeck";
import Quiz from "./Quiz";

function StudyDashboard({ studySet }) {
  return (
    <div className="dashboard">

      <section className="study-header">

        <span className="section-label">
          YOUR STUDY SET
        </span>

        <h1>
          {studySet.title}
        </h1>

        <p>
          {studySet.summary}
        </p>

      </section>


      <FlashcardDeck
        flashcards={studySet.flashcards}
      />


      <Quiz
        questions={studySet.quiz}
      />

    </div>
  );
}

export default StudyDashboard;