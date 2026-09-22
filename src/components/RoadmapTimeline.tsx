import React from 'react';
import { RoadmapStep } from '../types';
import { CheckCircle2, Clock, Award, Target } from 'lucide-react';

interface RoadmapTimelineProps {
  roadmap: RoadmapStep[];
  completedMilestones: Record<number, boolean>;
  onToggleMilestone: (phase: number) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  roadmap,
  completedMilestones,
  onToggleMilestone
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>Step-by-Step AI Learning Pathway</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            A structured, self-paced roadmap from fundamental literacy to domain mastery and official certification.
          </p>
        </div>
      </div>

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
