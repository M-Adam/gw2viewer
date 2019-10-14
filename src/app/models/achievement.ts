export interface Achievement {
    id: number;
    level: {min: number, max: number};
}

export interface DailyAchievementResponse {
    pve: Achievement[];
    pvp: Achievement[];
    wvw: Achievement[];
}

export interface AchievementDetails {
    id: number;
    name: string;
}