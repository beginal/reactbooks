import React, { useState, useCallback } from 'react'
import NewsList from './Components/NewsList'
import Categories from './Components/Categories'


const App = () => {
  const [category, setCategory] = useState('all') 
  const onSelect = useCallback((category) => {
    setCategory(category)
  },[])

  return (
    <div>
      <Categories category={category} onSelect={onSelect} />
      <NewsList category={category} />
    </div>
  );
};

export default App;
