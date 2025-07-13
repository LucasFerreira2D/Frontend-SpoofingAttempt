import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDialog } from './map-dialog';

describe('MapDialog', () => {
  let component: MapDialog;
  let fixture: ComponentFixture<MapDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
