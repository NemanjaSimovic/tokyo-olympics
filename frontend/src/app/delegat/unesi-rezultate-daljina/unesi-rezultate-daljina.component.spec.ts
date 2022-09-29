import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnesiRezultateDaljinaComponent } from './unesi-rezultate-daljina.component';

describe('UnesiRezultateDaljinaComponent', () => {
  let component: UnesiRezultateDaljinaComponent;
  let fixture: ComponentFixture<UnesiRezultateDaljinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnesiRezultateDaljinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnesiRezultateDaljinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
