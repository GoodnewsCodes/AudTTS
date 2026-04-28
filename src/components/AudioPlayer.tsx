import React, { useRef, useEffect, useState } from 'react';

interface AudioPlayerProps {
  audioUrl: string | null;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Auto-play failed:", e));
    }
  }, [audioUrl]);

  if (!audioUrl) return null;

  return (
    <div className="glass-panel p-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold gradient-text">Generated Audio</h3>
          <a
            href={audioUrl}
            download="speech.mp3"
            className="text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </a>
        </div>
        
        <audio
          ref={audioRef}
          src={audioUrl}
          className="w-full h-10 accent-primary"
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        <div className="text-[10px] text-center text-slate-500 uppercase tracking-widest">
           ElevenLabs AI Generation
        </div>
      </div>
    </div>
  );
}
