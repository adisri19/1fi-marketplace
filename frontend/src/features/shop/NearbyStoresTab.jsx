import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Phone, Navigation, RefreshCw, AlertCircle } from 'lucide-react';
import { fetchNearbyStores, getDistance } from '../../services/nearbyStores';
import StoreCard from './StoreCard';
import { StoreSkeleton } from '../../components/ui/Skeleton';

export default function NearbyStoresTab() {
  const [locationStatus, setLocationStatus] = useState('idle');
  // 'idle' | 'requesting' | 'granted' | 'denied' | 'error'
  const [userCoords, setUserCoords] = useState(null);
  const [stores, setStores] = useState([]);
  const [radius, setRadius] = useState(5000); // metres
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Step 1: Request location
  const requestLocation = useCallback(() => {
    setLocationStatus('requesting');
    setFetchError(null);

    if (!navigator.geolocation) {
      setLocationStatus('error');
      setFetchError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCoords(coords);
        setLocationStatus('granted');
      },
      (error) => {
        console.error('Geolocation error:', error);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus('denied');
        } else {
          setLocationStatus('error');
          setFetchError('Could not determine your location. Please try again.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  // Step 2: Fetch stores whenever coords or radius changes
  useEffect(() => {
    if (!userCoords) return;

    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const results = await fetchNearbyStores(userCoords.lat, userCoords.lng, radius);
        if (!isMounted) return;

        // Sort by distance
        const withDistance = results
          .map((s) => ({
            ...s,
            distanceMetres: getDistance(userCoords.lat, userCoords.lng, s.lat, s.lng),
          }))
          .sort((a, b) => a.distanceMetres - b.distanceMetres);
        setStores(withDistance);
      } catch (err) {
        console.error('Overpass fetch error:', err);
        if (isMounted) {
          setFetchError('Could not fetch nearby stores. Check your connection and try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [userCoords, radius]);

  // ── RENDER STATES ──────────────────────────────────────────────

  // Idle — permission not asked yet
  if (locationStatus === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center bg-white rounded-3xl border border-[#E4E4E7] shadow-xs my-4 max-w-lg mx-auto">
        <div className="w-20 h-20 bg-[#EDE9FE] rounded-full flex items-center justify-center mb-6 shadow-inner">
          <MapPin className="w-10 h-10 text-[#4B1FD6]" />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 mb-2">Find Stores Near You</h3>
        <p className="text-zinc-500 text-sm mb-6 max-w-sm leading-relaxed">
          Allow location access to discover partner mobile stores where you can
          pay using your 1Fi mutual fund limit.
        </p>
        <button
          onClick={requestLocation}
          className="bg-[#4B1FD6] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#3B0764] transition-colors shadow-md shadow-[#4B1FD6]/25 active:scale-95"
        >
          Allow Location Access
        </button>
        {/* Fallback: demo with Mumbai coordinates */}
        <button
          onClick={() => {
            setUserCoords({ lat: 19.0596, lng: 72.8295 }); // Bandra, Mumbai
            setLocationStatus('granted');
          }}
          className="mt-4 text-[#4B1FD6] text-xs font-semibold hover:underline"
        >
          Use demo location instead
        </button>
      </div>
    );
  }

  // Requesting — spinner
  if (locationStatus === 'requesting') {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-[#E4E4E7] my-4">
        <div className="w-12 h-12 border-4 border-[#4B1FD6] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-zinc-600 font-semibold text-sm">Getting your location...</p>
      </div>
    );
  }

  // Denied
  if (locationStatus === 'denied') {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center bg-white rounded-3xl border border-red-200 shadow-xs my-4 max-w-lg mx-auto">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-bold text-zinc-900 mb-2">Location Access Denied</h3>
        <p className="text-zinc-500 text-xs mb-4 max-w-xs">
          To find nearby stores, enable location in your browser settings:
        </p>
        <ol className="text-left text-xs text-zinc-600 space-y-1.5 mb-6 max-w-xs bg-zinc-50 p-4 rounded-xl border border-zinc-200">
          <li>1. Click the 🔒 icon in your address bar</li>
          <li>2. Set "Location" to "Allow"</li>
          <li>3. Refresh the page or click below</li>
        </ol>
        <button
          onClick={() => {
            setUserCoords({ lat: 19.0596, lng: 72.8295 });
            setLocationStatus('granted');
          }}
          className="bg-[#4B1FD6] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-[#3B0764] transition-colors"
        >
          Use Mumbai Demo Location
        </button>
      </div>
    );
  }

  // Error
  if (locationStatus === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-amber-200 shadow-xs my-4 max-w-lg mx-auto">
        <AlertCircle className="w-10 h-10 text-amber-500 mb-3" />
        <h3 className="text-base font-bold text-zinc-900 mb-1">Location Error</h3>
        <p className="text-zinc-500 text-xs mb-4">{fetchError}</p>
        <div className="flex gap-2">
          <button
            onClick={requestLocation}
            className="px-5 py-2 bg-[#4B1FD6] text-white text-xs font-bold rounded-full"
          >
            Retry
          </button>
          <button
            onClick={() => {
              setUserCoords({ lat: 19.0596, lng: 72.8295 });
              setLocationStatus('granted');
            }}
            className="px-5 py-2 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-full"
          >
            Use Demo Location
          </button>
        </div>
      </div>
    );
  }

  // Granted — show stores
  return (
    <div className="space-y-6">
      {/* Header + Radius filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">Nearby Partner Stores</h2>
          <p className="text-sm text-zinc-500 mt-0.5">
            Walk in & scan 1Fi QR to pay via Mutual Funds
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold text-zinc-400">Radius:</span>
          {[2000, 5000, 10000].map((r) => (
            <button
              key={r}
              onClick={() => setRadius(r)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                radius === r
                  ? 'bg-[#4B1FD6] text-white shadow-xs'
                  : 'bg-white border border-[#E4E4E7] text-zinc-600 hover:border-[#4B1FD6]'
              }`}
            >
              {r / 1000} km
            </button>
          ))}
          <button
            onClick={() => {
              setUserCoords((prev) => (prev ? { ...prev } : { lat: 19.0596, lng: 72.8295 }));
            }}
            className="ml-1 p-2 rounded-full bg-white border border-[#E4E4E7] hover:bg-zinc-50 text-zinc-500 hover:text-[#4B1FD6] transition-colors"
            title="Refresh stores"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-zinc-400 animate-pulse">
            Fetching mobile and electronics partner counters near you...
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <StoreSkeleton key={n} />
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && fetchError && (
        <div className="text-center py-12 bg-white rounded-2xl border border-red-200">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-zinc-600 text-sm">{fetchError}</p>
          <button
            onClick={() => setUserCoords({ ...userCoords })}
            className="mt-4 text-[#4B1FD6] font-semibold underline text-xs"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !fetchError && stores.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E4E4E7]">
          <MapPin className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
          <h3 className="font-semibold text-zinc-800 mb-1 text-sm">No stores found nearby</h3>
          <p className="text-zinc-500 text-xs mb-4">
            Try expanding the radius to find more partner stores.
          </p>
          <button
            onClick={() => setRadius(10000)}
            className="bg-[#4B1FD6] text-white px-6 py-2 rounded-full text-xs font-bold"
          >
            Search within 10 km
          </button>
        </div>
      )}

      {/* Store list */}
      {!loading && stores.length > 0 && (
        <div className="space-y-4">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            {stores.length} partner stores found within {radius / 1000} km
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} userCoords={userCoords} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
