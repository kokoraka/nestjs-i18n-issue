import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  status(): { message: string } {
    return { message: 'ok' };
  }
}
