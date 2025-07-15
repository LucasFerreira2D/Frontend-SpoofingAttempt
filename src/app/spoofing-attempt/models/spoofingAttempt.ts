export interface SpoofingAttempt {
  id: string;
  attemptDateHour: Date; // ISO string
  latitude: string;
  longitude: string;
  imageSpoofing: string;
}
