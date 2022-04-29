/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NganhHocComponent } from './nganh-hoc.component';

describe('NganhHocComponent', () => {
  let component: NganhHocComponent;
  let fixture: ComponentFixture<NganhHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NganhHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NganhHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
