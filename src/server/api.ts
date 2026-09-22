import { Router } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export const apiRouter = Router();

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
export function getAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required. If running on Vercel, please add GEMINI_API_KEY in your Vercel Project Settings -> Environment Variables.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Health check endpoint
apiRouter.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Custom AI Roadmap Generation endpoint for specialized or niche professions
apiRouter.post('/api/recommend-custom-path', async (req, res) => {
  try {
    const { professionTitle, experienceLevel, primaryGoal, weeklyHours, details } = req.body;

    if (!professionTitle || typeof professionTitle !== 'string') {
      res.status(400).json({ error: 'professionTitle is required' });
      return;
    }

    const ai = getAI();
    const systemPrompt = `You are a world-class AI Career & Education Advisor specializing in guiding working professionals to learn artificial intelligence tailored to their exact career domain.
Provide accurate, highly actionable, realistic guidance. Always emphasize legitimate 100% FREE certificate courses and free learning platforms (Google Cloud Skills Boost, Microsoft Learn, IBM SkillsBuild, Kaggle Learn, University of Helsinki Elements of AI, DeepLearning.AI, Harvard CS50).
Return valid JSON adhering to the specified schema.`;

    const userPrompt = `Generate a comprehensive AI Learning Pathway and free certification guide for the profession: "${professionTitle}".
User Skill Level: ${experienceLevel || 'Beginner'}
Primary Goal: ${primaryGoal || 'Career Advancement'}
Time Commitment: ${weeklyHours || '3-5 hours/week'}
Additional Context: ${details || 'None provided'}

Provide:
1. Overview: How AI affects this specific career today.
2. Impact of AI: Concrete time savings, workflow changes, and productivity benefits.
3. 5 essential domain-specific AI skills to acquire.
4. Top 3 AI tools & technologies they should learn to use (with category, practical usage, and real official learning URLs).
5. 4-5 recommended verified free courses with certificates/badges (use real platforms like Google Cloud Skills Boost, Microsoft Learn, IBM SkillsBuild, Kaggle, Elements of AI, DeepLearning.AI, Harvard CS50).
6. A 4-phase structured roadmap (duration, objectives, concrete action items, milestones).
7. 2 ready-to-use high-impact AI prompt templates with realistic scenarios and expected outcomes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            professionTitle: { type: Type.STRING },
            overview: { type: Type.STRING },
            impactOfAI: { type: Type.STRING },
            keySkillsNeeded: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            topTools: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  freeTierAvailable: { type: Type.BOOLEAN },
                  howProfessionalsUse: { type: Type.STRING },
                  learningUrl: { type: Type.STRING },
                  tags: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ['name', 'category', 'description', 'freeTierAvailable', 'howProfessionalsUse', 'learningUrl', 'tags']
              }
            },
            featuredCourses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  provider: { type: Type.STRING },
                  platform: { type: Type.STRING },
                  credentialIssuer: { type: Type.STRING },
                  url: { type: Type.STRING },
                  isCertificateFree: { type: Type.BOOLEAN },
                  badgeType: { type: Type.STRING },
                  estimatedTime: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  skillsLearned: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ['id', 'title', 'provider', 'url', 'isCertificateFree', 'badgeType', 'estimatedTime', 'difficulty', 'description', 'skillsLearned']
              }
            },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  objective: { type: Type.STRING },
                  actionItems: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  recommendedCourseIds: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  milestone: { type: Type.STRING }
                },
                required: ['phase', 'title', 'duration', 'objective', 'actionItems', 'milestone']
              }
            },
            promptTemplates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  scenario: { type: Type.STRING },
                  prompt: { type: Type.STRING },
                  expectedOutcome: { type: Type.STRING }
                },
                required: ['title', 'scenario', 'prompt', 'expectedOutcome']
              }
            }
          },
          required: ['professionTitle', 'overview', 'impactOfAI', 'keySkillsNeeded', 'topTools', 'featuredCourses', 'roadmap', 'promptTemplates']
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from model');
    }

    const parsed = JSON.parse(text);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating custom AI roadmap:', error);
    res.status(500).json({
      error: 'Failed to generate custom AI roadmap. Please try again.',
      details: error?.message || String(error)
    });
  }
});

// Interactive AI Mentor / Advisor Q&A endpoint
apiRouter.post('/api/ask-mentor', async (req, res) => {
  try {
    const { question, professionTitle, experienceLevel, currentGoal } = req.body;

    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: 'Question is required' });
      return;
    }

    const ai = getAI();
    const systemPrompt = `You are an empathetic, practical AI Career & Learning Mentor.
The user is a ${professionTitle || 'working professional'} with ${experienceLevel || 'beginner'} AI experience, whose current goal is ${currentGoal || 'career advancement'}.
Answer their question directly and practically. 
Highlight concrete steps, specific free course recommendations (such as Google Cloud Skills Boost, Microsoft Learn, IBM SkillsBuild, Kaggle, Elements of AI, DeepLearning.AI, Harvard CS50), exact prompts, or tools they can use right away.
Format your answer with clear markdown (bolding, concise bullet points, links if relevant). Keep answers scannable, encouraging, and under 350 words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: question,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    const text = response.text || 'I could not generate an answer at this time. Please try rephrasing your question.';
    res.json({ success: true, answer: text });
  } catch (error: any) {
    console.error('Error asking mentor:', error);
    res.status(500).json({
      error: 'Failed to get answer from AI mentor.',
      details: error?.message || String(error)
    });
  }
});
