import React, { useState, useMemo } from 'react';
import { RoadmapStep } from '../types';
import { CheckCircle2, Clock, Award, Target, Share2, Check, Sparkles, SlidersHorizontal } from 'lucide-react';
import { copyTextToClipboard, generateProgressSummary } from '../utils/clipboard';
import { ShareRoadmapModal } from './ShareRoadmapModal';

interface RoadmapTimelineProps {
  roadmap: RoadmapStep[];
  completedMilestones: Record<number, boolean>;
  onToggleMilestone: (phase: number) => void;
  professionTitle?: string;
  professionCategory?: string;
  userName?: string;
  completedCoursesCount?: number;
  totalCoursesCount?: number;
  keySkills?: string[];
  onNotify?: (type: 'success' | 'info' | 'bookmark', message: string) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  roadmap,
  completedMilestones,
  onToggleMilestone,
  professionTitle = 'AI Specialist',
  professionCategory,
  userName,
  completedCoursesCount = 0,
  totalCoursesCount = 0,
  keySkills = [],
  onNotify
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedButton, setCopiedButton] = useState(false);
  const [activeFormat, setActiveFormat] = useState<'linkedin' | 'concise' | 'bullets'>('linkedin');

  const totalPhases = roadmap.length;
  const completedPhasesCount = roadmap.filter(s => completedMilestones[s.phase]).length;
  const progressPercent = totalPhases > 0 ? Math.round((completedPhasesCount / totalPhases) * 100) : 0;

  // Generate formatted text for active format
  const summaryText = useMemo(() => {
    return generateProgressSummary({
      professionTitle,
      professionCategory,
      userName,
      roadmap,
      completedMilestones,
      completedCoursesCount,
      totalCoursesCount,
      keySkills,
      format: activeFormat
    });
  }, [professionTitle, professionCategory, userName, roadmap, completedMilestones, completedCoursesCount, totalCoursesCount, keySkills, activeFormat]);

  const handleShareClick = async () => {
    const success = await copyTextToClipboard(summaryText);
    if (success) {
      setCopiedButton(true);
      if (onNotify) {
        onNotify('success', 'Progress summary copied to clipboard! Ready to paste into LinkedIn or messages.');
      }
      setTimeout(() => setCopiedButton(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Roadmap Header with Progress & Share Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>Step-by-Step AI Learning Pathway</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            A structured, self-paced roadmap from fundamental literacy to domain mastery & official certification.
          </p>

          {/* Progress bar pill */}
          <div className="flex items-center gap-2.5 mt-2.5">
            <div className="w-28 sm:w-36 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-slate-700">
              {completedPhasesCount} of {totalPhases} Phases Done ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Share Action Group */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleShareClick}
            id="roadmap-share-btn"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
              copiedButton
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 hover:shadow-md'
            }`}
            title="Generate summary and copy to clipboard for networking"
          >
            {copiedButton ? (
              <>
                <Check className="w-4 h-4 animate-in zoom-in" />
                <span>✓ Summary Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Progress</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            id="roadmap-open-share-modal-btn"
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            title="Preview formatted text and social links"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Options</span>
          </button>
        </div>
      </div>

      {/* Share Progress Modal */}
      <ShareRoadmapModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        summaryText={summaryText}
        professionTitle={professionTitle}
        completedPhasesCount={completedPhasesCount}
        totalPhasesCount={totalPhases}
        activeFormat={activeFormat}
        onFormatChange={setActiveFormat}
        onCopiedToast={() => {
          if (onNotify) onNotify('success', 'Progress summary copied to clipboard!');
        }}
      />

      <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-200/80 space-y-8 my-4">
        {roadmap.map((step) => {
          const isFinished = !!completedMilestones[step.phase];
          return (
            <div 
              key={step.phase} 
              className="relative group"
              id={`roadmap-step-${step.phase}`}
            >
              {/* Timeline Indicator Node */}
              <div 
                onClick={() => onToggleMilestone(step.phase)}
                className={`absolute -left-[31px] sm:-left-[39px] top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                  isFinished
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white border-indigo-500 text-indigo-600 hover:scale-105 shadow-sm'
                }`}
                title="Click to mark phase as completed"
              >
                {isFinished ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-xs font-bold">{step.phase}</span>
                )}
              </div>

              {/* Step Card Content */}
              <div className={`bg-white border rounded-xl p-5 sm:p-6 transition-all ${
                isFinished 
                  ? 'border-emerald-200 bg-emerald-50/20' 
                  : 'border-slate-200/90 shadow-sm'
              }`}>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/50">
                      PHASE {step.phase}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {step.title}
                    </h3>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {step.duration}
                  </span>
                </div>

                {/* Objective */}
                <p className="text-xs sm:text-sm text-slate-600 mb-4 font-medium">
                  {step.objective}
                </p>

                {/* Concrete Action Items */}
                <div className="space-y-2 mb-4 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Recommended Action Items:
                  </div>
                  {step.actionItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Milestone Badge Achievement */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60">
                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">Milestone:</span>
                    <span>{step.milestone}</span>
                  </div>

                  <button
                    onClick={() => onToggleMilestone(step.phase)}
                    className="text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
                  >
                    {isFinished ? '✓ Phase Completed' : 'Mark Phase Done'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
