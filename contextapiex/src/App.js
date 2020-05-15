import React from 'react';
import ColorBox from './Components/ColorBox';
import { ColorProvider } from './contexts/color';
import SelectColors from './Components/SelectColors'

const App =() => {
  return (
    <ColorProvider>
    <div>
      <SelectColors />
      <ColorBox />
    </div>
    </ColorProvider>
  );
}

export default App;
