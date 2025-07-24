import { useEffect } from 'react';
import useLocationStore from './store/locationStore';
import { BrowserRouter } from 'react-router-dom';
import Router from './config/routes';

function App() {
  const fetchLocation = useLocationStore((state) => state.fetchLocation);

  useEffect(() => {
    fetchLocation()
  }, [fetchLocation])

  return (
    <div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>

  );
}

export default App;