import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { DENTAL_POSITIONS } from '../data';
import { CapturedPhoto } from '../types';

interface CameraViewProps {
  capturedPhotos: CapturedPhoto[];
  onPhotosUpdated: (photos: CapturedPhoto[]) => void;
  onCompleteScan: () => void;
  onCancel: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  capturedPhotos,
  onPhotosUpdated,
  onCompleteScan,
  onCancel,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [flashEffect, setFlashEffect] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentPosition = DENTAL_POSITIONS[currentIndex] || DENTAL_POSITIONS[0];

  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.warn('Camera access error or unsupported:', err);
      setCameraError('Camera access unavailable or permission denied. You can use simulated photo capture to test all 9 positions.');
    }
  }, [facingMode]);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const capturePhoto = () => {
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 200);

    let photoUrl = '';

    if (videoRef.current && canvasRef.current && stream) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(51, 181, 229, 0.85)';
        ctx.fillRect(10, 10, 140, 32);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Manrope, sans-serif';
        ctx.fillText(`${currentPosition.code}: ${currentPosition.label}`, 18, 32);

        photoUrl = canvas.toDataURL('image/jpeg', 0.85);
      }
    }

    if (!photoUrl) {
      photoUrl = currentPosition.defaultImage;
    }

    const newPhotos = [...capturedPhotos];
    const existingIdx = newPhotos.findIndex((p) => p.positionId === currentPosition.id);
    const newEntry: CapturedPhoto = {
      positionId: currentPosition.id,
      dataUrl: photoUrl,
      timestamp: Date.now(),
    };

    if (existingIdx >= 0) {
      newPhotos[existingIdx] = newEntry;
    } else {
      newPhotos.push(newEntry);
    }

    onPhotosUpdated(newPhotos);

    if (currentIndex < DENTAL_POSITIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setTimeout(() => {
        onCompleteScan();
      }, 300);
    }
  };

  const currentPhotoForPosition = capturedPhotos.find((p) => p.positionId === currentPosition.id);
  const capturedCount = capturedPhotos.length;

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="flex-1 flex flex-col items-center p-3 max-w-md w-full mx-auto pb-28 min-h-[calc(100vh-64px)] justify-between"
    >
      <canvas ref={canvasRef} className="hidden" />

      <div className="w-full flex items-center justify-between gap-2 mb-2">
        <button
          onClick={onCancel}
          className="text-xs font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back
        </button>

        <div className="text-center">
          <span className="text-xs font-extrabold text-[#33b5e5] uppercase tracking-wider bg-[#cfe6f2] px-3 py-1 rounded-full">
            Photo {currentIndex + 1} of 9 ({currentPosition.code})
          </span>
        </div>
      </div>

      <div className="w-full bg-slate-100 p-1.5 rounded-xl border border-slate-200 mb-3 overflow-x-auto custom-scrollbar">
        <div className="flex gap-1.5 min-w-max justify-center">
          {DENTAL_POSITIONS.map((pos, idx) => {
            const isCaptured = capturedPhotos.some((p) => p.positionId === pos.id);
            const isSelected = idx === currentIndex;
            return (
              <button
                key={pos.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-[#33b5e5] text-white shadow-sm scale-105'
                    : isCaptured
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{pos.code}</span>
                {isCaptured && <span className="material-symbols-outlined text-[12px]">check_circle</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative w-full aspect-4/3 bg-slate-900 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-800 flex items-center justify-center">
        {flashEffect && <div className="absolute inset-0 bg-white z-30 animate-ping opacity-75" />}

        {cameraError ? (
          <div className="p-6 text-center text-white flex flex-col items-center justify-center gap-3">
            <span className="material-symbols-outlined text-4xl text-[#33b5e5]">videocam_off</span>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xs">{cameraError}</p>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-700 mt-2 bg-slate-800">
              <img
                src={currentPosition.defaultImage}
                alt={currentPosition.fullTitle}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                Simulated View
              </div>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 border-2 border-[#33b5e5]/40 pointer-events-none flex flex-col justify-between p-4">
          <div className="flex justify-between items-center text-white text-[11px] bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full self-center">
            <span className="font-bold">{currentPosition.fullTitle}</span>
          </div>

          <div className="self-center w-3/4 h-2/3 border-2 border-dashed border-[#33b5e5] rounded-3xl flex items-center justify-center bg-[#33b5e5]/10">
            <span className="text-[11px] font-bold text-white bg-black/60 px-3 py-1 rounded-full uppercase tracking-wider">
              Align {currentPosition.label} Teeth
            </span>
          </div>

          <div className="text-center text-[10px] text-white/80 bg-black/40 py-0.5 rounded-full">
            Hold camera steady & ensure clear light
          </div>
        </div>

        {!cameraError && (
          <button
            onClick={() => setFacingMode(facingMode === 'user' ? 'environment' : 'user')}
            className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-20"
            title="Switch Camera"
          >
            <span className="material-symbols-outlined text-lg">flip_camera_ios</span>
          </button>
        )}
      </div>

      <div className="w-full mt-3 p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-9 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
            {currentPhotoForPosition ? (
              <img
                src={currentPhotoForPosition.dataUrl}
                alt="Captured"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">{currentPosition.fullTitle}</p>
            <p className="text-[11px] text-slate-500">
              {currentPhotoForPosition ? 'Photo captured' : 'Ready to capture'}
            </p>
          </div>
        </div>

        {currentPhotoForPosition && (
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Saved
          </span>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#f7fafc] border-t border-[#bdc8cf] p-4 z-40 max-w-md mx-auto">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
            }}
            disabled={currentIndex === 0}
            className="p-3 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 disabled:opacity-40 transition-all flex items-center justify-center"
            title="Previous Position"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <button
            onClick={capturePhoto}
            className="flex-1 bg-[#33b5e5] text-white h-14 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">photo_camera</span>
            CAPTURE {currentPosition.code} ({currentIndex + 1}/9)
          </button>

          {capturedCount >= 1 ? (
            <button
              onClick={onCompleteScan}
              className="p-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-all flex items-center justify-center shadow-sm"
              title="Confirm Captured Photos"
            >
              <span className="material-symbols-outlined">check</span>
            </button>
          ) : (
            <button
              onClick={() => {
                if (currentIndex < DENTAL_POSITIONS.length - 1) setCurrentIndex(currentIndex + 1);
              }}
              disabled={currentIndex === DENTAL_POSITIONS.length - 1}
              className="p-3 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 disabled:opacity-40 transition-all flex items-center justify-center"
              title="Next Position"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          )}
        </div>
      </div>
    </motion.main>
  );
};
