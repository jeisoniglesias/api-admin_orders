import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { InternetRate } from '../../internet-rates/entities/internet-rate.entity';
import { BaseEntity } from 'src/utils/base.entity';

@Entity({ name: 'internet_plans' })
export class InternetPlan extends BaseEntity {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column('decimal', { comment: 'valor con impuesto', nullable: false })
  vrWithImpuesto: number;

  @Column('decimal', { comment: 'valor impuesto', nullable: false, default: 0 })
  vrIva: number;

  @Column('decimal', { comment: 'valor sin impuesto', nullable: false })
  vrBase: number;

  @Column('int')
  velocidad: number;

  @Column({ nullable: true })
  medio?: string;

  @ManyToOne(() => InternetRate, (tarifa) => tarifa.planes)
  tarifa: InternetRate;

  /*   @OneToMany(() => ContractedServiceEntity, (service) => service.plan)
  service: ContractedServiceEntity; */

  get calculatedVrWithImpuesto(): number {
    return this.vrBase + this.vrIva;
  }
  @BeforeInsert()
  calculateVrWithImpuesto() {
    this.vrWithImpuesto = this.calculatedVrWithImpuesto;
  }
}
