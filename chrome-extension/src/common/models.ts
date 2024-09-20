export interface User {
    email: string;
    _id: string;
    performance: UserPerformance;
}

export interface UserPerformance {
    today_ac_count: number;
    today_num_question: number;
    avg_memory_percent: number;
    avg_time_percent: number;
    finishedEasy: string[];
    finishedMedium: string[];
    finishedHard: string[];
}

export interface SyncStorage {
    user: User;
    remindSettings: RemindSettings;
}

export interface RemindSettings {
    timeSlots: number[];
    delayMins: number;
}
