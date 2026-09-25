import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Volume2, 
  Bot,
  Globe2,
  BookOpen
} from 'lucide-react';
import { 
  VOICE_TOUR_STEPS, 
  VoiceTourStep, 
  VoiceLanguage, 
  getAvailableMaleVoice 
} from '../utils/voiceOverScripts';

interface VoiceOverGuideProps {
  onHighlightSection?: (sectionId: string) => void;
  onOpenLoginModal?: () => void;
}

interface BotCoordinates {
  top: number;
  left: number;
  visible: boolean;
}

// Module-level and window reference to prevent Chrome V8 garbage collection from aborting speech midway
declare global {
  interface Window {
    __guideBotUtterance?: SpeechSynthesisUtterance | null;
  }
}
let activeSpeechUtterance: SpeechSynthesisUtterance | null = null;

export const VoiceOverGuide: React.FC<VoiceOverGuideProps> = ({
  onHighlightSection,
  onOpenLoginModal
}) => {
  // Voice language state: English ('en') or Malayalam ('ml')
  const [language, setLanguage] = useState<VoiceLanguage>(() => {
    try {
      const saved = localStorage.getItem('ai_learning_voice_lang');
      return saved === 'ml' ? 'ml' : 'en';
    } catch {
      return 'en';
    }
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isBotActive, setIsBotActive] = useState(false);
  const [showMiniControls, setShowMiniControls] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Dynamic bot coordinates for section tracking
  const [botCoords, setBotCoords] = useState<BotCoordinates>({
    top: 90,
    left: 20,
    visible: false
  });

  // References
  const isPlayingRef = useRef(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Synchronize playing ref
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Periodic eye blinking animation for robot mascot
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 240);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Ensure speech synthesis voices are populated across browsers
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const warmUpVoices = () => {
      window.speechSynthesis.getVoices();
    };

    warmUpVoices();
    window.speechSynthesis.onvoiceschanged = warmUpVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Chrome SpeechSynthesis keep-alive: resets Chrome's internal 15s watchdog so it never stops midway
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const keepAlive = setInterval(() => {
      if (isPlayingRef.current && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 3500);

    return () => clearInterval(keepAlive);
  }, []);

  // Remove DOM spotlight highlights
  const clearDomHighlights = () => {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('.voiceover-highlight-active').forEach((el) => {
      el.classList.remove('voiceover-highlight-active');
    });
  };

  // Calculate coordinates to position the small bot right beside the active section
  // without overlapping the section or the content
  const calculateBotCoordinates = useCallback((selector: string) => {
    if (typeof window === 'undefined') return;

    const el = document.querySelector(selector) as HTMLElement | null;
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;

    // Dimensions of the small bot avatar
    const botWidth = 64;
    const botHeight = 76;
    const offset = 14;

    if (!el) {
      // Default fallback corner
      setBotCoords({
        top: Math.max(80, windowH - botHeight - 30),
        left: Math.max(16, windowW - botWidth - 24),
        visible: true
      });
      return;
    }

    const rect = el.getBoundingClientRect();

    let targetLeft: number;
    let targetTop: number;

    // If element is on mobile or fits better beside
    if (rect.left - botWidth - offset > 8) {
      // Dock on the left side of the element
      targetLeft = rect.left - botWidth - offset;
      targetTop = Math.max(76, Math.min(windowH - botHeight - 20, rect.top));
    } else if (rect.right + botWidth + offset < windowW - 8) {
      // Dock on the right side of the element
      targetLeft = rect.right + offset;
      targetTop = Math.max(76, Math.min(windowH - botHeight - 20, rect.top));
    } else if (rect.top - botHeight - offset > 70) {
      // Dock above the element
      targetLeft = Math.max(16, Math.min(windowW - botWidth - 16, rect.left + 8));
      targetTop = rect.top - botHeight - offset;
    } else {
      // Dock below the element
      targetLeft = Math.max(16, Math.min(windowW - botWidth - 16, rect.left + 8));
      targetTop = Math.min(windowH - botHeight - 16, rect.bottom + offset);
    }

    // Strict boundary safety so bot never leaves screen
    targetLeft = Math.max(12, Math.min(windowW - botWidth - 12, targetLeft));
    targetTop = Math.max(72, Math.min(windowH - botHeight - 16, targetTop));

    setBotCoords({
      top: Math.round(targetTop),
      left: Math.round(targetLeft),
      visible: true
    });
  }, []);

  // Apply DOM spotlight and move bot immediately without pauses
  const applyDomHighlightAndMove = (selector: string) => {
    if (typeof document === 'undefined') return;
    clearDomHighlights();

    try {
      const elements = document.querySelectorAll(selector);
      if (elements && elements.length > 0) {
        const primaryEl = elements[0] as HTMLElement;
        primaryEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        elements.forEach((el) => {
          el.classList.add('voiceover-highlight-active');
        });
      }
    } catch (e) {
      console.debug('Bot scroll notice:', e);
    }

    // Update position immediately and refine once scroll settles
    calculateBotCoordinates(selector);
    setTimeout(() => {
      calculateBotCoordinates(selector);
    }, 220);
  };

  // Re-calculate position on window scroll or resize
  useEffect(() => {
    const handleUpdate = () => {
      if (isBotActive) {
        const step = VOICE_TOUR_STEPS[currentStepIndex];
        if (step) {
          calculateBotCoordinates(step.elementSelector);
        }
      }
    };

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, { passive: true });
    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);
    };
  }, [isBotActive, currentStepIndex, calculateBotCoordinates]);

  // Persist language choice
  const handleToggleLanguage = (newLang: VoiceLanguage) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('ai_learning_voice_lang', newLang);
    } catch {}

    // If currently speaking, restart current step in newly selected language
    if (isPlayingRef.current) {
      stopSpeech();
      setTimeout(() => {
        playStep(currentStepIndex, newLang);
      }, 80);
    }
  };

  const currentStep = VOICE_TOUR_STEPS[currentStepIndex];

  // Stop current speech and clear highlights
  const stopSpeech = () => {
    isPlayingRef.current = false;
    activeSpeechUtterance = null;
    if (typeof window !== 'undefined') {
      window.__guideBotUtterance = null;
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
    setIsPlaying(false);
    clearDomHighlights();
  };

  // Close bot guide completely
  const handleCloseBot = () => {
    stopSpeech();
    setIsBotActive(false);
    setShowMiniControls(false);
    setShowTranscript(false);
  };

  // Play a specific step
  const playStep = (index: number, activeLang = language) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const step = VOICE_TOUR_STEPS[index];
    if (!step) return;

    // Immediately mark playing state synchronously
    isPlayingRef.current = true;
    setCurrentStepIndex(index);
    setIsPlaying(true);
    setIsBotActive(true);

    // 1. Notify parent to switch tab / scroll view immediately
    if (onHighlightSection) {
      onHighlightSection(step.targetSection);
    }

    // 2. Visually highlight target section and fly bot to it
    applyDomHighlightAndMove(step.elementSelector);

    // 3. Synthesize articulate male voice narration
    const textToSpeak = activeLang === 'ml' ? step.textMl : step.textEn;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    // Retain persistent reference so Chrome V8 garbage collection does not drop onend
    activeSpeechUtterance = utterance;
    window.__guideBotUtterance = utterance;

    // Pitch: 0.88 gives an articulate, deep male vocal register
    utterance.pitch = 0.88;
    utterance.rate = 0.95;

    // Set language and male voice
    if (activeLang === 'ml') {
      utterance.lang = 'ml-IN';
    } else {
      utterance.lang = 'en-US';
    }

    const maleVoice = getAvailableMaleVoice(activeLang);
    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    // Auto-resume if Chrome fires unexpected pause
    utterance.onpause = () => {
      if (isPlayingRef.current && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    };

    utterance.onend = () => {
      // Clear references
      activeSpeechUtterance = null;
      window.__guideBotUtterance = null;

      // Automatically advance to the next step
      if (isPlayingRef.current && index < VOICE_TOUR_STEPS.length - 1) {
        // Brief 50ms tick allows the browser audio pipeline to reset cleanly
        setTimeout(() => {
          if (isPlayingRef.current) {
            playStep(index + 1, activeLang);
          }
        }, 50);
      } else {
        isPlayingRef.current = false;
        setIsPlaying(false);
        clearDomHighlights();
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis event notice:', e);
      activeSpeechUtterance = null;
      window.__guideBotUtterance = null;

      // If stopped or interrupted unexpectedly while tour is active, advance
      if (isPlayingRef.current && index < VOICE_TOUR_STEPS.length - 1) {
        setTimeout(() => {
          if (isPlayingRef.current) {
            playStep(index + 1, activeLang);
          }
        }, 50);
      } else {
        isPlayingRef.current = false;
        setIsPlaying(false);
        clearDomHighlights();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
      clearDomHighlights();
    } else {
      if (typeof window !== 'undefined' && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        if (currentStep) {
          applyDomHighlightAndMove(currentStep.elementSelector);
        }
      } else {
        playStep(currentStepIndex, language);
      }
    }
  };

  // Navigation handlers
  const handleNextStep = () => {
    const nextIdx = Math.min(VOICE_TOUR_STEPS.length - 1, currentStepIndex + 1);
    stopSpeech();
    playStep(nextIdx, language);
  };

  const handlePrevStep = () => {
    const prevIdx = Math.max(0, currentStepIndex - 1);
    stopSpeech();
    playStep(prevIdx, language);
  };

  const handleReplayCurrent = () => {
    stopSpeech();
    playStep(currentStepIndex, language);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      clearDomHighlights();
    };
  }, []);

  return (
    <div id="voiceover-chatbot-controller">
      {/* 1. TOP HEADER CONTROLS: Language Switcher & Bot Trigger Button */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Malayalam / English Toggle Switch on Top */}
        <div 
          className="inline-flex items-center p-0.5 bg-slate-100/90 border border-slate-200/90 rounded-xl shadow-2xs"
          role="group"
          aria-label="Select voiceover language"
        >
          <button
            onClick={() => handleToggleLanguage('en')}
            className={`px-2 sm:px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
              language === 'en'
                ? 'bg-white text-indigo-700 shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch Guide Bot to English (Male Voice)"
          >
            <span>🇬🇧</span>
            <span className="hidden sm:inline">English</span>
            <span className="sm:hidden">EN</span>
          </button>

          <button
            onClick={() => handleToggleLanguage('ml')}
            className={`px-2 sm:px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
              language === 'ml'
                ? 'bg-indigo-600 text-white shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="മലയാളത്തിൽ ഗൈഡ് ബോട്ട് കേൾക്കുക (Male Voice)"
          >
            <span>🇮🇳</span>
            <span>മലയാളം</span>
          </button>
        </div>

        {/* Start / Pause Guide Bot Button in Header */}
        <button
          onClick={() => {
            if (!isBotActive && !isPlaying) {
              setIsBotActive(true);
              playStep(0, language);
            } else {
              handleTogglePlay();
            }
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer ${
            isPlaying
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-300 ring-offset-1 animate-pulse'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80'
          }`}
          title={isPlaying ? "Pause Bot Guide" : "Start Floating Guide Bot (Male Voice Over)"}
          id="top-voiceover-play-btn"
        >
          {isPlaying ? (
            <>
              {/* Sound wave animated equalizer bars */}
              <div className="flex items-end gap-0.5 h-3.5 w-3.5 mr-0.5">
                <span className="w-1 bg-white rounded-full animate-[bounce_0.8s_infinite]" style={{ height: '70%' }} />
                <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite]" style={{ height: '100%' }} />
                <span className="w-1 bg-white rounded-full animate-[bounce_0.9s_infinite]" style={{ height: '50%' }} />
              </div>
              <Pause className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pause Bot</span>
            </>
          ) : (
            <>
              <Bot className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">
                {language === 'ml' ? 'ഗൈഡ് ബോട്ട് (Male)' : 'AI Guide Bot (Male)'}
              </span>
              <span className="sm:hidden">Bot</span>
            </>
          )}
        </button>

        {/* Stop / Close button in header when bot is active */}
        {isBotActive && (
          <button
            onClick={handleCloseBot}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Stop & Close Bot Tour"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. ONLY THE SMALL CHAT BOT (Zero overlap! Glides next to each section) */}
      {isBotActive && botCoords.visible && (
        <div
          id="floating-guide-bot"
          className="fixed z-50 pointer-events-auto select-none"
          style={{
            top: `${botCoords.top}px`,
            left: `${botCoords.left}px`,
            transition: 'top 0.7s cubic-bezier(0.25, 1, 0.5, 1), left 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          <div className="flex flex-col items-center">
            {/* The Small Animated Bot Character */}
            <div 
              onClick={() => {
                // Tapping the bot toggles pause/play and reveals/hides mini controls
                handleTogglePlay();
                setShowMiniControls((prev) => !prev);
              }}
              className="group relative cursor-pointer"
              title={isPlaying ? "Tap to Pause Voice" : "Tap to Play Voice"}
            >
              {/* Antenna with pulsing cyan signal beacon */}
              <div className="w-1.5 h-3 bg-gradient-to-t from-indigo-600 to-indigo-400 mx-auto rounded-t-full relative">
                <span className="absolute -top-1.5 -left-1 w-3.5 h-3.5 bg-cyan-400 rounded-full animate-ping opacity-80" />
                <span className="absolute -top-1 -left-0.5 w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#22d3ee]" />
              </div>

              {/* Robotic Head Chassis */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-1 shadow-2xl border-2 border-indigo-400/80 hover:border-cyan-400 transition-colors bot-hover-anim">
                {/* Visor Screen */}
                <div className="w-full h-full bg-slate-900/95 rounded-xl flex flex-col items-center justify-center p-1 relative overflow-hidden border border-indigo-500/40">
                  {/* Glowing Digital Eyes (with natural periodic blink) */}
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className={`w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee] transition-all duration-150 ${
                        isBlinking ? 'scale-y-[0.1] bg-cyan-600' : 'scale-y-100'
                      }`} 
                    />
                    <div 
                      className={`w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee] transition-all duration-150 ${
                        isBlinking ? 'scale-y-[0.1] bg-cyan-600' : 'scale-y-100'
                      }`} 
                    />
                  </div>

                  {/* Speaking Mouth sound wave equalizer inside visor */}
                  <div className="flex items-center gap-0.5 h-2.5">
                    <span 
                      className={`w-0.5 bg-indigo-300 rounded-full transition-all ${
                        isPlaying ? 'animate-[bounce_0.6s_infinite]' : 'h-0.5 bg-slate-600'
                      }`} 
                      style={{ height: isPlaying ? '7px' : '2px' }} 
                    />
                    <span 
                      className={`w-0.5 bg-cyan-300 rounded-full transition-all ${
                        isPlaying ? 'animate-[bounce_0.8s_infinite]' : 'h-0.5 bg-slate-600'
                      }`} 
                      style={{ height: isPlaying ? '9px' : '2px' }} 
                    />
                    <span 
                      className={`w-0.5 bg-indigo-300 rounded-full transition-all ${
                        isPlaying ? 'animate-[bounce_0.5s_infinite]' : 'h-0.5 bg-slate-600'
                      }`} 
                      style={{ height: isPlaying ? '6px' : '2px' }} 
                    />
                  </div>
                </div>
              </div>

              {/* Bot Ground Drop Shadow */}
              <div className="w-8 h-2 bg-indigo-950/40 rounded-full blur-xs mx-auto mt-1 bot-shadow-anim" />
            </div>

            {/* Tiny Micro Pill Badge (Shows Step Number & Speaking Indicator - No Overlap!) */}
            <div 
              onClick={() => setShowMiniControls((prev) => !prev)}
              className="mt-1 px-2 py-0.5 bg-slate-900/90 text-white text-[10px] font-bold rounded-full shadow-lg border border-indigo-400/40 flex items-center gap-1 cursor-pointer hover:bg-slate-800 transition-colors"
            >
              {isPlaying ? (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
              <span className="tabular-nums">
                {language === 'ml' ? `ഘട്ടം ${currentStep.stepNumber}/8` : `Step ${currentStep.stepNumber}/8`}
              </span>
            </div>

            {/* Micro Floating Controls (Appears when user taps the bot or mini badge) */}
            {showMiniControls && (
              <div className="mt-1.5 p-1 bg-slate-900/95 backdrop-blur-md rounded-xl border border-indigo-500/40 shadow-xl flex items-center gap-1 animate-in fade-in zoom-in-95 duration-150">
                {/* Prev */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevStep();
                  }}
                  disabled={currentStepIndex === 0}
                  className="p-1 text-slate-300 hover:text-white rounded disabled:opacity-30 cursor-pointer"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Play / Pause */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTogglePlay();
                  }}
                  className="p-1 text-white bg-indigo-600 hover:bg-indigo-500 rounded cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3 fill-white" />
                  )}
                </button>

                {/* Next */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextStep();
                  }}
                  disabled={currentStepIndex === VOICE_TOUR_STEPS.length - 1}
                  className="p-1 text-slate-300 hover:text-white rounded disabled:opacity-30 cursor-pointer"
                  title="Next Step"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {/* Replay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReplayCurrent();
                  }}
                  className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
                  title="Replay Current Step"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Read Transcript Drawer Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTranscript((prev) => !prev);
                  }}
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors flex items-center gap-1 ${
                    showTranscript 
                      ? 'bg-cyan-500 text-slate-950 font-extrabold' 
                      : 'bg-white/10 text-indigo-200 hover:text-white'
                  }`}
                  title={showTranscript ? "Hide Detailed Transcript" : "Read Detailed Transcript"}
                >
                  <BookOpen className="w-3 h-3" />
                  <span className="hidden xs:inline">{showTranscript ? 'Hide' : 'Text'}</span>
                </button>

                {/* Switch Language */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleLanguage(language === 'en' ? 'ml' : 'en');
                  }}
                  className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-indigo-500/40 text-indigo-200 hover:text-white cursor-pointer"
                  title="Toggle Language"
                >
                  {language === 'en' ? 'ML' : 'EN'}
                </button>

                {/* Close */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseBot();
                  }}
                  className="p-1 text-slate-400 hover:text-rose-400 rounded cursor-pointer"
                  title="Close Bot"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. OPTIONAL DETAILED SUBTITLE / TRANSCRIPT SLIDEOUT (Only when user clicks "Text" in micro-controls) */}
      {isBotActive && showTranscript && (
        <div 
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] sm:max-w-xl bg-slate-950/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-indigo-500/50 p-4 animate-in fade-in slide-in-from-bottom-4 duration-200"
          id="voiceover-detailed-transcript-modal"
        >
          <div className="flex items-center justify-between border-b border-indigo-500/30 pb-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-indigo-600/60 text-indigo-200 text-[10px] font-bold uppercase tracking-wider">
                {language === 'ml' ? `ഘട്ടം ${currentStep.stepNumber} / 8` : `Step ${currentStep.stepNumber} of 8`}
              </span>
              <h4 className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                {language === 'ml' ? currentStep.titleMl : currentStep.titleEn}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleLanguage(language === 'en' ? 'ml' : 'en')}
                className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-indigo-200 cursor-pointer"
              >
                {language === 'en' ? '🇮🇳 മലയാളം' : '🇬🇧 EN'}
              </button>
              <button
                onClick={() => setShowTranscript(false)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
                title="Hide transcript"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed font-normal max-h-36 overflow-y-auto pr-1">
            {language === 'ml' ? currentStep.textMl : currentStep.textEn}
          </p>
        </div>
      )}
    </div>
  );
};
