
import { IsOptional, IsString, MinLength } from "class-validator";

export class ListMerchantDto 
{

  public id: string;
  public name: string;

  constructor({ id, name }: Merchant) {
    this.id = id;
    this.name = name;
  }

}

export class ListMerchantParamDto
{

  @IsOptional()
  @IsString()
  id?: string

}

interface Merchant 
{
  id: string;
  name: string;
}
