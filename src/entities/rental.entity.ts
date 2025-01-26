import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Film } from './film.entity';

@Entity('rental') // Correspond à la table "rental"
export class Rental {
  @PrimaryGeneratedColumn()
  rental_id: number;

  @Column({ type: 'timestamp' })
  rental_date: Date;

  @Column()
  inventory_id: number;

  @ManyToOne(() => Customer, (customer) => customer.rentals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' }) // Indique que la colonne "customer_id" est utilisée pour la relation
  customer: Customer;

  @ManyToOne(() => Film, (film) => film.rentals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'film_id' }) // Si une colonne "film_id" est utilisée pour la relation
  film: Film;

  @Column({ type: 'timestamp', nullable: true })
  return_date: Date;

  @Column()
  staff_id: number;

  @Column({ type: 'boolean', default: false })
  is_notified_j5: boolean;

  @Column({ type: 'boolean', default: false })
  is_notified_j3: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  start_date: Date;

  @Column({ type: 'timestamptz', nullable: true })
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
