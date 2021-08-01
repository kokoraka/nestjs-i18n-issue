import { ListMerchantDto, ListMerchantParamDto } from "./list-merchant.dto";

describe('ListMerchant DTO', () => {
  
  let listMerchant: ListMerchantDto;

  beforeEach(() => {
    listMerchant = new ListMerchantDto({
      id: "custom-id",
      name: "custom-name"
    });
  });

  it('should be defined', () => {
    expect(listMerchant).toBeDefined();
  });

  it('should have valid public property', () => {
    expect(listMerchant.id).toBeDefined();
    expect(listMerchant.name).toBeDefined();
  });

});

describe('ListMerchantParam DTO', () => {

  let listMerchantParam: ListMerchantParamDto;

  beforeEach(() => {
    listMerchantParam = new ListMerchantParamDto();
    listMerchantParam.id = "custom-id";
  });

  it('should be defined', () => {
    expect(listMerchantParam).toBeDefined();
  });

  it('should have valid public property', () => {
    expect(listMerchantParam.id).toBeDefined();
  });

});