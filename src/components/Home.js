import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then((res) => res.json())
      .then((res) => {
        Promise.all(
          res.slice(0, 60).map((id) => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)),
        )
          .then((response) => Promise.all(response.map((result) => result.json())))
          .then((ress) => {
            // omitting discussion links
            setArticles(ress.filter((item) => item.url && !item.text).slice(0, 30));
          })
          .catch(console);
      })
      .catch(console);
  }, []);

  return (
    <>
      {articles && (
        <>
          <h1>Quiet Hacker News</h1>
          <ol>
            {
            articles && articles.map((article) => (
              <li key={article.id}>
                <a href={article.url}>{article.title}</a>
                {' '}
                <small>
                  [
                  {article.url.slice(article.url.indexOf('//') + 2, article.url.indexOf('/', article.url.indexOf('//') + 2))}
                  ]
                </small>
              </li>
            ))
          }
          </ol>
        </>
      )}
    </>
  );
};

export default Home;
