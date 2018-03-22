import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourcelevelComponent } from './courcelevel.component';

describe('CourcelevelComponent', () => {
  let component: CourcelevelComponent;
  let fixture: ComponentFixture<CourcelevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourcelevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourcelevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
