import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMerchantDto 
{

  @MaxLength(50)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
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
