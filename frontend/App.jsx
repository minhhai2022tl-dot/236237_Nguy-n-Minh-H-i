import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/foods')
      .then(res => setFoods(res.data))
      .catch(err => console.error('Loi ket noi API:', err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Danh Sách Món Ăn</h1>
      {foods.length === 0 ? (
        <p>Chưa có món ăn nào trong Database.</p>
      ) : (
        <ul>
          {foods.map(item => (
            <li key={item._id}>
              <strong>{item.name}</strong> - {item.price} VNĐ
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;