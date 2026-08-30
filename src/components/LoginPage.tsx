import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ArrowRight, PlayCircle, Lock, Mail, UserCheck } from 'lucide-react';
import { UserRole } from '../types/karmai';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole) => void;
  onLaunchJudgeDemo: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onLaunchJudgeDemo }) => {
  const [employeeId, setEmployeeId] = useState('MoSPI-78219');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<UserRole>('LEARNER');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(role);
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="card-panel rounded-2xl p-8 bg-white border border-slate-200 shadow-sm space-y-6">
        
        {/* Top Emblem Header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-xl bg-slate-900 mx-auto flex items-center justify-center text-orange-400 font-extrabold shadow-sm">
            <Sparkles className="h-7 w-7 text-orange-400" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">KarmAI</h1>
          <p className="text-xs text-blue-700 font-bold">
            AI-Powered Competency & Learning Intelligence Platform
          </p>
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-slate-100 text-[11px] font-bold text-slate-700 border border-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-700" />
            <span>India's Official Statistical System</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Operating Role
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded px-3 py-2 text-xs font-bold text-slate-900 outline-none"
              >
                <option value="LEARNER">Learner (Statistical Officer)</option>
                <option value="TRAINING_ADMIN">Training Administrator</option>
                <option value="SYSTEM_ADMIN">System Administrator</option>
              </select>
              <UserCheck className="h-4 w-4 absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Employee ID / Email
            </label>
            <div className="relative">
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded pl-9 pr-3 py-2 text-xs text-slate-900 font-semibold outline-none"
              />
              <Mail className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                Password
              </label>
              <a href="#forgot" className="text-[11px] font-bold text-blue-700 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded pl-9 pr-3 py-2 text-xs text-slate-900 font-semibold outline-none"
              />
              <Lock className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs shadow transition flex items-center justify-center space-x-2 border border-blue-800"
          >
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4 text-orange-300" />
          </button>

        </form>

        {/* Demo Mode Button */}
        <div className="pt-4 border-t border-slate-200">
          <button
            onClick={onLaunchJudgeDemo}
            className="w-full py-3 rounded bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow transition flex items-center justify-center space-x-2 border border-slate-900"
          >
            <PlayCircle className="h-4 w-4 text-orange-400" />
            <span>Launch SIH Demo Mode</span>
          </button>
        </div>

      </div>
    </div>
  );
};
