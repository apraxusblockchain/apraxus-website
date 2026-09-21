import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { WagmiProvider } from '@/components/providers/WagmiProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Apraxus — Infrastructure for the Autonomous Economy',
  description: 'Apraxus is building blockchain infrastructure for AI agents, programmable payments, and secure machine-to-machine transactions.',
  keywords: ['AI agents', 'blockchain', 'programmable payments', 'machine to machine', 'crypto', 'Rust', 'policy engine'],
  openGraph: {
    title: 'Apraxus — Infrastructure for the Autonomous Economy',
    description: 'A blockchain being built for AI agents, programmable payments, and secure machine-to-machine transactions.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0A0D] text-white min-h-screen flex flex-col selection:bg-[#6B35D5] selection:text-white`}>
        <WagmiProvider>
          <SmoothScrollProvider>
          {/* Subtle cinematic noise layer */}
          <div className="noise-bg" />

          {/* Desktop Custom Cursor */}
          <CustomCursor />

          {/* Global Navigation Header */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1 flex flex-col">
            {children}
          </main>

          {/* Global Footer */}
          <Footer />
          </SmoothScrollProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
