import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifySettingComponent } from './notify-setting.component';

describe('NotifySettingComponent', () => {
  let component: NotifySettingComponent;
  let fixture: ComponentFixture<NotifySettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifySettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
