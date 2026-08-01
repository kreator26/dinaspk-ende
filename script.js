// ============ FIREBASE SETUP ============
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
  console.log("✅ Firebase berhasil diinisialisasi");
} catch (error) {
  console.error("❌ Gagal inisialisasi Firebase:", error);
}

// ============ DATA SEKOLAH ============
// ⚠️ GANTI DENGAN DATA LENGKAP ANDA
const RAW_DATA = `KB ARARA	70027792	KB	Ende
KB Arrahman Watubara	70005156	KB	Wewaria
KB FAJAR PAGI	70014378	KB	Kota Baru
SMP NEGERI 1 ENDE	50305410	SMP	Ende Tengah`;

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

// ============ KONSTANTA ============
const PREDEFINED_TITLES = {
  foto: ["Upacara Bendera", "Kegiatan Belajar Mengajar", "Perpustakaan Sekolah", "Laboratorium Komputer", "Kantin Sekolah", "Lapangan Olahraga", "Musholla / Ruang Ibadah", "Ruang Guru", "Ruang Kepala Sekolah", "Ruang UKS", "Ekstrakurikuler", "Kunjungan Edukatif", "Peringatan Hari Besar", "Lomba Antar Kelas", "Wisuda / Pelepasan Siswa", "Rapat Dewan Guru", "Kegiatan Pramuka", "Gotong Royong Sekolah", "Fasilitas Sekolah", "Prestasi Siswa", "Lainnya (Ketik Manual)"],
  video: ["Video Profil Sekolah", "Video Kegiatan Upacara", "Video Pembelajaran di Kelas", "Video Kegiatan Ekstrakurikuler", "Video Peringatan Hari Besar", "Video Lomba / Kompetisi", "Video Kunjungan Edukatif", "Video Tutorial / Edukasi", "Video Dokumentasi Kegiatan", "Video Wawancara / Testimoni", "Video Pengumuman Sekolah", "Lainnya (Ketik Manual)"],
  dokumen: ["Kurikulum Sekolah", "Data Siswa", "Data Guru dan Tenaga Kependidikan", "Laporan Keuangan", "Rencana Kerja Sekolah (RKS)", "Program Kerja Tahunan", "Laporan Evaluasi", "Surat Keputusan (SK)", "Notulen Rapat", "Dokumen Akreditasi", "Dokumen BOS", "Panduan / Pedoman", "Formulir Pendaftaran", "Kalender Pendidikan", "Struktur Organisasi", "Lainnya (Ketik Manual)"]
};

const AUTH_KEY = 'sisfo_auth';
let currentUser = null;

// ============ HELPER FUNCTIONS ============
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function extractYoutubeId(url) {
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

// ============ FIREBASE DB FUNCTIONS ============
window.getPasswords = async function() {
  const docRef = doc(db, "sisfo_data", "passwords");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : {};
};

window.savePasswords = async function(p) {
  const docRef = doc(db, "sisfo_data", "passwords");
  await setDoc(docRef, p);
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
  const docRef = doc(db, "sisfo_data", "media_global");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : {};
};

window.saveMedia = async function(mediaData) {
  const docRef = doc(db, "sisfo_data", "media_global");
  await setDoc(docRef, mediaData);
};

// ============ STATUS PENGIRIMAN (DIDEFINISIKAN SEBELUM showApp) ============
let statusTab = 'belum';
let statusPage = 1;
const statusPerPage = 25;

window.populateStatusFilters = function() {
  const bentukSelect = document.getElementById('filterBentukStatus');
  if (bentukSelect && bentukSelect.options.length <= 1) {
    const bentukSet = new Set(schools.map(s => s.bentuk));
    [...bentukSet].sort().forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      bentukSelect.appendChild(opt);
    });
  }
};

window.switchStatusTab = function(tab, btn) {
  statusTab = tab;
  statusPage = 1;
  document.querySelectorAll('#adminStatusSection .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  window.renderStatusTable();
};

// ✅ INI YANG DIPINDAHKAN KE ATAS showApp
window.renderStatusSection = async function() {
  const media = await window.getMedia();
  
  let sudahCount = 0;
  let belumCount = 0;
  
  schools.forEach(s => {
    const m = media[s.id];
    const totalMedia = m ? ((m.foto?.length || 0) + (m.video?.length || 0) + (m.dokumen?.length || 0)) : 0;
    if (totalMedia > 0) {
      sudahCount++;
    } else {
      belumCount++;
    }
  });
  
  const persen = schools.length > 0 ? ((sudahCount / schools.length) * 100).toFixed(1) : 0;
  
  document.getElementById('countSudah').textContent = sudahCount;
  document.getElementById('countBelum').textContent = belumCount;
  document.getElementById('countPersen').textContent = persen + '%';
  document.getElementById('tabSudah').textContent = sudahCount;
  document.getElementById('tabBelum').textContent = belumCount;
  
  window.renderStatusTable();
};

window.renderStatusTable = async function() {
  const q = document.getElementById('searchStatus').value.toLowerCase();
  const bentuk = document.getElementById('filterBentukStatus').value;
  const media = await window.getMedia();
  
  let filtered = schools.filter(s => {
    const m = media[s.id];
    const totalMedia = m ? ((m.foto?.length || 0) + (m.video?.length || 0) + (m.dokumen?.length || 0)) : 0;
    const isSudah = totalMedia > 0;
    
    const matchStatus = statusTab === 'sudah' ? isSudah : !isSudah;
    const matchQ = !q || s.nama.toLowerCase().includes(q) || s.npsn.includes(q) || s.kecamatan.toLowerCase().includes(q);
    const matchB = !bentuk || s.bentuk === bentuk;
    
    return matchStatus && matchQ && matchB;
  });
  
  const tbody = document.getElementById('statusTableBody');
  const totalPages = Math.ceil(filtered.length / statusPerPage) || 1;
  if (statusPage > totalPages) statusPage = totalPages;
  const start = (statusPage - 1) * statusPerPage;
  const pageData = filtered.slice(start, start + statusPerPage);
  
  if (!pageData.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty">${statusTab === 'sudah' ? 'Belum ada sekolah yang mengirim media' : '🎉 Semua sekolah sudah mengirim!'}</td></tr>`;
  } else {
    tbody.innerHTML = pageData.map((s, idx) => {
      const m = media[s.id];
      const fotoCount = m?.foto?.length || 0;
      const videoCount = m?.video?.length || 0;
      const dokumenCount = m?.dokumen?.length || 0;
      
      let statusBadge = '';
      if (statusTab === 'sudah') {
        statusBadge = `<span class="badge badge-SD" style="background:#d1fae5; color:#065f46;">✅ Aktif</span>
          <div style="font-size:0.75rem; color:var(--muted); margin-top:0.25rem;">
             ${fotoCount} | 🎬 ${videoCount} | 📄 ${dokumenCount}
          </div>`;
      } else {
        statusBadge = `<span class="badge" style="background:#fef3c7; color:#92400e;">⏳ Belum</span>`;
      }
      
      return `
        <tr>
          <td>${start + idx + 1}</td>
          <td><strong>${escapeHtml(s.nama)}</strong></td>
          <td><code>${s.npsn}</code></td>
          <td><span class="badge badge-${s.bentuk}">${s.bentuk}</span></td>
          <td>${escapeHtml(s.kecamatan)}</td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="window.viewSchoolMedia(${s.id})">👁️ Lihat</button>
          </td>
        </tr>
      `;
    }).join('');
  }
  
  const pag = document.getElementById('statusPagination');
  if (totalPages <= 1) {
    pag.innerHTML = '';
  } else {
    let html = `<button class="page-btn" onclick="window.goStatusPage(${statusPage-1})" ${statusPage===1?'disabled':''}>‹</button>`;
    for (let i = Math.max(1, statusPage-2); i <= Math.min(totalPages, statusPage+2); i++) {
      html += `<button class="page-btn ${i===statusPage?'active':''}" onclick="window.goStatusPage(${i})">${i}</button>`;
    }
    html += `<button class="page-btn" onclick="window.goStatusPage(${statusPage+1})" ${statusPage===totalPages?'disabled':''}>›</button>`;
    pag.innerHTML = html;
  }
};

window.goStatusPage = async function(p) {
  const media = await window.getMedia();
  const q = document.getElementById('searchStatus').value.toLowerCase();
  const bentuk = document.getElementById('filterBentukStatus').value;
  
  const filtered = schools.filter(s => {
    const m = media[s.id];
    const totalMedia = m ? ((m.foto?.length || 0) + (m.video?.length || 0) + (m.dokumen?.length || 0)) : 0;
    const isSudah = totalMedia > 0;
    
    const matchStatus = statusTab === 'sudah' ? isSudah : !isSudah;
    const matchQ = !q || s.nama.toLowerCase().includes(q) || s.npsn.includes(q) || s.kecamatan.toLowerCase().includes(q);
    const matchB = !bentuk || s.bentuk === bentuk;
    
    return matchStatus && matchQ && matchB;
  });

  const totalPages = Math.ceil(filtered.length / statusPerPage) || 1;
  if (p < 1 || p > totalPages) return;
  
  statusPage = p;
  window.renderStatusTable();
};

// ============ TOP SCHOOLS (DIDEFINISIKAN SEBELUM showApp) ============
window.renderTopSchools = async function() {
  const container = document.getElementById('topSchoolsList');
  const section = document.getElementById('topSchoolsSection');
  
  if (!container || !section) return;
  
  const media = await window.getMedia();
  
  const schoolStats = schools.map(s => {
    const m = media[s.id] || { foto: [], video: [], dokumen: [] };
    const fotoCount = m.foto?.length || 0;
    const videoCount = m.video?.length || 0;
    const dokumenCount = m.dokumen?.length || 0;
    const total = fotoCount + videoCount + dokumenCount;
    
    return { ...s, fotoCount, videoCount, dokumenCount, total };
  });
  
  const activeSchools = schoolStats
    .filter(s => s.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
  
  if (activeSchools.length === 0) {
    section.style.display = 'none';
    return;
  }
  
  section.style.display = 'block';
  
  const medals = ['🥇', '', '🥉', '4️', '5️⃣'];
  const rankColors = [
    'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
    'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
    'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)'
  ];
  
  container.innerHTML = activeSchools.map((s, idx) => `
    <div class="dash-card" style="
      background:${rankColors[idx]}; 
      border:2px solid ${idx === 0 ? '#f59e0b' : idx === 1 ? '#94a3b8' : idx === 2 ? '#ea580c' : 'transparent'};
      cursor:pointer;
      transition:transform 0.2s;
      position:relative;
      overflow:hidden;
    " 
    onmouseover="this.style.transform='translateY(-4px)'" 
    onmouseout="this.style.transform='translateY(0)'"
    onclick="window.viewSchoolMedia(${s.id})">
      <div style="position:absolute; top:0.5rem; right:0.75rem; font-size:2rem; opacity:0.3;">${medals[idx]}</div>
      <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
        <div style="font-size:1.75rem;">${medals[idx]}</div>
        <div style="flex:1; min-width:0;">
          <div style="font-weight:700; font-size:0.95rem; line-height:1.3; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${escapeHtml(s.nama)}">${escapeHtml(s.nama)}</div>
          <div style="font-size:0.75rem; color:#64748b; margin-top:0.15rem;">${escapeHtml(s.kecamatan)} • ${s.bentuk}</div>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.5rem; margin-bottom:0.5rem;">
        <div style="text-align:center; padding:0.4rem; background:rgba(255,255,255,0.6); border-radius:8px;">
          <div style="font-size:1.1rem;">📸</div>
          <div style="font-weight:700; font-size:1rem;">${s.fotoCount}</div>
          <div style="font-size:0.65rem; color:#64748b;">Foto</div>
        </div>
        <div style="text-align:center; padding:0.4rem; background:rgba(255,255,255,0.6); border-radius:8px;">
          <div style="font-size:1.1rem;"></div>
          <div style="font-weight:700; font-size:1rem;">${s.videoCount}</div>
          <div style="font-size:0.65rem; color:#64748b;">Video</div>
        </div>
        <div style="text-align:center; padding:0.4rem; background:rgba(255,255,255,0.6); border-radius:8px;">
          <div style="font-size:1.1rem;">📄</div>
          <div style="font-weight:700; font-size:1rem;">${s.dokumenCount}</div>
          <div style="font-size:0.65rem; color:#64748b;">Dokumen</div>
        </div>
      </div>
      <div style="text-align:center; padding:0.5rem; background:rgba(0,0,0,0.05); border-radius:8px; font-weight:700; font-size:1.1rem;"> Total: ${s.total} media</div>
    </div>
  `).join('');
};

// ============ DASHBOARD ============
window.renderDashboard = async function() {
  const grid = document.getElementById('dashboardGrid');
  const media = await window.getMedia();
  
  if (currentUser.type === 'admin') {
    const totalSchools = schools.length;
    const schoolsWithMedia = Object.keys(media).filter(id => {
      const m = media[id];
      return (m.foto?.length || 0) + (m.video?.length || 0) + (m.dokumen?.length || 0) > 0;
    }).length;
    const totalMedia = Object.values(media).reduce((sum, m) => 
      sum + (m.foto?.length || 0) + (m.video?.length || 0) + (m.dokumen?.length || 0), 0);
    const totalFoto = Object.values(media).reduce((sum, m) => sum + (m.foto?.length || 0), 0);
    
    grid.innerHTML = `
      <div class="dash-card"><div class="dash-label"> Total Sekolah</div><div class="dash-value">${totalSchools}</div><div class="dash-sub">Seluruh satuan pendidikan</div></div>
      <div class="dash-card accent"><div class="dash-label">📁 Sekolah dengan Media</div><div class="dash-value">${schoolsWithMedia}</div><div class="dash-sub">${((schoolsWithMedia/totalSchools)*100).toFixed(1)}% dari total</div></div>
      <div class="dash-card success"><div class="dash-label">📊 Total Media</div><div class="dash-value">${totalMedia}</div><div class="dash-sub">Foto, video, dan dokumen</div></div>
      <div class="dash-card warning"><div class="dash-label">📸 Total Foto</div><div class="dash-value">${totalFoto}</div><div class="dash-sub">Dari seluruh sekolah</div></div>
    `;
    
    await window.renderTopSchools();
  } else {
    const m = media[currentUser.schoolId] || { foto: [], video: [], dokumen: [] };
    const total = (m.foto?.length || 0) + (m.video?.length || 0) + (m.dokumen?.length || 0);
    grid.innerHTML = `
      <div class="dash-card"><div class="dash-label">📸 Foto</div><div class="dash-value">${m.foto?.length || 0}</div></div>
      <div class="dash-card accent"><div class="dash-label">🎬 Video</div><div class="dash-value">${m.video?.length || 0}</div></div>
      <div class="dash-card success"><div class="dash-label">📄 Dokumen</div><div class="dash-value">${m.dokumen?.length || 0}</div></div>
      <div class="dash-card warning"><div class="dash-label">📊 Total Media</div><div class="dash-value">${total}</div></div>
    `;
  }
};

// ============ SHOW APP (SEKARANG SEMUA FUNGSI SUDAH TERDEFINISI) ============
window.showApp = async function() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('mainApp').classList.add('active');
  
  if (currentUser.type === 'admin') {
    document.getElementById('userRole').textContent = 'ADMIN DINAS';
    document.getElementById('userName').textContent = 'Administrator';
    window.showSection('dashboard');
    await window.renderStatusSection();
    window.populateStatusFilters();
    await window.renderTopSchools();
  } else {
    document.getElementById('userRole').textContent = 'SEKOLAH';
    document.getElementById('userName').textContent = currentUser.school.nama;
    window.showSection('sekolahMedia');
  }
  
  await window.renderDashboard();
  if (currentUser.type === 'admin') {
    await window.renderSchoolTable();
  } else {
    await window.renderMyMedia();
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
      const adminPass = p['_admin'] || 'admin2026';
      if (pass === adminPass) {
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
    alert("Terjadi kesalahan sistem.");
  }
};

window.handleLogout = function() {
  if (!confirm('Yakin ingin logout?')) return;
  currentUser = null;
  localStorage.removeItem(AUTH_KEY);
  document.getElementById('mainApp').classList.remove('active');
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
};

// ============ PROFILE & SECTION NAVIGATION ============
window.showSection = function(name) {
  document.querySelectorAll('[id^="section-"]').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('section-' + name);
  if (target) target.classList.add('active');
  
  if (name === 'profile' && currentUser) {
    if (currentUser.type === 'sekolah') {
      document.getElementById('profileSchoolName').textContent = currentUser.school.nama;
      document.getElementById('profileNpsn').textContent = currentUser.school.npsn;
      document.getElementById('profileBentuk').textContent = currentUser.school.bentuk;
      document.getElementById('profileKec').textContent = currentUser.school.kecamatan;
      document.getElementById('profileRole').textContent = 'Sekolah';
    } else if (currentUser.type === 'admin') {
      document.getElementById('profileSchoolName').textContent = 'Administrator Dinas Pendidikan';
      document.getElementById('profileNpsn').textContent = '-';
      document.getElementById('profileBentuk').textContent = '-';
      document.getElementById('profileKec').textContent = 'Kabupaten Ende';
      document.getElementById('profileRole').textContent = 'Admin Dinas';
    }
  }
};

window.changePassword = async function() {
  const oldPass = document.getElementById('oldPass').value;
  const newPass = document.getElementById('newPass').value;
  const confirmPass = document.getElementById('confirmPass').value;
  const msgEl = document.getElementById('passMsg');
  
  try {
    if (currentUser.type === 'admin') {
      const p = await window.getPasswords();
      const currentAdminPass = p['_admin'] || 'admin2026';
      if (oldPass !== currentAdminPass) {
        msgEl.innerHTML = '<div class="alert alert-warning">Password lama salah!</div>';
        return;
      }
      p['_admin'] = newPass;
      await window.savePasswords(p);
      msgEl.innerHTML = '<div class="alert" style="background:#d1fae5; color:#065f46;">✓ Password admin berhasil diubah!</div>';
    } else {
      const currentSchoolPass = await window.getSchoolPassword(currentUser.school.npsn);
      if (oldPass !== currentSchoolPass) {
        msgEl.innerHTML = '<div class="alert alert-warning">Password lama salah!</div>';
        return;
      }
      if (newPass.length < 6) {
        msgEl.innerHTML = '<div class="alert alert-warning">Password minimal 6 karakter!</div>';
        return;
      }
      if (newPass !== confirmPass) {
        msgEl.innerHTML = '<div class="alert alert-warning">Konfirmasi password tidak cocok!</div>';
        return;
      }
      await window.setSchoolPassword(currentUser.school.npsn, newPass);
      msgEl.innerHTML = '<div class="alert" style="background:#d1fae5; color:#065f46;">✓ Password berhasil diubah!</div>';
    }
    
    document.getElementById('oldPass').value = '';
    document.getElementById('newPass').value = '';
    document.getElementById('confirmPass').value = '';
  } catch (error) {
    console.error("Error ganti password:", error);
    alert("Gagal mengubah password.");
  }
};

// ============ ADMIN: SCHOOL TABLE ============
let filteredSchools = [...schools];
let currentPage = 1;
const perPage = 25;

window.renderSchoolTable = async function() {
  const q = document.getElementById('searchSchool').value.toLowerCase();
  const bentuk = document.getElementById('filterBentuk').value;
  const kec = document.getElementById('filterKec').value;
  
  filteredSchools = schools.filter(s => {
    const matchQ = !q || s.nama.toLowerCase().includes(q) || s.npsn.includes(q) || s.kecamatan.toLowerCase().includes(q);
    const matchB = !bentuk || s.bentuk === bentuk;
    const matchK = !kec || s.kecamatan === kec;
    return matchQ && matchB && matchK;
  });
  
  const tbody = document.getElementById('schoolTableBody');
  const totalPages = Math.ceil(filteredSchools.length / perPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * perPage;
  const pageData = filteredSchools.slice(start, start + perPage);
  const media = await window.getMedia();
  
  if (!pageData.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty">Tidak ada data</td></tr>';
  } else {
    tbody.innerHTML = pageData.map(s => {
      const m = media[s.id] || { foto: [], video: [], dokumen: [] };
      const count = (m.foto?.length || 0) + (m.video?.length || 0) + (m.dokumen?.length || 0);
      return `
        <tr onclick="window.viewSchoolMedia(${s.id})">
          <td><strong>${escapeHtml(s.nama)}</strong></td>
          <td><code>${s.npsn}</code></td>
          <td><span class="badge badge-${s.bentuk}">${s.bentuk}</span></td>
          <td>${escapeHtml(s.kecamatan)}</td>
          <td>${count > 0 ? `<span class="badge badge-SD">${count} media</span>` : '<span style="color:var(--muted); font-size:0.8rem;">Belum ada</span>'}</td>
        </tr>
      `;
    }).join('');
  }
  
  const pag = document.getElementById('pagination');
  if (totalPages <= 1) {
    pag.innerHTML = '';
  } else {
    let html = `<button class="page-btn" onclick="window.goPage(${currentPage-1})" ${currentPage===1?'disabled':''}>‹</button>`;
    for (let i = Math.max(1, currentPage-2); i <= Math.min(totalPages, currentPage+2); i++) {
      html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="window.goPage(${i})">${i}</button>`;
    }
    html += `<button class="page-btn" onclick="window.goPage(${currentPage+1})" ${currentPage===totalPages?'disabled':''}>›</button>`;
    pag.innerHTML = html;
  }
};

window.goPage = function(p) {
  const totalPages = Math.ceil(filteredSchools.length / perPage);
  if (p < 1 || p > totalPages) return;
  currentPage = p;
  window.renderSchoolTable();
};

window.viewSchoolMedia = async function(schoolId) {
  const school = schools.find(s => s.id === schoolId);
  if (!school) return;

  const origUser = currentUser;
  currentUser = { type: 'sekolah', schoolId, school };
  
  await window.renderMyMedia();
  window.showSection('sekolahMedia');

  const mediaSection = document.getElementById('section-sekolahMedia');
  if (!document.getElementById('backBtn')) {
    const btn = document.createElement('button');
    btn.id = 'backBtn';
    btn.className = 'btn btn-outline btn-sm';
    btn.style.marginBottom = '1rem';
    btn.textContent = '← Kembali ke Dashboard';
    btn.onclick = async () => {
      currentUser = origUser;
      btn.remove();
      window.showSection('dashboard');
      await window.renderDashboard();
      await window.renderSchoolTable();
      await window.renderStatusSection();
      await window.renderTopSchools();
    };
    mediaSection.insertBefore(btn, mediaSection.firstChild);
  }
};

// ============ SEKOLAH: MY MEDIA ============
let currentMediaTab = 'foto';
let currentFormType = null;

window.renderMyMedia = async function() {
  if (!currentUser || currentUser.type !== 'sekolah') return;
  const allMedia = await window.getMedia();
  const m = allMedia[currentUser.schoolId] || { foto: [], video: [], dokumen: [] };
  
  document.getElementById('countFoto').textContent = m.foto?.length || 0;
  document.getElementById('countVideo').textContent = m.video?.length || 0;
  document.getElementById('countDokumen').textContent = m.dokumen?.length || 0;
  
  window.renderFoto(m.foto || []);
  window.renderVideo(m.video || []);
  window.renderDokumen(m.dokumen || []);
};

window.switchMediaTab = function(tab, btn) {
  currentMediaTab = tab;
  document.querySelectorAll('#section-sekolahMedia .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#section-sekolahMedia .section').forEach(s => s.classList.remove('active'));
  document.getElementById('media-' + tab).classList.add('active');
};

window.renderFoto = function(items) {
  const grid = document.getElementById('gridFoto');
  if (!items.length) {
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1;"><div class="empty-icon">📷</div>Belum ada foto</div>';
    return;
  }
  grid.innerHTML = items.map(i => `
    <div class="media-card">
      <div class="media-thumb" onclick="window.previewMedia('foto',${i.id})">
        <img src="${i.url}" alt="${escapeHtml(i.title)}" onerror="this.src='https://via.placeholder.com/400x250?text=Foto'">
      </div>
      <div class="media-body">
        <div class="media-title">${escapeHtml(i.title)}</div>
        <div class="media-desc">${escapeHtml(i.desc || '')}</div>
      </div>
      <div class="media-actions">
        <button class="btn btn-sm btn-outline" onclick="window.previewMedia('foto',${i.id})">Lihat</button>
        <button class="btn btn-sm btn-danger" onclick="window.hapusMedia('foto',${i.id})">Hapus</button>
      </div>
    </div>
  `).join('');
};

window.renderVideo = function(items) {
  const grid = document.getElementById('gridVideo');
  if (!items.length) {
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1;"><div class="empty-icon">🎬</div>Belum ada video</div>';
    return;
  }
  grid.innerHTML = items.map(i => {
    const ytId = extractYoutubeId(i.url);
    const embedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : i.url;
    return `
      <div class="media-card">
        <div class="media-thumb">
          <div class="video-wrap"><iframe src="${embedUrl}" allowfullscreen></iframe></div>
        </div>
        <div class="media-body">
          <div class="media-title">${escapeHtml(i.title)}</div>
          <div class="media-desc">${escapeHtml(i.desc || '')}</div>
        </div>
        <div class="media-actions">
          <button class="btn btn-sm btn-outline" onclick="window.previewMedia('video',${i.id})">Perbesar</button>
          <button class="btn btn-sm btn-danger" onclick="window.hapusMedia('video',${i.id})">Hapus</button>
        </div>
      </div>
    `;
  }).join('');
};

window.renderDokumen = function(items) {
  const grid = document.getElementById('gridDokumen');
  if (!items.length) {
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1;"><div class="empty-icon">📄</div>Belum ada dokumen</div>';
    return;
  }
  grid.innerHTML = items.map(i => `
    <div class="media-card">
      <div class="media-thumb"><div class="doc-icon">📄</div></div>
      <div class="media-body">
        <div class="media-title">${escapeHtml(i.title)}</div>
        <div class="media-desc">${escapeHtml(i.desc || '')}</div>
      </div>
      <div class="media-actions">
        <button class="btn btn-sm btn-outline" onclick="window.previewMedia('dokumen',${i.id})">Buka</button>
        <a href="${i.url}" target="_blank" class="btn btn-sm" style="text-decoration:none;">↗</a>
        <button class="btn btn-sm btn-danger" onclick="window.hapusMedia('dokumen',${i.id})">Hapus</button>
      </div>
    </div>
  `).join('');
};

window.handleTitleSelect = function() {
  const select = document.getElementById('fTitleSelect');
  const customGroup = document.getElementById('fTitleCustomGroup');
  const customInput = document.getElementById('fTitleCustom');
  
  if (select.value === 'Lainnya (Ketik Manual)') {
    customGroup.style.display = 'block';
    customInput.required = true;
  } else {
    customGroup.style.display = 'none';
    customInput.required = false;
    customInput.value = '';
  }
};

window.openMediaForm = function(type) {
  currentFormType = type;
  const titles = { foto: 'Tambah Foto', video: 'Tambah Video', dokumen: 'Tambah Dokumen' };
  document.getElementById('formTitle').textContent = titles[type];
  
  document.getElementById('fDesc').value = '';
  document.getElementById('fUrl').value = '';
  document.getElementById('fFile').value = '';
  document.getElementById('fTitleCustom').value = '';
  document.getElementById('fTitleCustomGroup').style.display = 'none';
  
  const select = document.getElementById('fTitleSelect');
  select.innerHTML = '<option value="">-- Pilih Judul --</option>';
  PREDEFINED_TITLES[type].forEach(title => {
    const option = document.createElement('option');
    option.value = title;
    option.textContent = title;
    select.appendChild(option);
  });
  
  document.getElementById('fFileGroup').style.display = type === 'foto' ? 'block' : 'none';
  const hints = {
    foto: 'Disarankan gunakan URL gambar (misal dari Google Drive/Imgur) untuk menghemat kuota database.',
    video: 'URL YouTube (contoh: https://www.youtube.com/watch?v=...)',
    dokumen: 'URL embed Google Drive'
  };
  document.getElementById('fUrlHint').textContent = hints[type];
  document.getElementById('fUrlLabel').textContent = type === 'foto' ? 'URL Gambar (atau Upload)' : (type === 'video' ? 'URL YouTube' : 'URL Dokumen');
  
  document.getElementById('formModal').classList.add('active');
};

window.closeForm = function() {
  document.getElementById('formModal').classList.remove('active');
};

window.submitMedia = async function(e) {
  e.preventDefault();
  
  const titleSelect = document.getElementById('fTitleSelect').value;
  const titleCustom = document.getElementById('fTitleCustom').value;
  const title = titleSelect === 'Lainnya (Ketik Manual)' ? titleCustom : titleSelect;
  
  const desc = document.getElementById('fDesc').value;
  const fileInput = document.getElementById('fFile');
  let url = document.getElementById('fUrl').value;
  
  const finish = async (finalUrl) => {
    const media = await window.getMedia();
    if (!media[currentUser.schoolId]) {
      media[currentUser.schoolId] = { foto: [], video: [], dokumen: [] };
    }
    media[currentUser.schoolId][currentFormType].push({
      id: Date.now(),
      title,
      desc,
      url: finalUrl
    });
    await window.saveMedia(media);
    await window.renderMyMedia();
    await window.renderDashboard();
    window.closeForm();
  };
  
  if (currentFormType === 'foto' && fileInput.files[0] && !url) {
    const file = fileInput.files[0];
    if (file.size > 300000) {
      alert('Ukuran file terlalu besar (Maks 300KB).');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      await finish(ev.target.result);
    };
    reader.onerror = () => {
      alert('Gagal membaca file.');
    };
    reader.readAsDataURL(file);
  } else if (currentFormType === 'video') {
    const ytId = extractYoutubeId(url);
    await finish(ytId ? `https://www.youtube.com/embed/${ytId}` : url);
  } else {
    await finish(url);
  }
};

window.hapusMedia = async function(type, id) {
  if (!confirm('Hapus item ini?')) return;
  const media = await window.getMedia();
  if (!media[currentUser.schoolId]) return;
  media[currentUser.schoolId][type] = media[currentUser.schoolId][type].filter(i => i.id !== id);
  await window.saveMedia(media);
  await window.renderMyMedia();
  await window.renderDashboard();
};

window.previewMedia = async function(type, id) {
  const media = await window.getMedia();
  const schoolMedia = media[currentUser.schoolId];
  if (!schoolMedia) return;
  const item = schoolMedia[type].find(i => i.id === id);
  if (!item) return;
  
  let html = '';
  if (type === 'foto') {
    html = `<img src="${item.url}" style="width:100%; display:block;"><div style="padding:1rem;"><h3>${escapeHtml(item.title)}</h3><p style="color:var(--muted);">${escapeHtml(item.desc || '')}</p></div>`;
  } else if (type === 'video') {
    const ytId = extractYoutubeId(item.url);
    const embedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : item.url;
    html = `<div style="position:relative; padding-bottom:56.25%;"><iframe src="${embedUrl}" style="position:absolute; inset:0; width:100%; height:100%; border:0;" allowfullscreen></iframe></div><div style="padding:1rem;"><h3>${escapeHtml(item.title)}</h3></div>`;
  } else {
    html = `<iframe src="${item.url}" style="width:100%; height:70vh; border:0;"></iframe><div style="padding:1rem;"><h3>${escapeHtml(item.title)}</h3></div>`;
  }
  document.getElementById('previewContent').innerHTML = html;
  document.getElementById('previewModal').classList.add('active');
};

window.closePreview = function() {
  document.getElementById('previewModal').classList.remove('active');
};

// ============ FILTER EVENTS ============
document.getElementById('searchSchool').addEventListener('input', () => {
  currentPage = 1;
  window.renderSchoolTable();
});
document.getElementById('filterBentuk').addEventListener('change', () => {
  currentPage = 1;
  window.renderSchoolTable();
});
document.getElementById('filterKec').addEventListener('change', () => {
  currentPage = 1;
  window.renderSchoolTable();
});

const bentukSet = new Set(schools.map(s => s.bentuk));
const kecSet = new Set(schools.map(s => s.kecamatan));
const bentukSelect = document.getElementById('filterBentuk');
const kecSelect = document.getElementById('filterKec');
[...bentukSet].sort().forEach(b => {
  const opt = document.createElement('option');
  opt.value = b;
  opt.textContent = b;
  bentukSelect.appendChild(opt);
});
[...kecSet].sort().forEach(k => {
  const opt = document.createElement('option');
  opt.value = k;
  opt.textContent = k;
  kecSelect.appendChild(opt);
});

document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', e => {
    if (e.target === m) m.classList.remove('active');
  });
});

const searchStatusEl = document.getElementById('searchStatus');
if (searchStatusEl) {
  searchStatusEl.addEventListener('input', () => {
    statusPage = 1;
    window.renderStatusTable();
  });
}
const filterBentukStatusEl = document.getElementById('filterBentukStatus');
if (filterBentukStatusEl) {
  filterBentukStatusEl.addEventListener('change', () => {
    statusPage = 1;
    window.renderStatusTable();
  });
}

// ============ AUTO LOGIN (PALING AKHIR) ============
const savedAuth = localStorage.getItem(AUTH_KEY);
if (savedAuth) {
  try {
    currentUser = JSON.parse(savedAuth);
    if (currentUser.type === 'sekolah') {
      currentUser.school = schools.find(s => s.id === currentUser.schoolId);
    }
    if (currentUser && (currentUser.type === 'admin' || currentUser.school)) {
      window.showApp();
    }
  } catch(e) {}
}
