import React from 'react';
import { ExternalLink, Award, Clock, CheckCircle2, Bookmark, BookmarkCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { CourseResource } from '../types';

interface CourseCardProps {
  course: CourseResource;
  isSaved: boolean;
  isCompleted: boolean;
  onToggleSave: (courseId: string) => void;
  onToggleComplete: (courseId: string) => void;
}

// Provider branding styles
const getProviderStyle = (provider: string) => {
  const p = provider.toLowerCase();
  if (p.includes('google')) {
    return {
      border: 'border-l-4 border-l-blue-500',
      pill: 'bg-blue-50 text-blue-700 border-blue-200/80',
      glow: 'group-hover:border-blue-300'
    };
  }
  if (p.includes('microsoft')) {
    return {
      border: 'border-l-4 border-l-cyan-500',
      pill: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
      glow: 'group-hover:border-cyan-300'
    };
  }
  if (p.includes('ibm')) {
    return {
      border: 'border-l-4 border-l-indigo-600',
      pill: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      glow: 'group-hover:border-indigo-300'
    };
  }
  if (p.includes('harvard')) {
    return {
      border: 'border-l-4 border-l-rose-600',
      pill: 'bg-rose-50 text-rose-700 border-rose-200/80',
      glow: 'group-hover:border-rose-300'
    };
  }
  if (p.includes('deeplearning')) {
    return {
      border: 'border-l-4 border-l-purple-600',
      pill: 'bg-purple-50 text-purple-700 border-purple-200/80',
      glow: 'group-hover:border-purple-300'
    };
  }
  return {
    border: 'border-l-4 border-l-emerald-500',
    pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    glow: 'group-hover:border-emerald-300'
  };
};

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isSaved,
  isCompleted,
  onToggleSave,
  onToggleComplete
}) => {
  const providerStyle = getProviderStyle(course.provider);

  return (
    <div 
      className={`group bg-white border rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between shadow-2xs hover:shadow-md ${providerStyle.border} ${providerStyle.glow} ${
        isCompleted 
          ? 'border-emerald-400 bg-emerald-50/15' 
          : 'border-slate-200/90'
      }`}
      id={`course-card-${course.id}`}
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${providerStyle.pill}`}>
              {course.provider}
            </span>
            {course.isCertificateFree && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Free {course.badgeType}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Save Button */}
            <button
              onClick={() => onToggleSave(course.id)}
              id={`save-btn-${course.id}`}
              className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isSaved ? 'Remove from saved' : 'Save course for later'}
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-100" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
          <a href={course.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-start gap-1">
            <span>{course.title}</span>
          </a>
        </h3>

        {/* Course Meta Info */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-2 mb-3">
          <span className="inline-flex items-center gap-1 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3 text-slate-400" />
            {course.estimatedTime}
          </span>
          <span className={`font-semibold px-2 py-0.5 rounded-md ${
            course.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700' :
            course.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700' : 'bg-purple-50 text-purple-700'
          }`}>
            {course.difficulty}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 font-medium">Issuer: {course.credentialIssuer || course.provider}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {course.description}
        </p>

        {/* Skills Learned */}
        <div className="mb-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span>Target Competencies:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {course.skillsLearned.map((skill, index) => (
              <span
                key={index}
                className="text-[11px] font-medium bg-slate-50 border border-slate-200/80 text-slate-700 px-2 py-0.5 rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 mt-2">
        <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600 hover:text-slate-900">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggleComplete(course.id)}
            id={`complete-checkbox-${course.id}`}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
          />
          <span className={isCompleted ? 'text-emerald-700 font-bold' : 'font-medium'}>
            {isCompleted ? '✓ Completed' : 'Mark Complete'}
          </span>
        </label>

        {/* External Link */}
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          id={`launch-course-link-${course.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-xs hover:shadow transition-all"
        >
          <span>Free Official Course</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
