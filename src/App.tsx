import { useState } from 'react';
import { INITIAL_STUDENTS, INITIAL_TEACHERS, Student, Teacher } from './data/mockData';
import { BottomNavigation, TabKey } from './components/BottomNavigation';
import { DashboardScreen } from './components/DashboardScreen';
import { SiswaScreen } from './components/SiswaScreen';
import { GuruScreen } from './components/GuruScreen';
import { BeritaScreen } from './components/BeritaScreen';
import { AbsensiOverviewScreen } from './components/AbsensiOverviewScreen';

// Modals
import { StudentDetailModal } from './components/StudentDetailModal';
import { FilterGuruModal } from './components/FilterGuruModal';
import { ScanQrModal } from './components/ScanQrModal';
import { KirimNotifModal } from './components/KirimNotifModal';
import { TambahSiswaModal } from './components/TambahSiswaModal';
import { PlotInvalModal } from './components/PlotInvalModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('siswa');
  const [currentClass, setCurrentClass] = useState<string>('XII RPL 1');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);

  // Modal controls
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isFilterGuruOpen, setIsFilterGuruOpen] = useState(false);
  const [isScanQrOpen, setIsScanQrOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isPlotInvalOpen, setIsPlotInvalOpen] = useState(false);
  const [targetInvalTeacher, setTargetInvalTeacher] = useState<Teacher | null>(null);

  // Handlers for student state
  const handleUpdateStudentStatus = (studentId: string, status: 'H' | 'S' | 'I' | 'A') => {
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      let timeNote = s.timeNote;
      let tag = 'Tepat Waktu';
      if (status === 'H') {
        timeNote = '06.45 WIB • Presensi Diperbarui';
        tag = 'Tepat Waktu';
      } else if (status === 'S') {
        timeNote = 'Surat Dokter Terlampir';
        tag = 'Sakit';
      } else if (status === 'I') {
        timeNote = 'Dispensasi Izin Resmi';
        tag = 'Izin';
      } else {
        timeNote = 'Belum Hadir / Tanpa Keterangan';
        tag = 'Alpa';
      }

      const updatedHistory = [
        { date: 'Hari Ini', detail: timeNote, type: status, tag },
        ...s.history
      ];

      return {
        ...s,
        status,
        timeNote,
        history: updatedHistory
      };
    }));

    // If modal is open, also sync modal state
    if (selectedStudent && selectedStudent.id === studentId) {
      setSelectedStudent(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleUpdateStudentNotes = (studentId: string, notes: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, notes } : s));
  };

  const handleAddStudent = (newStudentData: Partial<Student>) => {
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      name: newStudentData.name || 'Siswa Baru',
      number: `#${String(students.length + 1).padStart(2, '0')}`,
      nisn: newStudentData.nisn || '0078912345',
      className: currentClass,
      major: newStudentData.major || 'RPL',
      status: 'H',
      timeNote: '06.45 WIB • Ditambahkan Baru',
      avatar: newStudentData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      attendancePercent: 100,
      totalPresent: 1,
      totalSickPermit: 0,
      totalAlpha: 0,
      parentName: newStudentData.parentName || 'Orang Tua Siswa',
      parentPhone: newStudentData.parentPhone || '081234567890',
      notes: newStudentData.notes || 'Catatan baru.',
      history: [
        { date: 'Hari Ini', detail: '06.45 WIB • Siswa Baru', type: 'H', tag: 'Tepat Waktu' }
      ]
    };

    setStudents(prev => [newStudent, ...prev]);
  };

  const handleScanSuccess = (studentId: string) => {
    handleUpdateStudentStatus(studentId, 'H');
  };

  const handleAssignInval = (teacherId: string, substituteName: string) => {
    setTeachers(prev => prev.map(t => {
      if (t.id === teacherId) {
        return {
          ...t,
          invalReplacement: substituteName,
          statusBadge: `Inval (${substituteName})`
        };
      }
      return t;
    }));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans antialiased text-[#1b1c1c] flex flex-col justify-between selection:bg-[#ffdad5] selection:text-[#b7000c]">
      {/* Dynamic Screen View */}
      {activeTab === 'dashboard' && (
        <DashboardScreen
          onNavigateTab={setActiveTab}
          onOpenQuickScan={() => setIsScanQrOpen(true)}
          onOpenAddStudent={() => setIsAddStudentOpen(true)}
        />
      )}

      {activeTab === 'siswa' && (
        <SiswaScreen
          students={students}
          onUpdateStatus={handleUpdateStudentStatus}
          onSelectStudent={setSelectedStudent}
          onOpenScanQr={() => setIsScanQrOpen(true)}
          onOpenNotif={() => setIsNotifOpen(true)}
          onOpenAddStudent={() => setIsAddStudentOpen(true)}
          currentClass={currentClass}
          onChangeClass={setCurrentClass}
          onBackToDashboard={() => setActiveTab('dashboard')}
        />
      )}

      {activeTab === 'guru' && (
        <GuruScreen
          teachers={teachers}
          onOpenFilter={() => setIsFilterGuruOpen(true)}
          onOpenPlotInval={(t) => {
            setTargetInvalTeacher(t || null);
            setIsPlotInvalOpen(true);
          }}
          onBackToDashboard={() => setActiveTab('dashboard')}
        />
      )}

      {activeTab === 'absensi' && (
        <AbsensiOverviewScreen
          onSelectClass={(cls) => {
            setCurrentClass(cls);
            setActiveTab('siswa');
          }}
          onOpenScanner={() => setIsScanQrOpen(true)}
          onBackToDashboard={() => setActiveTab('dashboard')}
        />
      )}

      {activeTab === 'menu' && (
        <BeritaScreen
          onBackToDashboard={() => setActiveTab('dashboard')}
        />
      )}

      {/* Global Bottom Navigation (Visible on mobile across views) */}
      <BottomNavigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* MODAL 1: Student Detail Bottom Sheet */}
      <StudentDetailModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onStatusChange={handleUpdateStudentStatus}
        onAddNote={handleUpdateStudentNotes}
      />

      {/* MODAL 2: Filter Guru Bottom Sheet */}
      <FilterGuruModal
        isOpen={isFilterGuruOpen}
        onClose={() => setIsFilterGuruOpen(false)}
        onApply={(filter) => {
          console.log('Applied teacher filter:', filter);
        }}
      />

      {/* MODAL 3: Scan QR & RFID Simulation */}
      <ScanQrModal
        isOpen={isScanQrOpen}
        onClose={() => setIsScanQrOpen(false)}
        students={students}
        onScanSuccess={handleScanSuccess}
      />

      {/* MODAL 4: Kirim Notifikasi WhatsApp */}
      <KirimNotifModal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        students={students}
      />

      {/* MODAL 5: Tambah Siswa Baru */}
      <TambahSiswaModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onAdd={handleAddStudent}
        currentClass={currentClass}
      />

      {/* MODAL 6: Plotting Guru Inval */}
      <PlotInvalModal
        isOpen={isPlotInvalOpen}
        onClose={() => {
          setIsPlotInvalOpen(false);
          setTargetInvalTeacher(null);
        }}
        teachers={teachers}
        selectedTeacher={targetInvalTeacher}
        onAssignInval={handleAssignInval}
      />
    </div>
  );
}
