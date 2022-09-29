import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatHomeComponent } from './delegat-home.component';

describe('DelegatHomeComponent', () => {
  let component: DelegatHomeComponent;
  let fixture: ComponentFixture<DelegatHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegatHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegatHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
