import {
  Controller, Get, Post, Body,
  Patch, Param, Delete, Query,
} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { ListMerchantParamDto } from './dto/list-merchant.dto';
import { I18nLang, I18nService } from 'nestjs-i18n';

@Controller({
  path: 'merchant',
  version: '1'
})
export class MerchantController 
{

  constructor(
    private readonly merchantService: MerchantService,
    private readonly i18n: I18nService
  ) {}

  @Post()
  async create(@I18nLang() lang: string, @Body() createMerchantDto: CreateMerchantDto) 
  {
    const result = await this.merchantService.create(createMerchantDto);
    const message = await this.i18n.translate('application.SUCCESS_CREATION', {
      lang: lang,
      args: { resource: 'merchant' },
    });
    return { message, result };
  }

  @Get()
  async findAll(@I18nLang() lang: string, @Query() listMerchantParamDto: ListMerchantParamDto) 
  {
    const result = await this.merchantService.findAll(listMerchantParamDto);
    const message = await this.i18n.translate('application.SUCCESS_GET_LIST', {
      lang: lang,
      args: { resource: 'merchant' },
    });
    return { message, result };
  }

  @Get(':identifier')
  async findOne(@I18nLang() lang: string, @Param('identifier') identifier: string) 
  {
    const result = await this.merchantService.findOne(identifier);
    const message = await this.i18n.translate('application.SUCCESS_GET_DETAIL', {
      lang: lang,
      args: { resource: 'merchant' },
    });
    return { message, result };
  }

  @Patch(':identifier')
  async update(
    @I18nLang() lang: string,
    @Param('identifier') identifier: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) 
  {
    const result = await this.merchantService.update(identifier, updateMerchantDto);
    const message = await this.i18n.translate('application.SUCCESS_UPDATE', {
      lang: lang,
      args: { resource: 'merchant' },
    });
    return { message, result };
  }
  
  @Delete(':identifier')
  async remove(@I18nLang() lang: string, @Param('identifier') identifier: string) 
  {
    await this.merchantService.remove(identifier);
    const message = await this.i18n.translate('application.SUCCESS_REMOVE', {
      lang: lang,
      args: { resource: 'merchant' },
    });
    return { message };
  }

}
