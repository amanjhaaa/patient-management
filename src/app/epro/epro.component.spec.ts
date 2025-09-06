import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EproComponent } from './epro.component';

describe('EproComponent', () => {
  let component: EproComponent;
  let fixture: ComponentFixture<EproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EproComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
