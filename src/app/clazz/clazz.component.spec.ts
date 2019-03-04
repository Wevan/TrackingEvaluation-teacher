import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzComponent } from './clazz.component';

describe('ClazzComponent', () => {
  let component: ClazzComponent;
  let fixture: ComponentFixture<ClazzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClazzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
