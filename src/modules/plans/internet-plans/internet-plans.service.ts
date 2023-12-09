import { Injectable } from '@nestjs/common';
import { CreateInternetPlanDto } from './dto/create-internet-plan.dto';
import { UpdateInternetPlanDto } from './dto/update-internet-plan.dto';
import { InternetPlan } from './entities/internet-plan.entity';
import { InternetRate } from '../internet-rates/entities/internet-rate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resp } from 'src/utils';

@Injectable()
export class InternetPlansService {
  constructor(
    @InjectRepository(InternetPlan)
    private readonly planesInternetRepository: Repository<InternetPlan>,
    @InjectRepository(InternetRate)
    private readonly tarifasRepository: Repository<InternetRate>,
  ) {}

  private async findPlanesInternetAllOrOne(
    /*     user: UserInterface,
     */ id?: number | null,
  ): Promise<InternetPlan[] | InternetPlan | null> {
    let response: InternetPlan[] | InternetPlan = null;
    /* const isAdmin = user.roles.some(
      (userRole) => userRole.name === DefaultRoles.ADMIN,
    ); */
    /*  if (isAdmin) {
      response = await this.planesInternetRepository
        .createQueryBuilder('planesInternet')
        .withDeleted()
        .leftJoinAndSelect('planesInternet.tarifa', 'tarifa')
        .getMany();
    } else { */
    response = await this.planesInternetRepository
      .createQueryBuilder('planesInternet')
      .leftJoinAndSelect('planesInternet.tarifa', 'tarifa')
      .getMany();
    /*  } */

    return id ? response.find((plan) => plan.id === id) : response;
  }

  private async ValidateName(name: string, id?: number) {
    const existingPlanesInternet =
      await this.planesInternetRepository.findOneBy({ name });
    if (existingPlanesInternet && existingPlanesInternet.id !== id) {
      Resp.Error('CONFLICT', `Ya existe un plan con el nombre ${name}.`);
    }
  }

  private async ValidateTarifa(tarifa: number) {
    const existingTarifa = await this.tarifasRepository.findOneBy({
      id: tarifa,
    });
    if (!existingTarifa) {
      Resp.Error('CONFLICT', `No existe una tarifa con el id ${tarifa}.`);
    }
    return existingTarifa;
  }
  async getTarifas(): Promise<InternetRate[]> {
    const tarifas = await this.tarifasRepository.find();
    if (tarifas.length === 0) {
      Resp.Error('NOT_FOUND', 'No se encontraron tarifas');
    }
    return tarifas;
  }

  //--------------------------------------------------------------------------
  async create(
    createInternetPlanDto: CreateInternetPlanDto,
  ): Promise<InternetPlan> {
    console.log('crear plan');

    console.log(createInternetPlanDto);

    const { tarifa: tarifaId, name, ...rest } = createInternetPlanDto;
    await this.ValidateName(name);

    const tarifa = await this.ValidateTarifa(tarifaId);

    const planesInternet = this.planesInternetRepository.create({
      name,
      ...rest,
      tarifa,
    });
    return await this.planesInternetRepository.save(planesInternet);
  }

  async findAll(): Promise<InternetPlan[] | InternetPlan> {
    const planesInternet = await this.planesInternetRepository.find({
      relations: ['tarifa'],
    });
    if (planesInternet.length === 0) {
      Resp.Error('NOT_FOUND', 'No se encontraron planes de internet');
    }
    return planesInternet;
  }

  async findOne(id: number): Promise<InternetPlan> {
    console.log('id plan', id);

    try {
      return await this.planesInternetRepository.findOneOrFail({
        where: { id },
        relations: ['tarifa'],
      });
    } catch (error) {
      Resp.Error('NOT_FOUND', `No se encontro plan de internet con id: ${id}`);
    }
    /*   const planInternet: InternetPlan = await this.findPlanesInternetAllOrOne(
      id,
    );
    if (!planInternet) {
      Resp.Error('NOT_FOUND', `No se encontro plan de internet con id: ${id}`);
    }
    return planInternet; */
  }

  async update(
    id: number,
    updateInternetPlanDto: UpdateInternetPlanDto,
  ): Promise<InternetPlan> {
    console.log(await this.findOne(id));

    // try {
    const plan = await this.findOne(id);
    /*  await this.planesInternetRepository.findOneOrFail({
        where: { id },
        relations: ['tarifa'],
        withDeleted: true,
      }); */

    const { tarifa: tarifaId, name, ...rest } = updateInternetPlanDto;
    await this.ValidateName(name, id);
    const tarifa = await this.ValidateTarifa(tarifaId);

    this.planesInternetRepository.merge(plan, { ...rest, tarifa });

    return await this.planesInternetRepository.save(plan);
    /* } catch (error) {
      Resp.Error('NOT_FOUND', `No se encontro plan de internet con id: ${id}`);
    } */
  }

  async remove(id: number): Promise<InternetPlan> {
    try {
      const plan: InternetPlan =
        await this.planesInternetRepository.findOneByOrFail({ id });
      await this.planesInternetRepository.softRemove(plan);

      return plan;
    } catch (error) {
      Resp.Error('NOT_FOUND', `No se encontro plan de internet con id: ${id}`);
    }
  }
}
