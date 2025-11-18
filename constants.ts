import { ArtStyle, ScenePreset } from './types';

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

export const SCENE_PRESETS: ScenePreset[] = [
  { id: 'cute', name: 'Cute', keywords: 'smiling, laughing, playing with a puppy, holding a flower, in a cozy bedroom, sunny garden', prompt_standalone: 'A whimsical and heartwarming 3D scene in the style of Pixar. A cute, fluffy creature with big, expressive eyes is playing with a glowing butterfly in a sun-dappled meadow filled with oversized, colorful flowers. The lighting is soft and warm, with a gentle lens flare. Rendered in ultra-high detail, with soft fur textures and a vibrant color palette.', thumbnail: 'https://picsum.photos/seed/cute/200' },
  { id: 'heroic', name: 'Heroic', keywords: 'standing tall, determined expression, looking into the distance, on a mountaintop, futuristic city, holding a glowing orb', prompt_standalone: "Epic 3D cinematic shot in the style of a Disney hero's journey. A brave hero with determined eyes stands on a windswept cliff edge, overlooking a vast, cloud-filled valley at sunrise. They are wearing ornate, polished armor that glints in the golden light. The composition is powerful and inspiring. Rendered in 8k, masterpiece quality, with dramatic lighting.", thumbnail: 'https://picsum.photos/seed/heroic/200' },
  { id: 'funny', name: 'Funny', keywords: 'making a silly face, surprised expression, tripping over, wearing a goofy hat, in a chaotic kitchen, at a circus', prompt_standalone: 'A hilarious 3D cartoon scene. A clumsy, wide-eyed character has accidentally slipped on a banana peel in the middle of a bustling kitchen. Pots and pans are flying, and a small dog is watching with a shocked expression. Dynamic, comedic timing, rendered in a vibrant, playful style with exaggerated physics.', thumbnail: 'https://picsum.photos/seed/funny/200' },
  { id: 'adventure', name: 'Adventure', keywords: 'exploring a dense forest, looking at a map, crossing a rope bridge, discovering ancient ruins, riding a fantastical creature', prompt_standalone: 'A thrilling 3D adventure scene. An intrepid explorer discovers a hidden, glowing entrance to an ancient ruin deep within a lush, mysterious jungle. Sunbeams cut through the thick canopy, illuminating floating dust particles and intricate carvings on the stone. The atmosphere is one of awe and discovery, rendered in a realistic yet fantastical style.', thumbnail: 'https://picsum.photos/seed/adventure/200' },
  { id: 'relaxing', name: 'Relaxing', keywords: 'sleeping peacefully, sitting by a calm lake, reading a book in a cozy chair, meditating, watching the sunset on a beach', prompt_standalone: 'A tranquil 3D scene of a cozy, sun-lit reading nook. A comfortable armchair sits next to a large window overlooking a peaceful garden. A cat is sleeping on a stack of books, and steam gently rises from a nearby cup of tea. The lighting is soft and inviting, creating a sense of calm and serenity. Polished, smooth rendering.', thumbnail: 'https://picsum.photos/seed/relaxing/200' },
  { id: 'fantasy', name: 'Fantasy', keywords: 'casting a magic spell, talking to a dragon, in an enchanted forest, wearing elven armor, inside a majestic castle', prompt_standalone: 'A high-fantasy 3D masterpiece. A powerful mage in flowing robes stands in the heart of a grand, mystical library, casting a spell that causes ancient books to float and glow around them. Magical energy crackles in the air, and the scene is filled with intricate details and epic, cinematic lighting. Rendered in ultra-high detail.', thumbnail: 'https://picsum.photos/seed/fantasy_preset/200' },
  { id: 'sci_fi', name: 'Sci-Fi', keywords: 'in a neon-lit cyberpunk city, flying futuristic cars, holographic ads, on a spaceship bridge, looking at a galaxy map', prompt_standalone: 'A bustling, neon-soaked cyberpunk city street at night, in the style of a futuristic 3D render. Flying vehicles zip between towering skyscrapers adorned with glowing holographic advertisements. The wet pavement reflects the vibrant city lights. The scene is dense, detailed, and buzzing with high-tech energy.', thumbnail: 'https://picsum.photos/seed/sci_fi/200' },
  { id: 'enchanted_forest', name: 'Enchanted Forest', keywords: 'magical forest with glowing mushrooms, ancient whispering trees, surrounded by fireflies, discovering a hidden waterfall', prompt_standalone: 'A breathtaking 3D render of an enchanted forest at twilight. Giant, luminous mushrooms cast a soft, magical glow on the surroundings. The air is filled with sparkling fireflies, and a mystical, shimmering stream flows through ancient, moss-covered trees. The atmosphere is serene and magical, with volumetric lighting and ethereal effects.', thumbnail: 'https://picsum.photos/seed/enchanted_forest/200' },
  { id: 'underwater', name: 'Underwater', keywords: 'swimming in a vibrant coral reef, exploring a sunken city, surrounded by bioluminescent jellyfish, riding a sea turtle', prompt_standalone: 'A vibrant and detailed 3D underwater scene. Sunlight filters through the crystal-clear water, illuminating a bustling coral reef teeming with colorful fish. A majestic sea turtle glides gracefully past ancient, sunken ruins covered in marine life. The scene is peaceful and full of life, with realistic water caustics and detailed textures.', thumbnail: 'https://picsum.photos/seed/underwater/200' },
  { id: 'retro_diner', name: 'Retro Diner', keywords: 'sitting in a 1950s retro diner, drinking a milkshake, next to a jukebox, red leather booth, checkered floor', prompt_standalone: "A nostalgic 3D render of a classic 1950s American diner at night. The interior is lit by warm neon signs, reflecting off the polished chrome and checkered floor. A delicious-looking milkshake sits on a table in a cozy red leather booth. The atmosphere is warm, inviting, and full of vintage charm.", thumbnail: 'https://picsum.photos/seed/retro_diner/200' },
  { id: 'mystical_library', name: 'Mystical Library', keywords: 'vast ancient library, surrounded by floating books and candles, reading a dusty scroll, looking for a magic book', prompt_standalone: 'A stunning 3D render of a vast, mystical library that stretches into infinity. Towering shelves are filled with ancient books, and enchanted candles float in the air, providing a warm, magical light. A grand, celestial-themed window illuminates the center of the room. The scene is awe-inspiring and filled with wonder.', thumbnail: 'https://picsum.photos/seed/mystical_library/200' },
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