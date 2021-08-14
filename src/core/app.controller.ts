import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Result } from './controller.entity';

@Controller()
export class AppController 
{
  constructor(private readonly appService: AppService) {}

  @Get()
  status(): Result
  {
    const message = this.appService.status();
    return { message };
  }
  
}
