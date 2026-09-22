import React, { useState } from 'react';
import { Copy, Check, Sparkles, MessageSquareCode, Lightbulb } from 'lucide-react';
import { PromptTemplate } from '../types';

interface PromptVaultProps {
  prompts: PromptTemplate[];
  professionTitle: string;
}

export const PromptVault: React.FC<PromptVaultProps> = ({ prompts, professionTitle }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (promptText: string, index: number) => {
    navigator.clipboard.writeText(promptText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MessageSquareCode className="w-5 h-5 text-indigo-600" />
            <span>High-Impact AI Prompt Templates for {professionTitle}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Battle-tested prompt frameworks crafted specifically for common challenges in this profession.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {prompts.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-sm space-y-4"
            id={`prompt-card-${index}`}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/50">
                  Scenario: {item.scenario}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5">
                  {item.title}
                </h3>
              </div>

              <button
                onClick={() => handleCopy(item.prompt, index)}
                id={`copy-prompt-btn-${index}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-lg transition-all shrink-0 self-start sm:self-center"
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>

            {/* Prompt Box */}
            <div className="relative bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs sm:text-sm leading-relaxed border border-slate-800 shadow-inner">
              <pre className="whitespace-pre-wrap break-words font-mono">
                {item.prompt}
              </pre>
            </div>

            {/* Expected Outcome */}
            <div className="flex items-start gap-2 bg-emerald-50/70 border border-emerald-200/60 rounded-lg p-3 text-xs text-emerald-950">
              <Lightbulb className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-emerald-900">Expected Deliverable: </span>
                <span>{item.expectedOutcome}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prompting Best Practices Tips */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          3 Rules for Professional Prompting in Your Workplace:
        </h4>
        <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
          <li><strong>Assign a Persona:</strong> Always specify "Act as a Senior [Role Title]" to anchor the model's domain vocabulary and tone.</li>
          <li><strong>Provide Constraints:</strong> Define what NOT to do (e.g. "Do not assume missing facts, keep under 250 words, avoid buzzwords").</li>
          <li><strong>Protect Confidentiality:</strong> Never include proprietary customer names, trade secrets, passwords, or patient PII in prompts.</li>
        </ul>
      </div>
    </div>
  );
};
