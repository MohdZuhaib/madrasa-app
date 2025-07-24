import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import moment from 'moment';
import { FetchPrayerTime, PrayerTime, PrayerTimesState } from '../types';
import { defaultPrayerTimes } from '../helpers';

type PrayerWithMoment = PrayerTime & { momentTime: moment.Moment };


export const usePrayerStore = create<PrayerTimesState>()(
  persist(
    (set, get) => ({
      prayerTimes: defaultPrayerTimes,

      setPrayerTimes: (times: PrayerTime[]) => set({ prayerTimes: times }),



      // ✅ Async action to fetch prayer times from API
      fetchPrayerTimes: async (params: FetchPrayerTime) => {
        const { latitude, longitude, toast } = params;
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
          toast?.error('Failed to fetch prayer times');
        }
      },


      getPrayerStatus: () => {
        const now = moment();
        const prayerTimes = get().prayerTimes ?? [];
        const enriched: PrayerWithMoment[] = prayerTimes.map((p) => ({
          ...p,
          momentTime: moment(p.time, 'HH:mm'),
        }));
        // If momentTime is before now, treat it as today
        // If it's after now but before Fajr, treat it as yesterday (only for Isha)
        const sorted = enriched.map((p) => {
          const prayerMoment = moment(p.time, 'HH:mm');
          // If time is before 5am and we're past midnight, move Isha to yesterday
          if (p.name === 'Isha' && now.hour() < 4) {
            prayerMoment.subtract(1, 'day');
          }
          return { ...p, momentTime: prayerMoment };
        }).sort((a, b) => a.momentTime.diff(b.momentTime));

        const currentPrayer = [...sorted]
          .reverse()
          .find((p) => p.momentTime.isBefore(now));

        // Next prayer (may be next day)
        const nextPrayer = sorted.find((p) => p.momentTime.isAfter(now)) || {
          ...sorted[0],
          momentTime: sorted[0].momentTime.add(1, 'day'), // next day's Fajr
        };

        const timeToNext = moment.duration(nextPrayer.momentTime.diff(now));
        const nextPrayerHrs = timeToNext.hours();
        const nextPrayerMins = timeToNext.minutes();

        set({
          currentPrayerIcon: currentPrayer?.icon || '',
          currentPrayer: currentPrayer?.name || '',
          nextPrayer: nextPrayer?.name || '',
          timeToNextText: `Next prayer in ${nextPrayerHrs ? `${nextPrayerHrs}h` : ''} ${nextPrayerMins}m`,
        });
      }



    }),
    {
      name: 'prayer-times-storage',
      partialize: (state) => ({ prayerTimes: state.prayerTimes }),
    }
  )
);
