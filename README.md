# Media Pembelajaran Digital: Digital Citizen & Citizen Journalism
> **Tugas Mata Kuliah:** Belajar di Era Digital (MKWU4109) — Universitas Terbuka Semester 3  
> **Teknologi:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide React

Aplikasi web interaktif ini dikembangkan sebagai media pembelajaran digital (alternatif modern pengganti Microsoft Sway) yang menyajikan perbedaan mendasar dan karakteristik antara **Digital Citizen (Warga Digital)** dan **Citizen Journalism (Jurnalisme Warga)**.

---

## 🚀 Fitur Utama Aplikasi

1. **Dual View Mode (Mode Tampilan Ganda):**
   - **Mode Gulir Penuh (Web):** Navigasi mulus dengan tautan cepat antar bab.
   - **Mode Slide Sway:** Beralih ke format slide presentasi interaktif ala MS Sway dengan kontrol panah bagian per bagian.
2. **Filter Topik Cepat:** Memfilter tampilan untuk melihat "Semua Materi", hanya "Digital Citizen", atau hanya "Citizen Journalism".
3. **6 Karakteristik Digital Citizen:** Literasi digital, etika & netiket, privasi, hukum siber, kesehatan digital, dan partisipasi produktif.
4. **6 Karakteristik Citizen Journalism:** Pelaku non-profesional, kecepatan real-time (eyewitness), media sosial partisipatif, perspektif lokal, interaktif, dan tanpa gatekeeping formal.
5. **Tabel Komparasi 7 Dimensi:** Perbandingan komprehensif (Fokus, Subjek, Tujuan, Aktivitas, Kompetensi, Aturan, dan Contoh Nyata). Responsif dengan tampilan tabel di desktop dan kartu akordeon di perangkat mobile.
6. **Diagram Irisan Peran (Sintesis):** Visualisasi bagaimana etika Digital Citizen menjadi fondasi utama bagi Citizen Journalism yang kredibel.
7. **Studi Kasus Kontekstual:** Skenario penanganan banjir di lingkungan untuk membedakan aksi nyata kedua peran.
8. **Kuis Evaluasi Interaktif:** 3 soal kuis dengan skor langsung, umpan balik jawaban seketika, dan tombol reset.
9. **Modal & Form Jawaban Tugas UT:** Tombol satu-klik untuk menyalin draf jawaban lengkap Soal No. 1 & 2 yang siap dikumpulkan di forum UT.

---

## 🛠️ Menjalankan di Komputer Lokal (Mac / Windows / Linux)

### 1. Prasyarat
- Node.js versi 18 ke atas (disarankan Node.js v20 atau v22).
- npm / pnpm / yarn.

### 2. Jalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser Anda dan akses: [http://localhost:3000](http://localhost:3000)

### 3. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 🌐 Cara Mendapatkan Tautan Publik untuk Pengumpulan Tugas UT (Soal No. 2)

Jika tutor meminta tautan presentasi web yang bisa diakses secara publik (pengganti link MS Sway):

### Opsi A: Menggunakan Vercel CLI (Paling Cepat, ~1 Menit)
1. Buka Terminal di folder proyek ini (`digital-citizen-ut`).
2. Jalankan perintah:
   ```bash
   npx vercel
   ```
3. Ikuti petunjuk singkat di layar (masuk dengan akun GitHub/email Anda).
4. Vercel akan otomatis melakukan build dan memberikan URL publik seperti:  
   `https://digital-citizen-ut.vercel.app`
5. Salin URL tersebut dan tempelkan pada lembar tugas Nomor 2 Anda.

### Opsi B: Unggah ke GitHub & Hubungkan ke Vercel Dashboard
1. Buat repositori baru di GitHub (misal: `digital-citizen-ut`).
2. Push kode proyek ke GitHub:
   ```bash
   git add .
   git commit -m "feat: media pembelajaran digital citizen & citizen journalism"
   git remote add origin https://github.com/USERNAME/digital-citizen-ut.git
   git push -u origin main
   ```
3. Buka [https://vercel.com](https://vercel.com), klik **Add New Project**, dan pilih repositori Anda.
4. Klik **Deploy**. URL publik langsung aktif.

---

## 📁 Struktur Direktori Proyek

```
digital-citizen-ut/
├── src/
│   └── app/
│       ├── globals.css      # Konfigurasi Tailwind CSS v4 & utilitas scroll
│       ├── layout.tsx       # Root layout, metadata SEO, viewport & tema
│       └── page.tsx         # Komponen interaktif utama (React 19 & Lucide)
├── public/                  # Asset statis
├── package.json             # Konfigurasi dependencies (Next 16, React 19, Lucide)
├── tsconfig.json            # Konfigurasi TypeScript
├── next.config.ts           # Konfigurasi Next.js
└── README.md                # Panduan proyek
```

---
*Dibuat untuk memenuhi Tugas Mata Kuliah Belajar di Era Digital — Universitas Terbuka.*
