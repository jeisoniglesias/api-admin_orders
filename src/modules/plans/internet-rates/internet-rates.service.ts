import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInternetRateDto } from './dto/create-internet-rate.dto';
import { UpdateInternetRateDto } from './dto/update-internet-rate.dto';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { InternetRate } from './entities/internet-rate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternetPlan } from '../internet-plans/entities/internet-plan.entity';
import { Resp } from 'src/utils';

@Injectable()
export class InternetRatesService {
  constructor(
    @InjectRepository(InternetRate)
    private readonly tarifasRepository: Repository<InternetRate>,
    @InjectRepository(InternetPlan)
    private readonly planesInternetRepository: Repository<InternetPlan>,
  ) {}

  private ValidateName = async (name: string, id?: number) => {
    const existingTarifa = await this.tarifasRepository.findOneBy({ name });

    if (existingTarifa && existingTarifa.id !== id) {
      Resp.Error('CONFLICT', `Ya existe una tarifa con el nombre ${name}.`);
    }
  };

  async create(createTarifaDto: CreateInternetRateDto): Promise<InternetRate> {
    await this.ValidateName(createTarifaDto.name);
    const newTarifa = this.tarifasRepository.create(createTarifaDto);
    return await this.tarifasRepository.save(newTarifa);
  }

  async findAll(): Promise<InternetRate[]> {
    const tarifas: InternetRate[] = await this.tarifasRepository.find({
      relations: ['planes'],
    });
    if (tarifas.length === 0) {
      Resp.Error('NOT_FOUND', 'No se encontraron tarifas');
    }
    return tarifas;
  }

  async findOne(id: number): Promise<InternetRate> {
    try {
      return await this.tarifasRepository.findOneOrFail({
        where: { id },
        relations: ['planes'],
      });
    } catch (error) {
      Resp.Error('NOT_FOUND', `No se encontro tarifa con id: ${id}`);
    }
  }

  async update(
    id: number,
    updateInternetRateDto: UpdateInternetRateDto,
  ): Promise<InternetRate> {
    try {
      const tarifa = await this.findOne(id);
      await this.ValidateName(updateInternetRateDto.name, id);
      this.tarifasRepository.merge(tarifa, updateInternetRateDto);
      return await this.tarifasRepository.save(tarifa);
    } catch (error) {
      Resp.Error(
        'NOT_ACCEPTABLE',
        `No se pudo actualizar tarifa con id: ${id}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const tarifa = await this.tarifasRepository.findOneOrFail({
        where: { id },
        relations: ['planes'],
      });
      if (!tarifa.planes.length) {
        await this.tarifasRepository.delete(id);
      } else {
        await this.tarifasRepository.softRemove(tarifa);
      }
      return tarifa;
    } catch (error) {
      Resp.Error('NOT_FOUND', `No se encontro tarifa con id: ${id}`);
    }
  }
}
