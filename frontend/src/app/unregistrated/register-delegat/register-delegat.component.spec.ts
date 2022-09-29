import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDelegatComponent } from './register-delegat.component';

describe('RegisterDelegatComponent', () => {
  let component: RegisterDelegatComponent;
  let fixture: ComponentFixture<RegisterDelegatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDelegatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDelegatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
