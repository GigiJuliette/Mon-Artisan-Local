/**
 * Format distance for display
 */
export function formatDistance(km: number | string | null | undefined): string {
  if (km === null || km === undefined) return "";

  // Convert to number if it's a string
  const distance = typeof km === 'string' ? parseFloat(km) : km;

  // Check if conversion was successful
  if (isNaN(distance)) return "";

  // Negative distance means no location data
  if (distance < 0) return "No location";

  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }

  return `${distance.toFixed(1)} km`;
}
