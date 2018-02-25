import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseNavComponent } from './database-nav.component';

describe('DatabaseNavComponent', () => {
  let component: DatabaseNavComponent;
  let fixture: ComponentFixture<DatabaseNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
