const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected successfully!'))
  .catch(err => console.error('Khong the ket noi MongoDB Atlas:', err.message));

// Schema món ăn
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  description: { type: String, default: '' }
});

const Food = mongoose.model('Food', foodSchema);

// [GET] Lấy danh sách tất cả món ăn
app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách món ăn', error: error.message });
  }
});

// [POST] Thêm món ăn mới
app.post('/api/foods', async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Tên và giá món ăn là bắt buộc' });
    }

    const newFood = new Food({ name, price, image, description });
    await newFood.save();

    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm món ăn', error: error.message });
  }
});

// [DELETE] Xóa món ăn theo ID
app.delete('/api/foods/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ message: 'Không tìm thấy món ăn để xóa' });
    }

    res.json({ message: 'Xóa món ăn thành công', deletedFood });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa món ăn', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));