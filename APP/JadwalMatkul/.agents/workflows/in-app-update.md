---
description: Panduan In-App Update Otomatis (Level 2) untuk APK
---

# Alur Kerja Update Aplikasi Otomatis (In-App Update via GitHub/Online)

Saat ini Anda telah meminta saya (AI) untuk mengingat bahwa Anda ingin menggunakan sistem **In-App Update (Sistem Cek Otomatis)** untuk mempermudah distribusi update APK ke depannya.

File ini dibuat agar saya, atau Anda sendiri di masa depan, tidak lupa bagaimana cara menggunakannya saat ada fitur baru.

---

## SYARAT UTAMA SEBELUM UPDATE

Setiap kali Anda selesai menambah fitur baru/mengkoding sesuatu dan siap membagikannya, Anda **WAJIB** melakukan hal ini, jika tidak, HP teman Anda tidak akan tahu ada update baru:

### 1. Naikkan Versi Aplikasi di \`build.gradle.kts (Module :app)\`

Di dalam file konfigurasi Android Studio, selalu cari blok \`defaultConfig\` dan ubah angkanya LEBIH TINGGI dari sebelumnya:

- **\`versionCode\`**: Harus dinaikkan (Misal dari \`1\` menjadi \`2\`). Ini adalah angka rahasia yang dibaca oleh sistem HP.
- **\`versionName\`**: Bebas, tapi sebaiknya dinaikkan juga (Misal dari \`"1.0"\` menjadi \`"1.1"\` atau \`"2.0"\`). Ini yang dibaca oleh manusia.

**Contoh:**
\`\`\`kotlin
defaultConfig {
applicationId = "com.polban.jadwalmatkul"
minSdk = 24
targetSdk = 34
versionCode = 2 // <--- UBAH INI JADI LEBIH BESAR
versionName = "1.1" // <--- UBAH INI
// ...
}
\`\`\`

### 2. Build APK Baru

Lakukan build seperti biasa:
**Menu Build ➔ Build Bundle(s) / APK(s) ➔ Build APK(s)**

### 3. Upload APK Baru ke Tempat Gratis (Host)

File \`app-debug.apk\` (atau \`AK25.apk\`) yang baru jadi HARUS Anda upload ke internet agar bisa didownload oleh HP teman Anda.
**Saran Tempat Upload:**

1. **GitHub Releases** (Sangat disarankan).
2. Hosting Pribadi / CPanel.
3. Google Drive (membutuhkan sedikit modifikasi kode download link agar otomatis _direct download_, bukan masuk ke halaman preview Google Drive).

### 4. Perbarui File Cek Versi (JSON) di Internet

Aplikasi Android Anda butuh 1 file teks kecil di internet (misalnya \`version.json\`) sebagai "Pengumuman" bahwa versi baru sudah rilis.

Anda harus meng-update file \`version.json\` ini di tempat Anda menyimpannya (misalnya di root folder repository GitHub Anda), dengan isi seperti ini:
\`\`\`json
{
"latestVersionCode": 2,
"latestVersionName": "1.1",
"downloadUrl": "https://link-direct-download-apk-anda-yang-baru-diupload.com/AK25.apk",
"releaseNotes": "Menambahkan fitur kalkulator nilai dan memperbaiki bug animasi."
}
\`\`\`

---

## BAGAIMANA APLIKASI ANDROID ANDA BEKERJA KELAK?

Jika 4 langkah di atas telah Anda kerjakan, maka beginilah ajaibnya yang akan terjadi di HP teman Anda:

1. Teman Anda membuka aplikasi \`AK25.app\` seperti biasa.
2. Di balik layar (secara asinkron/background), aplikasi akan mengunduh file pengumuman \`version.json\` dari internet tadi.
3. Aplikasi akan mencocokkan: _"Di HP saya versionCode-nya 1, tapi di internet versionCode-nya 2!"_
4. Aplikasi akan memunculkan pop-up (AlertDialog):
   **"Update Tersedia! (Versi 1.1) - Catatan: Menambahkan fitur kalkulator nilai."**
5. Jika teman Anda menekan tombol **Update**, aplikasi akan diam-diam men-download file \`downloadUrl\` yang ada di dalam JSON tadi.
6. Setelah selesai, layar akan otomatis memunculkan jendela Instalasi Android (Install / Update dialog) standar.
7. Teman Anda menekan "Update", aplikasi me-restart, dan BUM! Aplikasi mereka langsung menjadi versi terbaru dengan fitur baru.

_Catatan: Karena aplikasi tidak ada di Google Play Store, saat penginstalan awal, aplikasi akan meminta perizinan "Install from Unknown Sources" (Instal dari Sumber Tidak Dikenal) kepada teman Anda. Izin ini hanya perlu diberikan sekali._
