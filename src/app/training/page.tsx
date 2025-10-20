import React from 'react';
// Reuse the existing pages/training component so behaviour and styling stay identical
import TrainingPage from '@/pages/training/training';

export const metadata = {
  title: 'Training | LUM Studios',
};

export default function TrainingAppPage() {
  return <TrainingPage />;
}
