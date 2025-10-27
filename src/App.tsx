import { Routes, Route, Link } from 'react-router-dom';

import Bai1 from './Bai1';       
import Bai2 from './Bai2';        
import ChiTietSinhVien from './ChiTietSinhVien'; 
import Bai3 from './Bai3';        

import './App.css';

function App() {
  return (
    <div className="App">
      <nav style={{ padding: '20px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
        <Link to="/bai1" style={{ marginRight: '15px', textDecoration: 'none' }}>
          Bài 1: Ứng dụng thời tiết
        </Link>
        <Link to="/bai2" style={{ marginRight: '15px', textDecoration: 'none' }}>
          Bài 2: Ứng dụng danh sách sinh viên   
        </Link>
        <Link to="/bai3" style={{ textDecoration: 'none' }}>
          Bài 3: Ứng dụng xem tin tức 
        </Link>
      </nav>

      <hr />

      <div className="content" style={{ padding: '20px' }}>
        <Routes>
         
          <Route path="/bai1" element={<Bai1 />} />
          <Route path="/bai2" element={<Bai2 />} />
          <Route path="/bai2/:id" element={<ChiTietSinhVien />} />
          <Route path="/bai3" element={<Bai3 />} />

          <Route path="/" element={
            <div>
              <h2>Bài thực hành 02</h2>
              
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;