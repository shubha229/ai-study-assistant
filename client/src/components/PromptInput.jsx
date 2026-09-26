import { useState } from "react";

function PromptInput({ onGenerate, loading }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!input.trim()) {
      return;
    }

    onGenerate(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="prompt-form">
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Paste your notes or enter a topic..."
        maxLength={5000}
        disabled={loading}
      />

      <div className="prompt-footer">
        <span>{input.length}/5000</span>

        <button
          type="submit"
          disabled={loading || !input.trim()}
        >
          {loading ? "Generating..." : "Generate Study Set"}
        </button>
      </div>
    </form>
  );
}

export default PromptInput;