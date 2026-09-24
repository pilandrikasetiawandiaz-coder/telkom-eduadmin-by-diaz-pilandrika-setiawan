export interface Student {
  id: string;
  number: string;
  name: string;
  nisn: string;
  className: string;
  major: string;
  status: 'H' | 'S' | 'I' | 'A';
  timeNote?: string;
  avatar: string;
  attendancePercent: number;
  totalPresent: number;
  totalSickPermit: number;
  totalAlpha: number;
  history: {
    date: string;
    detail: string;
    type: 'H' | 'S' | 'I' | 'A';
    tag: string;
  }[];
  parentPhone: string;
  parentName: string;
  notes: string;
}

export interface Teacher {
  id: string;
  initials: string;
  name: string;
  role: string;
  nip: string;
  category: 'Produktif' | 'Normatif' | 'TKJ' | 'DKV' | 'Staf';
  specialization: string[];
  department: string;
  statusBadge: string;
  statusType: 'mengajar' | 'ruang_guru' | 'tugas' | 'sakit' | 'piket';
  checkInTime: string;
  phone: string;
  note?: string;
  invalReplacement?: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: string;
  timeAgo: string;
  division: string;
  description: string;
  urgent?: boolean;
  image?: string;
  attachments?: string;
  views?: number;
  likes?: number;
  location?: string;
  dateScheduled?: string;
  gateClosing?: string;
}

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    number: '#01',
    name: 'Ahmad Fauzi',
    nisn: '0068492011',
    className: 'XII RPL 1',
    major: 'RPL',
    status: 'H',
    timeNote: '06.42 WIB • Gerbang Utama',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAPEp77O5FgOAR0Vytmso87_Y454xyOKUA0KhjXhvswQfkam9qws2ysVs8jNaJSlbyj7LqjkW5D-yi34IOymvY71XT3B7YBs1CIV5e0dkI_iJ3Clh_H7X5AKOHgtnM66zXS6Ru24DT2ZecdnSvOGaU8yp0Ve4qimm9aKV3YcFDba3STE6MHLJP36Y1pVU7RpoNRnYL0bZuZWjzc-JhwRfgLHpkSCe6kyNgoJOdphgBcKgZTSGPEzYs1A',
    attendancePercent: 97.5,
    totalPresent: 78,
    totalSickPermit: 2,
    totalAlpha: 0,
    parentName: 'H. Bambang Fauzi',
    parentPhone: '081234567890',
    notes: '"Siswa aktif & berprestasi, saat ini sedang persiapan intensif lomba LKS Web Technology tingkat kota. Pertahankan kedisiplinan waktu kehadiran."',
    history: [
      { date: 'Senin, 10 Mar 2025', detail: '06.42 WIB • RFID Gerbang Utama', type: 'H', tag: 'Tepat Waktu' },
      { date: 'Jumat, 07 Mar 2025', detail: '06.38 WIB • RFID Gerbang Utama', type: 'H', tag: 'Tepat Waktu' },
      { date: 'Kamis, 06 Mar 2025', detail: 'Dispensasi Lomba LKS Web Dev', type: 'I', tag: 'Surat Tugas' },
      { date: 'Rabu, 05 Mar 2025', detail: '06.45 WIB • Scan QR Guru', type: 'H', tag: 'Tepat Waktu' },
      { date: 'Selasa, 04 Mar 2025', detail: '06.30 WIB • RFID Gerbang Utama', type: 'H', tag: 'Tepat Waktu' }
    ]
  },
  {
    id: 'std-2',
    number: '#02',
    name: 'Clarissa Amanda',
    nisn: '0067182903',
    className: 'XII RPL 1',
    major: 'RPL',
    status: 'S',
    timeNote: 'Surat Dokter Terlampir',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJqPkzjIuhGUjyQWEKLaS_3WuYFPnqBLYAxc9Cx3A0q6d_fRdtYXfKz7GxO7vN1rwtLax8nj8eqx0b7bVLW9OEF8vYmXGHJYi8Uj6wngivswoTcSNZ5J7VZeynUNDIHIwTotq66UmOQR1hRFj0ygvLTGI3Yj33yaQJ64WtV6yKP7r4EA0nBLtEYQIgipDWUtlneqtWjmWUrh4YPM2QbrmYQCc_0GYolfSDI5VFmPvVeBnqly3YwI0aEQ',
    attendancePercent: 94.8,
    totalPresent: 74,
    totalSickPermit: 4,
    totalAlpha: 0,
    parentName: 'Ibu Ratna Amanda',
    parentPhone: '081234567891',
    notes: 'Istirahat di rumah sesuai anjuran dokter klinik Telkom Medika selama 2 hari.',
    history: [
      { date: 'Senin, 10 Mar 2025', detail: 'Surat Dokter Terlampir (Flu & Demam)', type: 'S', tag: 'Surat Dokter' },
      { date: 'Jumat, 07 Mar 2025', detail: '06.35 WIB • RFID Gerbang Utama', type: 'H', tag: 'Tepat Waktu' },
      { date: 'Kamis, 06 Mar 2025', detail: '06.40 WIB • RFID Gerbang Utama', type: 'H', tag: 'Tepat Waktu' }
    ]
  },
  {
    id: 'std-3',
    number: '#03',
    name: 'Dimas Pratama',
    nisn: '0061298451',
    className: 'XII RPL 1',
    major: 'RPL',
    status: 'I',
    timeNote: 'Lomba LKS Web Dev',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh4GBLC0eFs5WFuw1vswOD5ne0v19U3mJ4QpssKVBUOZ0xQTqaB7ZH8F46wL2iOXTpInT0cJLIFwOa4L4Ni5YCJsNCtCbxbjYY-cY2d_oLp5V04hfavZWhPFC_C-8TXZQtHIbv9vMopsM-rnImB_XKkfyY5g-pdEcxD_glbhtFYQRVsmUzN15sDGdjNicAOwTC4Hpq3e0YmFb7DipeDfXlDpFGZ6C9902KNjZF4T8Vg2Ihd5kXf4FHSw',
    attendancePercent: 96.0,
    totalPresent: 76,
    totalSickPermit: 3,
    totalAlpha: 0,
    parentName: 'Bpk. Hendro Pratama',
    parentPhone: '081234567892',
    notes: 'Mewakili sekolah dalam ajang Lomba Keterampilan Siswa (LKS) Bidang Web Technologies.',
    history: [
      { date: 'Senin, 10 Mar 2025', detail: 'Dispensasi Surat Tugas LKS', type: 'I', tag: 'Lomba' },
      { date: 'Jumat, 07 Mar 2025', detail: '06.30 WIB • RFID Gerbang Utama', type: 'H', tag: 'Tepat Waktu' }
    ]
  },
  {
    id: 'std-4',
    number: '#04',
    name: 'Eko Prasetyo',
    nisn: '0064920194',
    className: 'XII RPL 1',
    major: 'RPL',
    status: 'A',
    timeNote: 'Belum Hadir / Tanpa Keterangan',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjm8mrCUCMNd2rZHP8Aklc7F9gvwA-X-QS-bfaSeJ4JB8ZgtlC_ZJcUshahuJUM6cHS9gzbBW2_FPlJCDxxaNfqT2HSlsbRcAiy-ECjf3sWSmpMg2r-5bDIS1ZZEls9LMSO9JW2qtHrAYuZwozDNW4Ot1zCf4QP5pDlamLMVg9zy92oNjlncm6lRHWw6OWDyYDL_FHNLcWeJ5BjwkuyNnJMQKV5kwda8Jp24sjJTzdlRmZW2LSdBdHJg',
    attendancePercent: 88.2,
    totalPresent: 70,
    totalSickPermit: 2,
    totalAlpha: 3,
    parentName: 'Ibu Sulastri',
    parentPhone: '081234567893',
    notes: 'Perlu konfirmasi ke orang tua terkait ketidakhadiran berturut-turut.',
    history: [
      { date: 'Senin, 10 Mar 2025', detail: 'Belum Ada Kabar / Alpha', type: 'A', tag: 'Alpa' },
      { date: 'Jumat, 07 Mar 2025', detail: '06.44 WIB • RFID Gerbang Utama', type: 'H', tag: 'Tepat Waktu' }
    ]
  },
  {
    id: 'std-5',
    number: '#05',
    name: 'Farah Nabila',
    nisn: '0068593810',
    className: 'XII RPL 1',
    major: 'RPL',
    status: 'H',
    timeNote: '06.35 WIB • Gerbang Utama',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzoVL7OubfgiTwOVhvyvwiL30IYjWJMyC2KFnKzNhKtshzRMggEDPX8nkuYVA_O__1G98R-3Mkpdbn6IQtpPl6JSRWjCM_sxjnWh4aftN1llhuhEIbu2_bUH_humdTF9NeZHC-_UqUGFdTihbejZeAEfwjp4f9-_FNMf5g7TpKXNkhzlJohxzfBJb0K9piL8gPTSOKJBeEWk0wjP1YlYyvtPEmose0bcFN13TATnSddYM8k5j6SaQqmw',
    attendancePercent: 98.7,
    totalPresent: 79,
    totalSickPermit: 1,
    totalAlpha: 0,
    parentName: 'Bpk. Ahmad Nabila',
    parentPhone: '081234567894',
    notes: 'Disiplin dan aktif sebagai pengurus OSIS SMK Telkom.',
    history: [
      { date: 'Senin, 10 Mar 2025', detail: '06.35 WIB • Gerbang Utama', type: 'H', tag: 'Tepat Waktu' },
      { date: 'Jumat, 07 Mar 2025', detail: '06.30 WIB • RFID Gerbang Utama', type: 'H', tag: 'Tepat Waktu' }
    ]
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tch-1',
    initials: 'BS',
    name: 'Pak Budi Santoso, S.Kom',
    role: 'Wali Kelas XII RPL 1',
    nip: '198503152010011012',
    category: 'Produktif',
    department: 'RPL',
    specialization: ['Guru Produktif RPL', 'Pemrograman Web & Mobile'],
    statusBadge: 'Sedang Mengajar: Lab RPL 3',
    statusType: 'mengajar',
    checkInTime: '06.30',
    phone: '6281234567890'
  },
  {
    id: 'tch-2',
    initials: 'RJ',
    name: 'Ibu Ratna Juwita, M.Pd',
    role: 'Normatif / Adaptif',
    nip: '199008222015022003',
    category: 'Normatif',
    department: 'Normatif & Adaptif',
    specialization: ['Matematika Terapan', 'Hadir Tepat Waktu'],
    statusBadge: 'Ruang Guru (Persiapan Jam Ke-5 di X TKJ 2)',
    statusType: 'ruang_guru',
    checkInTime: '06.40',
    phone: '6281234567891'
  },
  {
    id: 'tch-3',
    initials: 'HW',
    name: 'Pak Hendra Wijaya, S.T',
    role: 'Kepala Bengkel Jaringan',
    nip: '198811042012011005',
    category: 'TKJ',
    department: 'TKJ',
    specialization: ['Guru Produktif TKJ', 'Adm. Infrastruktur Jaringan (AIJ)'],
    statusBadge: 'Sedang Mengajar: Lab Cisco',
    statusType: 'mengajar',
    checkInTime: '06.35',
    phone: '6281234567892'
  },
  {
    id: 'tch-4',
    initials: 'SN',
    name: 'Ibu Siti Nurhaliza, S.Ds',
    role: 'Tugas Luar Resmi',
    nip: '199405102020012018',
    category: 'DKV',
    department: 'DKV',
    specialization: ['Guru Desain Komunikasi Visual (DKV)', 'Surat Tugas Terlampir'],
    statusBadge: 'Pendampingan Lomba Desain Grafis Nasional',
    statusType: 'tugas',
    checkInTime: 'TUGAS',
    phone: '6281234567893'
  },
  {
    id: 'tch-5',
    initials: 'AP',
    name: 'Pak Agung Prasetyo, M.Kom',
    role: 'Izin Sakit (Dokter Terlampir)',
    nip: '198207192008011004',
    category: 'Produktif',
    department: 'RPL',
    specialization: ['Guru Rekayasa Perangkat Lunak', 'Inval: Diisi Pak Budi Santoso'],
    statusBadge: 'Surat Sakit RS Telogorejo',
    statusType: 'sakit',
    checkInTime: 'SAKIT',
    phone: '6281234567894',
    invalReplacement: 'Pak Budi Santoso'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Pemberitahuan Cuaca Ekstrem & Penyesuaian KBM Daring Pukul 12:00 WIB',
    category: 'URGENT / PENTING HARI INI',
    urgent: true,
    timeAgo: 'Hari ini, 07:15 WIB',
    division: 'Disposisi Kepala Sekolah',
    description: 'Berdasarkan instruksi BMKG & Dinas Pendidikan, KBM tatap muka dialihkan ke LMS Telkom Edu mulai sesi siang. Seluruh siswa wajib mengisi presensi daring.'
  },
  {
    id: 'ann-2',
    title: 'Jadwal Asesmen Sumatif Tengah Semester (ASTS) Genap 2024/2025',
    category: 'Akademik',
    timeAgo: '2 jam yang lalu',
    division: 'Divisi Kurikulum & Penilaian',
    description: 'Draft final denah ruang ujian, pembagian sesi lab komputer RPL dan TKJ, serta kartu peserta ujian digital dapat diunduh mulai hari ini.',
    attachments: '2 Lampiran (PDF)',
    views: 342
  },
  {
    id: 'ann-3',
    title: 'Selamat! Tim Web Dev SMK Telkom Raih Juara 1 LKS Tingkat Kota',
    category: 'Kesiswaan & Prestasi',
    timeAgo: 'Kemarin, 16:30 WIB',
    division: 'Bidang Kesiswaan & Ekstrakurikuler',
    description: 'Apresiasi luar biasa untuk Ananda Ahmad Fauzi dan Dimas Pratama (XII RPL 1) atas dedikasi dan kerja keras membanggakan almamater.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtnNzcYmDkksNa4DHbMksYhu2_hNB-La1S5Odb_4IKe_50H5kz54eIsXnBpGQajCxPkidPX0lAz3fR6nxd6DyxP8Z_NzCCpNm5LwZhA0erGi4c1nWIKV1o-Hub0HOokN_h_3uZJiDIftP4D2zPsryrcQJjRPaXF5e-fryB5fzq7k6tXto_Orm05Fau9Ua88ak2mJXy3NL1vCdwj8b3rgpEAKlKR0HHSqz595j0MZPNbDlZDTo0Jenu_g',
    likes: 189
  },
  {
    id: 'ann-4',
    title: 'Pembekalan & Pelepasan Siswa Magang Industri PT Telkom Indonesia',
    category: 'Hubin & BKK',
    timeAgo: '3 hari yang lalu',
    division: 'Hubungan Industri & Praktik Kerja',
    description: 'Sesi briefing wajib bersama pembimbing industri bagi seluruh siswa kelas XI di Aula Gedung Telkom lantai 3.',
    location: 'Aula Gedung Telkom Lt. 3',
    dateScheduled: 'Jumat, 08:30 WIB'
  },
  {
    id: 'ann-5',
    title: 'Sosialisasi Kebijakan Baru Presensi RFID & Toleransi Jam Masuk',
    category: 'Tata Tertib & BK',
    timeAgo: '5 hari yang lalu',
    division: 'Tim Kedisiplinan Sekolah',
    description: 'Gerbang utama ditutup tepat pukul 06.45 WIB. Siswa yang hadir setelahnya wajib melapor ke pos piket kedisiplinan.',
    gateClosing: 'Pintu Gerbang: 06:45 WIB'
  }
];
