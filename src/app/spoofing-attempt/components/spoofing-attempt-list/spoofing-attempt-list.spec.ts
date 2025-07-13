import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoofingAttemptList } from './spoofing-attempt-list';

describe('SpoofingAttemptList', () => {
  let component: SpoofingAttemptList;
  let fixture: ComponentFixture<SpoofingAttemptList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpoofingAttemptList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpoofingAttemptList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
