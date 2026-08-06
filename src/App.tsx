import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ScreenStep, CapturedPhoto } from './types';
import { Header } from './components/Header';
import { ScanInstructions } from './components/ScanInstructions';
import { CameraView } from './components/CameraView';
import { ScanReview } from './components/ScanReview';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { useSaveScan } from './features/scans/hooks/useScans';
import { DEFAULT_PATIENT } from './data';
import { AuthProvider, AuthContext } from './features/auth/AuthContext';
import { LoginPage } from './features/auth/components/LoginPage';
import { useAuth } from './features/auth/hooks/useAuth';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState<ScreenStep>('instructions');
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([]);
  const [lastScanId, setLastScanId] = useState<number | undefined>(undefined);

  const saveScanMutation = useSaveScan();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7fafc] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#33b5e5] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const handleStartScan = () => {
    setCurrentStep('camera');
  };

  const handlePhotosUpdated = (photos: CapturedPhoto[]) => {
    setCapturedPhotos(photos);
  };

  const handleCompleteScan = () => {
    setCurrentStep('review');
  };

  const handleRescan = () => {
    setCurrentStep('camera');
  };

  const handleConfirmPhotos = async () => {
    setCurrentStep('processing');

    try {
      const visitId = "v1-placeholder";

      const result = await saveScanMutation.mutateAsync({
        visitId,
        photos: capturedPhotos
      });

      setLastScanId(result.id);
      console.log('Scan saved successfully, ID:', result.id);
    } catch (error) {
      console.error('Failed to save scan:', error);
    }
  };

  const handleNextFromProcessing = () => {
    setCurrentStep('results');
  };

  const handleHome = () => {
    setCurrentStep('instructions');
  };

  const handleResetApp = () => {
    setCapturedPhotos([]);
    setLastScanId(undefined);
    setCurrentStep('instructions');
  };

  const handleRetakePosition = (_positionId: string) => {
    setCurrentStep('camera');
  };

  return (
    <div className="min-h-screen bg-[#f7fafc] text-[#181c1e] font-['Manrope',sans-serif] flex flex-col w-full max-w-[420px] mx-auto shadow-2xl relative border-x border-[#bdc8cf]/30">
      <Header
        currentStep={currentStep}
        onNavigate={(step) => setCurrentStep(step)}
        onResetApp={handleResetApp}
      />

      <div className="flex-1 flex flex-col relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentStep === 'instructions' && (
            <ScanInstructions key="instructions" onStartScan={handleStartScan} />
          )}

          {currentStep === 'camera' && (
            <CameraView
              key="camera"
              capturedPhotos={capturedPhotos}
              onPhotosUpdated={handlePhotosUpdated}
              onCompleteScan={handleCompleteScan}
              onCancel={() => setCurrentStep('instructions')}
            />
          )}

          {currentStep === 'review' && (
            <ScanReview
              key="review"
              capturedPhotos={capturedPhotos}
              onRescan={handleRescan}
              onConfirmPhotos={handleConfirmPhotos}
              onRetakePosition={handleRetakePosition}
            />
          )}

          {currentStep === 'processing' && (
            <ProcessingScreen
              key="processing"
              onNext={handleNextFromProcessing}
            />
          )}

          {currentStep === 'results' && (
            <ResultsScreen
              key="results"
              capturedPhotos={capturedPhotos}
              onHome={handleHome}
              scanId={lastScanId}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
