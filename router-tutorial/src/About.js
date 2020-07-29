import React from 'react'
import qs from 'qs';

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
    // 이 설정을 통해 맨 앞의 ? 를 생략한다.
  });
  const showDetail = query.detail === 'true';
  return (
    <div>
      <h1>About</h1>
      <p>라우터의 기초를 실습중입니다.</p>
      {showDetail && <p>detail 값을 true로 설정하셧군요</p>}
    </div>
  )
}

export default About