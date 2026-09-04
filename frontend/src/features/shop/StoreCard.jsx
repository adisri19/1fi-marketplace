import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation } from 'lucide-react';
import { formatDistance, getDistance } from '../../services/nearbyStores';

export default function StoreCard({ store, userCoords }) {
  const distance =
    store?.distanceMetres !== undefined
      ? store.distanceMetres
      : userCoords?.lat && store?.lat
      ? getDistance(userCoords.lat, userCoords.lng, store.lat, store.lng)
      : null;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;

  return (
    <div className="bg-white rounded-card border border-[#E4E4E7] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#DDD6FE] hover:shadow-[0_6px_20px_rgba(75,31,214,0.08)] transition-all flex flex-col justify-between">
      <div>
        {/* Store Title & Distance Badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏪</span>
            <h3 className="font-bold text-base text-zinc-900 leading-snug">
              {store.name}
            </h3>
          </div>
          {distance !== null && (
            <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-pill bg-[#EDE9FE] text-[#4B1FD6] border border-[#DDD6FE]">
              <Navigation className="w-3 h-3" />
              {formatDistance(distance)}
            </span>
          )}
        </div>

        {/* Store Address */}
        <div className="flex items-start gap-2 text-xs text-zinc-500 mt-2">
          <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
          <span className="line-clamp-2 leading-relaxed">{store.address}</span>
        </div>

        {/* Operating Hours */}
        {store.openingHours && (
          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-2">
            <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>{store.openingHours}</span>
          </div>
        )}

        {/* Phone */}
        {store.phone && (
          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-2">
            <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>{store.phone}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-zinc-100 grid grid-cols-2 gap-2">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-pill bg-[#4B1FD6] hover:bg-[#3B0764] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <span>Get Directions</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {store.phone ? (
          <a
            href={`tel:${store.phone.replace(/\s+/g, '')}`}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-pill bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold transition-colors"
          >
            <Phone className="w-3 h-3 text-zinc-500" />
            <span>Call Store</span>
          </a>
        ) : (
          <span className="flex items-center justify-center py-2 px-3 rounded-pill bg-zinc-50 text-zinc-400 text-xs font-medium">
            Walk-in Partner
          </span>
        )}
      </div>
    </div>
  );
}
