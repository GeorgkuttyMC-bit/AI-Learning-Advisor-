import { RoadmapStep } from '../types';

/**
 * Safely copy text to clipboard with fallback for iframes and older browsers
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  // Try modern Clipboard API if supported and in secure context
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to fallback
    }
  }

  // Fallback: document.execCommand('copy') with invisible textarea
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    textArea.remove();
    return successful;
  } catch (err) {
    console.error('Copy to clipboard failed:', err);
    return false;
  }
}

export interface ProgressSummaryOptions {
  professionTitle: string;
  professionCategory?: string;
  userName?: string;
  roadmap: RoadmapStep[];
  completedMilestones: Record<number, boolean>;
  completedCoursesCount?: number;
  totalCoursesCount?: number;
  keySkills?: string[];
  format?: 'linkedin' | 'concise' | 'bullets';
}

/**
 * Generates an engaging, professional summary of the user's progress for networking
 */
export function generateProgressSummary({
  professionTitle,
  professionCategory,
  userName,
  roadmap,
  completedMilestones,
  completedCoursesCount = 0,
  keySkills = [],
  format = 'linkedin'
}: ProgressSummaryOptions): string {
  const totalPhases = roadmap.length;
  const completedPhases = roadmap.filter(step => completedMilestones[step.phase]);
  const completedCount = completedPhases.length;
  const percentComplete = totalPhases > 0 ? Math.round((completedCount / totalPhases) * 100) : 0;
  
  const currentActiveStep = roadmap.find(step => !completedMilestones[step.phase]) || roadmap[roadmap.length - 1];
  const nameLabel = userName ? `${userName}` : 'Professional Learner';
  const categoryTag = (professionCategory || 'ArtificialIntelligence').replace(/[^a-zA-Z0-9]/g, '');

  if (format === 'concise') {
    return `🚀 AI Upskilling Update: ${professionTitle}
Progress: ${completedCount}/${totalPhases} Roadmap Phases (${percentComplete}%) | ${completedCoursesCount} Verified Courses Completed
Current Focus: Phase ${currentActiveStep?.phase || 1} - ${currentActiveStep?.title || 'Foundations'}
Key AI Skills: ${keySkills.slice(0, 4).join(', ') || 'Prompt Engineering, Generative AI'}
Tracking progress via AI Learning Navigator #AILearning #${categoryTag} #ProfessionalDevelopment`;
  }

  if (format === 'bullets') {
    const milestoneLines = roadmap.map(step => {
      const isDone = !!completedMilestones[step.phase];
      return `• [${isDone ? '✓ COMPLETED' : 'IN PROGRESS'}] Phase ${step.phase}: ${step.title} (${step.milestone})`;
    }).join('\n');

    const skillsLines = keySkills.length > 0 
      ? `\nCore AI Capabilities:\n${keySkills.map(s => `• ${s}`).join('\n')}\n` 
      : '';

    return `📋 AI LEARNING ROADMAP PROGRESS: ${professionTitle.toUpperCase()}
Professional: ${nameLabel}
Overall Progress: ${percentComplete}% (${completedCount} of ${totalPhases} Milestones Done)
Verified Certificates: ${completedCoursesCount} Finished

Roadmap Phases:
${milestoneLines}
${skillsLines}
Curriculum sourced from Google Cloud, IBM SkillsBuild, and Microsoft Learn via AI Learning Navigator.`;
  }

  // Default: 'linkedin' format
  const completedSection = completedPhases.length > 0 
    ? `🏆 Achieved Milestones:\n${completedPhases.map(p => `• Phase ${p.phase}: ${p.title} — ${p.milestone}`).join('\n')}\n\n`
    : '';

  const nextStepSection = currentActiveStep
    ? `🎯 Current Focus:\n• Phase ${currentActiveStep.phase}: ${currentActiveStep.title} (${currentActiveStep.duration})\n• Objective: ${currentActiveStep.objective}\n\n`
    : '';

  const skillsSection = keySkills.length > 0
    ? `💡 Priority AI Competencies:\n${keySkills.slice(0, 4).map(s => `• ${s}`).join('\n')}\n\n`
    : '';

  return `🚀 AI Career Upskilling Update: ${professionTitle}

I am actively advancing my Artificial Intelligence skillset tailored specifically for ${professionTitle}! Here is a quick snapshot of my learning progress:

📊 Learning Momentum:
• Roadmap Progress: ${completedCount} of ${totalPhases} Phases Completed (${percentComplete}%)
• Verified Certifications: ${completedCoursesCount} Free Industry Badges Earned

${nextStepSection}${completedSection}${skillsSection}I'm following a structured pathway featuring free verified courses from Google Cloud, IBM SkillsBuild, and Microsoft Learn.

#AI #Upskilling #${categoryTag} #ArtificialIntelligence #ProfessionalDevelopment #LifelongLearning`;
}
