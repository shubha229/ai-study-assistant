import { useState } from "react";

function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flashcard-inner">

        <div className="flashcard-front">
          <span className="card-label">QUESTION</span>

          <h3>{card.question}</h3>

          <p>Click to reveal answer</p>
        </div>

        <div className="flashcard-back">
          <span className="card-label">ANSWER</span>

          <p>{card.answer}</p>

          <p>Click to see question</p>
        </div>

      </div>
    </div>
  );
}

export default Flashcard;