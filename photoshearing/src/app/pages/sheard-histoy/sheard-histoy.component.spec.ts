import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheardHistoyComponent } from './sheard-histoy.component';

describe('SheardHistoyComponent', () => {
  let component: SheardHistoyComponent;
  let fixture: ComponentFixture<SheardHistoyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SheardHistoyComponent]
    });
    fixture = TestBed.createComponent(SheardHistoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
