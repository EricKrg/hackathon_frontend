import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagrammComponent } from './instagramm.component';

describe('InstagrammComponent', () => {
  let component: InstagrammComponent;
  let fixture: ComponentFixture<InstagrammComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstagrammComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagrammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
