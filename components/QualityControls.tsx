import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { BATCH_SIZES, ASPECT_RATIOS, DETAIL_LEVELS } from '../constants';
import { ArtStyle } from '../types';

interface QualityControlsProps {
  batchSize: number;
  setBatchSize: (size: number) => void;
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
  detailLevel: { id: string, name: string, prompt_suffix: string };
  setDetailLevel: (level: { id: string, name: string, prompt_suffix: string }) => void;
  imageFormat: 'image/png' | 'image/jpeg';
  setImageFormat: (format: 'image/png' | 'image/jpeg') => void;
  enhanceQuality: boolean;
  setEnhanceQuality: (enhanced: boolean) => void;
}

const ControlWrapper: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    {children}
  </div>
);

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; label: string; disabled?: boolean; }> = ({ checked, onChange, label, disabled = false }) => (
  <div className="flex items-center justify-between">
    <span className={`text-sm font-medium ${disabled ? 'text-gray-500' : 'text-gray-300'}`}>{label}</span>
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
        checked ? 'bg-indigo-600' : 'bg-gray-600'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

export const QualityControls: React.FC<QualityControlsProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-semibold"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} />
          <span>Advanced Quality Controls</span>
        </div>
        <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-6 border-t border-gray-700 grid grid-cols-2 gap-4">
          <ControlWrapper label="Batch Size">
            <select
              value={props.batchSize}
              onChange={(e) => props.setBatchSize(Number(e.target.value))}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-2 appearance-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              {BATCH_SIZES.map(size => <option key={size} value={size}>{size} Images</option>)}
            </select>
          </ControlWrapper>
          <ControlWrapper label="Aspect Ratio">
             <select
              value={props.aspectRatio}
              onChange={(e) => props.setAspectRatio(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-2 appearance-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              {ASPECT_RATIOS.map(ratio => <option key={ratio.id} value={ratio.id}>{ratio.name}</option>)}
            </select>
          </ControlWrapper>
          <ControlWrapper label="Detail Level">
             <select
              value={props.detailLevel.id}
              onChange={(e) => props.setDetailLevel(DETAIL_LEVELS.find(l => l.id === e.target.value) || DETAIL_LEVELS[2])}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-2 appearance-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              {DETAIL_LEVELS.map(level => <option key={level.id} value={level.id}>{level.name}</option>)}
            </select>
          </ControlWrapper>
          <ControlWrapper label="Image Format">
            <div className="flex items-center bg-gray-700/50 border border-gray-600 rounded-lg p-1">
              <button onClick={() => props.setImageFormat('image/png')} className={`flex-1 text-sm py-1 rounded-md transition-colors ${props.imageFormat === 'image/png' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}>PNG</button>
              <button onClick={() => props.setImageFormat('image/jpeg')} className={`flex-1 text-sm py-1 rounded-md transition-colors ${props.imageFormat === 'image/jpeg' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}>JPG</button>
            </div>
          </ControlWrapper>
          <div className="col-span-2">
            <Toggle 
              label="Enhance Quality (3D Style)" 
              checked={props.enhanceQuality} 
              onChange={props.setEnhanceQuality}
            />
          </div>
        </div>
      )}
    </div>
  );
};