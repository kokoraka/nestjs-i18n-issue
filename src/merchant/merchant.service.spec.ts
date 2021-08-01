import { Test, TestingModule } from '@nestjs/testing';
import { CreateMerchantDto, CreateMerchantResultDto } from './dto/create-merchant.dto';
import { MerchantService } from './merchant.service';

describe('MerchantService', () => {
  let service: MerchantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerchantService],
    }).compile();

    service = module.get<MerchantService>(MerchantService);
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('create()', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should return CreateMerchantResultDto when valid data passed', () => {
      const createMerchantDto = new CreateMerchantDto();
      createMerchantDto.name = "Merchant Name";

      const result = service.create(createMerchantDto);
      expect(result).toBeInstanceOf(CreateMerchantResultDto);
    });
  });

});
