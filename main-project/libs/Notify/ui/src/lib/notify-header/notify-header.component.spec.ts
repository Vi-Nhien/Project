import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyHeaderComponent } from './notify-header.component';

describe('NotifyHeaderComponent', () => {
  let component: NotifyHeaderComponent;
  let fixture: ComponentFixture<NotifyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
