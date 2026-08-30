import React from 'react';
import { 
  CheckCircle2, 
  RefreshCw, 
  Database, 
  Layers, 
  Clock,
  ShieldCheck,
  SlidersHorizontal
} from 'lucide-react';
import { IntegrationMode } from '../types/igot';

interface ConnectionStatusCardProps {
  mode: IntegrationMode;
  lastSyncTime: string;
  onSyncNow: () => void;
  isSyncing: boolean;
  onViewDetails: () => void;
}

export const ConnectionStatusCard: React.FC<ConnectionStatusCardProps> = ({
  mode,
  lastSyncTime,
  onSyncNow,
  isSyncing,
  onViewDetails
}) => {
  return (
    <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">iGOT Karmayogi</h2>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
              National Platform
            </span>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Government of India Capacity Building Commission (CBC) Learning Ecosystem
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 rounded bg-amber-50 border border-amber-200 text-amber-900 flex items-center space-x-2 text-xs font-bold">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Status: API Ready</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-5">
        
        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1.5 mb-1">
            <Layers className="h-3.5 w-3.5 text-blue-700" />
            <span>Integration Type</span>
          </div>
          <div className="text-sm font-bold text-slate-900">
            Competency + Course Recommendation
          </div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1.5 mb-1">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            <span>Last Sync</span>
          </div>
          <div className="text-sm font-bold text-slate-900">
            {lastSyncTime}
          </div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1.5 mb-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Environment</span>
          </div>
          <div className="text-sm font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Prototype / Demo Mode</span>
          </div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1.5 mb-1">
            <Database className="h-3.5 w-3.5 text-sky-600" />
            <span>Active Data Sources</span>
          </div>
          <div className="text-sm font-bold text-slate-900">
            3 Core Repositories
          </div>
        </div>

      </div>

      {/* Active Data Sources */}
      <div className="mb-5 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Data Sources Included in Sync:
        </span>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded bg-white text-slate-800 border border-slate-300 shadow-2xs">
            Competency Framework (142 Nodes)
          </span>
          <span className="px-2.5 py-1 rounded bg-white text-slate-800 border border-slate-300 shadow-2xs">
            Course Catalogue (5,632 Courses)
          </span>
          <span className="px-2.5 py-1 rounded bg-white text-slate-800 border border-slate-300 shadow-2xs">
            Learning Resources & Micro-Credentials
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={onSyncNow}
          disabled={isSyncing}
          className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition flex items-center space-x-2 border border-blue-800 shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Synchronizing Data...' : 'Sync Now'}</span>
        </button>

        <button
          onClick={onViewDetails}
          className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition flex items-center space-x-2"
        >
          <SlidersHorizontal className="h-4 w-4 text-slate-500" />
          <span>View Integration Details & API Schema</span>
        </button>
      </div>

    </div>
  );
};
