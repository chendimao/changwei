import { TestBed, inject } from '@angular/core/testing';

import { GhzbTitleService } from './ghzb-title.service';

describe('GhzbTitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GhzbTitleService]
    });
  });

  it('should be created', inject([GhzbTitleService], (service: GhzbTitleService) => {
    expect(service).toBeTruthy();
  }));
});
