import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from "class-validator";
import { Transform } from "class-transformer";

export class GetEstimateDto {
  @IsString()
  model: string

  @IsString()
  make: string

  @Transform(({value})=>parseInt(value))
  @IsNumber()
  @Min(1940)
  @Max(2025)
  year: number

  @Transform(({value})=>parseFloat(value))
  @IsLatitude()
  lat: number

  @Transform(({value})=>parseFloat(value))
  @IsLongitude()
  lng: number

  @Transform(({value})=>parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number
}