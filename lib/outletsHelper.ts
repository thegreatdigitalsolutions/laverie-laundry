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

  // 3. Fallback based on city/district keywords
  const text = `${outlet.tabName} ${outlet.name} ${outlet.address} ${combined}`.toLowerCase();

  if (text.includes("pik") || text.includes("pantai indah kapuk") || text.includes("jakarta")) {
    return { lat: -6.1105, lng: 106.7408 }; // PIK, North Jakarta
  }
  if (text.includes("seminyak")) {
    return { lat: -8.6883, lng: 115.1580 }; // Seminyak, Bali
  }
  if (text.includes("canggu") || text.includes("pererenan") || text.includes("berawa")) {
    return { lat: -8.6500, lng: 115.1333 }; // Canggu, Bali
  }
  if (text.includes("bali")) {
    return { lat: -8.5069, lng: 115.2625 }; // Bali region
  }

  // Default coordinate (Jakarta)
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

