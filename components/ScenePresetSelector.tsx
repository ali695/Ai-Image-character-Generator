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
      <div className="grid grid-cols-3 gap-2">
        {SCENE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className={`text-xs text-center p-2 rounded-md transition-all duration-200 border-2 ${
              selectedPreset?.id === preset.id
                ? 'bg-indigo-600 border-indigo-400 text-white font-semibold'
                : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-indigo-500 hover:bg-gray-700'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
};