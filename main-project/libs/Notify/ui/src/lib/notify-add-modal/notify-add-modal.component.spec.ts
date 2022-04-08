import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyAddModalComponent } from './notify-add-modal.component';

describe('NotifyAddModalComponent', () => {
  let component: NotifyAddModalComponent;
  let fixture: ComponentFixture<NotifyAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
