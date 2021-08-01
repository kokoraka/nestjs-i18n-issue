import { DetailMerchantDto } from "./detail-merchant.dto";

describe('DetailMerchant DTO', () => {
  
  let detailMerchant: DetailMerchantDto;

  beforeEach(() => {
    detailMerchant = new DetailMerchantDto({
      id: "custom-id",
      name: "custom-name"
    });
  });

  it('should be defined', () => {
    expect(detailMerchant).toBeDefined();
  });

  it('should have valid public property', () => {
    expect(detailMerchant.id).toBeDefined();
    expect(detailMerchant.name).toBeDefined();
  });

});
