import React, { useState } from 'react';
import { ScreenStep } from '../types';
import { ScanService } from '../features/scans/services/scan.service';
import { useAuth } from '../features/auth/hooks/useAuth';

interface HeaderProps {
  currentStep: ScreenStep;
  onNavigate?: (step: ScreenStep) => void;
  onResetApp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onNavigate, onResetApp }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, user } = useAuth();

  return (
    <>
      <header className="border-b border-[#bdc8cf] shrink-0 bg-[#33b5e5] sticky top-0 z-40 w-full shadow-sm">
        <div className="px-4 h-16 flex items-center justify-between gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:bg-white/15 rounded-full transition-colors flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <h1 className="text-[20px] sm:text-[24px] font-bold text-white tracking-tight">
              Plaque Diagnosis
            </h1>
          </div>

          <div className="flex items-center gap-2 text-white/90 text-xs font-semibold bg-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
            {currentStep === 'instructions' && 'Instructions'}
            {currentStep === 'camera' && 'Camera Scan'}
            {currentStep === 'review' && 'Photo Review'}
            {currentStep === 'processing' && 'Processing'}
            {currentStep === 'results' && 'Diagnosis Dashboard'}
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="p-4 bg-[#33b5e5] text-white flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg">Plaque Diagnosis</h2>
                <p className="text-xs text-white/80">Clinical Suite v2.4</p>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Authenticated User</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{user?.name || 'Administrator'}</p>
              <p className="text-xs text-slate-600 mt-0.5">Role: {user?.role || 'admin'}</p>
            </div>

            <nav className="p-3 flex-1 overflow-y-auto space-y-1">
              <p className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Workflow Navigation
              </p>

              <button
                onClick={() => {
                  onNavigate?.('instructions');
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg font-medium text-sm flex items-center gap-3 transition-colors ${
                  currentStep === 'instructions' ? 'bg-[#cfe6f2] text-[#004359] font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">info</span>
                1. Scan Instructions
              </button>

              <button
                onClick={() => {
                  onNavigate?.('camera');
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg font-medium text-sm flex items-center gap-3 transition-colors ${
                  currentStep === 'camera' ? 'bg-[#cfe6f2] text-[#004359] font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                2. Live Camera Capture
              </button>

              <button
                onClick={() => {
                  onNavigate?.('review');
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg font-medium text-sm flex items-center gap-3 transition-colors ${
                  currentStep === 'review' ? 'bg-[#cfe6f2] text-[#004359] font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
                3. Photo Review (9 Slots)
              </button>

              <button
                onClick={() => {
                  onNavigate?.('processing');
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg font-medium text-sm flex items-center gap-3 transition-colors ${
                  currentStep === 'processing' ? 'bg-[#cfe6f2] text-[#004359] font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">sync</span>
                4. Processing Analysis
              </button>

              <button
                onClick={() => {
                  onNavigate?.('results');
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg font-medium text-sm flex items-center gap-3 transition-colors ${
                  currentStep === 'results' ? 'bg-[#cfe6f2] text-[#004359] font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">analytics</span>
                5. Diagnostic Results
              </button>
            </nav>

            <div className="p-4 border-t border-slate-200">
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-rose-100"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
