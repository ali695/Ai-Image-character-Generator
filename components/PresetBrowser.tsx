import React, { useState, useMemo, useEffect } from 'react';
import { X, Search, Star } from 'lucide-react';
import { PRESET_CATEGORIES } from '../presets';
import useLocalStorage from '../hooks/useLocalStorage';
import { Preset } from '../types';

interface PresetBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (prompt: string) => void;
}

export const PresetBrowser: React.FC<PresetBrowserProps> = ({ isOpen, onClose, onSelectPreset }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteIds, setFavoriteIds] = useLocalStorage<string[]>('preset-favorites', []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const allPresets = useMemo(() => PRESET_CATEGORIES.flatMap(cat => cat.presets), []);

  const favoritePresets = useMemo(() => {
    return favoriteIds.map(id => allPresets.find(p => p.id === id)).filter(Boolean) as Preset[];
  }, [favoriteIds, allPresets]);

  const toggleFavorite = (presetId: string) => {
    setFavoriteIds(prev =>
      prev.includes(presetId)
        ? prev.filter(id => id !== presetId)
        : [...prev, presetId]
    );
  };

  const filteredCategories = useMemo(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = PRESET_CATEGORIES
      .map(category => ({
        ...category,
        presets: category.presets.filter(preset =>
          preset.name.toLowerCase().includes(lowercasedFilter) ||
          preset.prompt.toLowerCase().includes(lowercasedFilter)
        ),
      }))
      .filter(category => category.presets.length > 0);
    
    // If searching, don't show empty categories
    if(searchTerm.trim()) {
        return filtered;
    }
    return PRESET_CATEGORIES;

  }, [searchTerm]);

  if (!isOpen) return null;

  const renderPresetGrid = (presets: Preset[], categoryId: string) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {presets.map((preset, index) => (
        <div
          key={`${categoryId}-${preset.id}`}
          className="relative group animate-fadeIn"
          style={{ animationDelay: `${index * 15}ms`}}
        >
          <button
            onClick={() => onSelectPreset(preset.prompt)}
            className="w-full h-24 flex flex-col items-center justify-center text-center p-2 bg-black/20 border border-white/10 rounded-lg hover:bg-purple-500/20 hover:border-purple-500 transition-all duration-200"
          >
            <preset.icon size={24} className="mb-2 text-gray-300" />
            <span className="text-xs font-medium text-gray-300">{preset.name}</span>
          </button>
          <button
            onClick={() => toggleFavorite(preset.id)}
            className="absolute top-2 right-2 p-1 bg-black/30 rounded-full text-gray-400 hover:text-yellow-400 transition-colors opacity-50 group-hover:opacity-100"
            title={favoriteIds.includes(preset.id) ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Star size={14} className={favoriteIds.includes(preset.id) ? "fill-current text-yellow-400" : ""} />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={onClose}>
      <div className="glass-card rounded-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-100">Preset Browser</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/10 flex-shrink-0">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search presets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {searchTerm.trim() === '' && favoritePresets.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-yellow-400 mb-3">
                <Star size={18} /> Favorites
              </h3>
              {renderPresetGrid(favoritePresets, 'favorites')}
            </div>
          )}

          {filteredCategories.map(category => (
            (category.presets.length > 0) && (
              <div key={category.id}>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-300 mb-3">
                  <category.icon size={18} /> {category.name}
                </h3>
                {renderPresetGrid(category.presets, category.id)}
              </div>
            )
          ))}

          {filteredCategories.length === 0 && (
             <div className="text-center py-10 text-gray-500">
               <p className="font-semibold">No presets found</p>
               <p className="text-sm">Try a different search term.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};