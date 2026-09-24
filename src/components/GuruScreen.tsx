import React, { useState, useMemo } from 'react';
import { Teacher } from '../data/mockData';

interface GuruScreenProps {
  teachers: Teacher[];
  onOpenFilter: () => void;
  onOpenPlotInval: (teacher?: Teacher) => void;
  onBackToDashboard: () => void;
}

export const GuruScreen: React.FC<GuruScreenProps> = ({
  teachers,
  onOpenFilter,
  onOpenPlotInval,
  onBackToDashboard,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState<'all' | 'mengajar' | 'piket' | 'tugas' | 'sakit'>('all');
  const [selectedAgendaTeacher, setSelectedAgendaTeacher] = useState<Teacher | null>(null);
  const [selectedStpTeacher, setSelectedStpTeacher] = useState<Teacher | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.nip.includes(searchQuery) ||
        teacher.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!matchSearch) return false;

      if (activeChip === 'mengajar') return teacher.statusType === 'mengajar';
      if (activeChip === 'piket') return teacher.statusType === 'piket';
      if (activeChip === 'tugas') return teacher.statusType === 'tugas';
      if (activeChip === 'sakit') return teacher.statusType === 'sakit';
      return true;
    });
  }, [teachers, searchQuery, activeChip]);

  const handleExport = () => {
    const csvContent = 'NIP,Nama,Peran,Status,Waktu\n' + teachers.map(t => `"${t.nip}","${t.name}","${t.role}","${t.statusBadge}","${t.checkInTime}"`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Data_Guru_Presensi_SMK_Telkom.csv';
    a.click();
    URL.revokeObjectURL(url);
    setToastMessage('Data guru berhasil diekspor!');
    setTimeout(() => setToastMessage(null), 2000);
  };

  return (
    <div className="bg-[#F5F5F7] text-[#1b1c1c] antialiased min-h-screen flex flex-col justify-between pb-32">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1b1c1c] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 animate-in slide-in-from-top">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP APP BAR */}
      <header className="bg-white/80 backdrop-blur-md text-[#b7000c] top-0 sticky z-40 shadow-xs transition-colors duration-150 border-b border-[#e9bcb6]/30">
        <div className="flex justify-between items-center w-full px-4 h-14 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <button 
              onClick={onBackToDashboard}
              aria-label="Kembali ke Dashboard" 
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#5f3f3b] hover:bg-[#eae8e7] hover:text-[#b7000c] transition-colors duration-150 active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <h1 className="text-[18px] font-bold text-[#1b1c1c] tracking-tight font-headline">
                Data Guru &amp; Staf
              </h1>
              <p className="text-[11px] text-[#5f3f3b] hidden md:block">
                Manajemen Presensi &amp; Tenaga Kependidikan SMK Telkom
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button 
              onClick={onOpenFilter}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#5f3f3b] hover:bg-[#eae8e7] hover:text-[#b7000c] transition-colors duration-150 active:scale-95 relative" 
              title="Filter Rombel / Jurusan"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#e60012]"></span>
            </button>
            <button 
              onClick={handleExport}
              className="h-9 px-3 rounded-xl bg-[#ffdad5] text-[#410001] flex items-center gap-1.5 text-xs font-semibold hover:bg-[#ffdad5]/80 transition-colors duration-150 active:scale-95" 
              title="Ekspor Rekap"
            >
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              <span className="hidden sm:inline">Ekspor</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CANVAS */}
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-4 space-y-4 flex-1">
        {/* BANNER SESI AKTIF (Live Class Status) */}
        <section className="glass-card rounded-2xl p-4 border border-[#e9bcb6]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600">
              <span className="material-symbols-outlined text-xl">schedule</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#1b1c1c] font-bold font-headline">Jam Ke-4 Berlangsung</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 tracking-wide">
                  AKTIF
                </span>
              </div>
              <p className="text-xs text-[#5f3f3b]">Semua kelas terisi guru &amp; tenaga pengajar terverifikasi</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-[#5f3f3b] font-semibold bg-white px-2.5 py-1 rounded-lg border border-gray-200">
              10.15 - 11.45 WIB
            </span>
          </div>
        </section>

        {/* METRICS BENTO / RINGKASAN PRESENSI */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
          {/* Total Guru */}
          <div className="glass-card rounded-2xl p-3.5 relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#5f3f3b] font-medium">Total Guru &amp; Staf</span>
              <div className="w-8 h-8 rounded-lg bg-[#ffdad5] flex items-center justify-center text-[#e60012]">
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-bold text-[#1b1c1c] font-headline">84</span>
              <span className="text-xs text-[#5f3f3b]">Personel</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-[#5f3f3b]">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
              <span>100% Terdata TA Genap</span>
            </div>
          </div>

          {/* Hadir Mengajar */}
          <div className="glass-card rounded-2xl p-3.5 relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#5f3f3b] font-medium">Hadir di Sekolah</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                <span className="material-symbols-outlined text-[20px]">person_check</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-bold text-emerald-700 font-headline">78</span>
              <span className="text-xs text-emerald-800 font-semibold">(92.8%)</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Presensi RFID Pagi</span>
            </div>
          </div>

          {/* Izin / Tugas Luar */}
          <div className="glass-card rounded-2xl p-3.5 relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#5f3f3b] font-medium">Izin / Tugas Luar</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                <span className="material-symbols-outlined text-[20px]">assignment_ind</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-bold text-amber-700 font-headline">4</span>
              <span className="text-xs text-[#5f3f3b]">Guru</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-800">
              <span className="material-symbols-outlined text-[15px]">task</span>
              <span>Disposisi Kepsek</span>
            </div>
          </div>

          {/* Cuti / Sakit */}
          <div className="glass-card rounded-2xl p-3.5 relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#5f3f3b] font-medium">Cuti / Sakit</span>
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
                <span className="material-symbols-outlined text-[20px]">medical_services</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-bold text-rose-700 font-headline">2</span>
              <span className="text-xs text-[#5f3f3b]">Guru Inval (+2)</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-rose-700">
              <span className="material-symbols-outlined text-[15px]">sync</span>
              <span>Kelas Terinval Terisi</span>
            </div>
          </div>
        </section>

        {/* PENCARIAN & KONTROL FILTER */}
        <section className="space-y-2">
          {/* Search Input Container */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5f3f3b]">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-24 bg-white border border-[#e9bcb6]/50 rounded-xl text-sm text-[#1b1c1c] placeholder:text-[#5f3f3b]/60 focus:outline-none focus:border-[#e60012] focus:ring-2 focus:ring-[#ffdad5] transition-all shadow-xs" 
                placeholder="Cari NIP, nama guru, mata pelajaran..." 
                type="text"
              />
              <button 
                onClick={() => {
                  setToastMessage('Kartu RFID Guru berhasil ditap: Hadir 06:38 WIB');
                  setTimeout(() => setToastMessage(null), 2000);
                }}
                className="absolute inset-y-1.5 right-1.5 px-2.5 bg-[#eae8e7] rounded-lg flex items-center gap-1 text-[#1b1c1c] text-xs font-semibold hover:bg-[#e4e2e2] transition-colors" 
                title="Scan RFID / QR Tap"
              >
                <span className="material-symbols-outlined text-[18px] text-[#e60012]">qr_code_scanner</span>
                <span className="hidden sm:inline">RFID</span>
              </button>
            </div>
            <button 
              onClick={onOpenFilter}
              className="h-11 px-3 bg-white border border-[#e9bcb6]/50 rounded-xl flex items-center gap-1.5 text-[#1b1c1c] text-xs font-semibold shadow-xs hover:border-[#e60012] hover:text-[#e60012] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
              <span className="hidden md:inline">Filter</span>
            </button>
          </div>

          {/* Quick Action Pill Group */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2 overflow-x-auto custom-scroll-hidden py-1">
              <button 
                onClick={() => setActiveChip('all')}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs active:scale-95 transition-all ${
                  activeChip === 'all' ? 'bg-[#e60012] text-white' : 'bg-white text-[#5f3f3b] border border-[#e9bcb6]/40 hover:bg-[#eae8e7]'
                }`}
              >
                Semua (84)
              </button>
              <button 
                onClick={() => setActiveChip('mengajar')}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs active:scale-95 transition-all flex items-center gap-1.5 ${
                  activeChip === 'mengajar' ? 'bg-[#e60012] text-white' : 'bg-white text-[#5f3f3b] border border-[#e9bcb6]/40 hover:bg-[#eae8e7]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Sedang Mengajar (28)
              </button>
              <button 
                onClick={() => setActiveChip('piket')}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs active:scale-95 transition-all flex items-center gap-1.5 ${
                  activeChip === 'piket' ? 'bg-[#e60012] text-white' : 'bg-white text-[#5f3f3b] border border-[#e9bcb6]/40 hover:bg-[#eae8e7]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Piket (6)
              </button>
              <button 
                onClick={() => setActiveChip('tugas')}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs active:scale-95 transition-all flex items-center gap-1.5 ${
                  activeChip === 'tugas' ? 'bg-[#e60012] text-white' : 'bg-white text-[#5f3f3b] border border-[#e9bcb6]/40 hover:bg-[#eae8e7]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Izin/Tugas (4)
              </button>
            </div>
            
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button 
                onClick={() => onOpenPlotInval()}
                className="px-3 py-1.5 rounded-lg border border-[#e60012]/30 bg-[#ffdad5]/40 text-[#e60012] text-xs font-bold hover:bg-[#e60012] hover:text-white transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                Guru Pengganti/Inval
              </button>
            </div>
          </div>
        </section>

        {/* DAFTAR KARTU GURU */}
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1b1c1c] font-headline">Daftar Guru &amp; Staf Aktif</h2>
            <span className="text-xs text-[#5f3f3b]">Menampilkan {filteredTeachers.length} Guru</span>
          </div>

          {filteredTeachers.map((teacher) => (
            <article 
              key={teacher.id} 
              className={`glass-card rounded-2xl p-4 border transition-all duration-200 ${
                teacher.statusType === 'sakit' ? 'border-rose-200 bg-rose-50/20' : 'border-[#e9bcb6]/30 hover:border-[#e60012]/40'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                {/* Left Info: Avatar + Details */}
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg overflow-hidden border border-[#e9bcb6]/50 ${
                      teacher.id === 'tch-1' ? 'bg-[#ffdad5] text-[#e60012]' :
                      teacher.id === 'tch-2' ? 'bg-[#ffdad5] text-[#e60012]' :
                      teacher.id === 'tch-3' ? 'bg-amber-100 text-amber-800' :
                      teacher.id === 'tch-4' ? 'bg-amber-50 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {teacher.initials}
                    </div>
                    <span className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-white text-[9px] font-bold tracking-tight shadow-xs ${
                      teacher.checkInTime === 'TUGAS' ? 'bg-amber-500' :
                      teacher.checkInTime === 'SAKIT' ? 'bg-rose-600' :
                      'bg-emerald-500'
                    }`}>
                      {teacher.checkInTime}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center flex-wrap gap-2">
                      <h3 className="text-base font-bold text-[#1b1c1c] font-headline">{teacher.name}</h3>
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                        teacher.statusType === 'sakit' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                        teacher.statusType === 'tugas' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                        'bg-[#ffdad5] text-[#b7000c] border-[#e60012]/20'
                      }`}>
                        {teacher.role}
                      </span>
                    </div>
                    <p className="text-xs text-[#5f3f3b] font-mono">NIP: {teacher.nip}</p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {teacher.specialization.map((spec, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eae8e7] text-[#5f3f3b] text-[11px] font-medium">
                          {spec}
                        </span>
                      ))}
                      {teacher.invalReplacement && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-[14px] text-emerald-700">swap_horiz</span>
                          Inval: Diisi {teacher.invalReplacement}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Status & Quick Action */}
                <div className="flex flex-col md:items-end justify-between gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-[#e9bcb6]/20">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                      teacher.statusType === 'mengajar' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      teacher.statusType === 'ruang_guru' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      teacher.statusType === 'tugas' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                      'bg-rose-100 text-rose-800 border-rose-300'
                    }`}>
                      {teacher.statusType === 'mengajar' && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>}
                      {teacher.statusBadge}
                    </span>
                    <button 
                      onClick={() => onOpenPlotInval(teacher)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#5f3f3b] hover:bg-[#eae8e7] hover:text-[#1b1c1c] transition-colors" 
                      title="Opsi Guru"
                    >
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    {/* Chat WA */}
                    <a 
                      href={`https://wa.me/${teacher.phone}?text=Halo%20${encodeURIComponent(teacher.name)}%2C%20koordinasi%20akademik%20SMK%20Telkom.`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-9 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      <span>{teacher.id === 'tch-1' ? 'Hubungi (WA)' : 'Chat'}</span>
                    </a>

                    {/* Secondary Action */}
                    {teacher.statusType === 'sakit' ? (
                      <button 
                        onClick={() => onOpenPlotInval(teacher)}
                        className="h-9 px-3 rounded-xl bg-white hover:bg-gray-100 text-[#1b1c1c] text-xs font-semibold flex items-center gap-1.5 border border-[#e9bcb6]/40 transition-all active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#b7000c]">edit_note</span>
                        <span>Plot Ulang Inval</span>
                      </button>
                    ) : teacher.statusType === 'tugas' ? (
                      <button 
                        onClick={() => setSelectedStpTeacher(teacher)}
                        className="h-9 px-3 rounded-xl bg-white hover:bg-gray-100 text-[#1b1c1c] text-xs font-semibold flex items-center gap-1.5 border border-[#e9bcb6]/40 transition-all active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                        <span>Lihat ST / SPT</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => setSelectedAgendaTeacher(teacher)}
                        className="h-9 px-3 rounded-xl bg-[#f5f3f3] hover:bg-[#eae8e7] text-[#1b1c1c] text-xs font-semibold flex items-center gap-1.5 border border-[#e9bcb6]/40 transition-all active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[18px]">menu_book</span>
                        <span>Agenda Ajar</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Agenda Ajar Dialog */}
      {selectedAgendaTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3 border border-[#e9bcb6]/40 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="text-sm font-bold font-headline">{selectedAgendaTeacher.name}</h3>
              <button onClick={() => setSelectedAgendaTeacher(null)} className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
                ✕
              </button>
            </div>
            <p className="text-xs text-[#5f3f3b]">Mata Pelajaran: <span className="font-semibold text-[#1b1c1c]">{selectedAgendaTeacher.specialization[1] || selectedAgendaTeacher.specialization[0]}</span></p>
            <div className="bg-[#f5f3f3] p-3 rounded-xl text-xs space-y-1.5">
              <div className="flex justify-between font-bold text-[#b7000c]">
                <span>Agenda Hari Ini</span>
                <span>Jam Ke 3-6</span>
              </div>
              <p>Materi: Integrasi REST API Express.js &amp; Frontend React Vite.</p>
              <p className="text-[11px] text-gray-500">Target: Uji coba form submit dan state management siswa.</p>
            </div>
            <button 
              onClick={() => setSelectedAgendaTeacher(null)}
              className="w-full py-2 bg-[#b7000c] text-white font-bold text-xs rounded-xl"
            >
              Tutup Agenda
            </button>
          </div>
        </div>
      )}

      {/* Surat Tugas SPT Dialog */}
      {selectedStpTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3 border border-[#e9bcb6]/40 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="text-sm font-bold font-headline">Surat Tugas (SPT) Resmi</h3>
              <button onClick={() => setSelectedStpTeacher(null)} className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
                ✕
              </button>
            </div>
            <div className="bg-[#f5f3f3] p-3 rounded-xl text-xs space-y-1 font-mono">
              <p className="font-bold text-[#b7000c]">No: 421.5/098/SMK-TELKOM/III/2025</p>
              <p>Nama: {selectedStpTeacher.name}</p>
              <p>Tugas: Pendampingan Kontingen LKS Desain Grafis Tingkat Provinsi Jawa Timur.</p>
              <p>Tanggal: 10 - 13 Maret 2025</p>
              <p className="text-[10px] text-gray-500">Disetujui oleh Kepala Sekolah SMK Telkom Malang.</p>
            </div>
            <button 
              onClick={() => setSelectedStpTeacher(null)}
              className="w-full py-2 bg-[#b7000c] text-white font-bold text-xs rounded-xl"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>
      )}

      {/* Contextual Floating Bar (Just above bottom navigation) */}
      <aside className="fixed bottom-20 left-0 right-0 z-40 px-4 pointer-events-none">
        <div className="max-w-md mx-auto flex items-center gap-2 pointer-events-auto">
          <button 
            onClick={() => {
              setToastMessage('Form Tambah Guru Baru dibuka');
              setTimeout(() => setToastMessage(null), 1500);
            }}
            className="flex-1 h-12 rounded-xl bg-[#E60012] hover:bg-[#B3000E] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#E60012]/25 transition-all duration-150 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span>+ Tambah Guru / Staf</span>
          </button>
          <button 
            onClick={() => onOpenPlotInval()}
            className="h-12 px-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E60012]/30 text-[#E60012] font-bold text-sm flex items-center justify-center gap-1.5 shadow-md hover:bg-[#ffdad5]/30 transition-all duration-150 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">rule</span>
            <span className="hidden xs:inline">Plotting Inval</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
