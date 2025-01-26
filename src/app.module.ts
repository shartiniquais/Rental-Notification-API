import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';
import { NotificationModule } from './notification/notification.module';
import { Customer } from './entities/customer.entity';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { Film } from './entities/film.entity';
import { Rental } from './entities/rental.entity';
import { RentalController } from './rental/rental.controller';
import { RentalService } from './rental/rental.service';

@Module({
  imports: [
    ScheduleModule.forRoot(), // Configuration des tâches planifiées
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, // Port par défaut de PostgreSQL
      username: 'postgres',
      password: 'Ord1n4t3ur!613110',
      database: 'sakila', // Nom de la base de données
      entities: [Customer, Film, Rental], // Liste des entités
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Customer, Film, Rental]), // Import des entités dans TypeOrmModule
    NotificationModule
  ],
  controllers: [NotificationController, CustomerController, RentalController],
  providers: [NotificationService, CustomerService, RentalService],
})
export class AppModule {}
