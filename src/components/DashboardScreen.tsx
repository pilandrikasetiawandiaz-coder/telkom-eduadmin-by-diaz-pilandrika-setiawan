import React, { useState } from 'react';

interface DashboardScreenProps {
  onNavigateTab: (tab: 'dashboard' | 'siswa' | 'guru' | 'absensi' | 'menu') => void;
  onOpenQuickScan: () => void;
  onOpenAddStudent: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigateTab,
  onOpenQuickScan,
  onOpenAddStudent,
}) => {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [chartTarget, setChartTarget] = useState<'siswa' | 'guru'>('siswa');
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const stats = {
    today: { siswa: '1.248', guru: '84', rombel: '36', attendance: '96.4%', trend: '+2.1%' },
    week: { siswa: '1.248', guru: '84', rombel: '36', attendance: '95.2%', trend: '+1.4%' },
    month: { siswa: '1.236', guru: '82', rombel: '36', attendance: '94.8%', trend: '+3.2%' },
  }[period];

  const chartData = chartTarget === 'siswa' ? [
    { day: 'Sen', percent: 95 },
    { day: 'Sel', percent: 97 },
    { day: 'Rab', percent: 96.4, current: true },
    { day: 'Kam', percent: 94 },
    { day: 'Jum', percent: 92 },
  ] : [
    { day: 'Sen', percent: 98 },
    { day: 'Sel', percent: 99 },
    { day: 'Rab', percent: 97.5, current: true },
    { day: 'Kam', percent: 96 },
    { day: 'Jum', percent: 95 },
  ];

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md antialiased pb-32 md:pb-12 min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1b1c1c] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 animate-in slide-in-from-top">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Desktop Navigation Drawer */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-72 bg-white border-r border-[#e9bcb6]/30 shadow-2xl p-4 z-50">
        <div className="flex items-center gap-3 px-2 py-4 mb-4 border-b border-[#e9bcb6]/20">
          <div className="w-10 h-10 rounded-xl bg-[#e60012] text-white flex items-center justify-center font-bold shadow-md">
            <span className="material-symbols-outlined fill">school</span>
          </div>
          <div>
            <h2 className="text-base text-[#b7000c] tracking-tight font-bold font-headline">SMK Telkom</h2>
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ffdad5] text-[#b7000c]">
              T.A. 2024/2025 Genap
            </span>
          </div>
        </div>

        {/* Admin Profile Strip */}
        <div className="flex items-center gap-3 p-3 mb-6 rounded-xl bg-[#f5f3f3] border border-[#e9bcb6]/20">
          <div className="w-10 h-10 rounded-full bg-[#ffdad5] text-[#b7000c] flex items-center justify-center font-bold text-sm">
            BS
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate text-[#1b1c1c]">Pak Budi Santoso</p>
            <p className="text-xs text-[#675555] truncate">admin@smktelkom.sch.id</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="space-y-1.5 flex-1">
          <button 
            onClick={() => onNavigateTab('dashboard')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#ffdad5] text-[#410001] font-semibold text-xs text-left"
          >
            <span className="material-symbols-outlined text-[#b7000c] fill">dashboard</span>
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => onNavigateTab('siswa')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#5f3f3b] hover:bg-[#eae8e7] hover:text-[#1b1c1c] transition-colors duration-150 text-xs text-left"
          >
            <span className="material-symbols-outlined">groups</span>
            <span>Data Siswa</span>
          </button>
          <button 
            onClick={() => onNavigateTab('guru')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#5f3f3b] hover:bg-[#eae8e7] hover:text-[#1b1c1c] transition-colors duration-150 text-xs text-left"
          >
            <span className="material-symbols-outlined">badge</span>
            <span>Data Guru &amp; Staf</span>
          </button>
          <button 
            onClick={() => onNavigateTab('absensi')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#5f3f3b] hover:bg-[#eae8e7] hover:text-[#1b1c1c] transition-colors duration-150 text-xs text-left"
          >
            <span className="material-symbols-outlined">fact_check</span>
            <span>Rekap Presensi</span>
          </button>
          <button 
            onClick={() => onNavigateTab('menu')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#5f3f3b] hover:bg-[#eae8e7] hover:text-[#1b1c1c] transition-colors duration-150 text-xs text-left"
          >
            <span className="material-symbols-outlined">campaign</span>
            <span>Pengumuman &amp; Berita</span>
          </button>
        </nav>

        <div className="pt-4 border-t border-[#e9bcb6]/20">
          <button 
            onClick={() => {
              setToastMessage('Sesi administrator aktif');
              setTimeout(() => setToastMessage(null), 1500);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[#ba1a1a] hover:bg-red-50 transition-all text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>Keluar Portal</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            onClick={() => setIsMobileDrawerOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in" 
          />
          <div className="relative w-4/5 max-w-xs h-full bg-white shadow-2xl p-4 flex flex-col justify-between animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#e9bcb6]/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#e60012] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-base fill">school</span>
                  </div>
                  <span className="text-base font-bold text-[#b7000c] font-headline">SMK Telkom</span>
                </div>
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="py-4 space-y-1">
                <button 
                  onClick={() => { onNavigateTab('dashboard'); setIsMobileDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#ffdad5] text-[#410001] font-semibold text-xs text-left"
                >
                  <span className="material-symbols-outlined text-[#b7000c] fill">dashboard</span>
                  <span>Dashboard</span>
                </button>
                <button 
                  onClick={() => { onNavigateTab('siswa'); setIsMobileDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#5f3f3b] hover:bg-[#eae8e7] text-xs text-left"
                >
                  <span className="material-symbols-outlined">groups</span>
                  <span>Data Siswa</span>
                </button>
                <button 
                  onClick={() => { onNavigateTab('guru'); setIsMobileDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#5f3f3b] hover:bg-[#eae8e7] text-xs text-left"
                >
                  <span className="material-symbols-outlined">badge</span>
                  <span>Data Guru &amp; Staf</span>
                </button>
                <button 
                  onClick={() => { onNavigateTab('absensi'); setIsMobileDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#5f3f3b] hover:bg-[#eae8e7] text-xs text-left"
                >
                  <span className="material-symbols-outlined">fact_check</span>
                  <span>Rekap Presensi</span>
                </button>
                <button 
                  onClick={() => { onNavigateTab('menu'); setIsMobileDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#5f3f3b] hover:bg-[#eae8e7] text-xs text-left"
                >
                  <span className="material-symbols-outlined">campaign</span>
                  <span>Pengumuman &amp; Berita</span>
                </button>
              </div>
            </div>

            <div className="p-3 bg-[#f5f3f3] rounded-xl border border-[#e9bcb6]/20 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#e60012] text-white flex items-center justify-center font-bold text-xs">
                BS
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#1b1c1c]">Pak Budi Santoso</p>
                <p className="text-[11px] text-[#675555]">Admin Akademik</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main View Container */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="top-0 sticky z-40 bg-white/80 backdrop-blur-md shadow-xs transition-colors duration-150 border-b border-[#e9bcb6]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
            {/* Brand & Drawer Trigger */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMobileDrawerOpen(true)}
                aria-label="Buka menu navigasi" 
                className="lg:hidden p-2 rounded-xl text-[#5f3f3b] hover:bg-[#eae8e7] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#e60012] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined fill">school</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base text-[#b7000c] font-bold tracking-tight font-headline">SMK Telkom</span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ffdad5] text-[#b7000c] border border-[#e9bcb6]/30">
                      T.A. 2024/2025 Genap
                    </span>
                  </div>
                  <span className="sm:hidden block text-[10px] font-medium text-[#675555] leading-none">2024/2025 Genap</span>
                </div>
              </div>
            </div>

            {/* Quick Search */}
            <div className="flex-1 max-w-md mx-2 hidden sm:block">
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#675555] text-lg">search</span>
                <input 
                  onClick={() => onNavigateTab('siswa')}
                  readOnly
                  className="w-full h-10 pl-9 pr-4 text-xs md:text-sm bg-[#f5f3f3] border border-[#e9bcb6]/30 rounded-xl cursor-pointer text-[#1b1c1c] placeholder:text-[#675555]/70 outline-none hover:border-[#b7000c]" 
                  placeholder="Cari data siswa, guru, kelas..." 
                  type="text"
                />
              </div>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <button 
                  onClick={() => onNavigateTab('menu')}
                  aria-label="Notifikasi" 
                  className="p-2 rounded-xl text-[#5f3f3b] hover:bg-[#eae8e7] transition-colors active:scale-95 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#e60012] rounded-full ring-2 ring-white animate-pulse"></span>
              </div>

              <div 
                onClick={() => {
                  setToastMessage('Akun Admin: Pak Budi Santoso (Wali Kelas XII RPL 1)');
                  setTimeout(() => setToastMessage(null), 2000);
                }}
                className="flex items-center gap-2 pl-2 py-1 pr-2 rounded-full bg-[#efeded] border border-[#e9bcb6]/20 hover:bg-[#eae8e7] transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#e60012] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  BS
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-[#1b1c1c] leading-tight">Pak Budi Santoso</p>
                  <p className="text-[10px] text-[#675555] leading-tight">Admin Akademik</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-6">
          {/* Mobile Search Bar */}
          <div className="block sm:hidden">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#675555] text-xl">search</span>
              <input 
                onClick={() => onNavigateTab('siswa')}
                readOnly
                className="w-full h-11 pl-10 pr-4 text-sm bg-white border border-[#e9bcb6]/30 rounded-xl shadow-xs text-[#1b1c1c] placeholder:text-[#675555]/60 outline-none cursor-pointer" 
                placeholder="Cari siswa, guru, atau kelas..." 
                type="text"
              />
            </div>
          </div>

          {/* 2. Greeting & Quick Filter */}
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-3xl text-[#1b1c1c] font-bold tracking-tight font-headline">
                Selamat Datang, Pak Budi <span className="inline-block animate-bounce">👋</span>
              </h1>
              <p className="text-xs md:text-sm text-[#675555] mt-0.5">
                Ringkasan akademik &amp; absensi hari ini, <span className="font-semibold text-[#1b1c1c]">Rabu, 24 Okt 2024</span>
              </p>
            </div>

            {/* Period Filter Pills */}
            <div className="inline-flex p-1 rounded-xl bg-[#efeded] border border-[#e9bcb6]/20 self-start md:self-auto shadow-xs">
              <button 
                onClick={() => setPeriod('today')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  period === 'today' ? 'bg-[#e60012] text-white shadow-xs' : 'text-[#675555] hover:text-[#1b1c1c]'
                }`}
              >
                Hari Ini
              </button>
              <button 
                onClick={() => setPeriod('week')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  period === 'week' ? 'bg-[#e60012] text-white shadow-xs' : 'text-[#675555] hover:text-[#1b1c1c]'
                }`}
              >
                Minggu Ini
              </button>
              <button 
                onClick={() => setPeriod('month')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  period === 'month' ? 'bg-[#e60012] text-white shadow-xs' : 'text-[#675555] hover:text-[#1b1c1c]'
                }`}
              >
                Bulan Ini
              </button>
            </div>
          </section>

          {/* 3. Statistik Utama */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Card 1: Total Siswa */}
            <div 
              onClick={() => onNavigateTab('siswa')}
              className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#675555] font-medium">Total Siswa</span>
                <div className="w-10 h-10 rounded-xl bg-[#FFE5E5] text-[#b7000c] flex items-center justify-center">
                  <span className="material-symbols-outlined fill">school</span>
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1b1c1c] tracking-tight font-headline">
                  {stats.siswa}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] sm:text-xs font-semibold text-[#15803D]">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span>+12 bulan ini</span>
                </div>
              </div>
            </div>

            {/* Card 2: Total Guru & Staf */}
            <div 
              onClick={() => onNavigateTab('guru')}
              className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#675555] font-medium">Total Guru &amp; Staf</span>
                <div className="w-10 h-10 rounded-xl bg-[#FFE5E5] text-[#b7000c] flex items-center justify-center">
                  <span className="material-symbols-outlined fill">badge</span>
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1b1c1c] tracking-tight font-headline">
                  {stats.guru}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] sm:text-xs font-medium text-[#675555]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  <span>98% hadir hari ini</span>
                </div>
              </div>
            </div>

            {/* Card 3: Total Rombel */}
            <div 
              onClick={() => onNavigateTab('siswa')}
              className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#675555] font-medium">Total Rombel</span>
                <div className="w-10 h-10 rounded-xl bg-[#FFE5E5] text-[#b7000c] flex items-center justify-center">
                  <span className="material-symbols-outlined fill">groups</span>
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1b1c1c] tracking-tight font-headline">
                  {stats.rombel}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] sm:text-xs text-[#b7000c] font-semibold truncate">
                  <span className="px-1.5 py-0.5 rounded bg-[#FFE5E5]">RPL</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#FFE5E5]">TKJ</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#FFE5E5]">DKV</span>
                </div>
              </div>
            </div>

            {/* Card 4: Kehadiran Hari Ini */}
            <div 
              onClick={() => onNavigateTab('absensi')}
              className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between border-l-4 border-l-[#e60012] transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#675555] font-medium">Kehadiran Hari Ini</span>
                <div className="w-10 h-10 rounded-xl bg-[#FFE5E5] text-[#b7000c] flex items-center justify-center">
                  <span className="material-symbols-outlined fill">fact_check</span>
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-[#1b1c1c] tracking-tight font-headline">
                    {stats.attendance}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-[#15803D]">
                    {stats.trend}
                  </span>
                </div>
                <div className="w-full bg-[#eae8e7] h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-[#e60012] h-full rounded-full transition-all duration-700" style={{ width: stats.attendance }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Grafik Kehadiran Mingguan & Live Classes */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Attendance Chart Card */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-6 bg-[#b7000c] rounded-full"></div>
                  <div>
                    <h3 className="text-base font-bold text-[#1b1c1c] font-headline">Tren Kehadiran Mingguan</h3>
                    <p className="text-xs text-[#675555]">Monitoring stabilitas presensi Senin - Jumat</p>
                  </div>
                </div>

                <div className="inline-flex p-0.5 rounded-lg bg-[#efeded] border border-[#e9bcb6]/30 text-xs font-semibold self-start sm:self-auto">
                  <button 
                    onClick={() => setChartTarget('siswa')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      chartTarget === 'siswa' ? 'bg-white text-[#b7000c] shadow-xs' : 'text-[#675555] hover:text-[#1b1c1c]'
                    }`}
                  >
                    Siswa
                  </button>
                  <button 
                    onClick={() => setChartTarget('guru')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      chartTarget === 'guru' ? 'bg-white text-[#b7000c] shadow-xs' : 'text-[#675555] hover:text-[#1b1c1c]'
                    }`}
                  >
                    Guru
                  </button>
                </div>
              </div>

              {/* Chart Visual Area */}
              <div className="relative pt-6 pb-2">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-25">
                  <div className="border-b border-[#e9bcb6]/50 w-full text-[10px] text-[#675555] font-mono">100%</div>
                  <div className="border-b border-[#e9bcb6]/50 w-full text-[10px] text-[#675555] font-mono">95%</div>
                  <div className="border-b border-[#e9bcb6]/50 w-full text-[10px] text-[#675555] font-mono">90%</div>
                  <div className="border-b border-[#e9bcb6]/50 w-full text-[10px] text-[#675555] font-mono">85%</div>
                </div>

                <div className="relative flex items-end justify-between h-44 px-3 sm:px-8 z-10">
                  {chartData.map((item) => {
                    const isHovered = hoveredDay === item.day;
                    const heightPercent = Math.max(30, (item.percent - 80) * 5);

                    return (
                      <div 
                        key={item.day}
                        onMouseEnter={() => setHoveredDay(item.day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className="flex flex-col items-center gap-2 relative flex-1 max-w-[48px] cursor-pointer"
                      >
                        {item.current ? (
                          <div className="absolute -top-7 bg-[#e60012] text-white text-[10px] font-bold py-0.5 px-2 rounded-full shadow-md whitespace-nowrap animate-pulse">
                            {item.percent}% Hari ini
                          </div>
                        ) : isHovered ? (
                          <div className="absolute -top-7 bg-[#1b1c1c] text-white text-[10px] font-bold py-0.5 px-2 rounded-full shadow-md whitespace-nowrap">
                            {item.percent}%
                          </div>
                        ) : null}

                        <div className={`w-full rounded-t-lg h-32 flex items-end justify-center transition-all ${
                          item.current ? 'bg-[#ffdad5]' : 'bg-[#eae8e7] hover:bg-[#ffdad5]'
                        }`}>
                          <div 
                            className={`w-full rounded-t-lg transition-all ${
                              item.current ? 'bg-[#e60012] shadow-xs' : 'bg-[#675555]/40 hover:bg-[#e60012]'
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>
                        <span className={`text-xs font-semibold ${item.current ? 'text-[#b7000c] font-bold' : 'text-[#5f3f3b]'}`}>
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart Legend */}
              <div className="mt-4 pt-3 border-t border-[#e9bcb6]/20 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#5f3f3b] font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#e60012]"></span>
                  <span>Hadir (96.4%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#F59E0B]"></span>
                  <span>Izin / Sakit (2.6%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#EF4444]"></span>
                  <span>Alpa (1.0%)</span>
                </div>
              </div>
            </div>

            {/* Live Status Card */}
            <div className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#e9bcb6]/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <h4 className="text-sm font-bold text-[#1b1c1c] font-headline">Live Kelas Berlangsung</h4>
                  </div>
                  <span className="text-[11px] font-bold text-[#b7000c] bg-[#FFE5E5] px-2 py-0.5 rounded-full">
                    Jam Ke 5-6
                  </span>
                </div>

                <div className="mt-3.5 space-y-2.5">
                  <div 
                    onClick={() => onNavigateTab('siswa')}
                    className="p-3 rounded-xl bg-[#f5f3f3] border border-[#e9bcb6]/15 flex items-center justify-between cursor-pointer hover:bg-white hover:shadow-xs transition-all"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#1b1c1c]">XII RPL 1</p>
                      <p className="text-[11px] text-[#675555]">Pemrograman Web &amp; Mobile</p>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Lab RPL 3
                    </span>
                  </div>

                  <div 
                    onClick={() => onNavigateTab('siswa')}
                    className="p-3 rounded-xl bg-[#f5f3f3] border border-[#e9bcb6]/15 flex items-center justify-between cursor-pointer hover:bg-white hover:shadow-xs transition-all"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#1b1c1c]">XI TKJ 2</p>
                      <p className="text-[11px] text-[#675555]">Administrasi Infrastruktur Jaringan</p>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Lab Cisco
                    </span>
                  </div>

                  <div 
                    onClick={() => onNavigateTab('siswa')}
                    className="p-3 rounded-xl bg-[#f5f3f3] border border-[#e9bcb6]/15 flex items-center justify-between cursor-pointer hover:bg-white hover:shadow-xs transition-all"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#1b1c1c]">X DKV 3</p>
                      <p className="text-[11px] text-[#675555]">Dasar Desain Komunikasi Visual</p>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Studio 2
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e9bcb6]/20 flex items-center justify-between text-xs text-[#675555]">
                <span>Sinkronisasi otomatis</span>
                <span className="font-semibold text-[#b7000c]">Baru saja</span>
              </div>
            </div>
          </section>

          {/* 5. Aktivitas Terbaru */}
          <section className="glass-card rounded-2xl p-4 sm:p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7000c]">history</span>
                <h3 className="text-base font-bold text-[#1b1c1c] font-headline">Aktivitas Akademik Terkini</h3>
              </div>
              <button 
                onClick={() => onNavigateTab('menu')}
                className="text-xs text-[#b7000c] font-semibold hover:underline flex items-center gap-0.5"
              >
                <span>Lihat Semua</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>

            <div className="divide-y divide-[#e9bcb6]/15">
              <div className="py-3 flex items-start gap-3 hover:bg-[#eae8e7]/30 rounded-xl px-2 transition-colors">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg fill">check_circle</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#1b1c1c] truncate">Absensi Kelas XI RPL 1 Diserahkan</p>
                  <p className="text-[11px] text-[#675555] mt-0.5">Oleh Bu Ratna S.Pd • 34 Hadir, 2 Sakit</p>
                </div>
                <span className="text-[11px] font-medium text-[#675555] whitespace-nowrap">10 menit lalu</span>
              </div>

              <div className="py-3 flex items-start gap-3 hover:bg-[#eae8e7]/30 rounded-xl px-2 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#FFE5E5] text-[#b7000c] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">person_add</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#1b1c1c] truncate">Siswa Baru Terdaftar: Dimas Pratama</p>
                  <p className="text-[11px] text-[#675555] mt-0.5">Jurusan Rekayasa Perangkat Lunak • NIS 20241088</p>
                </div>
                <span className="text-[11px] font-medium text-[#675555] whitespace-nowrap">35 menit lalu</span>
              </div>

              <div className="py-3 flex items-start gap-3 hover:bg-[#eae8e7]/30 rounded-xl px-2 transition-colors">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">event_note</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#1b1c1c] truncate">Jadwal Ujian Tengah Semester Diperbarui</p>
                  <p className="text-[11px] text-[#675555] mt-0.5">Kurikulum SMK Telkom merilis revisi jadwal ruang 04</p>
                </div>
                <span className="text-[11px] font-medium text-[#675555] whitespace-nowrap">2 jam lalu</span>
              </div>

              <div className="py-3 flex items-start gap-3 hover:bg-[#eae8e7]/30 rounded-xl px-2 transition-colors">
                <div className="w-9 h-9 rounded-full bg-red-100 text-[#e60012] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">warning</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#e60012] truncate">Peringatan Alpa Siswa: 3 Siswa X TKJ 2</p>
                  <p className="text-[11px] text-[#675555] mt-0.5">Sistem Otomatis Presensi mendeteksi tanpa keterangan &gt; 2 hari</p>
                </div>
                <span className="text-[11px] font-medium text-[#675555] whitespace-nowrap">3 jam lalu</span>
              </div>
            </div>
          </section>
        </main>

        {/* Floating Quick Action Area */}
        <div className="fixed bottom-16 sm:bottom-20 right-4 left-4 z-40 max-w-md mx-auto pointer-events-none flex justify-end">
          <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-[#e9bcb6]/30">
            <button 
              onClick={onOpenQuickScan}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#e60012] hover:bg-[#b7000c] text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-base">add_task</span>
              <span>Presensi Cepat</span>
            </button>
            <button 
              onClick={onOpenAddStudent}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#efeded] hover:bg-[#eae8e7] text-[#1b1c1c] text-xs font-semibold active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-base text-[#b7000c]">person_add</span>
              <span>Siswa Baru</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
