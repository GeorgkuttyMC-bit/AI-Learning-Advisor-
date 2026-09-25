export type VoiceLanguage = 'en' | 'ml';

export interface VoiceTourStep {
  id: number;
  stepNumber: string;
  titleEn: string;
  titleMl: string;
  targetSection: 'bot_intro' | 'login' | 'sidebar' | 'dashboard' | 'courses' | 'roadmap' | 'tools' | 'profile';
  elementSelector: string;
  highlightLabelEn: string;
  highlightLabelMl: string;
  shortDescEn: string;
  shortDescMl: string;
  textEn: string;
  textMl: string;
}

export const VOICE_TOUR_STEPS: VoiceTourStep[] = [
  {
    id: 1,
    stepNumber: '1',
    titleEn: '1. Meet Your AI Guide Bot & Interactive Features',
    titleMl: '1. എ.ഐ ഗൈഡ് ബോട്ടും ഉപയോഗിക്കേണ്ട വിധവും',
    targetSection: 'bot_intro',
    elementSelector: '#voiceover-chatbot-controller, #top-voiceover-play-btn',
    highlightLabelEn: 'AI Guide Bot & Language Switcher (Top Header)',
    highlightLabelMl: 'എ.ഐ ഗൈഡ് ബോട്ടും ഭാഷാ സ്വിച്ചറും',
    shortDescEn: 'Your interactive guide bot glides across each section with zero overlap.',
    shortDescMl: 'സ്‌ക്രീൻ മറയ്ക്കാതെ ഓരോ വിഭാഗവും വിശദീകരിക്കുന്ന എ.ഐ ഗൈഡ് ബോട്ട്.',
    textEn: "Welcome to the AI Career and Learning Accelerator! I am your personal AI Guide Bot, and I am here to guide you through every feature of this platform. As you explore, I will physically glide alongside each section on your screen to explain its purpose and real-world value, while staying out of your way so you can clearly see all buttons, courses, and metrics without any overlapping boxes. You can toggle my male voice between English and Malayalam at any moment using the language switcher at the top bar. You can also tap directly on my robotic avatar at any time to pause or resume my speech, or to use the quick controls to replay, skip ahead, or return to earlier sections. Let's begin the comprehensive tour!",
    textMl: "എ.ഐ കരിയർ & ലേണിംഗ് ആക്‌സിലറേറ്ററിലേക്ക് ഹൃദ്യമായ സ്വാഗതം! ഞാൻ നിങ്ങളുടെ പേഴ്സണൽ എ.ഐ ഗൈഡ് ബോട്ട് ആണ്. ഈ വെബ്‌സൈറ്റിലെ ഓരോ പ്രധാന ഫീച്ചറുകളും ഞാൻ നിങ്ങൾക്ക് നേരിട്ട് വിശദീകരിച്ചു തരാം. നിങ്ങൾ ഓരോ ഭാഗവും മനസ്സിലാക്കുമ്പോൾ, നിങ്ങളുടെ സ്‌ക്രീനിലെ ഒരു വിവരങ്ങളും ഒട്ടും മറയാതെ, ഞാൻ അതത് സെക്ഷന് അരികിലേക്ക് പറന്നെത്തി കാര്യങ്ങൾ വിവരിക്കും. മുകളിലെ ടോഗിൾ ബട്ടൺ വഴി എന്റെ പുരുഷ ശബ്ദം ഇംഗ്ലീഷിലേക്കും മലയാളത്തിലേക്കും എപ്പോൾ വേണമെങ്കിലും മാറ്റാം. എന്നെ നേരിട്ട് ടാപ്പ് ചെയ്തുകൊണ്ട് നിങ്ങൾക്ക് എപ്പോൾ വേണമെങ്കിലും സംസാരം നിർത്തുകയോ വീണ്ടും കേൾക്കുകയോ ചെയ്യാം. ഒപ്പം തൊട്ടടുത്ത ഭാഗങ്ങളിലേക്ക് പോകാനുള്ള കൺട്രോളുകളും ഇതിലുണ്ട്. ഇനി നമുക്ക് ആദ്യത്തെ പ്രധാന ഘട്ടത്തിലേക്ക് കടക്കാം!"
  },
  {
    id: 2,
    stepNumber: '2',
    titleEn: '2. 1-Click Name Login & Instant Personalization',
    titleMl: '2. പേര് നൽകി ലോഗിൻ ചെയ്യുക',
    targetSection: 'login',
    elementSelector: '#header-login-btn, #header-user-profile-btn',
    highlightLabelEn: '1-Click Name Login (Top Header)',
    highlightLabelMl: 'പേര് നൽകി ലോഗിൻ ചെയ്യുക (മുകളിൽ)',
    shortDescEn: 'Enter your name to save progress, bookmarks, and badges without passwords.',
    shortDescMl: 'പാസ്‌വേഡ് ഇല്ലാതെ പേര് നൽകി പഠന പുരോഗതി സുരക്ഷിതമായി സൂക്ഷിക്കുക.',
    textEn: "Step 2: Start effortlessly by logging in with your name. Notice the Log In button located in the top-right header. Unlike typical websites, there are zero passwords, emails, or complicated verification codes required. Simply click Log In, type your first name or nickname, and press enter. Your name immediately establishes your personal profile on this device. Everything you achieve—including your completed course certificates, weekly study hours, saved course bookmarks, and custom career selections—is automatically and safely stored under your name. If multiple people use this computer, you can switch accounts anytime from the top-right menu with a single click.",
    textMl: "ഘട്ടം രണ്ട്: നിങ്ങളുടെ പേര് നൽകി വളരെ എളുപ്പത്തിൽ ലോഗിൻ ചെയ്യുക. മുകൾഭാഗത്ത് വലതുവശത്തുള്ള ലോഗിൻ ബട്ടൺ ശ്രദ്ധിക്കുക. മറ്റ് വെബ്‌സൈറ്റുകളിൽ നിന്ന് വ്യത്യസ്തമായി ഇവിടെ പാസ്‌വേഡോ, ഇമെയിലോ, വെരിഫിക്കേഷനോ ആവശ്യമില്ല. ലോഗിൻ ബട്ടൺ ക്ലിക്ക് ചെയ്ത് നിങ്ങളുടെ പേരോ വിളിപ്പേരോ മാത്രം നൽകിയാൽ മതിയാകും. ഇത് നിങ്ങളുടെ പേരിൽ ഉടൻ തന്നെ ഒരു ലേണിംഗ് പ്രൊഫൈൽ സൃഷ്ടിക്കുന്നു. നിങ്ങൾ പഠിച്ച കോഴ്‌സുകൾ, സർട്ടിഫിക്കറ്റുകൾ, പ്രതിവാര പഠന സമയം, സേവ് ചെയ്ത ലിങ്കുകൾ എന്നിവയെല്ലാം നിങ്ങളുടെ പേരിൽ സുരക്ഷിതമായി ഓട്ടോമാറ്റിക്കായി സേവ് ചെയ്യപ്പെടും. ഒന്നിലധികം ആളുകൾ ഉപയോഗിക്കുകയാണെങ്കിൽ, മുകളിലെ മെനുവിൽ നിന്ന് വേറെ അക്കൗണ്ടുകളിലേക്ക് സ്വിച്ച് ചെയ്യാനും സാധിക്കും."
  },
  {
    id: 3,
    stepNumber: '3',
    titleEn: '3. Choose Your Career Role & Curriculum Tailoring',
    titleMl: '3. തൊഴിൽ മേഖല തിരഞ്ഞെടുക്കുക',
    targetSection: 'sidebar',
    elementSelector: '#role-selector-button, #sidebar-nav-container',
    highlightLabelEn: 'Left Navigation & Career Selector',
    highlightLabelMl: 'ഇടത് സൈഡ്‌ബാറും കരിയർ സെലക്ടറും',
    shortDescEn: 'Customize your roadmap, tools, and courses for your exact job.',
    shortDescMl: 'നിങ്ങളുടെ തൊഴിലിന് അനുയോജ്യമായ എ.ഐ പാഠ്യപദ്ധതി തിരഞ്ഞെടുക്കുക.',
    textEn: "Step 3: Customize your AI learning track for your specific job. On the left navigation sidebar, locate the Active Career Role dropdown. Whether you work in Software Engineering, Data Analytics, Healthcare, Product Design, Marketing, or Financial Analysis, selecting your profession instantly restructures the entire platform. The AI dynamically filters out irrelevant material and curates the highest-priority AI skills, recommended verified courses, essential industry software tools, and role-specific prompt templates designed for your daily workflow. You can also generate an AI-tailored pathway for any unique custom profession by clicking Custom AI Pathway.",
    textMl: "ഘട്ടം മൂന്ന്: നിങ്ങളുടെ തൊഴിലിന് അനുയോജ്യമായ എ.ഐ പാഠ്യപദ്ധതി തിരഞ്ഞെടുക്കുക. ഇടത് സൈഡ്‌ബാറിലെ 'ആക്ടീവ് കരിയർ റോൾ' ഡ്രോപ്പ്ഡൗൺ ശ്രദ്ധിക്കുക. സോഫ്റ്റ്‌വെയർ എൻജിനീയറിങ്, ഡാറ്റ അനലിറ്റിക്‌സ്, ഡിസൈൻ, മാർക്കറ്റിംഗ്, ഫിനാൻസ്, ഹെൽത്ത്‌കെയർ തുടങ്ങി ഏത് മേഖലയിലും ഉള്ളവർക്ക് സ്വന്തം തൊഴിൽ ഇവിടെ തിരഞ്ഞെടുക്കാം. നിങ്ങൾ ഒരു റോൾ തിരഞ്ഞെടുക്കുമ്പോൾ തന്നെ, ഈ വെബ്‌സൈറ്റിലെ എല്ലാ കോഴ്‌സുകളും, ടൂളുകളും, റോഡ്‌മാപ്പും ആ തൊഴിലിന് ആവശ്യമായ രീതിയിലേക്ക് തനിയെ മാറുന്നു. നിങ്ങളുടെ ജോലിയിലെ ദൈനംദിന ആവശ്യങ്ങൾക്ക് അനുയോജ്യമായ കൃത്യമായ പാഠ്യപദ്ധതിയാണ് ഇതിലൂടെ ലഭിക്കുന്നത്."
  },
  {
    id: 4,
    stepNumber: '4',
    titleEn: '4. Real-Time Learning Dashboard & KPI Metrics',
    titleMl: '4. പ്രധാന ഡാഷ്‌ബോർഡ് അവലോകനം',
    targetSection: 'dashboard',
    elementSelector: '#dashboard-overview-section',
    highlightLabelEn: 'Active Learning Banner & KPI Cards',
    highlightLabelMl: 'ഡാഷ്‌ബോർഡും പുരോഗതി കാർഡുകളും',
    shortDescEn: 'Track overall track completion, resume courses, and monitor study hours.',
    shortDescMl: 'ആകെ പുരോഗതിയും അടുത്ത കോഴ്‌സും മെട്രിക് കാർഡുകളും നിരീക്ഷിക്കുക.',
    textEn: "Step 4: Track your ongoing growth on the main Learning Dashboard. At the very top, the vibrant spotlight banner displays your active role, your overall curriculum completion percentage, and a prominent Resume Next Course button that lets you jump straight back into learning with zero friction. Below the banner, four real-time KPI stat cards keep you focused: tracking the total number of courses you have completed, the verified digital credential badges you have earned, your weekly logged study hours against your goal, and the milestone checkpoints you have achieved.",
    textMl: "ഘട്ടം നാല്: പ്രധാന ലേണിംഗ് ഡാഷ്‌ബോർഡും പുരോഗതി കാർഡുകളും. ഡാഷ്‌ബോർഡിന്റെ മുകളിൽ കാണുന്ന മനോഹരമായ ബാനറിൽ നിങ്ങളുടെ കരിയർ റോൾ, ആകെ കോഴ്‌സ് പുരോഗതി, ഒപ്പം അടുത്ത ക്ലാസ്സ് ഉടൻ തുടങ്ങാനുള്ള 'റെസ്യൂം നെക്സ്റ്റ് കോഴ്‌സ്' ബട്ടൺ എന്നിവ കാണാം. താഴെ കാണുന്ന നാല് റിയൽ-ടൈം മെട്രിക് കാർഡുകൾ വഴി നിങ്ങൾ പൂർത്തിയാക്കിയ കോഴ്‌സുകളുടെ എണ്ണം, നേടിയ ഔദ്യോഗിക ഡിജിറ്റൽ ബാഡ്ജുകൾ, പ്രതിവാര പഠന ലക്ഷ്യത്തിലെ പുരോഗതി, റോഡ്‌മാപ്പ് നാഴികക്കല്ലുകൾ എന്നിവ കൃത്യമായി അളക്കാനും നിരീക്ഷിക്കാനും സാധിക്കുന്നു."
  },
  {
    id: 5,
    stepNumber: '5',
    titleEn: '5. 100% Free Verified Certificate Courses & Direct Student Login',
    titleMl: '5. സൗജന്യ കോഴ്‌സുകളും നേരിട്ടുള്ള ലോഗിനും',
    targetSection: 'courses',
    elementSelector: '#courses-section',
    highlightLabelEn: 'Direct Course Links & Student Login',
    highlightLabelMl: 'നേരിട്ടുള്ള കോഴ്‌സ് ലോഗിൻ ലിങ്കുകൾ',
    shortDescEn: 'Verified free courses from Google, IBM, Microsoft, Harvard, and NVIDIA.',
    shortDescMl: 'ഗൂഗിൾ, ഐ.ബി.എം, മൈക്രോസോഫ്റ്റ് സൗജന്യ സർട്ടിഫിക്കറ്റ് കോഴ്‌സുകൾ.',
    textEn: "Step 5: Access top-tier, 100% free accredited courses with official digital badges. In the Courses section, every curriculum is curated from world-class tech leaders, including Google Cloud Skills Boost, IBM SkillsBuild on Credly, Microsoft Learn, Harvard University CS50, Elements of AI, and NVIDIA Deep Learning Institute. Crucially, every course includes a Direct Course and Login button that launches you straight past marketing homepages directly into the classroom and student login portal. Completing these courses earns you accredited credentials and industry-recognized digital badges that you can share on LinkedIn and resume portfolios.",
    textMl: "ഘട്ടം അഞ്ച്: സൗജന്യ സർട്ടിഫിക്കറ്റ് കോഴ്‌സുകളും നേരിട്ടുള്ള സ്റ്റുഡന്റ് ലോഗിനും. കോഴ്‌സ് വിഭാഗത്തിൽ ഗൂഗിൾ ക്ലൗഡ്, ഐ.ബി.എം, മൈക്രോസോഫ്റ്റ്, ഹാർവാർഡ് യൂണിവേഴ്സിറ്റി, എൻവിഡിയ എന്നിവരുടെ ലോകോത്തര കോഴ്‌സുകളാണ് ഉള്ളത്. ഈ കോഴ്‌സുകൾ എല്ലാം തന്നെ തികച്ചും സൗജന്യമാണ്. ഇതിൽ നൽകിയിട്ടുള്ള 'ഡയറക്ട് കോഴ്‌സ് & ലോഗിൻ' ബട്ടൺ ക്ലിക്ക് ചെയ്താൽ അനാവശ്യ പരസ്യ പേജുകളില്ലാതെ നേരിട്ട് ആ കോഴ്‌സിന്റെ ഒഫീഷ്യൽ ക്ലാസ്സ് റൂമിലേക്കും ലോഗിൻ പേജിലേക്കും പ്രവേശിക്കാം. കോഴ്‌സ് പൂർത്തിയാക്കുമ്പോൾ നിങ്ങളുടെ ലിങ്ക്ഡ്ഇനിലും റെസ്യുമെയിലും ചേർക്കാവുന്ന ഒഫീഷ്യൽ സർട്ടിഫിക്കറ്റുകളും ബാഡ്ജുകളും ലഭിക്കും."
  },
  {
    id: 6,
    stepNumber: '6',
    titleEn: '6. Structured 4-Phase Roadmap & Browser Study Reminders',
    titleMl: '6. നാല് ഘട്ട പഠന റോഡ്‌മാപ്പ്',
    targetSection: 'roadmap',
    elementSelector: '#roadmap-section',
    highlightLabelEn: '4-Phase Structured Timeline & Reminders',
    highlightLabelMl: 'ഘടനാപരമായ റോഡ്‌മാപ്പും റിമൈൻഡറും',
    shortDescEn: 'Foundations to Capstone with checklists and audio study reminders.',
    shortDescMl: 'ഘട്ടങ്ങളായുള്ള പഠന ക്രമവും ബ്രൗസർ റിമൈൻഡറും.',
    textEn: "Step 6: Progress methodically with the 4-Phase Step-by-Step Roadmap. Paced comfortably for your weekly schedule, the roadmap guides you from Phase 1 Foundations and Phase 2 Core Skills, all the way to Advanced Specialization and Capstone Application. Each phase provides recommended action item checklists, weekly time commitments, and embedded course direct login links. You can mark items completed as you master them, and activate built-in browser study notifications with audio chimes to help you maintain a consistent daily learning streak.",
    textMl: "ഘട്ടം ആറ്: നാല് ഘട്ടങ്ങളായുള്ള പഠന റോഡ്‌മാപ്പും സ്റ്റഡി റിമൈൻഡറുകളും. തുടക്കക്കാർ മുതൽ ഉയർന്ന പ്രൊഫഷണലുകൾ വരെയുള്ള നാല് സുപ്രധാന ഘട്ടങ്ങളായാണ് ഈ റോഡ്‌മാപ്പ് തയ്യാറാക്കിയിരിക്കുന്നത്. ഓരോ ഘട്ടത്തിലും ചെയ്യേണ്ട കാര്യങ്ങളുടെ ചെക്ക്‌ലിസ്റ്റുകൾ, പഠന സമയം, നേരിട്ടുള്ള കോഴ്‌സ് ലിങ്കുകൾ എന്നിവ അടങ്ങിയിരിക്കുന്നു. ഓരോ ഘട്ടവും പഠിച്ചു കഴിയുമ്പോൾ മാർക്ക് ചെയ്യാം. കൂടാതെ, ദിവസവും കൃത്യസമയത്ത് പഠിക്കാൻ ബ്രൗസർ നോട്ടിഫിക്കേഷൻ റിമൈൻഡറുകൾ ഓൺ ചെയ്തു വെക്കാനും ഇതിലൂടെ സാധിക്കും."
  },
  {
    id: 7,
    stepNumber: '7',
    titleEn: '7. Curated AI Tools Directory & Role Prompt Vault',
    titleMl: '7. എ.ഐ ടൂളുകളും പ്രോംപ്റ്റുകളും',
    targetSection: 'tools',
    elementSelector: '#tools-section',
    highlightLabelEn: 'Workplace AI Tools & Prompt Templates',
    highlightLabelMl: 'പ്രായോഗിക എ.ഐ ടൂളുകളും പ്രോംപ്റ്റുകളും',
    shortDescEn: 'Workplace AI software with docs, pricing, and ready-to-copy prompts.',
    shortDescMl: 'തൊഴിലിന് ആവശ്യമായ എ.ഐ ടൂളുകളും കോപ്പി ചെയ്യാവുന്ന പ്രോംപ്റ്റുകളും.',
    textEn: "Step 7: Supercharge your productivity with vetted AI tools and practical prompts. In the Tools directory, explore high-impact AI software categorized for your role—such as code assistants, generative design engines, predictive analytics platforms, and automated workflow copilots—with direct links to documentation and official free tiers. Next, open the Role Prompt Vault to instantly browse and copy battle-tested prompt templates engineered for complex coding, data visualization, marketing copy, and business strategy.",
    textMl: "ഘട്ടം ഏഴ്: എ.ഐ ടൂളുകളും റെഡിമെയ്ഡ് പ്രോംപ്റ്റ് വോൾട്ടും. നിങ്ങളുടെ ജോലിയിൽ ഉൽപ്പാദനക്ഷമത വർദ്ധിപ്പിക്കാൻ സഹായിക്കുന്ന ഏറ്റവും മികച്ച എ.ഐ സോഫ്റ്റ്‌വെയറുകൾ ടൂൾസ് ഡയറക്ടറിയിൽ ലഭ്യമാണ്. ഇവയുടെ ഔദ്യോഗിക ലിങ്കുകളും ഡോക്യുമെന്റേഷനും ഇവിടെ കാണാം. കൂടാതെ, റോൾ പ്രോംപ്റ്റ് വോൾട്ട് തുറന്നാൽ കോഡിംഗ്, ഡാറ്റ വിശകലനം, കണ്ടന്റ് റൈറ്റിംഗ്, പ്ലാനിംഗ് എന്നിവക്കായി ഉടനടി കോപ്പി ചെയ്ത് ഉപയോഗിക്കാവുന്ന മികച്ച പ്രോംപ്റ്റ് ടെംപ്ലേറ്റുകളും ലഭിക്കും."
  },
  {
    id: 8,
    stepNumber: '8',
    titleEn: '8. Learner Profile, Weekly Study Activity Chart & Badge Shelf',
    titleMl: '8. ലേണർ പ്രൊഫൈലും ബാഡ്ജുകളും',
    targetSection: 'profile',
    elementSelector: '#learner-profile-panel',
    highlightLabelEn: 'Weekly Study Hours & Verified Badges Shelf',
    highlightLabelMl: 'പഠന സമയ ചാർട്ടും ഡിജിറ്റൽ ബാഡ്ജുകളും',
    shortDescEn: '7-day study graph, earned digital badges, bookmarks, and export plan.',
    shortDescMl: 'പഠന സമയ ചാർട്ടും ബാഡ്ജ് ഷെൽഫും സേവ് ചെയ്ത ലൈബ്രറിയും.',
    textEn: "Step 8: Track your overall achievements in the Learner Profile panel on the right. Here you can inspect your 7-day study hours bar chart, review your completed courses, admire your verified digital badges on the credential shelf, access saved bookmarks, and export your complete learning plan. Remember, you can toggle my male voice between English and Malayalam anytime at the top bar, or tap on me to pause whenever you want to explore on your own. Enjoy accelerating your career with AI!",
    textMl: "ഘട്ടം എട്ട്: ലേണർ പ്രൊഫൈലും ഡിജിറ്റൽ ബാഡ്ജ് ഷെൽഫും. വലതുവശത്തെ പ്രൊഫൈലിൽ നിങ്ങളുടെ കഴിഞ്ഞ 7 ദിവസത്തെ പഠന സമയ ഗ്രാഫ്, നിങ്ങൾ നേടിയ ഒഫീഷ്യൽ സർട്ടിഫിക്കറ്റ് ബാഡ്ജുകൾ, ബുക്ക്‌മാർക്ക് ചെയ്ത കോഴ്‌സുകൾ എന്നിവ കാണാം. നിങ്ങളുടെ മുഴുവൻ പഠന പ്ലാനും ഇവിടുന്ന് എക്‌സ്‌പോർട്ട് ചെയ്യാനും സാധിക്കും. മുകളിലുള്ള ടോഗിൾ ബട്ടൺ വഴി എപ്പോൾ വേണമെങ്കിലും ഭാഷ മാറ്റാമെന്ന് ഓർക്കുക. പുതിയ എ.ഐ വിദ്യകൾ പഠിച്ച് നിങ്ങളുടെ കരിയർ മികച്ചതാക്കാൻ ആശംസിക്കുന്നു. നന്ദി!"
  }
];

export const FULL_TOUR_TEXT_EN = VOICE_TOUR_STEPS.map(s => s.textEn).join(" ");
export const FULL_TOUR_TEXT_ML = VOICE_TOUR_STEPS.map(s => s.textMl).join(" ");

export interface AudioVoiceConfig {
  voice: SpeechSynthesisVoice | null;
  langCode: string;
  hasNativeLanguageVoice: boolean;
  isMaleVoice: boolean;
}

/**
 * Split text into short, natural sentence chunks so mobile browser speech buffers never overflow
 */
export function splitTextIntoSentences(text: string): string[] {
  if (!text) return [];
  // Split on sentence boundaries: period, exclamation mark, question mark, or colon
  const chunks = text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  return chunks.length > 0 ? chunks : [text];
}

/**
 * Resolves the best available voice with safe fallbacks so audio never fails on mobile/desktop
 */
export function resolveVoiceForLanguage(lang: VoiceLanguage): AudioVoiceConfig {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return { voice: null, langCode: 'en-US', hasNativeLanguageVoice: false, isMaleVoice: true };
  }
  const voices = window.speechSynthesis.getVoices() || [];

  if (lang === 'ml') {
    // 1. Check for genuine Malayalam voice on the device
    const mlVoice = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l.startsWith('ml') || v.name.toLowerCase().includes('malayalam');
    });

    if (mlVoice) {
      return { 
        voice: mlVoice, 
        langCode: mlVoice.lang || 'ml-IN', 
        hasNativeLanguageVoice: true, 
        isMaleVoice: /male|man|gokul|midhun|arun/i.test(mlVoice.name) 
      };
    }

    // 2. If device has no Malayalam voice installed, use Indian English male voice safely
    const inVoice = voices.find(v => v.lang.toLowerCase().includes('in') && /male|ravi|george|david|prabhat/i.test(v.name))
      || voices.find(v => v.lang.toLowerCase().includes('in'));

    if (inVoice) {
      return { 
        voice: inVoice, 
        langCode: inVoice.lang || 'en-IN', 
        hasNativeLanguageVoice: false, 
        isMaleVoice: true 
      };
    }
  }

  // English male voice:
  const enVoices = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith('en'));
  const maleKeywords = [
    'male', 
    'david', 
    'george', 
    'guy', 
    'mark', 
    'daniel', 
    'alex', 
    'fred', 
    'oliver', 
    'ravi', 
    'google uk english male',
    'microsoft david',
    'microsoft mark',
    'english male'
  ];
  
  for (const kw of maleKeywords) {
    const found = enVoices.find(v => v.name.toLowerCase().includes(kw));
    if (found) return { voice: found, langCode: found.lang || 'en-US', hasNativeLanguageVoice: true, isMaleVoice: true };
  }

  const defaultVoice = enVoices[0] || voices[0] || null;
  return { 
    voice: defaultVoice, 
    langCode: defaultVoice?.lang || 'en-US', 
    hasNativeLanguageVoice: true, 
    isMaleVoice: true 
  };
}

/**
 * Find best male voice available in the client browser
 */
export function getAvailableMaleVoice(lang: VoiceLanguage): SpeechSynthesisVoice | null {
  return resolveVoiceForLanguage(lang).voice;
}

