import React from 'react'
import ColorBox from './components/ColorBox';
import SelectColor from './components/SelectColor';
import { ColorProvider } from './Context/color';

const App = () => {
  return (
    <ColorProvider>
    <div>
      <SelectColor />
      <ColorBox />
    </div>
    </ColorProvider>
  );
};

export default App;
