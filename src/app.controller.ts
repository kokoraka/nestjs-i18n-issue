import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  status(): unknown {
    const message = this.appService.status();
    return { code: "200", ...message };
  }
}
