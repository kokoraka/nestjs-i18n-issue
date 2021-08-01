import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateMerchantDto {

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(50)
  name: string

}

interface CreateMerchantResult
{
  id: string,
  name: string,
}

export class CreateMerchantResultDto
{

  public id: string;
  public name: string;

  constructor({ id, name }: CreateMerchantResult)
  {
    this.id = id;
    this.name = name;
  }
  
}
