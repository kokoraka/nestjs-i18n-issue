import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18NFactory } from '../i18n/i18n.factory';
import { MerchantModule } from '../merchant/merchant.module';

@Module({
  imports: [
    I18NFactory.createModule(),
    MerchantModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
