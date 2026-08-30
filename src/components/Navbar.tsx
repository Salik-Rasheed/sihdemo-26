import React from 'react';
import { 
  Sparkles, 
  Layers, 
  BookOpen, 
  PlayCircle, 
  BarChart3, 
  Settings, 
  Award, 
  GitBranch, 
  Bot, 
  FileText, 
  Users, 
  ShieldCheck, 
  HelpCircle,
  LogOut,
  UserCheck
} from 'lucide-react';
import { UserRole } from '../types/karmai';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onLaunchJudgeDemo: () => void;
  onToggleChatAssistant: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  onChangeRole,
  onLaunchJudgeDemo,
  onToggleChatAssistant,
  onLogout
}) => {

  const learnerTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers },
    { id: 'competency-profile', label: 'Competency Profile', icon: BarChart3 },
    { id: 'gap-analysis', label: 'Priority Skill Gaps', icon: GitBranch },
    { id: 'learning-path', label: '30-Day Learning Path', icon: BookOpen },
    { id: 'igot-courses', label: 'iGOT Karmayogi', icon: Award },
    { id: 'material-studio', label: 'AI Material Studio & Quiz', icon: FileText },
  ];

  const adminTabs = [
    { id: 'admin-dashboard', label: 'Org Skill Intelligence', icon: BarChart3 },
    { id: 'org-heatmap', label: 'Organization Skill Heatmap', icon: Users },
    { id: 'training-effectiveness', label: 'Training Effectiveness', icon: Award },
    { id: 'competency-framework', label: 'Competency Framework', icon: GitBranch },
    { id: 'material-studio', label: 'Material & MCQ Studio', icon: FileText },
  ];

  const sysAdminTabs = [
    { id: 'sys-settings', label: 'User & Role Management', icon: Users },
    { id: 'sys-framework', label: 'Framework Config', icon: Settings },
    { id: 'sys-integrations', label: 'iGOT API & OAuth Settings', icon: ShieldCheck },
  ];

  const activeNavItems = 
    currentRole === 'TRAINING_ADMIN' ? adminTabs :
    currentRole === 'SYSTEM_ADMIN' ? sysAdminTabs :
    learnerTabs;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      
      {/* Official Top Tricolor Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center text-orange-400 font-extrabold shadow-sm">
              <Sparkles className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">KarmAI</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold uppercase tracking-wider">
                  MoSPI Platform
                </span>
              </div>
              <p className="text-[11px] text-blue-700 font-bold hidden sm:block">
                AI-Powered Competency & Learning Intelligence Platform
              </p>
            </div>
          </div>

          {/* Role Switcher & Chat Assistant Trigger */}
          <div className="flex items-center space-x-3">
            
            {/* Role Selector Pill */}
            <div className="hidden sm:flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg border border-slate-300">
              <UserCheck className="h-4 w-4 text-slate-500 ml-1.5" />
              <select
                value={currentRole}
                onChange={(e) => onChangeRole(e.target.value as UserRole)}
                className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-1"
              >
                <option value="LEARNER">Learner (Officer)</option>
                <option value="TRAINING_ADMIN">Training Admin</option>
                <option value="SYSTEM_ADMIN">System Admin</option>
              </select>
            </div>

            {/* KarmAI AI Assistant Trigger */}
            <button
              onClick={onToggleChatAssistant}
              className="px-3 py-1.5 rounded bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition flex items-center space-x-1.5 shadow-2xs"
            >
              <Bot className="h-4 w-4 text-purple-700 animate-bounce" />
              <span className="hidden md:inline">KarmAI Assistant</span>
            </button>

            {/* SIH Judge Demo Launcher CTA */}
            <button
              onClick={onLaunchJudgeDemo}
              className="px-3.5 py-1.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition flex items-center space-x-1.5 border border-blue-800"
            >
              <PlayCircle className="h-4 w-4 text-orange-300" />
              <span>Launch Demo</span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-slate-700 transition"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>

          </div>

        </div>

        {/* Dynamic Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-200 no-scrollbar">
          {activeNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-orange-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};
