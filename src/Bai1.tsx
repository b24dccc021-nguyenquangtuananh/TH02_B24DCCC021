import React, { useState } from 'react';
import axios from 'axios';

interface WeatherData {
  current_condition: [
    {
      temp_C: string;
      weatherDesc: [{ value: string }]; 
      lang_vi: [{ value: string }];      
    }
  ];
}

const Bai1: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!city) {
      setError('Vui lòng nhập tên thành phố.');
      return;
    }
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await axios.get<WeatherData>(
        `https://wttr.in/${city}?format=j1&lang=vi`
      );
      setWeather(response.data);
    } catch (err) {
      setError('Không tìm thấy thành phố hoặc có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Bài 1: Ứng dụng thời tiết</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Nhập tên thành phố "
      />
      <button onClick={fetchWeather} disabled={loading}>
        {loading ? 'Đang tải...' : 'Lấy thông tin'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && weather.current_condition && (
        <div style={{ marginTop: '20px' }}>
          <h3>Thời tiết tại {city}</h3>
          <p>
            <strong>Nhiệt độ:</strong>{' '}
            {weather.current_condition[0].temp_C}°C
          </p>
          
          <p>
            <strong>Tình trạng:</strong>{' '}
            {weather.current_condition[0].lang_vi[0].value}
          </p>

        </div>
      )}
    </div>
  );
};

export default Bai1;