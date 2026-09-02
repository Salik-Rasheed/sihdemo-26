import React from 'react';
import { LayoutGrid, BookOpen, BookMarked, FileText, User } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'learning-path', label: 'My Learning', icon: BookOpen },
    { id: 'igot-courses', label: 'Catalog', icon: BookMarked },
    { id: 'material-studio', label: 'Assessments', icon: FileText },
    { id: 'competency-profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#091328] border-t border-slate-800 px-2 py-2 text-white shadow-lg">
      <div className="grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#047857] text-white font-extrabold shadow-sm scale-105'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <Icon className={`h-5 w-5 mb-0.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="text-[10px] tracking-tight truncate w-full text-center">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
