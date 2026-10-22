# LMS Frontend

React 19 + TypeScript + Vite. Giao diện theo mockup "AI LMS" (sidebar navy + nội dung trắng).

> Hướng dẫn cài đặt toàn bộ dự án (DB + Backend + Frontend) cho người mới:
> **[README của LMS_BE](https://github.com/minhtriet199/LMS_BE/tree/develop#readme)**.

Hiện có: đăng nhập (JWT + refresh cookie), giữ đăng nhập khi F5, đăng xuất, chặn route theo đăng nhập / role,
khung trang (sidebar + topbar), dashboard trống, đổi ngôn ngữ vi/en.

## Chạy

Backend (LMS_BE) phải đang chạy ở `http://localhost:5000` trước.

```bash
npm install
npm run dev            # http://localhost:5173
```

File `.env` là tùy chọn — chỉ cần khi backend chạy cổng khác 5000 (copy `.env.example` thành `.env` rồi sửa).

Tài khoản demo (mật khẩu `Lms@12345`): `student@lms.dev`, `teacher@lms.dev`, `admin@lms.dev`.

Vite proxy `/api` sang `VITE_BACKEND_URL`, nên không cần cấu hình CORS khi dev.

## Thêm 1 trang mới

1. Tạo `src/pages/TenTrang.tsx`.
2. Thêm route trong `src/routes/AppRoutes.tsx` (bên trong `<Route element={<Layout />}>`).
   Giới hạn role: bọc bằng `<Route element={<ProtectedRoute roles={['Teacher', 'Admin']} />}>`.
3. Trong `src/components/Sidebar.tsx`, điền `path` cho mục menu tương ứng (đang là `null` = mờ).
4. Chữ hiển thị: thêm key vào cả `src/i18n/locales/vi.json` và `en.json`, dùng `t('key')`.
5. Gọi API: viết hàm trong `src/services/`, không gọi axios trực tiếp trong component.

## Scripts

- `npm run dev` — dev server
- `npm run build` — type-check + build
- `npm run lint` — ESLint
