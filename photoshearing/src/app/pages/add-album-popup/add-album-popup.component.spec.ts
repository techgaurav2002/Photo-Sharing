import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlbumPopupComponent } from './add-album-popup.component';

describe('AddAlbumPopupComponent', () => {
  let component: AddAlbumPopupComponent;
  let fixture: ComponentFixture<AddAlbumPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAlbumPopupComponent]
    });
    fixture = TestBed.createComponent(AddAlbumPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
