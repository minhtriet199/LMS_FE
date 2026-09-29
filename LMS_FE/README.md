# LMS Frontend

React + TypeScript + Vite. Xem `PROJECT_CONTEXT.md` ở gốc repo để hiểu tổng thể dự án.

Hiện tại chỉ có phần xác thực: đăng nhập (JWT), đăng xuất, chặn route theo đăng nhập / role.

## Chạy

```bash
# 1. Backend (repo LMS_BE) — dùng profile http, tự migrate + seed tài khoản mẫu khi chạy dev
cd LMS_BE/LMS_BE
dotnet run --launch-profile http   # http://localhost:5000

# 2. Frontend
npm install
cp .env.example .env
npm run dev            # http://localhost:5173
```

Tài khoản demo (mật khẩu `Lms@12345`): `student@lms.dev`, `teacher@lms.dev`, `admin@lms.dev`.

Vite proxy `/api` sang `VITE_BACKEND_URL`, nên không cần cấu hình CORS khi dev.

## Scripts

- `npm run dev` — dev server
- `npm run build` — type-check + build
- `npm run lint` — ESLint
