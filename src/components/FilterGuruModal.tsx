import React, { useState } from 'react';

interface FilterGuruModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filterState: any) => void;
}

export const FilterGuruModal: React.FC<FilterGuruModalProps> = ({ isOpen, onClose, onApply }) => {
  const [datePreset, setDatePreset] = useState<'today' | '7days' | 'month' | 'custom'>('today');
  const [switches, setSwitches] = useState({
    hadir: true,
    izin: true,
    cuti: true,
    alpa: false,
  });
  const [departments, setDepartments] = useState({
    rpl: true,
    tkj: true,
    dkv: false,
    normatif: false,
    tu: false,
  });
  const [teachingStatuses, setTeachingStatuses] = useState({
    mengajar: true,
    piket: false,
    waliKelas: false,
    tugasLuar: true,
  });

  if (!isOpen) return null;

  const handleReset = () => {
    setDatePreset('today');
    setSwitches({ hadir: true, izin: true, cuti: true, alpa: false });
    setDepartments({ rpl: true, tkj: true, dkv: false, normatif: false, tu: false });
    setTeachingStatuses({ mengajar: true, piket: false, waliKelas: false, tugasLuar: true });
  };

  const calculateCount = () => {
    let count = 0;
    if (switches.hadir) count += 76;
    if (switches.izin) count += 4;
    if (switches.cuti) count += 2;
    if (switches.alpa) count += 0;
    return count;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-[4px] animate-in fade-in">
      <div 
        className="relative z-20 w-full max-w-md mx-auto bg-white rounded-t-[28px] shadow-[0_-12px_40px_rgba(26,26,26,0.18)] border-t border-[#e9bcb6]/30 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Pill Handle */}
        <div className="pt-3 pb-1 w-full flex justify-center items-center cursor-grab">
          <div className="w-11 h-1.5 bg-[#e9bcb6]/60 rounded-full hover:bg-[#e9bcb6]"></div>
        </div>

        {/* Sheet Header */}
        <header className="px-4 py-2 flex items-center justify-between border-b border-[#e9bcb6]/20 bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ffdad5] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#b7000c] text-lg">tune</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1b1c1c] leading-tight font-headline">
                Filter Presensi Guru &amp; Staf
              </h2>
              <p className="text-xs text-[#5f3f3b]">Semester Genap 2024/2025</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Tutup filter" 
            className="p-1.5 rounded-full hover:bg-[#efeded] text-[#5f3f3b] transition-all"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </header>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto px-4 py-3 space-y-5 flex-1 custom-scroll-hidden">
          {/* 1. Rentang Tanggal */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[#1b1c1c] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#b7000c] text-base">calendar_month</span>
                <span>Rentang Tanggal</span>
              </label>
              <button onClick={() => setDatePreset('today')} className="text-xs text-[#b7000c] font-semibold hover:underline">
                Reset Tanggal
              </button>
            </div>

            {/* Quick Date Presets */}
            <div className="grid grid-cols-4 gap-1.5">
              <button 
                onClick={() => setDatePreset('today')}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all ${
                  datePreset === 'today' ? 'border border-[#e60012] bg-[#ffdad5] text-[#b7000c] shadow-xs' : 'border border-[#e9bcb6]/40 bg-white text-[#5f3f3b] hover:bg-[#efeded]'
                }`}
              >
                Hari Ini
              </button>
              <button 
                onClick={() => setDatePreset('7days')}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all ${
                  datePreset === '7days' ? 'border border-[#e60012] bg-[#ffdad5] text-[#b7000c] shadow-xs' : 'border border-[#e9bcb6]/40 bg-white text-[#5f3f3b] hover:bg-[#efeded]'
                }`}
              >
                7 Hari Lalu
              </button>
              <button 
                onClick={() => setDatePreset('month')}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all ${
                  datePreset === 'month' ? 'border border-[#e60012] bg-[#ffdad5] text-[#b7000c] shadow-xs' : 'border border-[#e9bcb6]/40 bg-white text-[#5f3f3b] hover:bg-[#efeded]'
                }`}
              >
                Bulan Ini
              </button>
              <button 
                onClick={() => setDatePreset('custom')}
                className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                  datePreset === 'custom' ? 'border border-[#e60012] bg-[#ffdad5] text-[#b7000c] shadow-xs' : 'border border-[#e9bcb6]/40 bg-white text-[#5f3f3b] hover:bg-[#efeded]'
                }`}
              >
                <span>Kustom</span>
                <span className="material-symbols-outlined text-xs">expand_more</span>
              </button>
            </div>

            {/* Selected Date Box */}
            <div className="p-2.5 bg-[#f5f3f3] rounded-xl border border-[#e9bcb6]/40 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-[#e9bcb6]/30 text-[#b7000c]">
                  <span className="material-symbols-outlined text-lg">date_range</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1b1c1c]">10 Mar 2025 – 14 Mar 2025</div>
                  <div className="text-[11px] text-[#5f3f3b] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b7000c] inline-block"></span>
                    5 Hari Kerja Terpilih
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#5f3f3b] text-base">chevron_right</span>
            </div>
          </div>

          {/* 2. Status Kehadiran (Switches) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[#1b1c1c] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#b7000c] text-base">fact_check</span>
                <span>Status Kehadiran Guru</span>
              </label>
              <span className="text-[11px] text-[#5f3f3b]">Multi-pilihan</span>
            </div>

            <div className="space-y-2">
              {/* Hadir */}
              <div className="p-2.5 bg-white rounded-xl border border-[#e9bcb6]/30 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#1b1c1c]">Hadir Tepat Waktu</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-medium">78 Guru terdata</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSwitches(s => ({ ...s, hadir: !s.hadir }))}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    switches.hadir ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    switches.hadir ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Izin / Dinas Luar */}
              <div className="p-2.5 bg-white rounded-xl border border-[#e9bcb6]/30 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">assignment_ind</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#1b1c1c]">Izin / Dinas Luar</span>
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    </div>
                    <span className="text-[11px] text-amber-700 font-medium">4 Guru ditugaskan</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSwitches(s => ({ ...s, izin: !s.izin }))}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    switches.izin ? 'bg-amber-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    switches.izin ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Cuti / Sakit */}
              <div className="p-2.5 bg-white rounded-xl border border-[#e9bcb6]/30 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">medical_services</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#1b1c1c]">Cuti / Surat Sakit</span>
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    </div>
                    <span className="text-[11px] text-rose-700 font-medium">2 Guru diverifikasi</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSwitches(s => ({ ...s, cuti: !s.cuti }))}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    switches.cuti ? 'bg-[#e60012]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    switches.cuti ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Alpa */}
              <div className="p-2.5 bg-[#f5f3f3]/60 rounded-xl border border-[#e9bcb6]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#efeded] text-[#5f3f3b] flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">warning</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#1b1c1c]">Belum Hadir / Alpa</span>
                      <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                    </div>
                    <span className="text-[11px] text-[#5f3f3b] font-medium">0 Guru nihil</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSwitches(s => ({ ...s, alpa: !s.alpa }))}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    switches.alpa ? 'bg-[#b7000c]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    switches.alpa ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Jurusan & Unit Kerja */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[#1b1c1c] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#b7000c] text-base">apartment</span>
                <span>Jurusan &amp; Unit Kerja</span>
              </label>
              <button 
                onClick={() => setDepartments({ rpl: true, tkj: true, dkv: true, normatif: true, tu: true })}
                className="text-xs text-[#b7000c] font-semibold hover:underline"
              >
                Pilih Semua
              </button>
            </div>

            <div className="space-y-2">
              <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                departments.rpl ? 'border-[#e60012] bg-[#ffdad5]/20' : 'border-[#e9bcb6]/30 bg-white'
              }`}>
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={departments.rpl} 
                    onChange={(e) => setDepartments(d => ({ ...d, rpl: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#b7000c] focus:ring-[#ffdad5]" 
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#1b1c1c]">RPL</span>
                    <span className="text-[11px] text-[#5f3f3b] block">Rekayasa Perangkat Lunak</span>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#ffdad5] text-[#b7000c] font-bold">14 Guru</span>
              </label>

              <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                departments.tkj ? 'border-[#e60012] bg-[#ffdad5]/20' : 'border-[#e9bcb6]/30 bg-white'
              }`}>
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={departments.tkj} 
                    onChange={(e) => setDepartments(d => ({ ...d, tkj: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#b7000c] focus:ring-[#ffdad5]" 
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#1b1c1c]">TKJ</span>
                    <span className="text-[11px] text-[#5f3f3b] block">Teknik Komputer &amp; Jaringan</span>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#ffdad5] text-[#b7000c] font-bold">12 Guru</span>
              </label>

              <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                departments.dkv ? 'border-[#e60012] bg-[#ffdad5]/20' : 'border-[#e9bcb6]/30 bg-white'
              }`}>
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={departments.dkv} 
                    onChange={(e) => setDepartments(d => ({ ...d, dkv: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#b7000c] focus:ring-[#ffdad5]" 
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#1b1c1c]">DKV</span>
                    <span className="text-[11px] text-[#5f3f3b] block">Desain Komunikasi Visual</span>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#efeded] text-[#5f3f3b] font-medium">10 Guru</span>
              </label>

              <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                departments.normatif ? 'border-[#e60012] bg-[#ffdad5]/20' : 'border-[#e9bcb6]/30 bg-white'
              }`}>
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={departments.normatif} 
                    onChange={(e) => setDepartments(d => ({ ...d, normatif: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#b7000c] focus:ring-[#ffdad5]" 
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#1b1c1c]">Normatif &amp; Adaptif</span>
                    <span className="text-[11px] text-[#5f3f3b] block">Mata Pelajaran Umum (Matematika, Bhs, dll)</span>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#efeded] text-[#5f3f3b] font-medium">28 Guru</span>
              </label>
            </div>
          </div>

          {/* 4. Status Mengajar & Penugasan Chips */}
          <div className="space-y-2 pb-2">
            <label className="text-sm font-semibold text-[#1b1c1c] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#b7000c] text-base">badge</span>
              <span>Status Mengajar &amp; Penugasan</span>
            </label>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setTeachingStatuses(t => ({ ...t, mengajar: !t.mengajar }))}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  teachingStatuses.mengajar ? 'border border-[#e60012] bg-[#ffdad5] text-[#b7000c]' : 'border border-[#e9bcb6]/50 bg-white text-[#5f3f3b]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {teachingStatuses.mengajar ? 'check' : 'add'}
                </span>
                <span>Sedang Mengajar di Kelas</span>
              </button>
              <button 
                onClick={() => setTeachingStatuses(t => ({ ...t, piket: !t.piket }))}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  teachingStatuses.piket ? 'border border-[#e60012] bg-[#ffdad5] text-[#b7000c]' : 'border border-[#e9bcb6]/50 bg-white text-[#5f3f3b]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {teachingStatuses.piket ? 'check' : 'add'}
                </span>
                <span>Piket Harian</span>
              </button>
              <button 
                onClick={() => setTeachingStatuses(t => ({ ...t, waliKelas: !t.waliKelas }))}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  teachingStatuses.waliKelas ? 'border border-[#e60012] bg-[#ffdad5] text-[#b7000c]' : 'border border-[#e9bcb6]/50 bg-white text-[#5f3f3b]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {teachingStatuses.waliKelas ? 'check' : 'add'}
                </span>
                <span>Wali Kelas Aktif</span>
              </button>
              <button 
                onClick={() => setTeachingStatuses(t => ({ ...t, tugasLuar: !t.tugasLuar }))}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  teachingStatuses.tugasLuar ? 'border border-[#e60012] bg-[#ffdad5] text-[#b7000c]' : 'border border-[#e9bcb6]/50 bg-white text-[#5f3f3b]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {teachingStatuses.tugasLuar ? 'check' : 'add'}
                </span>
                <span>Tugas Luar / Pembimbing Lomba</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5. Sticky Bottom Action Bar */}
        <footer className="p-4 bg-white/95 backdrop-blur-md border-t border-[#e9bcb6]/30 flex items-center gap-2 sticky bottom-0 z-30 shadow-lg">
          <button 
            onClick={handleReset}
            className="w-2/5 py-3 px-2 rounded-xl border border-[#e9bcb6] bg-white text-[#1b1c1c] text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#f5f3f3] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            <span>Reset Filter</span>
          </button>
          <button 
            onClick={() => {
              onApply({ datePreset, switches, departments, teachingStatuses });
              onClose();
            }}
            className="w-3/5 py-3 px-4 rounded-xl bg-[#e60012] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(230,0,18,0.3)] hover:bg-[#ba0912] active:scale-95 transition-all"
          >
            <span>Terapkan ({calculateCount()})</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
