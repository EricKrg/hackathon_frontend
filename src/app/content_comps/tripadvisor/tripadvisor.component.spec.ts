import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripadvisorComponent } from './tripadvisor.component';

describe('TripadvisorComponent', () => {
  let component: TripadvisorComponent;
  let fixture: ComponentFixture<TripadvisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripadvisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripadvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
