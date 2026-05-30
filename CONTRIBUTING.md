# Berkontribusi ke Capsule Mood Pixel

Terima kasih atas minat Anda! Proyek ini menerima kontribusi dalam bentuk **pull request**,
**issue**, atau **diskusii**.

## Pedoman Umum

- Hormati [Kode Etik](CODE_OF_CONDUCT.md).
- Gunakan Bahasa Indonesia atau Inggris – konsisten dalam satu diskusi.
- PR harus mengacu pada issue yang sudah disepakati.
- Pastikan tidak ada error di console, semua fitur aksesibel, dan tampilan tetap rapi di mobile.

## Proses Kontribusi

1. Fork repositori ini.
2. Buat branch baru: `feat/nama-fitur` atau `fix/nama-bug`.
3. Lakukan perubahan, uji di browser.
4. Commit dengan pesan jelas (contoh: `feat: tambahkan navigasi tahun`).
5. Push ke fork Anda dan buat Pull Request ke `main`.
6. Tunggu review – mungkin ada permintaan perubahan minor.

## Panduan Teknis

- **HTML**: semantic HTML5, ARIA roles/labels, valid.
- **CSS**: custom properties mengikuti Neobrutalism token, mobile-first, dukung `prefers-reduced-motion`.
- **JavaScript**: vanilla JS (ES2026), jangan tambahkan library/framework tanpa persetujuan.
- **Aksesibilitas**: keyboard navigable, focus trap di modal, warna kontras cukup.
- **Motion**: durasi animasi pendek (80‑200ms), curve `cubic-bezier(0.2, 0, 0, 1)`, jangan animasi transform kecuali diperlukan.

## Menguji Perubahan

Cukup buka `index.html` di browser. Tidak ada build step.  
Tes:
- Klik tanggal hari ini/p sebelumnya.
- Ubah suasana hati, hapus.
- Navigasi bulan mundur/maju, pastikan data tersimpan.
- Coba dengan keyboard (Tab, Enter, Escape).
- Aktifkan `prefers-reduced-motion` di pengaturan OS.

## Laporan Bug

Gunakan [Issues](https://github.com/faizabdillahh/capsule-mood-pixel/issues). Sertakan:
- Browser dan versi.
- Langkah reproduksi.
- Perilaku yang diharapkan vs aktual.
- Screenshot jika mungkin.

Terima kasih telah membantu! 🎨