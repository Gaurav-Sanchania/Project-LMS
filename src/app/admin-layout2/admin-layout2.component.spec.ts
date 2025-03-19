import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayout2Component } from './admin-layout2.component';

describe('AdminLayout2Component', () => {
  let component: AdminLayout2Component;
  let fixture: ComponentFixture<AdminLayout2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLayout2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLayout2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
