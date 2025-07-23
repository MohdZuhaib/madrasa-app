import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationState {
    city: string;
    country: string;
    longitude?: number;
    latitude?: number;
    error: string;
    loading: boolean;
    fetchLocation: () => void;
}

const useLocationStore = create<LocationState>()(
    persist(
        (set) => ({
            city: '',
            country: '',
            error: '',
            latitude: undefined,
            longitude: undefined,
            loading: true,

            fetchLocation: async () => {
                const fetchFromIP = async () => {
                    try {
                        const res = await fetch('https://ipapi.co/json/');
                        const data = await res.json();
                        set({
                            city: data.city || '',
                            country: data.country_name || '',
                            latitude: data.latitude || undefined,
                            longitude: data.longitude || undefined,
                            error: '',
                            loading: false,
                        });
                    } catch (ipErr) {
                        console.log(ipErr);
                        set({ error: 'Unable to detect location.', loading: false });
                    }
                };

                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;

                            try {
                                const res = await fetch(
                                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
                                );
                                const data = await res.json();
                                const city =
                                    data.address.city ||
                                    data.address.town ||
                                    data.address.state ||
                                    data.address.village ||
                                    '';
                                const country = data.address.country || '';
                                set({
                                    city,
                                    country,
                                    error: '',
                                    latitude,
                                    longitude,
                                    loading: false,
                                });
                            } catch (err) {
                                console.error('Reverse geocoding failed:', err);
                                fetchFromIP();
                            }
                        },
                        (err) => {
                            console.warn('Geolocation error:', err.message);
                            fetchFromIP();
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 5000,
                            maximumAge: 0,
                        }
                    );
                } else {
                    fetchFromIP();
                }
            },
        }),
        {
            name: 'location-storage', // 🔐 localStorage key
            partialize: (state) => ({
                city: state.city,
                country: state.country,
                latitude: state.latitude,
                longitude: state.longitude,
            }), // only persist relevant fields
        }
    )
);

export default useLocationStore;
