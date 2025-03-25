import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHolidayComponent } from './admin-holiday.component';

describe('AdminHolidayComponent', () => {
  let component: AdminHolidayComponent;
  let fixture: ComponentFixture<AdminHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHolidayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
