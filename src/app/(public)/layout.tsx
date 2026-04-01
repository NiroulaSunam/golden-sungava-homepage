'use client';

import { Header, Footer, FloatingCTA } from '@/components/public/layout';
import { SwRegister } from '@/components/shared/sw-register';
import { InstallPrompt } from '@/components/shared/install-prompt';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SwRegister />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingCTA />
      <InstallPrompt />
    </>
  );
};

export default PublicLayout;
