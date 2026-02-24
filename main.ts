/**
 * API Jadwal Matakuliah - Polban 1 AK
 * Waktu disesuaikan dengan Jadwal PBM Bulan Ramadhan 1447H / 2026
 *
 * Slot Waktu Senin-Kamis (Ramadhan):
 * Jam 1 : 08.00 - 08.40  |  Jam 7 : 12.30 - 13.10  |  Jam 10: 15.10 - 15.50
 * Jam 2 : 08.40 - 09.20  |  Jam 8 : 13.10 - 13.50  |  Jam 11: 15.50 - 16.30
 * Jam 3 : 09.20 - 10.00  |  Jam 9 : 13.50 - 14.30  |  Jam 12: 16.30 - 17.10
 * Jam 4 : 10.00 - 10.40  |  [ISTIRAHAT 14.30-15.10]
 * Jam 5 : 10.40 - 11.20  |
 * Jam 6 : 11.20 - 12.00  |
 * [ISTIRAHAT 12.00-12.30] |
 *
 * Slot Waktu Jumat (Ramadhan):
 * Jam 1 : 08.00 - 08.40  |  Jam 6 : 13.00 - 13.40  |  Jam 9 : 15.30 - 16.10
 * Jam 2 : 08.40 - 09.20  |  Jam 7 : 13.40 - 14.20  |  Jam 10: 16.10 - 16.50
 * Jam 3 : 09.20 - 10.00  |  Jam 8 : 14.20 - 15.00  |  Jam 11: 16.50 - 17.30
 * Jam 4 : 10.00 - 10.40  |  [ISTIRAHAT 15.00-15.30]
 * Jam 5 : 10.40 - 11.20  |
 * [ISTIRAHAT 11.20-13.00] |
 */

interface JadwalItem {
  jam: number;
  waktu: string;
  matkul: string;
  dosen: string;
  ruang: string;
}

type JadwalKelas = Record<string, JadwalItem[]>;
type SemuaJadwal = Record<string, JadwalKelas>;

const jadwal: SemuaJadwal = {
  "1AKA": {
    "SENIN": [
      { jam: 1, waktu: "08.00 - 08.40", matkul: "Aplikasi Akuntansi Spreadsheet", dosen: "Arif", ruang: "Lab 3" },
      { jam: 2, waktu: "08.40 - 09.20", matkul: "Aplikasi Akuntansi Spreadsheet", dosen: "Arif", ruang: "Lab 3" },
      { jam: 5, waktu: "10.40 - 11.20", matkul: "Akuntansi Biaya", dosen: "Putry Nadeak", ruang: "F.201" },
      { jam: 6, waktu: "11.20 - 12.00", matkul: "Akuntansi Biaya", dosen: "Putry Nadeak", ruang: "F.201" },
      { jam: 7, waktu: "12.30 - 13.10", matkul: "Pengantar Akuntansi 2", dosen: "Khozin Arief/Rosmayanti", ruang: "F.201" },
      { jam: 8, waktu: "13.10 - 13.50", matkul: "Pengantar Akuntansi 2", dosen: "Khozin Arief", ruang: "F.201" },
      { jam: 9, waktu: "13.50 - 14.30", matkul: "Statistika Bisnis", dosen: "Dr. Arjun Hasibuan, M.Mat.", ruang: "F.201" },
      { jam: 10, waktu: "15.10 - 15.50", matkul: "Statistika Bisnis", dosen: "Dr. Arjun Hasibuan, M.Mat.", ruang: "F.201" },
    ],
    "SELASA": [
      { jam: 2, waktu: "08.40 - 09.20", matkul: "Akuntansi Biaya", dosen: "Putry Nadeak", ruang: "F.201" },
      { jam: 3, waktu: "09.20 - 10.00", matkul: "Akuntansi Biaya", dosen: "Putry Nadeak", ruang: "F.201" },
      { jam: 4, waktu: "10.00 - 10.40", matkul: "Akuntansi Biaya", dosen: "Putry Nadeak", ruang: "F.201" },
      { jam: 5, waktu: "10.40 - 11.20", matkul: "Aplikasi Akuntansi Spreadsheet", dosen: "-", ruang: "Lab 5" },
      { jam: 6, waktu: "11.20 - 12.00", matkul: "Aplikasi Akuntansi Spreadsheet", dosen: "-", ruang: "Lab 5" },
    ],
    "RABU": [
      { jam: 1, waktu: "08.00 - 08.40", matkul: "Bahasa Inggris 2", dosen: "Bu Siti Yuliah", ruang: "F.201" },
      { jam: 2, waktu: "08.40 - 09.20", matkul: "Bahasa Inggris 2", dosen: "Bu Siti Yuliah", ruang: "F.201" },
      { jam: 3, waktu: "09.20 - 10.00", matkul: "Bahasa Inggris 2", dosen: "Bu Siti Yuliah", ruang: "F.201" },
      { jam: 4, waktu: "10.00 - 10.40", matkul: "Penganggaran", dosen: "Etti Ernita Sembiring", ruang: "F.201" },
      { jam: 5, waktu: "10.40 - 11.20", matkul: "Penganggaran", dosen: "Etti Ernita Sembiring", ruang: "F.201" },
      { jam: 6, waktu: "11.20 - 12.00", matkul: "Penganggaran", dosen: "Etti Ernita Sembiring", ruang: "F.201" },
      { jam: 10, waktu: "15.10 - 15.50", matkul: "Dasar Perpajakan", dosen: "Mutia T. G.", ruang: "F.201" },
      { jam: 11, waktu: "15.50 - 16.30", matkul: "Dasar Perpajakan", dosen: "Mutia T. G.", ruang: "F.201" },
    ],
    "KAMIS": [
      { jam: 2, waktu: "08.40 - 09.20", matkul: "Pengantar Akuntansi 2", dosen: "Rosmayanti", ruang: "F.201" },
      { jam: 3, waktu: "09.20 - 10.00", matkul: "Pengantar Akuntansi 2", dosen: "Rosmayanti", ruang: "F.201" },
      { jam: 4, waktu: "10.00 - 10.40", matkul: "Hukum Bisnis", dosen: "Carol", ruang: "F.201" },
      { jam: 5, waktu: "10.40 - 11.20", matkul: "Hukum Bisnis", dosen: "Carol", ruang: "F.201" },
      { jam: 6, waktu: "11.20 - 12.00", matkul: "Hukum Bisnis", dosen: "Carol", ruang: "F.201" },
      { jam: 7, waktu: "12.30 - 13.10", matkul: "Dasar Perpajakan", dosen: "Mutia T. G.", ruang: "F.201" },
      { jam: 8, waktu: "13.10 - 13.50", matkul: "Dasar Perpajakan", dosen: "Mutia T. G.", ruang: "F.201" },
      { jam: 9, waktu: "13.50 - 14.30", matkul: "Dasar Perpajakan", dosen: "Mutia T. G.", ruang: "F.201" },
    ],
    "JUMAT": [
      { jam: 1, waktu: "08.00 - 08.40", matkul: "Statistika Bisnis", dosen: "Dr. Arjun Hasibuan, M.Mat.", ruang: "F.201" },
      { jam: 2, waktu: "08.40 - 09.20", matkul: "Statistika Bisnis", dosen: "Dr. Arjun Hasibuan, M.Mat.", ruang: "F.201" },
      { jam: 3, waktu: "09.20 - 10.00", matkul: "Statistika Bisnis", dosen: "Dr. Arjun Hasibuan, M.Mat.", ruang: "F.201" },
    ],
  },

  "1AKB": {
    "SENIN": [
      { jam: 3, waktu: "09.20 - 10.00", matkul: "Aplikasi Akuntansi Spreadsheet", dosen: "Rahma", ruang: "Lab 3" },
      { jam: 4, waktu: "10.00 - 10.40", matkul: "Aplikasi Akuntansi Spreadsheet", dosen: "Rahma", ruang: "Lab 3" },
      { jam: 5, waktu: "10.40 - 11.20", matkul: "Statistika Bisnis", dosen: "Arjun Hasibuan", ruang: "-" },
      { jam: 6, waktu: "11.20 - 12.00", matkul: "Statistika Bisnis", dosen: "Arjun Hasibuan", ruang: "-" },
      { jam: 7, waktu: "12.30 - 13.10", matkul: "Akuntansi Biaya", dosen: "Putry", ruang: "F. 202" },
      { jam: 8, waktu: "13.10 - 13.50", matkul: "Akuntansi Biaya", dosen: "Putry", ruang: "F. 202" },
      { jam: 9, waktu: "13.50 - 14.30", matkul: "Pengantar Akuntansi 2", dosen: "Khozin Arief", ruang: "F. 202" },
      { jam: 10, waktu: "15.10 - 15.50", matkul: "Pengantar Akuntansi 2", dosen: "Khozin Arief", ruang: "F. 202" },
    ],
    "SELASA": [
      { jam: 1, waktu: "08.00 - 08.40", matkul: "Aplikasi Akuntansi Spreadsheet", dosen: "-", ruang: "Lab 3" },
      { jam: 2, waktu: "08.40 - 09.20", matkul: "Aplikasi Akuntansi Spreadsheet", dosen: "-", ruang: "Lab 3" },
      { jam: 3, waktu: "09.20 - 10.00", matkul: "Dasar Perpajakan", dosen: "Yeti Apriliawati", ruang: "F. 202" },
      { jam: 4, waktu: "10.00 - 10.40", matkul: "Dasar Perpajakan", dosen: "Yeti Apriliawati", ruang: "F. 202" },
      { jam: 5, waktu: "10.40 - 11.20", matkul: "Dasar Perpajakan", dosen: "Yeti Apriliawati", ruang: "F. 202" },
      { jam: 7, waktu: "12.30 - 13.10", matkul: "Pengantar Akuntansi 2", dosen: "Khozin Arief", ruang: "F. 202" },
      { jam: 8, waktu: "13.10 - 13.50", matkul: "Pengantar Akuntansi 2", dosen: "Khozin Arief", ruang: "F. 202" },
    ],
    "RABU": [
      { jam: 1, waktu: "08.00 - 08.40", matkul: "Penganggaran", dosen: "-", ruang: "F. 202" },
      { jam: 2, waktu: "08.40 - 09.20", matkul: "Penganggaran", dosen: "-", ruang: "F. 202" },
      { jam: 3, waktu: "09.20 - 10.00", matkul: "Penganggaran", dosen: "-", ruang: "F. 202" },
      { jam: 4, waktu: "10.00 - 10.40", matkul: "Bahasa Inggris 2", dosen: "Bu Siti Yuliah", ruang: "-" },
      { jam: 5, waktu: "10.40 - 11.20", matkul: "Bahasa Inggris 2", dosen: "Bu Siti Yuliah", ruang: "-" },
      { jam: 6, waktu: "11.20 - 12.00", matkul: "Bahasa Inggris 2", dosen: "Bu Siti Yuliah", ruang: "-" },
    ],
    "KAMIS": [
      { jam: 2, waktu: "08.40 - 09.20", matkul: "Akuntansi Biaya", dosen: "Putry Nadeak", ruang: "F. 202" },
      { jam: 3, waktu: "09.20 - 10.00", matkul: "Akuntansi Biaya", dosen: "Putry Nadeak", ruang: "F. 202" },
      { jam: 4, waktu: "10.00 - 10.40", matkul: "Akuntansi Biaya", dosen: "Putry Nadeak", ruang: "F. 202" },
      { jam: 5, waktu: "10.40 - 11.20", matkul: "Pengantar Akuntansi 2", dosen: "Rosmayanti", ruang: "F. 202" },
      { jam: 6, waktu: "11.20 - 12.00", matkul: "Pengantar Akuntansi 2", dosen: "Rosmayanti", ruang: "F. 202" },
      { jam: 7, waktu: "12.30 - 13.10", matkul: "Dasar Perpajakan", dosen: "Yeti Apriliawati", ruang: "F. 202" },
      { jam: 8, waktu: "13.10 - 13.50", matkul: "Dasar Perpajakan", dosen: "Yeti Apriliawati", ruang: "F. 202" },
    ],
    "JUMAT": [
      { jam: 1, waktu: "08.00 - 08.40", matkul: "Hukum Bisnis", dosen: "Carol", ruang: "F. 202" },
      { jam: 2, waktu: "08.40 - 09.20", matkul: "Hukum Bisnis", dosen: "Carol", ruang: "F. 202" },
      { jam: 3, waktu: "09.20 - 10.00", matkul: "Hukum Bisnis", dosen: "Carol", ruang: "F. 202" },
      { jam: 6, waktu: "13.00 - 13.40", matkul: "Statistika Bisnis", dosen: "Arjun Hasibuan", ruang: "F. 202" },
      { jam: 7, waktu: "13.40 - 14.20", matkul: "Statistika Bisnis", dosen: "Arjun Hasibuan", ruang: "F. 202" },
      { jam: 8, waktu: "14.20 - 15.00", matkul: "Statistika Bisnis", dosen: "Arjun Hasibuan", ruang: "F. 202" },
    ],
  },

  "1AKC": {
    "SENIN": [
      { jam: 1, waktu: "08.00 - 08.40", matkul: "Statistika Bisnis", dosen: "Arjun Hasibuan", ruang: "AK. 301" },
      { jam: 2, waktu: "08.40 - 09.20", matkul: "Statistika Bisnis", dosen: "Arjun Hasibuan", ruang: "AK. 301" },
      { jam: 3, waktu: "09.20 - 10.00", matkul: "Statistika Bisnis", dosen: "Arjun Hasibuan", ruang: "AK. 301" },
      { jam: 5, waktu: "10.40 - 11.20", matkul: "Aplikasi Akuntansi Spreadsheet", dosen: "Rahma", ruang: "Lab 3" },
      { jam: 6, waktu: "11.20 - 12.00", matkul: "Aplikasi Akuntansi Spreadsheet", dosen: "Rahma", ruang: "Lab 3" },
      { jam: 7, waktu: "12.30 - 13.10", matkul: "Akuntansi Biaya", dosen: "Dian Imanina Burhany", ruang: "AK. 301" },
      { jam: 8, waktu: "13.10 - 13.50", matkul: "Akuntansi Biaya", dosen: "Dian Imanina Burhany", ruang: "AK. 301" },
      { jam: 9, waktu: "13.50 - 14.30", matkul: "Akuntansi Biaya", dosen: "Dian Imanina Burhany", ruang: "AK. 301" },
    ],
    "SELASA": [
      { jam: 3, waktu: "09.20 - 10.00", matkul: "Aplikasi Akuntansi Spreadsheet", dosen: "-", ruang: "Lab 5" },
      { jam: 4, waktu: "10.00 - 10.40", matkul: "Aplikasi Akuntansi Spreadsheet", dosen: "-", ruang: "Lab 5" },
      { jam: 5, waktu: "10.40 - 11.20", matkul: "Dasar Perpajakan", dosen: "Annas Rahmat Ramadhani", ruang: "AK. 301" },
      { jam: 6, waktu: "11.20 - 12.00", matkul: "Dasar Perpajakan", dosen: "Annas Rahmat Ramadhani", ruang: "AK. 301" },
      { jam: 7, waktu: "12.30 - 13.10", matkul: "Hukum Bisnis", dosen: "Carol", ruang: "AK. 301" },
      { jam: 8, waktu: "13.10 - 13.50", matkul: "Hukum Bisnis", dosen: "Carol", ruang: "AK. 301" },
      { jam: 9, waktu: "13.50 - 14.30", matkul: "Hukum Bisnis", dosen: "Carol", ruang: "AK. 301" },
    ],
    "RABU": [
      { jam: 1, waktu: "08.00 - 08.40", matkul: "Dasar Perpajakan", dosen: "Annas Rahmat Ramadhani", ruang: "AK. 301" },
      { jam: 2, waktu: "08.40 - 09.20", matkul: "Dasar Perpajakan", dosen: "Annas Rahmat Ramadhani", ruang: "AK. 301" },
      { jam: 3, waktu: "09.20 - 10.00", matkul: "Dasar Perpajakan", dosen: "Annas Rahmat Ramadhani", ruang: "AK. 301" },
      { jam: 4, waktu: "10.00 - 10.40", matkul: "Akuntansi Biaya", dosen: "Dian Imanina Burhany", ruang: "AK. 301" },
      { jam: 5, waktu: "10.40 - 11.20", matkul: "Akuntansi Biaya", dosen: "Dian Imanina Burhany", ruang: "AK. 301" },
      { jam: 7, waktu: "12.30 - 13.10", matkul: "Bahasa Inggris 2", dosen: "Bu Siti Yuliah", ruang: "AK. 301" },
      { jam: 8, waktu: "13.10 - 13.50", matkul: "Bahasa Inggris 2", dosen: "Bu Siti Yuliah", ruang: "AK. 301" },
      { jam: 9, waktu: "13.50 - 14.30", matkul: "Bahasa Inggris 2", dosen: "Bu Siti Yuliah", ruang: "AK. 301" },
    ],
    "KAMIS": [
      { jam: 4, waktu: "10.00 - 10.40", matkul: "Penganggaran", dosen: "Etti Ernita Sembiring", ruang: "AK. 301" },
      { jam: 5, waktu: "10.40 - 11.20", matkul: "Penganggaran", dosen: "Etti Ernita Sembiring", ruang: "AK. 301" },
      { jam: 6, waktu: "11.20 - 12.00", matkul: "Penganggaran", dosen: "Etti Ernita Sembiring", ruang: "AK. 301" },
      { jam: 7, waktu: "12.30 - 13.10", matkul: "Pengantar Akuntansi 2", dosen: "Khozin Arief", ruang: "AK. 301" },
      { jam: 8, waktu: "13.10 - 13.50", matkul: "Pengantar Akuntansi 2", dosen: "Khozin Arief", ruang: "AK. 301" },
    ],
    "JUMAT": [
      { jam: 1, waktu: "08.00 - 08.40", matkul: "Statistika Bisnis", dosen: "Arjun Hasibuan", ruang: "AK. 301" },
      { jam: 2, waktu: "08.40 - 09.20", matkul: "Statistika Bisnis", dosen: "Arjun Hasibuan", ruang: "AK. 301" },
      { jam: 6, waktu: "13.00 - 13.40", matkul: "Pengantar Akuntansi 2", dosen: "Rosmayanti", ruang: "AK. 301" },
      { jam: 7, waktu: "13.40 - 14.20", matkul: "Pengantar Akuntansi 2", dosen: "Rosmayanti", ruang: "AK. 301" },
      { jam: 8, waktu: "14.20 - 15.00", matkul: "Pengantar Akuntansi 2", dosen: "Rosmayanti", ruang: "AK. 301" },
    ],
  },
};

const slotWaktu = {
  "SENIN-KAMIS": {
    1: "08.00 - 08.40", 2: "08.40 - 09.20", 3: "09.20 - 10.00",
    4: "10.00 - 10.40", 5: "10.40 - 11.20", 6: "11.20 - 12.00",
    "istirahat1": "12.00 - 12.30",
    7: "12.30 - 13.10", 8: "13.10 - 13.50", 9: "13.50 - 14.30",
    "istirahat2": "14.30 - 15.10",
    10: "15.10 - 15.50", 11: "15.50 - 16.30", 12: "16.30 - 17.10",
  },
  "JUMAT": {
    1: "08.00 - 08.40", 2: "08.40 - 09.20", 3: "09.20 - 10.00",
    4: "10.00 - 10.40", 5: "10.40 - 11.20",
    "istirahat1": "11.20 - 13.00",
    6: "13.00 - 13.40", 7: "13.40 - 14.20", 8: "14.20 - 15.00",
    "istirahat2": "15.00 - 15.30",
    9: "15.30 - 16.10", 10: "16.10 - 16.50", 11: "16.50 - 17.30",
  },
};

Deno.serve((req) => {
  const url = new URL(req.url);
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") return new Response(null, { headers });

  const path = url.pathname;

  if (path === "/" || path === "") {
    return new Response(JSON.stringify({
      nama: "API Jadwal Matakuliah Ramadhan - Polban 1 AK",
      keterangan: "Waktu disesuaikan dengan Jadwal PBM Bulan Ramadhan 1447H/2026",
      versi: "2.0.0",
      kelas_tersedia: Object.keys(jadwal),
      hari_tersedia: ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT"],
      endpoints: [
        "GET /api/jadwal",
        "GET /api/jadwal/{kelas}",
        "GET /api/jadwal/{kelas}/{hari}",
        "GET /api/slot-waktu",
      ],
    }, null, 2), { headers });
  }

  if (path === "/api/slot-waktu") {
    return new Response(JSON.stringify(slotWaktu, null, 2), { headers });
  }

  if (path === "/api/jadwal") {
    return new Response(JSON.stringify(jadwal, null, 2), { headers });
  }

  const matchKelas = path.match(/^\/api\/jadwal\/([^/]+)$/);
  if (matchKelas) {
    const kelas = matchKelas[1].toUpperCase();
    if (jadwal[kelas]) return new Response(JSON.stringify(jadwal[kelas], null, 2), { headers });
    return new Response(JSON.stringify({ error: "Kelas tidak ditemukan", tersedia: Object.keys(jadwal) }), { status: 404, headers });
  }

  const matchHari = path.match(/^\/api\/jadwal\/([^/]+)\/([^/]+)$/);
  if (matchHari) {
    const kelas = matchHari[1].toUpperCase();
    const hari = matchHari[2].toUpperCase();
    if (jadwal[kelas]?.[hari]) return new Response(JSON.stringify(jadwal[kelas][hari], null, 2), { headers });
    return new Response(JSON.stringify({ error: "Kelas atau hari tidak ditemukan" }), { status: 404, headers });
  }

  return new Response(JSON.stringify({ error: "Endpoint tidak ditemukan" }), { status: 404, headers });
});
