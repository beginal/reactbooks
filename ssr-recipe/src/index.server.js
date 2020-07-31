import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import path from 'path'

const app = express();

// 서버사이드 렌더링을 처리할 핸들러 함수
const serverRender = (req, res, next) => {
  // 이 함수는 404가 떠야하는 상황에 404를 띄우지 않고 서버사이드 렌더링을 해준다.

  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고
  res.send(root) // 클라이언트에게 결과 전송
};

const serve = express.static(path.resolve('./build'), {
  index: false // "/" 경로에서 index.html을 보여주지 않도록 설정
});

app.use(serve) // 순서가 중요함. 꼭 serveRender 위에 위치하도록!
app.use(serverRender);

// 5000포트로 서버를 가동합니다.
app.listen(5000, () => {
  console.log('Running on http://localhost:5000');
});