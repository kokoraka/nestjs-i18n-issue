import { validateOrReject } from "class-validator";
import { UpdateMerchantDto, UpdateMerchantResultDto } from "./update-merchant.dto";

describe('UpdateMerchant DTO', () => {
  
  let updateMerchant: UpdateMerchantDto;

  beforeEach(() => {
    updateMerchant = new UpdateMerchantDto();
    updateMerchant.name = "custom-name";
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(updateMerchant).toBeDefined();
    });
  
    it('should have valid public property', () => {
      expect(updateMerchant.name).toBeDefined();
    });
  });
  
  describe('name property', () => {
    it('should be valid when name is undefined', async () => {
      updateMerchant.name = undefined;

      await expect(validateOrReject(updateMerchant)).resolves.toEqual(undefined);
    });

    it('should invalid when name is not a string', async () => {
      /** @ts-ignore */
      updateMerchant.name = 123;

      await expect(validateOrReject(updateMerchant)).rejects.toEqual(
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
      updateMerchant.name = 'less';
      await expect(validateOrReject(updateMerchant)).rejects.toEqual(
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
      updateMerchant.name = 'randomstring-randomstring-randomstring-randomstring-randomstring-randomstring-randomstring';
      await expect(validateOrReject(updateMerchant)).rejects.toEqual(
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

describe('UpdateMerchantResult DTO', () => {
  
  let updateMerchantResult: UpdateMerchantResultDto;

  beforeEach(() => {
    updateMerchantResult = new UpdateMerchantResultDto({
      id: "custom-id",
      name: "custom-name"
    });
  });

  it('should be defined', () => {
    expect(updateMerchantResult).toBeDefined();
  });

  it('should have valid public property', () => {
    expect(updateMerchantResult.id).toBeDefined();
    expect(updateMerchantResult.name).toBeDefined();
  });

});