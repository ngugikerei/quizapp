import { createContext, useContext, useReducer, useEffect } from 'react';

const QuizContext = createContext();

const SECS_PER_QSTN = 30;

const initialState = {
  questions: [],
  // "loading" , "error", 'ready' , 'active', 'complete
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsLeft: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        status: 'ready',
        questions: action.payload,
      };
    case 'dataFetching':
      return {
        ...state,
        status: 'loading',
      };

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsLeft: state.questions.length * SECS_PER_QSTN,
      };

    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };

    case 'newAnswer':
      const question = state.questions.at(state.index); //get current question to know no of points to add
      // console.log(state.questions.at(state.index));
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };

    case 'finished':
      return {
        ...state,
        status: 'complete',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case 'restart':
      return {
        ...initialState,
        status: 'ready',
        questions: state.questions,
      };

    case 'tick':
      return {
        ...state,
        secondsLeft: state.secondsLeft - 1,
        status: state.secondsLeft === 0 ? 'complete' : state.status,
      };

    default:
      throw new Error('Action unknown');
  }
}

function QuizProvider({ children }) {
  const [
    { status, questions, index, answer, points, highscore, secondsLeft },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  //calculate total number of possible points
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  //fetch data from local API
  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:9000/questions');
        const data = await res.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    }

    fetchData();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        highscore,
        secondsLeft,
        maxPoints,
        numQuestions,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('Quiz Context was used outside QuizProvider');
  return context;
}

export { useQuiz, QuizProvider };
