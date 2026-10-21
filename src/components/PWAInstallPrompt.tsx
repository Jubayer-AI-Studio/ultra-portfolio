import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Check, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Check if already in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) {
      setInstalled(true);
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // If iOS and not installed, show prompt after a short delay
    if (isIosDevice && !isStandalone) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3500);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    sound.playClick();

    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      sound.playSuccess();
      setInstalled(true);
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (installed || !isVisible) return null;

  return (
    <>
      {/* Floating PWA Install Pill (Bottom-Right / Mobile-Safe) */}
      <div className="fixed bottom-4 right-4 z-50 max-w-[92vw] sm:max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="p-3 sm:p-4 rounded-2xl bg-[#f5ecde] border-2 border-stone-900 shadow-[0_15px_35px_rgba(0,0,0,0.25)] flex items-center justify-between gap-3 text-stone-950 font-sans">
          
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-stone-950 text-amber-300 flex items-center justify-center shrink-0 shadow-md">
              <Smartphone className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-stone-950 truncate flex items-center gap-1.5">
                <span>অ্যাপ ইনস্টল করুন</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              </div>
              <div className="text-[10px] sm:text-[11px] text-stone-600 truncate font-medium">
                হোম স্ক্রিনে সরাসরি ওপেন করতে
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-2 rounded-xl bg-stone-950 hover:bg-black text-amber-200 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ইনস্টল</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIsVisible(false);
              }}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-[#ebdcc8] transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* iOS Safari Home Screen Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#f5ecde] text-stone-950 rounded-3xl p-6 border-2 border-stone-900 shadow-2xl space-y-4 font-sans animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-[#c8b59b] pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-amber-800" />
                <span className="font-black text-base">আইফোনে ইনস্টল করার নিয়ম</span>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 rounded-lg text-stone-600 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700 font-medium">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-stone-950 text-amber-200 font-mono text-xs flex items-center justify-center shrink-0 font-bold">1</span>
                <span>Safari ব্রাউজারের নিচে থাকা <strong>Share (📤)</strong> বাটনে ট্যাপ করুন।</span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-stone-950 text-amber-200 font-mono text-xs flex items-center justify-center shrink-0 font-bold">2</span>
                <span>একটু নিচে স্ক্রল করে <strong>'Add to Home Screen' (হোম স্ক্রিনে যোগ করুন)</strong> অপশনে চাপ দিন।</span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-stone-950 text-amber-200 font-mono text-xs flex items-center justify-center shrink-0 font-bold">3</span>
                <span>উপরে ডানপাশে <strong>'Add'</strong> চাপলেই সরাসরি আপনার ফোনে ইনস্টল হয়ে যাবে!</span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setShowIOSGuide(false);
                setIsVisible(false);
              }}
              className="w-full py-2.5 rounded-xl bg-stone-950 text-amber-200 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>বুঝেছি (Got It)</span>
            </button>

          </div>
        </div>
      )}
    </>
  );
};
