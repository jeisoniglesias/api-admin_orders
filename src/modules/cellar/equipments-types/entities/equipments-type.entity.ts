import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TypeEquipmentEnum } from '../enums/TypeEquipmet.enum';

@Entity('equipments_types')
export class EquipmentsType extends BaseEntity {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: TypeEquipmentEnum,
    default: TypeEquipmentEnum.Ont,
  })
  type: TypeEquipmentEnum;

  /* @OneToMany(() => Equipment, (equipment) => equipment.type)
  equipments: Equipment[]; */
}
