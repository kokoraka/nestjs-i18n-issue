import { ListMerchantDto } from "./list-merchant.dto";

describe('ListMerchant DTO', () => {
  
  let listMerchant: ListMerchantDto;

  beforeEach(() => {
    listMerchant = new ListMerchantDto();
    listMerchant.id = "custom-id";
    listMerchant.name = "custom-name";
  });

  it('should be defined', () => {
    expect(listMerchant).toBeDefined();
  });

  it('should have valid public property', () => {
    expect(listMerchant.id).toBeDefined();
    expect(listMerchant.name).toBeDefined();
  });

});
