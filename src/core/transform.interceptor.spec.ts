
import { TransformInterceptor } from './transform.interceptor';

describe('TransformInterceptor', () => {

  describe('class definition', () => {    
    it('should be defined', () => {
      expect(new TransformInterceptor()).toBeDefined();
    });
  });

});
