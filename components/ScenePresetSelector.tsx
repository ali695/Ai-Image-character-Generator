import React from 'react';
import { ScenePreset } from '../types';
import { SCENE_PRESETS } from '../constants';

interface ScenePresetSelectorProps {
  selectedPreset: ScenePreset | null;
  onSelectPreset: (preset: ScenePreset | null) => void;
}

export const ScenePresetSelector: React.FC<ScenePresetSelectorProps> = ({ selectedPreset, onSelectPreset }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Or choose a scene preset
      </label>
      <div className="flex flex-wrap gap-2">
        {SCENE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className={`text-xs text-center px-3 py-1.5 rounded-full transition-all duration-200 border ${
              selectedPreset?.id === preset.id
                ? 'bg-purple-600 border-purple-400 text-white font-semibold shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                : 'bg-black/20 border-white/10 text-gray-300 hover:border-purple-500 hover:text-white'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
};