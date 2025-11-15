import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  games: Game[];
  circles: string[];
  role?: 'developer' | 'circle_manager' | 'admin';
}

export interface Game {
  id: string;
  title: string;
  description: string;
  images: string[];
  videos?: string[];
  storeLinks: {
    steam?: string;
    itch?: string;
    epic?: string;
  };
  genre: string;
  platform: string[];
  releaseDate?: string;
  developerId: string;
}

export interface Circle {
  id: string;
  name: string;
  description: string;
  rules: string;
  members: string[];
  games: string[];
  campaigns: string[];
  createdAt: string;
  createdBy: string;
}

export interface Campaign {
  id: string;
  circleId: string;
  gameId: string;
  launchDate: string;
  tasks: CampaignTask[];
  status: 'draft' | 'active' | 'completed';
  metrics?: CampaignMetrics;
}

export interface CampaignTask {
  id: string;
  memberId: string;
  type: 'share' | 'retweet' | 'discount' | 'bundle';
  description: string;
  status: 'pending' | 'done';
  assignedAt: string;
  completedAt?: string;
}

export interface CampaignMetrics {
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

interface AppState {
  user: User | null;
  circles: Circle[];
  games: Game[];
  campaigns: Campaign[];
  notifications: Notification[];
  setUser: (user: User | null) => void;
  addCircle: (circle: Circle) => void;
  addGame: (game: Game) => void;
  addCampaign: (campaign: Campaign) => void;
  updateTaskStatus: (campaignId: string, taskId: string, status: 'pending' | 'done') => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  circles: [],
  games: [],
  campaigns: [],
  notifications: [],
  setUser: (user) => set({ user }),
  addCircle: (circle) => set((state) => ({ circles: [...state.circles, circle] })),
  addGame: (game) => set((state) => ({ games: [...state.games, game] })),
  addCampaign: (campaign) => set((state) => ({ campaigns: [...state.campaigns, campaign] })),
  updateTaskStatus: (campaignId, taskId, status) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === campaignId
          ? {
              ...campaign,
              tasks: campaign.tasks.map((task) =>
                task.id === taskId ? { ...task, status, completedAt: status === 'done' ? new Date().toISOString() : undefined } : task
              ),
            }
          : campaign
      ),
    })),
}));

