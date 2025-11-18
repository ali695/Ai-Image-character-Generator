import React, { useState, useEffect } from 'react';
import { Sparkles, Package, Loader2, Film, KeyRound } from 'lucide-react';
import { GeneratedItem, ArtStyle, ScenePreset } from '../types';
import { ART_STYLES, DETAIL_LEVELS, ENHANCED_QUALITY_PROMPT } from '../constants';
import { generateImageVariations, upscaleImage, generateVideo } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import useLocalStorage from '../hooks/useLocalStorage';
import { Gallery } from './Gallery';
import { StyleSelector } from './StyleSelector';
import { UploadBox } from './UploadBox';
import { QualityControls } from './QualityControls';
import { ScenePresetSelector } from './ScenePresetSelector';

// Fix: Defined the AIStudio interface and used it in the Window interface
// to resolve the type conflict with other potential global declarations.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [traitsToMaintain, setTraitsToMaintain] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>(ART_STYLES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [generatedItems, setGeneratedItems] = useLocalStorage<GeneratedItem[]>('generatedItems', []);
  const [upscalingId, setUpscalingId] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  // New Quality Control State
  const [batchSize, setBatchSize] = useState<number>(50);
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [detailLevel, setDetailLevel] = useState(DETAIL_LEVELS[2]); // Default to 'High'
  const [imageFormat, setImageFormat] = useState<'image/png' | 'image/jpeg'>('image/png');
  const [enhanceQuality, setEnhanceQuality] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<ScenePreset | null>(null);
  
  // New state for API key selection
  const [hasSelectedApiKey, setHasSelectedApiKey] = useState<boolean>(false);


  const STORAGE_LIMIT = 20;

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        try {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          setHasSelectedApiKey(hasKey);
        } catch (e) {
          console.error("Error checking for API key:", e);
          setHasSelectedApiKey(false);
        }
      }
    };
    checkApiKey();
  }, []);
  
  const handleGenerate = async (bulk = false) => {
    if (!prompt && referenceImages.length === 0) {
      setError('Please provide a prompt or a reference image.');
      return;
    }
    if (referenceImages.length > 0 && !prompt && !selectedPreset) {
      setError('With reference images, please describe the character or select a preset.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setProgress(0);
    const usedReferenceImages = [...referenceImages];
    let caughtError: unknown = null;

    try {
      const count = bulk ? batchSize : 1;
      
      const styleSuffix = enhanceQuality
        ? ENHANCED_QUALITY_PROMPT
        : `${selectedStyle.prompt_suffix}, ${detailLevel.prompt_suffix}`;
        
      const imageResults = await generateImageVariations(
        prompt, count, referenceImages, setProgress, styleSuffix, selectedPreset, aspectRatio, imageFormat, traitsToMaintain
      );

      const newImages: GeneratedItem[] = imageResults.map(result => ({
        id: crypto.randomUUID(), type: 'image', data: result.base64, prompt: result.prompt, mimeType: result.mimeType,
      }));

      setGeneratedItems(prev => [...newImages, ...prev].slice(0, STORAGE_LIMIT));

      if (usedReferenceImages.length > 0) {
        setReferenceImages([]);
        setTraitsToMaintain('');
        setSelectedPreset(null);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
      }
    } catch (err) {
      caughtError = err;
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Error generating images: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      if (caughtError) {
        setProgress(0);
      } else {
        setTimeout(() => setProgress(0), 2000);
      }
    }
  };

  const handleSelectApiKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        // Per guidelines, assume success after dialog to handle race conditions.
        setHasSelectedApiKey(true);
        setError(null); // Clear previous errors to allow retrying animation.
      } catch (e) {
        console.error("Error opening API key selection:", e);
        setError("Could not open the API key selection dialog.");
      }
    } else {
      setError("API key selection is not available in this environment.");
    }
  };
  
  const handleAnimate = async () => {
    if (referenceImages.length !== 1) {
      setError('Please upload exactly one reference image to animate.');
      return;
    }
    const animationPrompt = prompt || selectedPreset?.name || 'A neutral, subtle animation.';
    const referenceImage = referenceImages[0];

    setIsVideoLoading(true);
    setError(null);
    setVideoProgress(0);
    const usedReferenceImage = referenceImage;
    let caughtError: unknown = null;
    
    try {
      const videoUrl = await generateVideo(animationPrompt, referenceImage, setVideoProgress);
      const newVideo: GeneratedItem = {
        id: crypto.randomUUID(),
        type: 'video',
        data: videoUrl,
        prompt: `Animation of: ${animationPrompt}`,
      };
      setGeneratedItems(prev => [newVideo, ...prev].slice(0, STORAGE_LIMIT));
      
       if (usedReferenceImage) {
        setReferenceImages([]);
        setTraitsToMaintain('');
        setSelectedPreset(null);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
      }

    } catch(err) {
      caughtError = err;
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      if (errorMessage.includes('NOT_FOUND') || errorMessage.includes('entity was not found')) {
        setError('Video generation failed. Your API key may be invalid or missing permissions. Please select a different key.');
        setHasSelectedApiKey(false); // Reset to show the select key button again
      } else {
        setError(`Error generating video: ${errorMessage}`);
      }
    } finally {
      setIsVideoLoading(false);
      if (caughtError) {
        setVideoProgress(0);
      } else {
        setTimeout(() => setVideoProgress(0), 2000);
      }
    }
  };


  const handleImagesUpload = async (files: File[]) => {
    const base64Promises = files.map(fileToBase64);
    const base64Images = await Promise.all(base64Promises);
    setReferenceImages(prev => [...prev, ...base64Images]);
  };
  
  const handleImageRemove = (index: number) => {
    setReferenceImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleUpscale = async (imageId: string) => {
    setUpscalingId(imageId);
    setError(null);
    const imageToUpscale = generatedItems.find(item => item.id === imageId && item.type === 'image');
    if (!imageToUpscale) {
      setError('Image not found.');
      setUpscalingId(null);
      return;
    }
    try {
      const upscaledResult = await upscaleImage(imageToUpscale.data, imageToUpscale.mimeType);
      const upscaledImage: GeneratedItem = {
        ...imageToUpscale,
        data: upscaledResult.base64,
        mimeType: upscaledResult.mimeType,
        prompt: imageToUpscale.prompt + ' (Upscaled)',
      };
      setGeneratedItems(prev => prev.map(item => item.id === imageId ? upscaledImage : item));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to upscale image: ${errorMessage}`);
    } finally {
      setUpscalingId(null);
    }
  };
  
  const handlePresetSelection = (preset: ScenePreset | null) => {
    if (!preset) {
        setSelectedPreset(null);
        return;
    }
    
    if (selectedPreset?.id === preset.id) {
        setSelectedPreset(null); // Deselect if clicked again
    } else if (referenceImages.length > 0) {
        setSelectedPreset(preset);
        setPrompt(''); // Clear prompt, as the preset will provide themes for the character
    } else {
        // In prompt-only mode, clicking a preset fills the textarea with a full scene
        setPrompt(preset.prompt_standalone);
        setSelectedPreset(null); // The action is to fill the prompt, not to select a theme
    }
  };

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();
    
    button.appendChild(circle);
  };
  
  const renderGenerateButtonContent = (isBulk: boolean) => {
    if (isLoading) {
      return (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>Generating ({progress.toFixed(0)}%)...</span>
        </>
      );
    }
    return isBulk ? (
      <>
        <Package size={20} /> Generate {batchSize} Variations
      </>
    ) : (
      <>
        <Sparkles size={20} /> Generate Single Image
      </>
    );
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {showSuccessToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg z-50 animate-fadeInOut">
          Reference item(s) used and cleared successfully!
        </div>
      )}
      <div className="lg:col-span-1 flex flex-col gap-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><span className="font-bold text-indigo-400">1.</span> Upload References (Optional)</h2>
          <UploadBox onImagesUpload={handleImagesUpload} referenceImages={referenceImages} onImageRemove={handleImageRemove}/>
           {referenceImages.length > 0 && (
            <p className="text-center text-sm text-green-400 mt-3 p-2 bg-green-900/50 rounded-md border border-green-700">
              Using {referenceImages.length} uploaded image(s) as reference.
            </p>
          )}
        </div>
         <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4"><span className="font-bold text-indigo-400">2.</span> Describe or Choose Preset</h2>
          <textarea
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none h-24 mb-4"
            placeholder={referenceImages.length > 0 ? "e.g., a brave knight, a wizard" : "Describe a scene or character..."}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <ScenePresetSelector selectedPreset={selectedPreset} onSelectPreset={handlePresetSelection} />
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4"><span className="font-bold text-indigo-400">3.</span> Choose a Style</h2>
          <StyleSelector styles={ART_STYLES} selectedStyle={selectedStyle} onSelectStyle={setSelectedStyle} disabled={enhanceQuality}/>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4"><span className="font-bold text-indigo-400">4.</span> Maintain Traits (Optional)</h2>
            <p className="text-sm text-gray-400 mb-2">List specific features to keep consistent, separated by commas.</p>
            <input
                type="text"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="e.g., blue eyes, scar over left eye"
                value={traitsToMaintain}
                onChange={(e) => setTraitsToMaintain(e.target.value)}
                disabled={referenceImages.length === 0}
            />
        </div>
        
        <QualityControls 
          batchSize={batchSize} setBatchSize={setBatchSize}
          aspectRatio={aspectRatio} setAspectRatio={setAspectRatio}
          detailLevel={detailLevel} setDetailLevel={setDetailLevel}
          imageFormat={imageFormat} setImageFormat={setImageFormat}
          enhanceQuality={enhanceQuality} setEnhanceQuality={setEnhanceQuality}
        />
        
        <div className="flex flex-col gap-4">
          <button
            onClick={(e) => {createRipple(e); handleGenerate(false);}}
            disabled={isLoading || isVideoLoading || !!upscalingId}
            className={`relative overflow-hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${(isLoading || isVideoLoading) ? 'animate-glow' : ''}`}
          >
            {renderGenerateButtonContent(false)}
          </button>
          <button
            onClick={(e) => {createRipple(e); handleGenerate(true);}}
            disabled={isLoading || isVideoLoading || !!upscalingId}
            className={`relative overflow-hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${(isLoading || isVideoLoading) ? 'animate-glow' : ''}`}
          >
            {renderGenerateButtonContent(true)}
          </button>
           {hasSelectedApiKey ? (
             <button
              onClick={(e) => {createRipple(e); handleAnimate();}}
              disabled={isLoading || isVideoLoading || !!upscalingId || referenceImages.length !== 1}
              className={`relative overflow-hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${(isVideoLoading) ? 'animate-glow' : ''}`}
            >
               {isVideoLoading ? (
                 <>
                   <Loader2 size={20} className="animate-spin" />
                   <span>Animating ({videoProgress.toFixed(0)}%)...</span>
                 </>
               ) : (
                  <>
                    <Film size={20} /> Animate Character (8s)
                  </>
               )}
            </button>
           ) : (
            <div className="flex flex-col items-center text-center gap-2 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-gray-100">Enable Video Generation</h3>
                <p className="text-xs text-gray-400 mb-2">
                    This feature requires selecting an API key. For more information, see the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline hover:text-indigo-300">billing documentation</a>.
                </p>
                <button
                    onClick={(e) => {createRipple(e); handleSelectApiKey();}}
                    className={`relative overflow-hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105`}
                >
                    <KeyRound size={20} /> Select API Key
                </button>
            </div>
           )}
        </div>
         {(isLoading || isVideoLoading) && (
          <div className="mt-4 space-y-3">
            {isLoading && (
              <div>
                <p className="text-sm text-center mb-1">Image Generation</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}
            {isVideoLoading && (
               <div>
                <p className="text-sm text-center mb-1">Video Generation</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-pink-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${videoProgress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        )}
        {error && <p className="text-red-400 mt-4 text-center p-3 bg-red-900/20 border border-red-800 rounded-lg">{error}</p>}
      </div>
      <div className="lg:col-span-2 animate-fadeIn" style={{ animationDelay: '200ms' }}>
        <Gallery items={generatedItems} setItems={setGeneratedItems} onUpscale={handleUpscale} upscalingId={upscalingId} />
      </div>
    </div>
  );
};