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

@Controller('/v1/merchant')
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) 
  {
    return this.merchantService.update(id, updateMerchantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) 
  {
    return this.merchantService.remove(id);
  }

}
