import React from 'react';
import { PrayerCard } from './components/PrayerCard';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { usePrayerStore } from './store/prayerStore';

function App() {
  const { prayerTimes, togglePrayerCompletion, updatePrayerTime } = usePrayerStore();

  return (
    <div>
      <Header />

      <div className="px-4 pb-20">
        <PrayerCard
          prayerTimes={prayerTimes}
          onToggleCompletion={togglePrayerCompletion}
          onTimeUpdate={updatePrayerTime}
        />
      </div>

      <Navigation />
    </div>

  );
}

export default App;