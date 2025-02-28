import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {  plainToClass } from 'class-transformer'
import { UserDto } from 'src/users/dtos/user.dto'

interface ClassContructor {
  new (...args: any[]): {}
}

export function SerializeDo(dto:ClassContructor){
  return UseInterceptors(new SerializeInterceptor(dto))
} 

export class SerializeInterceptor implements NestInterceptor {

  constructor(private dto: any){}

  intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return handler.handle().pipe(
      map((data: any)=>{
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true
        })
      })
    )
  }
}