import React from 'react';
import { motion } from 'motion/react';

interface ScanInstructionsProps {
  onStartScan: () => void;
}

export const ScanInstructions: React.FC<ScanInstructionsProps> = ({ onStartScan }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex-1 flex flex-col items-center justify-between p-4 max-w-md w-full mx-auto pb-24"
    >
      <div className="w-full space-y-6 pt-4">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-[24px] font-bold text-[#181c1e] tracking-tight">
            Scan Instructions
          </h2>
        </div>

        {/* Instructions List */}
        <div className="flex flex-col gap-4">
          {/* Instruction 1 */}
          <div className="bg-[#f1f4f6] border border-[#bdc8cf] rounded-xl p-4 shadow-2xs transition-all hover:border-[#33b5e5]">
            <h3 className="text-[16px] font-bold text-[#181c1e]">
              Good Light
            </h3>
            <p className="text-[14px] text-[#3e484e] mt-1 leading-relaxed">
              Ensure no harsh shadows or glare on tooth surfaces.
            </p>
          </div>

          {/* Instruction 2 */}
          <div className="bg-[#f1f4f6] border border-[#bdc8cf] rounded-xl p-4 shadow-2xs transition-all hover:border-[#33b5e5]">
            <h3 className="text-[16px] font-bold text-[#181c1e]">
              Lips Pulled Back
            </h3>
            <p className="text-[14px] text-[#3e484e] mt-1 leading-relaxed">
              Check that the lips and cheeks are fully pulled back.
            </p>
          </div>

          {/* Instruction 3 */}
          <div className="bg-[#f1f4f6] border border-[#bdc8cf] rounded-xl p-4 shadow-2xs transition-all hover:border-[#33b5e5]">
            <h3 className="text-[16px] font-bold text-[#181c1e]">
              Bite Naturally
            </h3>
            <p className="text-[14px] text-[#3e484e] mt-1 leading-relaxed">
              The patient must bite down naturally on back teeth.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f7fafc]/95 backdrop-blur-sm border-t border-[#bdc8cf] p-4 z-40 max-w-md mx-auto">
        <button
          onClick={onStartScan}
          className="w-full bg-[#33b5e5] text-white h-14 rounded-full font-bold text-[14px] tracking-wider flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all shadow-md cursor-pointer"
          id="start-scan-btn"
        >
          <span className="material-symbols-outlined text-[20px]">scan</span>
          START SCAN
        </button>
      </div>
    </motion.main>
  );
};
