import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WjdatabaseComponent } from './wjdatabase.component';

describe('WjdatabaseComponent', () => {
  let component: WjdatabaseComponent;
  let fixture: ComponentFixture<WjdatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WjdatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WjdatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
