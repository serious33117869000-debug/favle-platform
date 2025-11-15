import { User, Game, Circle, Campaign, CampaignMetrics } from './store';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'أحمد المطور',
    email: 'ahmed@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed',
    bio: 'مطور ألعاب مستقل متخصص في ألعاب الأكشن',
    games: [],
    circles: [],
    role: 'developer',
  },
];

// Generate 25 random games with matching images
const gameTitles = [
  'Space Adventure', 'Cyber Quest', 'Dragon Realm', 'Mystic Forest', 'Neon City',
  'Shadow Warrior', 'Crystal Caves', 'Star Explorer', 'Magic Academy', 'Desert Storm',
  'Ocean Depths', 'Mountain Peak', 'Time Traveler', 'Robot Factory', 'Alien Invasion',
  'Pirate Treasure', 'Ninja Legends', 'Zombie Survival', 'Racing Thunder', 'Puzzle Master',
  'Kingdom Builder', 'Space Station', 'Wild West', 'Medieval Knights', 'Future Wars'
];

const gameGenres = ['Platformer', 'Action', 'RPG', 'Puzzle', 'Strategy', 'Adventure', 'Simulation'];
const platforms = ['PC', 'Steam', 'Mobile', 'Epic'];

// Game images matching each game title - using reliable image sources
// Using a mix of verified Unsplash images and placeholder services for guaranteed availability
const gameImages = [
  'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop', // Space Adventure - space/galaxy
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop', // Cyber Quest - technology
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop', // Dragon Realm - fantasy
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', // Mystic Forest - forest
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop', // Neon City - city/night
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop', // Shadow Warrior - dark/gaming
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // Crystal Caves - nature/cave
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop', // Star Explorer - space/stars
  'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop', // Magic Academy - mystical
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop', // Desert Storm - desert
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop', // Ocean Depths - ocean
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop', // Mountain Peak - mountain
  'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop', // Time Traveler - future
  'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop', // Robot Factory - technology
  'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop', // Alien Invasion - space
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop', // Pirate Treasure - ocean/ship
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop', // Ninja Legends - gaming
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop', // Zombie Survival - desert/apocalypse
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop', // Racing Thunder - city/speed
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop', // Puzzle Master - technology
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop', // Kingdom Builder - landscape
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop', // Space Station - space
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop', // Wild West - desert/western
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // Medieval Knights - nature/castle
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop', // Future Wars - technology/scifi
];

const mockGames: Game[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  title: gameTitles[i] || `Game ${i + 1}`,
  description: `An exciting ${gameGenres[i % gameGenres.length].toLowerCase()} game that will keep you entertained for hours. Explore amazing worlds and discover hidden secrets.`,
  images: [gameImages[i]],
  genre: gameGenres[i % gameGenres.length],
  platform: [platforms[i % platforms.length], platforms[(i + 1) % platforms.length]].filter((v, idx, arr) => arr.indexOf(v) === idx),
  developerId: String((i % 5) + 1),
  storeLinks: {
    steam: i % 2 === 0 ? `https://store.steampowered.com/app/${1000000 + i}` : undefined,
    itch: i % 3 === 0 ? `https://game${i + 1}.itch.io` : undefined,
  },
}));

// Generate 5 random circles
const circleNames = [
  'Action Heroes Circle',
  'Indie Adventure Squad',
  'Puzzle Masters United',
  'RPG Legends Guild',
  'Strategy Wizards Alliance'
];

const circleDescriptions = [
  'A circle of developers creating action-packed games with stunning visuals and intense gameplay.',
  'Join us in exploring new worlds and creating unforgettable adventure experiences.',
  'We specialize in mind-bending puzzles and brain-teasing challenges.',
  'Creating epic RPGs with deep stories and immersive worlds.',
  'Strategic thinking meets creative game design in our collaborative circle.'
];

const mockCircles: Circle[] = Array.from({ length: 5 }, (_, i) => ({
  id: String(i + 1),
  name: circleNames[i],
  description: circleDescriptions[i],
  rules: `Rule 1: Support each other's launches\nRule 2: Share promotional content\nRule 3: Provide honest feedback\nRule 4: Maintain active participation`,
  members: Array.from({ length: Math.floor(Math.random() * 3) + 2 }, (_, j) => String(j + 1)),
  games: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => String((i * 5) + j + 1)),
  campaigns: [],
  createdAt: new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000)).toISOString(),
  createdBy: String((i % 3) + 1),
}));

const mockCampaigns: Campaign[] = [];

// Mock API functions
export const mockAPI = {
  // Auth
  async login(email: string, password: string): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockUsers.find((u) => u.email === email) || null;
  },

  async loginWithOAuth(provider: 'steam' | 'discord'): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockUsers[0];
  },

  async register(data: { name: string; email: string; password: string }): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser: User = {
      id: String(mockUsers.length + 1),
      ...data,
      games: [],
      circles: [],
      role: 'developer',
    };
    mockUsers.push(newUser);
    return newUser;
  },

  // Games
  async getGames(filters?: { genre?: string; platform?: string }): Promise<Game[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let filtered = [...mockGames];
    if (filters?.genre) {
      filtered = filtered.filter((g) => g.genre === filters.genre);
    }
    if (filters?.platform) {
      filtered = filtered.filter((g) => g.platform.includes(filters.platform!));
    }
    return filtered;
  },

  async createGame(game: Omit<Game, 'id'>): Promise<Game> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newGame: Game = {
      ...game,
      id: String(mockGames.length + 1),
    };
    mockGames.push(newGame);
    return newGame;
  },

  // Circles
  async getCircles(): Promise<Circle[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockCircles;
  },

  async createCircle(circle: Omit<Circle, 'id' | 'createdAt'>): Promise<Circle> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newCircle: Circle = {
      ...circle,
      id: String(mockCircles.length + 1),
      createdAt: new Date().toISOString(),
    };
    mockCircles.push(newCircle);
    return newCircle;
  },

  async inviteToCircle(circleId: string, email: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  },

  // Campaigns
  async getCampaigns(circleId?: string): Promise<Campaign[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let filtered = [...mockCampaigns];
    if (circleId) {
      filtered = filtered.filter((c) => c.circleId === circleId);
    }
    return filtered;
  },

  async createCampaign(campaign: Omit<Campaign, 'id'>): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newCampaign: Campaign = {
      ...campaign,
      id: String(mockCampaigns.length + 1),
    };
    mockCampaigns.push(newCampaign);
    return newCampaign;
  },

  async updateTaskStatus(campaignId: string, taskId: string, status: 'pending' | 'done'): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const campaign = mockCampaigns.find((c) => c.id === campaignId);
    if (campaign) {
      const task = campaign.tasks.find((t) => t.id === taskId);
      if (task) {
        task.status = status;
        if (status === 'done') {
          task.completedAt = new Date().toISOString();
        }
        return true;
      }
    }
    return false;
  },

  async getCampaignMetrics(campaignId: string): Promise<CampaignMetrics> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      views: Math.floor(Math.random() * 10000) + 1000,
      clicks: Math.floor(Math.random() * 500) + 50,
      conversions: Math.floor(Math.random() * 100) + 10,
      revenue: Math.floor(Math.random() * 5000) + 500,
    };
  },
};
