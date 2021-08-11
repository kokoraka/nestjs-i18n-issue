import {
  Controller, Get, Post, Body,
  Patch, Param, Delete, Query,
} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { ListMerchantParamDto } from './dto/list-merchant.dto';
import { I18nRequestScopeService } from 'nestjs-i18n';

@Controller({
  path: 'merchant',
  version: '1'
})
export class MerchantController 
{

  constructor(
    private readonly merchantService: MerchantService,
    private readonly i18n: I18nRequestScopeService
  ) {}

  @Post()
  async create(@Body() createMerchantDto: CreateMerchantDto) 
  {
    const result = await this.merchantService.create(createMerchantDto);
    const message = await this.i18n.translate('application.SUCCESS_CREATION', {
      args: { resource: 'merchant' },
    });
    return {
      message: message,
      result: result
    };
  }

  // @Get()
  // async findAll(@Query() listMerchantParamDto: ListMerchantParamDto) 
  // {
  //   const result = await this.merchantService.findAll(listMerchantParamDto);
  //   const message = await this.i18n.translate('application.SUCCESS_GET_LIST', {
  //     args: { resource: 'merchant' },
  //   });
  //   return {
  //     message: message,
  //     result: result
  //   };
  // }

  // @Get(':identifier')
  // async findOne(@Param('identifier') identifier: string) 
  // {
  //   const result = await this.merchantService.findOne(identifier);
  //   const message = await this.i18n.translate('application.SUCCESS_GET_DETAIL', {
  //     args: { resource: 'merchant' },
  //   });
  //   return {
  //     message: message,
  //     result: result
  //   }
  // }

  // @Patch(':identifier')
  // async update(
  //   @Param('identifier') identifier: string,
  //   @Body() updateMerchantDto: UpdateMerchantDto,
  // ) 
  // {
  //   const result = await this.merchantService.update(identifier, updateMerchantDto);
  //   const message = await this.i18n.translate('application.SUCCESS_UPDATE', {
  //     args: { resource: 'merchant' },
  //   });
  //   return {
  //     message: message,
  //     result: result
  //   }
  // }
  
  // @Delete(':identifier')
  // async remove(@Param('identifier') identifier: string) 
  // {
  //   await this.merchantService.remove(identifier);
  //   const message = await this.i18n.translate('application.SUCCESS_REMOVE', {
  //     args: { resource: 'merchant' },
  //   });
  //   return {
  //     message: message
  //   }
  // }

}
