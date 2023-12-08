import {  Column, Entity, OneToMany } from 'typeorm';
import { InternetPlan } from '../../internet-plans/entities/internet-plan.entity';
import { BaseEntity } from 'src/utils/base.entity';

@Entity({ name: 'internet_rates' })
export class InternetRate extends BaseEntity {
  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => InternetPlan, (plan) => plan.tarifa)
  planes: InternetPlan[];

  /*   @OneToMany(() => IpAddress, (ipAddress) => ipAddress.type)
  ipAddresses: IpAddress[]; */
}
