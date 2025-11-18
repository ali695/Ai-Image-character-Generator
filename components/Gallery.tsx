import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { GeneratedItem } from '../types';
import { downloadAllAsZip } from '../utils/fileUtils';
import { ItemCard } from './ItemCard';

interface GalleryProps {
  items: GeneratedItem[];
  setItems: React.Dispatch<React.SetStateAction<GeneratedItem[]>>;
  onUpscale: (id: string) => void;
  upscalingId: string | null;
}

export const Gallery: React.FC<GalleryProps> = ({ items, setItems, onUpscale, upscalingId }) => {

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all generated items? This action cannot be undone.')) {
      setItems([]);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Creations</h2>
        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadAllAsZip(items)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors"
            >
              <Download size={16} /> Download All
            </button>
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors"
            >
              <Trash2 size={16} /> Clear All
            </button>
          </div>
        )}
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[80vh] overflow-y-auto pr-2">
          {items.map(item => (
            <ItemCard 
              key={item.id} 
              item={item} 
              onUpscale={onUpscale} 
              isUpscaling={upscalingId === item.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 border-2 border-dashed border-gray-600 rounded-lg p-8">
          <p className="text-lg">Your generated images and videos will appear here.</p>
          <p className="text-sm">Use the controls on the left to start creating!</p>
        </div>
      )}
    </div>
  );
};