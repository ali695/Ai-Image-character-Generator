import React, { useCallback } from 'react';
import { UploadCloud, X, PlusCircle } from 'lucide-react';

interface UploadBoxProps {
  onImagesUpload: (files: File[]) => void;
  referenceImages: string[];
  onImageRemove: (index: number) => void;
  maxImages?: number;
}

export const UploadBox: React.FC<UploadBoxProps> = ({ onImagesUpload, referenceImages, onImageRemove, maxImages = 3 }) => {
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      handleFiles(Array.from(event.dataTransfer.files));
    }
  }, [referenceImages.length]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(Array.from(event.target.files));
      // Reset file input to allow uploading the same file again
      event.target.value = '';
    }
  };
  
  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length > 0) {
      if (referenceImages.length + imageFiles.length > maxImages) {
        alert(`You can upload a maximum of ${maxImages} images.`);
        onImagesUpload(imageFiles.slice(0, maxImages - referenceImages.length));
      } else {
        onImagesUpload(imageFiles);
      }
    } else if (files.length > 0) {
      alert('Please upload valid image files.');
    }
  };

  return (
    <div>
      {referenceImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {referenceImages.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <img src={image} alt={`Reference ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              <button
                onClick={() => onImageRemove(index)}
                className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {referenceImages.length < maxImages && (
             <label htmlFor="file-upload-add" className="cursor-pointer aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg text-center hover:border-indigo-500 hover:bg-gray-800 transition-colors">
                <PlusCircle className="h-8 w-8 text-gray-400"/>
                <span className="text-xs mt-1 text-gray-400">Add more</span>
             </label>
          )}
        </div>
      )}

      {referenceImages.length === 0 && (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-gray-800 transition-colors"
        >
          <input
            type="file"
            id="file-upload-initial"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload-initial" className="cursor-pointer">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-400">
              <span className="font-semibold text-indigo-400">Upload up to {maxImages} references</span> or drag & drop.
            </p>
            <p className="text-xs text-gray-500 mt-1">For best results, use clear photos of the same character.</p>
          </label>
        </div>
      )}
      {/* Hidden input for the "Add more" button */}
       <input
        type="file"
        id="file-upload-add"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
};
