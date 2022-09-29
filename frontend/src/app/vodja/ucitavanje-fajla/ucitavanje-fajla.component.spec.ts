import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcitavanjeFajlaComponent } from './ucitavanje-fajla.component';

describe('UcitavanjeFajlaComponent', () => {
  let component: UcitavanjeFajlaComponent;
  let fixture: ComponentFixture<UcitavanjeFajlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcitavanjeFajlaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UcitavanjeFajlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
