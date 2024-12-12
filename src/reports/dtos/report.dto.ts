import {Expose, Transform} from 'class-transformer'
import { User } from 'src/users/user.entity'

export class Report {
  @Expose()
  id:number

  @Expose()
  price: number

  @Expose()
  year: number

  @Expose()
  approved: boolean

  @Expose()
  lat: number

  @Expose()
  lng: number

  @Expose()
  make: string

  @Expose()
  model: string

  @Expose()
  mileage: number

  @Transform(({obj})=>{obj.user.id})
  @Expose()
  userId: number
}