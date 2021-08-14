import { DefaultResponseBody, HttpResponse, InvalidDataResponseBody, ResponseBody, ValidationError, ValidationException } from "./http-exception.entity";

describe('HttpResponse Interface', () => {

  let httpResponse: HttpResponse;

  beforeEach(() => {
    httpResponse = {
      httpCode: 200,
      responseBody: {
        code: '200',
        message: 'ok'
      }
    };
  });

  it('should containing httpCode', () => {

    expect(typeof httpResponse.httpCode === "number").toBeTruthy();
  });

  it('should containing responseBody', () => {

    expect(httpResponse.responseBody).toHaveProperty('code');
    expect(typeof httpResponse.responseBody.code === "string").toBeTruthy();
    expect(httpResponse.responseBody).toHaveProperty('message');
    expect(typeof httpResponse.responseBody.message === "string").toBeTruthy();
  });

});

describe('ResponseBody Interface', () => {

  let responseBody: ResponseBody;

  beforeEach(() => {
    responseBody = {
      code: '200',
      message: 'ok'
    }
  });

  it('should containing code', () => {

    expect(responseBody).toHaveProperty('code');
    expect(typeof responseBody.code === "string").toBeTruthy();
  });

  it('should containing message', () => {

    expect(responseBody).toHaveProperty('message');
    expect(typeof responseBody.message === "string").toBeTruthy();
  });

});

describe('ValidationError Interface', () => {

  let validationError: ValidationError;

  beforeEach(() => {
    validationError = {
      field: 'name',
      message: 'Invalid value'
    }
  });

  it('should containing field', () => {

    expect(validationError).toHaveProperty('field');
    expect(typeof validationError.field === "string").toBeTruthy();
  });

  it('should containing message', () => {

    expect(validationError).toHaveProperty('message');
    expect(typeof validationError.message === "string").toBeTruthy();
  });

});

describe('DefaultResponseBody Class', () => {

  let responseBody: DefaultResponseBody;

  beforeEach(() => {
    responseBody = new DefaultResponseBody('200', 'ok');
  });

  it('should containing code', () => {
    
    expect(responseBody).toHaveProperty('code');
    expect(typeof responseBody.code === "string").toBeTruthy();
  });

  it('should containing message', () => {

    expect(responseBody).toHaveProperty('message');
    expect(typeof responseBody.message === "string").toBeTruthy();
  });

});

describe('InvalidDataResponseBody Class', () => {

  let responseBody: InvalidDataResponseBody;

  beforeEach(() => {
    responseBody = new InvalidDataResponseBody(
      '200', 'ok', 
      [ { field: 'name', message: 'Invalid value' } ]
    );
  });

  it('should containing code', () => {
    
    expect(responseBody).toHaveProperty('code');
    expect(typeof responseBody.code === "string").toBeTruthy();
  });

  it('should containing message', () => {

    expect(responseBody).toHaveProperty('message');
    expect(typeof responseBody.message === "string").toBeTruthy();
  });

  it('should containing validation_errors', () => {
    
    expect(responseBody).toHaveProperty('validation_errors');
    expect(Array.isArray(responseBody.validation_errors)).toBeTruthy();
    expect(responseBody.validation_errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'name',
          message: 'Invalid value'
        })
      ])
    );
  });

});

describe('ValidationException Class', () => {

  let exception: ValidationException;

  beforeEach(() => {
    exception = new ValidationException({
      errors: [ { field: 'name', message: 'Invalid value' } ]
    });
  });

  it('should containing message', () => {
    
    expect(exception).toHaveProperty('message');
    expect(typeof exception.message === "string").toBeTruthy();
  });

  it('should containing errors', () => {
    
    expect(exception).toHaveProperty('errors');
    expect(Array.isArray(exception.errors)).toBeTruthy();
    expect(exception.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'name',
          message: 'Invalid value'
        })
      ])
    );
  });

});
