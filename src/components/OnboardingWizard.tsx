import React, { useState } from 'react';
import { UserProfile } from '../types/karmai';
import { ArrowRight, CheckCircle2, Sparkles, User, Briefcase, Award, Target } from 'lucide-react';

interface OnboardingWizardProps {
  initialProfile: UserProfile;
  onCompleteOnboarding: (profile: UserProfile) => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ initialProfile, onCompleteOnboarding }) => {
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<UserProfile>({ ...initialProfile });

  const roleOptions = [
    "Statistical Officer",
    "Data Analyst",
    "Survey Officer",
    "Research Officer",
    "Statistical Investigator",
    "Data Scientist",
    "Training Officer",
    "Administrative Officer"
  ];

  const availableSkills = [
    "Statistical Analysis",
    "Python",
    "SQL",
    "Data Visualization",
    "AI/ML",
    "Survey Methodology",
    "Sampling",
    "Data Management"
  ];

  const handleToggleSkill = (skill: string) => {
    setProfile(prev => {
      const exists = prev.existingSkills.includes(skill);
      if (exists) {
        return { ...prev, existingSkills: prev.existingSkills.filter(s => s !== skill) };
      } else {
        return { ...prev, existingSkills: [...prev.existingSkills, skill] };
      }
    });
  };

  const handleFinish = () => {
    onCompleteOnboarding(profile);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="card-panel rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-6">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Step {step} of 4 — Onboarding
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              {step === 1 && "Personal & Professional Details"}
              {step === 2 && "Select Official Role Benchmark"}
              {step === 3 && "Existing Skills & Expertise"}
              {step === 4 && "Define Learning Goal & Launch AI Assessment"}
            </h2>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-900 text-orange-400 font-extrabold flex items-center justify-center text-xs">
            {step}/4
          </div>
        </div>

        {/* Step 1: Profile */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-bold text-slate-900 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Employee ID</label>
                <input
                  type="text"
                  value={profile.employeeId}
                  onChange={(e) => setProfile({ ...profile, employeeId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-bold text-slate-900 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Years of Experience</label>
                <input
                  type="number"
                  value={profile.yearsOfExperience}
                  onChange={(e) => setProfile({ ...profile, yearsOfExperience: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-bold text-slate-900 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
              <input
                type="text"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs font-bold text-slate-900 outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 2: Role */}
        {step === 2 && (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">Select Official Role Benchmark</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {roleOptions.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setProfile({ ...profile, designation: r })}
                  className={`p-3 rounded-lg text-left border transition text-xs font-bold ${
                    profile.designation === r
                      ? 'bg-blue-700 text-white border-blue-800 shadow-xs'
                      : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Existing Skills */}
        {step === 3 && (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">Select Existing Skills & Competencies</label>
            <div className="flex flex-wrap gap-2">
              {availableSkills.map((skill) => {
                const selected = profile.existingSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleToggleSkill(skill)}
                    className={`px-3 py-1.5 rounded text-xs font-bold border transition ${
                      selected
                        ? 'bg-emerald-700 text-white border-emerald-800'
                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '}{skill}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Learning Goal */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">State Your Primary Learning Goal</label>
              <textarea
                value={profile.learningGoal}
                onChange={(e) => setProfile({ ...profile, learningGoal: e.target.value })}
                rows={3}
                className="w-full bg-slate-50 border border-slate-300 rounded p-3 text-xs font-bold text-slate-900 outline-none"
              />
            </div>

            <div className="p-4 rounded bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1 font-medium">
              <div className="font-bold flex items-center gap-1 text-blue-950">
                <Sparkles className="h-4 w-4 text-orange-600" />
                <span>Ready for AI Competency Assessment</span>
              </div>
              <p>
                KarmAI will now baseline your competencies against the benchmark required for <strong>{profile.designation}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            disabled={step === 1}
            className="px-4 py-2 rounded bg-slate-100 text-slate-700 text-xs font-bold disabled:opacity-40 border border-slate-300"
          >
            Back
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(prev => Math.min(4, prev + 1))}
              className="px-5 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center space-x-1 border border-blue-800"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4 text-orange-300" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs flex items-center space-x-2 border border-blue-800 shadow"
            >
              <span>Launch AI Competency Assessment</span>
              <Sparkles className="h-4 w-4 text-orange-300" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
