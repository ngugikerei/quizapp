import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import Main from './Main';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import Finished from './Finished';
import Footer from './Footer';
import Timer from './Timer';

import { useQuiz } from '../contexts/QuizContext';

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />

              <NextButton />
            </Footer>
          </>
        )}

        {status === 'complete' && <Finished />}
      </Main>
    </div>
  );
}
