import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
    };
    company: {
      name: string;
    };
  }

const ChiTietSinhVien: React.FC = () => { 
  const { id } = useParams<{ id: string }>(); 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!id) return;
      try {
        const response = await axios.get<User>(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(response.data);
      } catch (err) {
        setError('Không tìm thấy sinh viên.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  if (loading) return <p>Đang tải thông tin chi tiết...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return null;

  return (
    <div>
      <h2>Chi tiết sinh viên: {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Công ty:</strong> {user.company.name}</p>
      <p>
        <strong>Địa chỉ:</strong> {user.address.suite}, {user.address.street}, {user.address.city}
      </p>
      <br />
      <Link to="/bai2">Quay lại danh sách</Link>
    </div>
  );
};

export default ChiTietSinhVien;