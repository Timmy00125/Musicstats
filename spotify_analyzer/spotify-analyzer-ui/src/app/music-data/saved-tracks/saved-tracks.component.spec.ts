import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedTracksComponent } from './saved-tracks.component';

describe('SavedTracksComponent', () => {
  let component: SavedTracksComponent;
  let fixture: ComponentFixture<SavedTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedTracksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
