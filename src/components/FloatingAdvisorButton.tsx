import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

interface FloatingAdvisorButtonProps {
  onClick: () => void;
  professionTitle?: string;
}

export const FloatingAdvisorButton: React.FC<FloatingAdvisorButtonProps> = ({ onClick, professionTitle }) => {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={onClick}
        id="floating-ask-mentor-btn"
        className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 cursor-pointer"
        title="Ask the AI Career Advisor questions about courses, tools, or daily tasks"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold leading-none">Ask AI Advisor</div>
          <div className="text-[10px] text-indigo-200 font-medium leading-tight mt-0.5">24/7 Career Guidance</div>
        </div>
        <span className="sm:hidden text-xs font-bold">Ask AI</span>
      </button>
    </div>
  );
};
