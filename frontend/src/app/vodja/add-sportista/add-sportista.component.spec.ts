import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSportistaComponent } from './add-sportista.component';

describe('AddSportistaComponent', () => {
  let component: AddSportistaComponent;
  let fixture: ComponentFixture<AddSportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSportistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
