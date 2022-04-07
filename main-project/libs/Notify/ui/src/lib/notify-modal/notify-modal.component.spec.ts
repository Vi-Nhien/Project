import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyModalComponent } from './notify-modal.component';

describe('NotifyModalComponent', () => {
  let component: NotifyModalComponent;
  let fixture: ComponentFixture<NotifyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
