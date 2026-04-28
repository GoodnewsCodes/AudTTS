'use client';

import { useState, useEffect } from 'react';
import TextInput from '@/components/TextInput';
import VoiceSelector from '@/components/VoiceSelector';
import AudioPlayer from '@/components/AudioPlayer';
import { Voice } from '@/lib/elevenlabs';

export default function Home() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVoices() {
      try {
        const res = await fetch('/api/voices');
        const data = await res.json();
        if (data.voices && data.voices.length > 0) {
          const sortedVoices = data.voices.sort((a: Voice, b: Voice) => a.name.localeCompare(b.name));
          setVoices(sortedVoices);
          const defaultVoice = sortedVoices.find((v: Voice) => v.name.includes('Bella') || v.name.includes('Matilda')) || sortedVoices[0];
          setSelectedVoiceId(defaultVoice.voice_id);
        }
      } catch (err) {
        console.error("Failed to fetch voices", err);
      }
    }
    fetchVoices();
  }, []);

  const handleGenerate = async () => {
    if (!text || !selectedVoiceId) return;

    setIsLoading(true);
    setAudioUrl(null);
    setError(null);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceId: selectedVoiceId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err: any) {
      setError(err.message || "Failed to generate speech");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-transparent">
      <main className="w-full max-w-2xl px-6 py-12 md:py-24 flex flex-col gap-12">
        
        {/* Header Section */}
        <header className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Neural Voice Synthesis
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            Aud<span className="gradient-text">TTS</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-md mx-auto font-light leading-relaxed">
            Convert text into lifelike speech with ultra-realistic AI voices.
          </p>
        </header>

        {/* Main Interface Group */}
        <section className="space-y-6">
          <div className="glass-panel p-6 md:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <TextInput 
              value={text} 
              onChange={setText} 
              isLoading={isLoading} 
            />
            
            <VoiceSelector 
              voices={voices} 
              selectedVoiceId={selectedVoiceId} 
              onSelect={setSelectedVoiceId} 
              isLoading={isLoading} 
            />

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading || !text}
              className="primary-button group"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  <span>Generate Speech</span>
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <AudioPlayer audioUrl={audioUrl} />
        </section>

        {/* Footer info */}
        <footer className="text-center space-y-2 animate-in fade-in duration-1000 delay-500">
          <div className="text-slate-500 text-xs font-medium uppercase tracking-tighter opacity-50">
            Powered by ElevenLabs Multilingual v2
          </div>
          <div className="text-[10px] text-slate-600">
            Built with Next.js 14 • Premium Design System v1.0
          </div>
        </footer>
      </main>
    </div>
  );
}
