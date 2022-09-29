import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnesiRezultateStreljastvoComponent } from './unesi-rezultate-streljastvo.component';

describe('UnesiRezultateStreljastvoComponent', () => {
  let component: UnesiRezultateStreljastvoComponent;
  let fixture: ComponentFixture<UnesiRezultateStreljastvoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnesiRezultateStreljastvoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnesiRezultateStreljastvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
