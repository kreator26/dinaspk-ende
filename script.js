console.log("🟢 STEP 1: File script.js mulai dimuat...");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

console.log("🟢 STEP 2: Import Firebase berhasil...");

const firebaseConfig = {
  apiKey: "AIzaSyAVoYEeOwl4Ndzq4J4FsIKmoc8zyzRtodQ",
  authDomain: "parkir-premium.firebaseapp.com",
  databaseURL: "https://parkir-premium-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "parkir-premium",
  storageBucket: "parkir-premium.firebasestorage.app",
  messagingSenderId: "768016342610",
  appId: "1:768016342610:web:d4b4ec374f54fe64d9c98b",
  measurementId: "G-5QBVK8W2M0"
};

let db;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log("🟢 STEP 3: ✅ Firebase berhasil diinisialisasi");
} catch (error) {
  console.error("🔴 STEP 3 FAILED: Gagal inisialisasi Firebase:", error);
}

console.log("🟢 STEP 4: Memulai parsing data sekolah...");
const RAW_DATA = `KB ARARA	70027792	KB	Ende
KB Arrahman Watubara	70005156	KB	Wewaria
KB FAJAR PAGI	70014378	KB	Kota Baru
KB KELIWUMBU	70011247	KB	Maurole
KB MARLOM	70006252	KB	Kelimutu
KB MATABALE	70002784	KB	Ende Tengah
KB MENTARI	70047941	KB	Nangapanda
KB MUTIARA KASIH	70026740	KB	Wewaria
KB NUALISE	69991307	KB	Wolowaru
KB PERTIWI	70026767	KB	Nangapanda
KB PERWIRA	69987093	KB	Ende Utara
KB SANTO HENDRIKUS	70002740	KB	Lepembusu Kelisoke
KB SANTO PHILIPUS	70042684	KB	Kota Baru
KB SINAR EMBUZOZO	70027166	KB	Nangapanda
KB SINAR OTOLEKE	70014379	KB	Lepembusu Kelisoke
KB ST. PIUS	70028687	KB	Lio Timur
KB STA. ELISABETH	70043776	KB	Wewaria
KB TERPADU KASIH BUNDA	70033674	KB	Ende
KB TERPADU RENATA	70025717	KB	Nangapanda
KB TERPADU ST. PAULUS KOTAKADHE	70048520	KB	Maukaro
KB WAKA	70036061	TK	Wewaria
KB Watu Gamba	70007552	TK	Ende
KB WONGA WEA NGGELA	70038565	KB	Wolojita
KB WONGAWUJA	69988337	KB	Ende
SD NEGERI ENDE 1	50305568	SD	Ende Utara
SD KATOLIK WOLOWARU 1	50302548	SD	Wolowaru
SMP NEGERI 1 ENDE	50305410	SMP	Ende Tengah
SMP NEGERI 1 NDONA	50302600	SMP	Ndona
TK NEGERI PEMBINA KOTA BARU	50306095	TK	Kota Baru`;

const schools = RAW_DATA.split('\n').filter(l => l.trim()).map((line, idx) => {
  const parts = line.split('\t');
  return {
    id: idx + 1,
    nama: (parts[0] || '').trim(),
    npsn: (parts[1] || '').trim(),
    bentuk: (parts[2] || '').trim(),
    kecamatan: (parts[3] || '').trim()
  };
});
console.log("🟢 STEP 5: ✅ Data sekolah berhasil diparsing. Total:", schools.length, "sekolah");

const PREDEFINED_TITLES = {
  foto: ["Upacara Bendera", "Kegiatan Belajar Mengajar", "Perpustakaan Sekolah", "Lainnya (Ketik Manual)"],
  video: ["Video Profil Sekolah", "Video Kegiatan Upacara", "Lainnya (Ketik Manual)"],
  dokumen: ["Kurikulum Sekolah", "Data Siswa", "Lainnya (Ketik Manual)"]
};

const AUTH_KEY = 'sisfo_auth';
let currentUser = null;

// Helper
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// Firebase Functions
window.getPasswords = async function() {
  const docRef = doc(db, "sisfo_data", "passwords");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : {};
};

window.savePasswords = async function(p) {
  await setDoc(doc(db, "sisfo_data", "passwords"), p);
};

window.getSchoolPassword = async function(npsn) {
  const p = await window.getPasswords();
  return p[npsn] || 'sekolah123';
};

window.setSchoolPassword = async function(npsn, pass) {
  const p = await window.getPasswords();
  p[npsn] = pass;
  await window.savePasswords(p);
};

window.getMedia = async function() {
  const docSnap = await getDoc(doc(db, "sisfo_data", "media_global"));
  return docSnap.exists() ? docSnap.data() : {};
};

window.saveMedia = async function(mediaData) {
  await setDoc(doc(db, "sisfo_data", "media_global"), mediaData);
};

// ============ SHOW APP (DENGAN SAFETY CHECK) ============
window.showApp = async function() {
  console.log("🟢 STEP 6: Memanggil showApp()...");
  
  const loginPage = document.getElementById('loginPage');
  const mainApp = document.getElementById('mainApp');
  
  // 🛡️ SAFETY CHECK: Jika elemen HTML hilang, beri tahu user!
  if (!loginPage || !mainApp) {
    alert("ERROR FATAL: Elemen HTML 'loginPage' atau 'mainApp' TIDAK DITEMUKAN di index.html!\n\nMohon periksa file index.html Anda.");
    console.error("Elemen tidak ditemukan. Cek index.html Anda.");
    return;
  }

  loginPage.style.display = 'none';
  mainApp.classList.add('active');
  console.log("🟢 STEP 7: Tampilan dialihkan ke Main App.");
  
  try {
    if (currentUser.type === 'admin') {
      document.getElementById('userRole').textContent = 'ADMIN DINAS';
      document.getElementById('userName').textContent = 'Administrator';
      window.showSection('dashboard');
      await window.renderDashboard();
      await window.renderSchoolTable();
    } else {
      if (!currentUser.school) {
        alert("Data sekolah tidak ditemukan. Silakan login ulang.");
        window.handleLogout();
        return;
      }
      document.getElementById('userRole').textContent = 'SEKOLAH';
      document.getElementById('userName').textContent = currentUser.school.nama;
      window.showSection('sekolahMedia');
      await window.renderDashboard();
      await window.renderMyMedia();
    }
    console.log("🟢 STEP 8: ✅ showApp() selesai tanpa error.");
  } catch (err) {
    console.error("🔴 ERROR di dalam showApp:", err);
    alert("Terjadi error saat memuat dashboard: " + err.message);
  }
};

// ============ LOGIN / LOGOUT ============
window.handleLogin = async function(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const errEl = document.getElementById('loginError');
  
  try {
    if (user.toLowerCase() === 'admin') {
      const p = await window.getPasswords();
      if (pass === (p['_admin'] || 'admin2026')) {
        currentUser = { type: 'admin' };
        localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
        await window.showApp();
        return;
      }
    } else {
      const school = schools.find(s => s.npsn === user);
      if (school) {
        const correctPass = await window.getSchoolPassword(school.npsn);
        if (pass === correctPass) {
          currentUser = { type: 'sekolah', schoolId: school.id, school };
          localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
          await window.showApp();
          return;
        }
      }
    }
    errEl.classList.add('show');
    setTimeout(() => errEl.classList.remove('show'), 3000);
  } catch (error) {
    console.error("💥 ERROR SAAT LOGIN:", error);
    alert("Terjadi kesalahan sistem: " + error.message);
  }
};

window.handleLogout = function() {
  currentUser = null;
  localStorage.removeItem(AUTH_KEY);
  document.getElementById('mainApp').classList.remove('active');
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
};

window.showSection = function(name) {
  document.querySelectorAll('[id^="section-"]').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('section-' + name);
  if (target) target.classList.add('active');
};

// ============ DASHBOARD SEDERHANA ============
window.renderDashboard = async function() {
  const grid = document.getElementById('dashboardGrid');
  if (!grid) return;
  const media = await window.getMedia();
  
  if (currentUser.type === 'admin') {
    grid.innerHTML = `
      <div class="dash-card"><div class="dash-label">🏫 Total Sekolah</div><div class="dash-value">${schools.length}</div></div>
      <div class="dash-card success"><div class="dash-label">📊 Status</div><div class="dash-value">Aktif</div></div>
    `;
  } else {
    const m = media[currentUser.schoolId] || { foto: [], video: [], dokumen: [] };
    grid.innerHTML = `
      <div class="dash-card"><div class="dash-label">📸 Foto</div><div class="dash-value">${m.foto.length}</div></div>
      <div class="dash-card"><div class="dash-label">🎬 Video</div><div class="dash-value">${m.video.length}</div></div>
    `;
  }
};

window.renderSchoolTable = async function() {
  const tbody = document.getElementById('schoolTableBody');
  if (!tbody) return;
  tbody.innerHTML = schools.slice(0, 5).map(s => `
    <tr><td>${escapeHtml(s.nama)}</td><td>${s.npsn}</td><td>${s.bentuk}</td></tr>
  `).join('');
};

window.renderMyMedia = async function() {
  const gridFoto = document.getElementById('gridFoto');
  if (gridFoto) gridFoto.innerHTML = '<div class="empty">Belum ada foto</div>';
};

// ============ AUTO LOGIN ============
console.log("🟢 STEP 9: Mengecek Auto Login...");
const savedAuth = localStorage.getItem(AUTH_KEY);
if (savedAuth) {
  try {
    currentUser = JSON.parse(savedAuth);
    if (currentUser.type === 'sekolah') {
      currentUser.school = schools.find(s => s.id === currentUser.schoolId);
    }
    if (currentUser && (currentUser.type === 'admin' || currentUser.school)) {
      console.log("🟢 STEP 10: Auto login terdeteksi, memanggil showApp()...");
      window.showApp();
    } else {
      console.log("🟢 STEP 10: Data auto login tidak valid, dihapus.");
      localStorage.removeItem(AUTH_KEY);
    }
  } catch(e) {
    console.error("🔴 Error parsing auto login:", e);
    localStorage.removeItem(AUTH_KEY);
  }
} else {
  console.log("🟢 STEP 10: Tidak ada auto login. Menampilkan halaman login.");
}
