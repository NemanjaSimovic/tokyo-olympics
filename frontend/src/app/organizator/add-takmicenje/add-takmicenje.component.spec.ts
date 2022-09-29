import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTakmicenjeComponent } from './add-takmicenje.component';

describe('AddTakmicenjeComponent', () => {
  let component: AddTakmicenjeComponent;
  let fixture: ComponentFixture<AddTakmicenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTakmicenjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTakmicenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
