import { Result } from "./controller.entity";

describe('Result Type', () => {

  let data: Result;

  it('should be valid when message is string', () => {
    data = {
      message: 'ok',
    };

    expect(data.message).toBeDefined();
  });

  it('should be valid when data is empty array', () => {
    data = {
      data: [],
    };

    expect(data.data).toBeDefined();
  });

  it('should be valid when data is array of object', () => {
    data = {
      data: [
        {
          key: 'value'
        }
      ],
    };

    expect(data.data).toBeDefined();
  });

  it('should be valid when data is object', () => {
    data = {
      data: {
        key: 'value'
      },
    };

    expect(data.data).toBeDefined();
  });

});
