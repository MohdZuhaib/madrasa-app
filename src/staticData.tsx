import { CloudMoonIcon, CloudSunIcon, MoonStarsIcon, SunHorizonIcon, SunIcon } from '@phosphor-icons/react';


import { PrayerTime } from './types';
import moment from 'moment';


type PrayerWithMoment = PrayerTime & { momentTime: moment.Moment };


export const defaultPrayerTimes: PrayerTime[] = [
    { id: '1', name: 'Fajr', time: '', icon: "CloudMoonIcon" },
    { id: '2', name: 'Dhuhr', time: '', icon: "SunIcon" },
    { id: '3', name: 'Asr', time: '', icon: "CloudSunIcon" },
    { id: '4', name: 'Maghrib', time: '', icon: "SunHorizonIcon" },
    { id: '5', name: 'Isha', time: '', icon: "MoonStarsIcon" },
];

export const iconRenderer = (iconName?: string) => {
    switch (iconName) {
        case 'CloudMoonIcon': return <CloudMoonIcon size={32} weight="light" />;
        case 'CloudSunIcon': return <CloudSunIcon size={32} weight="light" />;
        case 'MoonStarsIcon': return <MoonStarsIcon size={32} weight="light" />;
        case 'SunHorizonIcon': return <SunHorizonIcon size={32} weight="light" />;
        case 'SunIcon': return <SunIcon size={32} weight="light" />;
        default: return
    }
}


export function getPrayerStatus(prayerTimes: PrayerTime[]) {
    const now = moment();

    const enriched: PrayerWithMoment[] = prayerTimes.map((p) => ({
        ...p,
        momentTime: moment(p.time, 'HH:mm'),
    }));

    // Sort in case times are not in order
    const sorted = enriched.sort((a, b) => a.momentTime.diff(b.momentTime));

    const currentPrayer = [...sorted]
        .reverse()
        .find((p) => p.momentTime.isBefore(now));

    const nextPrayer = sorted.find((p) => p.momentTime.isAfter(now));

    const timeToNext = nextPrayer
        ? moment.duration(nextPrayer.momentTime.diff(now))
        : null;
    console.log('timeToNext.hours()', currentPrayer)
    const nextPrayerHrs = timeToNext?.hours()
    const nextPrayerMins = timeToNext?.minutes()
    return {
        currentPrayerIcon: currentPrayer?.icon,
        currentPrayer: currentPrayer?.name ?? null,
        nextPrayer: nextPrayer?.name ?? null,
        timeToNextText: timeToNext
            ? `Next prayer in ${nextPrayerHrs ? `${nextPrayerHrs}h` : ''} ${nextPrayerMins}m`
            : 'No upcoming prayer',
    };
}