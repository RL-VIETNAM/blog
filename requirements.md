## Yêu cầu bổ sung cho web blog

### 1. Render Markdown

* Cho phép **nhập/paste trực tiếp nội dung Markdown (.md)** khi tạo hoặc chỉnh sửa bài viết.
* Hiển thị đúng cú pháp Markdown chuẩn: heading, list, code block, link, image, table, …
* (Optional) Hỗ trợ **LaTeX/Math** trong Markdown (`$...$`, `$$...$$`) tương tự Overleaf.

---

### 2. Upload nhiều ảnh

* Cho phép **upload nhiều ảnh cùng lúc**.
* Sau khi upload, trả về **danh sách URL ảnh** để chèn vào Markdown:

  ```md
  ![alt](image_url)
  ```

---

### 3. Xóa bài viết

* Cho phép **xóa bài blog đã tạo**.
* Chỉ người tạo bài (hoặc admin) được xóa.
* Có **confirm** trước khi xóa.

---

### 4. Tên tác giả

* Mỗi bài viết có trường **Tên tác giả**.
* Hiển thị tên tác giả trên trang bài viết.

---

### 5. Render GIF / Video (optional)

* Cho phép embed **GIF hoặc video** trong nội dung Markdown (link trực tiếp, YouTube, mp4, …).

---

**Ghi chú**

* Ưu tiên giải pháp **đơn giản, dễ dùng, dễ bảo trì**.
* Phục vụ viết blog **kỹ thuật / học thuật**.
