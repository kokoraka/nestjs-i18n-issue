import { Merchant } from "./merchant.entity";

describe('Merchant Entity', () => {
  
  let merchantEntity: Merchant;

  beforeEach(() => {
    merchantEntity = new Merchant();
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(merchantEntity).toBeDefined();
    });
  });

});
