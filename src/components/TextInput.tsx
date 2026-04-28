import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export default function TextInput({ value, onChange, isLoading }: TextInputProps) {
  const charCount = value.length;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center px-1">
        <label className="text-sm font-medium text-slate-400">Input Text</label>
        <span className={`text-xs ${charCount > 4500 ? 'text-rose-500' : 'text-slate-500'}`}>
          {charCount} / 5000
        </span>
      </div>
      <textarea
        className="input-field min-h-[180px] w-full resize-none transition-all duration-300"
        placeholder="Enter the text you want to convert to speech..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );
}
