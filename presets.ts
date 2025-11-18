import { PresetCategory } from './types';
import {
  Palette, Globe, Camera, Paintbrush, TrendingUp, Sparkles, User, Bot, Dna, Shirt, Crown, Shield, Wand, Skull, Smile,
  Mountain, Trees, Building2, Ship, Annoyed, Sprout, Landmark, Waves, Atom, Aperture, Clapperboard, Sun, Moon, Film,
  Mic, Pencil, Cuboid, ToyBrick, Droplets, PenTool, VenetianMask, SprayCan, Hand, Popcorn, Heart, Eye, Lollipop, Baby
} from 'lucide-react';

export const PRESET_CATEGORIES: PresetCategory[] = [
  {
    id: 'char-styles',
    name: 'Character Styles',
    icon: Palette,
    presets: [
      { id: 'hyper-realistic', name: 'Hyper-Realistic Human', prompt: 'hyper-realistic human portrait, detailed skin texture, cinematic lighting, professional photography, 8k', icon: User },
      { id: 'pixar-3d', name: 'Pixar-Style 3D', prompt: '3D animated character, Pixar style, soft lighting, detailed textures, vibrant colors, charming expression', icon: Bot },
      { id: 'disney-illustration', name: 'Disney-Illustration', prompt: 'classic Disney animation style, expressive features, smooth lines, vibrant storybook illustration', icon: Dna },
      { id: 'anime-manga', name: 'Anime / Manga', prompt: 'modern anime manga style, detailed eyes, dynamic hair, sharp lines, vibrant colors', icon: Annoyed },
      { id: 'studio-ghibli', name: 'Studio Ghibli', prompt: 'Studio Ghibli inspired anime style, painterly backgrounds, whimsical, soft and warm color palette, nostalgic atmosphere', icon: Sprout },
      { id: 'video-game', name: 'Video-Game Character', prompt: 'next-gen video game character concept art, realistic textures, detailed armor, dynamic pose, Unreal Engine 5 render', icon: Shield },
      { id: 'cyberpunk-char', name: 'Cyberpunk Character', prompt: 'cyberpunk character, neon-lit, futuristic clothing, cybernetic enhancements, dystopian city background', icon: Building2 },
      { id: 'cute-chibi', name: 'Cute Chibi', prompt: 'cute chibi character, oversized head, large expressive eyes, simple and adorable design, vibrant colors', icon: Smile },
      { id: 'stylized-portrait', name: 'Stylized Portrait', prompt: 'stylized character portrait, artistic interpretation, exaggerated features, unique art style, trending on ArtStation', icon: Pencil },
      { id: 'ai-fashion-model', name: 'AI Fashion Model', prompt: 'AI fashion model, high fashion, haute couture, editorial pose, flawless, hyperrealistic', icon: Shirt },
      { id: 'fantasy-warrior', name: 'Fantasy Warrior', prompt: 'epic fantasy warrior, intricate armor, glowing weapon, mythical setting, dynamic battle stance, detailed concept art', icon: Shield },
      { id: 'medieval-knight', name: 'Medieval Knight', prompt: 'medieval knight in full plate armor, historically accurate, weathered and battle-worn, castle background', icon: Crown },
      { id: 'magical-sorcerer', name: 'Magical Sorcerer', prompt: 'powerful sorcerer casting a spell, glowing magical energy, ancient robes, mystical library setting', icon: Wand },
      { id: 'mythical-creature', name: 'Mythical Creature', prompt: 'majestic mythical creature, detailed scales and fur, enchanted forest environment, epic fantasy art', icon: Skull },
      { id: 'cartoon-mascot', name: 'Cartoon Mascot', prompt: 'friendly cartoon mascot, bold outlines, simple shapes, vibrant colors, perfect for a brand logo', icon: ToyBrick },
    ]
  },
  {
    id: 'env-scenes',
    name: 'Environment & Scenes',
    icon: Globe,
    presets: [
      { id: 'cinematic-landscape', name: 'Cinematic Landscape', prompt: 'breathtaking cinematic landscape, wide-angle shot, epic scale, dramatic lighting, matte painting', icon: Mountain },
      { id: 'enchanted-forest', name: 'Enchanted Forest', prompt: 'enchanted forest at twilight, glowing mushrooms, ancient trees, magical atmosphere, fireflies', icon: Trees },
      { id: 'cyberpunk-city', name: 'Cyberpunk City', prompt: 'cyberpunk city at night, neon-soaked skyscrapers, flying vehicles, rainy streets, Blade Runner aesthetic', icon: Building2 },
      { id: 'post-apocalyptic', name: 'Post-Apocalyptic', prompt: 'post-apocalyptic wasteland, overgrown ruins, dramatic sky, sense of solitude, The Last of Us inspired', icon: Landmark },
      { id: 'futuristic-sci-fi', name: 'Futuristic Sci-Fi', prompt: 'clean futuristic sci-fi interior, minimalist design, holographic displays, advanced technology, pristine', icon: Atom },
      { id: 'underwater-world', name: 'Underwater World', prompt: 'vibrant underwater coral reef, diverse marine life, sun rays filtering through water, crystal clear', icon: Waves },
      { id: 'snowy-mountains', name: 'Snowy Mountains', prompt: 'majestic snowy mountains at sunrise, sharp peaks, pink and orange sky, serene and vast', icon: Mountain },
      { id: 'retro-diner', name: 'Retro Diner', prompt: '1950s American retro diner at night, neon lights, checkered floor, jukebox, nostalgic atmosphere', icon: Ship },
      { id: 'mystical-library', name: 'Mystical Library', prompt: 'vast mystical library, towering bookshelves, floating books, magical glowing orbs, ancient and grand', icon: Landmark },
      { id: 'ocean-sunset', name: 'Ocean Beach Sunset', prompt: 'tropical beach at sunset, calm ocean, palm trees silhouettes, vibrant orange and purple sky, peaceful', icon: Waves },
    ]
  },
  {
    id: 'photo-presets',
    name: 'Photography Presets',
    icon: Camera,
    presets: [
      { id: 'ultra-photorealistic', name: 'Ultra-Photorealistic', prompt: 'ultra-photorealistic shot, professional photography, Canon EOS R5, 85mm f/1.2 lens, incredibly detailed', icon: Aperture },
      { id: 'dslr-portrait', name: 'DSLR Portrait', prompt: 'DSLR portrait photography, soft bokeh background, natural lighting, sharp focus on eyes, beautiful composition', icon: User },
      { id: 'vogue-editorial', name: 'Vogue Editorial', prompt: 'Vogue editorial fashion shoot, dramatic pose, high-fashion styling, professional studio lighting', icon: Shirt },
      { id: 'moody-cinematic', name: 'Moody Cinematic', prompt: 'moody cinematic film still, anamorphic lens flare, dramatic shadows, muted color palette, film grain', icon: Clapperboard },
      { id: 'golden-hour', name: 'Golden Hour', prompt: 'golden hour portrait, warm soft lighting, lens flare, magical and dreamy atmosphere', icon: Sun },
      { id: 'studio-lighting', name: 'Studio Lighting', prompt: 'professional studio portrait, clean background, three-point lighting setup, sharp and polished', icon: Mic },
      { id: 'black-white-film', name: 'Black & White Film', prompt: 'black and white film photography, high contrast, grainy texture, dramatic shadows, timeless feel', icon: Film },
      { id: 'macro-photography', name: 'Macro Photography', prompt: 'extreme macro photography, tiny details, beautiful bokeh, sharp focus', icon: Sprout },
      { id: 'soft-dreamy', name: 'Soft Dreamy Aesthetic', prompt: 'soft and dreamy aesthetic, hazy glow, pastel colors, ethereal and gentle mood', icon: Moon },
    ]
  },
  {
    id: 'art-styles',
    name: 'Artistic Styles',
    icon: Paintbrush,
    presets: [
      { id: 'oil-painting', name: 'Oil Painting', prompt: 'classic oil painting, visible brush strokes, rich colors, detailed and textured, style of old masters', icon: Paintbrush },
      { id: 'watercolor-painting', name: 'Watercolor Painting', prompt: 'watercolor painting, soft and translucent colors, wet-on-wet technique, delicate and expressive', icon: Droplets },
      // Fix: The icon was incorrectly a string. Changed to the component reference PenTool.
      { id: 'sketch-drawing', name: 'Sketch / Drawing', prompt: 'pencil sketch, detailed line art, cross-hatching shading, hand-drawn, black and white', icon: PenTool },
      { id: 'pop-art', name: 'Pop Art', prompt: 'pop art style, bold colors, graphic print, Andy Warhol inspired, comic book aesthetic', icon: Popcorn },
      { id: 'surreal-art', name: 'Surreal Art', prompt: 'surrealist art, dreamlike, bizarre and unexpected imagery, Salvador Dali style', icon: Eye },
      { id: 'pixel-art', name: 'Pixel Art', prompt: 'pixel art, 8-bit or 16-bit style, retro video game aesthetic, clean pixels', icon: Cuboid },
      { id: 'low-poly', name: 'Low Poly Art', prompt: 'low poly 3D render, geometric shapes, minimalist and stylized, vibrant color palette', icon: Cuboid },
      { id: 'graffiti-art', name: 'Graffiti Art', prompt: 'urban graffiti street art, spray paint, bold and colorful, stencil and tag style', icon: SprayCan },
      { id: 'paper-art', name: 'Paper Art (Quilling)', prompt: 'intricate paper art, quilling technique, 3D paper sculpture, delicate and detailed', icon: Hand },
    ]
  }
];
