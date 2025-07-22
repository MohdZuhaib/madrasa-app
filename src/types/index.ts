export interface PrayerTime {
  id: string;
  name: string;
  time: string;
  isCompleted?: boolean;
}

export interface PrayerTimesState {
  prayerTimes: PrayerTime[];
  setPrayerTimes: (times: PrayerTime[]) => void;
  togglePrayerCompletion: (id: string) => void;
  updatePrayerTime: (id: string, time: string) => void;
}