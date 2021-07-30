import { Injectable } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { DetailMerchantDto } from './dto/detail-merchant.dto';
import { ListMerchantDto } from './dto/list-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantService {

  create(createMerchantDto: CreateMerchantDto) {
    return 'This action adds a new merchant';
  }

  findAll(): ListMerchantDto[] {
    return [
      { id: "custom", name: "name" }
    ];
  }

  findOne(id: number): DetailMerchantDto {
    return { id: id.toString(), name: "name" };
  }

  update(id: number, updateMerchantDto: UpdateMerchantDto) {
    return `This action updates a #${id} merchant`;
  }

  remove(id: number) {
    return `This action removes a #${id} merchant`;
  }
  
}
