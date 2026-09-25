export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type PrimaryGoal = 
  | 'career_boost' 
  | 'free_certificates' 
  | 'build_apps' 
  | 'ethics_strategy' 
  | 'career_pivot';

export type WeeklyHours = '1-2' | '3-5' | '6-10+';

export type FormatPreference = 'all' | 'interactive' | 'video' | 'reading';

export interface UserProfile {
  name?: string;
  professionId: string;
  customProfessionTitle?: string;
  experienceLevel: ExperienceLevel;
  primaryGoal: PrimaryGoal;
  weeklyHours: WeeklyHours;
  formatPreference: FormatPreference;
}

export interface UserAccount {
  name: string;
  avatarColor?: string;
  avatarEmoji?: string;
  createdAt: string;
  lastActive: string;
  profile?: UserProfile;
  savedCourseIds?: string[];
  completedCourseIds?: string[];
  completedMilestones?: Record<number, boolean>;
}

export interface CourseResource {
  id: string;
  title: string;
  provider: string;
  url: string;
  isCertificateFree: boolean;
  badgeType: 'Digital Badge' | 'Certificate of Completion' | 'Academic Certificate' | 'Professional Credential';
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'core_literacy' | 'role_specific' | 'advanced_practice' | 'tools';
  description: string;
  skillsLearned: string[];
  platform: string;
  credentialIssuer: string;
  thumbnailUrl?: string;
}

export interface AITechnologyTool {
  name: string;
  category: string;
  description: string;
  freeTierAvailable: boolean;
  howProfessionalsUse: string;
  learningUrl: string;
  tags: string[];
}

export interface RoadmapStep {
  phase: number;
  title: string;
  duration: string;
  objective: string;
  actionItems: string[];
  recommendedCourseIds: string[];
  milestone: string;
}

export interface PromptTemplate {
  title: string;
  scenario: string;
  prompt: string;
  expectedOutcome: string;
}

export interface ProfessionData {
  id: string;
  title: string;
  category: string;
  iconName: string;
  tagline: string;
  overview: string;
  impactOfAI: string;
  keySkillsNeeded: string[];
  topTools: AITechnologyTool[];
  featuredCourses: CourseResource[];
  roadmap: RoadmapStep[];
  promptTemplates: PromptTemplate[];
  imageUrl?: string;
  colorAccent?: string;
}

export interface CustomRoadmapResponse {
  professionTitle: string;
  overview: string;
  impactOfAI: string;
  keySkillsNeeded: string[];
  topTools: AITechnologyTool[];
  featuredCourses: CourseResource[];
  roadmap: RoadmapStep[];
  promptTemplates: PromptTemplate[];
}
