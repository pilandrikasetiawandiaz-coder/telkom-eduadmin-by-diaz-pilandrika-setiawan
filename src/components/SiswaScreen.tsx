import React, { useState, useMemo } from 'react';
import { Student } from '../data/mockData';

interface SiswaScreenProps {
  students: Student[];
  onUpdateStatus: (studentId: string, status: 'H' | 'S' | 'I' | 'A') => void;
  onSelectStudent: (student: Student) => void;
  onOpenScanQr: () => void;
  onOpenNotif: () => void;
  onOpenAddStudent: () => void;
  currentClass: string;
  onChangeClass: (newClass: string) => void;
  onBackToDashboard: () => void;
}

export const SiswaScreen: React.FC<SiswaScreenProps> = ({
  students,
  onUpdateStatus,
  onSelectStudent,
  onOpenScanQr,
  onOpenNotif,
  onOpenAddStudent,
  currentClass,
  onChangeClass,
  onBackToDashboard,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'H' | 'SI' | 'A'>('all');
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const availableClasses = ['XII RPL 1', 'XII RPL 2', 'XI TKJ 2', 'X DKV 3'];

  // Dynamic statistics calculated directly from state
  const totalCount = students.length;
  const hadirCount = students.filter(s => s.status === 'H').length;
  const izinSakitCount = students.filter(s => s.status === 'S' || s.status === 'I').length;
  const alpaCount = students.filter(s => s.status === 'A').length;

  const attendancePercent = totalCount > 0 ? ((hadirCount / totalCount) * 100).toFixed(1) : '0.0';
  const hadirRatio = totalCount > 0 ? (hadirCount / totalCount) * 100 : 0;
  const izinSakitRatio = totalCount > 0 ? (izinSakitCount / totalCount) * 100 : 0;
  const alpaRatio = totalCount > 0 ? (alpaCount / totalCount) * 100 : 0;

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.nisn.includes(searchQuery);
      if (!matchSearch) return false;

      if (activeFilter === 'H') return student.status === 'H';
      if (activeFilter === 'SI') return student.status === 'S' || student.status === 'I';
      if (activeFilter === 'A') return student.status === 'A';
      return true;
    });
  }, [students, searchQuery, activeFilter]);

  const handleMarkAllPresent = () => {
    students.forEach(s => {
      if (s.status !== 'H') {
        onUpdateStatus(s.id, 'H');
      }
    });
    setToastMessage('Semua siswa berhasil ditandai HADIR!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleExportCSV = () => {
    const headers = 'Nomor,Nama,NISN,Kelas,Status\n';
    const rows = students.map(s => `"${s.number}","${s.name}","${s.nisn}","${s.className}","${s.status}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Presensi_${currentClass.replace(/\s+/g, '_')}_10Mar2025.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMessage('Laporan presensi berhasil diunduh (CSV)!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col relative pb-32 bg-[#fbf9f8] shadow-2xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1b1c1c] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 animate-in slide-in-from-top">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP APP BAR */}
      <header className="bg-white/80 backdrop-blur-md text-[#b7000c] top-0 sticky z-40 shadow-xs border-b border-[#e9bcb6]/30 flex justify-between items-center w-full px-4 h-14">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBackToDashboard}
            aria-label="Kembali" 
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1b1c1c] hover:bg-[#eae8e7] transition-colors duration-150 active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[18px] font-bold text-[#1b1c1c] leading-tight tracking-tight font-headline">
              Data Siswa &amp; Presensi
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setActiveFilter(f => f === 'all' ? 'SI' : 'all')}
            aria-label="Filter" 
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#5f3f3b] hover:bg-[#eae8e7] hover:text-[#b7000c] transition-colors duration-150 active:scale-95" 
            type="button"
            title="Filter Cepat"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
          <button 
            onClick={handleExportCSV}
            aria-label="Ekspor Laporan" 
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#5f3f3b] hover:bg-[#eae8e7] hover:text-[#b7000c] transition-colors duration-150 active:scale-95" 
            type="button"
            title="Ekspor Laporan CSV"
          >
            <span className="material-symbols-outlined text-[20px]">ios_share</span>
          </button>
        </div>
      </header>

      {/* ROMBEL & DATE SELECTOR STRIP */}
      <section className="px-4 pt-4 pb-2 relative">
        <div className="bg-white border border-[#b7000c]/10 rounded-xl p-2.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ffdad5] flex items-center justify-center text-[#b7000c]">
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-[#1b1c1c]">{currentClass}</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ffdad5] text-[#410001]">
                  {currentClass.includes('RPL') ? 'RPL' : currentClass.includes('TKJ') ? 'TKJ' : 'DKV'}
                </span>
              </div>
              <p className="text-xs text-[#5f3f3b]">Senin, 10 Maret 2025 • T.A 2024/2025</p>
            </div>
          </div>
          <button 
            onClick={() => setShowClassDropdown(!showClassDropdown)}
            className="flex items-center gap-1 text-[#b7000c] font-semibold text-xs px-2.5 py-1.5 rounded-lg bg-[#ffdad5]/50 hover:bg-[#ffdad5] transition-colors active:scale-95" 
            type="button"
          >
            <span>Ganti</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
        </div>

        {/* Dropdown Rombel */}
        {showClassDropdown && (
          <div className="absolute right-4 top-16 z-30 bg-white border border-[#e9bcb6]/40 rounded-xl shadow-xl p-1.5 w-44 animate-in fade-in zoom-in-95">
            <p className="text-[10px] font-bold text-[#5f3f3b] px-2 py-1 uppercase">Pilih Rombel / Kelas:</p>
            {availableClasses.map(cls => (
              <button
                key={cls}
                onClick={() => {
                  onChangeClass(cls);
                  setShowClassDropdown(false);
                  setToastMessage(`Beralih ke kelas ${cls}`);
                  setTimeout(() => setToastMessage(null), 1500);
                }}
                className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                  cls === currentClass ? 'bg-[#ffdad5] text-[#b7000c] font-bold' : 'hover:bg-gray-100 text-[#1b1c1c]'
                }`}
              >
                <span>{cls}</span>
                {cls === currentClass && <span className="material-symbols-outlined text-xs">check</span>}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* RINGKASAN PRESENSI HARI INI (METRIC CARDS) */}
      <section className="px-4 py-2">
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-[#b7000c]/10 shadow-xs">
          {/* Header & Ratio */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-[11px] font-bold text-[#5f3f3b] uppercase tracking-wider">
                Kehadiran Kelas
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-[#1b1c1c] font-headline">{attendancePercent}%</span>
                <span className="text-xs text-[#5f3f3b]">Tercapai</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-[11px] font-semibold text-emerald-800">Sesi Pagi Aktif</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#eae8e7] h-2.5 rounded-full overflow-hidden flex mb-3">
            <div className="bg-emerald-600 h-full rounded-l-full transition-all duration-300" style={{ width: `${hadirRatio}%` }}></div>
            <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${izinSakitRatio}%` }}></div>
            <div className="bg-[#e60012] h-full rounded-r-full transition-all duration-300" style={{ width: `${alpaRatio}%` }}></div>
          </div>

          {/* 4 Metric Pill Tiles */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Total */}
            <div className="bg-[#f5f3f3] rounded-lg p-2 flex flex-col items-center">
              <span className="text-[11px] text-[#5f3f3b]">Total</span>
              <span className="text-base font-bold text-[#1b1c1c] mt-0.5 font-headline">{totalCount}</span>
            </div>
            {/* Hadir */}
            <div className="bg-emerald-50 border border-emerald-200/60 rounded-lg p-2 flex flex-col items-center">
              <span className="text-[11px] text-emerald-700 font-semibold">Hadir</span>
              <span className="text-base font-bold text-emerald-800 mt-0.5 font-headline">{hadirCount}</span>
            </div>
            {/* Sakit/Izin */}
            <div className="bg-amber-50 border border-amber-200/60 rounded-lg p-2 flex flex-col items-center">
              <span className="text-[11px] text-amber-800 font-semibold">Izin/Skt</span>
              <span className="text-base font-bold text-amber-900 mt-0.5 font-headline">{izinSakitCount}</span>
            </div>
            {/* Alpa */}
            <div className="bg-[#ffdad5] border border-[#b7000c]/20 rounded-lg p-2 flex flex-col items-center">
              <span className="text-[11px] text-[#b7000c] font-semibold">Alpa</span>
              <span className="text-base font-bold text-[#b7000c] mt-0.5 font-headline">{alpaCount}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH & STATUS FILTER STRIP */}
      <section className="px-4 pt-1 pb-2 space-y-2">
        {/* Search Input */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#5f3f3b]">search</span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-10 text-sm rounded-xl bg-white border border-[#e9bcb6]/40 focus:border-[#b7000c] focus:ring-2 focus:ring-[#ffdad5] focus:outline-none transition-all placeholder:text-[#5f3f3b]/60" 
            placeholder="Cari NISN, nama siswa..." 
            type="text"
          />
          <button 
            onClick={onOpenScanQr}
            aria-label="Scan barcode" 
            className="absolute right-3 text-[#5f3f3b] hover:text-[#b7000c]" 
            type="button"
            title="Buka Scanner"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
          </button>
        </div>

        {/* Quick Action Buttons Strip */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button 
            onClick={handleMarkAllPresent}
            className="flex-1 flex items-center justify-center gap-1.5 h-9 px-2 rounded-lg bg-white border border-[#e9bcb6]/40 text-[#1b1c1c] text-xs font-semibold hover:border-[#b7000c] transition-all active:scale-95 shadow-xs" 
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-700">done_all</span>
            <span>Tandai Semua Hadir</span>
          </button>
          <button 
            onClick={onOpenScanQr}
            className="flex-1 flex items-center justify-center gap-1.5 h-9 px-2 rounded-lg bg-white border border-[#e9bcb6]/40 text-[#1b1c1c] text-xs font-semibold hover:border-[#b7000c] transition-all active:scale-95 shadow-xs" 
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-[#b7000c]">qr_code</span>
            <span>Mode Scan QR</span>
          </button>
        </div>

        {/* Filter Tab Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scroll-hidden py-1">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`shrink-0 px-3 py-1 rounded-full text-xs transition-all ${
              activeFilter === 'all' 
                ? 'bg-[#b7000c] text-white shadow-xs font-semibold' 
                : 'bg-[#f5f3f3] text-[#5f3f3b] hover:text-[#1b1c1c] border border-[#e9bcb6]/30'
            }`}
            type="button"
          >
            Semua ({totalCount})
          </button>
          <button 
            onClick={() => setActiveFilter('H')}
            className={`shrink-0 px-3 py-1 rounded-full text-xs transition-all ${
              activeFilter === 'H' 
                ? 'bg-[#b7000c] text-white shadow-xs font-semibold' 
                : 'bg-[#f5f3f3] text-[#5f3f3b] hover:text-[#1b1c1c] border border-[#e9bcb6]/30'
            }`}
            type="button"
          >
            Hadir ({hadirCount})
          </button>
          <button 
            onClick={() => setActiveFilter('SI')}
            className={`shrink-0 px-3 py-1 rounded-full text-xs transition-all ${
              activeFilter === 'SI' 
                ? 'bg-[#b7000c] text-white shadow-xs font-semibold' 
                : 'bg-[#f5f3f3] text-[#5f3f3b] hover:text-[#1b1c1c] border border-[#e9bcb6]/30'
            }`}
            type="button"
          >
            Izin/Sakit ({izinSakitCount})
          </button>
          <button 
            onClick={() => setActiveFilter('A')}
            className={`shrink-0 px-3 py-1 rounded-full text-xs transition-all ${
              activeFilter === 'A' 
                ? 'bg-[#b7000c] text-white shadow-xs font-semibold' 
                : 'bg-[#f5f3f3] text-[#5f3f3b] hover:text-[#1b1c1c] border border-[#e9bcb6]/30'
            }`}
            type="button"
          >
            Alpa ({alpaCount})
          </button>
        </div>
      </section>

      {/* LIST SISWA DETAIL (CARDS) */}
      <main className="px-4 space-y-2.5 pb-4 flex-1">
        {filteredStudents.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-gray-200 text-[#5f3f3b]">
            <span className="material-symbols-outlined text-4xl text-gray-400">person_search</span>
            <p className="text-sm font-semibold mt-2">Tidak ada siswa yang cocok</p>
            <p className="text-xs text-gray-400 mt-1">Coba gunakan kata kunci pencarian atau ubah filter status.</p>
          </div>
        ) : (
          filteredStudents.map((student) => {
            const isPresent = student.status === 'H';
            const isSick = student.status === 'S';
            const isPermit = student.status === 'I';
            const isAlpha = student.status === 'A';

            return (
              <div 
                key={student.id}
                onClick={() => onSelectStudent(student)}
                className="bg-white rounded-xl p-3.5 border border-[#b7000c]/10 shadow-xs relative overflow-hidden transition-all duration-150 hover:shadow-md cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Avatar & Identity */}
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img 
                        className="w-12 h-12 rounded-xl object-cover border border-[#e9bcb6]/30" 
                        src={student.avatar} 
                        alt={student.name}
                      />
                      {/* Avatar status indicator */}
                      <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-white ${
                        isPresent ? 'bg-emerald-500' :
                        isSick ? 'bg-amber-500' :
                        isPermit ? 'bg-amber-500' : 'bg-[#b7000c]'
                      }`}>
                        <span className="material-symbols-outlined text-[10px] fill">
                          {isPresent ? 'check' : isSick ? 'medical_services' : isPermit ? 'mail' : 'close'}
                        </span>
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm font-bold text-[#1b1c1c] font-headline">{student.name}</h2>
                        <span className="text-xs text-[#5f3f3b] font-medium">{student.number}</span>
                      </div>
                      <p className="text-xs text-[#5f3f3b]">NISN: {student.nisn} • {student.className}</p>

                      {/* Status Tag Line */}
                      {isPresent && (
                        <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-flex">
                          <span className="material-symbols-outlined text-[14px]">access_time</span>
                          <span>{student.timeNote || '06.42 WIB • Gerbang Utama'}</span>
                        </div>
                      )}
                      {isSick && (
                        <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md inline-flex">
                          <span className="material-symbols-outlined text-[14px]">description</span>
                          <span>{student.timeNote || 'Surat Dokter Terlampir'}</span>
                        </div>
                      )}
                      {isPermit && (
                        <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md inline-flex">
                          <span className="material-symbols-outlined text-[14px]">event_note</span>
                          <span>{student.timeNote || 'Dispensasi Lomba / Tugas'}</span>
                        </div>
                      )}
                      {isAlpha && (
                        <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-[#b7000c] bg-[#ffdad5] px-2 py-0.5 rounded-md inline-flex">
                          <span className="material-symbols-outlined text-[14px]">warning</span>
                          <span>Belum Hadir / Tanpa Keterangan</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* More options button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStudent(student);
                    }}
                    aria-label="Opsi Siswa" 
                    className="text-[#5f3f3b] hover:text-[#1b1c1c] p-1 rounded-lg" 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>

                {/* Quick Status Toggle Buttons (Thumb Zone) */}
                <div 
                  className="mt-3 pt-2.5 border-t border-[#efeded] flex items-center justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xs text-[#5f3f3b]">Status Presensi:</span>
                  <div className="flex items-center gap-1 bg-[#f5f3f3] p-1 rounded-lg">
                    {/* H */}
                    <button 
                      onClick={() => onUpdateStatus(student.id, 'H')}
                      className={`w-8 h-8 rounded-md text-xs flex items-center justify-center transition-all ${
                        isPresent 
                          ? 'font-bold bg-emerald-600 text-white shadow-xs' 
                          : 'font-semibold text-[#5f3f3b] hover:bg-[#efeded]'
                      }`}
                      type="button"
                      title="Tandai Hadir"
                    >
                      H
                    </button>
                    {/* S */}
                    <button 
                      onClick={() => onUpdateStatus(student.id, 'S')}
                      className={`w-8 h-8 rounded-md text-xs flex items-center justify-center transition-all ${
                        isSick 
                          ? 'font-bold bg-amber-500 text-white shadow-xs' 
                          : 'font-semibold text-[#5f3f3b] hover:bg-[#efeded]'
                      }`}
                      type="button"
                      title="Tandai Sakit"
                    >
                      S
                    </button>
                    {/* I */}
                    <button 
                      onClick={() => onUpdateStatus(student.id, 'I')}
                      className={`w-8 h-8 rounded-md text-xs flex items-center justify-center transition-all ${
                        isPermit 
                          ? 'font-bold bg-amber-500 text-white shadow-xs' 
                          : 'font-semibold text-[#5f3f3b] hover:bg-[#efeded]'
                      }`}
                      type="button"
                      title="Tandai Izin"
                    >
                      I
                    </button>
                    {/* A */}
                    <button 
                      onClick={() => onUpdateStatus(student.id, 'A')}
                      className={`w-8 h-8 rounded-md text-xs flex items-center justify-center transition-all ${
                        isAlpha 
                          ? 'font-bold bg-[#b7000c] text-white shadow-xs' 
                          : 'font-semibold text-[#5f3f3b] hover:bg-[#efeded]'
                      }`}
                      type="button"
                      title="Tandai Alpa"
                    >
                      A
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* FLOATING ACTIONS THUMB ZONE */}
      <div className="fixed bottom-16 left-0 w-full z-40 px-4 pointer-events-none">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2 pointer-events-auto">
          {/* Kirim Rekap ke Orang Tua */}
          <button 
            onClick={onOpenNotif}
            className="flex-1 flex items-center justify-center gap-1.5 h-11 px-3 rounded-xl bg-white/95 backdrop-blur-md text-[#1b1c1c] border border-[#b7000c]/20 shadow-lg hover:bg-[#f5f3f3] transition-all active:scale-95 text-xs font-semibold" 
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-emerald-600">chat</span>
            <span>Kirim Notif Ortu</span>
          </button>
          {/* Tambah Siswa Baru FAB */}
          <button 
            onClick={onOpenAddStudent}
            className="flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl bg-[#b7000c] text-white shadow-xl shadow-[#b7000c]/25 hover:bg-[#ba0912] transition-all active:scale-95 text-xs font-bold" 
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span>Tambah Siswa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
