import { useQuiz } from '../contexts/QuizContext';

export default function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuiz();
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
