import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink, 
  Sparkles, 
  FileText,
  Linkedin,
  Twitter
} from 'lucide-react';
import { copyTextToClipboard } from '../utils/clipboard';

interface ShareRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  summaryText: string;
  professionTitle: string;
  completedPhasesCount: number;
  totalPhasesCount: number;
  activeFormat: 'linkedin' | 'concise' | 'bullets';
  onFormatChange: (format: 'linkedin' | 'concise' | 'bullets') => void;
  onCopiedToast?: () => void;
}

export const ShareRoadmapModal: React.FC<ShareRoadmapModalProps> = ({
  isOpen,
  onClose,
  summaryText,
  professionTitle,
  completedPhasesCount,
  totalPhasesCount,
  activeFormat,
  onFormatChange,
  onCopiedToast
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const success = await copyTextToClipboard(summaryText);
    if (success) {
      setCopied(true);
      if (onCopiedToast) onCopiedToast();
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const percent = totalPhasesCount > 0 
    ? Math.round((completedPhasesCount / totalPhasesCount) * 100) 
    : 0;

  // Social share links
  const linkedinShareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(summaryText)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(summaryText.length > 270 ? summaryText.slice(0, 267) + '...' : summaryText)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        id="share-roadmap-modal"
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/60 to-purple-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <span>Share Progress for Professional Networking</span>
              </h3>
              <p className="text-xs text-slate-500">
                {professionTitle} &bull; {completedPhasesCount} of {totalPhasesCount} Phases ({percent}%)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="share-modal-close-btn"
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Format Selector Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Choose Post Format:
            </label>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => onFormatChange('linkedin')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeFormat === 'linkedin'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                LinkedIn Post
              </button>
              <button
                type="button"
                onClick={() => onFormatChange('concise')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeFormat === 'concise'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Concise Status
              </button>
              <button
                type="button"
                onClick={() => onFormatChange('bullets')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeFormat === 'bullets'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Milestone Checklist
              </button>
            </div>
          </div>

          {/* Formatted Text Box */}
          <div className="relative">
            <pre 
              id="roadmap-share-text-preview"
              className="w-full p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs sm:text-sm font-mono whitespace-pre-wrap break-words leading-relaxed max-h-72 overflow-y-auto border border-slate-800 selection:bg-indigo-500 selection:text-white"
            >
              {summaryText}
            </pre>
            <div className="absolute top-2.5 right-2.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                Formatted Text
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Tip: You can copy this summary to post on LinkedIn, paste into your resume portfolio, or share with colleagues and mentors.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={linkedinShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0A66C2] bg-white hover:bg-blue-50 border border-blue-200 rounded-xl transition-colors shadow-2xs"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>Open in LinkedIn</span>
            </a>
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-2xs"
            >
              <Twitter className="w-3.5 h-3.5 text-slate-800" />
              <span>Open in X</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              id="share-modal-copy-btn"
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Formatted Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
