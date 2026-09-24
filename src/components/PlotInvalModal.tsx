import React, { useState } from 'react';
import { Teacher } from '../data/mockData';

interface PlotInvalModalProps {
  isOpen: boolean;
  onClose: () => void;
  teachers: Teacher[];
  onAssignInval: (teacherId: string, substituteName: string) => void;
  selectedTeacher?: Teacher | null;
}

export const PlotInvalModal: React.FC<PlotInvalModalProps> = ({
  isOpen,
  onClose,
  teachers,
  onAssignInval,
  selectedTeacher,
}) => {
  const [targetTeacherId, setTargetTeacherId] = useState<string>(selectedTeacher?.id || 'tch-5');
  const [substituteName, setSubstituteName] = useState('Pak Budi Santoso, S.Kom');
  const [classRoom, setClassRoom] = useState('XII RPL 2 (Jam Ke-3 & 4)');
  const [material, setMaterial] = useState('Latihan PBO & Desain Database MySQL');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onAssignInval(targetTeacherId, substituteName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-[#e9bcb6]/40 flex flex-col">
        <div className="p-4 bg-[#b7000c] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl">sync_alt</span>
            <div>
              <h3 className="text-sm font-bold font-headline">Plotting Guru Inval (Pengganti)</h3>
              <p className="text-[11px] text-white/80">SMK Telkom Malang</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">Guru Yang Berhalangan / Izin</label>
            <select
              value={targetTeacherId}
              onChange={(e) => setTargetTeacherId(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#b7000c] bg-white"
            >
              {teachers.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.role})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">Guru Pengganti (Inval Ditunjuk)</label>
            <select
              value={substituteName}
              onChange={(e) => setSubstituteName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#b7000c] bg-white"
            >
              <option value="Pak Budi Santoso, S.Kom">Pak Budi Santoso, S.Kom (RPL)</option>
              <option value="Pak Hendra Wijaya, S.T">Pak Hendra Wijaya, S.T (TKJ)</option>
              <option value="Ibu Ratna Juwita, M.Pd">Ibu Ratna Juwita, M.Pd (Matematika)</option>
              <option value="Ibu Siti Nurhaliza, S.Ds">Ibu Siti Nurhaliza, S.Ds (DKV)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">Ruang Kelas &amp; Jam Mengajar</label>
            <input
              type="text"
              value={classRoom}
              onChange={(e) => setClassRoom(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#b7000c]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">Tugas / Materi Titipan</label>
            <textarea
              rows={2}
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#b7000c]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-semibold text-[#5f3f3b] hover:bg-gray-100 rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold bg-[#b7000c] text-white rounded-xl shadow-md hover:bg-[#ba0912]"
            >
              Tetapkan Inval
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
