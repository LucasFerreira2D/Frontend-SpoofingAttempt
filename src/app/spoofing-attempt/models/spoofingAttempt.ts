export interface SpoofingAttempt {
  id: string;
  attemptDateHour: string; // ISO string
  latitude?: string;
  longitude?: string;
  imageSpoofing?: string;
}
