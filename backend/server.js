const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected successfully!'))
  .catch(err => console.error('Khong the ket noi MongoDB Atlas:', err.message));

// Schema món ăn
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String
});

const Food = mongoose.model('Food', foodSchema);

// [GET] Lấy danh sách món ăn
app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách món ăn' });
  }
});

// [POST] Thêm món ăn mới (CÂU 3)
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));