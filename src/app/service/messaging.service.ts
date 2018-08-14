import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface Message {
  channel: string;
  data: any;
}

@Injectable()
export class MessagingService {

  private message = new Subject<Message>();

  public publish<T>(message: T): void {
    const channel = (<any>message.constructor).name;
    this.message.next({ channel: channel, data: message });
  }

  public of<T>(messageType: { new(...args: any[]): T }): Observable<T> {
    const channel = (<any>messageType).name;
    return this.message
      .pipe(filter(m => m.channel === channel))
      .pipe(map(m => m.data));
  }
}