import React from 'react';
import { ArtStyle } from '../types';
import { ChevronDown } from 'lucide-react';

interface StyleSelectorProps {
  styles: ArtStyle[];
  selectedStyle: ArtStyle;
  onSelectStyle: (style: ArtStyle) => void;
  disabled?: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle, disabled = false }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStyleId = event.target.value;
    const style = styles.find(s => s.id === selectedStyleId);
    if (style) {
      onSelectStyle(style);
    }
  };

  return (
    <div className="relative">
      <select
        value={selectedStyle.id}
        onChange={handleChange}
        disabled={disabled}
        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-black/40 text-gray-200"
      >
        {styles.map(style => (
          <option key={style.id} value={style.id} className="bg-gray-900 text-white">
            {style.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
        <ChevronDown size={20} />
      </div>
    </div>
  );
};