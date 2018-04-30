import { TestBed, inject } from '@angular/core/testing';

import { WebServicesService } from './web-services.service';

describe('WebServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebServicesService]
    });
  });

  it('should be created', inject([WebServicesService], (service: WebServicesService) => {
    expect(service).toBeTruthy();
  }));
});
