import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpResponse, ValidationException } from './http-exception.entity';
import { DefaultResponse, InvalidDataResponse } from './http-exception.factory';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter 
{

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let httpResponse: HttpResponse;

    if (exception instanceof ValidationException) {
      httpResponse = new InvalidDataResponse(exception).make();
    }
    else {
      httpResponse = new DefaultResponse(exception).make();
    }

    response.status(httpResponse.httpCode).json(httpResponse.responseBody);
  }

}
