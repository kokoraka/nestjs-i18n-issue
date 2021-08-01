import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateMerchantDto, CreateMerchantResultDto } from './dto/create-merchant.dto';
import { DetailMerchantDto } from './dto/detail-merchant.dto';
import { ListMerchantDto, ListMerchantParamDto } from './dto/list-merchant.dto';
import { UpdateMerchantDto, UpdateMerchantResultDto } from './dto/update-merchant.dto';
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

    it('should return CreateMerchantResultDto when valid data passed', async () => {
      const createMerchantDto = new CreateMerchantDto();
      createMerchantDto.name = "Merchant Name";

      const result = await service.create(createMerchantDto);
      expect(result).toBeInstanceOf(CreateMerchantResultDto);
    });
  });

  describe('findAll()', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should return ListMerchantDto[] when not param passed', async () => {
      const listMerchantParamDto = new ListMerchantParamDto();

      const result = await service.findAll(listMerchantParamDto);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBeInstanceOf(ListMerchantDto);
    });

    it('should return ListMerchantDto[] when id param passed', async () => {
      const listMerchantParamDto = new ListMerchantParamDto();
      listMerchantParamDto.id = "custom-id";

      const result = await service.findAll(listMerchantParamDto);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBeInstanceOf(ListMerchantDto);
    });
  });

  describe('findOne()', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should return DetailMerchantDto when valid identifier passed', async () => {
      const result = await service.findOne("custom-id");
      expect(result).toBeInstanceOf(DetailMerchantDto);
    });

    it('should throw NotFoundException when invalid identifier passed', async () => {
      await expect(service.findOne("invalid")).rejects
        .toThrowError(NotFoundException);
    });

  });

  describe('update()', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should return UpdateMerchantResultDto when valid identifier passed', async () => {
      const updateMerchantDto = new UpdateMerchantDto();
      const result = await service.update("custom-id", updateMerchantDto);

      expect(result).toBeInstanceOf(UpdateMerchantResultDto);
    });

    it('should throw NotFoundException when invalid identifier passed', async () => {
      const updateMerchantDto = new UpdateMerchantDto();

      await expect(service.update("invalid", updateMerchantDto)).rejects
        .toThrowError(NotFoundException);
    });
  });

  describe('remove()', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should return true when valid identifier passed', async () => {
      const result = await service.remove("custom-id");

      expect(result).toEqual(true);
    });

    it('should throw NotFoundException when invalid identifier passed', async () => {

      await expect(service.remove("invalid")).rejects
        .toThrowError(NotFoundException);
    });
  });

});
