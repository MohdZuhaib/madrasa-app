import React, { useState, useEffect } from 'react';
import { Moon, Sun, Sunrise, Sunset, Star } from 'lucide-react';
import { PrayerTime } from '../types';
import PrayerArc from './PrayerArc';
import ArcProgress from './PrayerArc';

interface PrayerCardProps {
  prayerTimes: PrayerTime[];
  onToggleCompletion: (id: string) => void;
  onTimeUpdate: (id: string, time: string) => void;
}

const prayerIcons = {
  Fajr: Sunrise,
  Dhuhr: Sun,
  Asr: Sun,
  Maghrib: Sunset,
  Isha: Moon,
};

export const PrayerCard: React.FC<PrayerCardProps> = ({
  prayerTimes,
  onToggleCompletion,
  onTimeUpdate,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const findNextPrayer = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      for (const prayer of prayerTimes) {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerMinutes = hours * 60 + minutes;

        if (prayerMinutes > currentMinutes && !prayer.isCompleted) {
          setNextPrayer(prayer);

          const diff = prayerMinutes - currentMinutes;
          const hoursUntil = Math.floor(diff / 60);
          const minutesUntil = diff % 60;

          setTimeUntilNext(`${hoursUntil}h ${minutesUntil}m`);
          return;
        }
      }

      // If no prayer found for today, show first prayer of tomorrow
      const firstPrayer = prayerTimes[0];
      setNextPrayer(firstPrayer);
      setTimeUntilNext('Tomorrow');
    };

    findNextPrayer();
  }, [currentTime, prayerTimes]);

  const getProgressPercentage = () => {
    if (!nextPrayer) return 0;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [hours, minutes] = nextPrayer.time.split(':').map(Number);
    const nextPrayerMinutes = hours * 60 + minutes;

    // Find previous prayer
    let previousPrayerMinutes = 0;
    const nextIndex = prayerTimes.findIndex(p => p.id === nextPrayer.id);
    if (nextIndex > 0) {
      const [prevHours, prevMinutes] = prayerTimes[nextIndex - 1].time.split(':').map(Number);
      previousPrayerMinutes = prevHours * 60 + prevMinutes;
    }

    const totalTime = nextPrayerMinutes - previousPrayerMinutes;
    const elapsed = currentMinutes - previousPrayerMinutes;

    return Math.max(0, Math.min(100, (elapsed / totalTime) * 100));
  };

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    // <div className="relative">
    //   <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white shadow-lg">
    //     {/* Header */}
    //     <div className="flex justify-between items-start mb-8">
    //       <div>
    //         <h1 className="text-3xl font-bold mb-1">
    //           {nextPrayer?.name || 'Isha'}
    //         </h1>
    //         <p className="text-purple-200 text-sm">
    //           Next prayer in {timeUntilNext}
    //         </p>
    //       </div>
    //       <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
    //         {currentDay}
    //       </div>
    //     </div>

    //     {/* Prayer Times Row */}
    //     <div className="flex justify-between items-center mb-8">
    //       {prayerTimes.map((prayer) => {
    //         const IconComponent = prayerIcons[prayer.name as keyof typeof prayerIcons];
    //         const isNext = prayer.id === nextPrayer?.id;
    //         const isCompleted = prayer.isCompleted;

    //         return (
    //           <div 
    //             key={prayer.id}
    //             className={`flex flex-col items-center ${isNext ? 'opacity-100' : 'opacity-70'}`}
    //           >
    //             <div 
    //               className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 cursor-pointer transition-all ${
    //                 isCompleted ? 'bg-green-500' : isNext ? 'bg-white/30' : 'bg-white/10'
    //               }`}
    //               onClick={() => onToggleCompletion(prayer.id)}
    //             >
    //               <IconComponent size={16} />
    //             </div>
    //             <span className="text-xs font-medium">{prayer.name}</span>
    //             <span className="text-xs opacity-80">{prayer.time}</span>
    //           </div>
    //         );
    //       })}
    //     </div>

    //     {/* Progress Circle */}
    //     <div className="flex justify-center">
    //       <div className="relative w-32 h-16 overflow-hidden">
    //         <svg className="w-32 h-32" style={{ transform: 'rotate(-90deg)' }}>
    //           {/* Background arc */}
    //           <path
    //             d="M 16 60 A 44 44 0 0 1 116 60"
    //             fill="none"
    //             stroke="white"
    //             strokeWidth="3"
    //             opacity="0.3"
    //           />
    //           {/* Progress arc */}
    //           <path
    //             d="M 16 60 A 44 44 0 0 1 116 60"
    //             fill="none"
    //             stroke="white"
    //             strokeWidth="3"
    //             strokeDasharray={`${(getProgressPercentage() / 100) * 138.23} 138.23`}
    //             className="transition-all duration-300"
    //           />
    //           {/* Progress dots */}
    //           {[0, 25, 50, 75, 100].map((percent, index) => {
    //             const angle = (percent / 100) * Math.PI;
    //             const x = 60 + 44 * Math.cos(angle);
    //             const y = 60 + 44 * Math.sin(angle);
    //             const isActive = getProgressPercentage() >= percent;

    //             return (
    //               <circle
    //                 key={index}
    //                 cx={x}
    //                 cy={y}
    //                 r="3"
    //                 fill="white"
    //                 opacity={isActive ? 1 : 0.3}
    //                 className="transition-opacity duration-300"
    //               />
    //             );
    //           })}
    //         </svg>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="p-5 pb-0 space-y-5 w-full text-white rounded-lg salah-card__container bg-isha overflow-clip">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌤️</span>
          <h3 className="text-2xl font-semibold">Fajr</h3>
        </div>
        <span className="bg-white/30 text-sm px-2 py-1 rounded-full">Sunday</span>
      </div>
      <p className="text-sm text-white/80 mb-4">Next prayer in 1h 29m</p>

      <div className="grid grid-cols-5 gap-2 text-center text-sm mb-6">
        {[
          { name: 'Fajr', time: '5:51', icon: '🌤️' },
          { name: 'Dhuhr', time: '12:27', icon: '☀️' },
          { name: 'Asr', time: '3:21', icon: '🌥️' },
          { name: 'Maghrib', time: '5:40', icon: '🌇' },
          { name: 'Isha', time: '7:04', icon: '🌙' },
        ].map((p) => (
          <div key={p.name}>
            <div>{p.icon}</div>
            <div>{p.name}</div>
            <div className="font-semibold">{p.time}</div>
          </div>
        ))}
      </div>

      {/* Dynamic Time Arc */}
      <ArcProgress />
    </div>

  );
};