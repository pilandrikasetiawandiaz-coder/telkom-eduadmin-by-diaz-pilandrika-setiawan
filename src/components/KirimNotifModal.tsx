import React, { useState } from 'react';
import { Student } from '../data/mockData';

interface KirimNotifModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
}

export const KirimNotifModal: React.FC<KirimNotifModalProps> = ({ isOpen, onClose, students }) => {
  const [recipientFilter, setRecipientFilter] = useState<'all' | 'absent' | 'sick'>('absent');
  const [sentToast, setSentToast] = useState(false);

  if (!isOpen) return null;

  const targetStudents = students.filter(s => {
    if (recipientFilter === 'absent') return s.status === 'A';
    if (recipientFilter === 'sick') return s.status === 'S' || s.status === 'I';
    return true;
  });

  const handleSendBroadcast = () => {
    setSentToast(true);
    setTimeout(() => {
      setSentToast(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#e9bcb6]/40 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#b7000c] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl">chat</span>
            <div>
              <h3 className="text-sm font-bold font-headline">Kirim Notifikasi Orang Tua / Wali</h3>
              <p className="text-[11px] text-white/80">Integrasi WhatsApp Gateway SMK Telkom</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3.5">
          {sentToast ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-center text-emerald-800 space-y-1">
              <span className="material-symbols-outlined text-3xl text-emerald-600">check_circle</span>
              <p className="text-sm font-bold">Pesan WhatsApp Berhasil Dikirim!</p>
              <p className="text-xs text-emerald-700">Laporan terkirim ke {targetStudents.length} nomor wali murid.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-xs font-semibold text-[#1b1c1c] block mb-1.5">Target Pengiriman:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setRecipientFilter('absent')}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border ${
                      recipientFilter === 'absent' ? 'border-[#b7000c] bg-[#ffdad5] text-[#b7000c]' : 'border-gray-200 text-[#5f3f3b]'
                    }`}
                  >
                    Alpa / Bolos ({students.filter(s => s.status === 'A').length})
                  </button>
                  <button
                    onClick={() => setRecipientFilter('sick')}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border ${
                      recipientFilter === 'sick' ? 'border-[#b7000c] bg-[#ffdad5] text-[#b7000c]' : 'border-gray-200 text-[#5f3f3b]'
                    }`}
                  >
                    Sakit/Izin ({students.filter(s => s.status === 'S' || s.status === 'I').length})
                  </button>
                  <button
                    onClick={() => setRecipientFilter('all')}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border ${
                      recipientFilter === 'all' ? 'border-[#b7000c] bg-[#ffdad5] text-[#b7000c]' : 'border-gray-200 text-[#5f3f3b]'
                    }`}
                  >
                    Semua Siswa ({students.length})
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">Pratinjau Format Pesan WA:</label>
                <div className="bg-[#f5f3f3] p-3 rounded-xl border border-gray-200 text-xs text-[#1b1c1c] space-y-1 font-mono">
                  <p className="font-bold text-[#b7000c]">[SMK TELKOM - INFORMASI PRESENSI]</p>
                  <p>Yth. Orang Tua/Wali Murid,</p>
                  <p>
                    Diberitahukan bahwa ananda pada hari Senin, 10 Maret 2025 tercatat:
                    <span className="font-bold text-[#b7000c]">
                      {recipientFilter === 'absent' ? ' Belum Hadir / Tanpa Keterangan' : recipientFilter === 'sick' ? ' Sakit/Izin Disposisi' : ' Laporan Kehadiran Kelas'}
                    </span>.
                  </p>
                  <p className="text-[11px] text-gray-500">Mohon konfirmasi ke Wali Kelas jika ada kendala. Terima kasih.</p>
                </div>
              </div>

              <div className="text-xs text-[#5f3f3b]">
                Penerima terpilih: <span className="font-bold text-[#1b1c1c]">{targetStudents.length} siswa</span>
              </div>
            </>
          )}
        </div>

        {!sentToast && (
          <div className="p-3 bg-[#f5f3f3] border-t border-gray-200 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-[#1b1c1c] text-xs font-semibold rounded-xl"
            >
              Batal
            </button>
            <button
              onClick={handleSendBroadcast}
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <span className="material-symbols-outlined text-base">send</span>
              <span>Kirim Broadcast WA ({targetStudents.length})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
