export const COLORS = {
  // Midnight Obsidian & Space Foundation
  VOID: '#030305',
  INK_950: '#070709',
  INK_900: '#0D0C11',
  INK_800: '#14131A',
  INK_700: '#1E1C26',
  
  // High Contrast Text & Accents
  WHITE: '#FFFFFF',
  SLATE_100: '#F1F1F5',
  SLATE_300: '#D4D4DF',
  SLATE_400: '#9E9DAE',
  SLATE_600: '#5E5C6C',
  
  // Apraxus Signature Electric Indigo & Core Violet (Derived from official brand mark #7B5CFA / #6343EB)
  CORE_INDIGO: '#7B5CFA',
  CORE_VIOLET: '#6343EB',
  CORE_VIOLET_DEEP: '#4F2CE0',
  GLOW_INDIGO: 'rgba(123, 92, 250, 0.45)',
  
  // Cybernetic Secondary Highlights
  CYAN_PULSE: '#38E8F8',
  CYAN_MUTED: 'rgba(56, 232, 248, 0.15)',
  EMERALD_SECURE: '#10B981',
  
  // Architectural 1px Borders
  BORDER_SUBTLE: 'rgba(255, 255, 255, 0.07)',
  BORDER_ACTIVE: 'rgba(123, 92, 250, 0.35)',
  BORDER_CYAN: 'rgba(56, 232, 248, 0.30)',
};

export interface Milestone {
  id: string;
  number: string;
  title: string;
  date: string;
  summary: string;
  status: 'SHIPPED' | 'TESTING' | 'UNDER_DEVELOPMENT' | 'PLANNED' | 'COMING_SOON';
  evidenceUrl?: string;
  nextStep: string;
  category: 'Core' | 'Cryptography' | 'Network' | 'Specification';
}
