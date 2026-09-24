import React, { useState } from 'react';
import { Student } from '../data/mockData';

interface TambahSiswaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newStudent: Partial<Student>) => void;
  currentClass: string;
}

export const TambahSiswaModal: React.FC<TambahSiswaModalProps> = ({ isOpen, onClose, onAdd, currentClass }) => {
  const [name, setName] = useState('');
  const [nisn, setNisn] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !nisn.trim()) return;

    onAdd({
      name: name.trim(),
      nisn: nisn.trim(),
      className: currentClass,
      major: currentClass.includes('RPL') ? 'RPL' : currentClass.includes('TKJ') ? 'TKJ' : 'DKV',
      status: 'H',
      timeNote: '06.45 WIB • Gerbang Utama',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      attendancePercent: 100,
      totalPresent: 1,
      totalSickPermit: 0,
      totalAlpha: 0,
      parentName: parentName.trim() || 'Orang Tua Siswa',
      parentPhone: parentPhone.trim() || '081234567890',
      notes: 'Siswa baru ditambahkan ke dalam sistem presensi.',
      history: [
        { date: 'Hari Ini', detail: '06.45 WIB • Presensi Awal', type: 'H', tag: 'Tepat Waktu' }
      ]
    });

    setName('');
    setNisn('');
    setParentName('');
    setParentPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-[#e9bcb6]/40 flex flex-col">
        <div className="p-4 bg-[#b7000c] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl">person_add</span>
            <div>
              <h3 className="text-sm font-bold font-headline">Tambah Siswa Baru</h3>
              <p className="text-[11px] text-white/80">Kelas {currentClass} • Semester Genap</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">Nama Lengkap Siswa</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Gilang Ramadhan"
              className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#b7000c]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">Nomor Induk Siswa Nasional (NISN)</label>
            <input
              type="text"
              required
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              placeholder="10 digit nomor NISN"
              className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#b7000c]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">Nama Orang Tua / Wali</label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Contoh: Bpk. Bambang"
              className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#b7000c]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">No. WhatsApp Orang Tua</label>
            <input
              type="text"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#b7000c]"
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
              Simpan Data Siswa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
