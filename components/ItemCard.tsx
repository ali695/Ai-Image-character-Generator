import React from 'react';
import { Download, ChevronsUp, Loader2, PlayCircle } from 'lucide-react';
import { GeneratedItem } from '../types';
import { downloadImage, downloadVideoFromUrl } from '../utils/fileUtils';

interface ItemCardProps {
  item: GeneratedItem;
  onUpscale: (id: string) => void;
  isUpscaling: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onUpscale, isUpscaling }) => {
  const handleDownload = () => {
    const safePrompt = item.prompt.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    if (item.type === 'image') {
      downloadImage(item.data, `character_${safePrompt}.png`, item.mimeType);
    } else {
      downloadVideoFromUrl(item.data, `character_${safePrompt}.mp4`);
    }
  };

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg shadow-lg animate-fadeIn">
      {item.type === 'image' ? (
        <img
          src={`data:${item.mimeType || 'image/png'};base64,${item.data}`}
          alt={item.prompt}
          className="w-full h-full object-cover transition-transform transform group-hover:scale-105"
        />
      ) : (
        <>
          <video
            src={item.data}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <PlayCircle size={48} className="text-white/80" />
          </div>
        </>
      )}

      {isUpscaling && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
            <p className="text-white mt-2 text-sm">Upscaling...</p>
        </div>
      )}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 z-10 ${isUpscaling ? '!opacity-0' : ''}`}>
        <p className="text-white text-xs line-clamp-3 drop-shadow-md">{item.prompt}</p>
        <div className="self-end flex items-center gap-2">
           {item.type === 'image' && (
             <button
              onClick={() => onUpscale(item.id)}
              disabled={isUpscaling}
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              aria-label="Upscale image"
              title="Upscale Image"
            >
              <ChevronsUp size={16} />
            </button>
           )}
          <button
            onClick={handleDownload}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors shadow-lg"
            aria-label="Download item"
            title="Download"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};