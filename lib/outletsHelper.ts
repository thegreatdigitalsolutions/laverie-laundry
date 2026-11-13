import { OutletItem } from "@/data/outlets";

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Extract latitude and longitude from an outlet's Google Maps URL, embed URL, or location name
 */
export function getOutletCoordinates(outlet: OutletItem): Coordinates {
  const combined = `${outlet.mapsEmbedUrl || ""} ${outlet.mapsUrl || ""}`;

  // 1. Check Google Maps embed pattern: !3d(-?\d+\.\d+)!2d(-?\d+\.\d+)
  const embed3dMatch = combined.match(/!3d(-?\d+\.\d+)!2d(-?\d+\.\d+)/);
  if (embed3dMatch) {
    return { lat: parseFloat(embed3dMatch[1]), lng: parseFloat(embed3dMatch[2]) };
  }

  // 2. Check query or ll coordinates pattern: (q=|ll=|@)(-?\d+\.\d+),(-?\d+\.\d+)
  const coordMatch = combined.match(/(?:q=|ll=|@)(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordMatch) {
    return { lat: parseFloat(coordMatch[1]), lng: parseFloat(coordMatch[2]) };
  }

  // 3. Fallback based on outlet identifier
  if (outlet.id === "outlet-greenbay" || outlet.tabName.toLowerCase().includes("greenbay")) {
    return { lat: -6.1097, lng: 106.7797 }; // Bay Walk Mall, GreenBay Pluit
  }

  // Default to PIK coordinates
  return { lat: -6.1105, lng: 106.7408 };
}

/**
 * Calculate distance in kilometers between two coordinates using the Haversine formula
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Find the nearest active outlet based on user coordinates
 */
export function findNearestOutlet(outlets: OutletItem[], userCoords: Coordinates): OutletItem | null {
  const activeOutlets = outlets.filter((o) => o.status !== "Inactive");
  if (activeOutlets.length === 0) return null;

  let nearest = activeOutlets[0];
  let minDistance = Infinity;

  for (const outlet of activeOutlets) {
    const coords = getOutletCoordinates(outlet);
    const dist = calculateDistance(userCoords, coords);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = outlet;
    }
  }

  return nearest;
}

/**
 * Check if coordinates are within the 5 km target service radius of any active outlet
 */
export function checkServiceRadius(
  userCoords: Coordinates | null,
  outlets: OutletItem[],
  maxRadiusKm = 5
): { isWithinRange: boolean; distanceKm: number | null; nearestOutlet: OutletItem | null } {
  const activeOutlets = outlets.filter((o) => o.status !== "Inactive");
  if (!userCoords || activeOutlets.length === 0) {
    return { isWithinRange: true, distanceKm: null, nearestOutlet: activeOutlets[0] || null };
  }

  let minDistance = Infinity;
  let nearest: OutletItem | null = null;

  for (const outlet of activeOutlets) {
    const coords = getOutletCoordinates(outlet);
    const dist = calculateDistance(userCoords, coords);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = outlet;
    }
  }

  return {
    isWithinRange: minDistance <= maxRadiusKm,
    distanceKm: Math.round(minDistance * 10) / 10,
    nearestOutlet: nearest || activeOutlets[0] || null,
  };
}

/**
 * Format a clean international WhatsApp URL
 */
export function formatWhatsAppUrl(phone?: string, message?: string): string {
  const rawPhone = (phone || "").replace(/[^0-9]/g, "");
  const cleanPhone = rawPhone.startsWith("0") ? "62" + rawPhone.slice(1) : rawPhone;
  const encodedMsg = message ? encodeURIComponent(message) : "";

  if (cleanPhone) {
    return encodedMsg ? `https://wa.me/${cleanPhone}?text=${encodedMsg}` : `https://wa.me/${cleanPhone}`;
  }
  return encodedMsg ? `https://wa.me/?text=${encodedMsg}` : "https://wa.me/";
}
