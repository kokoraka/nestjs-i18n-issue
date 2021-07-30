import { UpdateMerchantDto } from "./update-merchant.dto";

describe('UpdateMerchant DTO', () => {
  
  let updateMerchant: UpdateMerchantDto;

  beforeEach(() => {
    updateMerchant = new UpdateMerchantDto();
    updateMerchant.name = "custom-name";
  });

  it('should be defined', () => {
    expect(updateMerchant).toBeDefined();
  });

  it('should have valid public property', () => {
    expect(updateMerchant.name).toBeDefined();
  });

});
