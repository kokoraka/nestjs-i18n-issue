import { DetailMerchantDto } from "./detail-merchant.dto";

describe('DetailMerchant DTO', () => {
  
  let detailMerchant: DetailMerchantDto;

  beforeEach(() => {
    detailMerchant = new DetailMerchantDto();
    detailMerchant.id = "custom-id";
    detailMerchant.name = "custom-name";
  });

  it('should be defined', () => {
    expect(detailMerchant).toBeDefined();
  });

  it('should have valid public property', () => {
    expect(detailMerchant.id).toBeDefined();
    expect(detailMerchant.name).toBeDefined();
  });

});
