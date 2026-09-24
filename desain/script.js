// Telkom EduAdmin - Vanilla JavaScript Interactions
document.addEventListener('DOMContentLoaded', () => {
  console.log('Telkom EduAdmin Design Prototype Initialized');

  // Navigation tab switching
  const tabs = document.querySelectorAll('[data-target-screen]');
  const screens = document.querySelectorAll('.screen-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const target = tab.getAttribute('data-target-screen');
      screens.forEach(s => s.classList.add('hidden'));
      const activeScreen = document.getElementById(target);
      if (activeScreen) {
        activeScreen.classList.remove('hidden');
      }

      tabs.forEach(t => {
        t.classList.remove('text-primary', 'font-bold');
        t.classList.add('text-on-surface-variant');
      });
      tab.classList.add('text-primary', 'font-bold');
      tab.classList.remove('text-on-surface-variant');
    });
  });

  // Attendance button toggle (H, S, I, A)
  document.querySelectorAll('.attendance-btn-group').forEach(group => {
    const btns = group.querySelectorAll('button');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.className = 'w-8 h-8 rounded-md text-xs font-semibold text-[#5f3f3b] hover:bg-[#efeded] transition-colors flex items-center justify-center';
        });
        const status = btn.getAttribute('data-status');
        if (status === 'H') {
          btn.className = 'w-8 h-8 rounded-md text-xs flex items-center justify-center font-bold bg-emerald-600 text-white shadow-sm';
        } else if (status === 'S') {
          btn.className = 'w-8 h-8 rounded-md text-xs flex items-center justify-center font-bold bg-amber-500 text-white shadow-sm';
        } else if (status === 'I') {
          btn.className = 'w-8 h-8 rounded-md text-xs flex items-center justify-center font-bold bg-amber-500 text-white shadow-sm';
        } else if (status === 'A') {
          btn.className = 'w-8 h-8 rounded-md text-xs flex items-center justify-center font-bold bg-[#b7000c] text-white shadow-sm';
        }
      });
    });
  });

  // Modal open & close
  const openModal = (id) => {
    const m = document.getElementById(id);
    if (m) m.classList.remove('hidden');
  };
  const closeModal = (id) => {
    const m = document.getElementById(id);
    if (m) m.classList.add('hidden');
  };

  window.openModal = openModal;
  window.closeModal = closeModal;
});
