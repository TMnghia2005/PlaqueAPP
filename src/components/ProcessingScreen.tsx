import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface ProcessingScreenProps {
  onNext: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onNext }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Radius = 42 -> Circumference ~ 263.89
  const radius = 42;
  const circumference = 2 * Math.PI * radius; // ~263.89378

  useEffect(() => {
    // Reset state on mount
    setProgress(0);
    setIsComplete(false);

    const startTime = Date.now();
    const duration = 3500; // 3.5 seconds full sweep

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, (elapsed / duration) * 100);

      setProgress(currentProgress);

      if (currentProgress >= 100) {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Stroke dashoffset: at 0% offset is full circumference, at 100% offset is 0
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex-1 flex flex-col items-center justify-between p-4 max-w-md w-full mx-auto pb-24 min-h-[calc(100vh-64px)]"
    >
      <div className="w-full flex-1 flex flex-col items-center justify-center gap-8 py-6">
        {/* Status Text Above */}
        <div className="text-center px-2">
          <h2 className="text-[24px] font-bold text-[#181c1e] tracking-tight">
            Your images are being processed
          </h2>
          <p className="text-xs text-[#3e484e] mt-1 font-medium">
            AI Plaque Detection Engine in progress...
          </p>
        </div>

        {/* Circular Loading Indicator */}
        <div className="relative flex flex-col items-center justify-center my-2">
          <svg className="w-64 h-64 drop-shadow-xs" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className="text-[#e0e3e5] stroke-current"
              cx="50"
              cy="50"
              fill="transparent"
              r={radius}
              strokeWidth="6"
            />

            {/* Progress circle - Starts at 12 o'clock (-90deg) and fills clockwise */}
            <circle
              className="text-[#33b5e5] stroke-current progress-ring__circle"
              cx="50"
              cy="50"
              fill="transparent"
              r={radius}
              strokeWidth="6"
              strokeLinecap="round"
              style={{
                strokeDasharray: `${circumference} ${circumference}`,
                strokeDashoffset: strokeDashoffset,
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
              }}
            />
          </svg>

          {/* Inside Circle Icon / Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none">
            <span className="material-symbols-outlined text-4xl text-[#33b5e5] mb-1 animate-pulse">
              {isComplete ? 'verified' : 'biotech'}
            </span>
            <span className="text-2xl font-extrabold text-[#181c1e]">
              {Math.round(progress)}%
            </span>
            <span className="text-[11px] font-semibold text-[#6e797f] uppercase tracking-wider mt-0.5">
              {isComplete ? 'Analysis Ready' : 'Analyzing'}
            </span>
          </div>
        </div>

        {/* Status Text Below */}
        <div className="text-center space-y-1">
          <p className="text-[14px] text-[#3e484e] font-medium">
            Do not close the app during diagnosis
          </p>
          {isComplete && (
            <p className="text-xs text-emerald-600 font-bold flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Processing complete. Click NEXT to view results.
            </p>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f7fafc]/95 backdrop-blur-xs border-t border-[#bdc8cf] p-4 z-40 max-w-md mx-auto">
        <button
          onClick={onNext}
          disabled={!isComplete}
          className={`w-full py-4 text-[14px] font-bold rounded-full uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
            isComplete
              ? 'bg-[#33b5e5] text-white hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-md'
              : 'bg-[#e0e3e5] text-[#3e484e] opacity-50 cursor-not-allowed'
          }`}
        >
          <span>NEXT</span>
          {isComplete && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
        </button>
      </div>
    </motion.main>
  );
};
