import React from 'react'
import { Route } from 'react-router-dom'
import NewsPage from './Components/NewsPage';


const App = () => {
  return (
    <div>
      <Route path="/:category?" component={NewsPage} />
      {/* 물음표는 category값이 선택적이라는 의미, (있을수도 없을수도 있는)*/}
    </div>
  );
};

export default App;
