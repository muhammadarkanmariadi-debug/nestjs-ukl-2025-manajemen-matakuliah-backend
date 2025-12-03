import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateJadwalDto {
  @IsInt()
  @IsNotEmpty()
  id_dosen: number;

  @IsInt()
  @IsNotEmpty()
  id_matakuliah: number;

  @IsNotEmpty()
  hari: string
  @IsDateString()
  jam_mulai: string
  @IsDateString()
  jam_selesai: string

}
