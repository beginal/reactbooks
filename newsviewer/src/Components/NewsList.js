import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import usePromise from '../lib/usePromise';
import NewsItem from './NewsItem';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom:3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;


const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=e899993defbb4f37908ff02d95450a0e`
        )
  }, [category]) // useEffect에 등록하는 함수는 async로 작성하면 안된다. 그 대신 함수내부에 async를 만들어줘야한다.


  if (loading) {
    return null;
  }
  if (!response) {
    return null;
  }
  if (error) {
    return <NewsListBlock>에러가 발생했어요</NewsListBlock>
  }

  const { articles } = response.data;
  return(
  <NewsListBlock>
    {articles.map(article => (
      <NewsItem key={article.url} article={article} />
    ))}
  </NewsListBlock>
  )
}

export default NewsList;