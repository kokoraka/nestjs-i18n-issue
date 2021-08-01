import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchantDto } from './create-merchant.dto';

export class UpdateMerchantDto extends PartialType(CreateMerchantDto) 
{
  
}

export class UpdateMerchantResultDto
{

  public id: string;
  public name: string;

  constructor({ id, name }: Merchant)
  {
    this.id = id;
    this.name = name;
  }

}

interface Merchant
{
  id: string,
  name: string
}
