import { IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
    @IsString()
    @MinLength(3)
    username: string;
    @IsString()
    @MinLength(6)
    password: string;
}
