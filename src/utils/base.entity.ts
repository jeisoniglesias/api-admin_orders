import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBaseEntity,
  UpdateDateColumn,
} from 'typeorm';

/**
 * BaseEntity class.
 */

export class BaseEntity extends TypeOrmBaseEntity {
  /** @member {Date} id - the id date */
  @PrimaryGeneratedColumn()
  id!: number;

  /** @member {Date} createdAt - the create date */
  @CreateDateColumn()
  createdAt: Date;

  /** @member {Date} updatedAt - the update date */
  @UpdateDateColumn()
  updatedAt: Date;

  /** @member {Date} deletedAt - the delete date */
  @DeleteDateColumn()
  deletedAt: Date;
}
