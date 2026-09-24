import React, { useState } from 'react';

interface AbsensiOverviewScreenProps {
  onSelectClass: (className: string) => void;
  onOpenScanner: () => void;
  onBackToDashboard: () => void;
}

export const AbsensiOverviewScreen: React.FC<AbsensiOverviewScreenProps> = ({
  onSelectClass,
  onOpenScanner,
  onBackToDashboard,
}) => {
  const [selectedMajor, setSelectedMajor] = useState<string>('Semua');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const classData = [
    { name: 'XII RPL 1', major: 'RPL', total: 36, hadir: 33, sakit: 2, alpa: 1, percent: 91.6, status: 'Selesai Presensi' },
    { name: 'XII RPL 2', major: 'RPL', total: 36, hadir: 35, sakit: 1, alpa: 0, percent: 97.2, status: 'Selesai Presensi' },
    { name: 'XI RPL 1', major: 'RPL', total: 35, hadir: 34, sakit: 1, alpa: 0, percent: 97.1, status: 'Selesai Presensi' },
    { name: 'XI TKJ 2', major: 'TKJ', total: 36, hadir: 33, sakit: 0, alpa: 3, percent: 91.6, status: 'Peringatan 3 Alpa' },
    { name: 'X TKJ 1', major: 'TKJ', total: 36, hadir: 36, sakit: 0, alpa: 0, percent: 100, status: '100% Hadir' },
    { name: 'X DKV 3', major: 'DKV', total: 34, hadir: 32, sakit: 2, alpa: 0, percent: 94.1, status: 'Selesai Presensi' }
  ];

  const filteredClasses = selectedMajor === 'Semua' 
    ? classData 
    : classData.filter(c => c.major === selectedMajor);

  const handleExportAll = () => {
    setToastMessage('Laporan Rekapitulasi Presensi Seluruh Kelas Berhasil Diunduh!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#fbf9f8] flex flex-col relative pb-32 shadow-2xl">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1b1c1c] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 animate-in slide-in-from-top">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-xs border-b border-[#e9bcb6]/30 flex justify-between items-center w-full px-4 h-14">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBackToDashboard}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1b1c1c] hover:bg-[#eae8e7] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h1 className="text-base font-bold text-[#1b1c1c] font-headline">Rekap Presensi Sekolah</h1>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={onOpenScanner}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#b7000c] hover:bg-[#ffdad5]/40"
            title="Buka Scanner"
          >
            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
          </button>
          <button 
            onClick={handleExportAll}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#5f3f3b] hover:bg-[#eae8e7]"
            title="Ekspor Rekap"
          >
            <span className="material-symbols-outlined text-[20px]">file_download</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-4 space-y-4">
        {/* Summary Card */}
        <section className="bg-white rounded-2xl p-4 border border-[#b7000c]/15 shadow-xs space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[11px] font-bold text-[#5f3f3b] uppercase">Akumulasi Presensi Hari Ini</span>
              <div className="text-2xl font-bold text-[#1b1c1c] font-headline">96.4% Tercapai</div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Gerbang Tutup: 06.45
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-gray-100">
            <div className="p-2 bg-[#f5f3f3] rounded-xl">
              <span className="text-[10px] text-[#5f3f3b]">Total Hadir</span>
              <div className="text-sm font-bold text-emerald-700">1.203 Siswa</div>
            </div>
            <div className="p-2 bg-[#f5f3f3] rounded-xl">
              <span className="text-[10px] text-[#5f3f3b]">Izin / Sakit</span>
              <div className="text-sm font-bold text-amber-800">32 Siswa</div>
            </div>
            <div className="p-2 bg-[#f5f3f3] rounded-xl">
              <span className="text-[10px] text-[#5f3f3b]">Alpa Terdata</span>
              <div className="text-sm font-bold text-[#b7000c]">13 Siswa</div>
            </div>
          </div>
        </section>

        {/* Filter Jurusan */}
        <div className="flex gap-1.5 overflow-x-auto custom-scroll-hidden py-0.5">
          {['Semua', 'RPL', 'TKJ', 'DKV'].map(major => (
            <button
              key={major}
              onClick={() => setSelectedMajor(major)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedMajor === major 
                  ? 'bg-[#b7000c] text-white shadow-xs' 
                  : 'bg-white text-[#5f3f3b] border border-gray-200'
              }`}
            >
              Jurusan {major}
            </button>
          ))}
        </div>

        {/* Class Ledger List */}
        <section className="space-y-2.5">
          <div className="flex justify-between items-center text-xs font-semibold text-[#5f3f3b]">
            <span>Daftar Rombel ({filteredClasses.length} Kelas)</span>
            <span>Ketuk untuk Buka Presensi</span>
          </div>

          {filteredClasses.map((item) => (
            <div
              key={item.name}
              onClick={() => onSelectClass(item.name)}
              className="bg-white rounded-xl p-3.5 border border-gray-200 hover:border-[#b7000c]/40 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffdad5] text-[#b7000c] flex items-center justify-center font-bold text-xs">
                  {item.major}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-[#1b1c1c]">{item.name}</h3>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      item.percent >= 95 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.percent}%
                    </span>
                  </div>
                  <p className="text-xs text-[#5f3f3b] mt-0.5">
                    {item.hadir} Hadir • {item.sakit} Sakit/Izin • {item.alpa} Alpa (Total {item.total})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#b7000c]">
                <span className="text-xs font-semibold hidden sm:inline">Buka</span>
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </div>
            </div>
          ))}
        </section>

        {/* RFID Gate Live Tap Stream */}
        <section className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#1b1c1c] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Log Gerbang RFID Otomatis
            </h4>
            <span className="text-[10px] text-[#5f3f3b]">Gerbang Barat &amp; Timur</span>
          </div>

          <div className="text-xs space-y-1.5 text-[#5f3f3b]">
            <div className="p-2 rounded-lg bg-[#f5f3f3] flex justify-between items-center">
              <span>Farah Nabila (XII RPL 1)</span>
              <span className="font-mono text-emerald-700 font-bold">06.35 WIB • Sukses</span>
            </div>
            <div className="p-2 rounded-lg bg-[#f5f3f3] flex justify-between items-center">
              <span>Pak Budi Santoso (Guru RPL)</span>
              <span className="font-mono text-emerald-700 font-bold">06.30 WIB • Sukses</span>
            </div>
            <div className="p-2 rounded-lg bg-[#f5f3f3] flex justify-between items-center">
              <span>Ahmad Fauzi (XII RPL 1)</span>
              <span className="font-mono text-emerald-700 font-bold">06.42 WIB • Sukses</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
