import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
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
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=e899993defbb4f37908ff02d95450a0e`
        )
        setArticles(response.data.articles)
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
    fetchData();
  }, [category]);

  if(loading) {
    return null;
  }
  if (!articles) {
    return null;
  }
  return(
  <NewsListBlock>
    {articles.map(article => (
      <NewsItem key={article.url} article={article} />
    ))}
  </NewsListBlock>
  )
}

export default NewsList;