import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InternetRatesService } from './internet-rates.service';
import { CreateInternetRateDto } from './dto/create-internet-rate.dto';
import { UpdateInternetRateDto } from './dto/update-internet-rate.dto';
import { Resp } from 'src/utils';
import { InternetRate } from './entities/internet-rate.entity';

@Controller('internet-rates')
export class InternetRatesController {
  constructor(private readonly internetRatesService: InternetRatesService) {}

  @Post()
  async create(@Body() createInternetRateDto: CreateInternetRateDto) {
    //return await this.internetRatesService.create(createInternetRateDto);
    return Resp.Success<InternetRate>(
      await this.internetRatesService.create(createInternetRateDto),
      'CREATED',
      'Tarifa creada con exito',
    );
  }

  @Get()
  async findAll() {
    const data = await this.internetRatesService.findAll();
    console.log(data.length);

    return Resp.Success<InternetRate[]>(
      data,
      'OK',
      data.length == 1
        ? 'Tarifa encontrada'
        : `Total de tarifas: ${data.length}`,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return Resp.Success<InternetRate>(
      await this.internetRatesService.findOne(+id),
      'OK',
      'Tarifa encontrada',
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInternetRateDto: UpdateInternetRateDto,
  ) {
    return Resp.Success<InternetRate>(
      await this.internetRatesService.update(+id, updateInternetRateDto),
      'OK',
      'Tarifa actualizada con exito',
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return Resp.Success<InternetRate>(
      await this.internetRatesService.remove(+id),
      'OK',
      'Tarifa eliminda con exito',
    );
    return;
  }
}
