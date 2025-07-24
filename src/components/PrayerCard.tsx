import React, { useEffect } from 'react';
import ArcProgress from './PrayerArc';

import { usePrayerStore } from '../store/prayerStore';
import useLocationStore from '../store/locationStore';
import { iconRenderer } from '../helpers';
import moment from 'moment';


export const PrayerCard: React.FC = () => {

  const { latitude, longitude } = useLocationStore();
  const { prayerTimes, currentPrayer, currentPrayerIcon, timeToNextText, fetchPrayerTimes, getPrayerStatus } = usePrayerStore();

  const today = moment().format('dddd')

  useEffect(() => {
    if (prayerTimes) {
      getPrayerStatus()
    }

    const interval = setInterval(() => {
      getPrayerStatus();
    }, 60 * 1000); // every 60 seconds

    return () => clearInterval(interval);
  }, [prayerTimes, getPrayerStatus])

  useEffect(() => {
    if (latitude && longitude) {
      fetchPrayerTimes({ latitude, longitude })
    }
  }, [latitude, longitude, fetchPrayerTimes])

  return (
    <div className={`py-6 px-4  pb-0 space-y-5 w-full max-w-md text-white rounded-extra-round salah-card__container bg-${currentPrayer} overflow-clip`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span>{currentPrayerIcon && iconRenderer(currentPrayerIcon, 28)}</span>
            <h3 className="text-3xl font-bold">{currentPrayer}</h3>
          </div>
          <p className="text-sm m-0">{timeToNextText}</p>
        </div>
        <span className="bg-white/30 text-sm px-2 py-1 rounded-full">{today}</span>
      </div>


      <div className="flex mx-auto items-center justify-between">

        {prayerTimes?.map((p) => {
          const Icon = iconRenderer(p.icon, 24)
          return (
            <div key={p.name} className={`flex flex-col items-center text-sm ${currentPrayer !== p.name && 'opacity-50'}`} >
              {Icon}
              <p className='font-medium mt-2'>{p.name}</p>
              <p className='font-normal'>{moment(p.time, 'HH:mm').format('hh:mm A')}</p>
            </div>
          );
        })}
      </div>

      {/* Dynamic Time Arc */}
      <ArcProgress />
    </div>

  );
};