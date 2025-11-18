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

export interface ScenePreset {
  id: string;
  name: string;
  keywords: string; // For theming generations with a reference character
  prompt_standalone: string; // For generating a full scene from text only
  thumbnail: string;
}