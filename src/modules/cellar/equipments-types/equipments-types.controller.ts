import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EquipmentsTypesService } from './equipments-types.service';
import { CreateEquipmentsTypeDto } from './dto/create-equipments-type.dto';
import { UpdateEquipmentsTypeDto } from './dto/update-equipments-type.dto';
import { Resp } from 'src/utils';
import { EquipmentsType } from './entities/equipments-type.entity';

@Controller('equipments-types')
export class EquipmentsTypesController {
  constructor(
    private readonly equipmentsTypesService: EquipmentsTypesService,
  ) {}

  @Post()
  async create(@Body() createEquipmentsTypeDto: CreateEquipmentsTypeDto) {
    return Resp.Success<EquipmentsType>(
      await this.equipmentsTypesService.create(createEquipmentsTypeDto),
      'CREATED',
      'Tarifa creada con exito',
    );
    return;
  }

  @Get()
  async findAll() {
    const data = await this.equipmentsTypesService.findAll();
    return Resp.Success<EquipmentsType[]>(
      data,
      'OK',
      data.length == 1
        ? 'Tarifa encontrada'
        : `Total de tarifas: ${data.length}`,
    );
    return this.equipmentsTypesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return Resp.Success<EquipmentsType>(
      await this.equipmentsTypesService.findOne(+id),
      'OK',
      'Tarifa encontrada',
    );
    return this.equipmentsTypesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEquipmentsTypeDto: UpdateEquipmentsTypeDto,
  ) {
    return Resp.Success<EquipmentsType>(
      await this.equipmentsTypesService.update(+id, updateEquipmentsTypeDto),
      'OK',
      'Tarifa actualizada',
    );
    return this.equipmentsTypesService.update(+id, updateEquipmentsTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return Resp.Success<EquipmentsType>(
      await this.equipmentsTypesService.remove(+id),
      'OK',
      'Tarifa eliminada con exito!!',
    );
    return this.equipmentsTypesService.remove(+id);
  }
}
