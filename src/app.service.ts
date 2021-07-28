import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  status(): unknown {
    return { status: 'ok' };
  }
}
