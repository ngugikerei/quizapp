import { useState, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step };

    case 'dec':
      return {
        ...state,
        count: state.count - state.step,
      };

    case 'setstep':
      return {
        ...state,
        step: action.payload,
      };

    case 'setcount':
      return {
        ...state,
        count: action.payload,
      };

    case 'reset':
      return {
        count: 0,
        step: 1,
      };

    default:
      throw new Error('wee wacha');
  }
}

function DateCounter() {
  //const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const initialstate = { step: 1, count: 0 };

  const [state, dispatch] = useReducer(reducer, initialstate);
  const { step, count } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    // setCount((count) => count - 1);
    //setCount((count) => count - step);

    dispatch({ type: 'dec', payload: -1 });
  };

  const inc = function () {
    //setCount((count) => count + step);
    dispatch({ type: 'inc', payload: 1 });
  };

  const defineCount = function (e) {
    //setCount(Number(e.target.value));
    dispatch({ type: 'setcount', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: 'setstep', payload: Number(e.target.value) });
  };

  const reset = () => {
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
