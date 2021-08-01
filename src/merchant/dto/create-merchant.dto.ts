import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateMerchantDto {

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(50)
  name: string

}

export class CreateMerchantResultDto
{

  id: string;
  name: string;
  
}
