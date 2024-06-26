import { useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';

export default function Timer() {
  const { secondsLeft, dispatch } = useQuiz();
  const min = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  //   useEffect(
  //     () => setInterval(() => dispatch({ type: 'tick' }), 1000),
  //     [dispatch]
  //   );

  //set timer to start on mount of Timer component
  useEffect(
    function () {
      let interval = setInterval(() => dispatch({ type: 'tick' }), 1000);

      return () => clearTimeout(interval);
    },

    [dispatch]
  );

  return (
    <div>
      <div className="timer">
        {min < 10 && '0'}
        {min}:{secs < 10 && '0'}
        {secs}
      </div>
    </div>
  );
}
