import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";

// Konfigurasi Firebase dibaca murni dari variabel lingkungan (.env) demi keamanan
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

// Inisialisasi Firebase App & Firestore Database
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Nama koleksi dan dokumen penyimpanan di Firestore
const DOC_REF = doc(db, "cms", "sanyonara_data");

/**
 * Berlangganan perubahan data secara real-time dari Firestore Cloud.
 * Callback akan dipanggil otomatis setiap kali ada perubahan data dari Admin di perangkat mana pun.
 */
export function subscribeToCmsData(onDataUpdate: (data: any) => void) {
  if (!firebaseConfig.apiKey) {
    console.warn("Firebase API key tidak ditemukan. Menggunakan penyimpanan lokal.");
    return () => {};
  }

  return onSnapshot(
    DOC_REF,
    (snapshot) => {
      if (snapshot.exists()) {
        onDataUpdate(snapshot.data());
      }
    },
    (error) => {
      console.warn("Firestore listener error (falling back to local/seed):", error);
    }
  );
}

/**
 * Menyimpan data CMS ke Firestore Cloud.
 * Mengupdate data secara global sehingga semua pengunjung di perangkat lain langsung menerima data terbaru.
 */
export async function saveCmsDataToCloud(data: any) {
  if (!firebaseConfig.apiKey) {
    return;
  }

  try {
    await setDoc(DOC_REF, data);
  } catch (error) {
    console.error("Gagal menyimpan ke Firestore:", error);
    throw error;
  }
}
