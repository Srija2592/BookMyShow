import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddseatComponent } from './addseat.component';

describe('AddseatComponent', () => {
  let component: AddseatComponent;
  let fixture: ComponentFixture<AddseatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddseatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddseatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
