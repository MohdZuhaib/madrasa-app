import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PrayerTime, PrayerTimesState } from '../types';

const defaultPrayerTimes: PrayerTime[] = [
  { id: '1', name: 'Fajr', time: '05:30', isCompleted: false },
  { id: '2', name: 'Dhuhr', time: '12:30', isCompleted: false },
  { id: '3', name: 'Asr', time: '15:45', isCompleted: false },
  { id: '4', name: 'Maghrib', time: '18:20', isCompleted: false },
  { id: '5', name: 'Isha', time: '20:00', isCompleted: false },
];

export const usePrayerStore = create<PrayerTimesState>()(
  persist(
    (set) => ({
      prayerTimes: defaultPrayerTimes,
      setPrayerTimes: (times) => set({ prayerTimes: times }),
      togglePrayerCompletion: (id) =>
        set((state) => ({
          prayerTimes: state.prayerTimes.map((prayer) =>
            prayer.id === id
              ? { ...prayer, isCompleted: !prayer.isCompleted }
              : prayer
          ),
        })),
      updatePrayerTime: (id, time) =>
        set((state) => ({
          prayerTimes: state.prayerTimes.map((prayer) =>
            prayer.id === id ? { ...prayer, time } : prayer
          ),
        })),
    }),
    {
      name: 'prayer-times-storage',
      partialize: (state) => ({ prayerTimes: state.prayerTimes }),
    }
  )
);