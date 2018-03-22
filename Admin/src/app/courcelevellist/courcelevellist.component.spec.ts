import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourcelevellistComponent } from './courcelevellist.component';

describe('CourcelevellistComponent', () => {
  let component: CourcelevellistComponent;
  let fixture: ComponentFixture<CourcelevellistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourcelevellistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourcelevellistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
