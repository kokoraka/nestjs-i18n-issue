import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { I18NFactory } from '../i18n/i18n.factory';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { ListMerchantParamDto } from './dto/list-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MerchantController } from './merchant.controller';
import { MerchantModule } from './merchant.module';
import { MerchantService } from './merchant.service';

describe('MerchantController', () => {

  let controller: MerchantController;

  const mockMerchantService = {
    create: jest.fn((dto) => {
      return {
        id: 'custom-id',
        ...dto
      };
    }),
    findAll: jest.fn((dto) => {
      return [
        {
          id: 'custom-id',
          name: 'custom-name'
        }
      ]
    }),
    findOne: jest.fn((identifier) => {
      if (identifier === 'invalid') {
        throw new NotFoundException();
      }
      return {
        id: 'custom-id',
        name: 'custom-name'
      }
    }),
    update: jest.fn((identifier, dto) => {
      if (identifier === 'invalid') {
        throw new NotFoundException();
      }
      return {
        id: 'custom-id',
        name: 'custom-name'
      }
    }),
    remove: jest.fn((identifier) => {
      if (identifier === 'invalid') {
        throw new NotFoundException();
      }
      return true;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [I18NFactory.createModule()],
      controllers: [MerchantController],
      providers: [MerchantService],
    })
      .overrideProvider(MerchantService)
      .useValue(mockMerchantService)
      .compile();

    controller = module.get<MerchantController>(MerchantController);
  });

  describe('create()', () => {
    it('should return valid data when created', async () => {
      const merchantData = new CreateMerchantDto();
      merchantData.name = 'Merchant Name';
      const data = await controller.create('en', merchantData);

      expect(data).toEqual({
        message: 'Success create merchant',
        data: {
          id: expect.any(String),
          name: 'Merchant Name'
        }
      });
      expect(mockMerchantService.create).toHaveBeenCalledWith(merchantData);
    });
  });

  describe('findAll()', () => {
    it('should return valid data when not param passed', async () => {
      const merchantData = new ListMerchantParamDto();
      const data = await controller.findAll('en', merchantData);

      expect(data).toEqual({
        message: 'Success get merchant list',
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          })
        ])
      });
      expect(mockMerchantService.findAll).toHaveBeenCalledWith(merchantData);
    });

    it('should return valid data when id param passed', async () => {
      const merchantData = new ListMerchantParamDto();
      merchantData.id = 'custom-id';
      const data = await controller.findAll('en', merchantData);

      expect(data).toEqual({
        message: 'Success get merchant list',
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          })
        ])
      });
      expect(mockMerchantService.findAll).toHaveBeenCalledWith(merchantData);
    });
  });

  describe('findOne()', () => {
    it('should return valid data when valid param passed', async () => {
      const data = await controller.findOne('en', 'custom-id');

      expect(data).toEqual({
        message: 'Success get merchant detail',
        data: expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        })
      });
      expect(mockMerchantService.findOne).toHaveBeenCalledWith('custom-id');
    });
    it('should throw NotFoundException when invalid param passed', async () => {

      await expect(controller.findOne('en', 'invalid')).rejects.toThrow(NotFoundException);
      expect(mockMerchantService.findOne).toHaveBeenCalledWith('invalid');
    });
  });

  describe('update()', () => {
    it('should return valid data when valid param passed', async () => {
      const updateMerchantDto = new UpdateMerchantDto();
      updateMerchantDto.name = 'custom-name';
      const data = await controller.update('en', 'custom-id', updateMerchantDto);

      expect(data).toEqual({
        message: 'Success update merchant',
        data: expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        })
      });
      expect(mockMerchantService.update).toHaveBeenCalledWith('custom-id', updateMerchantDto);
    });
    it('should throw NotFoundException when invalid param passed', async () => {
      const updateMerchantDto = new UpdateMerchantDto();

      await expect(controller.update('en', 'invalid', updateMerchantDto)).rejects.toThrow(NotFoundException);
      expect(mockMerchantService.update).toHaveBeenCalledWith('invalid', updateMerchantDto);
    });
  });

  describe('remove()', () => {
    it('should return valid data when valid param passed', async () => {
      const data = await controller.remove('en', 'custom-id');

      expect(data).toEqual({
        message: 'Success remove merchant'
      });
      expect(mockMerchantService.remove).toHaveBeenCalledWith('custom-id');
    });
    it('should throw NotFoundException when invalid param passed', async () => {

      await expect(controller.remove('en', 'invalid')).rejects.toThrow(NotFoundException);
      expect(mockMerchantService.remove).toHaveBeenCalledWith('invalid');
    });
  });

});
