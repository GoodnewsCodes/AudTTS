import React from 'react';
import { Voice } from '@/lib/elevenlabs';

interface VoiceSelectorProps {
  voices: Voice[];
  selectedVoiceId: string;
  onSelect: (id: string) => void;
  isLoading: boolean;
}

export default function VoiceSelector({ voices, selectedVoiceId, onSelect, isLoading }: VoiceSelectorProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-slate-400 px-1">Select Voice</label>
      <div className="relative group">
        <select
          value={selectedVoiceId}
          onChange={(e) => onSelect(e.target.value)}
          disabled={isLoading || voices.length === 0}
          className="input-field w-full appearance-none cursor-pointer pr-10"
        >
          {voices.length === 0 && <option value="">Loading voices...</option>}
          {voices.map((voice) => {
            const isRecommended = voice.name.includes('Bella') || voice.name.includes('Matilda');
            return (
              <option key={voice.voice_id} value={voice.voice_id} className="bg-slate-900 text-white">
                {voice.name} {voice.labels?.accent ? `(${voice.labels.accent})` : ''} {isRecommended ? '⭐ (Recommended for Tutorials/SaaS)' : ''}
              </option>
            );
          })}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </div>
  );
}
