import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtheatreComponent } from './addtheatre.component';

describe('AddtheatreComponent', () => {
  let component: AddtheatreComponent;
  let fixture: ComponentFixture<AddtheatreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtheatreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
