import React from 'react';
import { X, Bookmark, ExternalLink, Award, Trash2 } from 'lucide-react';
import { CourseResource } from '../types';

interface SavedCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCourses: CourseResource[];
  completedCourseIds: string[];
  onToggleComplete: (courseId: string) => void;
  onRemoveSaved: (courseId: string) => void;
}

export const SavedCoursesModal: React.FC<SavedCoursesModalProps> = ({
  isOpen,
  onClose,
  savedCourses,
  completedCourseIds,
  onToggleComplete,
  onRemoveSaved
}) => {
  if (!isOpen) return null;

  const completedCount = savedCourses.filter(c => completedCourseIds.includes(c.id)).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl flex flex-col max-h-[85vh] border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                My Saved Courses & Badges
              </h3>
              <p className="text-xs text-slate-500">
                {savedCourses.length} saved • {completedCount} marked completed
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

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {savedCourses.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">No saved courses yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Click the bookmark icon on any course card to build your personalized study queue.
              </p>
            </div>
          ) : (
            savedCourses.map((course) => {
              const isDone = completedCourseIds.includes(course.id);
              return (
                <div
                  key={course.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    isDone ? 'bg-emerald-50/30 border-emerald-200' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-semibold uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {course.provider}
                      </span>
                      {course.isCertificateFree && (
                        <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <Award className="w-2.5 h-2.5" /> Free {course.badgeType}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {course.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {course.estimatedTime} • {course.difficulty}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => onToggleComplete(course.id)}
                        className="w-3.5 h-3.5 text-emerald-600 rounded"
                      />
                      <span className={isDone ? 'text-emerald-700 font-semibold' : ''}>Done</span>
                    </label>

                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                      title={`Direct link to ${course.title} and student login`}
                    >
                      <span>Direct Login</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => onRemoveSaved(course.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Track your credentials as you complete them.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
