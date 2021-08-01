import { CreateMerchantResultDto } from "./create-merchant-result.dto";

describe('CreateMerchantResult DTO', () => {
  
  let createMerchantResult: CreateMerchantResultDto;

  beforeEach(() => {
    createMerchantResult = new CreateMerchantResultDto();
  });
  
  describe('class definition', () => {
    beforeEach(() => {
      createMerchantResult.id = "custom-id";
      createMerchantResult.name = "custom-name";
    });

    it('should be defined', () => {
      expect(createMerchantResult).toBeDefined();
    });
  
    it('should have valid public property', () => {
      expect(createMerchantResult.id).toBeDefined();
      expect(createMerchantResult.name).toBeDefined();
    });

  });

});
