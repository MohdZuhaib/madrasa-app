
import { IconProps } from '@phosphor-icons/react';
import { toast } from 'react-toastify';



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
  toast?: typeof toast;
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
export interface LocationState {
  city: string;
  country: string;
  longitude?: number;
  latitude?: number;
  error: string;
  loading: boolean;
  fetchLocation: () => void;
}