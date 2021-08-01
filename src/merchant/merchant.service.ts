import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchantDto, CreateMerchantResultDto } from './dto/create-merchant.dto';
import { DetailMerchantDto } from './dto/detail-merchant.dto';
import { ListMerchantDto, ListMerchantParamDto } from './dto/list-merchant.dto';
import { UpdateMerchantDto, UpdateMerchantResultDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantService 
{

  async create(createMerchantDto: CreateMerchantDto): Promise<CreateMerchantResultDto> 
  {
    const merchant = new CreateMerchantResultDto({
      id: "random-id",
      ...createMerchantDto
    });
    return Promise.resolve(merchant);
  }

  async findAll(listMerchantParamDto: ListMerchantParamDto): Promise<ListMerchantDto[]> 
  {
    const rawMerchants = [ { id: "random-id", name: "name" } ];
    const merchants = rawMerchants.map(merchant => {
      return new ListMerchantDto(merchant);
    });
    return Promise.resolve(merchants);
  }

  async findOne(identifier: string): Promise<DetailMerchantDto> 
  {
    if (identifier === "invalid") {
      return Promise.reject(new NotFoundException());
    }
    const merchant = new DetailMerchantDto({
      id: identifier, 
      name: "name"
    });
    return Promise.resolve(merchant);
  }

  async update(identifier: string, updateMerchantDto: UpdateMerchantDto): Promise<UpdateMerchantResultDto> 
  {
    if (identifier === "invalid") {
      return Promise.reject(new NotFoundException());
    }
    const merchant = new UpdateMerchantResultDto({
      id: identifier,
      name: updateMerchantDto.name
    });
    return Promise.resolve(merchant);
  }

  async remove(identifier: string): Promise<boolean> 
  {
    if (identifier === "invalid") {
      return Promise.reject(new NotFoundException());
    }
    return true;
  }
  
}
