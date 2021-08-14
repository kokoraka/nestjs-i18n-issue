import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationException } from './http-exception.entity';
import {
  DefaultResponse,
  InvalidDataResponse,
  ResponseFactory,
} from './http-exception.factory';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { i18nLang: lang, i18nService: service } = ctx.getRequest();
    const translator = { lang, service };

    let factory: ResponseFactory;

    if (exception instanceof ValidationException) {
      factory = new InvalidDataResponse(exception, translator);
    } else {
      factory = new DefaultResponse(exception, translator);
    }

    const httpResponse = await factory.make();

    response.status(httpResponse.httpCode).json(httpResponse.responseBody);
  }
}
