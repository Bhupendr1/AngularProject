import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeweletterComponent } from './neweletter.component';

describe('NeweletterComponent', () => {
  let component: NeweletterComponent;
  let fixture: ComponentFixture<NeweletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeweletterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeweletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
