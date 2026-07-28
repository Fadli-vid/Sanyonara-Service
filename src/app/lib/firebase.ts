import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";

// Konfigurasi Firebase dari akun Anda
const firebaseConfig = {
  apiKey: "AIzaSyD24pKrwc4sneQJHcNv9hxOOC3K8UA7Uk0",
  authDomain: "sanyonara-service.firebaseapp.com",
  projectId: "sanyonara-service",
  storageBucket: "sanyonara-service.firebasestorage.app",
  messagingSenderId: "441156305659",
  appId: "1:441156305659:web:a674ccdfaa176d4156665e",
  measurementId: "G-JYX02GVE6P"
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
  try {
    await setDoc(DOC_REF, data);
  } catch (error) {
    console.error("Gagal menyimpan ke Firestore:", error);
    throw error;
  }
}
