import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheardAlbumComponent } from './sheard-album.component';

describe('SheardAlbumComponent', () => {
  let component: SheardAlbumComponent;
  let fixture: ComponentFixture<SheardAlbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SheardAlbumComponent]
    });
    fixture = TestBed.createComponent(SheardAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
