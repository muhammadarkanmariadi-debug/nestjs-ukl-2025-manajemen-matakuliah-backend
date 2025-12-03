import { Mahasiswa, Role } from '@prisma/client';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { CreateDosenDto } from 'src/dosen/dto/create-dosen.dto';
import { CreateMahasiswaDto } from 'src/mahasiswa/dto/create-mahasiswa.dto';
export class CreateUserDto {

    @IsString()
    @MinLength(3)
    username: string

    @IsString()
    @MinLength(6)
    password: string

    @IsEnum(Role)
    role: Role



    Mahasiswa: Partial<CreateMahasiswaDto>;
    Dosen: Partial<CreateDosenDto>
}
