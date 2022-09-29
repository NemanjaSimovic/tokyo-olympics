import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizatorHomeComponent } from './organizator-home.component';

describe('OrganizatorHomeComponent', () => {
  let component: OrganizatorHomeComponent;
  let fixture: ComponentFixture<OrganizatorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizatorHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizatorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
