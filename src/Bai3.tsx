import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  summary: string;       
  image_url: string;   
  url: string;           
  published_at: string; 
}

interface NewsApiResponse {
  results: Article[];
}

const Bai3: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsApiResponse>(
          'https://api.spaceflightnewsapi.net/v4/articles?limit=10'
        );
        setArticles(response.data.results);
      } catch (err) {
        setError('Không thể tải tin tức.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Đang tải tin tức...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const articleStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    maxWidth: '600px',
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'cover',
    borderRadius: '4px',
  };

  return (
    <div>
      <h2>Bài 3: Tin tức Spaceflight</h2>
      {articles.map((article) => (
        <div key={article.id} style={articleStyle}>
          <img src={article.image_url} alt={article.title} style={imgStyle} />
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
          <p>
            <em>
              Ngày đăng: {new Date(article.published_at).toLocaleString('vi-VN')}
            </em>
          </p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Đọc tin gốc
          </a>
        </div>
      ))}
    </div>
  );
};

export default Bai3;