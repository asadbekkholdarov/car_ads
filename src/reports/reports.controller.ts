import { Controller, Get, Post, Body, UseGuards, Patch, Param, Query } from '@nestjs/common';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { AdminGuard } from 'src/guard/admin.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Report as ReportDto } from './dtos/report.dto';
import {SerializeDo} from './../interceptor/serialize.interceptor'
import { ApproveDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { query } from 'express';


@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService){}
  
  @Post()
  @UseGuards(AuthGuard)
  @SerializeDo(ReportDto)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User){
    return this.reportsService.create(body, user)
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: number, @Body() body: ApproveDto){
    return this.reportsService.changeApproval(id, body.approved)
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDto){
    return this.reportsService.createEstimate(query)
  }
}
