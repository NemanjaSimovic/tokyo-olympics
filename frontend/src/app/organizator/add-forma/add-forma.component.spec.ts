import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormaComponent } from './add-forma.component';

describe('AddFormaComponent', () => {
  let component: AddFormaComponent;
  let fixture: ComponentFixture<AddFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
