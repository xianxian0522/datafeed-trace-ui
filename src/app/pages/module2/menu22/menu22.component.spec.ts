import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu22Component } from './menu22.component';

describe('Menu22Component', () => {
  let component: Menu22Component;
  let fixture: ComponentFixture<Menu22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Menu22Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Menu22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
