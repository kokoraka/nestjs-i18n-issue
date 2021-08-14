import { HttpException } from "@nestjs/common";
import { DefaultResponseBody, HttpResponse, InvalidDataResponseBody, ResponseBody, ValidationError, ValidationException } from "./http-exception.entity";

interface Translator
{
  lang: string,
  service: Service
}

interface Service
{
  translate(key: string, options?: Record<string, any>): Promise<any>
}

export abstract class ResponseFactory
{

  constructor(
    protected exception: HttpException,
    protected translator: Translator
  ) {}

  abstract createResponseBody(): Promise<ResponseBody>

  public async make(): Promise<HttpResponse>
  {
    const httpCode = this.exception.getStatus();
    const responseBody = await this.createResponseBody();
    return {
      httpCode: httpCode,
      responseBody: responseBody
    }
  }
  
}

export class DefaultResponse extends ResponseFactory
{

  public async createResponseBody()
  {
    const message = await this.translator.service.translate('application.GENERAL_ERROR', {
      lang: this.translator.lang,
    });
    const status = this.exception.getStatus();
    const code = status.toString();
    return new DefaultResponseBody(code, message);
  }

}

export class NotFoundResponse extends ResponseFactory
{

  public async createResponseBody()
  {
    const message = await this.translator.service.translate('application.NOT_FOUND', {
      lang: this.translator.lang,
    });
    const status = this.exception.getStatus();
    const code = status.toString();
    return new DefaultResponseBody(code, message);
  }

}

export class InvalidDataResponse extends ResponseFactory
{

  constructor(
    exception: ValidationException, 
    translator: Translator
  )
  {
    super(exception, translator);
  }

  public async createResponseBody()
  {
    const exception = this.exception as ValidationException;
    const message = await this.translator.service.translate('application.INVALID_DATA', {
      lang: this.translator.lang,
    });
    return new InvalidDataResponseBody(
      '422', message, exception.errors
    );
  }

}
