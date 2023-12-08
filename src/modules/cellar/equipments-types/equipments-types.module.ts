import { Module } from '@nestjs/common';
import { EquipmentsTypesService } from './equipments-types.service';
import { EquipmentsTypesController } from './equipments-types.controller';
import { EquipmentsType } from './entities/equipments-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentsType])],
  controllers: [EquipmentsTypesController],
  providers: [EquipmentsTypesService],
  exports: [EquipmentsTypesService, TypeOrmModule],
})
export class EquipmentsTypesModule {}
