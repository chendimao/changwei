import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NdjhComponent } from './ndjh.component';

describe('NdjhComponent', () => {
  let component: NdjhComponent;
  let fixture: ComponentFixture<NdjhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdjhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NdjhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
