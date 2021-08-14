import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { ListMerchantParamDto } from './dto/list-merchant.dto';
import { I18nLang, I18nService } from 'nestjs-i18n';
import { Result } from 'src/core/controller.entity';


@Controller({
  path: 'merchant',
  version: '1',
})
export class MerchantController {
  constructor(
    private readonly merchantService: MerchantService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  async create(
    @I18nLang() lang: string,
    @Body() createMerchantDto: CreateMerchantDto,
  ): Promise<Result> {
    const data = await this.merchantService.create(createMerchantDto);
    const message = await this.i18n.translate('application.SUCCESS_CREATION', {
      lang: lang,
      args: { resource: 'merchant' },
    });
    return { message, data };
  }

  @Get()
  async findAll(
    @I18nLang() lang: string,
    @Query() listMerchantParamDto: ListMerchantParamDto,
  ): Promise<Result> {
    const data = await this.merchantService.findAll(listMerchantParamDto);
    const message = await this.i18n.translate('application.SUCCESS_GET_LIST', {
      lang: lang,
      args: { resource: 'merchant' },
    });
    return { message, data };
  }

  @Get(':identifier')
  async findOne(
    @I18nLang() lang: string,
    @Param('identifier') identifier: string,
  ): Promise<Result> {
    const data = await this.merchantService.findOne(identifier);
    const message = await this.i18n.translate(
      'application.SUCCESS_GET_DETAIL',
      {
        lang: lang,
        args: { resource: 'merchant' },
      },
    );
    return { message, data };
  }

  @Patch(':identifier')
  async update(
    @I18nLang() lang: string,
    @Param('identifier') identifier: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ): Promise<Result> {
    const data = await this.merchantService.update(
      identifier,
      updateMerchantDto,
    );
    const message = await this.i18n.translate('application.SUCCESS_UPDATE', {
      lang: lang,
      args: { resource: 'merchant' },
    });
    return { message, data };
  }

  @Delete(':identifier')
  async remove(
    @I18nLang() lang: string,
    @Param('identifier') identifier: string,
  ): Promise<Result> {
    await this.merchantService.remove(identifier);
    const message = await this.i18n.translate('application.SUCCESS_REMOVE', {
      lang: lang,
      args: { resource: 'merchant' },
    });
    return { message };
  }

}
