import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheardPopupComponent } from './sheard-popup.component';

describe('SheardPopupComponent', () => {
  let component: SheardPopupComponent;
  let fixture: ComponentFixture<SheardPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SheardPopupComponent]
    });
    fixture = TestBed.createComponent(SheardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
