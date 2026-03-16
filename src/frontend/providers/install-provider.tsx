'use client';

import { type ReactNode, createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallContextType {
  canInstall: boolean;
  isInstalled: boolean;
  triggerInstall: () => Promise<void>;
}

const InstallContext = createContext<InstallContextType>({
  canInstall: false,
  isInstalled: false,
  triggerInstall: async () => {},
});

export const useInstall = () => useContext(InstallContext);

interface InstallProviderProps {
  children: ReactNode;
}

export const InstallProvider = ({ children }: InstallProviderProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handlePrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handlePrompt);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const triggerInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const value = useMemo(() => ({
    canInstall: !!deferredPrompt && !isInstalled,
    isInstalled,
    triggerInstall,
  }), [deferredPrompt, isInstalled, triggerInstall]);

  return (
    <InstallContext.Provider value={value}>
      {children}
    </InstallContext.Provider>
  );
};
