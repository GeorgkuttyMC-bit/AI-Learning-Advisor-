import React from 'react';
import { Sparkles, Award, Zap, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

interface CreativePillarsProps {
  onSelectAction?: (actionType: 'curriculum' | 'certificates' | 'toolkit') => void;
}

export const CreativePillars: React.FC<CreativePillarsProps> = ({ onSelectAction }) => {
  const pillars = [
    {
      id: 'curriculum' as const,
      icon: Sparkles,
      iconBg: 'from-violet-600 to-indigo-600 text-white shadow-indigo-200/50',
      badgeText: '12+ Career Domains',
      badgeColor: 'bg-violet-50 text-violet-700 border-violet-200/70',
      title: 'Role-Adaptive AI Curriculums',
      subtitle: 'Targeted to your exact job workflows',
      description: 'Zero in on the specific LLMs, automated pipelines, prompt templates, and software reshaping your specific profession.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Modern 3D fluid AI neural architecture visualization',
      features: ['Practical workplace prompts', 'Domain-specific software tools', 'No unnecessary coding theory'],
      accentBorder: 'hover:border-violet-400 group-hover:shadow-violet-100',
      actionLabel: 'Explore Career Paths',
    },
    {
      id: 'certificates' as const,
      icon: Award,
      iconBg: 'from-emerald-500 to-teal-600 text-white shadow-emerald-200/50',
      badgeText: '100% Free Verified',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
      title: 'Official Free Credentials & Badges',
      subtitle: 'Google, Microsoft, IBM & Harvard',
      description: 'Every single course includes direct official hyperlinks with verified zero-cost completion certificates and Credly digital badges.',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Diverse learners collaborating on verified digital certifications',
      features: ['Recognized on LinkedIn & resumes', 'Interactive hands-on labs', 'Direct verified links'],
      accentBorder: 'hover:border-emerald-400 group-hover:shadow-emerald-100',
      actionLabel: 'View Free Badges',
    },
    {
      id: 'toolkit' as const,
      icon: Compass,
      iconBg: 'from-blue-600 to-cyan-500 text-white shadow-blue-200/50',
      badgeText: 'Prompts & Roadmaps',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/70',
      title: 'Workplace Prompts & Toolkits',
      subtitle: 'Production-ready practical assets',
      description: 'Copy-paste scenario prompt templates, curated software directories, and milestone pacing tailored to your weekly study goals.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'High-tech data and connectivity visualization',
      features: ['Scenario prompt templates', 'Vetted domain software', 'Progress checkpointing'],
      accentBorder: 'hover:border-blue-400 group-hover:shadow-blue-100',
      actionLabel: 'Explore Toolkits & Prompts',
    },
  ];

  return (
    <section className="mb-12" id="creative-pillars-section">
      {/* Creative Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200/60 text-indigo-700 mb-2">
            <Zap className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>The 3 Pillars of Practical AI Mastery</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Designed for Modern Professionals, Not Tech Theorists
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md">
          Combining role-calibrated education, verified no-cost credentials, and production workplace toolkits.
        </p>
      </div>

      {/* 3 Creative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => {
          const IconComponent = pillar.icon;
          return (
            <div
              key={pillar.id}
              onClick={() => onSelectAction?.(pillar.id)}
              className={`group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${pillar.accentBorder}`}
              id={`pillar-card-${pillar.id}`}
            >
              <div>
                {/* Image Header with Creative Overlay */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={pillar.imageUrl}
                    alt={pillar.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-95"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                  {/* Floating Icon Pill */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${pillar.iconBg} flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-md bg-white/90 shadow-xs ${pillar.badgeColor}`}>
                      {pillar.badgeText}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {pillar.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="px-5 pb-5 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 pt-2 border-t border-slate-100">
                  <span>{pillar.actionLabel}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
