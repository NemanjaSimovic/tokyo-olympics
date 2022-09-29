import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdaveriTakmicenjeComponent } from './odaveri-takmicenje.component';

describe('OdaveriTakmicenjeComponent', () => {
  let component: OdaveriTakmicenjeComponent;
  let fixture: ComponentFixture<OdaveriTakmicenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdaveriTakmicenjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdaveriTakmicenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
