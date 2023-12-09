import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InternetPlansService } from './internet-plans.service';
import { CreateInternetPlanDto } from './dto/create-internet-plan.dto';
import { UpdateInternetPlanDto } from './dto/update-internet-plan.dto';
import { InternetPlan } from './entities/internet-plan.entity';
import { Resp } from 'src/utils';
import { InternetRate } from '../internet-rates/entities/internet-rate.entity';

@Controller('internet-plans')
export class InternetPlansController {
  constructor(private readonly internetPlansService: InternetPlansService) {}
  @Get('tarifas')
  async getTarifas() {
    const tarifas: InternetRate[] =
      await this.internetPlansService.getTarifas();
    const message = Array.isArray(tarifas)
      ? `Total de tarifas: ${tarifas.length}`
      : 'Tarifa encontrada';
    return Resp.Success<InternetRate[] | InternetPlan>(tarifas, 'OK', message);
  }

  @Post()
  async create(@Body() createInternetPlanDto: CreateInternetPlanDto) {
    return Resp.Success<InternetPlan>(
      await this.internetPlansService.create(createInternetPlanDto),
      'CREATED',
      'Plan creado con exito',
    );
    return;
  }

  @Get()
  async findAll() {
    const planes: InternetPlan[] | InternetPlan =
      await this.internetPlansService.findAll();
    const message = Array.isArray(planes)
      ? `Total de planes: ${planes.length}`
      : 'Plan encontrado';
    return Resp.Success<InternetPlan[] | InternetPlan>(planes, 'OK', message);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return Resp.Success<InternetPlan[] | InternetPlan>(
      await this.internetPlansService.findOne(+id),
      'OK',
      'Plan encontrado',
    );

    return;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInternetPlanDto: UpdateInternetPlanDto,
  ) {
    return Resp.Success<InternetPlan>(
      await this.internetPlansService.update(+id, updateInternetPlanDto),
      'OK',
      'Plan actualizado con exito',
    );

    return;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return Resp.Success<InternetPlan>(
      await this.internetPlansService.remove(+id),
      'OK',
      'Plan eliminado con exito',
    );
    return;
  }
}
