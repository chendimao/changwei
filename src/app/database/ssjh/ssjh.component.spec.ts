import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsjhComponent } from './ssjh.component';

describe('SsjhComponent', () => {
  let component: SsjhComponent;
  let fixture: ComponentFixture<SsjhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsjhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsjhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
