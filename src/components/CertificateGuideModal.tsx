import React from 'react';
import { X, Award, ExternalLink, CheckCircle2, ShieldCheck, HelpCircle, Sparkles } from 'lucide-react';

interface CertificateGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateGuideModal: React.FC<CertificateGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const platforms = [
    {
      name: 'Google Cloud Skills Boost',
      cost: '100% Free (No credit card needed)',
      type: 'Official Google Cloud Digital Skill Badge',
      steps: [
        'Click the course link to open Google Cloud Skills Boost.',
        'Create a free account or sign in with your Google account.',
        'Enroll directly in the "Introduction to Generative AI" learning path (free access).',
        'Complete the quiz at the end to automatically earn your verifiable Google Cloud completion badge.'
      ],
      badgeLogo: 'Google Cloud'
    },
    {
      name: 'Microsoft Learn',
      cost: '100% Free',
      type: 'Microsoft Trophy & Credential',
      steps: [
        'Click the course link to open the Microsoft Learn interactive module.',
        'Sign in with your free personal or work Microsoft account.',
        'Go through the sandbox exercises and end-of-module knowledge checks.',
        'Trophy and verification will be permanently stored in your Microsoft Learn profile.'
      ],
      badgeLogo: 'Microsoft'
    },
    {
      name: 'IBM SkillsBuild',
      cost: '100% Free',
      type: 'Credly Digital Badge & Certificate',
      steps: [
        'Click through to IBM SkillsBuild for adult learners or professionals.',
        'Register for a free account.',
        'Complete the self-paced coursework and pass the assessment.',
        'Claim your verified digital badge issued via Credly, shareable directly to LinkedIn.'
      ],
      badgeLogo: 'IBM'
    },
    {
      name: 'Harvard CS50 / edX',
      cost: '100% Free Coursework & Free CS50 Certificate',
      type: 'Official CS50 Certificate of Completion',
      steps: [
        'Select the Free Audit option on edX, or access directly via cs50.harvard.edu.',
        'Submit the required problem sets and programming assignments (free grading).',
        'Scoring 70%+ on all assignments earns you a free official CS50 Certificate signed by David J. Malan.'
      ],
      badgeLogo: 'Harvard'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        id="certificate-guide-modal"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/80 via-white to-emerald-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                How to Claim 100% Free Verified Certificates
              </h2>
              <p className="text-xs text-slate-500">
                Transparent step-by-step instructions for each learning provider
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            id="close-cert-guide-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 leading-relaxed">
              <strong className="font-bold">Zero Paywalls:</strong> All courses featured in this app offer verified credentials without requiring payment, trial subscriptions, or credit cards.
            </div>
          </div>

          <div className="space-y-4">
            {platforms.map((p, idx) => (
              <div key={idx} className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-sm text-slate-900">{p.name}</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {p.cost}
                  </span>
                </div>
                <div className="text-xs text-indigo-700 font-semibold mb-2.5">
                  Credential: {p.type}
                </div>
                <ol className="space-y-1.5 text-xs text-slate-600">
                  {p.steps.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
          >
            Got it, Let's Learn!
          </button>
        </div>
      </div>
    </div>
  );
};
