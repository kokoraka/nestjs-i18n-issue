import { CreateMerchantDto } from "./create-merchant.dto";

describe('CreateMerchant DTO', () => {
  
  let detailMerchant: CreateMerchantDto;

  beforeEach(() => {
    detailMerchant = new CreateMerchantDto();
    detailMerchant.name = "custom-name";
  });

  it('should be defined', () => {
    expect(detailMerchant).toBeDefined();
  });

  it('should have valid public property', () => {
    expect(detailMerchant.name).toBeDefined();
  });

});
