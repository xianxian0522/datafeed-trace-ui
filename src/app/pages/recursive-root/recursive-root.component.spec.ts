import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveRootComponent } from './recursive-root.component';

describe('RecursiveRootComponent', () => {
  let component: RecursiveRootComponent;
  let fixture: ComponentFixture<RecursiveRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursiveRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursiveRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
