# ⚠️ HƯỚNG DẪN TẠO SANITY TOKEN ĐÚNG CÁCH

## Vấn đề hiện tại:
Token "edit token" từ UI không hoạt động → Lỗi "Unauthorized - Session not found"

## Cách tạo token đúng:

### Bước 1: Truy cập Sanity Management
Đi tới: https://sanity.io/manage/personal/project/51lh57k2/api

### Bước 2: Tạo token mới
1. Click "Add API token"
2. Label: "Reddit Development Token"
3. Permissions: Chọn **"Editor"** (không phải Viewer!)
4. Click "Create"

### Bước 3: Copy token
- Token chỉ hiện 1 LẦN duy nhất
- Copy TOÀN BỘ token (bắt đầu bằng `sk`)
- Token dài khoảng 200-210 ký tự

### Bước 4: Paste vào .env.local
```env
# apps/reddit/.env.local
SANITY_API_READWRITE_TOKEN="sk<token_đầy_đủ_ở_đây>"
```

### Bước 5: Test token
```bash
cd packages/sanity-utils
# Sửa TOKEN trong test-token.mjs thành token mới
node test-token.mjs
```

Phải thấy:
```
✅ Read test PASSED
✅ Create test PASSED
✅ Delete test PASSED
✅ ALL TESTS PASSED!
```

### Bước 6: Restart server
```bash
# Stop server (Ctrl+C)
cd C:\Users\Admin\mrlongruoi\web\project01\mono-sanity
turbo dev
```

## Lưu ý quan trọng:

### ❌ Tokens KHÔNG hoạt động:
- Token từ yellow box trong Studio UI (token tạm thời)
- Token "Viewer" (chỉ đọc)
- Token cũ đã revoked

### ✅ Token PHẢI:
- Được tạo từ https://sanity.io/manage (không phải Studio)
- Có permission "Editor" hoặc "Administrator"
- Còn hiệu lực (không bị xóa/revoked)
- Copy đầy đủ, không thiếu ký tự

## Kiểm tra token hiện tại:

Token bạn đang dùng:
```
skyIGuqFcDOPMNp84BOrpEvHhRFPEK+2mG8eRMu1S1ht3Y3G1Ji8nkKqnaDLYWXv14s+EGN8sKdgs0hKqLptEo1ELBvPYC3dP3gcY1omojVnSNDGucNJ41BQlsUaUnBj8K3e0VVqhXCHLcbwXIy81qLEqpoDfnFB8HkZ5HopE0cCN48ci8GR
```

Độ dài: 180 ký tự

❌ Token này bị lỗi "Unauthorized - Session not found"
→ PHẢI TẠO TOKEN MỚI từ Sanity Management!

## Các token cũ (để tham khảo):

Token "development token" (Developer permission):
```
skjGLkFRZoO0axFxcpdkuOEJOC7L050868mE0LnsXuwsxj2aeOHaXV2COM7DlHc9l4MFHsdtuXmT72FONqMacuSFRv5VDxvkGyKUBqgtil54jRlppAChWP6Sos21a3aRrLKJfEiD9GboaJGcWU6ufXrdJLJjBcTEcASOVoLnCpAJAFrTo4ij
```

Độ dài: 210 ký tự - có thể token này vẫn hoạt động!

## Giải pháp nhanh:

Thử dùng lại "development token" cũ:
