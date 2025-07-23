
import { IconProps } from '@phosphor-icons/react';


// type IconComponent = React.ComponentType<IconProps>;
export type IconComponent = (props: IconProps) => JSX.Element;

export interface PrayerTime {
  id: string;
  name: string;
  time: string;
  icon: string;
  isCompleted?: boolean;
}
export interface FetchPrayerTime {
  latitude?: number;
  longitude?: number;
}

export interface PrayerTimesState {
  prayerTimes: PrayerTime[];
  fetchPrayerTimes: (FetchPrayerTime: FetchPrayerTime) => void;
}