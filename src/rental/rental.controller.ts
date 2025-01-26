import { Body, Controller, Post } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './create-rental.dto';

@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  async createOrUpdateRental(@Body() rentalData: CreateRentalDto) {
    const rental = await this.rentalService.createOrUpdateRental(rentalData);
    return {
      message: 'Location ajoutée ou mise à jour avec succès',
      rental,
    };
  }
}
