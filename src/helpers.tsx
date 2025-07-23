import { CloudMoonIcon, CloudSunIcon, MoonStarsIcon, SunHorizonIcon, SunIcon } from '@phosphor-icons/react';


import { PrayerTime } from './types';
import moment from 'moment';




export const defaultPrayerTimes: PrayerTime[] = [
    { id: '1', name: 'Fajr', time: '', icon: "CloudMoonIcon" },
    { id: '2', name: 'Dhuhr', time: '', icon: "SunIcon" },
    { id: '3', name: 'Asr', time: '', icon: "CloudSunIcon" },
    { id: '4', name: 'Maghrib', time: '', icon: "SunHorizonIcon" },
    { id: '5', name: 'Isha', time: '', icon: "MoonStarsIcon" },
];


// export const iconRenderer: Record<string, JSX.Element> = {
//     CloudMoonIcon: <CloudMoonIcon size={32} weight="light" />,
//     CloudSunIcon: <CloudSunIcon size={32} weight="light" />,
//     MoonStarsIcon: <MoonStarsIcon size={32} weight="light" />,
//     SunHorizonIcon: <SunHorizonIcon size={32} weight="light" />,
//     SunIcon: <SunIcon size={32} weight="light" />,
// }

export const iconRenderer = (iconName: string, size: number = 32) => {
    const icons: Record<string, JSX.Element> = {
        CloudMoonIcon: <CloudMoonIcon size={size} weight="light" />,
        CloudSunIcon: <CloudSunIcon size={size} weight="light" />,
        MoonStarsIcon: <MoonStarsIcon size={size} weight="light" />,
        SunHorizonIcon: <SunHorizonIcon size={size} weight="light" />,
        SunIcon: <SunIcon size={size} weight="light" />,
    };

    return icons[iconName] ?? null;
};




export function getPrayerProgressSegments(prayerTimes: PrayerTime[]): number[] {
    const now = moment();

    const moments = prayerTimes.map(p => moment(p.time, 'HH:mm'));

    return prayerTimes.map((_, index) => {
        const start = moments[index];
        let end: moment.Moment;

        if (index < prayerTimes.length - 1) {
            // Normal case: use next prayer as end
            end = moments[index + 1];
        } else {
            // Last prayer: use first prayer of next day as end
            end = moment(moments[0]).add(1, 'day'); // next day Fajr
        }

        if (now.isSameOrAfter(end)) {
            return 1; // prayer fully passed
        }

        if (now.isBefore(start)) {
            return 0; // upcoming
        }

        // current prayer: calculate progress
        const total = end.diff(start, 'minutes');
        const passed = now.diff(start, 'minutes');
        const percent = passed / total;

        return Math.min(1, Math.max(0, parseFloat(percent.toFixed(4))));
    });
}



