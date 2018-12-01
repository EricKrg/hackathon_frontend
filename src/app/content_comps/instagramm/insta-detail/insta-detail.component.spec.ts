import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaDetailComponent } from './insta-detail.component';

describe('InstaDetailComponent', () => {
  let component: InstaDetailComponent;
  let fixture: ComponentFixture<InstaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
