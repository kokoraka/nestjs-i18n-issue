import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';

export class I18NFactory 
{

  static createModule() 
  {
    return I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '')
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale'] },
        new HeaderResolver(['x-lang']),
        AcceptLanguageResolver,
        new CookieResolver(['lang', 'locale']),
      ],
    });
  }
  
}
