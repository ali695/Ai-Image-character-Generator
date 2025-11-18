import type React from 'react';
import { LucideProps } from 'lucide-react';

export interface GeneratedItem {
  id: string;
  type: 'image' | 'video';
  data: string; // base64 for image, URL for video
  prompt: string;
  mimeType?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface ArtStyle {
  id:string;
  name: string;
  prompt_suffix: string;
  thumbnail: string;
}

export interface Preset {
  id: string;
  name: string;
  prompt: string;
  icon: React.FC<LucideProps>;
}

export interface PresetCategory {
  id: string;
  name: string;
  icon: React.FC<LucideProps>;
  presets: Preset[];
}
