# 🎨 Capsule Mood Pixel

> Kalender suasana hati satu bulan dalam satu layar — piksel warna yang merekam perasaanmu setiap hari.  
> Dibangun dengan HTML/CSS/JS murni, Neobrutalism, dan aturan aksesibilitas ketat.

[![MIT License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)

![Screenshot](screenshot.png)

## ✨ Fitur Utama

- 📅 **Kalender bulanan** – satu layar penuh, semua tanggal terlihat.
- 🌈 **6 suasana hati** – Senang, Sedih, Marah, Semangat, Tenang, Biasa.
- 🖱️ **Klik & pilih** – klik tanggal, pilih warna dari modal yang rapi.
- 💾 **localStorage** – data tetap tersimpan meski browser ditutup.
- ♿ **Aksesibel** – keyboard navigation, focus trap, ARIA labels, reduced‑motion.
- 🎯 **Hanya hari ini & kemarin** – tidak bisa mencatat suasana untuk masa depan.
- 📱 **Responsif mobile‑first** – nyaman di layar kecil hingga desktop.
- 🧱 **Neobrutalism** – border tebal, warna kontras tinggi, zero radius, shadow offset.

## 🧠 Teknologi & Standar

| Aspek | Implementasi |
|---|---|
| **HTML** | Living Standard – semantic, ARIA grid |
| **CSS** | Snapshot 2026 – custom properties, grid, logical queries |
| **JavaScript** | ES2026 (ES17) – modules, `Map`, modern events |
| **Ikon** | SVG inline (Lucide‑style) – tanpa emoji, tanpa eksternal dependensi |
| **Penyimpanan** | `localStorage` + fallback memory store |
| **Motion** | Durasi 80‑200ms, curve M3, full `prefers-reduced-motion` support |
| **Tipografi** | Inter, 3‑weight system, tracking presisi untuk ALL CAPS dan headings |

## 📁 Struktur Proyek

```
capsule-mood-pixel/
├── index.html            # Halaman utama kalender
├── style.css             # Seluruh styling (Neobrutalism, responsive, motion)
├── script.js             # Logika kalender, penyimpanan, modal
├── README.md
└── LICENSE.md
└── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md

```

## 🚀 Cara Menjalankan

1. Clone repositori ini:
   ```bash
   git clone https://github.com/faizabdillahh/capsule-mood-pixel.git
   cd capsule-mood-pixel
   ```

2. Buka `index.html` langsung di browser (Chrome 113+, Firefox, Safari).  
   Tidak perlu server atau build tools.

## 🧪 Penggunaan

- Klik tanggal **hari ini atau sebelumnya** untuk memilih suasana hati.
- Gunakan tombol **‹ ›** untuk berpindah bulan/tahun.
- Tombol **Hari ini** langsung menuju bulan berjalan.
- Pilihan warna bisa diubah kapan saja, termasuk menghapus.
- Semua data tersimpan lokal — Anda bisa melanjutkan kapan pun.

## 🤝 Kontribusi

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan lengkap.  
Proyek ini mengikuti [Code of Conduct](CODE_OF_CONDUCT.md).

## 📜 Lisensi

MIT © 2026 M Faiz Abdillah.

---