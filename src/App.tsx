import { PrayerCard } from './components/PrayerCard';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { useEffect } from 'react';
import useLocationStore from './store/locationStore';

function App() {
  const fetchLocation = useLocationStore((state) => state.fetchLocation);

  useEffect(() => {
    fetchLocation()
  }, [fetchLocation])

  return (
    <div>
      <Header />

      <div className="px-4 pb-20">
        <PrayerCard
        />
      </div>

      <Navigation />
    </div>

  );
}

export default App;