/**
 * Utilitas pemrosesan gambar untuk fitur upload di admin panel.
 * Gambar di-resize dan dikompresi menjadi Base64 Data URL
 * agar bisa disimpan di localStorage tanpa membutuhkan backend.
 */

/**
 * Resize dan kompresi file gambar menjadi Base64 Data URL (JPEG).
 * @param file - File gambar dari input[type=file]
 * @param maxWidth - Lebar maksimal (default: 800px)
 * @param quality - Kualitas JPEG 0-1 (default: 0.8)
 * @returns Promise<string> berupa data URL
 */
export function resizeAndCompress(
  file: File,
  maxWidth = 800,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      reject(new Error("File bukan gambar."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Gagal memuat gambar."));
      img.onload = () => {
        // Hitung dimensi baru
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        // Gambar kecil → langsung pakai original (PNG kecil tetap tajam)
        if (img.width <= maxWidth && file.size < 100_000) {
          resolve(reader.result as string);
          return;
        }

        // Resize via canvas
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas tidak didukung."));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        // Untuk gambar dengan transparansi (PNG), gunakan PNG; lainnya JPEG
        const isPng = file.type === "image/png";
        const mimeType = isPng ? "image/png" : "image/jpeg";
        const outputQuality = isPng ? undefined : quality;

        resolve(canvas.toDataURL(mimeType, outputQuality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/** Cek penggunaan localStorage (dalam bytes). */
export function getStorageUsage(): {
  used: number;
  total: number;
  percent: number;
  usedMB: string;
} {
  let used = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        used += localStorage.getItem(key)?.length ?? 0;
      }
    }
  } catch {
    // Abaikan error
  }
  // Estimasi total localStorage (~5MB di kebanyakan browser)
  const total = 5 * 1024 * 1024;
  return {
    used,
    total,
    percent: Math.round((used / total) * 100),
    usedMB: (used / (1024 * 1024)).toFixed(1),
  };
}

/** Cek apakah string adalah Data URL. */
export function isDataUrl(str: string): boolean {
  return str.startsWith("data:");
}

/** Ukuran file max yang diperbolehkan (2MB sebelum kompresi). */
export const MAX_FILE_SIZE = 2 * 1024 * 1024;

/** Validasi ukuran file. */
export function validateFileSize(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return `Ukuran file (${sizeMB}MB) melebihi batas 2MB. Pilih gambar yang lebih kecil.`;
  }
  return null;
}
