import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class Interceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()
    const {userId } = request.session || {}
    if(userId){
      const user = await this.usersService.findOne(userId)
      request.currentUser = user
    }
    return next.handle()
  }
}
