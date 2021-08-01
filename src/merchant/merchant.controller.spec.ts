import { Test, TestingModule } from '@nestjs/testing';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';

describe('MerchantController', () => {

  let controller: MerchantController;

  const mockMerchantService = {
    create: jest.fn((dto) => {
      return {
        id: "custom-id",
        ...dto
      };
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchantController],
      providers: [MerchantService],
    })
      .overrideProvider(MerchantService)
      .useValue(mockMerchantService)
      .compile();

    controller = module.get<MerchantController>(MerchantController);
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('create()', () => {
    it('should return valid data when created', () => {
      const merchantData = new CreateMerchantDto();
      merchantData.name = 'Merchant Name';
      expect(controller.create(merchantData)).toEqual({
        id: expect.any(String),
        name: 'Merchant Name'
      });
      expect(mockMerchantService.create).toHaveBeenCalledWith(merchantData);
    });
  });

});
