import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyPropertyComponent } from './notify-property.component';

describe('NotifyPropertyComponent', () => {
  let component: NotifyPropertyComponent;
  let fixture: ComponentFixture<NotifyPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
