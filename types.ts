import { ReactNode } from 'react';

export interface Slide {
  title: string;
  subtitle?: string;
  content: ReactNode;
}