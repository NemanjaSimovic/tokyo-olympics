import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnesiRezultateTenisComponent } from './unesi-rezultate-tenis.component';

describe('UnesiRezultateTenisComponent', () => {
  let component: UnesiRezultateTenisComponent;
  let fixture: ComponentFixture<UnesiRezultateTenisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnesiRezultateTenisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnesiRezultateTenisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
