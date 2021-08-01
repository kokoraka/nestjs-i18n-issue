import { Injectable } from '@nestjs/common';
import { CreateMerchantDto, CreateMerchantResultDto } from './dto/create-merchant.dto';
import { DetailMerchantDto } from './dto/detail-merchant.dto';
import { ListMerchantDto } from './dto/list-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantService 
{

  create(createMerchantDto: CreateMerchantDto): CreateMerchantResultDto 
  {
    return new CreateMerchantResultDto({
      id: "random-id",
      ...createMerchantDto
    });
  }

  findAll(): ListMerchantDto[] 
  {
    return [
      { id: "custom", name: "name" }
    ];
  }

  findOne(id: string): DetailMerchantDto 
  {
    return { id: id.toString(), name: "name" };
  }

  update(id: string, updateMerchantDto: UpdateMerchantDto) 
  {
    return `This action updates a #${id} merchant`;
  }

  remove(id: string) 
  {
    return `This action removes a #${id} merchant`;
  }
  
}
