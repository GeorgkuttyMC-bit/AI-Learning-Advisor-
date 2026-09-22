import React from 'react';
import { ExternalLink, Wrench, CheckCircle, Sparkles } from 'lucide-react';
import { AITechnologyTool } from '../types';

interface ToolsListProps {
  tools: AITechnologyTool[];
  professionTitle: string;
}

export const ToolsList: React.FC<ToolsListProps> = ({ tools, professionTitle }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-indigo-600" />
            <span>Essential AI Technologies & Tools for {professionTitle}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Key software, platforms, and models transforming daily workflows in this industry.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200/90 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
            id={`tool-card-${index}`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full">
                  {tool.category}
                </span>
                {tool.freeTierAvailable && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Free Tier
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                {tool.name}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {tool.description}
              </p>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3">
                <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  Practical Workplace Application:
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {tool.howProfessionalsUse}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {tool.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <a
                href={tool.learningUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`tool-link-${index}`}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-lg transition-colors"
              >
                <span>Learn More & Access Tool</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
