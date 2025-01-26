import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rental } from './rental.entity';

@Entity('film') // Correspond au nom de la table dans la base
export class Film {
  @PrimaryGeneratedColumn()
  film_id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'smallint', nullable: true })
  release_year: number;

  @Column()
  language_id: number;

  @Column({ nullable: true })
  original_language_id: number;

  @Column({ type: 'smallint', default: 3 })
  rental_duration: number;

  @Column({ type: 'numeric', precision: 4, scale: 2, default: 4.99 })
  rental_rate: number;

  @Column({ type: 'smallint', nullable: true })
  length: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 19.99 })
  replacement_cost: number;

  @Column({ type: 'text', nullable: true, array: true })
  special_features: string[];

  @Column({ type: 'tsvector' })
  fulltext: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_update: Date;

  @OneToMany(() => Rental, (rental) => rental.film)
  rentals: Rental[];
}
