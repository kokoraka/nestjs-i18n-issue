

export interface HttpResponse
{
  httpCode: number
  responseBody: ResponseBody,
}

export interface ResponseBody 
{
  code: string,
  message: string
}

export interface ValidationError 
{
  field: string,
  message: string
}

export class DefaultResponseBody implements ResponseBody
{

  constructor(
    public code: string, 
    public message: string
  ) {}

}

export class InvalidDataResponseBody implements ResponseBody
{
  
  constructor(
    public code: string, 
    public message: string, 
    public validation_errors: ValidationError[]
  ) {}
  
}
