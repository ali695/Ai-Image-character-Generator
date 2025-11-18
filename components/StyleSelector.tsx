import React from 'react';
import { ArtStyle } from '../types';

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
        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-800"
      >
        {styles.map(style => (
          <option key={style.id} value={style.id} className="bg-gray-800 text-white">
            {style.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};
