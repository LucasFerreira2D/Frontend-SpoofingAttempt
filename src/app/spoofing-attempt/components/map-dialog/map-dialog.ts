import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  standalone: false,
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.html',
  styleUrls: ['./map-dialog.scss']
})
export class MapDialogComponent {

  mapUrl: SafeResourceUrl;

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { latitude: number, longitude: number },
    private sanitizer: DomSanitizer
  ) {
    const { latitude, longitude } = data;
    this.mapUrl = this.getMapUrl(latitude, longitude);
  }

  getMapUrl(lat: number, lng: number): SafeResourceUrl {
    const url = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
