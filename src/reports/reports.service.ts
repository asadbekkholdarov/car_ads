import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import e from 'express';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reportRepo: Repository<Report>){}

  async create(reportDto: CreateReportDTO, user: User){
    const report = await this.reportRepo.create(reportDto)
    report.user = user
    return await this.reportRepo.save(report)
  }

  async changeApproval(id:number, approved: boolean){
    const report = await this.reportRepo.findOneBy({id});
    if(!report) {
      throw new NotFoundException('Report not found')
    }
    report.approved = approved
    return this.reportRepo.save(report)
  }

  async createEstimate(estimateDto: GetEstimateDto) {
    const { make, model, lng, lat, year, mileage } = estimateDto;

    return await this.reportRepo.createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make = :make', { make })
        .andWhere('model = :model', { model })
        .andWhere('lng BETWEEN :lngMin AND :lngMax', { lngMin: lng - 5, lngMax: lng + 5 })
        .andWhere('lat BETWEEN :latMin AND :latMax', { latMin: lat - 5, latMax: lat + 5 })
        .andWhere('year BETWEEN :yearMin AND :yearMax', { yearMin: year - 3, yearMax: year + 3 })
        // .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({ mileage })
        .limit(3)
        .getRawMany();
}
}
