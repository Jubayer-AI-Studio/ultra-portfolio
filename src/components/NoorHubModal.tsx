import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Users,
  CreditCard,
  Building2,
  Server,
  Printer,
  Search,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileText,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { sound } from '../utils/sound';

interface NoorHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StudentRecord {
  id: string;
  name: string;
  roll: string;
  department: string;
  guardian: string;
  phone: string;
  feeStatus: 'Paid' | 'Due';
  amount: number;
}

export const NoorHubModal: React.FC<NoorHubModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'fees' | 'teachers' | 'security'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [receiptStudent, setReceiptStudent] = useState<StudentRecord | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sample verified student data
  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: 'S-101',
      name: 'Muhammad Abdullah',
      roll: '101',
      department: 'Hifz Department',
      guardian: 'Mawlana Rafiqul Islam',
      phone: '01712-345678',
      feeStatus: 'Paid',
      amount: 3500,
    },
    {
      id: 'S-102',
      name: 'Muhammad Hasanuzzaman',
      roll: '102',
      department: 'Kitab Studies (Mishkat)',
      guardian: 'Abdul Baten',
      phone: '01823-456789',
      feeStatus: 'Due',
      amount: 4000,
    },
    {
      id: 'S-103',
      name: 'Abdur Rahman Tasnim',
      roll: '103',
      department: 'Noorani Primary',
      guardian: 'Mufti Shafiqul Hasan',
      phone: '01934-567890',
      feeStatus: 'Paid',
      amount: 2800,
    },
    {
      id: 'S-104',
      name: 'Mahmudul Hasan Fuad',
      roll: '104',
      department: 'Hifz Department',
      guardian: 'Faridul Haque',
      phone: '01645-678901',
      feeStatus: 'Paid',
      amount: 3500,
    },
    {
      id: 'S-105',
      name: 'Muhammad Tahmid Iqbal',
      roll: '105',
      department: 'Kitab Studies (Sharh)',
      guardian: 'Iqbal Hossain',
      phone: '01756-789012',
      feeStatus: 'Due',
      amount: 3800,
    },
    {
      id: 'S-106',
      name: 'Junaid Ahmad Sakib',
      roll: '106',
      department: 'Noorani Primary',
      guardian: 'Mawlana Kamrul Hasan',
      phone: '01867-890123',
      feeStatus: 'Paid',
      amount: 2800,
    },
  ]);

  // Sample Teachers Data
  const teachers = [
    { name: 'Mufti Mahfuzur Rahman', role: 'Principal / Admin', dept: 'General Administration', phone: '01711-000111', status: 'Active' },
    { name: 'Qari Mizanur Rahman', role: 'Head Qari', dept: 'Hifz Department', phone: '01812-000222', status: 'Active' },
    { name: 'Mawlana Shafiqul Islam', role: 'Senior Professor', dept: 'Kitab Studies', phone: '01913-000333', status: 'Active' },
    { name: 'Abdul Qayyum', role: 'Chief Accountant', dept: 'Finance & Invoicing', phone: '01614-000444', status: 'Active' },
  ];

  if (!isOpen) return null;

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.roll.includes(searchQuery) || 
                          s.phone.includes(searchQuery);
    const matchesDept = selectedDept === 'All' || s.department.includes(selectedDept);
    return matchesSearch && matchesDept;
  });

  const totalCollected = students.filter(s => s.feeStatus === 'Paid').reduce((acc, s) => acc + s.amount, 0);
  const totalDue = students.filter(s => s.feeStatus === 'Due').reduce((acc, s) => acc + s.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className={`relative w-full bg-slate-950 text-slate-100 rounded-3xl border border-cyan-500/40 shadow-[0_25px_80px_rgba(0,240,255,0.25)] flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'h-full max-w-full rounded-none' : 'max-w-6xl max-h-[92vh] h-[850px]'
        }`}
      >
        {/* Top Window Bar */}
        <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 select-none">
          
          {/* Logo & Institute Meta */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-cyan-500/30">
              N
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans font-black text-white text-base tracking-tight">
                  NOORHUB
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold">
                  v2.4.0 SaaS Live
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Cloudflare Zero Trust
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans">
                Darul Uloom Islamic Institute &amp; Academy • Session 2026
              </div>
            </div>
          </div>

          {/* Quick Header Actions: Two Clear Portals (Live vs GitHub) */}
          <div className="flex items-center gap-2">
            
            {/* Direct GitHub Code Button */}
            <a
              href="https://github.com/Jubayer-AI-Studio/NoorHub-Madrasa-Management-SaaS"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="View Source Code on GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub Code</span>
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button (No Red: Slate with Hover Glow) */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors cursor-pointer shadow-md border border-slate-700"
              title="Close Application"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Live Top KPI Status Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/60 border-b border-slate-800 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-[10px]">Total Enrolled</div>
              <div className="text-xl font-black text-cyan-300 font-sans">{students.length} Students</div>
            </div>
            <Users className="w-5 h-5 text-cyan-400/70" />
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-[10px]">Collected Fees (MTD)</div>
              <div className="text-xl font-black text-emerald-400 font-sans">BDT {totalCollected.toLocaleString()}</div>
            </div>
            <CreditCard className="w-5 h-5 text-emerald-400/70" />
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-[10px]">Outstanding Dues</div>
              <div className="text-xl font-black text-amber-400 font-sans">BDT {totalDue.toLocaleString()}</div>
            </div>
            <AlertCircle className="w-5 h-5 text-amber-400/70" />
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-[10px]">Edge Server Status</div>
              <div className="text-sm font-black text-emerald-300 flex items-center gap-1.5 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE 100%</span>
              </div>
            </div>
            <Server className="w-5 h-5 text-purple-400/70" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'students', label: '👨‍🎓 Student Directory' },
              { id: 'fees', label: '💳 Fee Invoicing' },
              { id: 'teachers', label: '👨‍🏫 Faculty & Staff' },
              { id: 'security', label: '🔒 Cloud Security & RBAC' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 py-2.5 rounded-t-xl font-sans text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-cyan-400 border-t-2 border-cyan-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-[11px] font-mono text-slate-500 pb-2 hidden sm:block">
            Role: <span className="text-cyan-400 font-bold">Super Admin (Jubayer Ahmad)</span>
          </div>
        </div>

        {/* Main Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-950 text-slate-200 space-y-6">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Welcome Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
                    Welcome to NOORHUB Management Suite
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
                    Complete educational institution automation. Student admissions, attendance records, exam results, and automated monthly billing engine consolidated in one secure portal.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('students');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-sans font-black text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Enroll Student</span>
                  </button>
                </div>
              </div>

              {/* Grid: Fee Analytics & Recent Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Visual Fee Collection Analytics */}
                <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      <span>Monthly Fee Collection Analytics (2026)</span>
                    </span>
                    <span className="text-emerald-400">87% Realized</span>
                  </div>

                  <div className="space-y-3 pt-2 font-mono text-xs">
                    {[
                      { month: 'January', amount: 'BDT 2,20,000', pct: 90, color: 'bg-emerald-500' },
                      { month: 'February', amount: 'BDT 2,35,000', pct: 94, color: 'bg-emerald-500' },
                      { month: 'March', amount: 'BDT 2,45,000', pct: 96, color: 'bg-cyan-500' },
                      { month: 'Current Month', amount: `BDT ${totalCollected.toLocaleString()}`, pct: 88, color: 'bg-amber-500' },
                    ].map((row, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px] text-slate-300">
                          <span>{row.month}</span>
                          <span className="font-bold">{row.amount}</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${row.pct}%` }}
                            className={`h-full ${row.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Department Distribution */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                  <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    <span>Department Enrollment Distribution</span>
                  </div>

                  <div className="space-y-3 font-sans text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">Hifz Department</div>
                        <div className="text-[11px] text-slate-400">Lead: Qari Mizanur Rahman</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono font-bold">
                        185 Students
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">Kitab Studies (Advanced)</div>
                        <div className="text-[11px] text-slate-400">Lead: Mawlana Shafiqul Islam</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 font-mono font-bold">
                        112 Students
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">Noorani Primary Section</div>
                        <div className="text-[11px] text-slate-400">Lead: Qari Abdul Haque</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono font-bold">
                        131 Students
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: STUDENTS DIRECTORY */}
          {activeTab === 'students' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-900 rounded-2xl border border-slate-800">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, roll, or mobile..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                  {['All', 'Hifz', 'Kitab', 'Noorani'].map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer whitespace-nowrap ${
                        selectedDept === dept
                          ? 'bg-cyan-500 text-black font-black'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {dept === 'All' ? 'All Sections' : dept}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      sound.playClick();
                      const newId = `S-${students.length + 101}`;
                      const newStudent: StudentRecord = {
                        id: newId,
                        name: 'New Student ' + (students.length + 1),
                        roll: String(students.length + 101),
                        department: 'Hifz Department',
                        guardian: 'Guardian',
                        phone: '01700-112233',
                        feeStatus: 'Paid',
                        amount: 3500,
                      };
                      setStudents([newStudent, ...students]);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-sans font-black text-xs flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>

              {/* Students Table with Smooth Mobile Horizontal Scrolling */}
              <div className="rounded-2xl border border-slate-800 overflow-x-auto bg-slate-900/60 scrollbar-thin scrollbar-thumb-slate-700">
                <table className="w-full min-w-[620px] text-left text-xs font-sans">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Roll</th>
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Guardian &amp; Contact</th>
                      <th className="p-3">Monthly Fee</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-cyan-300">{student.roll}</td>
                        <td className="p-3 font-bold text-white">{student.name}</td>
                        <td className="p-3 text-slate-300">{student.department}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-400">
                          <div>{student.guardian}</div>
                          <div>{student.phone}</div>
                        </td>
                        <td className="p-3 font-mono font-bold">BDT {student.amount}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              student.feeStatus === 'Paid'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}
                          >
                            {student.feeStatus === 'Paid' ? 'Paid' : 'Due'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              sound.playClick();
                              setReceiptStudent(student);
                            }}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-mono inline-flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Printer className="w-3 h-3" />
                            <span>Receipt</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: FEES & INVOICING */}
          {activeTab === 'fees' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-base">Automated Monthly Invoice Generator</h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Generate monthly fee slips and dispatch automated SMS alerts in a single click.
                  </p>
                </div>
                <button
                  onClick={() => sound.playSuccess()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-sans font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Invoices for All</span>
                </button>
              </div>

              {/* Sample Receipt Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{student.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{student.department} • Roll: {student.roll}</div>
                      <div className="font-mono text-cyan-400 font-bold text-xs mt-1">Fee: BDT {student.amount}</div>
                    </div>

                    <button
                      onClick={() => setReceiptStudent(student)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TEACHERS & STAFF */}
          {activeTab === 'teachers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-150">
              {teachers.map((teacher, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-white text-sm">{teacher.name}</div>
                    <div className="text-xs text-cyan-400 font-mono">{teacher.role}</div>
                    <div className="text-xs text-slate-400">{teacher.dept}</div>
                    <div className="text-[11px] font-mono text-slate-500 pt-1">Phone: {teacher.phone}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                    {teacher.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: CLOUDFLARE SECURITY & RBAC */}
          {activeTab === 'security' && (
            <div className="space-y-5 animate-in fade-in duration-150 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span>Cloudflare Zero Trust Tunnel Protection</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed font-sans">
                  All sensitive student data and accounting ledgers sync seamlessly via encrypted cloud tunnels without exposing any public web ports.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-500 text-[10px]">Tunnel Protocol</div>
                    <div className="text-white font-bold mt-0.5">QUIC / HTTP3</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-500 text-[10px]">Encryption Standard</div>
                    <div className="text-white font-bold mt-0.5">TLS 1.3 / AES-256</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-slate-500 text-[10px]">RBAC Security Policy</div>
                    <div className="text-emerald-400 font-bold mt-0.5">Enterprise Strict</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Architect: <strong>Jubayer Ahmad</strong></span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* OPTION 1: GitHub Source Code Button */}
            <a
              href="https://noorhub.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Launch Live SaaS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Close / Return Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-sans font-black text-xs transition-all shadow-md cursor-pointer"
            >
              <span>Back to Portfolio [✕]</span>
            </button>
          </div>
        </div>

        {/* Printable Money Receipt Popup */}
        {receiptStudent && (
          <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border-4 border-emerald-600 space-y-4 font-sans animate-in zoom-in-95 duration-150">
              
              <div className="text-center pb-3 border-b-2 border-dashed border-slate-300">
                <div className="text-lg font-black text-emerald-800">Darul Uloom Islamic Institute</div>
                <div className="text-xs text-slate-600 mt-0.5">Official Fee Invoicing Voucher (NOORHUB SaaS)</div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Receipt No:</span>
                  <span className="font-mono font-bold">REC-2026-{receiptStudent.roll}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Student Name:</span>
                  <span className="font-bold text-slate-900">{receiptStudent.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Roll No:</span>
                  <span className="font-mono font-bold">{receiptStudent.roll}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Department:</span>
                  <span>{receiptStudent.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Guardian:</span>
                  <span>{receiptStudent.guardian}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold">
                  <span>Amount Paid:</span>
                  <span className="text-emerald-700 font-mono">BDT {receiptStudent.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-600 font-bold">
                  <span>Status:</span>
                  <span>PAID (Verified via NOORHUB Edge)</span>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-dashed border-slate-300 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    sound.playSuccess();
                    alert('Receipt voucher sent to print queue!');
                    setReceiptStudent(null);
                  }}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setReceiptStudent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
