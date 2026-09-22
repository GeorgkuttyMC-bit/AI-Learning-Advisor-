import { ProfessionData } from '../types';
import { GLOBAL_FREE_CERTIFICATE_COURSES } from './courses';

// Helper to look up course by ID
const getCourse = (id: string) => {
  const found = GLOBAL_FREE_CERTIFICATE_COURSES.find(c => c.id === id);
  if (!found) {
    throw new Error(`Course not found: ${id}`);
  }
  return found;
};

export const PROFESSIONS_DATA: ProfessionData[] = [
  {
    id: 'software_engineering',
    title: 'Software Developer & Engineer',
    category: 'Technology & Engineering',
    iconName: 'Code',
    tagline: 'Supercharge coding speed, automate testing, and master LLM APIs and Agentic architectures.',
    overview: 'AI is fundamentally transforming software development from manual typing to AI-pair programming, automated unit tests, and designing intelligent systems with LLM APIs, Vector DBs, and Agentic frameworks.',
    impactOfAI: 'Developers who leverage AI tools ship code 30-55% faster, refactor legacy code bases in minutes, and shift focus toward high-level system architecture and edge-case verification.',
    keySkillsNeeded: [
      'AI-Assisted Pair Programming & Code Review',
      'API Integration (Gemini, OpenAI, Anthropic SDKs)',
      'Prompt Engineering for Code Generation & Debugging',
      'Retrieval-Augmented Generation (RAG) & Vector Databases',
      'Agentic Frameworks & Function Calling'
    ],
    topTools: [
      {
        name: 'GitHub Copilot / Cursor',
        category: 'AI IDE & Code Synthesis',
        description: 'Industry-standard AI coding tools that predict whole functions, generate test suites, and explain complex codebases in natural language.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Writing boilerplate, drafting regex/SQL, and automating test coverage.',
        learningUrl: 'https://docs.github.com/en/copilot',
        tags: ['Coding', 'Refactoring', 'Unit Tests']
      },
      {
        name: 'LangChain & LlamaIndex',
        category: 'Orchestration Frameworks',
        description: 'Open-source libraries to connect LLMs to company documents, APIs, and databases via semantic search.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Building internal documentation assistants, enterprise search, and automated research agents.',
        learningUrl: 'https://python.langchain.com/',
        tags: ['RAG', 'Vector Search', 'Agents']
      },
      {
        name: 'v0 by Vercel',
        category: 'Generative UI',
        description: 'Generative user interface tool that turns plain English design prompts into React and Tailwind CSS components.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Rapidly prototyping dashboards, landing pages, and interactive client widgets.',
        learningUrl: 'https://v0.dev/',
        tags: ['Frontend', 'React', 'Prototyping']
      }
    ],
    featuredCourses: [
      getCourse('google-intro-genai'),
      getCourse('deeplearning-ai-prompt-eng'),
      getCourse('google-intro-llm'),
      getCourse('harvard-cs50-ai'),
      getCourse('kaggle-intro-ml')
    ],
    roadmap: [
      {
        phase: 1,
        title: 'AI Coding Copilot Mastery',
        duration: 'Week 1-2 (4 hrs/wk)',
        objective: 'Incorporate AI code generation directly into your IDE workflow for syntax, tests, and refactoring.',
        actionItems: [
          'Complete Google Cloud "Introduction to Generative AI" micro-credential',
          'Configure Cursor / GitHub Copilot inside VS Code',
          'Practice writing automated unit tests and documenting legacy functions using AI prompts'
        ],
        recommendedCourseIds: ['google-intro-genai'],
        milestone: 'Earn Google Cloud GenAI Completion Badge'
      },
      {
        phase: 2,
        title: 'Prompt Engineering for Engineers',
        duration: 'Week 3-4 (5 hrs/wk)',
        objective: 'Master structured prompting, few-shot examples, system constraints, and JSON mode.',
        actionItems: [
          'Complete DeepLearning.AI "ChatGPT Prompt Engineering for Developers" with Andrew Ng',
          'Build a script that parses untrusted input and outputs validated JSON schemas using an LLM',
          'Learn defensive prompting techniques to avoid prompt injection vulnerabilities'
        ],
        recommendedCourseIds: ['deeplearning-ai-prompt-eng', 'google-intro-llm'],
        milestone: 'Official Certificate in Prompt Engineering from DeepLearning.AI'
      },
      {
        phase: 3,
        title: 'Building RAG & Knowledge Systems',
        duration: 'Week 5-8 (6 hrs/wk)',
        objective: 'Learn vector embeddings, chunking strategies, and connecting private documentation to LLMs.',
        actionItems: [
          'Set up ChromaDB or Pinecone with local embeddings',
          'Build a "Chat with your Repository" application using LangChain or LlamaIndex',
          'Implement semantic search and reranking for document retrieval'
        ],
        recommendedCourseIds: ['kaggle-intro-ml'],
        milestone: 'Functional RAG Documentation Assistant deployed on GitHub'
      },
      {
        phase: 4,
        title: 'Agentic Systems & Computer Science Depth',
        duration: 'Week 9-12 (8 hrs/wk)',
        objective: 'Dive into autonomous function calling, agent loops, and algorithmic foundations.',
        actionItems: [
          'Audit Harvard CS50 AI curriculum on algorithms and decision trees',
          'Deploy multi-step tool-calling agents that interact with external REST APIs',
          'Implement evaluation benchmarks to assess model hallucinations and output reliability'
        ],
        recommendedCourseIds: ['harvard-cs50-ai'],
        milestone: 'Capstone: Production-ready Autonomous Agent with Harvard CS50 Completion'
      }
    ],
    promptTemplates: [
      {
        title: 'Comprehensive Unit Test Suite Generator',
        scenario: 'Writing edge-case test coverage for complex logic',
        prompt: 'Act as a Senior QA Automation Architect. Review the following TypeScript function: [PASTE_CODE]. Generate a comprehensive Vitest/Jest test suite covering: 1) Happy path, 2) Boundary values, 3) Null/Undefined inputs, 4) Async error handling. Add clear descriptive assertions for each case.',
        expectedOutcome: 'Robust, copy-pasteable test suite covering edge cases.'
      },
      {
        title: 'Legacy Code Refactoring & Optimization',
        scenario: 'Modernizing spaghetti or slow routines',
        prompt: 'Analyze this legacy code block: [PASTE_CODE]. Identify: 1) Time and space complexity bottlenecks, 2) Clean Code anti-patterns, 3) Security/type risks. Rewrite it using modern ES2022+ standards, keeping identical input/output contracts.',
        expectedOutcome: 'Idiomatic, clean code with complexity breakdown.'
      }
    ]
  },
  {
    id: 'data_analytics',
    title: 'Data Analyst & Business Intelligence Specialist',
    category: 'Data & Analytics',
    iconName: 'BarChart3',
    tagline: 'Transform raw data into predictive insights, automated SQL pipelines, and executive dashboards with AI.',
    overview: 'Modern data analysts use AI to automate data wrangling, generate complex SQL queries in seconds, interpret statistical anomalies, and craft executive business summaries.',
    impactOfAI: 'AI speeds up query construction and syntax debugging by 70%, allowing analysts to shift from mundane spreadsheet wrangling to high-value predictive modeling and strategic business storytelling.',
    keySkillsNeeded: [
      'Natural Language to SQL Query Synthesis',
      'Automated Exploratory Data Analysis (EDA)',
      'Predictive Modeling with Machine Learning',
      'AI-Enhanced Data Visualization & Narrative Reporting',
      'Data Privacy, Security & Anonymization'
    ],
    topTools: [
      {
        name: 'Julius AI / Advanced Data Analysis',
        category: 'Autonomous Data Science',
        description: 'Interactive computational sandbox that ingests CSV/Excel files, cleans missing values, writes Python scripts, and graphs trends automatically.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Rapid exploratory data analysis, correlation matrices, and automated statistical testing.',
        learningUrl: 'https://julius.ai/',
        tags: ['Analytics', 'Python', 'Exploration']
      },
      {
        name: 'Microsoft Copilot for Power BI / Excel',
        category: 'Business Intelligence',
        description: 'Generates DAX formulas, complex Excel macros, and full multi-page visual reports from conversational questions.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Drafting DAX measures, forecasting revenue, and formatting executive KPI summaries.',
        learningUrl: 'https://learn.microsoft.com/en-us/power-bi/copilot-power-bi-overview',
        tags: ['Power BI', 'Excel', 'DAX']
      },
      {
        name: 'Hex AI / Deepnote',
        category: 'Collaborative Notebooks',
        description: 'Cloud data workspaces that blend SQL, Python, and natural language AI to construct reproducible data pipelines.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Writing complex CTEs, debugging queries, and publishing interactive data apps.',
        learningUrl: 'https://hex.tech/',
        tags: ['SQL', 'Notebooks', 'Pipelines']
      }
    ],
    featuredCourses: [
      getCourse('kaggle-intro-ml'),
      getCourse('ibm-ai-fundamentals'),
      getCourse('microsoft-career-essentials-genai'),
      getCourse('elements-of-ai')
    ],
    roadmap: [
      {
        phase: 1,
        title: 'AI Literacy & Natural Language SQL',
        duration: 'Week 1-2 (3-4 hrs/wk)',
        objective: 'Understand AI fundamentals and use LLMs to accelerate SQL and Python syntax writing.',
        actionItems: [
          'Earn IBM SkillsBuild "Artificial Intelligence Fundamentals" Credly Badge',
          'Use AI to generate and explain nested SQL JOINs, window functions, and CTEs',
          'Learn prompt patterns for generating clean pandas and NumPy transformations'
        ],
        recommendedCourseIds: ['ibm-ai-fundamentals'],
        milestone: 'IBM AI Fundamentals Credly Digital Badge'
      },
      {
        phase: 2,
        title: 'Machine Learning Foundations for Analysts',
        duration: 'Week 3-4 (4-5 hrs/wk)',
        objective: 'Transition from descriptive analytics to predictive modeling using Scikit-Learn.',
        actionItems: [
          'Complete Kaggle "Intro to Machine Learning" hands-on micro-course',
          'Train your first regression and classification models to predict customer churn',
          'Understand model validation metrics: MAE, RMSE, Precision, Recall, and ROC-AUC'
        ],
        recommendedCourseIds: ['kaggle-intro-ml'],
        milestone: 'Kaggle Machine Learning Completion Certificate'
      },
      {
        phase: 3,
        title: 'Business AI Strategy & Automated Dashboards',
        duration: 'Week 5-6 (4 hrs/wk)',
        objective: 'Integrate AI into Power BI, Excel, and stakeholder reporting workflows.',
        actionItems: [
          'Complete Microsoft Career Essentials in Generative AI',
          'Build an automated executive dashboard report that synthesizes data insights into 3 key takeaways',
          'Implement data anonymization guidelines to protect sensitive customer PII'
        ],
        recommendedCourseIds: ['microsoft-career-essentials-genai'],
        milestone: 'Microsoft & LinkedIn Generative AI Career Essentials Credential'
      },
      {
        phase: 4,
        title: 'Advanced Machine Learning & Causal AI',
        duration: 'Week 7-10 (6 hrs/wk)',
        objective: 'Explore feature engineering, neural network foundations, and ethical data governance.',
        actionItems: [
          'Study Elements of AI curriculum by University of Helsinki for theoretical rigor',
          'Deploy an end-to-end data forecasting notebook on Kaggle',
          'Present an AI-generated data report with automated charts and executive executive takeaways'
        ],
        recommendedCourseIds: ['elements-of-ai'],
        milestone: 'University of Helsinki Accredited Certificate'
      }
    ],
    promptTemplates: [
      {
        title: 'Complex SQL Query Builder with Explanation',
        scenario: 'Writing complex multi-table SQL with window functions',
        prompt: 'Given the following database schema: [PASTE_SCHEMA]. Write an optimized PostgreSQL query to calculate the 30-day rolling customer retention rate grouped by acquisition cohort. Explain each CTE and window function step-by-step.',
        expectedOutcome: 'Syntactically accurate SQL with performance commentary.'
      },
      {
        title: 'Executive Data Storytelling & Trend Synthesis',
        scenario: 'Translating numbers into C-suite recommendations',
        prompt: 'Here is a monthly summary of our sales metrics: [PASTE_METRICS]. Format this into an Executive Summary: 1) Three bullet points on key revenue drivers, 2) Risk factors or negative anomalies detected, 3) 2 actionable data-backed recommendations for the CMO.',
        expectedOutcome: 'Concise executive memo with clear statistical backing.'
      }
    ]
  },
  {
    id: 'healthcare_medicine',
    title: 'Healthcare, Nursing & Medical Professional',
    category: 'Healthcare & Life Sciences',
    iconName: 'Activity',
    tagline: 'Streamline clinical documentation, understand diagnostic AI, and lead safe medical AI adoption.',
    overview: 'Clinicians, nurses, and medical researchers are using generative AI to eliminate hours of EHR documentation, summarize patient histories, review literature, and understand clinical decision support systems.',
    impactOfAI: 'Ambient AI scribes reduce physician documentation burden by up to 2-3 hours per day, combating clinician burnout and restoring direct doctor-patient face time while maintaining strict HIPAA compliance.',
    keySkillsNeeded: [
      'Ambient Clinical Scribe Operations & EHR Integration',
      'Medical Literature Synthesis & PubMed AI Search',
      'Patient Education Material Generation (Health Literacy)',
      'HIPAA, Patient Data Privacy & Medical Ethics',
      'Critical Appraisal of Diagnostic AI Algorithms'
    ],
    topTools: [
      {
        name: 'Abridge / Nabla Copilot',
        category: 'Ambient Clinical Documentation',
        description: 'AI medical assistants that listen to patient-clinician conversations and draft structured SOAP notes mapped directly to medical coding standards.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Drafting visit notes, referral letters, and patient discharge summaries in real time.',
        learningUrl: 'https://www.nabla.com/',
        tags: ['Clinical Notes', 'SOAP', 'EHR']
      },
      {
        name: 'Consensus / Elicit',
        category: 'Evidence-Based Research',
        description: 'Scientific search engines using LLMs to extract findings from over 200 million peer-reviewed biomedical papers.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Evaluating meta-analyses, checking treatment contraindications, and literature reviews.',
        learningUrl: 'https://consensus.app/',
        tags: ['PubMed', 'Clinical Trials', 'Research']
      },
      {
        name: 'Med-PaLM 2 / Google Health AI',
        category: 'Clinical Foundation Models',
        description: 'Medically tuned AI models designed to provide expert clinical answers and triage assistance.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Answering complex medical licensing examination level questions and clinical protocol exploration.',
        learningUrl: 'https://sites.research.google/med-palm/',
        tags: ['Diagnostic AI', 'Medical QA', 'Clinical Protocol']
      }
    ],
    featuredCourses: [
      getCourse('google-responsible-ai'),
      getCourse('elements-of-ai'),
      getCourse('ibm-ai-fundamentals'),
      getCourse('google-intro-genai')
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Clinical AI Ethics, Privacy & Basics',
        duration: 'Week 1-2 (2 hrs/wk)',
        objective: 'Understand foundational AI vocabulary and critical guidelines for patient confidentiality (HIPAA/GDPR).',
        actionItems: [
          'Earn Google Cloud "Introduction to Responsible AI" digital badge',
          'Review institutional policies regarding de-identification of Protected Health Information (PHI)',
          'Learn the distinction between predictive diagnostic algorithms vs generative language models'
        ],
        recommendedCourseIds: ['google-responsible-ai'],
        milestone: 'Google Cloud Responsible AI Credential'
      },
      {
        phase: 2,
        title: 'Generative AI for Patient Communication',
        duration: 'Week 3-4 (3 hrs/wk)',
        objective: 'Translate dense clinical findings into clear, empathetic, 6th-grade-reading-level patient instructions.',
        actionItems: [
          'Complete Google Cloud "Introduction to Generative AI"',
          'Create a library of customized discharge instructions for common chronic conditions',
          'Practice prompt engineering to eliminate medical jargon while preserving clinical accuracy'
        ],
        recommendedCourseIds: ['google-intro-genai'],
        milestone: 'Google Cloud Generative AI Badge'
      },
      {
        phase: 3,
        title: 'Medical Research & Evidence Synthesis',
        duration: 'Week 5-6 (3-4 hrs/wk)',
        objective: 'Utilize specialized AI tools for literature reviews and systematic evidence extraction.',
        actionItems: [
          'Complete Elements of AI course by University of Helsinki',
          'Use Consensus and Elicit to conduct a rapid literature review on an emerging clinical therapy',
          'Identify and flag potential AI hallucination risks in clinical citations'
        ],
        recommendedCourseIds: ['elements-of-ai'],
        milestone: 'Elements of AI European Academic Certificate'
      },
      {
        phase: 4,
        title: 'Clinical AI Governance & Evaluation',
        duration: 'Week 7-8 (3 hrs/wk)',
        objective: 'Serve on departmental technology committees to evaluate commercial medical AI vendor solutions.',
        actionItems: [
          'Complete IBM SkillsBuild "Artificial Intelligence Fundamentals"',
          'Audit an ambient clinical scribe vendor for bias, accuracy, and workflow integration',
          'Establish a protocol for human-in-the-loop clinical note verification'
        ],
        recommendedCourseIds: ['ibm-ai-fundamentals'],
        milestone: 'IBM AI Credly Digital Badge & Clinical AI Leadership Plan'
      }
    ],
    promptTemplates: [
      {
        title: 'Plain-Language Patient Education Generator',
        scenario: 'Explaining a new diagnosis and medication to an anxious patient',
        prompt: 'Act as an empathetic clinical educator. Take the following medical diagnosis and care plan: [PASTE_CLINICAL_SUMMARY]. Rewrite this into a warm, reassuring patient handout written at a 6th-grade reading level. Break it into: 1) What this condition means in simple terms, 2) Why this medication helps, 3) 3 warning signs to contact our clinic immediately.',
        expectedOutcome: 'Clear, compassionate patient handout free of intimidating medical jargon.'
      },
      {
        title: 'Structured SOAP Note Clinical Formulation',
        scenario: 'Drafting structured clinical visit notes from raw encounter transcripts',
        prompt: 'Below is a de-identified clinician-patient conversation transcript: [PASTE_TRANSCRIPT]. Structure this into a standard SOAP note: Subjective (HPI, ROS), Objective (Physical Exam findings mentioned), Assessment (Primary & Differential Diagnoses), and Plan (Diagnostics, Therapeutics, Follow-up). Do not assume any unstated details.',
        expectedOutcome: 'Pristine, audit-ready SOAP clinical note draft.'
      }
    ]
  },
  {
    id: 'education_teaching',
    title: 'Educator, Teacher & Academic',
    category: 'Education & Training',
    iconName: 'GraduationCap',
    tagline: 'Personalize student learning, generate differentiated lesson plans, and foster AI literacy in classrooms.',
    overview: 'Teachers and professors are leveraging AI to automate grading rubrics, differentiate instruction for diverse learning needs, generate interactive lesson materials, and teach students ethical AI literacy.',
    impactOfAI: 'Reduces weekly administrative lesson-planning and grading time by 40%, freeing educators to focus on 1-on-1 mentorship, student engagement, and critical thinking development.',
    keySkillsNeeded: [
      'Differentiated Instruction & IEP Material Adaptation',
      'Rubric-Aligned Assessment & Feedback Generation',
      'Interactive Socratic Dialogue Prompting',
      'AI Detection Limitations & Academic Integrity Policies',
      'Classroom AI Literacy Curriculum Design'
    ],
    topTools: [
      {
        name: 'MagicSchool AI / Khanmigo',
        category: 'K-12 & Higher Ed Assistant',
        description: 'Purpose-built AI platforms for teachers featuring 60+ pedagogical tools for lesson planning, IEP drafting, and student tutoring.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Writing differentiated texts, creating reading comprehension quizzes, and generating rubrics.',
        learningUrl: 'https://www.magicschool.ai/',
        tags: ['Lesson Plans', 'IEP', 'Quizzes']
      },
      {
        name: 'NotebookLM by Google',
        category: 'Interactive Study Guide & Audio Overviews',
        description: 'Grounded AI notebook that synthesizes uploaded textbooks, lecture notes, and PDFs into citations, study guides, and audio podcast discussions.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Creating class study guides, syllabus companions, and interactive source-grounded research notes.',
        learningUrl: 'https://notebooklm.google.com/',
        tags: ['Study Guides', 'Source-Grounded', 'Audio Overview']
      },
      {
        name: 'Diffit for Teachers',
        category: 'Instructional Differentiation',
        description: 'Allows educators to take any article, video, or topic and instantly generate leveled reading materials with vocabulary and questions for any grade level.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Adapting grade 10 content down to grade 4 or grade 7 reading levels for ESL and special ed students.',
        learningUrl: 'https://web.diffit.me/',
        tags: ['Differentiation', 'Reading Levels', 'ESL']
      }
    ],
    featuredCourses: [
      getCourse('microsoft-career-essentials-genai'),
      getCourse('google-responsible-ai'),
      getCourse('ibm-ai-fundamentals'),
      getCourse('elements-of-ai')
    ],
    roadmap: [
      {
        phase: 1,
        title: 'AI Literacy & Classroom Integrity Policies',
        duration: 'Week 1-2 (3 hrs/wk)',
        objective: 'Establish a clear stance on AI in your classroom and understand what generative AI can and cannot do.',
        actionItems: [
          'Earn Microsoft Career Essentials in Generative AI Certificate',
          'Draft a transparent Classroom AI Syllabus Policy with acceptable use guidelines',
          'Learn why commercial "AI detectors" produce high false-positive rates for non-native English speakers'
        ],
        recommendedCourseIds: ['microsoft-career-essentials-genai'],
        milestone: 'Microsoft & LinkedIn Generative AI Certificate'
      },
      {
        phase: 2,
        title: 'Curriculum & Differentiated Lesson Design',
        duration: 'Week 3-4 (4 hrs/wk)',
        objective: 'Use AI to generate multi-tiered lesson plans, rubrics, and project-based learning prompts.',
        actionItems: [
          'Complete Google Cloud "Introduction to Responsible AI"',
          'Design a 5-day unit plan with differentiated materials for remedial, grade-level, and gifted students',
          'Build standard-aligned grading rubrics with descriptive performance level criteria'
        ],
        recommendedCourseIds: ['google-responsible-ai'],
        milestone: 'Google Cloud Responsible AI Credential'
      },
      {
        phase: 3,
        title: 'Socratic AI Tutors & Interactive Learning',
        duration: 'Week 5-6 (3 hrs/wk)',
        objective: 'Deploy AI as a conversational tutor that guides students to answers without giving the solution away.',
        actionItems: [
          'Complete IBM SkillsBuild "Artificial Intelligence Fundamentals"',
          'Create Socratic tutor prompts for your subject that ask thought-provoking follow-up questions',
          'Use Google NotebookLM to turn course syllabi into an interactive FAQ bot for students'
        ],
        recommendedCourseIds: ['ibm-ai-fundamentals'],
        milestone: 'IBM AI Credly Digital Badge'
      },
      {
        phase: 4,
        title: 'Accredited Pedagogy & Critical AI Thinking',
        duration: 'Week 7-10 (4 hrs/wk)',
        objective: 'Empower students to evaluate AI bias, misinformation, and ethical societal consequences.',
        actionItems: [
          'Complete Elements of AI university certification',
          'Launch a student debate project analyzing algorithmic bias and data privacy',
          'Share an AI-enhanced teaching portfolio with your department or school district'
        ],
        recommendedCourseIds: ['elements-of-ai'],
        milestone: 'University of Helsinki Accredited Certificate'
      }
    ],
    promptTemplates: [
      {
        title: 'Differentiated Lesson Plan with Bloom’s Taxonomy',
        scenario: 'Creating inclusive lesson activities for varied reading levels',
        prompt: 'Act as an expert instructional designer. Create a 60-minute lesson plan for [GRADE_LEVEL] students on the topic of [TOPIC]. Include: 1) Engaging hook activity (5 mins), 2) Direct instruction concept explanation, 3) Three leveled activities (Tier 1: Scaffolding for emerging readers, Tier 2: On-grade level, Tier 3: High-order thinking challenge), 4) A quick 3-question exit ticket.',
        expectedOutcome: 'Comprehensive, structured lesson plan with differentiated student tasks.'
      },
      {
        title: 'Socratic Student Tutor Prompt',
        scenario: 'Guiding students to learn concepts through inquiry rather than answers',
        prompt: 'You are an encouraging Socratic tutor for high school students learning [TOPIC]. When a student asks a question or gets stuck on a problem, NEVER give them the direct answer. Instead, ask a single guided question that helps them reflect on the underlying concept and take the next step. Keep responses under 3 sentences.',
        expectedOutcome: 'Interactive prompt setup for conversational tutoring.'
      }
    ]
  },
  {
    id: 'marketing_content',
    title: 'Marketing & Content Creator',
    category: 'Marketing, Media & Growth',
    iconName: 'Megaphone',
    tagline: 'Scale omnichannel campaigns, conduct audience research, and craft high-converting copy with AI.',
    overview: 'Marketers, growth managers, and copywriters utilize generative AI to brainstorm campaign angles, optimize SEO content clusters, localize messaging across 30+ languages, and test ad variations rapidly.',
    impactOfAI: 'Expedites content drafting and creative experimentation by 5x, while elevating human strategy, brand voice governance, and data-driven conversion rate optimization.',
    keySkillsNeeded: [
      'Brand Voice Calibration & Few-Shot Prompting',
      'SEO Content Architecture & Keyword Intent Mapping',
      'Multi-Variant Ad Copy & Landing Page A/B Testing',
      'Visual Asset Generation with Image Diffusion Models',
      'Campaign Performance Analysis & Customer Persona Synthesis'
    ],
    topTools: [
      {
        name: 'Jasper AI / Copy.ai',
        category: 'Enterprise Content & Brand Voice',
        description: 'Marketing-specific generative platforms trained on high-converting sales frameworks (AIDA, PAS) with custom brand voice styling.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Drafting multi-channel campaigns, social media posts, email sequences, and blog posts.',
        learningUrl: 'https://www.jasper.ai/',
        tags: ['Copywriting', 'Brand Voice', 'Campaigns']
      },
      {
        name: 'Midjourney / Ideogram',
        category: 'Commercial Visual Generation',
        description: 'State-of-the-art text-to-image generators capable of photorealistic product mockups, typography, and marketing illustrations.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Creating mood boards, social media banners, blog headers, and concept art.',
        learningUrl: 'https://ideogram.ai/',
        tags: ['Visuals', 'Art', 'Creative Direction']
      },
      {
        name: 'Surfer SEO / Clearscope',
        category: 'Search Engine Optimization',
        description: 'Analyzes top-ranking search results to guide semantic NLP keywords, heading structures, and article depth.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Optimizing organic articles, auditing competitor content, and ranking in Google search.',
        learningUrl: 'https://surferseo.com/',
        tags: ['SEO', 'Content Strategy', 'Traffic']
      }
    ],
    featuredCourses: [
      getCourse('microsoft-career-essentials-genai'),
      getCourse('deeplearning-ai-prompt-eng'),
      getCourse('google-intro-genai'),
      getCourse('ibm-ai-fundamentals')
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Generative AI Principles & Productivity',
        duration: 'Week 1-2 (3 hrs/wk)',
        objective: 'Master workplace AI adoption, generative search, and productivity acceleration.',
        actionItems: [
          'Earn Microsoft Career Essentials in Generative AI Certificate',
          'Build a personal AI swipe file for headlines, hooks, and email subject lines',
          'Learn to feed brand tone guidelines into prompts for consistent voice'
        ],
        recommendedCourseIds: ['microsoft-career-essentials-genai'],
        milestone: 'Microsoft & LinkedIn Generative AI Credential'
      },
      {
        phase: 2,
        title: 'Advanced Prompt Engineering for Copywriters',
        duration: 'Week 3-4 (4 hrs/wk)',
        objective: 'Master structured prompting techniques to avoid generic AI cliches and bland prose.',
        actionItems: [
          'Complete DeepLearning.AI "ChatGPT Prompt Engineering for Developers"',
          'Practice few-shot prompting using your best-performing past copy as reference examples',
          'Create automated prompt workflows for transforming one podcast or webinar transcript into 5 social posts'
        ],
        recommendedCourseIds: ['deeplearning-ai-prompt-eng'],
        milestone: 'DeepLearning.AI Certificate in Prompt Engineering'
      },
      {
        phase: 3,
        title: 'Visual Content & Multi-Modal Campaigns',
        duration: 'Week 5-6 (4 hrs/wk)',
        objective: 'Incorporate image generation, aspect ratios, and visual styling into social campaigns.',
        actionItems: [
          'Complete Google Cloud "Introduction to Generative AI"',
          'Experiment with Ideogram / Midjourney to produce branded social graphics with clean typography',
          'Draft an omnichannel launch plan (Email, LinkedIn, Twitter, Landing Page) in under 2 hours'
        ],
        recommendedCourseIds: ['google-intro-genai'],
        milestone: 'Google Cloud Generative AI Badge'
      },
      {
        phase: 4,
        title: 'Brand Safety, Ethics & AI Governance',
        duration: 'Week 7-8 (3 hrs/wk)',
        objective: 'Safeguard intellectual property, check copyright guidelines, and oversee AI marketing policies.',
        actionItems: [
          'Complete IBM SkillsBuild "Artificial Intelligence Fundamentals"',
          'Establish brand guidelines for disclosure of AI-generated creative assets',
          'Measure campaign conversion metrics comparing human-only vs AI-assisted creative variations'
        ],
        recommendedCourseIds: ['ibm-ai-fundamentals'],
        milestone: 'IBM AI Credly Digital Badge & Omnichannel Campaign Portfolio'
      }
    ],
    promptTemplates: [
      {
        title: 'Multi-Angle High-Converting Ad Copy Variations',
        scenario: 'Writing A/B testing ad variations for Meta or Google Ads',
        prompt: 'Act as a Senior Direct-Response Copywriter. Our product is: [PRODUCT_DESCRIPTION]. Target audience is: [AUDIENCE]. Write 4 distinct ad copy variations based on these frameworks: 1) PAS (Problem-Agitate-Solution), 2) AIDA (Attention-Interest-Desire-Action), 3) Social Proof / Case Study angle, 4) Contrarian curiosity hook. For each, provide a punchy headline (<40 chars), primary text (<125 words), and clear CTA.',
        expectedOutcome: 'Four ready-to-test ad copy variations with distinct psychological angles.'
      },
      {
        title: 'Deep-Dive Customer Persona & Objection Matrix',
        scenario: 'Conducting market research and preparing sales collateral',
        prompt: 'Analyze our target market: [INDUSTRY / CUSTOMER_TYPE]. Generate a detailed Customer Persona Matrix: 1) Top 3 daily frustrations/pains, 2) The exact internal words they use to describe their problem, 3) Top 4 objections to purchasing our solution and the exact counter-argument to overcome each, 4) Desired transformation state.',
        expectedOutcome: 'Comprehensive empathy map and objection-handling blueprint.'
      }
    ]
  },
  {
    id: 'finance_accounting',
    title: 'Finance, Accounting & Auditing Professional',
    category: 'Finance & Accounting',
    iconName: 'DollarSign',
    tagline: 'Automate financial modeling, conduct variance analysis, and streamline audit compliance with AI.',
    overview: 'CFOs, financial analysts, accountants, and auditors use AI to detect balance sheet anomalies, automate invoice reconciliation, draft variance commentary, and stress-test forecasting models.',
    impactOfAI: 'Cuts month-end close and reconciliation cycles by 30-50%, while dramatically improving financial risk modeling, fraud detection, and regulatory compliance scrutiny.',
    keySkillsNeeded: [
      'Financial Statement & 10-K Parsing with LLMs',
      'Automated Variance & Budget vs Actual Commentary',
      'Fraud Detection & Forensic Transaction Anomaly Scoring',
      'Advanced Excel/Python Financial Modeling Copilots',
      'SOX Compliance, SEC Regulations & Ethical Data Handling'
    ],
    topTools: [
      {
        name: 'Microsoft Copilot in Excel',
        category: 'Spreadsheet Intelligence',
        description: 'Analyzes financial tables, suggests complex nested formulas, creates scenario modeling, and writes conditional formatting rules.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Forecasting cash flows, debugging circular references, and pivoting multi-entity ledgers.',
        learningUrl: 'https://support.microsoft.com/en-us/office/get-started-with-copilot-in-excel-2287c95e-149b-449e-b9e7-f0c391785fa5',
        tags: ['Excel', 'Financial Modeling', 'Formulas']
      },
      {
        name: 'Dili / FinChat.io',
        category: 'Equity Research & Filing Analysis',
        description: 'AI platform that scans public SEC 10-K and 10-Q filings, investor transcripts, and financial ratios with verified source citations.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Benchmarking competitor EBITDA margins, pulling historical metrics, and auditing disclosures.',
        learningUrl: 'https://finchat.io/',
        tags: ['SEC Filings', '10-K', 'Equity Research']
      },
      {
        name: 'Vic.ai',
        category: 'Autonomous Accounts Payable',
        description: 'Machine learning platform that autonomously ingests, codes, matches, and approves invoices with 99% accuracy.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Automating invoice reconciliation, general ledger coding, and duplicate payment detection.',
        learningUrl: 'https://www.vic.ai/',
        tags: ['Reconciliation', 'Invoices', 'Audit']
      }
    ],
    featuredCourses: [
      getCourse('aws-genai-decision-makers'),
      getCourse('google-responsible-ai'),
      getCourse('microsoft-career-essentials-genai'),
      getCourse('kaggle-intro-ml')
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Executive AI Strategy & Decision-Making',
        duration: 'Week 1-2 (3-4 hrs/wk)',
        objective: 'Understand AI ROI, risk matrices, and cloud AI architecture for financial planning.',
        actionItems: [
          'Earn AWS "Generative AI Learning Plan for Decision Makers" digital badge',
          'Learn to calculate Total Cost of Ownership (TCO) for enterprise AI financial tools',
          'Examine regulatory guidance from SEC and AICPA on algorithmic financial reporting'
        ],
        recommendedCourseIds: ['aws-genai-decision-makers'],
        milestone: 'AWS Digital Badge in Generative AI for Decision Makers'
      },
      {
        phase: 2,
        title: 'Workplace Productivity & Spreadsheets',
        duration: 'Week 3-4 (3 hrs/wk)',
        objective: 'Integrate generative copilots into Excel, financial memos, and board presentations.',
        actionItems: [
          'Complete Microsoft Career Essentials in Generative AI',
          'Automate monthly variance analysis commentary comparing actual vs budgeted departmental spend',
          'Practice prompt templates for summarizing 80-page 10-K filings into 1-page risk factor briefs'
        ],
        recommendedCourseIds: ['microsoft-career-essentials-genai'],
        milestone: 'Microsoft & LinkedIn Generative AI Credential'
      },
      {
        phase: 3,
        title: 'AI Governance, Ethics & Audit Defensibility',
        duration: 'Week 5-6 (3 hrs/wk)',
        objective: 'Ensure strict confidentiality, prevent data leaks, and establish audit trails for AI-assisted calculations.',
        actionItems: [
          'Complete Google Cloud "Introduction to Responsible AI"',
          'Establish strict company policies against uploading non-public financial material into consumer LLMs',
          'Build an internal audit checklist for evaluating AI-generated financial summaries'
        ],
        recommendedCourseIds: ['google-responsible-ai'],
        milestone: 'Google Cloud Responsible AI Credential'
      },
      {
        phase: 4,
        title: 'Predictive Financial Modeling & ML',
        duration: 'Week 7-9 (4-5 hrs/wk)',
        objective: 'Learn machine learning basics to understand quantitative forecasting and credit scoring.',
        actionItems: [
          'Complete Kaggle "Intro to Machine Learning" micro-course',
          'Build a predictive revenue forecasting model using historical quarterly sales trends',
          'Present an AI modernization roadmap for your accounting or finance department'
        ],
        recommendedCourseIds: ['kaggle-intro-ml'],
        milestone: 'Kaggle Machine Learning Certificate'
      }
    ],
    promptTemplates: [
      {
        title: 'Monthly Budget vs Actual Variance Commentary',
        scenario: 'Drafting executive commentary for departmental spending discrepancies',
        prompt: 'Act as a Senior Financial Planning & Analysis (FP&A) Manager. Review this monthly budget vs actual table: [PASTE_TABLE]. Identify the top 3 variances exceeding 5% or $10,000 threshold. Write concise, objective commentary for the CFO explaining: 1) What drove the variance, 2) Whether it is a timing difference or permanent discrepancy, 3) Recommended corrective action.',
        expectedOutcome: 'Clear, boardroom-ready variance commentary.'
      },
      {
        title: 'SEC 10-K Risk Factor Synthesis & Competitor Comparison',
        scenario: 'Extracting key strategic risks from annual reports',
        prompt: 'Here is the Item 1A (Risk Factors) section from Company A\'s recent 10-K filing: [PASTE_TEXT]. Categorize and summarize the top 5 operational, regulatory, and macroeconomic risks. Highlight any newly disclosed risks that were not present in previous years.',
        expectedOutcome: 'Structured risk register matrix with severity rankings.'
      }
    ]
  },
  {
    id: 'design_creative',
    title: 'Graphic Designer, UI/UX & Creative',
    category: 'Design & Creative Arts',
    iconName: 'Palette',
    tagline: 'Accelerate visual ideation, generate interactive prototypes, and master AI-powered creative workflows.',
    overview: 'Designers, art directors, and UX researchers are using generative AI to generate instant moodboards, produce custom vector graphics, synthesize user interview transcripts, and turn wireframes into interactive prototypes.',
    impactOfAI: 'Shortens early discovery and exploratory ideation from days to hours, giving designers more leverage to focus on holistic user journeys, micro-interactions, and high-fidelity craftsmanship.',
    keySkillsNeeded: [
      'Visual Prompt Engineering (Lighting, Composition, Medium)',
      'Generative UI Prototyping (Text-to-Component workflows)',
      'UX Research & Qualitative Interview Synthesis with LLMs',
      'AI Image Editing: Inpainting, Outpainting & Vectorization',
      'Copyright, Originality & Ethical Creative Attribution'
    ],
    topTools: [
      {
        name: 'Figma AI / Relume',
        category: 'UX/UI Wireframing & Prototyping',
        description: 'AI features built into Figma and Relume that generate full website sitemaps, responsive component layouts, and placeholder copy.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Instant sitemapping, wireframe generation, and auto-layout assistance.',
        learningUrl: 'https://www.figma.com/ai/',
        tags: ['UI/UX', 'Figma', 'Wireframes']
      },
      {
        name: 'Midjourney / Recraft.ai',
        category: 'Vector & Raster Visual Synthesis',
        description: 'Recraft specializes in generating clean SVG vector art, brand iconography, and 3D illustrations that match brand design systems.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Creating custom icon sets, brand illustrations, and product presentation backdrops.',
        learningUrl: 'https://www.recraft.ai/',
        tags: ['Vector', 'Icons', 'Illustration']
      },
      {
        name: 'Runway / Kling AI',
        category: 'Generative Video & Motion Graphics',
        description: 'Next-generation video synthesis tools for camera movements, text-to-video, and animating static UI screens for product teasers.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Creating micro-motion concepts, marketing sizzle reels, and social video ads.',
        learningUrl: 'https://runwayml.com/',
        tags: ['Motion', 'Video', 'Animation']
      }
    ],
    featuredCourses: [
      getCourse('google-intro-genai'),
      getCourse('microsoft-career-essentials-genai'),
      getCourse('deeplearning-ai-prompt-eng'),
      getCourse('google-responsible-ai')
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Generative Visual Models & Fundamentals',
        duration: 'Week 1-2 (3 hrs/wk)',
        objective: 'Understand diffusion models, latents, prompts, and aspect ratio controls.',
        actionItems: [
          'Earn Google Cloud "Introduction to Generative AI" completion badge',
          'Explore Recraft and Midjourney for generating brand-consistent icon sets and SVG graphics',
          'Learn the terminology of generative visual styling: aspect ratios, camera focal lengths, and lighting shaders'
        ],
        recommendedCourseIds: ['google-intro-genai'],
        milestone: 'Google Cloud Generative AI Badge'
      },
      {
        phase: 2,
        title: 'Prompt Engineering for Creative Direction',
        duration: 'Week 3-4 (4 hrs/wk)',
        objective: 'Learn structured prompting to control composition, color palettes, and emotional tone.',
        actionItems: [
          'Complete DeepLearning.AI "ChatGPT Prompt Engineering for Developers"',
          'Create a repeatable prompt formula for translating brand style guides into visual prompts',
          'Master inpainting (erasing and replacing parts of an image) and outpainting (canvas expansion)'
        ],
        recommendedCourseIds: ['deeplearning-ai-prompt-eng'],
        milestone: 'DeepLearning.AI Prompt Engineering Certificate'
      },
      {
        phase: 3,
        title: 'AI in UI/UX Research & Wireframing',
        duration: 'Week 5-6 (4 hrs/wk)',
        objective: 'Use AI to synthesize user test recordings, cluster affinity diagrams, and wireframe pages.',
        actionItems: [
          'Earn Microsoft Career Essentials in Generative AI Certificate',
          'Use Figma AI / Relume to build a responsive multi-page marketing website wireframe in 30 minutes',
          'Synthesize 5 user interview transcripts into key usability friction points and persona cards'
        ],
        recommendedCourseIds: ['microsoft-career-essentials-genai'],
        milestone: 'Microsoft & LinkedIn Generative AI Credential'
      },
      {
        phase: 4,
        title: 'Creative Ethics, IP Rights & Style Governance',
        duration: 'Week 7-8 (3 hrs/wk)',
        objective: 'Navigate copyright questions, commercial asset safety, and human-crafted visual integrity.',
        actionItems: [
          'Complete Google Cloud "Introduction to Responsible AI"',
          'Draft a creative studio policy on commercial licensing and disclosure of AI-generated assets',
          'Publish a comprehensive case study documenting an AI-assisted end-to-end design system'
        ],
        recommendedCourseIds: ['google-responsible-ai'],
        milestone: 'Google Cloud Responsible AI Credential & Design Portfolio'
      }
    ],
    promptTemplates: [
      {
        title: 'UX User Interview Insights & Affinity Mapping',
        scenario: 'Synthesizing qualitative user test notes into actionable UX improvements',
        prompt: 'Act as a Senior UX Research Lead. Below are notes from 4 user usability testing sessions on our checkout flow: [PASTE_NOTES]. Perform qualitative affinity clustering: 1) Identify top 3 primary usability hurdles, 2) Extract exact customer quotes illustrating each hurdle, 3) Provide 3 prioritized UX recommendation experiments ranked by effort vs impact.',
        expectedOutcome: 'Actionable UX research synthesis with direct user evidence.'
      },
      {
        title: 'Photorealistic Product Lifestyle Photography Prompt',
        scenario: 'Generating Midjourney / Ideogram prompt recipes for commercial creative campaigns',
        prompt: 'Act as an Art Director. We need a commercial lifestyle photograph for [PRODUCT]. Write a detailed prompt recipe including: 1) Subject placement and interaction, 2) Environment and background textures, 3) Lighting scheme (e.g. golden hour rim light, soft diffuse studio box), 4) Lens & camera specification (e.g. 85mm f/1.4 shallow depth of field), 5) Aspect ratio flag.',
        expectedOutcome: 'High-precision visual prompt recipe ready for image generation.'
      }
    ]
  },
  {
    id: 'legal_compliance',
    title: 'Legal, Paralegal & Compliance Officer',
    category: 'Legal & Risk Management',
    iconName: 'Scale',
    tagline: 'Accelerate contract redlining, synthesize case law precedents, and lead AI regulatory compliance.',
    overview: 'Attorneys, legal counsels, and compliance teams use AI to review contracts in minutes, identify non-standard indemnity clauses, synthesize multi-jurisdictional regulations (like the EU AI Act), and draft initial litigation briefs.',
    impactOfAI: 'Reduces routine document discovery and contract review time by up to 60%, allowing legal teams to focus on bespoke strategic negotiation, trial advocacy, and risk mitigation.',
    keySkillsNeeded: [
      'Automated Contract Redlining & Clause Extraction',
      'Legal Precedent & Statutory Research with Citations',
      'Regulatory Compliance Tracking (EU AI Act, NIST AI RMF, GDPR)',
      'Attorney-Client Privilege & Enterprise Data Confidentiality',
      'Hallucination Verification & Citation Grounding'
    ],
    topTools: [
      {
        name: 'Harvey AI / CoCounsel (Casetext)',
        category: 'Legal Foundation Intelligence',
        description: 'Specialized legal AI engines trained on state and federal case law, statutes, and precedent briefs that verify every proposition with pinpoint citations.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Drafting deposition outlines, legal research memos, and contract clause variance analysis.',
        learningUrl: 'https://casetext.com/cocounsel/',
        tags: ['Legal Research', 'Citations', 'Memos']
      },
      {
        name: 'Robin AI / Spellbook',
        category: 'Contract Drafting & Review',
        description: 'AI contract assistant integrated into Microsoft Word that reviews agreements against standard playbooks and suggests redlines.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Spotting missing mutual indemnities, non-competes, and termination clause discrepancies.',
        learningUrl: 'https://www.spellbook.legal/',
        tags: ['Contracts', 'Word Add-In', 'Redlining']
      },
      {
        name: 'NIST AI Risk Management Framework',
        category: 'Regulatory Standards',
        description: 'Official national standard for measuring, governing, and managing risks associated with artificial intelligence implementations.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Auditing corporate AI implementations against federal risk standards.',
        learningUrl: 'https://www.nist.gov/itl/ai-risk-management-framework',
        tags: ['Compliance', 'NIST', 'Risk Governance']
      }
    ],
    featuredCourses: [
      getCourse('google-responsible-ai'),
      getCourse('elements-of-ai'),
      getCourse('microsoft-career-essentials-genai'),
      getCourse('ibm-ai-fundamentals')
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Responsible AI, Ethics & Data Privacy',
        duration: 'Week 1-2 (3 hrs/wk)',
        objective: 'Master AI fairness, transparency, and data privacy compliance foundations.',
        actionItems: [
          'Earn Google Cloud "Introduction to Responsible AI" digital badge',
          'Review confidentiality risks of public LLM usage under ABA Formal Opinion 512 (Generative AI Tools)',
          'Establish guidelines for zero-retention enterprise LLM agreements'
        ],
        recommendedCourseIds: ['google-responsible-ai'],
        milestone: 'Google Cloud Responsible AI Credential'
      },
      {
        phase: 2,
        title: 'Workplace AI & Contract Review Workflows',
        duration: 'Week 3-4 (3 hrs/wk)',
        objective: 'Use AI to streamline NDAs, MSAs, and contract redline checks against fallback playbooks.',
        actionItems: [
          'Complete Microsoft Career Essentials in Generative AI',
          'Create a contract review prompt that flags non-standard liability caps and data ownership clauses',
          'Learn prompt patterns for generating first-draft client advisory memos'
        ],
        recommendedCourseIds: ['microsoft-career-essentials-genai'],
        milestone: 'Microsoft & LinkedIn Generative AI Credential'
      },
      {
        phase: 3,
        title: 'Regulatory Frameworks & The EU AI Act',
        duration: 'Week 5-6 (4 hrs/wk)',
        objective: 'Deep-dive into global AI regulations: risk classifications, conformity assessments, and audits.',
        actionItems: [
          'Complete Elements of AI university certification',
          'Map your company’s software tools against the EU AI Act risk tiers (Minimal, High, Prohibited)',
          'Draft an internal corporate AI Acceptable Use Policy (AUP)'
        ],
        recommendedCourseIds: ['elements-of-ai'],
        milestone: 'University of Helsinki Accredited Certificate'
      },
      {
        phase: 4,
        title: 'Technical AI Competency for Legal Counsel',
        duration: 'Week 7-9 (4 hrs/wk)',
        objective: 'Understand the underlying technical mechanics of machine learning to counsel technology clients.',
        actionItems: [
          'Complete IBM SkillsBuild "Artificial Intelligence Fundamentals"',
          'Audit how RAG pipelines and vector embeddings maintain data isolation in legal discovery',
          'Present a corporate compliance seminar on AI copyright, training data rights, and liability'
        ],
        recommendedCourseIds: ['ibm-ai-fundamentals'],
        milestone: 'IBM AI Credly Digital Badge & Corporate AI Policy Manual'
      }
    ],
    promptTemplates: [
      {
        title: 'Contract Clause Variance & Risk Flagging',
        scenario: 'Reviewing a vendor Master Services Agreement (MSA) against preferred playbook',
        prompt: 'Act as a Senior Commercial Transactions Attorney. Review this vendor clause: [PASTE_CLAUSE]. Compare it against our standard policy: "Mutual indemnification strictly capped at 1x annual contract fees, excluding gross negligence and willful misconduct; venue in New York". 1) Identify deviations from our standard, 2) Detail the legal and business risk of this language, 3) Propose balanced redline compromise language.',
        expectedOutcome: 'Surgical legal analysis with copy-ready redline text.'
      },
      {
        title: 'Regulatory Compliance Gap Analysis (EU AI Act / NIST)',
        scenario: 'Assessing if an enterprise software feature triggers high-risk regulatory obligations',
        prompt: 'Our company is launching an AI feature with these capabilities: [DESCRIBE_FEATURE]. Under the EU AI Act classification framework: 1) What risk category does this likely fall under (Prohibited, High-Risk, Transparency/General Purpose, Minimal Risk)? 2) What mandatory documentation, logging, or human oversight obligations are triggered? 3) Outline next compliance steps.',
        expectedOutcome: 'Structured regulatory compliance assessment brief.'
      }
    ]
  },
  {
    id: 'product_project_management',
    title: 'Product & Project Manager (PM / Scrum Master)',
    category: 'Management & Strategy',
    iconName: 'Kanban',
    tagline: 'Draft PRDs 5x faster, synthesize user feedback, write user stories, and lead AI-driven product strategy.',
    overview: 'Product and project managers use AI to transform messy customer interview transcripts into prioritized feature backlogs, draft comprehensive Product Requirement Documents (PRDs), and break down epics into acceptance criteria.',
    impactOfAI: 'Automates 40% of routine sprint documentation and status reporting, allowing PMs to spend more time validating product hypotheses, talking to customers, and setting strategic direction.',
    keySkillsNeeded: [
      'AI-Assisted PRD & User Story Drafting (Gherkin/Given-When-Then)',
      'Customer Feedback & App Review Clustering with NLP',
      'AI Product Strategy & Technical Feasibility Assessment',
      'Sprint Retrospective & Status Synthesis Automation',
      'Measuring AI Feature Metrics (Accuracy, Latency, User Adoption)'
    ],
    topTools: [
      {
        name: 'ChatPRD / Craft.io',
        category: 'Product Documentation & PRDs',
        description: 'AI coach for PMs that turns brief ideas into detailed, edge-case-tested Product Requirement Documents.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Writing PRDs, brainstorming edge cases, and drafting user personas.',
        learningUrl: 'https://www.chatprd.ai/',
        tags: ['PRDs', 'Product Specs', 'Strategy']
      },
      {
        name: 'Collato / Atlassian Intelligence (Jira)',
        category: 'Project & Knowledge Management',
        description: 'Synthesizes tickets across Jira, Confluence, and Slack to answer project status questions and generate release notes.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Drafting sprint release notes, generating Jira tickets from specs, and dependency mapping.',
        learningUrl: 'https://www.atlassian.com/software/artificial-intelligence',
        tags: ['Jira', 'Agile', 'Release Notes']
      },
      {
        name: 'Productboard AI',
        category: 'Customer Voice & Feedback',
        description: 'Consolidates customer tickets from Zendesk, Gong calls, and Intercom to auto-identify feature requests and sentiment trends.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Aggregating voice-of-customer insights into roadmap prioritization scoring.',
        learningUrl: 'https://www.productboard.com/',
        tags: ['Customer Feedback', 'Roadmaps', 'Prioritization']
      }
    ],
    featuredCourses: [
      getCourse('aws-genai-decision-makers'),
      getCourse('google-intro-genai'),
      getCourse('microsoft-career-essentials-genai'),
      getCourse('ibm-ai-fundamentals')
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Executive AI Strategy & Product Decisions',
        duration: 'Week 1-2 (3-4 hrs/wk)',
        objective: 'Learn how to evaluate AI use cases, vendor vs build decisions, and business impact.',
        actionItems: [
          'Earn AWS "Generative AI Learning Plan for Decision Makers" digital badge',
          'Learn the AI Value-Feasibility Matrix for prioritizing AI roadmap initiatives',
          'Understand key AI performance metrics: latency, token economics, and precision vs recall'
        ],
        recommendedCourseIds: ['aws-genai-decision-makers'],
        milestone: 'AWS Digital Badge for Decision Makers'
      },
      {
        phase: 2,
        title: 'AI-Powered Agile Documentation & PRDs',
        duration: 'Week 3-4 (3 hrs/wk)',
        objective: 'Use AI to generate comprehensive PRDs, user stories with acceptance criteria, and edge cases.',
        actionItems: [
          'Complete Microsoft Career Essentials in Generative AI',
          'Draft a complete PRD for an AI feature with technical assumptions, UI flows, and failure modes',
          'Convert high-level feature requirements into 10 detailed Jira user stories with Given-When-Then criteria'
        ],
        recommendedCourseIds: ['microsoft-career-essentials-genai'],
        milestone: 'Microsoft & LinkedIn Generative AI Credential'
      },
      {
        phase: 3,
        title: 'Technical LLM Mechanics for Product Leaders',
        duration: 'Week 5-6 (4 hrs/wk)',
        objective: 'Learn how LLMs, fine-tuning, RAG, and embeddings actually work to communicate with engineering.',
        actionItems: [
          'Complete Google Cloud "Introduction to Generative AI"',
          'Understand the trade-offs between prompting, RAG, and fine-tuning',
          'Design product error-handling patterns for AI model hallucination and downtime'
        ],
        recommendedCourseIds: ['google-intro-genai'],
        milestone: 'Google Cloud Generative AI Badge'
      },
      {
        phase: 4,
        title: 'Enterprise AI Governance & Ethics',
        duration: 'Week 7-8 (3 hrs/wk)',
        objective: 'Ensure product safety, guardrails, and compliance with data privacy regulations.',
        actionItems: [
          'Complete IBM SkillsBuild "Artificial Intelligence Fundamentals"',
          'Establish AI product safety guardrails, user feedback buttons (thumbs up/down), and audit logging',
          'Lead a cross-functional AI roadmap presentation with engineering, design, and legal'
        ],
        recommendedCourseIds: ['ibm-ai-fundamentals'],
        milestone: 'IBM AI Credly Digital Badge & Complete AI Product Spec'
      }
    ],
    promptTemplates: [
      {
        title: 'Comprehensive PRD with Edge Cases',
        scenario: 'Drafting an end-to-end Product Requirement Document from a high-level feature idea',
        prompt: 'Act as a Principal Product Manager at a fast-growing tech company. I want to build a feature: [FEATURE_IDEA] for our product: [PRODUCT_TYPE]. Write a comprehensive PRD including: 1) Executive Summary & Problem Statement, 2) Target User Persona, 3) 5 Primary Functional Requirements, 4) 4 Non-Functional Requirements (Latency, Security, Scale), 5) Edge cases & failure states (e.g. timeout, invalid data, empty state), 6) Success metrics / KPIs.',
        expectedOutcome: 'Audit-ready, engineering-ready Product Requirements Document.'
      },
      {
        title: 'Jira User Story & Gherkin Acceptance Criteria',
        scenario: 'Breaking an epic down into developer-ready sprint stories',
        prompt: 'Take this feature requirement: [REQUIREMENT]. Generate 3 granular user stories following standard Agile format: "As a [User Role], I want [Action], So that [Benefit]". For each story, provide at least 3 detailed acceptance criteria written in Gherkin syntax (Scenario, Given, When, Then).',
        expectedOutcome: 'Clear Agile tickets ready for sprint grooming.'
      }
    ]
  },
  {
    id: 'hr_recruiting',
    title: 'HR & Talent Acquisition Specialist',
    category: 'Human Resources & People Ops',
    iconName: 'Users',
    tagline: 'Modernize job descriptions, streamline candidate outreach, and foster equitable workplace AI adoption.',
    overview: 'HR leaders and recruiters use AI to eliminate bias in job postings, craft personalized candidate outreach sequences, build onboarding knowledge bases, and design corporate AI training initiatives.',
    impactOfAI: 'Decreases time-to-hire by 35% and streamlines internal employee FAQ support by 50%, while elevating human empathy, candidate interview depth, and employee culture.',
    keySkillsNeeded: [
      'Inclusive Job Description Optimization (De-biasing)',
      'Candidate Sourcing & Personalized Outreach Sequences',
      'Employee Onboarding Knowledge Base & Chatbot Creation',
      'AI Ethics, Equal Employment Opportunity (EEO) & Anti-Bias Auditing',
      'Corporate AI Upskilling & Workforce Transformation'
    ],
    topTools: [
      {
        name: 'Metaview / BrightHire',
        category: 'Interview Intelligence',
        description: 'AI note-taker designed specifically for recruiting that listens to candidate interviews and drafts structured interview debrief notes mapped to competencies.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Conducting interviews without distraction and generating unbiased hiring rubric notes.',
        learningUrl: 'https://www.metaview.ai/',
        tags: ['Recruiting', 'Interviews', 'Hiring']
      },
      {
        name: 'Textio',
        category: 'Inclusive Language Guidance',
        description: 'Analyzes talent communications to remove gendered words, corporate jargon, and exclusionary phrasing.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Writing inclusive job postings and fair performance feedback reviews.',
        learningUrl: 'https://textio.com/',
        tags: ['DEI', 'Job Postings', 'Inclusion']
      },
      {
        name: 'Glean / Notion Q&A',
        category: 'Enterprise People Knowledge',
        description: 'Workplace search and AI assistant that answers employee questions on benefits, PTO policies, and handbook guides.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Automating internal HR tickets and streamlining new hire onboarding.',
        learningUrl: 'https://www.glean.com/',
        tags: ['Onboarding', 'HR Policy', 'Knowledge']
      }
    ],
    featuredCourses: [
      getCourse('google-responsible-ai'),
      getCourse('microsoft-career-essentials-genai'),
      getCourse('ibm-ai-fundamentals'),
      getCourse('elements-of-ai')
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Responsible AI & Algorithmic Bias in Hiring',
        duration: 'Week 1-2 (3 hrs/wk)',
        objective: 'Learn how to detect and eliminate algorithmic bias in screening and recruitment.',
        actionItems: [
          'Earn Google Cloud "Introduction to Responsible AI" digital badge',
          'Understand EEOC guidelines on algorithmic bias in hiring (Civil Rights Act compliance)',
          'Audit standard job descriptions for masculine-coded words and exclusionary jargon'
        ],
        recommendedCourseIds: ['google-responsible-ai'],
        milestone: 'Google Cloud Responsible AI Credential'
      },
      {
        phase: 2,
        title: 'Workplace Generative AI & Sourcing Workflows',
        duration: 'Week 3-4 (3 hrs/wk)',
        objective: 'Incorporate AI into candidate communications, boolean search strings, and interview prep.',
        actionItems: [
          'Earn Microsoft Career Essentials in Generative AI Certificate',
          'Generate high-converting, personalized candidate outreach sequences on LinkedIn',
          'Build structured competency-based interview question guides with behavioral rubrics'
        ],
        recommendedCourseIds: ['microsoft-career-essentials-genai'],
        milestone: 'Microsoft & LinkedIn Generative AI Credential'
      },
      {
        phase: 3,
        title: 'AI Fundamentals & Employee Upskilling',
        duration: 'Week 5-6 (4 hrs/wk)',
        objective: 'Understand AI capabilities to design company-wide AI literacy and reskilling programs.',
        actionItems: [
          'Complete IBM SkillsBuild "Artificial Intelligence Fundamentals"',
          'Design an internal Employee AI Training Workshop curriculum for non-technical staff',
          'Create an AI-powered onboarding FAQ companion for new team members'
        ],
        recommendedCourseIds: ['ibm-ai-fundamentals'],
        milestone: 'IBM AI Credly Digital Badge'
      },
      {
        phase: 4,
        title: 'Future of Work Strategy & Workforce Planning',
        duration: 'Week 7-8 (3 hrs/wk)',
        objective: 'Lead organizational change management and ethical human-AI collaboration policies.',
        actionItems: [
          'Complete Elements of AI university certification',
          'Draft an enterprise Employee AI Usage Policy covering confidentiality and intellectual property',
          'Conduct a workforce impact assessment evaluating which job roles need upskilling'
        ],
        recommendedCourseIds: ['elements-of-ai'],
        milestone: 'University of Helsinki Accredited Certificate'
      }
    ],
    promptTemplates: [
      {
        title: 'Inclusive, Bias-Free Job Description Optimizer',
        scenario: 'Modernizing a job description to attract diverse top talent',
        prompt: 'Act as a Diversity, Equity & Inclusion (DEI) Talent Architect. Review this draft job description: [PASTE_JOB_POST]. 1) Identify and highlight any gender-coded words (e.g. aggressive, rockstar) or unnecessary exclusionary degree requirements, 2) Rewrite the job post with clear, inclusive language focusing on core performance outcomes, 3) Add an encouraging equal opportunity statement.',
        expectedOutcome: 'Polished, inclusive job description that expands applicant pool diversity.'
      },
      {
        title: 'Competency-Based Behavioral Interview Question Guide',
        scenario: 'Preparing hiring managers for structured candidate assessments',
        prompt: 'We are hiring for the role of [ROLE_TITLE]. Generate a structured 45-minute behavioral interview guide assessing these 3 competencies: 1) Problem-Solving Under Ambiguity, 2) Cross-Functional Collaboration, 3) Resilience and Adaptability. For each competency, provide 2 targeted behavioral questions ("Tell me about a time when...") and a 3-tier scoring rubric (Below Bar, Meets Bar, Exceeds Bar).',
        expectedOutcome: 'Objective, structured hiring assessment guide with scoring benchmarks.'
      }
    ]
  },
  {
    id: 'sales_customer_success',
    title: 'Sales & Customer Success Representative',
    category: 'Sales & Client Relations',
    iconName: 'TrendingUp',
    tagline: 'Personalize outreach, summarize client discovery calls, and accelerate deal velocity with AI.',
    overview: 'Account executives, SDRs, and customer success managers use AI to research prospect accounts in seconds, craft personalized value propositions, summarize lengthy discovery calls, and predict customer churn.',
    impactOfAI: 'Slashes non-selling administrative tasks by 50%, enabling sales reps to spend twice as much time actively listening to prospects and closing deals.',
    keySkillsNeeded: [
      'Account Intelligence & Prospect Research Automation',
      'Hyper-Personalized Cold Outreach & Email Sequences',
      'Discovery Call Transcription Synthesis & Next-Steps Extraction',
      'Objection Handling Playbook Formulation with AI',
      'Customer Health Scoring & Proactive Retention Strategies'
    ],
    topTools: [
      {
        name: 'Gong / Chorus.ai',
        category: 'Revenue Intelligence',
        description: 'Analyzes customer sales calls and emails to track competitor mentions, pricing objections, and buying signals.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Reviewing call recordings, generating automated next steps, and training new reps.',
        learningUrl: 'https://www.gong.io/',
        tags: ['Sales Calls', 'Deal Intelligence', 'Coaching']
      },
      {
        name: 'Clay / Apollo.io',
        category: 'Data Enrichment & Outbound',
        description: 'Enriches company leads using 50+ data providers and uses AI to write personalized emails based on recent company news.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Automating outbound prospect research and writing custom 1-to-1 cold emails.',
        learningUrl: 'https://www.clay.com/',
        tags: ['Outbound', 'Lead Enrichment', 'Personalization']
      },
      {
        name: 'Lavender / Regie.ai',
        category: 'Sales Email Coaching',
        description: 'Real-time email assistant that scores cold emails on readability, length, and mobile preview effectiveness.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Optimizing cold email reply rates and shortening outbound copy.',
        learningUrl: 'https://www.lavender.ai/',
        tags: ['Email', 'Reply Rates', 'Optimization']
      }
    ],
    featuredCourses: [
      getCourse('microsoft-career-essentials-genai'),
      getCourse('google-intro-genai'),
      getCourse('deeplearning-ai-prompt-eng'),
      getCourse('ibm-ai-fundamentals')
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Generative AI for Sales Productivity',
        duration: 'Week 1-2 (3 hrs/wk)',
        objective: 'Master workplace AI tools to cut administrative CRM updates and draft prospect messages.',
        actionItems: [
          'Earn Microsoft Career Essentials in Generative AI Certificate',
          'Build an AI prompt sequence for summarizing prospect 10-K filings into 3 key business pain points',
          'Use AI to draft personalized post-demo follow-up emails with clear recap points'
        ],
        recommendedCourseIds: ['microsoft-career-essentials-genai'],
        milestone: 'Microsoft & LinkedIn Generative AI Credential'
      },
      {
        phase: 2,
        title: 'High-Converting Prompt Engineering',
        duration: 'Week 3-4 (4 hrs/wk)',
        objective: 'Learn structured prompting to write authentic, non-spammy cold emails under 100 words.',
        actionItems: [
          'Complete DeepLearning.AI "ChatGPT Prompt Engineering for Developers"',
          'Create an Objection-Handling Prompt Simulator to roleplay tough pricing and competitor objections',
          'Optimize cold email templates to achieve a reading grade level below 5th grade for maximum reply rates'
        ],
        recommendedCourseIds: ['deeplearning-ai-prompt-eng'],
        milestone: 'DeepLearning.AI Prompt Engineering Certificate'
      },
      {
        phase: 3,
        title: 'Generative AI Fundamentals & Cloud Capabilities',
        duration: 'Week 5-6 (3 hrs/wk)',
        objective: 'Understand AI terminology to speak knowledgeably with modern enterprise tech buyers.',
        actionItems: [
          'Earn Google Cloud "Introduction to Generative AI" completion badge',
          'Build a competitor battlecard matrix analyzing competitor strengths, weaknesses, and pricing',
          'Create an automated customer onboarding checklist for Customer Success handoffs'
        ],
        recommendedCourseIds: ['google-intro-genai'],
        milestone: 'Google Cloud Generative AI Badge'
      },
      {
        phase: 4,
        title: 'Enterprise AI Governance & Client Trust',
        duration: 'Week 7-8 (3 hrs/wk)',
        objective: 'Assure prospects of data security, SOC-2 compliance, and ethical AI safeguards.',
        actionItems: [
          'Complete IBM SkillsBuild "Artificial Intelligence Fundamentals"',
          'Master answers to prospect security questionnaires regarding data training and zero-retention policies',
          'Publish a personalized AI Sales Playbook for your sales territory'
        ],
        recommendedCourseIds: ['ibm-ai-fundamentals'],
        milestone: 'IBM AI Credly Digital Badge & Custom Sales Playbook'
      }
    ],
    promptTemplates: [
      {
        title: 'Personalized 3-Sentence Cold Outreach Email',
        scenario: 'Reaching out to a VP or C-level executive based on company trigger events',
        prompt: 'Act as an elite Sales Development Representative (SDR). Here is recent news about our prospect\'s company: [PASTE_NEWS_OR_LINKEDIN]. Our product solves: [VALUE_PROP]. Write a hyper-personalized, non-salesy cold email following this exact structure: Sentence 1: Genuine observation about their recent company milestone or hiring initiative. Sentence 2: Direct connection to how similar leaders solve [SPECIFIC_PAIN]. Sentence 3: Low-friction, curiosity-based call to action (e.g. "Worth exploring, or terrible timing?"). Total length must be under 90 words.',
        expectedOutcome: 'High-response-rate cold email that reads like a genuine human email.'
      },
      {
        title: 'Discovery Call Next-Steps & Deal Recap Memo',
        scenario: 'Sending a post-meeting recap to the client champion',
        prompt: 'Here is a raw transcript of our 30-minute discovery call with a prospect: [PASTE_TRANSCRIPT]. Draft a professional post-call follow-up email to the prospect: 1) Thank them for their time and acknowledge their strategic priorities, 2) Summarize the 3 core pain points they shared, 3) Detail the agreed-upon next steps with clear owner names and dates, 4) Attach a brief agenda for our upcoming technical demo.',
        expectedOutcome: 'Compelling deal-advancing recap email that keeps momentum high.'
      }
    ]
  },
  {
    id: 'student_career_switcher',
    title: 'Student & Career Switcher',
    category: 'Foundations & Career Transition',
    iconName: 'Compass',
    tagline: 'Build an AI portfolio, earn resume-boosting free credentials, and pivot successfully into tech.',
    overview: 'Students, fresh graduates, and career switchers use free accredited AI courses, open-source projects, and micro-credentials to break into high-growth AI roles without paying thousands of dollars for expensive bootcamps.',
    impactOfAI: 'Levels the playing field by providing world-class university AI education from Harvard, Helsinki, Google, Microsoft, and IBM 100% free with verifiable digital certificates.',
    keySkillsNeeded: [
      'Comprehensive AI & Machine Learning Literacy',
      'Hands-on Prompt Engineering & Tool Fluency',
      'Portfolio Project Development on GitHub & Kaggle',
      'Verifiable Industry Certifications (Google, IBM, Microsoft, Harvard)',
      'Resume Modernization & AI-Assisted Interview Preparation'
    ],
    topTools: [
      {
        name: 'Kaggle',
        category: 'Learning & Competition Platform',
        description: 'Google-owned platform offering free GPU notebooks, datasets, certified micro-courses, and global AI competitions.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Practicing real-world data science, building portfolios, and earning competition medals.',
        learningUrl: 'https://www.kaggle.com/',
        tags: ['Kaggle', 'Datasets', 'GPU Notebooks']
      },
      {
        name: 'Google Colab',
        category: 'Cloud Jupyter Notebooks',
        description: 'Free cloud computing environment with complimentary GPU/TPU access to run Python, PyTorch, and Hugging Face models.',
        freeTierAvailable: true,
        howProfessionalsUse: 'Prototyping machine learning scripts and running open-source models without local hardware.',
        learningUrl: 'https://colab.research.google.com/',
        tags: ['Python', 'GPU', 'Colab']
      },
      {
        name: 'Hugging Face',
        category: 'AI Model Hub & Spaces',
        description: 'The GitHub of machine learning, hosting over 500,000 open-source models, datasets, and free demo web apps (Spaces).',
        freeTierAvailable: true,
        howProfessionalsUse: 'Discovering open-source models, hosting demo apps with Streamlit, and sharing code.',
        learningUrl: 'https://huggingface.co/',
        tags: ['Open Source', 'Hugging Face', 'Demos']
      }
    ],
    featuredCourses: [
      getCourse('elements-of-ai'),
      getCourse('google-intro-genai'),
      getCourse('ibm-ai-fundamentals'),
      getCourse('microsoft-career-essentials-genai'),
      getCourse('kaggle-intro-ml'),
      getCourse('harvard-cs50-ai')
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Core AI Literacy & University Certification',
        duration: 'Week 1-3 (5 hrs/wk)',
        objective: 'Build an unshakeable conceptual foundation in artificial intelligence and probability.',
        actionItems: [
          'Complete Elements of AI course by University of Helsinki for an accredited European academic certificate',
          'Complete Google Cloud "Introduction to Generative AI" micro-course and badge',
          'Update your LinkedIn profile with your new verifiable digital credentials'
        ],
        recommendedCourseIds: ['elements-of-ai', 'google-intro-genai'],
        milestone: 'University of Helsinki & Google Cloud Official Badges'
      },
      {
        phase: 2,
        title: 'Industry Credentials & Workplace Skills',
        duration: 'Week 4-6 (6 hrs/wk)',
        objective: 'Earn resume credentials from tech giants: Microsoft and IBM.',
        actionItems: [
          'Earn Microsoft Career Essentials in Generative AI Certificate',
          'Complete IBM SkillsBuild "Artificial Intelligence Fundamentals" and earn the official Credly badge',
          'Write a LinkedIn reflection post summarizing key learnings from the courses'
        ],
        recommendedCourseIds: ['microsoft-career-essentials-genai', 'ibm-ai-fundamentals'],
        milestone: 'IBM Credly Digital Badge & Microsoft Career Essentials Certificate'
      },
      {
        phase: 3,
        title: 'Hands-on Coding & Machine Learning Practice',
        duration: 'Week 7-9 (6-8 hrs/wk)',
        objective: 'Write Python code to train machine learning models and create your first Kaggle project.',
        actionItems: [
          'Complete Kaggle "Intro to Machine Learning" hands-on coding certificate',
          'Publish a public Kaggle notebook analyzing a dataset relevant to your target industry',
          'Create a GitHub profile repository showcasing your code and notebooks'
        ],
        recommendedCourseIds: ['kaggle-intro-ml'],
        milestone: 'Kaggle Machine Learning Completion Certificate & Public GitHub Project'
      },
      {
        phase: 4,
        title: 'Computer Science Depth & Job-Ready Portfolio',
        duration: 'Week 10-14 (8-10 hrs/wk)',
        objective: 'Tackle Harvard CS50 AI to prove rigorous technical competency to hiring managers.',
        actionItems: [
          'Audit Harvard University CS50 AI curriculum on Python and search algorithms',
          'Build an interactive AI web application on Hugging Face Spaces or Streamlit',
          'Prepare for technical interviews with simulated AI coding and conceptual questions'
        ],
        recommendedCourseIds: ['harvard-cs50-ai'],
        milestone: 'Harvard CS50 AI Project & Deployed Public AI Web App'
      }
    ],
    promptTemplates: [
      {
        title: 'Resume Bullet Point Modernization for AI Roles',
        scenario: 'Rewriting past non-tech work experience to showcase AI readiness and analytical impact',
        prompt: 'Act as an Executive Tech Recruiter. Here is my current resume bullet point from my past non-tech job: [PASTE_BULLET]. Rewrite this bullet using the Google "X-Y-Z" formula ("Accomplished [X] as measured by [Y] by doing [Z]"). Emphasize analytical problem-solving, technology adoption, or process optimization while remaining 100% truthful.',
        expectedOutcome: 'High-impact resume bullet points tailored for modern tech resumes.'
      },
      {
        title: 'Mock AI Technical & Conceptual Interviewer',
        scenario: 'Practicing for entry-level AI and data job interviews',
        prompt: 'Act as a Senior AI Technical Interviewer at a leading technology firm. I am interviewing for an entry-level AI / Data Specialist role. Ask me one foundational question at a time about: 1) Large Language Models, 2) Supervised vs Unsupervised learning, or 3) Ethical AI considerations. Wait for my answer, provide constructive feedback on how to improve my explanation, and then ask the next question.',
        expectedOutcome: 'Interactive, real-time interview practice session.'
      }
    ]
  }
];
