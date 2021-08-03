import { HttpException } from "@nestjs/common";
import { DefaultResponseBody, HttpResponse, InvalidDataResponseBody, ResponseBody, ValidationError, ValidationException } from "./http-exception.entity";


export abstract class ResponseFactory
{

  constructor(protected exception: HttpException) {}

  abstract createResponseBody(): ResponseBody

  public make(): HttpResponse
  {
    const httpCode = this.exception.getStatus();
    const responseBody = this.createResponseBody();
    return {
      httpCode: httpCode,
      responseBody: responseBody
    }
  }
  
}

export class DefaultResponse extends ResponseFactory
{

  public createResponseBody()
  {
    const message = this.exception.message;
    const status = this.exception.getStatus();
    const code = status.toString();
    return new DefaultResponseBody(code, message);
  }

}

export class InvalidDataResponse extends ResponseFactory
{

  constructor(exception: ValidationException)
  {
    super(exception);
  }

  public createResponseBody()
  {
    const exception = this.exception as ValidationException;
    return new InvalidDataResponseBody(
      '422', 'Invalid data', exception.errors
    );
  }

}
