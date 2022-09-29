import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTakmicenjeComponent } from './complete-takmicenje.component';

describe('CompleteTakmicenjeComponent', () => {
  let component: CompleteTakmicenjeComponent;
  let fixture: ComponentFixture<CompleteTakmicenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteTakmicenjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTakmicenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
