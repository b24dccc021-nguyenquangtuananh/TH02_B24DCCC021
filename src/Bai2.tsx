import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}

const Bai2: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          'https://jsonplaceholder.typicode.com/users'
        );
        setUsers(response.data);
      } catch (err) {
        setError('Không thể tải danh sách sinh viên.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); 

  if (loading) return <p>Đang tải danh sách...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Bài 2: Danh sách sinh viên</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: '10px' }}>
            <Link to={`/bai2/${user.id}`}>
              <strong>{user.name}</strong>
            </Link>
            <p style={{ margin: '5px 0 0 0' }}>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bai2;