import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnesiRezultateComponent } from './unesi-rezultate.component';

describe('UnesiRezultateComponent', () => {
  let component: UnesiRezultateComponent;
  let fixture: ComponentFixture<UnesiRezultateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnesiRezultateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnesiRezultateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
