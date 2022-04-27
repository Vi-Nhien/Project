/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TonGiaoComponent } from './ton-giao.component';

describe('TonGiaoComponent', () => {
  let component: TonGiaoComponent;
  let fixture: ComponentFixture<TonGiaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonGiaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonGiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
