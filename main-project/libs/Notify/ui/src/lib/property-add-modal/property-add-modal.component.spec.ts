import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAddModalComponent } from './property-add-modal.component';

describe('PropertyAddModalComponent', () => {
  let component: PropertyAddModalComponent;
  let fixture: ComponentFixture<PropertyAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
