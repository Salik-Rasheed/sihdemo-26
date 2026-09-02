import React from 'react';
import { Lock, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { UserRole } from '../types/karmai';

interface RoleGuardModalProps {
  isOpen: boolean;
  targetRole: UserRole | string;
  currentRole: UserRole;
  onClose: () => void;
  onGoToLogin: (suggestedRole: UserRole) => void;
}

export const RoleGuardModal: React.FC<RoleGuardModalProps> = ({
  isOpen,
  targetRole,
  currentRole,
  onClose,
  onGoToLogin,
}) => {
  if (!isOpen) return null;

  const roleTitles: Record<string, string> = {
    LEARNER: 'Official Learner / Employee',
    TRAINER: 'Trainer / Content Author',
    DEPARTMENT_ADMIN: 'Department Nodal Administrator',
    TRAINING_ADMIN: 'Training Administrator',
    SYSTEM_ADMIN: 'Ministry System Administrator',
  };

  const currentTitle = roleTitles[currentRole] || currentRole;
  const targetTitle = roleTitles[targetRole] || targetRole;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-700">
            <Lock className="h-6 w-6 text-amber-700" />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Role Authentication Required
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-1">
              You are currently authenticated as <strong className="text-slate-900">{currentTitle}</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-left text-xs space-y-1.5">
            <div className="flex items-center space-x-1.5 text-amber-900 font-bold">
              <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0" />
              <span>Role Access Control Notice</span>
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">
              Access to <strong className="text-slate-900">{targetTitle}</strong> workspace requires explicit login authentication. Cross-dashboard access without respective role login is restricted for government security compliance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition border border-slate-300"
            >
              Stay in Current Role
            </button>

            <button
              onClick={() => onGoToLogin(targetRole as UserRole)}
              className="w-full py-2.5 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white font-bold text-xs shadow-sm transition flex items-center justify-center space-x-1.5 border border-[#047857]"
            >
              <span>Authenticate for {targetTitle.split('/')[0]}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
