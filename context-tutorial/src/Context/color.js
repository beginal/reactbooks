import React, { createContext, useState } from 'react';

const ColorContext = createContext({
  state: { color: 'black', subcolor: 'red'},
  actions: {
    setColor: () => {},
    setSubcolor: () => {}
  }
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red')

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor}
    // 상태는 state로 업데이트함수는 actions로 묶어서 전달
  };
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};
// const ColorConsumer = ColorContext.Consumer랑 같은의미
const { Consumer: ColorConsumer } = ColorContext;
// ColorProvider와 ColorConsumer 내보내기
export { ColorProvider, ColorConsumer };
export default ColorContext;