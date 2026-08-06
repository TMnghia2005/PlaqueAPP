import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DEFAULT_PATIENT } from '../data';
import { CapturedPhoto, PatientInfo } from '../types';

interface ResultsScreenProps {
  capturedPhotos: CapturedPhoto[];
  patientInfo?: PatientInfo;
  onHome: () => void;
  scanId?: number;
}

interface ToothOPI {
  number: string;
  name: string;
  opiScore: number;
  severity: 'low' | 'moderate' | 'high';
  positionCode: string;
}

const TOOTH_OPI_DATA: ToothOPI[] = [
  { number: '17-14', name: 'Top Left (A1)', opiScore: 1.1, severity: 'low', positionCode: 'A1' },
  { number: '13-23', name: 'Top Middle (A2)', opiScore: 0.9, severity: 'low', positionCode: 'A2' },
  { number: '24-27', name: 'Top Right (A3)', opiScore: 1.3, severity: 'low', positionCode: 'A3' },
  { number: '13-11', name: 'Central Left (B1)', opiScore: 1.8, severity: 'moderate', positionCode: 'B1' },
  { number: '11-21', name: 'Central Middle (B2)', opiScore: 2.1, severity: 'moderate', positionCode: 'B2' },
  { number: '21-23', name: 'Central Right (B3)', opiScore: 1.7, severity: 'moderate', positionCode: 'B3' },
  { number: '47-44', name: 'Bottom Left (C1)', opiScore: 2.6, severity: 'high', positionCode: 'C1' },
  { number: '43-33', name: 'Bottom Middle (C2)', opiScore: 2.9, severity: 'high', positionCode: 'C2' },
  { number: '34-37', name: 'Bottom Right (C3)', opiScore: 2.4, severity: 'high', positionCode: 'C3' },
];

interface SextantData {
  id: string;
  code: string;
  name: string;
  teethRange: string;
  coveragePct: number;
  opiAverage: number;
  status: 'Mild' | 'Moderate' | 'Severe';
  colorClass: string;
  bgClass: string;
  badgeBg: string;
}

const SEXTANT_MAP: SextantData[] = [
  { id: 'S1', code: 'S1', name: 'Top Left', teethRange: '18-14', coveragePct: 18, opiAverage: 1.1, status: 'Mild', colorClass: 'text-emerald-700', bgClass: 'bg-emerald-50/80 border-emerald-200', badgeBg: 'bg-emerald-100 text-emerald-800' },
  { id: 'S2', code: 'S2', name: 'Top Middle', teethRange: '13-23', coveragePct: 24, opiAverage: 1.4, status: 'Mild', colorClass: 'text-emerald-700', bgClass: 'bg-emerald-50/80 border-emerald-200', badgeBg: 'bg-emerald-100 text-emerald-800' },
  { id: 'S3', code: 'S3', name: 'Top Right', teethRange: '24-28', coveragePct: 22, opiAverage: 1.3, status: 'Mild', colorClass: 'text-emerald-700', bgClass: 'bg-emerald-50/80 border-emerald-200', badgeBg: 'bg-emerald-100 text-emerald-800' },
  { id: 'S4', code: 'S4', name: 'Central Left', teethRange: '34-38', coveragePct: 42, opiAverage: 2.4, status: 'Moderate', colorClass: 'text-amber-700', bgClass: 'bg-amber-50/80 border-amber-200', badgeBg: 'bg-amber-100 text-amber-800' },
  { id: 'S5', code: 'S5', name: 'Bottom Middle', teethRange: '43-33', coveragePct: 68, opiAverage: 2.9, status: 'Severe', colorClass: 'text-rose-700', bgClass: 'bg-rose-50/80 border-rose-200', badgeBg: 'bg-rose-100 text-rose-800' },
  { id: 'S6', code: 'S6', name: 'Bottom Right', teethRange: '48-44', coveragePct: 48, opiAverage: 2.6, status: 'Moderate', colorClass: 'text-amber-700', bgClass: 'bg-amber-50/80 border-amber-200', badgeBg: 'bg-amber-100 text-amber-800' },
];

interface TreatmentItem {
  id: number;
  title: string;
  loremDetail: string;
}

const TREATMENT_ITEMS: TreatmentItem[] = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet',
    loremDetail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 2,
    title: 'Consectetur adipiscing elit',
    loremDetail: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 3,
    title: 'Sed do eiusmod tempor incididunt',
    loremDetail: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.',
  },
  {
    id: 4,
    title: 'Ut labore et dolore magna aliqua',
    loremDetail: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
  },
];

interface ModalInfo {
  title: string;
  category?: string;
  body: string;
}

const ThreeBarIllustration: React.FC<{ level: 'low' | 'moderate' | 'high' | 'mild' | 'severe' }> = ({ level }) => {
  const isModerate = level === 'moderate' || level === 'high' || level === 'severe';
  const isHigh = level === 'high' || level === 'severe';

  return (
    <div className="flex flex-col gap-[2px] w-4 shrink-0 py-0.5" title={`Severity level: ${level}`}>
      <span className={`w-full h-1.5 rounded-[1px] transition-all ${isHigh ? 'bg-rose-500' : 'bg-slate-200'}`} />
      <span className={`w-full h-1.5 rounded-[1px] transition-all ${isModerate ? 'bg-amber-500' : 'bg-slate-200'}`} />
      <span className="w-full h-1.5 rounded-[1px] bg-emerald-500 transition-all" />
    </div>
  );
};

const LOREM_IPSUM_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  capturedPhotos: _capturedPhotos,
  patientInfo = DEFAULT_PATIENT,
  onHome,
}) => {
  const [selectedSextant, setSelectedSextant] = useState<SextantData | null>(SEXTANT_MAP[4]); // S5 default
  const [showPrintDialog, setShowPrintDialog] = useState<boolean>(false);
  const [infoModal, setInfoModal] = useState<ModalInfo | null>(null);

  const handleOpenDashboardDetails = () => {
    setInfoModal({
      title: 'Lorem ipsum',
      category: 'Lorem ipsum',
      body: LOREM_IPSUM_TEXT,
    });
  };

  const handleOpenSextantDetails = () => {
    setInfoModal({
      title: 'Lorem ipsum',
      category: 'Lorem ipsum',
      body: LOREM_IPSUM_TEXT,
    });
  };

  const handleOpenTeethDetails = () => {
    setInfoModal({
      title: 'Lorem ipsum',
      category: 'Lorem ipsum',
      body: LOREM_IPSUM_TEXT,
    });
  };

  const handleOpenTreatmentGeneralDetails = () => {
    setInfoModal({
      title: 'Lorem ipsum',
      category: 'Lorem ipsum',
      body: LOREM_IPSUM_TEXT,
    });
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex-1 flex flex-col p-3 gap-3 max-w-md w-full mx-auto pb-24 min-h-[calc(100vh-64px)]"
    >
      <section className="bg-white border border-[#bdc8cf] rounded-xl p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#33b5e5]/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#33b5e5] text-base font-bold">
                dentistry
              </span>
            </div>
            <h2 className="text-sm font-extrabold text-[#181c1e]">
              Diagnosis Dashboard
            </h2>
            <button
              onClick={handleOpenDashboardDetails}
              className="text-[#33b5e5] font-bold text-[11px] hover:underline cursor-pointer ml-1"
            >
              More information
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <div className="bg-[#f1f4f6] p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-extrabold text-slate-500 uppercase">Global OPI</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <p className="text-lg font-black text-[#33b5e5] leading-none">1.82</p>
                <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1 py-0.5 rounded">
                  Moderate
                </span>
              </div>
            </div>
            <ThreeBarIllustration level="moderate" />
          </div>

          <div className="bg-[#f1f4f6] p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-extrabold text-slate-500 uppercase">AI Accuracy</p>
              <p className="text-lg font-black text-[#33b5e5] leading-none mt-0.5">92%</p>
            </div>
            <span className="material-symbols-outlined text-[#33b5e5] text-lg">verified</span>
          </div>
        </div>
      </section>

      <section className="bg-white border border-[#bdc8cf] rounded-xl p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#33b5e5] text-base">grid_view</span>
            <h3 className="text-xs font-extrabold text-[#181c1e] uppercase tracking-wider">
              Sextant Severity Map
            </h3>
            <button
              onClick={handleOpenSextantDetails}
              className="text-[#33b5e5] font-bold text-[11px] hover:underline cursor-pointer ml-1"
            >
              Details
            </button>
          </div>
        </div>

        {/* 6 Sextants Compact Grid */}
        <div className="grid grid-cols-3 gap-1.5">
          {SEXTANT_MAP.map((s) => {
            const isSelected = selectedSextant?.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSextant(s)}
                className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  s.bgClass
                } ${isSelected ? 'ring-2 ring-[#33b5e5] shadow-2xs' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-800">{s.code}</span>
                  <span className={`text-[9px] font-bold uppercase ${s.colorClass}`}>{s.status}</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between text-[10px]">
                  <span className="font-extrabold text-slate-900">{s.coveragePct}%</span>
                  <span className="text-slate-500 text-[9px]">OPI {s.opiAverage}</span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedSextant && (
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
            <div className="truncate pr-2">
              <span className="font-bold text-slate-800 text-[11px]">
                {selectedSextant.code} ({selectedSextant.teethRange})
              </span>
              <p className="text-[10px] text-slate-500">
                OPI: <strong className={selectedSextant.colorClass}>{selectedSextant.opiAverage}</strong> • Coverage: <strong>{selectedSextant.coveragePct}%</strong>
              </p>
            </div>
            <span className={`font-bold uppercase text-[9px] px-1.5 py-0.5 rounded ${selectedSextant.badgeBg} shrink-0`}>
              {selectedSextant.status}
            </span>
          </div>
        )}
      </section>

      <section className="bg-white border border-[#bdc8cf] rounded-xl p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#33b5e5] text-base">format_list_bulleted</span>
            <h3 className="text-xs font-extrabold text-[#181c1e] uppercase tracking-wider">
              Per-Tooth OPI Scores
            </h3>
            <button
              onClick={handleOpenTeethDetails}
              className="text-[#33b5e5] font-bold text-[11px] hover:underline cursor-pointer ml-1"
            >
              Details
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100 max-h-44 overflow-y-auto custom-scrollbar pr-3">
          {TOOTH_OPI_DATA.map((item) => (
            <div key={item.positionCode} className="py-1.5 pr-1 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#004359] bg-[#cfe6f2] px-1.5 py-0.5 rounded text-[10px]">
                  {item.positionCode}
                </span>
                <div>
                  <p className="font-bold text-slate-800 text-[11px] leading-tight">{item.name}</p>
                  <p className="text-[9px] text-slate-400">Teeth {item.number}</p>
                </div>
              </div>
              <div className="mr-1 flex items-center gap-2">
                <span className="font-extrabold text-slate-800 text-xs">
                  {item.opiScore.toFixed(1)}
                </span>
                <ThreeBarIllustration level={item.severity} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f1f4f6] border border-[#bdc8cf] rounded-xl p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between border-b border-[#bdc8cf]/60 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#33b5e5] text-base">assignment_turned_in</span>
            <h3 className="text-xs font-extrabold text-[#181c1e] uppercase tracking-wider">
              Treatment plan
            </h3>
            <button
              onClick={handleOpenTreatmentGeneralDetails}
              className="text-[#33b5e5] font-bold text-[11px] hover:underline cursor-pointer ml-1"
            >
              More information
            </button>
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 flex items-center gap-2 text-xs text-rose-800">
          <span className="material-symbols-outlined text-rose-500 text-base shrink-0">
            warning
          </span>
          <p className="font-semibold text-[11px] leading-snug">
            Please present this to a qualified dentist for a clinical review
          </p>
        </div>

        <ol className="flex flex-col gap-1.5 text-xs">
          {TREATMENT_ITEMS.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs"
            >
              <span className="w-4 h-4 rounded-full bg-[#33b5e5] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                {item.id}
              </span>
              <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
                <span className="text-slate-900 font-extrabold text-[11px] truncate">
                  {item.title}
                </span>
                <button
                  onClick={() => setInfoModal({
                    title: 'Lorem ipsum',
                    category: 'Lorem ipsum',
                    body: item.loremDetail,
                  })}
                  className="text-[#33b5e5] font-bold text-[11px] hover:underline cursor-pointer shrink-0"
                >
                  Details
                </button>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xs border-t border-[#bdc8cf] p-3 z-40 max-w-md mx-auto">
        <div className="flex gap-2.5 items-center">
          <button
            onClick={onHome}
            className="flex-1 bg-[#f1f4f6] text-[#181c1e] h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-200 active:scale-[0.98] transition-all border border-[#bdc8cf] cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">home</span>
            <span>HOME</span>
          </button>

          <button
            onClick={() => setShowPrintDialog(true)}
            className="flex-[3] bg-[#33b5e5] text-white h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">print</span>
            PRINT DIAGNOSIS REPORT
          </button>
        </div>
      </footer>

      {/* Unified Information Detail Pop-up Modal */}
      {infoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-3">
            <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
              <div>
                {infoModal.category && (
                  <span className="text-[10px] font-extrabold text-[#33b5e5] uppercase tracking-wider block">
                    {infoModal.category}
                  </span>
                )}
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                  {infoModal.title}
                </h4>
              </div>
              <button
                onClick={() => setInfoModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed py-1">
              <p className="font-medium text-slate-800">
                {infoModal.body}
              </p>
            </div>

            <button
              onClick={() => setInfoModal(null)}
              className="w-full py-2 bg-[#33b5e5] text-white font-bold text-xs rounded-xl hover:brightness-110 cursor-pointer shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.main>
  );
};
