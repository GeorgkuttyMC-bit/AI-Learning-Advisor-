import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';
import { UserProfile, ProfessionData } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  profession: ProfessionData;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  profession
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate plain text markdown export
  const exportText = `# AI Learning Pathway: ${profession.title}
Prepared for: ${userProfile.name || 'Professional'} (${userProfile.experienceLevel.toUpperCase()} Level)
Commitment: ${userProfile.weeklyHours} hours/week

## Role Overview
${profession.overview}

## Impact of AI on this Role
${profession.impactOfAI}

## Priority AI Competencies to Master
${profession.keySkillsNeeded.map(s => `- ${s}`).join('\n')}

## Recommended Verified 100% Free Certificate Courses
${profession.featuredCourses.map(c => `- ${c.title} (${c.provider})
  Type: Free ${c.badgeType} | Time: ${c.estimatedTime} | Level: ${c.difficulty}
  Direct Link: ${c.url}`).join('\n\n')}

## Top AI Tools & Technologies
${profession.topTools.map(t => `- ${t.name} (${t.category})
  Workplace Use: ${t.howProfessionalsUse}
  Access Link: ${t.learningUrl}`).join('\n\n')}

## 4-Phase Step-by-Step Roadmap
${profession.roadmap.map(r => `### Phase ${r.phase}: ${r.title} (${r.duration})
Objective: ${r.objective}
Milestone: ${r.milestone}
Action items:
${r.actionItems.map(a => `  * ${a}`).join('\n')}`).join('\n\n')}

Generated via AI Pathway Navigator.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([exportText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `AI_Learning_Plan_${profession.id}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[85vh] border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Export Learning Pathway & Direct Links
              </h3>
              <p className="text-xs text-slate-500">
                Markdown study guide with all course URLs and action plans.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950 font-mono text-xs text-slate-300">
          <pre className="whitespace-pre-wrap leading-relaxed select-all">
            {exportText}
          </pre>
        </div>

        {/* Footer with actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500 hidden sm:inline">
            Ready to copy or save as a Markdown file.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download File (.md)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
