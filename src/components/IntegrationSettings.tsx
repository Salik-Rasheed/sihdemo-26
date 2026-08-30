import React, { useState } from 'react';
import { 
  Settings, 
  CheckCircle2, 
  AlertTriangle, 
  Save, 
  RefreshCw,
  Lock
} from 'lucide-react';
import { IntegrationMode, IntegrationSettingsConfig } from '../types/igot';

interface IntegrationSettingsProps {
  settings: IntegrationSettingsConfig;
  onUpdateSettings: (newSettings: Partial<IntegrationSettingsConfig>) => void;
  onTestConnection: () => Promise<boolean>;
}

export const IntegrationSettings: React.FC<IntegrationSettingsProps> = ({
  settings,
  onUpdateSettings,
  onTestConnection
}) => {
  const [formData, setFormData] = useState<IntegrationSettingsConfig>({ ...settings });
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [simulatedError, setSimulatedError] = useState<'NONE' | 'CONNECTION' | 'AUTH' | 'SYNC'>('NONE');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);

    await new Promise(r => setTimeout(r, 800));

    if (simulatedError === 'CONNECTION') {
      setTestResult({
        success: false,
        message: "Unable to connect to the iGOT integration service at https://api.igotkarmayogi.gov.in."
      });
    } else if (simulatedError === 'AUTH') {
      setTestResult({
        success: false,
        message: "Authentication Error: Authorization token rejected by iGOT OAuth server."
      });
    } else {
      setTestResult({
        success: true,
        message: `Connection Successful! Response 200 OK from ${formData.apiBaseUrl} (Latency: 42ms)`
      });
    }

    setIsTesting(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Settings className="h-4 w-4 text-blue-700" />
              <span>23 & 24. iGOT Integration Settings & Error Handling</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Configure authorized API credentials, OAuth 2.0 endpoints, and test error resiliency.
            </p>
          </div>
          <span className="px-3 py-1 rounded text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            API Credentials Configuration
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
          <form onSubmit={handleSave} className="space-y-5">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Integration Operating Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: 'PROTOTYPE_DEMO' })}
                  className={`p-3.5 rounded text-left border transition ${
                    formData.mode === 'PROTOTYPE_DEMO'
                      ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold mb-1">Prototype / Demo</div>
                  <div className="text-[11px] font-medium opacity-90">Full mock dataset layer for SIH testing</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: 'API_READY' })}
                  className={`p-3.5 rounded text-left border transition ${
                    formData.mode === 'API_READY'
                      ? 'bg-amber-50 border-amber-600 text-amber-900 shadow-xs'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold mb-1">API Ready</div>
                  <div className="text-[11px] font-medium opacity-90">Modular routes waiting for live keys</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mode: 'LIVE_AUTHORIZED' })}
                  className={`p-3.5 rounded text-left border transition ${
                    formData.mode === 'LIVE_AUTHORIZED'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold mb-1">Live Authorized</div>
                  <div className="text-[11px] font-medium opacity-90">Connected to production iGOT APIs</div>
                </button>

              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                API Base URL (Environment Variable)
              </label>
              <input
                type="text"
                value={formData.apiBaseUrl}
                onChange={(e) => setFormData({ ...formData, apiBaseUrl: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded px-4 py-2 text-xs text-slate-900 outline-none font-mono font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Client ID (Secure Configuration)
                </label>
                <input
                  type="text"
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded px-4 py-2 text-xs text-slate-900 outline-none font-mono font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                  <span>Client Secret (Encrypted)</span>
                  <span className="text-[10px] text-slate-500 font-normal">Hidden</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.clientSecret}
                    onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded px-4 py-2 text-xs text-slate-900 outline-none font-mono font-medium"
                  />
                  <Lock className="h-4 w-4 absolute right-3 top-2.5 text-slate-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Authentication Protocol
              </label>
              <select
                value={formData.authMechanism}
                onChange={(e) => setFormData({ ...formData, authMechanism: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 rounded px-3 py-2 text-xs text-slate-900 outline-none font-medium"
              >
                <option value="OAuth 2.0">OAuth 2.0 (Client Credentials Grant)</option>
                <option value="API Key">API Key Header</option>
                <option value="Bearer Token">Bearer Token Authorization</option>
              </select>
            </div>

            {testResult && (
              <div className={`p-3.5 rounded text-xs font-bold border ${
                testResult.success 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}>
                {testResult.message}
              </div>
            )}

            {savedSuccess && (
              <div className="p-3 rounded bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>Integration settings updated successfully!</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleTest}
                disabled={isTesting}
                className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition border border-slate-300 flex items-center space-x-2"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                <span>{isTesting ? 'Testing Endpoint...' : 'Test Connection'}</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition flex items-center space-x-2 border border-blue-800"
              >
                <Save className="h-4 w-4" />
                <span>Save Configuration</span>
              </button>
            </div>

          </form>
        </div>

        <div className="lg:col-span-4 card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4" />
            <span>24. Error State Simulator</span>
          </div>
          
          <p className="text-xs text-slate-600 font-medium">
            Simulate fallback states to verify graceful error handling during network or auth issues.
          </p>

          <div className="space-y-2 font-bold text-xs">
            <button
              onClick={() => setSimulatedError('NONE')}
              className={`w-full text-left p-3 rounded border transition ${
                simulatedError === 'NONE'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              🟢 Healthy Connection State
            </button>

            <button
              onClick={() => setSimulatedError('CONNECTION')}
              className={`w-full text-left p-3 rounded border transition ${
                simulatedError === 'CONNECTION'
                  ? 'bg-red-50 border-red-500 text-red-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              🔴 Connection Failure Error
            </button>

            <button
              onClick={() => setSimulatedError('AUTH')}
              className={`w-full text-left p-3 rounded border transition ${
                simulatedError === 'AUTH'
                  ? 'bg-amber-50 border-amber-500 text-amber-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              🟡 Authorization Error
            </button>

            <button
              onClick={() => setSimulatedError('SYNC')}
              className={`w-full text-left p-3 rounded border transition ${
                simulatedError === 'SYNC'
                  ? 'bg-orange-50 border-orange-500 text-orange-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              🟠 Partial Sync Error (5,420 success / 212 failed)
            </button>
          </div>

          {simulatedError === 'CONNECTION' && (
            <div className="p-3.5 rounded bg-red-50 border border-red-300 text-xs text-red-900 space-y-2 font-medium">
              <div className="font-bold flex items-center gap-1">
                <AlertTriangle className="h-4 w-4 text-red-700" />
                <span>Connection Error</span>
              </div>
              <p>“Unable to connect to the iGOT integration service.”</p>
              <div className="flex gap-2 pt-1">
                <button className="px-2.5 py-1 rounded bg-red-700 text-white font-bold text-[10px]">
                  Retry
                </button>
                <button className="px-2.5 py-1 rounded bg-slate-200 text-slate-800 font-bold text-[10px]">
                  View Logs
                </button>
              </div>
            </div>
          )}

          {simulatedError === 'SYNC' && (
            <div className="p-3.5 rounded bg-orange-50 border border-orange-300 text-xs text-orange-900 space-y-2 font-medium">
              <div className="font-bold">Sync Error Log:</div>
              <p>“Some records could not be synchronized.”</p>
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-emerald-800">Successful: 5,420</span>
                <span className="text-red-800">Failed: 212</span>
              </div>
              <button className="w-full py-1.5 rounded bg-orange-700 text-white font-bold text-[10px]">
                Retry Failed Records
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
