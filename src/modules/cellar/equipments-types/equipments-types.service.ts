import { Injectable } from '@nestjs/common';
import { CreateEquipmentsTypeDto } from './dto/create-equipments-type.dto';
import { UpdateEquipmentsTypeDto } from './dto/update-equipments-type.dto';
import { EquipmentsType as EquipmentsTypeEntity } from './entities/equipments-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resp } from 'src/utils';

@Injectable()
export class EquipmentsTypesService {
  constructor(
    @InjectRepository(EquipmentsTypeEntity)
    private readonly equipmentTypeRepo: Repository<EquipmentsTypeEntity>,
  ) {}
  private async validateName(name: string, id?: number): Promise<void> {
    const existingType: EquipmentsTypeEntity =
      await this.equipmentTypeRepo.findOneBy({ name });

    if (existingType && existingType.id !== id) {
      Resp.Error(
        'CONFLICT',
        `Un tipo de equipo con el nombre ${name} ya existe.`,
      );
    }
  }
  //--------------------- CRUD ---------------------
  async create(
    createEquipmentsTypeDto: CreateEquipmentsTypeDto,
  ): Promise<EquipmentsTypeEntity> {
    await this.validateName(createEquipmentsTypeDto.name);
    const type = this.equipmentTypeRepo.create(createEquipmentsTypeDto);

    return await this.equipmentTypeRepo.save(type);
  }

  async findAll(): Promise<EquipmentsTypeEntity[]> {
    const types: EquipmentsTypeEntity[] = await this.equipmentTypeRepo.find({
      withDeleted: true,
    });
    console.log(types);

    if (types.length === 0) {
      Resp.Error('NOT_FOUND', 'No se encontraron tipos de equipos.');
    }
    return types;
  }

  findOne(id: number): Promise<EquipmentsTypeEntity> {
    try {
      return this.equipmentTypeRepo.findOneOrFail({
        where: { id },
        withDeleted: true,
        /*  relations: ['equipments'], */
      });
    } catch (error) {
      throw Resp.Error(
        'NOT_FOUND',
        `No se encontro tipo de equipo con id: ${id}`,
      );
    }
  }

  async update(
    id: number,
    updateEquipmentsTypeDto: UpdateEquipmentsTypeDto,
  ): Promise<EquipmentsTypeEntity> {
    const type: EquipmentsTypeEntity = await this.findOne(id);
    await this.validateName(updateEquipmentsTypeDto.name, id);

    this.equipmentTypeRepo.merge(type, updateEquipmentsTypeDto);
    return await this.equipmentTypeRepo.save(type);
  }

  async remove(id: number): Promise<EquipmentsTypeEntity> {
    try {
      const type: EquipmentsTypeEntity = await this.findOne(id);
      /* if (!type?.equipments.length) {
        await this.equipmentTypeRepo.delete(id);
      } else { */
      await this.equipmentTypeRepo.softRemove(type);
      /* } */
      return type;
    } catch (error) {
      Resp.Error('NOT_FOUND', `No se encontro tipo de equipo con id: ${id}`);
    }
  }
}
