import { ArtStyle } from './types';
import { PRESET_CATEGORIES } from './presets';

export const ART_STYLES: ArtStyle[] = [
  {
    id: 'realistic',
    name: 'Realistic',
    prompt_suffix: 'hyperrealistic photo, cinematic lighting, 8k, epic composition',
    thumbnail: 'https://picsum.photos/seed/realistic/200'
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    prompt_suffix: 'cinematic still, dramatic lighting, high detail, film grain',
    thumbnail: 'https://picsum.photos/seed/cinematic/200'
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    prompt_suffix: 'classic cartoon style, vibrant colors, bold outlines',
    thumbnail: 'https://picsum.photos/seed/cartoon/200'
  },
  {
    id: 'anime',
    name: 'Anime',
    prompt_suffix: 'anime style, detailed hair and eyes, vibrant, studio Ghibli inspired',
    thumbnail: 'https://picsum.photos/seed/anime/200'
  },
  {
    id: 'pixar',
    name: 'Pixar',
    prompt_suffix: '3D animated movie style, Pixar style, soft lighting, detailed textures',
    thumbnail: 'https://picsum.photos/seed/pixar/200'
  },
  {
    id: 'comic',
    name: 'Comic',
    prompt_suffix: 'comic book art style, bold lines, cel shading, graphic novel',
    thumbnail: 'https://picsum.photos/seed/comic/200'
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    prompt_suffix: 'fantasy art, epic, detailed, magical, D&D character art',
    thumbnail: 'https://picsum.photos/seed/fantasy/200'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    prompt_suffix: 'minimalist style, simple lines, clean, modern, flat design',
    thumbnail: 'https://picsum.photos/seed/minimalist/200'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    prompt_suffix: 'cyberpunk style, neon lights, dystopian city, futuristic, high-tech',
    thumbnail: 'https://picsum.photos/seed/cyberpunk/200'
  },
  {
    id: 'steampunk',
    name: 'Steampunk',
    prompt_suffix: 'steampunk style, victorian, gears, brass, intricate machinery',
    thumbnail: 'https://picsum.photos/seed/steampunk/200'
  },
  {
    id: 'vintage_photo',
    name: 'Vintage Photo',
    prompt_suffix: 'vintage photograph, sepia tones, old-fashioned, grainy, 1920s style',
    thumbnail: 'https://picsum.photos/seed/vintage_photo/200'
  },
  {
    id: 'digital_art',
    name: 'Digital Art',
    prompt_suffix: 'digital painting, concept art, high detail, trending on ArtStation',
    thumbnail: 'https://picsum.photos/seed/digital_art/200'
  },
];

export const BATCH_SIZES = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

export const ASPECT_RATIOS = [
  { id: '1:1', name: '1:1 (Square)' },
  { id: '4:3', name: '4:3 (Landscape)' },
  { id: '3:4', name: '3:4 (Portrait)' },
  { id: '16:9', name: '16:9 (Widescreen)' },
  { id: '9:16', name: '9:16 (Tall)' },
];

export const DETAIL_LEVELS = [
  { id: 'low', name: 'Low', prompt_suffix: 'low detail, simple, minimalist' },
  { id: 'medium', name: 'Medium', prompt_suffix: 'medium detail, balanced' },
  { id: 'high', name: 'High', prompt_suffix: 'high detail, detailed, complex' },
  { id: 'ultra', name: 'Ultra', prompt_suffix: 'ultra high detail, hyperdetailed, intricate, professional' },
];

export const ENHANCED_QUALITY_PROMPT = 'masterpiece, best quality, ultra-detailed, 3d render, Pixar animation style, Disney style, polished, smooth shading, soft lighting, vibrant colors, physically-based rendering, subsurface scattering, cinematic character portrait, flawless';

// Fix: Defined and exported SCENE_PRESETS to resolve import error.
export const SCENE_PRESETS = PRESET_CATEGORIES.find(cat => cat.id === 'env-scenes')?.presets || [];
