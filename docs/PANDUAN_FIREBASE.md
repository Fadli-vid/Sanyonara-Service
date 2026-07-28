# Panduan Setup Firebase Firestore — Sanyonara Service

Dokumen ini berisi panduan singkat (hanya 2 menit) untuk membuat **Database Cloud Gratis di Firebase**, agar perubahan data dari Admin Panel bisa **langsung terlihat di semua HP & Laptop pengunjung di seluruh dunia**.

---

## 📌 Langkah 1: Buat Proyek Firebase (Gratis)

1. Buka situs **[Firebase Console](https://console.firebase.google.com/)** di browser Anda.
2. Login dengan akun Google / Gmail Anda.
3. Klik tombol **`Add project`** (atau *Tautkan proyek*).
4. Masukkan nama proyek, misal: **`sanyonara-service`**.
5. Klik **`Continue`** -> Matikan opsi *Google Analytics* (atau biarkan nyala) -> Klik **`Create project`**.
6. Tunggu beberapa detik, lalu klik **`Continue`**.

---

## 📌 Langkah 2: Buat Database (Cloud Firestore)

1. Di dashboard Firebase sebelah kiri, klik menu **`Build`** -> pilih **`Firestore Database`**.
2. Klik tombol **`Create database`**.
3. Pilih lokasi database (biarkan default, misal: *asia-southeast1 (Singapore)*) -> klik **`Next`**.
4. Di pilihan Security Rules, pilih **`Start in test mode`** -> klik **`Create`** (atau *Enable*).

---

## 📌 Langkah 3: Ambil Kunci Konfigurasi (Firebase Config)

1. Di sebelah kiri atas (di samping *Project Overview*), klik ikon **Settings ( ⚙️ )** -> pilih **`Project settings`**.
2. Gulir layar ke bawah sampai bagian **"Your apps"**.
3. Klik ikon Web **`</>`**.
4. Masukkan nama aplikasi, misal: `Sanyonara Web` -> klik **`Register app`**.
5. Salin teks `firebaseConfig` yang muncul. Tampilannya akan seperti ini:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "sanyonara-service.firebaseapp.com",
  projectId: "sanyonara-service",
  storageBucket: "sanyonara-service.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## 📌 Langkah 4: Berikan Kunci ke Agent

Kirimkan teks `firebaseConfig` di atas ke sini (atau masukkan ke file `.env`), dan saya akan langsung menghubungkan aplikasi React Anda ke Firebase Firestore!

---

### 🔄 Setelah Terhubung:
* **Admin mengubah data di Laptop** -> Otomatis tersimpan ke Cloud Firebase.
* **Pengunjung membuka di HP** -> React membaca data terbaru dari Cloud Firebase.
* Semua perangkat (HP, Tablet, Laptop) selalu menampilkan data yang persis sama! 🚀
