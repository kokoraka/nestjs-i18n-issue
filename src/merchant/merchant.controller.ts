import {
  Controller, Get, Post, Body,
  Patch, Param, Delete, Query,
} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { ListMerchantParamDto } from './dto/list-merchant.dto';

@Controller({
  path: 'merchant',
  version: '1'
})
export class MerchantController 
{
  constructor(private readonly merchantService: MerchantService) {}

  @Post()
  async create(@Body() createMerchantDto: CreateMerchantDto) 
  {
    const result = await this.merchantService.create(createMerchantDto);
    return {
      message: 'Success create merchant',
      result: result
    };
  }

  @Get()
  async findAll(@Query() listMerchantParamDto: ListMerchantParamDto) 
  {
    const result = await this.merchantService.findAll(listMerchantParamDto);
    return {
      message: 'Success get merchant list',
      result: result
    };
  }

  @Get(':identifier')
  async findOne(@Param('identifier') identifier: string) 
  {
    const result = await this.merchantService.findOne(identifier);
    return {
      message: 'Success get merchant detail',
      result: result
    }
  }

  @Patch(':identifier')
  async update(
    @Param('identifier') identifier: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) 
  {
    const result = await this.merchantService.update(identifier, updateMerchantDto);
    return {
      message: 'Success update merchant',
      result: result
    }
  }

  @Delete(':identifier')
  async remove(@Param('identifier') identifier: string) 
  {
    await this.merchantService.remove(identifier);

    return {
      message: 'Success remove merchant'
    }
  }

}
