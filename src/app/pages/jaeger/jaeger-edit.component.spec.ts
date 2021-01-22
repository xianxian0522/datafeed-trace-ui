import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaegerEditComponent } from './jaeger-edit.component';

describe('JaegerEditComponent', () => {
  let component: JaegerEditComponent;
  let fixture: ComponentFixture<JaegerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JaegerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JaegerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
