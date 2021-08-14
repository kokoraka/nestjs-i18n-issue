import { HttpException, NotFoundException } from "@nestjs/common";
import { DefaultResponseBody, ValidationException } from "./http-exception.entity";
import { DefaultResponse, InvalidDataResponse, NotFoundResponse, ResponseFactory } from "./http-exception.factory";

describe('ResponseFactory Class', () => {

  let factory: ResponseFactory;
  let lang: string = 'en';
  let service = { 
    translate : async(): Promise<any> => {
      return 'Invalid data';
    } 
  };
  const translator = { lang, service };

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
  let lang: string = 'en';
  let service = { 
    translate : async(): Promise<any> => {
      return 'Error occured, please contact admin and try again later';
    } 
  };
  const translator = { lang, service };

  beforeEach(() => {
    const exception = new HttpException('General error', 400);
    factory = new DefaultResponse(exception, translator);
  });

  it('should return ResponseBody type', async () => {
    const res = await factory.createResponseBody();

    expect(res).toEqual({
      code: '400',
      message: 'Error occured, please contact admin and try again later'
    });
  });
  
  it('should return HttpResponse type', async () => {
    const res = await factory.make();

    expect(res).toEqual({
      httpCode: 400,
      responseBody: {
        code: '400',
        message: 'Error occured, please contact admin and try again later'
      }
    });
  });

});

describe('NotFoundResponse Class', () => {

  let factory: NotFoundResponse;
  let lang: string = 'en';
  let service = { 
    translate : async(): Promise<any> => {
      return 'Data not found';
    } 
  };
  const translator = { lang, service };

  beforeEach(() => {
    const exception = new NotFoundException();
    factory = new NotFoundResponse(exception, translator);
  });

  it('should return ResponseBody type', async () => {
    const res = await factory.createResponseBody();

    expect(res).toEqual({
      code: '404',
      message: 'Data not found',
    });
  });
  
  it('should return HttpResponse type', async () => {
    const res = await factory.make();

    expect(res).toEqual({
      httpCode: 404,
      responseBody: {
        code: '404',
        message: 'Data not found',
      }
    });
  });

});

describe('InvalidDataResponse Class', () => {

  let factory: InvalidDataResponse;
  let lang: string = 'en';
  let service = { 
    translate : async(): Promise<any> => {
      return 'Invalid data';
    } 
  };
  const translator = { lang, service };

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