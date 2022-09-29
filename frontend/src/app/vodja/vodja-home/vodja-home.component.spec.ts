import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodjaHomeComponent } from './vodja-home.component';

describe('VodjaHomeComponent', () => {
  let component: VodjaHomeComponent;
  let fixture: ComponentFixture<VodjaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodjaHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodjaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
