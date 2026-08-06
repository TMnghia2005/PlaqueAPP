import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DENTAL_POSITIONS, DEFAULT_PATIENT } from '../data';
import { CapturedPhoto, PatientInfo } from '../types';

interface ScanReviewProps {
  capturedPhotos: CapturedPhoto[];
  patientInfo?: PatientInfo;
  onRescan: () => void;
  onConfirmPhotos: () => void;
  onRetakePosition: (positionId: string) => void;
}

export const ScanReview: React.FC<ScanReviewProps> = ({
  capturedPhotos,
  patientInfo = DEFAULT_PATIENT,
  onRescan,
  onConfirmPhotos,
  onRetakePosition,
}) => {
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<{
    code: string;
    title: string;
    url: string;
  } | null>(null);

  // Map each position to its captured photo URL or fallback default image URL
  const getPhotoUrl = (positionId: string, defaultImage: string) => {
    const found = capturedPhotos.find((p) => p.positionId === positionId);
    return found ? found.dataUrl : defaultImage;
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex-1 flex flex-col p-4 gap-4 overflow-x-hidden max-w-md w-full mx-auto pb-28 min-h-[calc(100vh-64px)]"
    >
      {/* Patient Info Block */}
      <div className="bg-[#cfe6f2] rounded-xl p-4 flex flex-col items-center text-center gap-1 shrink-0 border border-[#bdc8cf]">
        <h2 className="text-[24px] font-bold text-[#181c1e] tracking-tight">
          Confirm Patient Scan
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-semibold text-[#33b5e5]">
            {patientInfo.name}
          </span>
          <span className="text-[#6e797f]">|</span>
          <span className="text-[14px] text-[#3e484e]">
            ID: {patientInfo.id}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[12px] font-bold bg-[#33b5e5]/20 text-[#33b5e5] px-2 py-0.5 rounded uppercase">
            VISIT #{patientInfo.visitNumber}
          </span>
          <span className="text-[14px] text-[#3e484e]">
            {patientInfo.date}
          </span>
        </div>
        <p className="text-[12px] text-[#3e484e] mt-1">
          Review captured dental positions
        </p>
      </div>

      {/* Visual Scan Review Container */}
      <div className="flex-1 bg-white rounded-xl border border-[#bdc8cf] p-4 flex flex-col overflow-hidden shadow-2xs">
        <div className="flex items-center justify-between mb-3 shrink-0">
          <h3 className="text-[14px] font-bold text-[#181c1e] uppercase tracking-wider">
            VISUAL SCAN REVIEW
          </h3>
          <span className="text-xs text-[#33b5e5] font-semibold bg-[#cfe6f2]/60 px-2 py-0.5 rounded-md">
            9 Positions
          </span>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-2.5 flex-1 min-h-0">
          {DENTAL_POSITIONS.map((pos) => {
            const photoUrl = getPhotoUrl(pos.id, pos.defaultImage);
            const isCapturedByCamera = capturedPhotos.some((p) => p.positionId === pos.id);

            return (
              <div
                key={pos.id}
                onClick={() =>
                  setSelectedPhotoModal({
                    code: pos.code,
                    title: pos.fullTitle,
                    url: photoUrl,
                  })
                }
                className="flex flex-col gap-1 overflow-hidden group cursor-pointer"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden border border-[#bdc8cf] bg-[#f1f4f6] group-hover:border-[#33b5e5] transition-all shadow-2xs">
                  <img
                    alt={pos.code}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={photoUrl}
                  />
                  {isCapturedByCamera && (
                    <span className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5 text-[10px] shadow-xs">
                      <span className="material-symbols-outlined text-[12px] block">check</span>
                    </span>
                  )}
                </div>
                <span className="text-[13px] sm:text-[14px] font-medium text-[#3e484e] truncate">
                  {pos.fullTitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xs border-t border-[#bdc8cf] p-4 z-40 max-w-md mx-auto">
        <div className="flex flex-row gap-3 items-center">
          <button
            onClick={onRescan}
            className="flex-1 text-[#3e484e] py-4 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-[#f1f4f6] active:scale-[0.98] transition-all bg-[#f1f4f6] border border-[#bdc8cf] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            RE-SCAN
          </button>
          <button
            onClick={onConfirmPhotos}
            className="flex-[2] bg-[#33b5e5] text-white py-4 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            CONFIRM ALL PHOTOS
          </button>
        </div>
      </footer>

      {/* Photo Enlarge & Retake Modal */}
      {selectedPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl flex flex-col gap-3 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-slate-800 text-base">{selectedPhotoModal.title}</h4>
              <button
                onClick={() => setSelectedPhotoModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
              <img
                src={selectedPhotoModal.url}
                alt={selectedPhotoModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-2 mt-1">
              <button
                onClick={() => {
                  const posId = selectedPhotoModal.code;
                  setSelectedPhotoModal(null);
                  onRetakePosition(posId);
                }}
                className="flex-1 py-2.5 bg-[#33b5e5]/10 text-[#004359] font-bold text-xs rounded-xl hover:bg-[#33b5e5]/20 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-base">photo_camera</span>
                Retake Position {selectedPhotoModal.code}
              </button>
              <button
                onClick={() => setSelectedPhotoModal(null)}
                className="py-2.5 px-4 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.main>
  );
};
