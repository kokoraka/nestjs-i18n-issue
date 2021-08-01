import { validateOrReject } from "class-validator";
import { CreateMerchantDto, CreateMerchantResultDto } from "./create-merchant.dto";

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
              "isString": "name must be a string",
              "isNotEmpty": "name should not be empty", 
              "maxLength": "name must be shorter than or equal to 50 characters", 
              "minLength": "name must be longer than or equal to 10 characters"
            }
          })
        ])
      );
    });

    it('should invalid when name is not a string', async () => {
      /** @ts-ignore */
      createMerchant.name = 123;

      await expect(validateOrReject(createMerchant)).rejects.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "constraints": {
              "isString": "name must be a string",
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


describe('CreateMerchantResult DTO', () => {
  
  let createMerchantResult: CreateMerchantResultDto;

  beforeEach(() => {
    createMerchantResult = new CreateMerchantResultDto({
      id: "cusotom-id",
      name: "custom-name"
    });
  });
  
  describe('class definition', () => {

    it('should be defined', () => {
      expect(createMerchantResult).toBeDefined();
    });
  
    it('should have valid public property', () => {
      expect(createMerchantResult.id).toBeDefined();
      expect(createMerchantResult.name).toBeDefined();
    });

  });

});