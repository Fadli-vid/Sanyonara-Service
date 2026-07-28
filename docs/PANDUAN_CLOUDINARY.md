# Panduan Integrasi Cloudinary — Sanyonara Service

Dokumen ini berisi panduan langkah demi langkah untuk menghubungkan **Admin Panel Sanyonara Service** ke **Cloudinary**, agar gambar yang di-upload oleh Admin otomatis tersimpan di Cloud dan dapat dilihat oleh **semua pengunjung website di seluruh dunia**.

---

## 📌 Langkah 1: Dapatkan Cloud Name Anda

Berdasarkan screenshot akun Anda:
* **Cloud Name Anda:** `dhx7maf56`

---

## 📌 Langkah 2: Buat "Unsigned Upload Preset"

Agar React di browser bisa mengunggah foto tanpa perlu backend/server, kita perlu membuat 1 buah **Upload Preset**:

1. Di dashboard Cloudinary, klik ikon **Settings ( ⚙️ )** di pojok kiri bawah.
2. Masuk ke bagian **Upload presets** -> klik **Add upload preset**.
3. Atur konfigurasi berikut pada formulir:
   * **Upload preset name:** Isi nama bebas, misal `sanyonara_preset` (atau biarkan bawaan).
   * **Signing Mode:** Ubah menjadi **`Unsigned`** *(Ini paling penting!)*.
   * **Asset folder:** Isi dengan **`sanyonara_service`** *(Agar foto terkumpul rapi di dalam 1 folder di Cloudinary)*.
   * **Generated public ID:** Pilih **`Auto-generate an unguessable public ID value`**.
   * **Generated display name:** Pilih **`Use the filename of the uploaded file as the asset's display name`**.
4. Klik tombol **Save** di pojok kanan atas.
5. Catat nama **Upload preset name** tersebut.

---

## 📌 Langkah 3: Konfigurasi di Proyek Sanyonara Service

Buat file `.env` di direktori utama proyek:
```env
VITE_CLOUDINARY_CLOUD_NAME=dhx7maf56
VITE_CLOUDINARY_UPLOAD_PRESET=sanyonara_preset
```
*(Ganti `sanyonara_preset` dengan nama Upload preset name yang Anda simpan di Langkah 2)*

---

## 🔄 Cara Kerja Otomatis di Aplikasi:

1. Admin memilih/seret foto di Admin Panel.
2. Aplikasi React mengirim foto langsung ke Cloudinary `dhx7maf56` ke folder `sanyonara_service`.
3. Cloudinary membalas dengan URL gambar publik permanen.
4. Foto langsung tampil di website dan **dapat dilihat oleh semua orang di seluruh dunia!** 🌍
