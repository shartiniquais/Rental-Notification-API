import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from '../entities/rental.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
