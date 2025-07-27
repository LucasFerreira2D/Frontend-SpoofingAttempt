import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {
  DateAdapter,
  NativeDateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  MatDateFormats
} from '@angular/material/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SpoofingAttempt} from '../../models/spoofingAttempt';
import {SpoofingAttemptService} from '../../service/spoofingAttemptService';
import {MatDialog} from '@angular/material/dialog';
import {ImageDialogComponent} from '../image-dialog/image-dialog';
import {MapDialogComponent} from '../map-dialog/map-dialog';

registerLocaleData(localePt);

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {dateInput: 'DD/MM/YYYY'},
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

export class AppDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if (typeof value === 'string' && value.includes('/')) {
      const [d, m, y] = value.split('/');
      return new Date(+y, +m - 1, +d);
    }
    return super.parse(value);
  }
}

@Component({
  standalone: false,
  selector: 'app-spoofing-attempt-list',
  templateUrl: './spoofing-attempt-list.html',
  styleUrls: ['./spoofing-attempt-list.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: DateAdapter, useClass: AppDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
  ]
})
export class SpoofingAttemptList implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = ['id', 'attemptDateHour', 'map', 'imageSpoofing'];
  dataSource = new MatTableDataSource<SpoofingAttempt>([]);

  dateRange = new FormGroup({
    start: new FormControl<Date | null>(this.getTodayStart()),
    end: new FormControl<Date | null>(this.getTodayEnd()),
  });

  searchControl = new FormControl<string>('');

  center: google.maps.LatLngLiteral = { lat: -14.2350, lng: -51.9253 }; // Centro do Brasil
  markers: Array<any> = [];
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    styles: []
  };

  highlightedId: number | null = null;
  today: Date = new Date();

  constructor(
    private service: SpoofingAttemptService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadData();

    setInterval(() => {
      this.loadData(); // ou this.loadData(true);
    }, 10_000);

    this.setupFilterPredicate();
    this.registerFilterListeners();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadData(keepPaginator = true) {
    const currentPageIndex = this.paginator?.pageIndex ?? 0;

    this.service.getAll().subscribe(data => {
      data.forEach(item => {
        item.attemptDateHour = new Date(item.attemptDateHour);
      });

      data.sort((a, b) =>
        b.attemptDateHour.getTime() - a.attemptDateHour.getTime()
      );

      this.dataSource.data = data;
      this.loadMarkers(data);

      this.dataSource.filter = new Date().getTime().toString();

      // Mantém a página atual (evita sempre voltar pro início)
      if (keepPaginator && this.paginator) {
        this.paginator.pageIndex = currentPageIndex;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  setupFilterPredicate() {
    this.dataSource.filterPredicate = (item: SpoofingAttempt) => {
      const { start, end } = this.dateRange.value;
      const txt = this.searchControl.value?.trim().toLowerCase() || '';
      const dt = new Date(item.attemptDateHour);

      // Normaliza para o início do dia
      const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

      const itemDate = normalizeDate(dt);
      const startDate = start ? normalizeDate(start) : null;
      const endDate = end ? normalizeDate(end) : null;

      const okDate = (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);

      const okText = txt === '' ? true : Object.values(item).some(v => v != null && v.toString().toLowerCase().includes(txt));

      return okDate && okText;
    };
  }

  registerFilterListeners() {
    this.dateRange.valueChanges.subscribe(() => {
      this.dataSource.filter = new Date().getTime().toString(); // força atualização
      this.paginator.firstPage();
    });
    this.searchControl.valueChanges.subscribe(() => {
      this.dataSource.filter = new Date().getTime().toString(); // força atualização
      this.paginator.firstPage();
    });
  }

  openMap(latitude: number, longitude: number) {
    this.dialog.open(MapDialogComponent, {
      data: { latitude, longitude },
      panelClass: 'map-dialog-container'
    });
  }

  openImage(base64Image: string) {
    this.dialog.open(ImageDialogComponent, {
      data: { image: base64Image },
      panelClass: 'custom-dialog-container'
    });
  }

  loadMarkers(data: any[]) {
    const validMarkers = data.filter(e =>
      !isNaN(parseFloat(e.latitude)) &&
      !isNaN(parseFloat(e.longitude))
    );

    this.markers = validMarkers.map(e => ({
      id: e.id,
      position: {
        lat: parseFloat(e.latitude),
        lng: parseFloat(e.longitude)
      },
      title: `ID: ${e.id}`,
      options: {
        animation: google.maps.Animation.DROP
      }
    }));

    this.center = this.markers.length ? this.markers[0].position : { lat: -14.2350, lng: -51.9253 }; // fallback pro Brasil
  }

  highlightRow(id: number) {
    this.highlightedId = id;

    // Limpa o destaque após 2 segundos
    setTimeout(() => {
      this.highlightedId = null;
    }, 2000);

    // Scroll até a linha
    const rowEl = document.getElementById(`row-${id}`);
    if (rowEl) {
      rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  onFilterClick() {
    this.ngOnInit();
  }

  getTodayStart(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 00:00:00
    return today;
  }

  getTodayEnd(): Date {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // 23:59:59.999
    return today;
  }

}
