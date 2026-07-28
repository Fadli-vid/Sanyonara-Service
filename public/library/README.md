# Library Gambar

Folder ini tersedia untuk menyimpan file gambar statis secara manual.
Gambar di folder ini dapat diakses via URL `/library/nama-file.jpg`.

## Cara Kerja Upload Gambar

Gambar yang diupload via admin panel di-konversi ke Base64 dan disimpan di data website.
Agar gambar **terlihat oleh semua pengunjung** setelah deploy:

1. Edit konten di admin panel (termasuk upload gambar)
2. Buka **Pengaturan Website** → klik **"Download siteData.json"**
3. Pindahkan file `siteData.json` ke folder `public/data/`
4. Lakukan `git push` dan redeploy

File `siteData.json` berisi semua konten dan gambar (base64) yang akan
otomatis dimuat oleh website untuk semua pengunjung.
