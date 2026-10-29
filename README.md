
# Hệ thống quản lý món ăn

## 1. Giới thiệu
Đề tài: Xây dựng và triển khai hệ thống quản lý món ăn trên nền tảng đám mây.

Học phần: Điện toán đám mây.

Hệ thống sử dụng React cho giao diện, Node.js và Express cho API, MongoDB Atlas để lưu trữ dữ liệu.

## 2. Công nghệ sử dụng
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Version Control: Git, GitHub
- Container: Docker, Docker Hub
- Deployment: Render

## 3. Cấu trúc thư mục
- frontend/: Chứa mã nguồn giao diện React.
- backend/: Chứa mã nguồn API Node.js và Express.
- README.md: Tài liệu hướng dẫn dự án.
- .gitignore: Danh sách các tệp không đưa lên GitHub.

## 4. Hướng dẫn cài đặt

Yêu cầu: Node.js và npm.

### Backend
cd backend
npm install
npm start

### Frontend
cd frontend
npm install
npm run dev

Lưu ý: Các lệnh chạy sẽ sử dụng được sau khi hoàn thành cài đặt và cấu hình frontend, backend ở những câu tiếp theo.

## 5. Bảo mật
Không đưa file .env, mật khẩu MongoDB, access token hoặc thông tin bí mật lên GitHub.

## 6. Triển khai
Hệ thống dự kiến được đóng gói bằng Docker, đẩy image lên Docker Hub và triển khai trên Render.
