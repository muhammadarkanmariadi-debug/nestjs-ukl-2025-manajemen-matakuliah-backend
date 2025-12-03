import { IsArray, ArrayMinSize, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SelectMatakuliahDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Minimal harus memilih 1 matakuliah' })
  @Type(() => Number)
  @IsInt({ each: true })
  id_penjadwalan: number[];

  @IsInt()
  @Min(1)
  @Type(() => Number)
  semester: number;

  @IsString()
  tahun_ajaran: string; // Format: "2024/2025"
}