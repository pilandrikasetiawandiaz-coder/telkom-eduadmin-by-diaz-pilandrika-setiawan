import React from 'react';

export type TabKey = 'dashboard' | 'siswa' | 'guru' | 'absensi' | 'menu';

interface BottomNavigationProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { key: 'dashboard' as TabKey, label: 'Dashboard', icon: 'dashboard' },
    { key: 'siswa' as TabKey, label: 'Siswa', icon: 'groups' },
    { key: 'guru' as TabKey, label: 'Guru', icon: 'badge' },
    { key: 'absensi' as TabKey, label: 'Absensi', icon: 'fact_check' },
    { key: 'menu' as TabKey, label: 'Berita', icon: 'campaign' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-white/95 backdrop-blur-md border-t border-[#e9bcb6]/30 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all duration-200 active:scale-90 ${
                isActive ? 'text-[#b7000c]' : 'text-[#5f3f3b] hover:text-[#1b1c1c]'
              }`}
            >
              <div className={`relative px-3.5 py-1 rounded-full transition-all ${
                isActive ? 'bg-[#ffdad5]/80 text-[#b7000c]' : ''
              }`}>
                <span className={`material-symbols-outlined text-[22px] transition-transform duration-200 ${
                  isActive ? 'fill scale-110 font-bold' : ''
                }`}>
                  {tab.icon}
                </span>
                {tab.key === 'menu' && (
                  <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#e60012] ring-2 ring-white"></span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 transition-all ${
                isActive ? 'font-bold text-[#b7000c]' : 'font-medium text-[#5f3f3b]'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
