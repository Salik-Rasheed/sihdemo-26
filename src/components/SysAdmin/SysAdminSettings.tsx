import React, { useState } from 'react';
import { Settings, Users, ShieldCheck, Key, Lock, Save, RefreshCw, CheckCircle2 } from 'lucide-react';

export const SysAdminSettings: React.FC = () => {
  const [apiBaseUrl, setApiBaseUrl] = useState('https://api.igotkarmayogi.gov.in/v2/integration');
  const [clientId, setClientId] = useState('KARMAI_CLIENT_MoSPI_9921');
  const [clientSecret, setClientSecret] = useState('••••••••••••••••••••••••');
  const [authMode, setAuthMode] = useState('OAuth 2.0');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Settings className="h-4 w-4 text-blue-700" />
              <span>40. System Administration & Security Configurations</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Role-based access control, environment variables, audit logs, and authorized API secrets.
            </p>
          </div>
          <span className="px-3 py-1 rounded text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
            System Admin Security
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Credentials Form */}
        <div className="lg:col-span-8 card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-5">
          <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <ShieldCheck className="h-4 w-4 text-blue-700" />
            <span>iGOT Integration & OAuth 2.0 Credentials</span>
          </h4>

          <form onSubmit={handleSave} className="space-y-4 text-xs font-bold">
            <div>
              <label className="block text-slate-700 mb-1">API Base URL</label>
              <input
                type="text"
                value={apiBaseUrl}
                onChange={(e) => setApiBaseUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 mb-1">Client ID</label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Client Secret (Encrypted)</label>
                <input
                  type="password"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 mb-1">Authentication Mechanism</label>
              <select
                value={authMode}
                onChange={(e) => setAuthMode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 outline-none"
              >
                <option value="OAuth 2.0">OAuth 2.0 Client Credentials Grant</option>
                <option value="API Key">API Key Header</option>
                <option value="Bearer">Bearer Token Authorization</option>
              </select>
            </div>

            {savedSuccess && (
              <div className="p-3 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>Security configuration saved!</span>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition flex items-center space-x-2 border border-blue-800"
              >
                <Save className="h-4 w-4" />
                <span>Save Configuration</span>
              </button>
            </div>
          </form>
        </div>

        {/* Audit Logs */}
        <div className="lg:col-span-4 card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
          <h4 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-3">
            System Audit & Access Logs
          </h4>
          <div className="space-y-3 text-xs font-medium">
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900">OAuth Credentials Updated</div>
              <div className="text-[10px] text-slate-500">Today, 10:42 AM • Admin User</div>
            </div>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900">Competency Mapping Refreshed</div>
              <div className="text-[10px] text-slate-500">Today, 09:15 AM • iGOT Sync Bus</div>
            </div>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900">New Learner Onboarded</div>
              <div className="text-[10px] text-slate-500">Yesterday, 04:30 PM • Rajesh Kumar</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
