import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavaSportistaComponent } from './prijava-sportista.component';

describe('PrijavaSportistaComponent', () => {
  let component: PrijavaSportistaComponent;
  let fixture: ComponentFixture<PrijavaSportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrijavaSportistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrijavaSportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
