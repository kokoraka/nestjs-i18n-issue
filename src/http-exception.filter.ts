import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpResponse } from './http-exception.entity';
import { DefaultResponse, InvalidDataResponse } from './http-exception.factory';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter 
{

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let httpResponse: HttpResponse;

    if (exception instanceof BadRequestException) {
      httpResponse = new InvalidDataResponse(exception).make();
    }
    else {
      httpResponse = new DefaultResponse(exception).make();
    }

    response.status(httpResponse.httpCode).json(httpResponse.responseBody);
  }

}
