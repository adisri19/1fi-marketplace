// src/services/nearbyStores.js

const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];

export const fetchNearbyStores = async (lat, lng, radiusMeters = 5000) => {
  // Tighter, faster query — only mobile_phone shops and electronics
  const query = `[out:json][timeout:30];(node["shop"="mobile_phone"](around:${radiusMeters},${lat},${lng});node["shop"="electronics"](around:${radiusMeters},${lat},${lng}););out body 50;`;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const controller = new AbortController();
      // 20 second timeout — Overpass cold starts take 10-15s
      const timer = setTimeout(() => controller.abort(), 20000);

      const response = await fetch(endpoint, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ data: query }).toString(),
      });

      clearTimeout(timer);

      if (!response.ok) {
        console.warn(`Overpass ${endpoint} returned ${response.status}`);
        continue;
      }

      const data = await response.json();

      if (!data.elements || data.elements.length === 0) {
        // Real API worked but found nothing — return empty, don't fallback
        return [];
      }

      return data.elements.map((el) => ({
        id: String(el.id),
        name: el.tags?.name || el.tags?.['name:en'] || 'Mobile Store',
        address: [
          el.tags?.['addr:housenumber'],
          el.tags?.['addr:street'],
          el.tags?.['addr:suburb'],
          el.tags?.['addr:city'],
        ]
          .filter(Boolean)
          .join(', ') || el.tags?.['addr:full'] || 'Address not listed',
        lat: el.lat,
        lng: el.lon,
        phone: el.tags?.phone || el.tags?.['contact:phone'] || null,
        openingHours: el.tags?.opening_hours || null,
      }));
    } catch (err) {
      if (err.name === 'AbortError') {
        console.warn(`Overpass timeout: ${endpoint}`);
      } else {
        console.warn(`Overpass error: ${endpoint}`, err.message);
      }
      continue; // try next endpoint
    }
  }

  // All endpoints failed — throw so UI shows proper error state (NOT fake stores)
  throw new Error('Unable to reach store directory. Check your connection.');
};

export const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export const formatDistance = (metres) => {
  if (metres < 1000) return `${metres} m`;
  return `${(metres / 1000).toFixed(1)} km`;
};
