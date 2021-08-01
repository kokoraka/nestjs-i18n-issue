import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

interface ValidationException
{
  statusCode: number,
  error: string,
  message: string[]
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter 
{

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionData = exception.getResponse() as ValidationException;
    
    let httpResponse: HttpResponse;

    if (exception instanceof BadRequestException &&
      Array.isArray(exceptionData.message)) {
      
      httpResponse = new InvalidDataResponse(exception).make();
    }
    else {
      httpResponse = new DefaultResponse(exception).make();
    }

    response.status(httpResponse.httpCode).json(httpResponse.responseBody);
  }

}

interface HttpResponse
{
  httpCode: number
  responseBody: ResponseBody,
}

interface ResponseBody 
{
  code: string,
  message: string
}

class DefaultResponseBody implements ResponseBody
{

  constructor(
    public code: string, 
    public message: string
  ) {}

}

class InvalidDataResponseBody implements ResponseBody
{
  
  constructor(
    public code: string, 
    public message: string, 
    public validation_errors: string[]
  ) {}
  
}

abstract class ResponseFactory
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

class DefaultResponse extends ResponseFactory
{

  public createResponseBody()
  {
    const message = this.exception.message;
    const status = this.exception.getStatus();
    const code = status.toString();
    return new DefaultResponseBody(code, message);
  }

}

class InvalidDataResponse extends ResponseFactory
{

  public createResponseBody()
  {
    const exceptionData = this.exception.getResponse() as ValidationException;
    const validationErrors =  exceptionData.message;
    return new InvalidDataResponseBody(
      '422', 'Invalid data', validationErrors
    );
  }

}
