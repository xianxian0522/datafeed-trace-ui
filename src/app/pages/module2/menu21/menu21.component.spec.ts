import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu21Component } from './menu21.component';

describe('Menu21Component', () => {
  let component: Menu21Component;
  let fixture: ComponentFixture<Menu21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Menu21Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Menu21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
