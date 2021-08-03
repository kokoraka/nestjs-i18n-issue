import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { ValidationException } from './http-exception.entity';
import { HttpExceptionFilter } from './http-exception.filter';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const exceptionFactory = (validationErrors: ValidationError[] = []) => {
    const customValidationErrors = [];
    for (let error of validationErrors) {
      for (let constraintKey in error.constraints) {
        customValidationErrors.push({
          field: error.property,
          message: error.constraints[constraintKey]
        });
      }
    }
    return new ValidationException({ errors: customValidationErrors });
  };
  app.useGlobalPipes(new ValidationPipe({ exceptionFactory }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
