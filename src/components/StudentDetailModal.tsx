import React, { useState } from 'react';
import { Student } from '../data/mockData';

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
  onStatusChange: (studentId: string, status: 'H' | 'S' | 'I' | 'A') => void;
  onAddNote: (studentId: string, note: string) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onStatusChange,
  onAddNote,
}) => {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [showStatusPicker, setShowStatusPicker] = useState(false);

  if (!student) return null;

  const handleSaveNote = () => {
    if (!newNoteText.trim()) return;
    onAddNote(student.id, newNoteText.trim());
    setNewNoteText('');
    setShowNoteInput(false);
  };

  const getStatusBadge = () => {
    switch (student.status) {
      case 'H':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            Hadir Tepat Waktu ({student.timeNote?.split('•')[0] || '06.42 WIB'})
          </span>
        );
      case 'S':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            Sakit ({student.timeNote || 'Surat Dokter'})
          </span>
        );
      case 'I':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            Izin ({student.timeNote || 'Dispensasi'})
          </span>
        );
      case 'A':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#b7000c] bg-[#ffdad5] border border-[#b7000c]/20 px-2 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b7000c]"></span>
            Belum Hadir / Alpa
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col justify-end transition-opacity duration-200 animate-in fade-in">
      <div 
        className="w-full max-w-md mx-auto bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden border-t border-[#e9bcb6]/30 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle & Close */}
        <div className="pt-3 pb-1 px-4 flex flex-col items-center shrink-0 relative">
          <div className="w-12 h-1.5 rounded-full bg-[#e4e2e2] mb-2"></div>
          <button 
            onClick={onClose}
            aria-label="Tutup Modal" 
            className="absolute right-4 top-3 w-8 h-8 rounded-full bg-[#f5f3f3] hover:bg-[#eae8e7] flex items-center justify-center text-[#5f3f3b] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto px-4 space-y-4 pb-4 custom-scroll-hidden">
          {/* Student Identity Header */}
          <div className="flex items-center gap-3 pt-1">
            <div className="relative shrink-0">
              <img 
                className="w-14 h-14 rounded-2xl object-cover border border-[#e9bcb6]/30" 
                src={student.avatar} 
                alt={student.name}
              />
              <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-white text-[12px] ${
                student.status === 'H' ? 'bg-emerald-500' :
                student.status === 'S' || student.status === 'I' ? 'bg-amber-500' : 'bg-[#b7000c]'
              }`}>
                <span className="material-symbols-outlined text-[12px] fill">
                  {student.status === 'H' ? 'check' : student.status === 'S' ? 'medical_services' : student.status === 'I' ? 'mail' : 'close'}
                </span>
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-[18px] font-bold text-[#1b1c1c] truncate font-headline">{student.name}</h3>
                <span className="px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ffdad5] text-[#410001]">
                  {student.number}
                </span>
              </div>
              <p className="text-xs text-[#5f3f3b]">NISN: {student.nisn} • {student.className}</p>
              <div className="mt-1">
                {getStatusBadge()}
              </div>
            </div>
          </div>

          {/* Quick Status Selector if opened */}
          {showStatusPicker && (
            <div className="p-3 bg-[#f5f3f3] rounded-xl border border-[#e9bcb6]/40 space-y-2">
              <p className="text-xs font-semibold text-[#1b1c1c]">Pilih Status Kehadiran Hari Ini:</p>
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  onClick={() => { onStatusChange(student.id, 'H'); setShowStatusPicker(false); }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    student.status === 'H' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-[#1b1c1c] hover:bg-emerald-50'
                  }`}
                >
                  Hadir (H)
                </button>
                <button
                  onClick={() => { onStatusChange(student.id, 'S'); setShowStatusPicker(false); }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    student.status === 'S' ? 'bg-amber-500 text-white shadow-sm' : 'bg-white text-[#1b1c1c] hover:bg-amber-50'
                  }`}
                >
                  Sakit (S)
                </button>
                <button
                  onClick={() => { onStatusChange(student.id, 'I'); setShowStatusPicker(false); }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    student.status === 'I' ? 'bg-amber-500 text-white shadow-sm' : 'bg-white text-[#1b1c1c] hover:bg-amber-50'
                  }`}
                >
                  Izin (I)
                </button>
                <button
                  onClick={() => { onStatusChange(student.id, 'A'); setShowStatusPicker(false); }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    student.status === 'A' ? 'bg-[#b7000c] text-white shadow-sm' : 'bg-white text-[#1b1c1c] hover:bg-red-50'
                  }`}
                >
                  Alpa (A)
                </button>
              </div>
            </div>
          )}

          {/* Attendance Stat Mini Grid */}
          <div className="grid grid-cols-4 gap-2 bg-[#f5f3f3] p-2.5 rounded-xl border border-[#e4e2e2]/60">
            <div className="bg-white rounded-lg p-2 flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-[11px] text-[#5f3f3b] font-medium">Persentase</span>
              <span className="text-sm font-bold text-emerald-700 mt-0.5">{student.attendancePercent}%</span>
            </div>
            <div className="bg-white rounded-lg p-2 flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-[11px] text-[#5f3f3b] font-medium">Total Hadir</span>
              <span className="text-sm font-bold text-[#1b1c1c] mt-0.5">{student.totalPresent} Hari</span>
            </div>
            <div className="bg-white rounded-lg p-2 flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-[11px] text-[#5f3f3b] font-medium">Sakit/Izin</span>
              <span className="text-sm font-bold text-amber-800 mt-0.5">{student.totalSickPermit} Hari</span>
            </div>
            <div className="bg-white rounded-lg p-2 flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-[11px] text-[#5f3f3b] font-medium">Alpa</span>
              <span className="text-sm font-bold text-[#b7000c] mt-0.5">{student.totalAlpha} Hari</span>
            </div>
          </div>

          {/* Section: Riwayat Presensi (7 Hari Terakhir) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[#1b1c1c] flex items-center gap-1.5 font-headline">
                <span className="material-symbols-outlined text-[18px] text-[#b7000c]">history</span>
                Riwayat Presensi (7 Hari Terakhir)
              </h4>
              <span className="text-xs text-[#b7000c] font-medium cursor-pointer hover:underline">
                Lihat Semua
              </span>
            </div>
            <div className="bg-[#f5f3f3]/70 border border-[#e9bcb6]/30 rounded-xl divide-y divide-[#e4e2e2]/60 overflow-hidden text-xs">
              {student.history.map((h, i) => (
                <div key={i} className={`p-2.5 flex items-center justify-between ${i === 0 ? 'bg-white' : ''}`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold border ${
                      h.type === 'H' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' :
                      h.type === 'S' || h.type === 'I' ? 'bg-amber-50 text-amber-800 border-amber-200/60' :
                      'bg-red-50 text-[#b7000c] border-red-200'
                    }`}>
                      {h.type}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1b1c1c] text-[13px]">{h.date}</p>
                      <p className="text-[11px] text-[#5f3f3b]">{h.detail}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                    h.type === 'H' ? 'bg-emerald-50 text-emerald-800 border-emerald-200/50' :
                    h.type === 'S' || h.type === 'I' ? 'bg-amber-50 text-amber-800 border-amber-200/50' :
                    'bg-red-50 text-[#b7000c] border-red-200/50'
                  }`}>
                    {h.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Catatan Siswa & Wali Kelas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[#1b1c1c] flex items-center gap-1.5 font-headline">
                <span className="material-symbols-outlined text-[18px] text-[#b7000c]">sticky_note_2</span>
                Catatan Wali Kelas / BK
              </h4>
              <button 
                onClick={() => setShowNoteInput(!showNoteInput)}
                className="text-xs text-[#b7000c] font-medium flex items-center gap-0.5 hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                Tambah
              </button>
            </div>

            {showNoteInput && (
              <div className="p-2.5 bg-white border border-[#e9bcb6] rounded-xl space-y-2">
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Tulis catatan perkembangan atau pembinaan siswa..."
                  className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#b7000c] resize-none h-16"
                />
                <div className="flex justify-end gap-1.5">
                  <button 
                    onClick={() => setShowNoteInput(false)}
                    className="px-2.5 py-1 text-xs text-[#5f3f3b] hover:bg-gray-100 rounded-lg"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={handleSaveNote}
                    className="px-3 py-1 text-xs bg-[#b7000c] text-white font-semibold rounded-lg hover:bg-[#ba0912]"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            )}

            <div className="bg-[#f5f3f3] rounded-xl p-3 border border-[#e9bcb6]/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1b1c1c]">Pak Budi Santoso, S.Kom (Wali Kelas)</span>
                <span className="text-[10px] text-[#5f3f3b]">06 Mar 2025</span>
              </div>
              <p className="text-xs text-[#5f3f3b] leading-relaxed italic">
                {student.notes}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar (Thumb Zone) */}
        <div className="p-4 pt-3 bg-white border-t border-[#e9bcb6]/30 flex items-center gap-2 shrink-0">
          <a
            href={`https://wa.me/62${student.parentPhone.replace(/^0/, '')}?text=Halo%20Bapak%2FIbu%20${encodeURIComponent(student.parentName)}%2C%20kami%20dari%20SMK%20Telkom%20menginformasikan%20presensi%20ananda%20${encodeURIComponent(student.name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-11 px-3 rounded-xl bg-white border border-[#e9bcb6]/40 text-[#1b1c1c] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#f5f3f3] transition-all active:scale-95 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-emerald-600">call</span>
            <span>Hubungi Ortu</span>
          </a>
          <button 
            onClick={() => setShowStatusPicker(!showStatusPicker)}
            className="flex-1 h-11 px-3 rounded-xl bg-[#b7000c] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-[#b7000c]/25 hover:bg-[#ba0912] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
            <span>Ubah Status</span>
          </button>
        </div>
      </div>
    </div>
  );
};
