import { IsInt, IsString } from "class-validator"

export class CreateMatakuliahDto {
    @IsString()
    nama_matakuliah: string
    @IsInt()
    sks: number
    @IsInt()
    id_dosen: number
    @IsInt()
    id_matakuliah: number

}
