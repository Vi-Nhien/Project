import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifylistComponent } from './notifylist.component';

describe('NotifylistComponent', () => {
  let component: NotifylistComponent;
  let fixture: ComponentFixture<NotifylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
