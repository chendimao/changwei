import { TestBed, inject } from '@angular/core/testing';

import { SelectListHttpService } from './select-list-http.service';

describe('SelectListHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectListHttpService]
    });
  });

  it('should be created', inject([SelectListHttpService], (service: SelectListHttpService) => {
    expect(service).toBeTruthy();
  }));
});
