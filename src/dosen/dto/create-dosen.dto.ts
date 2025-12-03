import { jenis_kelamin } from "@prisma/client";
import { IsEnum, IsInt, IsString } from "class-validator";
export class CreateDosenDto {
    @IsInt()
    nidn: number;
    @IsString()
    nama_dosen: string;
    @IsEnum(jenis_kelamin)
    jenis_kelamin: jenis_kelamin;
    @IsString()
    alamat: string;
}
