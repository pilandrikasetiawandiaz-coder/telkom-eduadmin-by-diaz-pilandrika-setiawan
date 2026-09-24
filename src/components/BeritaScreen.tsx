import React, { useState, useMemo } from 'react';
import { Announcement, INITIAL_ANNOUNCEMENTS } from '../data/mockData';

interface BeritaScreenProps {
  onBackToDashboard: () => void;
}

export const BeritaScreen: React.FC<BeritaScreenProps> = ({ onBackToDashboard }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [showUrgentModal, setShowUrgentModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['ann-2']);
  const [likedIds, setLikedIds] = useState<string[]>(['ann-3']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New announcement form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Akademik');
  const [newDesc, setNewDesc] = useState('');
  const [newDivision, setNewDivision] = useState('Kurikulum SMK Telkom');

  const categories = [
    'Semua',
    'Akademik',
    'Kesiswaan & Lomba',
    'Kedisiplinan',
    'Hubin & BKK',
    'Tata Tertib & BK'
  ];

  const filteredAnnouncements = useMemo(() => {
    if (selectedCategory === 'Semua') return announcements;
    return announcements.filter(a => a.category.toLowerCase().includes(selectedCategory.toLowerCase()));
  }, [announcements, selectedCategory]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    setToastMessage(bookmarkedIds.includes(id) ? 'Dihapus dari catatan tersimpan' : 'Disimpan ke catatan!');
    setTimeout(() => setToastMessage(null), 1800);
  };

  const toggleLike = (id: string) => {
    setLikedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const created: Announcement = {
      id: `ann-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      timeAgo: 'Baru saja',
      division: newDivision,
      description: newDesc.trim(),
      views: 1,
      likes: 0
    };

    setAnnouncements([created, ...announcements]);
    setNewTitle('');
    setNewDesc('');
    setShowCreateModal(false);
    setToastMessage('Pengumuman baru berhasil diterbitkan!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#fbf9f8] flex flex-col relative pb-32 shadow-2xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1b1c1c] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 animate-in slide-in-from-top">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-xs transition-colors duration-150 border-b border-[#e9bcb6]/30">
        <div className="flex justify-between items-center w-full px-4 h-14">
          {/* Back Navigation & Brand */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={onBackToDashboard}
              aria-label="Kembali" 
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#1b1c1c] hover:bg-[#eae8e7] transition-colors duration-150 active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-1.5 ml-1">
              <span className="material-symbols-outlined text-[#b7000c] text-[20px] fill">school</span>
              <span className="text-base font-bold text-[#b7000c] tracking-tight font-headline">SMK Telkom</span>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => {
                setToastMessage(`Menampilkan ${bookmarkedIds.length} pengumuman tersimpan`);
                setTimeout(() => setToastMessage(null), 1500);
              }}
              aria-label="Arsip dan Tersimpan" 
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#5f3f3b] hover:bg-[#eae8e7] hover:text-[#b7000c] transition-colors duration-150 active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">bookmark</span>
            </button>
            <button 
              onClick={() => setSelectedCategory('Semua')}
              aria-label="Filter Pengumuman" 
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#5f3f3b] hover:bg-[#eae8e7] hover:text-[#b7000c] transition-colors duration-150 active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>
        </div>

        {/* Sub-Header Title */}
        <div className="px-4 pb-2.5 pt-1">
          <h1 className="text-xl font-bold text-[#1b1c1c] tracking-tight font-headline">
            Pengumuman &amp; Berita
          </h1>
          <p className="text-xs text-[#5f3f3b]">Informasi Resmi Civitas Akademika SMK Telkom</p>
        </div>
      </header>

      {/* Main Content Stream */}
      <main className="flex-1 px-4 space-y-4 pt-3">
        {/* 1. URGENT ALERTS SECTION */}
        <section aria-label="Pengumuman Mendesak">
          <div className="relative overflow-hidden rounded-xl border border-[#b7000c]/20 bg-gradient-to-br from-[#ffdad5]/30 via-white to-white p-4 shadow-[0_4px_20px_-2px_rgba(230,0,18,0.12)]">
            <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#b7000c]/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Top Badge & Emergency Marker */}
            <div className="flex items-center justify-between gap-1 mb-2.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e60012] text-white text-[11px] font-bold tracking-wide">
                <span className="material-symbols-outlined text-[14px] animate-pulse fill">warning</span>
                <span>URGENT / PENTING HARI INI</span>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b7000c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b7000c]"></span>
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-base font-bold text-[#1b1c1c] leading-snug font-headline">
              Pemberitahuan Cuaca Ekstrem &amp; Penyesuaian KBM Daring Pukul 12:00 WIB
            </h2>

            {/* Snippet */}
            <p className="text-xs text-[#5f3f3b] mt-1.5 leading-relaxed">
              Berdasarkan instruksi BMKG &amp; Dinas Pendidikan, KBM tatap muka dialihkan ke LMS Telkom Edu mulai sesi siang. Seluruh siswa wajib mengisi presensi daring.
            </p>

            <div className="my-3 border-t border-[#e9bcb6]/30"></div>

            {/* Meta & CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-[#675555]">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>Hari ini, 07:15 WIB • Disposisi Kepala Sekolah</span>
              </div>
              <button 
                onClick={() => setShowUrgentModal(true)}
                className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-[#b7000c] text-white text-xs font-semibold hover:bg-[#ba0912] transition-colors duration-150 active:scale-95 shadow-xs"
              >
                <span>Baca Instruksi Lengkap</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. CATEGORY FILTERS */}
        <section aria-label="Filter Kategori Berita">
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scroll-hidden py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs transition-all duration-150 ${
                  selectedCategory === cat
                    ? 'bg-[#b7000c] text-white font-semibold shadow-xs'
                    : 'bg-[#eae8e7]/60 hover:bg-[#eae8e7] text-[#5f3f3b]'
                }`}
              >
                {cat === 'Semua' ? `Semua (${announcements.length})` : cat}
              </button>
            ))}
          </div>
        </section>

        {/* 3. FEED ANNOUNCEMENT CARDS */}
        <section aria-label="Daftar Pengumuman Terbaru" className="space-y-3.5">
          {filteredAnnouncements.map((item) => {
            const isBookmarked = bookmarkedIds.includes(item.id);
            const isLiked = likedIds.includes(item.id);

            return (
              <article 
                key={item.id} 
                className="bg-white rounded-xl p-4 border border-[#e9bcb6]/30 shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Header Badge & Category */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    item.category.includes('Prestasi') ? 'bg-amber-50 text-amber-800 border-amber-200' :
                    item.category.includes('Akademik') ? 'bg-[#f5f3f3] text-[#b7000c] border-[#b7000c]/10' :
                    item.category.includes('Hubin') ? 'bg-[#ffdad5]/40 text-[#b7000c] border-[#b7000c]/20' :
                    'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    <span className="material-symbols-outlined text-[15px] fill">
                      {item.category.includes('Prestasi') ? 'emoji_events' :
                       item.category.includes('Akademik') ? 'school' :
                       item.category.includes('Hubin') ? 'work' : 'verified_user'}
                    </span>
                    <span>{item.category}</span>
                  </div>
                  <span className="text-xs text-[#675555]">{item.timeAgo}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#1b1c1c] hover:text-[#b7000c] transition-colors leading-snug font-headline">
                  {item.title}
                </h3>

                {/* Subtext Source */}
                <p className="text-xs font-semibold text-[#b7000c] mt-0.5">{item.division}</p>

                {/* Snippet with optional Thumbnail Media */}
                <div className="mt-2 flex gap-3 items-start">
                  <p className="text-xs text-[#5f3f3b] leading-relaxed flex-1">
                    {item.description}
                  </p>
                  {item.image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-[#e9bcb6]/30">
                      <img 
                        src={item.image} 
                        alt="Prestasi LKS" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                </div>

                {/* Additional metadata tags */}
                {item.location && (
                  <div className="mt-2.5 flex items-center gap-3 text-xs text-[#675555]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                      <span>{item.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">event</span>
                      <span>{item.dateScheduled}</span>
                    </span>
                  </div>
                )}

                {/* Footer Attachment & Stats Indicator */}
                <div className="mt-3.5 pt-3 border-t border-[#e9bcb6]/20 flex items-center justify-between">
                  {item.attachments ? (
                    <div className="inline-flex items-center gap-1.5 text-xs text-[#5f3f3b] font-medium bg-[#f5f3f3] px-2.5 py-1 rounded-md">
                      <span className="material-symbols-outlined text-[16px] text-[#b7000c]">attach_file</span>
                      <span>{item.attachments}</span>
                    </div>
                  ) : item.gateClosing ? (
                    <span className="inline-flex items-center gap-1 text-xs text-[#b7000c] font-semibold">
                      <span className="material-symbols-outlined text-[16px]">lock_clock</span>
                      <span>{item.gateClosing}</span>
                    </span>
                  ) : (
                    <button 
                      onClick={() => toggleLike(item.id)}
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${isLiked ? 'text-[#b7000c]' : 'text-[#5f3f3b]'}`}
                    >
                      <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                      <span>{(item.likes || 0) + (isLiked ? 1 : 0)} Siswa Bangga</span>
                    </button>
                  )}

                  <div className="flex items-center gap-3 text-xs text-[#675555]">
                    {item.views && (
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>{item.views} Dilihat</span>
                      </span>
                    )}
                    <button 
                      onClick={() => toggleBookmark(item.id)}
                      className={`flex items-center gap-1 hover:text-[#b7000c] ${isBookmarked ? 'text-[#b7000c] font-bold' : ''}`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isBookmarked ? 'bookmark' : 'bookmark_border'}
                      </span>
                      <span>{isBookmarked ? 'Tersimpan' : 'Simpan'}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      {/* Floating Action Button (Buat Pengumuman) */}
      <div className="fixed bottom-20 right-4 z-40 max-w-md pointer-events-none w-full flex justify-end px-4">
        <button 
          onClick={() => setShowCreateModal(true)}
          aria-label="Buat Pengumuman Baru" 
          className="pointer-events-auto shadow-lg hover:shadow-xl flex items-center gap-2 px-4 py-3 rounded-full bg-[#e60012] text-white font-bold text-xs active:scale-95 transition-all duration-150"
        >
          <span className="material-symbols-outlined text-[20px]">edit_square</span>
          <span>Buat Pengumuman</span>
        </button>
      </div>

      {/* Modal: Urgent Alert Detail */}
      {showUrgentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3.5 border border-[#e9bcb6]/40 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b">
              <div className="flex items-center gap-2 text-[#e60012]">
                <span className="material-symbols-outlined text-2xl animate-pulse">warning</span>
                <h3 className="text-sm font-bold font-headline">Instruksi KBM Cuaca Ekstrem</h3>
              </div>
              <button onClick={() => setShowUrgentModal(false)} className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs text-[#1b1c1c] leading-relaxed">
              <p className="font-semibold">Berdasarkan surat edaran resmi Kepala SMK Telkom Malang:</p>
              <ul className="list-disc pl-4 space-y-1 text-[#5f3f3b]">
                <li>Sesi pembelajaran tatap muka berakhir pukul 11.45 WIB.</li>
                <li>Seluruh siswa dipulangkan dengan tertib sebelum curah hujan lebat pukul 12.30 WIB.</li>
                <li>Mata pelajaran jam ke 7 - 10 dilanjutkan melalui Google Classroom / Telkom Edu LMS.</li>
                <li>Batas presensi mandiri daring dibuka hingga pukul 16.00 WIB.</li>
              </ul>
            </div>
            <button 
              onClick={() => setShowUrgentModal(false)}
              className="w-full py-2.5 bg-[#b7000c] text-white font-bold text-xs rounded-xl"
            >
              Saya Mengerti &amp; Patuhi
            </button>
          </div>
        </div>
      )}

      {/* Modal: Create Announcement */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3 border border-[#e9bcb6]/40 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="text-sm font-bold font-headline text-[#1b1c1c]">Terbitkan Pengumuman Baru</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-2.5">
              <div>
                <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">Judul Pengumuman</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Jadwal Ujian Praktik Kejuruan"
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#b7000c]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">Kategori</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#b7000c] bg-white"
                >
                  <option value="Akademik">Akademik</option>
                  <option value="Kesiswaan & Prestasi">Kesiswaan &amp; Prestasi</option>
                  <option value="Kedisiplinan">Kedisiplinan</option>
                  <option value="Hubin & BKK">Hubin &amp; BKK</option>
                  <option value="Tata Tertib & BK">Tata Tertib &amp; BK</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">Divisi Penerbit</label>
                <input
                  type="text"
                  value={newDivision}
                  onChange={(e) => setNewDivision(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#b7000c]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1b1c1c] block mb-1">Isi Pesan Pengumuman</label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Rincian informasi untuk siswa dan guru..."
                  className="w-full text-xs p-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#b7000c]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-2 text-xs font-semibold text-[#5f3f3b] hover:bg-gray-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#b7000c] text-white rounded-xl shadow-md hover:bg-[#ba0912]"
                >
                  Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
