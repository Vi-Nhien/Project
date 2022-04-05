import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTestComponent } from './feature-test.component';

describe('FeatureTestComponent', () => {
  let component: FeatureTestComponent;
  let fixture: ComponentFixture<FeatureTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
