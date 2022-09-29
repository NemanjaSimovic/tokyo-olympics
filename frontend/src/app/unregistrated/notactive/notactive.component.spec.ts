import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotactiveComponent } from './notactive.component';

describe('NotactiveComponent', () => {
  let component: NotactiveComponent;
  let fixture: ComponentFixture<NotactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
