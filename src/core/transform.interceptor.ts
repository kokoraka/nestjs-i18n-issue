import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<DataType> {
  code: string;
  message: string;
  data?: DataType;
}

@Injectable()
export class TransformInterceptor<DataType>
  implements NestInterceptor<DataType, Response<DataType>>
{
  /**
   * @description
   * this mapping is build for:
   * 1. marshall final data with `data` property
   * 2. append status `code` and `message`
   * */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<DataType>> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode
      ? response.statusCode.toString()
      : '200';
    return next.handle().pipe(
      map((result) => ({
        code: statusCode,
        message: (result && result.message) || 'ok',
        data:
          result.data &&
          (typeof result.data === 'object' || Array.isArray(result.data))
            ? result.data
            : undefined,
      })),
    );
  }
}
