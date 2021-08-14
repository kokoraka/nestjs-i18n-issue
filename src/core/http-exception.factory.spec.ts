import { HttpException } from "@nestjs/common";
import { DefaultResponseBody, ValidationException } from "./http-exception.entity";
import { DefaultResponse, InvalidDataResponse, ResponseFactory } from "./http-exception.factory";

const lang = 'en';
const service = { 
  translate : async(): Promise<any> => {
    return 'Invalid data';
  } 
};
const translator = { lang, service };

describe('ResponseFactory Class', () => {

  let factory: ResponseFactory;

  beforeEach(() => {
    class CustomResponseFactory extends ResponseFactory 
    {
      public async createResponseBody()
      {
        return new DefaultResponseBody('400', 'error');
      }
    }
    const exception = new HttpException('error', 400);
    factory = new CustomResponseFactory(exception, translator);
  });

  it('should return ResponseBody type', async () => {
    const res = await factory.createResponseBody();

    expect(res).toEqual({
      code: '400',
      message: 'error'
    });
  });
  
  it('should return HttpResponse type', async () => {
    const res = await factory.make();

    expect(res).toEqual({
      httpCode: 400,
      responseBody: {
        code: '400',
        message: 'error'
      }
    });
  });

});

describe('DefaultResponse Class', () => {

  let factory: DefaultResponse;

  beforeEach(() => {
    const exception = new HttpException('ok', 200);
    factory = new DefaultResponse(exception, translator);
  });

  it('should return ResponseBody type', async () => {
    const res = await factory.createResponseBody();

    expect(res).toEqual({
      code: '200',
      message: 'ok'
    });
  });
  
  it('should return HttpResponse type', async () => {
    const res = await factory.make();

    expect(res).toEqual({
      httpCode: 200,
      responseBody: {
        code: '200',
        message: 'ok'
      }
    });
  });

});

describe('InvalidDataResponse Class', () => {

  let factory: InvalidDataResponse;

  beforeEach(() => {
    const exception = new ValidationException({ errors: [] });
    factory = new InvalidDataResponse(exception, translator);
  });

  it('should return ResponseBody type', async () => {
    const res = await factory.createResponseBody();

    expect(res).toEqual({
      code: '422',
      message: 'Invalid data',
      validation_errors: []
    });
  });
  
  it('should return HttpResponse type', async () => {
    const res = await factory.make();

    expect(res).toEqual({
      httpCode: 422,
      responseBody: {
        code: '422',
        message: 'Invalid data',
        validation_errors: []
      }
    });
  });

});