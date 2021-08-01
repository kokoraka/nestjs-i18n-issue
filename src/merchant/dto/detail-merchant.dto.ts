
export class DetailMerchantDto
{

  public id: string;
  public name: string;

  constructor({ id, name }: Merchant) {
    this.id = id;
    this.name = name;
  }

}

interface Merchant
{

  id: string;
  name: string;

}
