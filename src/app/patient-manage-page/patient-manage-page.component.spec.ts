import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientManagePageComponent } from './patient-manage-page.component';

describe('PatientManagePageComponent', () => {
  let component: PatientManagePageComponent;
  let fixture: ComponentFixture<PatientManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientManagePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
