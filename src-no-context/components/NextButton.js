export default function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;
  const qstEnded = index + 1 < numQuestions;

  return qstEnded ? (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Next
    </button>
  ) : (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'finished' })}
    >
      Finished
    </button>
  );
}
