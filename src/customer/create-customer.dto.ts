import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateCustomerDto {
    @IsNotEmpty({ message: 'Le prénom est requis.' })
    @IsString({ message: 'Le prénom doit être une chaîne de caractères.' })
    first_name: string;

    @IsNotEmpty({ message: 'Le nom est requis.' })
    @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
    last_name: string;

    @IsNotEmpty({ message: 'L\'email est requis.' })
    @IsEmail({}, { message: 'L\'email doit être valide.' })
    email: string;

    @IsOptional()
    @IsString({ message: 'Le fuseau horaire doit être une chaîne de caractères.' })
    timezone?: string;

    @IsNotEmpty({ message: 'Le store_id est requis.' })
    @IsInt({ message: 'Le store_id doit être un entier.' })
    @Min(1, { message: 'Le store_id doit être supérieur ou égal à 1.' })
    store_id: number;

    @IsNotEmpty({ message: 'L\'address_id est requis.' })
    @IsInt({ message: 'L\'address_id doit être un entier.' })
    @Min(1, { message: 'L\'address_id doit être supérieur ou égal à 1.' })
    address_id: number;
}
