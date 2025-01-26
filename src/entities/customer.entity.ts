import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rental } from './rental.entity';

@Entity('customer') // Correspond à la table "customer"
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  store_id: number;

  @Column({ length: 45 })
  first_name: string;

  @Column({ length: 45 })
  last_name: string;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column()
  address_id: number;

  @Column({ default: true })
  activebool: boolean;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  create_date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_update: Date;

  @Column({ nullable: true })
  active: number;

  @Column({ length: 50, default: 'UTC' })
  timezone: string;

  @OneToMany(() => Rental, (rental) => rental.customer)
  rentals: Rental[];
}
