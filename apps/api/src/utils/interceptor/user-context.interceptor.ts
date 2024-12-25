import {Injectable, NestInterceptor, ExecutionContext,CallHandler,} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  constructor(private readonly clsService: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user) {
      this.clsService.set('user', user);
    }

    return next.handle();
  }
}
