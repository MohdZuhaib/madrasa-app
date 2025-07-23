import React, { useEffect } from 'react';
import ArcProgress from './PrayerArc';

import { usePrayerStore } from '../store/prayerStore';
import useLocationStore from '../store/locationStore';
import { getPrayerStatus, iconRenderer } from '../staticData';
import moment from 'moment';


export const PrayerCard: React.FC = () => {

  const { latitude, longitude } = useLocationStore();
  const { prayerTimes, fetchPrayerTimes } = usePrayerStore();
  const { currentPrayer, currentPrayerIcon, timeToNextText } = getPrayerStatus(prayerTimes);

  const currentIcon = iconRenderer(currentPrayerIcon)
  const today = moment().format('dddd')

  useEffect(() => {
    if (latitude && longitude) {
      fetchPrayerTimes({ latitude, longitude })
    }
  }, [latitude, longitude, fetchPrayerTimes])


  return (
    <div className="p-5 pb-0 space-y-5 w-full text-white rounded-extra-round salah-card__container bg-Isha overflow-clip">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{currentIcon}</span>
            <h3 className="text-2xl font-semibold">{currentPrayer}</h3>
          </div>
          <p className="text-sm m-0">{timeToNextText}</p>
        </div>
        <span className="bg-white/30 text-sm px-2 py-1 rounded-full">{today}</span>
      </div>


      <div className="grid grid-cols-5 gap-2 text-center text-sm mb-6">

        {prayerTimes?.map((p) => {
          const Icon = iconRenderer(p.icon)
          return (
            <div key={p.name} className={`flex flex-col items-center text-sm ${currentPrayer !== p.name && 'opacity-50'}`} >
              {Icon}
              <p>{p.name}</p>
              <p>{moment(p.time, 'HH:mm').format('hh:mm A')}</p>
            </div>
          );
        })}
      </div>

      {/* Dynamic Time Arc */}
      <ArcProgress />
    </div>

  );
};