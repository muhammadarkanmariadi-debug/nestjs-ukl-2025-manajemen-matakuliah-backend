import { jenis_kelamin, Mahasiswa } from "@prisma/client"
import { IsEnum, IsInt, isString, IsString } from "class-validator"

export class CreateMahasiswaDto {
    @IsString()
    nama_mahasiswa: string
    @IsString()
    nim: string
    
    @IsEnum(jenis_kelamin)
    jenis_kelamin: jenis_kelamin

    @IsString()
    jurusan: string


    @IsInt()
    userId : number

}
