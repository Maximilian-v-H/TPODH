import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TepeComponent } from './tepe.component';

describe('TepeComponent', () => {
  let component: TepeComponent;
  let fixture: ComponentFixture<TepeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TepeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TepeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
