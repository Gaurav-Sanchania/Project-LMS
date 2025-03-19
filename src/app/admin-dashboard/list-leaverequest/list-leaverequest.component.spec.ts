import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLeaverequestComponent } from './list-leaverequest.component';

describe('ListLeaverequestComponent', () => {
  let component: ListLeaverequestComponent;
  let fixture: ComponentFixture<ListLeaverequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLeaverequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLeaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
