import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyModalComponent } from './property-modal.component';

describe('PropertyModalComponent', () => {
  let component: PropertyModalComponent;
  let fixture: ComponentFixture<PropertyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
