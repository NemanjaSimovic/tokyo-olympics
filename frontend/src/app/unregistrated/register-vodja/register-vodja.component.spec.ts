import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVodjaComponent } from './register-vodja.component';

describe('RegisterVodjaComponent', () => {
  let component: RegisterVodjaComponent;
  let fixture: ComponentFixture<RegisterVodjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterVodjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVodjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
