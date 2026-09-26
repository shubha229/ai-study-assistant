function ErrorState({ message, onRetry }) {
  return (
    <section className="status-card error-card">

      <div className="error-icon">
        !
      </div>

      <h2>
        Something went wrong
      </h2>

      <p>
        {message}
      </p>

      <button
        type="button"
        className="retry-button"
        onClick={onRetry}
      >
        Try Again
      </button>

    </section>
  );
}

export default ErrorState;