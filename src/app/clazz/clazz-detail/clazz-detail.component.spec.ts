import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClazzDetailComponent } from './clazz-detail.component';

describe('ClazzDetailComponent', () => {
  let component: ClazzDetailComponent;
  let fixture: ComponentFixture<ClazzDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClazzDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClazzDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
