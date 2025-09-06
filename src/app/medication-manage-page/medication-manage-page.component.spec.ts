import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationManagePageComponent } from './medication-manage-page.component';

describe('MedicationManagePageComponent', () => {
  let component: MedicationManagePageComponent;
  let fixture: ComponentFixture<MedicationManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicationManagePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicationManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
