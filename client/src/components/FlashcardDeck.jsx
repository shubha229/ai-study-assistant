import Flashcard from "./Flashcard";

function FlashcardDeck({ flashcards }) {
  return (
    <section className="study-section">

      <div className="section-heading">
        <div>
          <span className="section-label">FLASHCARDS</span>
          <h2>Review the concepts</h2>
        </div>

        <span className="count">
          {flashcards.length} cards
        </span>
      </div>

      <div className="flashcard-grid">
        {flashcards.map((card) => (
          <Flashcard
            key={card.id}
            card={card}
          />
        ))}
      </div>

    </section>
  );
}

export default FlashcardDeck;