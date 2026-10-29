import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // Lấy danh sách món ăn từ Backend
  const fetchFoods = () => {
    axios.get('http://localhost:5000/api/foods')
      .then(res => setFoods(res.data))
      .catch(err => console.error('Lỗi khi tải danh sách món ăn:', err));
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Xử lý khi bấm nút Thêm món ăn
  const handleAddFood = (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("Vui lòng nhập đầy đủ tên và giá món ăn!");
      return;
    }

    axios.post('http://localhost:5000/api/foods', { name, price: Number(price) })
      .then(() => {
        alert("Thêm món ăn thành công!");
        setName('');
        setPrice('');
        fetchFoods(); // Cập nhật lại danh sách ngay lập tức
      })
      .catch(err => console.error('Lỗi khi thêm món ăn:', err));
  };

  // Xử lý khi bấm nút Xóa món ăn
  const handleDeleteFood = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa món ăn này không?")) {
      axios.delete(`http://localhost:5000/api/foods/${id}`)
        .then(() => {
          alert("Xóa món ăn thành công!");
          fetchFoods(); // Tải lại danh sách sau khi xóa
        })
        .catch(err => console.error('Lỗi khi xóa món ăn:', err));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '30px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Quản Lý Món Ăn</h2>

      {/* Form thêm món ăn */}
      <form onSubmit={handleAddFood} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3>Thêm Món Ăn Mới</h3>
        <input 
          type="text" 
          placeholder="Tên món ăn" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={{ padding: '8px', fontSize: '14px' }}
        />
        <input 
          type="number" 
          placeholder="Giá món ăn (VNĐ)" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          style={{ padding: '8px', fontSize: '14px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Thêm Món
        </button>
      </form>

      <hr />

      {/* Danh sách món ăn */}
      <h3>Danh Sách Món Ăn</h3>
      {foods.length === 0 ? (
        <p>Chưa có món ăn nào trong hệ thống.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {foods.map(item => (
            <li key={item._id} style={{ margin: '10px 0', padding: '8px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span><strong>{item.name}</strong> - {item.price.toLocaleString()} VNĐ</span>
              <button 
                onClick={() => handleDeleteFood(item._id)} 
                style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;