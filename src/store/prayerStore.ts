import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import moment from 'moment';
import { PrayerTime, PrayerTimesState } from '../types';
import { defaultPrayerTimes } from '../staticData';



export const usePrayerStore = create<PrayerTimesState>()(
  persist(
    (set) => ({
      prayerTimes: defaultPrayerTimes,

      setPrayerTimes: (times: PrayerTime[]) => set({ prayerTimes: times }),



      // ✅ Async action to fetch prayer times from API
      fetchPrayerTimes: async (params) => {
        const { latitude, longitude } = params;
        const date = moment().format('DD-MM-YYYY');
        try {
          const response = await axios.get(
            `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}`,

          );

          const timings = response.data.data.timings;

          const updatedPrayerTimes: PrayerTime[] = defaultPrayerTimes.map((prayer) => {
            const newTime = timings[prayer.name as keyof typeof timings]; // Match by name
            return {
              ...prayer,
              time: newTime || prayer.time, // fallback to old time if not found
            };
          });

          set({ prayerTimes: updatedPrayerTimes });
        } catch (error) {
          console.error('Failed to fetch prayer times:', error);
        }
      },
    }),
    {
      name: 'prayer-times-storage',
      partialize: (state) => ({ prayerTimes: state.prayerTimes }),
    }
  )
);
