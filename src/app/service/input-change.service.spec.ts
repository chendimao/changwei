import { TestBed, inject } from '@angular/core/testing';

import { InputChangeService } from './input-change.service';

describe('InputChangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputChangeService]
    });
  });

  it('should be created', inject([InputChangeService], (service: InputChangeService) => {
    expect(service).toBeTruthy();
  }));
});
