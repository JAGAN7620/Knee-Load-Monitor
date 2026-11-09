/**
 * Formats biomechanical force in Newtons (N)
 */
export function formatForce(newtons: number): string {
  return `${newtons.toLocaleString()} N`;
}

/**
 * Formats knee joint flexion angle in degrees (°)
 */
export function formatAngle(degrees: number): string {
  return `${Math.round(degrees)}°`;
}

/**
 * Formats session duration into hours and minutes
 */
export function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  return `${mins}m`;
}

