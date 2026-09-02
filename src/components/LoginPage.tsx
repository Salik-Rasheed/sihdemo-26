import React, { useState } from 'react';
import { Landmark, User, Key, ArrowRight, ShieldCheck, ArrowLeft, Building2, GraduationCap, Shield } from 'lucide-react';
import { UserRole } from '../types/karmai';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole) => void;
  onBackToPortal: () => void;
  initialRole?: UserRole;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onBackToPortal,
  initialRole = 'LEARNER'
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);

  // Role preset configurations for sample logins without hardcoded personal names
  const roleConfigs = [
    {
      id: 'LEARNER' as UserRole,
      title: 'Employee / Learner',
      code: 'EMP001',
      icon: User,
      desc: 'Official Learner & Statistical Officer Workspace',
    },
    {
      id: 'TRAINER' as UserRole,
      title: 'Trainer / Educator',
      code: 'TRN001',
      icon: GraduationCap,
      desc: 'Content Authoring & Automated Assessment Studio',
    },
    {
      id: 'DEPARTMENT_ADMIN' as UserRole,
      title: 'Department Admin',
      code: 'ADM001',
      icon: Building2,
      desc: 'Nodal Officer & Organization Skill Heatmaps',
    },
    {
      id: 'SYSTEM_ADMIN' as UserRole,
      title: 'System Admin',
      code: 'SYS001',
      icon: Shield,
      desc: 'Ministry AI Platform & iGOT API Integration',
    },
  ];

  const currentRoleConfig = roleConfigs.find(r => r.id === selectedRole) || roleConfigs[0];

  const [userId, setUserId] = useState(currentRoleConfig.code);
  const [password, setPassword] = useState('••••••••••••');

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    const config = roleConfigs.find(r => r.id === role);
    if (config) {
      setUserId(config.code);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedRole);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center py-6 px-4 bg-[#f1f5f9]">
      
      {/* Top Left Navigation Link */}
      <div className="w-full max-w-lg mb-4">
        <button
          onClick={onBackToPortal}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 hover:text-[#047857] transition"
        >
          <ArrowLeft className="h-4 w-4 text-slate-600" />
          <span>Back to Portal</span>
        </button>
      </div>

      {/* Main Login Card Container */}
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10 space-y-6">
        
        {/* Header Icon & Title */}
        <div className="text-center space-y-3">
          <div className="h-16 w-16 rounded-2xl bg-[#047857] text-white mx-auto flex items-center justify-center shadow-md">
            <Landmark className="h-9 w-9 text-white stroke-[2]" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Secure Login
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
              Government Employee Learning & Development Portal
            </p>
          </div>
        </div>

        {/* Role Selection Buttons (Sample Login for All) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-center">
            Select Portal Role (Sample Credential Presets)
          </label>
          
          <div className="grid grid-cols-2 gap-2">
            {roleConfigs.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleSelectRole(role.id)}
                  className={`p-3 rounded-2xl border text-left transition flex items-start space-x-2.5 ${
                    isSelected
                      ? 'bg-emerald-50/80 border-[#047857] ring-2 ring-[#047857]/20 text-[#047857]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-[#047857] text-white' : 'bg-slate-200 text-slate-600'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-extrabold truncate">{role.title}</div>
                    <div className="text-[10px] font-bold text-slate-500">ID: {role.code}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form matching Screenshot 1 */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          
          {/* User ID Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Employee ID / Official User ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                className="w-full bg-[#f8fafc] border border-slate-300 focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition"
                placeholder="Enter Official User ID"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Password
              </label>
              <a
                href="#forgot"
                onClick={(e) => { e.preventDefault(); alert('Password reset instructions have been sent to your registered official government email.'); }}
                className="text-xs font-bold text-[#047857] hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Key className="h-4 w-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#f8fafc] border border-slate-300 focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center space-x-2 border border-[#047857]"
          >
            <span>Authenticate & Sign In</span>
            <ArrowRight className="h-4 w-4 text-white" />
          </button>

        </form>

        {/* Security Notice Banner */}
        <div className="p-3.5 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center space-x-3 text-xs text-[#166534]">
          <ShieldCheck className="h-5 w-5 text-[#047857] shrink-0" />
          <span className="font-semibold leading-tight">
            Authorized users only. Access to this system is monitored and protected.
          </span>
        </div>

      </div>

      {/* Support Footer Notice updated to support.karmai@gov.in */}
      <div className="mt-6 text-center text-xs font-medium text-slate-600">
        Need assistance? Contact Portal Administrator at{' '}
        <a href="mailto:support.karmai@gov.in" className="text-slate-800 font-bold hover:underline">
          support.karmai@gov.in
        </a>
      </div>

    </div>
  );
};
