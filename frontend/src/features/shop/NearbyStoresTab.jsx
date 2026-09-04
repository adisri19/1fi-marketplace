import React, { useState } from 'react';
import { useProductStore } from '../../store/productStore';
import { useNearbyStores } from '../../hooks/useNearbyStores';
import StoreCard from './StoreCard';
import { Skeleton } from '../../components/ui/Skeleton';
import { MapPin, Navigation, AlertCircle, RefreshCw, Compass } from 'lucide-react';

export default function NearbyStoresTab() {
  const {
    userLocation,
    locationStatus,
    setUserLocation,
    setLocationStatus,
  } = useProductStore();

  const [radiusMeters, setRadiusMeters] = useState(5000);

  // If user location is not yet set, we ask for permission
  const requestLocation = () => {
    setLocationStatus('loading');
    if (!navigator.geolocation) {
      // Fallback coordinates (e.g. Mumbai center)
      setUserLocation({ lat: 19.076, lng: 72.8777 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn('Geolocation denied or unavailable:', err.message);
        // Set denied status or gracefully use Mumbai default with status
        setLocationStatus('denied');
      },
      { timeout: 10000 }
    );
  };

  const useDefaultLocation = () => {
    setUserLocation({ lat: 19.076, lng: 72.8777 });
  };

  const {
    data: stores,
    isLoading,
    isError,
    error,
    refetch,
  } = useNearbyStores(userLocation, radiusMeters, locationStatus === 'granted');

  return (
    <div className="space-y-6">
      {/* Top Header & Radius Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Nearby Partner Retail Stores
          </h2>
          <p className="text-sm text-zinc-500 mt-0.5">
            Walk into authorized retail counters & scan 1Fi QR to pay via Mutual Funds
          </p>
        </div>

        {/* Radius filter pills */}
        {locationStatus === 'granted' && (
          <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-[#E4E4E7] rounded-pill self-start sm:self-auto shadow-xs">
            <span className="text-xs font-semibold text-zinc-400 pl-2">Radius:</span>
            {[
              { label: '2 km', value: 2000 },
              { label: '5 km', value: 5000 },
              { label: '10 km', value: 10000 },
            ].map((r) => (
              <button
                key={r.value}
                onClick={() => setRadiusMeters(r.value)}
                className={`px-3 py-1 text-xs font-semibold rounded-pill transition-all ${
                  radiusMeters === r.value
                    ? 'bg-[#4B1FD6] text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Permission not yet granted */}
      {locationStatus === 'idle' && (
        <div className="bg-white rounded-2xl p-10 sm:p-14 text-center border border-[#E4E4E7] shadow-sm max-w-lg mx-auto my-6">
          <div className="w-16 h-16 rounded-2xl bg-[#EDE9FE] text-[#4B1FD6] flex items-center justify-center mx-auto mb-4 shadow-inner">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">
            Find Partner Stores Near You
          </h3>
          <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
            Allow location access to discover mobile phone stores, Croma, and Reliance Digital outlets accepting 1Fi mutual fund checkout nearby.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={requestLocation}
              className="w-full sm:w-auto px-6 py-3 bg-[#4B1FD6] hover:bg-[#3B0764] text-white font-bold text-sm rounded-pill shadow-md shadow-[#4B1FD6]/20 transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Allow Location Access</span>
            </button>
            <button
              onClick={useDefaultLocation}
              className="w-full sm:w-auto px-4 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold text-xs rounded-pill transition-colors"
            >
              Use Mumbai Location
            </button>
          </div>
        </div>
      )}

      {/* Permission loading state */}
      {locationStatus === 'loading' && (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E4E4E7] shadow-sm my-6">
          <Compass className="w-10 h-10 text-[#4B1FD6] animate-spin mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-900 mb-1">Detecting your location...</h3>
          <p className="text-xs text-zinc-400">Please respond to the browser prompt.</p>
        </div>
      )}

      {/* Permission denied state */}
      {locationStatus === 'denied' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center max-w-lg mx-auto my-6">
          <AlertCircle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
          <h3 className="text-base font-bold text-amber-900 mb-1">Location Access Denied</h3>
          <p className="text-xs text-amber-700 mb-4 leading-relaxed">
            Location access was blocked. You can enable it in your browser settings or view partner stores with our Mumbai demo location.
          </p>
          <button
            onClick={useDefaultLocation}
            className="px-5 py-2.5 bg-[#4B1FD6] hover:bg-[#3B0764] text-white text-xs font-bold rounded-pill shadow-xs transition-colors"
          >
            Show Mumbai Partner Stores
          </button>
        </div>
      )}

      {/* Fetching stores loading skeleton */}
      {locationStatus === 'granted' && isLoading && (
        <div className="space-y-4">
          <p className="text-xs font-medium text-zinc-500 animate-pulse">
            Searching for mobile & electronics stores within {radiusMeters / 1000}km of your location...
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-card p-5 border border-zinc-200 shadow-xs space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Skeleton className="h-9 rounded-pill" />
                  <Skeleton className="h-9 rounded-pill" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stores List */}
      {locationStatus === 'granted' && !isLoading && stores && stores.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {stores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              userCoords={userLocation}
            />
          ))}
        </div>
      )}

      {/* Empty State when no stores found in radius */}
      {locationStatus === 'granted' && !isLoading && (!stores || stores.length === 0) && (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E4E4E7] shadow-sm my-6">
          <p className="text-zinc-600 font-semibold mb-1">
            No stores found within {radiusMeters / 1000}km
          </p>
          <p className="text-zinc-400 text-xs mb-4">Try expanding the search radius</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setRadiusMeters(10000)}
              className="px-4 py-2 bg-[#4B1FD6] text-white text-xs font-bold rounded-pill"
            >
              Expand to 10 km
            </button>
            <button
              onClick={useDefaultLocation}
              className="px-4 py-2 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-pill"
            >
              Switch to Metro Hub
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
