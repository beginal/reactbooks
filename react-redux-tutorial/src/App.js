import React from 'react';
import Counter from './components/Counter';
import TodoItem from './components/Todos';

const App = () => {
  return(
    <div>
      <Counter number={0} />
      <hr />
      <TodoItem />
    </div>
  )
}

export default App;