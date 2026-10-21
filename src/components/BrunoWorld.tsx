import React from 'react';
import { BrunoCityWorld } from './BrunoCityWorld';

interface BrunoWorldProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenArcade?: (gameId: string, title: string) => void;
}

export const BrunoWorld: React.FC<BrunoWorldProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#93c5fd] flex flex-col">
      <BrunoCityWorld
        isFullPage={true}
        onClose={onClose}
        onOpenSaaS={() => {
          onClose();
          const el = document.getElementById('software');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCinema={() => {
          onClose();
          const el = document.getElementById('cinema');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
};
