import { Merchant } from "./merchant.entity";

describe('Merchant Entity', () => {
  
  let merchantEntity: Merchant;

  beforeEach(() => {
    merchantEntity = new Merchant();
  });

  it('should be defined', () => {
    expect(merchantEntity).toBeDefined();
  });

});
