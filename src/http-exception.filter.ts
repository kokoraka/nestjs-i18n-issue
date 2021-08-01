import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

interface ResponseBody 
{
  code: string,
  message: string,
  validation_errors?: string[]
}

interface ValidationException
{
  statusCode: number,
  error: string,
  message: string[]
}

const BAD_REQUEST_CODE = 422;

@Catch()
export class HttpExceptionFilter implements ExceptionFilter 
{

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    
    let httpCode = status;
    let responseBody: ResponseBody = {
      code: httpCode.toString(),
      message: exception.message,
    };

    if (exception instanceof BadRequestException) {
      const exceptionData = exception.getResponse() as ValidationException;
      if (Array.isArray(exceptionData.message)) {
        httpCode = BAD_REQUEST_CODE;
        responseBody.code = BAD_REQUEST_CODE.toString();
        responseBody.validation_errors = exceptionData.message;
      }
    }

    response.status(httpCode).json(responseBody);
  }

}
