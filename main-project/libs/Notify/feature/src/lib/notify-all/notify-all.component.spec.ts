import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyAllComponent } from './notify-all.component';

describe('NotifyAllComponent', () => {
  let component: NotifyAllComponent;
  let fixture: ComponentFixture<NotifyAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
