import React, { useState } from 'react';
import { Student } from '../data/mockData';

interface ScanQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onScanSuccess: (studentId: string) => void;
}

export const ScanQrModal: React.FC<ScanQrModalProps> = ({ isOpen, onClose, students, onScanSuccess }) => {
  const [scannedMessage, setScannedMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = (student: Student) => {
    // Audio chime simulation using Web Audio API
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // Audio fallback
    }

    onScanSuccess(student.id);
    setScannedMessage(`Berhasil scan kartu: ${student.name} (${student.nisn}) - Hadir Tepat Waktu!`);
    setTimeout(() => {
      setScannedMessage(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-[#e9bcb6]/40 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#b7000c] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
            <div>
              <h3 className="text-sm font-bold font-headline">Mode Scanner RFID / QR</h3>
              <p className="text-[11px] text-white/80">Gerbang Utama &amp; Kelas SMK Telkom</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Viewfinder simulator */}
        <div className="p-5 flex flex-col items-center">
          <div className="w-56 h-56 rounded-2xl border-2 border-dashed border-[#b7000c] bg-gray-900 relative flex items-center justify-center overflow-hidden shadow-inner">
            {/* Animated Laser Scan Bar */}
            <div className="absolute inset-x-0 h-1 bg-[#e60012] shadow-[0_0_12px_#e60012] animate-pulse top-1/2 -translate-y-1/2"></div>
            
            <div className="absolute inset-4 border border-white/30 rounded-xl pointer-events-none"></div>
            <div className="text-center text-white/70 px-4">
              <span className="material-symbols-outlined text-4xl text-[#ffdad5] animate-bounce">tap_and_play</span>
              <p className="text-xs mt-2 font-medium">Dekatkan kartu RFID pelajar atau QR Code siswa ke scanner</p>
            </div>
          </div>

          {scannedMessage && (
            <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold text-center w-full animate-in zoom-in-95">
              {scannedMessage}
            </div>
          )}

          {/* Quick Tap Demo List */}
          <div className="w-full mt-4">
            <p className="text-xs font-semibold text-[#1b1c1c] mb-2 flex items-center justify-between">
              <span>Simulasi Tap Kartu Pelajar:</span>
              <span className="text-[10px] text-[#5f3f3b]">Klik untuk tap</span>
            </p>
            <div className="max-h-36 overflow-y-auto space-y-1.5 custom-scroll-hidden">
              {students.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSimulateScan(s)}
                  className="w-full flex items-center justify-between p-2 rounded-xl border border-gray-100 bg-[#f5f3f3] hover:bg-[#ffdad5]/30 text-left transition-all active:scale-95"
                >
                  <div className="flex items-center gap-2">
                    <img src={s.avatar} alt={s.name} className="w-6 h-6 rounded-full object-cover" />
                    <div>
                      <span className="text-xs font-bold text-[#1b1c1c] block leading-tight">{s.name}</span>
                      <span className="text-[10px] text-[#5f3f3b] font-mono">{s.nisn}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    s.status === 'H' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {s.status === 'H' ? 'Sudah Tap' : 'Tap Hadir'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#f5f3f3] border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-[#1b1c1c] text-xs font-semibold rounded-xl"
          >
            Tutup Scanner
          </button>
        </div>
      </div>
    </div>
  );
};
