import { HttpException } from "@nestjs/common";
import { DefaultResponseBody, HttpResponse, InvalidDataResponseBody, ResponseBody, ValidationError } from "./http-exception.entity";


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

  public createResponseBody()
  {
    /**
     * `exceptionData.message` should contain an array of validation exceptions, e.g:
     * [{ field: 'name', message: 'Invalid value' }]
     * 
     * The format come from `ValidationPipe.exceptionFactory` in `main.ts`
     */    
    const exceptionData = this.exception.getResponse() as { message: ValidationError[] };
    const validationErrors =  exceptionData.message || [];
    return new InvalidDataResponseBody(
      '422', 'Invalid data', validationErrors
    );
  }

}
