import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<DataType>
{
  code: string,
  message: string,
  data?: DataType
}

@Injectable()
export class TransformInterceptor<DataType> 
implements NestInterceptor<DataType, Response<DataType>> 
{

  /** 
   * this mapping is build for:
   * 1. marshall final data with `data` property
   * 2. append status `code` and `message`
   * */
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<DataType>> 
  {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode ? response.statusCode.toString() : "200";
    return next.handle().pipe(map(data => ({ 
      code: statusCode,
      message: data && data.message || "ok",
      
      /** 
       * data may optionally contain: 
       * `message`, `code`, `result` or `data-itself`
       * 
       * the public data may be coming from:
       * `result` or `data-itself`
       * 
       * so, we're gonna set data whenever:
       * - `result` is available and in type of: `Array` or `Object`
       * - `data-itself` is not containing: `message`, `code` or `result`
       * **/
      data: data && data.result && (typeof data.result === "object" || Array.isArray(data.result)) ?
            data.result :
            (
              !data.message && !data.code ?
              data : 
              undefined
            )
    })));
  }

}
