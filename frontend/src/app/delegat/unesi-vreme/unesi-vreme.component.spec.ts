import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnesiVremeComponent } from './unesi-vreme.component';

describe('UnesiVremeComponent', () => {
  let component: UnesiVremeComponent;
  let fixture: ComponentFixture<UnesiVremeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnesiVremeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnesiVremeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
