import { TestBed, inject } from '@angular/core/testing';

import { MessagingService } from './messaging.service';

class MessageMock {
  status: string;
  constructor(status) {
    this.status = status;
  }
}

describe('MessagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagingService]
    });
  });
});

function tests() {
  it('should be created', inject([MessagingService], (service: MessagingService) => {
    expect(service).toBeTruthy();
  }));

  it('should receive message upon publishing message', inject([MessagingService], (service: MessagingService) => {
    let status = 'KO';
    service.of(MessageMock)
      .subscribe(message => {
        status = message.status;
        expect(status).toEqual('OK');
      });

      service.publish(new MessageMock('OK'));
  }));

  it('should not receive message when not publishing message', inject([MessagingService], (service: MessagingService) => {
    let status = 'KO';
    service.of(MessageMock)
      .subscribe(message => {
        status = message.status;
        expect(status).toEqual('KO');
      });

      service.publish('OK');
  }));
}
