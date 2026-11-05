import { TestBed } from '@angular/core/testing';
import { ApiHardwareService } from './api-hardware.service';

describe('ApiHardwareService', () => {
  let service: ApiHardwareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiHardwareService);
  });

  it('debe lanzar NETWORK_ERROR cuando el dispositivo está sin red', async () => {
    spyOnProperty(navigator, 'onLine', 'get').and.returnValue(false);

    try {
      await service.getProtectedData('fake-token');
      fail('Debió fallar por falta de red');
    } catch (error: any) {
      expect(error.message).toContain('NETWORK_ERROR');
    }
  });
});
