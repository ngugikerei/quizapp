import { useEffect, useReducer } from 'react';
import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import Main from './Main';
import StartScreen from './StartScreen';
import Question from './Question';

const initialState = {
  questions: [],
  // "loading" , "error", 'ready' , 'active', 'complete
  status: 'loading',
  index: 0,
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
      };

    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };

    default:
      throw new Error('Action unknown');
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index } = state;

  const numQuestions = questions.length;

  // function handleStart() {
  //   dispatch({ type: 'start' });
  // }

  //fetch data from local API
  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}
