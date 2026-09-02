import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  ChevronDown, 
  Landmark, 
  LayoutGrid, 
  BookOpen, 
  BookMarked, 
  Calendar, 
  FileText, 
  Award, 
  User, 
  LogOut, 
  ShieldCheck, 
  Bot, 
  CheckCircle2
} from 'lucide-react';
import { UserRole } from '../types/karmai';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRole: UserRole;
  onChangeRoleRequest: (role: UserRole) => void;
  onToggleChatAssistant: () => void;
  onLogout: () => void;
  userName?: string;
  userDesignation?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  onChangeRoleRequest,
  onToggleChatAssistant,
  onLogout,
  userName = "Arun Kumar",
  userDesignation = "Statistical Officer"
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Tab configurations per role
  const learnerTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'learning-path', label: 'My Learning', icon: BookOpen },
    { id: 'igot-courses', label: 'Courses Catalog', icon: BookMarked },
    { id: 'gap-analysis', label: 'Priority Skill Gaps', icon: Calendar },
    { id: 'material-studio', label: 'Assessments & Studio', icon: FileText },
    { id: 'competency-profile', label: 'Certificates & Ratings', icon: Award },
  ];

  const trainerTabs = [
    { id: 'material-studio', label: 'AI Material & MCQ Studio', icon: FileText },
    { id: 'competency-framework', label: 'Competency Tagging', icon: BookMarked },
    { id: 'igot-courses', label: 'iGOT Course Mapping', icon: Award },
  ];

  const adminTabs = [
    { id: 'admin-dashboard', label: 'Org & Dept Intelligence', icon: LayoutGrid },
    { id: 'org-heatmap', label: 'Department Skill Heatmap', icon: FileText },
    { id: 'training-effectiveness', label: 'Training Effectiveness', icon: Award },
  ];

  const sysAdminTabs = [
    { id: 'sys-settings', label: 'User & Role Management', icon: LayoutGrid },
    { id: 'sys-framework', label: 'Framework Config', icon: BookMarked },
    { id: 'sys-integrations', label: 'iGOT API Settings', icon: ShieldCheck },
  ];

  const activeNavItems = 
    currentRole === 'TRAINER' ? trainerTabs :
    currentRole === 'DEPARTMENT_ADMIN' || (currentRole as string) === 'TRAINING_ADMIN' ? adminTabs :
    currentRole === 'SYSTEM_ADMIN' ? sysAdminTabs :
    learnerTabs;

  const roleTitleMap: Record<string, string> = {
    LEARNER: 'EMPLOYEE PORTAL',
    TRAINER: 'TRAINER PORTAL',
    DEPARTMENT_ADMIN: 'ADMIN PORTAL',
    SYSTEM_ADMIN: 'SYSTEM ADMIN PORTAL',
  };

  const sampleNotifications = [
    {
      id: 1,
      title: 'Training Schedule Update',
      message: 'Your enrolled module "Data Analysis & Wrangling Fundamentals" has a new evaluation assignment due on March 15, 2026.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Assessment Completion Confirmed',
      message: 'Your evaluation score of 80% on Data Analytics Diagnostic has been logged into your official profile.',
      time: '1 day ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Quarterly Training Report Generated',
      message: 'Department of Economic Statistics quarterly capacity building report is now available for review.',
      time: '3 days ago',
      unread: false,
    },
  ];

  const searchResults = [
    { title: 'Data Analysis & Wrangling Fundamentals with Python', category: 'Course', tab: 'igot-courses' },
    { title: 'NSSO Survey Methodology & Sampling Frame Manual', category: 'Material', tab: 'material-studio' },
    { title: 'National Statistical Systems Competency Benchmark', category: 'Framework', tab: 'competency-profile' },
    { title: 'Department of Economic Statistics Skill Gaps', category: 'Analytics', tab: 'admin-dashboard' },
  ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      {/* Top Main Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        
        {/* Top Tricolor Banner Line */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-[#047857]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            
            {/* Left: Mobile Drawer Trigger & Brand Logo */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                aria-label="Open Navigation Drawer"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div 
                onClick={() => setActiveTab('dashboard')} 
                className="flex items-center space-x-2.5 cursor-pointer"
              >
                <div className="h-9 w-9 rounded-xl bg-[#047857] flex items-center justify-center text-white font-extrabold shadow-xs">
                  <Landmark className="h-5 w-5" />
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-extrabold text-base text-slate-900 tracking-tight">Karm AI</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-50 text-[#047857] border border-emerald-200 uppercase">
                      Portal
                    </span>
                  </div>
                  <p className="text-[10px] text-[#047857] font-bold tracking-wide">
                    {roleTitleMap[currentRole] || 'EMPLOYEE PORTAL'}
                  </p>
                </div>
              </div>
            </div>

            {/* Center: Search Bar matching Screenshot 2 */}
            <div className="flex-1 max-w-md relative">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search courses, departments, programs..."
                  className="w-full bg-slate-50 border border-slate-300 focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 rounded-full pl-10 pr-4 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none transition"
                />
              </div>

              {/* Search Popup Dropdown */}
              {isSearchOpen && searchQuery.length > 0 && (
                <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-fade-in">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase">Search Results</div>
                  {searchResults.length > 0 ? (
                    searchResults.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveTab(item.tab);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between text-xs transition"
                      >
                        <span className="font-semibold text-slate-800">{item.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#047857] border border-emerald-200">{item.category}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-xs text-slate-500 text-center font-medium">No matching programs found</div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Notifications & Profile Badge */}
            <div className="flex items-center space-x-2.5">

              {/* Notification Bell Dropdown Button (Screenshot 4) */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsProfileMenuOpen(false);
                  }}
                  className="p-2 rounded-full text-slate-600 hover:bg-slate-100 relative transition"
                  aria-label="View Notifications"
                >
                  <Bell className="h-5 w-5 text-slate-700" />
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </button>

                {/* Notifications Popup Dropdown matching Screenshot 4 */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                        Official Notifications
                      </h4>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-[#047857]">
                        3 Total
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                      {sampleNotifications.map((notif) => (
                        <div key={notif.id} className="p-3.5 hover:bg-slate-50/80 transition space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{notif.title}</span>
                            <span className="text-[10px] font-medium text-slate-400">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-normal font-medium">
                            {notif.message}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="p-2 text-center bg-slate-50 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setActiveTab('dashboard');
                          setIsNotificationsOpen(false);
                        }}
                        className="text-[11px] font-bold text-[#047857] hover:underline"
                      >
                        View All System Notifications →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Avatar Badge matching Screenshots 2 & 4 */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                    setIsNotificationsOpen(false);
                  }}
                  className="flex items-center space-x-1 p-1 rounded-full hover:bg-slate-100 transition"
                >
                  <div className="h-8 w-8 rounded-full bg-[#047857] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    {userName.charAt(0)}
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                </button>

                {/* Profile Role Menu Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900">{userName}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{userDesignation}</div>
                      <div className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[#047857] text-[10px] font-extrabold">
                        Role: {currentRole}
                      </div>
                    </div>

                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase mt-1">Switch Role Portal</div>
                    
                    <button
                      onClick={() => {
                        onChangeRoleRequest('LEARNER');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>Learner (Employee)</span>
                      {currentRole === 'LEARNER' && <CheckCircle2 className="h-3.5 w-3.5 text-[#047857]" />}
                    </button>

                    <button
                      onClick={() => {
                        onChangeRoleRequest('TRAINER');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>Trainer / Educator</span>
                      {currentRole === 'TRAINER' && <CheckCircle2 className="h-3.5 w-3.5 text-[#047857]" />}
                    </button>

                    <button
                      onClick={() => {
                        onChangeRoleRequest('DEPARTMENT_ADMIN');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>Department Admin</span>
                      {currentRole === 'DEPARTMENT_ADMIN' && <CheckCircle2 className="h-3.5 w-3.5 text-[#047857]" />}
                    </button>

                    <button
                      onClick={() => {
                        onChangeRoleRequest('SYSTEM_ADMIN');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>System Admin</span>
                      {currentRole === 'SYSTEM_ADMIN' && <CheckCircle2 className="h-3.5 w-3.5 text-[#047857]" />}
                    </button>

                    <div className="border-t border-slate-100 mt-2 pt-1">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4 text-red-500" />
                        <span>Sign Out Portal</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Desktop Nav Items Bar */}
          <nav className="hidden md:flex space-x-1 py-2 border-t border-slate-100 overflow-x-auto no-scrollbar">
            {activeNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-[#047857] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

        </div>
      </header>

      {/* Slide-Out Navigation Drawer Sidebar matching Screenshot 3 */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex animate-fade-in">
          {/* Overlay backdrop */}
          <div 
            onClick={() => setIsDrawerOpen(false)} 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Sidebar Content */}
          <div className="relative w-80 max-w-full bg-[#091328] text-white flex flex-col h-full z-50 shadow-2xl">
            
            {/* Drawer Top Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-[#047857] flex items-center justify-center text-white font-extrabold shadow-sm">
                  <Landmark className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white tracking-wide">Karm AI Portal</h3>
                  <span className="text-[10px] font-extrabold text-[#34d399] uppercase tracking-wider block">
                    {roleTitleMap[currentRole] || 'EMPLOYEE PORTAL'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Category Label */}
            <div className="px-4 pt-5 pb-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                LEARNER NAVIGATION
              </span>
            </div>

            {/* Drawer Menu Links matching Screenshot 3 */}
            <div className="flex-1 overflow-y-auto px-3 space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
                { id: 'learning-path', label: 'My Learning', icon: BookOpen },
                { id: 'igot-courses', label: 'Courses Catalog', icon: BookMarked },
                { id: 'gap-analysis', label: 'Training Calendar', icon: Calendar },
                { id: 'material-studio', label: 'Assessments', icon: FileText },
                { id: 'competency-profile', label: 'Certificates', icon: Award },
                { id: 'profile', label: 'My Profile', icon: User },
              ].map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setIsDrawerOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-bold transition ${
                      isActive
                        ? 'bg-[#047857] text-white shadow-sm font-extrabold'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* User Profile Footer Card in Sidebar matching Screenshot 3 */}
            <div className="p-4 bg-[#050b18] border-t border-slate-800 flex items-center space-x-3">
              <div className="h-9 w-9 rounded-xl bg-[#047857] text-white flex items-center justify-center font-black text-sm">
                AK
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-xs font-extrabold text-white truncate">{userName}</div>
                <div className="text-[10px] font-medium text-slate-400 truncate">{userDesignation}</div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
