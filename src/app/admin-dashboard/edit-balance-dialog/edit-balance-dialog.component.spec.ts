import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBalanceDialogComponent } from './edit-balance-dialog.component';

describe('EditBalanceDialogComponent', () => {
  let component: EditBalanceDialogComponent;
  let fixture: ComponentFixture<EditBalanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBalanceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBalanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
