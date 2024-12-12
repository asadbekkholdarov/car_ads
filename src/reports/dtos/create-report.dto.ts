import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from "class-validator";

export class CreateReportDTO {
  @IsString()
  model: string

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number

  @IsString()
  make: string

  @IsNumber()
  @Min(1940)
  @Max(2025)
  year: number

  @IsLatitude()
  lat: number

  @IsLongitude()
  lng: number

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number
}