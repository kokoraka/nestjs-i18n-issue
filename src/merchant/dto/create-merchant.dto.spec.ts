import { validateOrReject } from "class-validator";
import { CreateMerchantDto } from "./create-merchant.dto";

describe('CreateMerchant DTO', () => {
  
  let createMerchant: CreateMerchantDto;

  beforeEach(() => {
    createMerchant = new CreateMerchantDto();
  });
  
  describe('class definition', () => {
    beforeEach(() => {
      createMerchant.name = "custom-name";
    });

    it('should be defined', () => {
      expect(createMerchant).toBeDefined();
    });
  
    it('should have valid public property', () => {
      expect(createMerchant.name).toBeDefined();
    });

  });

  describe('name property', () => {

    it('should invalid when name is undefined', async () => {
      createMerchant.name = undefined;
      await expect(validateOrReject(createMerchant)).rejects.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "constraints": {
              "isNotEmpty": "name should not be empty", 
              "maxLength": "name must be shorter than or equal to 50 characters", 
              "minLength": "name must be longer than or equal to 10 characters"
            }
          })
        ])
      );
    });

    it('should invalid when name is less than 10 character', async () => {
      createMerchant.name = 'less';
      await expect(validateOrReject(createMerchant)).rejects.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "constraints": {
              "minLength": "name must be longer than or equal to 10 characters"
            }
          })
        ])
      );
    });
    
    it('should invalid when name is greater than 50 character', async () => {
      createMerchant.name = 'randomstring-randomstring-randomstring-randomstring-randomstring-randomstring-randomstring';
      await expect(validateOrReject(createMerchant)).rejects.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "constraints": {
              "maxLength": "name must be shorter than or equal to 50 characters",
            }
          })
        ])
      );
    });
  });

});
