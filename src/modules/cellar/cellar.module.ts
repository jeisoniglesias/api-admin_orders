import { Module } from '@nestjs/common';
import { EquipmentsTypesModule } from './equipments-types/equipments-types.module';

@Module({
  imports: [EquipmentsTypesModule]
})
export class CellarModule {}
