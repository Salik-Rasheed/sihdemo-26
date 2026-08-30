import React from 'react';
import { 
  RefreshCw, 
  ArrowRightLeft, 
  ArrowDownRight, 
  ArrowUpRight, 
  CheckCircle2
} from 'lucide-react';
import { SyncLogItem } from '../types/igot';

interface SyncCenterProps {
  logs: SyncLogItem[];
  lastSyncTime: string;
  onSyncNow: () => void;
  isSyncing: boolean;
}

export const SyncCenter: React.FC<SyncCenterProps> = ({
  logs,
  lastSyncTime,
  onSyncNow,
  isSyncing
}) => {
  return (
    <div className="space-y-6">
      
      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-blue-700" />
              <span>13, 14 & 15. iGOT Sync Center & Bi-Directional Data Flow</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Monitor real-time data sync between iGOT Karmayogi national platform and StatSkill AI recommendation engine.
            </p>
          </div>

          <button
            onClick={onSyncNow}
            disabled={isSyncing}
            className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition shadow-sm border border-blue-800 flex items-center justify-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronizing Records...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="card-panel rounded-xl p-4 bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-bold mb-1">Last Sync</div>
          <div className="text-base font-extrabold text-slate-900">{lastSyncTime}</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            <span>Status: Successful</span>
          </div>
        </div>

        <div className="card-panel rounded-xl p-4 bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-bold mb-1">Courses Synced</div>
          <div className="text-2xl font-extrabold text-blue-700">5,632</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            iGOT Course Catalogue v2.4
          </div>
        </div>

        <div className="card-panel rounded-xl p-4 bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-bold mb-1">Competencies Synced</div>
          <div className="text-2xl font-extrabold text-orange-700">142</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            National Competency Framework
          </div>
        </div>

        <div className="card-panel rounded-xl p-4 bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-bold mb-1">Mappings Synced</div>
          <div className="text-2xl font-extrabold text-emerald-700">1,284</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Role & Competency Relationships
          </div>
        </div>

      </div>

      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
        <h4 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-orange-600" />
          <span>Bi-Directional Data Exchange Architecture</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center space-x-2 mb-3">
              <ArrowDownRight className="h-4 w-4 text-emerald-700" />
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                Incoming Data (iGOT → StatSkill AI)
              </span>
            </div>
            <ul className="space-y-2 text-xs text-slate-800 font-semibold">
              <li className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                <span>Course Catalogue & Metadata</span>
                <span className="text-emerald-700 font-bold">Active Sync</span>
              </li>
              <li className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                <span>Competency Mappings Framework</span>
                <span className="text-emerald-700 font-bold">Active Sync</span>
              </li>
              <li className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                <span>Learning Status & Completion Evidence</span>
                <span className="text-emerald-700 font-bold">Active Sync</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center space-x-2 mb-3">
              <ArrowUpRight className="h-4 w-4 text-orange-700" />
              <span className="text-xs font-extrabold text-orange-800 uppercase tracking-wider">
                Outgoing Data (StatSkill AI → Integration Layer)
              </span>
            </div>
            <ul className="space-y-2 text-xs text-slate-800 font-semibold">
              <li className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                <span>Learner Competency Needs & Gap Analysis</span>
                <span className="text-orange-700 font-bold">Active Sync</span>
              </li>
              <li className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                <span>Recommendation & Ranking Requests</span>
                <span className="text-orange-700 font-bold">Active Sync</span>
              </li>
              <li className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                <span>Learning Pathway Requirements</span>
                <span className="text-orange-700 font-bold">Active Sync</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="card-panel rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
        <h4 className="text-base font-extrabold text-slate-900 mb-4">
          Sync History Logs
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-700 font-bold bg-slate-100">
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Operation</th>
                <th className="py-3 px-4 text-right">Records Synced</th>
                <th className="py-3 px-4 text-right">Failed</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-slate-900">{log.timestamp}</td>
                  <td className="py-3 px-4 font-extrabold text-slate-900">{log.operation}</td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-700">{log.recordsSynced}</td>
                  <td className="py-3 px-4 text-right font-semibold text-slate-500">{log.recordsFailed}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 'Success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
