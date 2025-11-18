
import React, { useCallback } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface UploadBoxProps {
  onImageUpload: (file: File) => void;
  referenceImage: string | null;
  setReferenceImage: (image: string | null) => void;
}

export const UploadBox: React.FC<UploadBoxProps> = ({ onImageUpload, referenceImage, setReferenceImage }) => {
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFile(event.dataTransfer.files[0]);
    }
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFile(event.target.files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  if (referenceImage) {
    return (
      <div className="relative">
        <img src={referenceImage} alt="Reference character" className="w-full rounded-lg" />
        <button
          onClick={() => setReferenceImage(null)}
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5"
          aria-label="Remove image"
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-gray-800 transition-colors"
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-400">
          <span className="font-semibold text-indigo-400">Upload for consistency</span> or drag & drop.
        </p>
        <p className="text-xs text-gray-500 mt-1">For best results, use a clear, front-facing photo of a single person.</p>
      </label>
    </div>
  );
};
