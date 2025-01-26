import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsISO8601,
  } from 'class-validator';
  
  export class CreateRentalDto {
    @IsNotEmpty({ message: 'Le rental_date est requis.' })
    @IsISO8601({ strict: true }, { message: 'Le rental_date doit être une date valide (ISO8601).' })
    rental_date: string;
  
    @IsNotEmpty({ message: 'Le inventory_id est requis.' })
    @IsInt({ message: 'Le inventory_id doit être un entier.' })
    inventory_id: number;
  
    @IsNotEmpty({ message: 'Le customer_id est requis.' })
    @IsInt({ message: 'Le customer_id doit être un entier.' })
    customer_id: number;
  
    @IsOptional()
    @IsISO8601({ strict: true }, { message: 'Le return_date doit être une date valide (ISO8601).' })
    return_date?: string;
  
    @IsNotEmpty({ message: 'Le staff_id est requis.' })
    @IsInt({ message: 'Le staff_id doit être un entier.' })
    staff_id: number;
  
    @IsOptional()
    @IsBoolean({ message: 'is_notified_j5 doit être un booléen.' })
    is_notified_j5?: boolean;
  
    @IsOptional()
    @IsBoolean({ message: 'is_notified_j3 doit être un booléen.' })
    is_notified_j3?: boolean;
  
    @IsOptional()
    @IsISO8601({ strict: true }, { message: 'start_date doit être une date valide (ISO8601).' })
    start_date?: string;
  
    @IsOptional()
    @IsISO8601({ strict: true }, { message: 'due_date doit être une date valide (ISO8601).' })
    due_date?: string;
  
    @IsOptional()
    @IsInt({ message: 'film_id doit être un entier.' })
    film_id?: number;
  }
  