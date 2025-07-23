
import { IconProps } from '@phosphor-icons/react';


export type IconComponent = (props: IconProps) => JSX.Element;

export interface PrayerTime {
  id: string;
  name: string;
  time: string;
  icon: string;
}
export interface FetchPrayerTime {
  latitude?: number;
  longitude?: number;
}

export interface PrayerTimesState {
  prayerTimes: PrayerTime[];
  currentPrayer?: string;
  currentPrayerIcon?: string;
  nextPrayer?: string;
  timeToNextText?: string;
  fetchPrayerTimes: (FetchPrayerTime: FetchPrayerTime) => void;
  getPrayerStatus: () => void;
}