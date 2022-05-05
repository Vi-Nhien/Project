/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TinhThanhComponent } from './tinh-thanh.component';

describe('TinhThanhComponent', () => {
  let component: TinhThanhComponent;
  let fixture: ComponentFixture<TinhThanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinhThanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhThanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
