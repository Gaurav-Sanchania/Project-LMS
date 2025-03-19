import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingholidaysComponent } from './upcomingholidays.component';

describe('UpcomingholidaysComponent', () => {
  let component: UpcomingholidaysComponent;
  let fixture: ComponentFixture<UpcomingholidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingholidaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingholidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
