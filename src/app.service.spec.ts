import { AppService } from "./app.service";

describe('AppService', () => {

  let appService: AppService;

  beforeEach(() => {
    appService = new AppService();
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(appService).toBeDefined();
    });
  });

  describe('status()', () => {
    it('should contain status method', () => {
      expect(appService.status).toBeDefined();
    });
  
    it('should return ok', () => {
      expect(appService.status()).toEqual('ok');
    });
  });

});