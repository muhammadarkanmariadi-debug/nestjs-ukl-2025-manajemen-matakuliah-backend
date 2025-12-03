import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { PrismaService } from 'prisma/prisma.service';
import { SelectMatakuliahDto } from './dto/select-matakuliah.dto';
import { response } from 'express';
import dayjs from 'dayjs';


export interface Krs {
  id: number;
  id_matakuliah: number;
  id_mahasiswa: number;
  id_penjadwalan: number;
  semester: number;
  tahun_ajaran: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class MahasiswaService {
  constructor(private readonly prisma: PrismaService) { }
  create(createMahasiswaDto: CreateMahasiswaDto) {
    try {
      return this.prisma.mahasiswa.create({
        data: createMahasiswaDto,
      });
    } catch (error) {
      throw new Error('Error creating mahasiswa');
    }
  }

  findAll() {
    try {
      return this.prisma.mahasiswa.findMany();
    } catch (error) {
      throw new Error('Error finding all mahasiswa');
    }
  }

  findOne(nim: string) {
    try {
      return this.prisma.mahasiswa.findUnique({
        where: { nim: nim },
      });
    } catch (error) {
      throw new Error('Error finding mahasiswa');
    }
  }

  update(nim: string, updateMahasiswaDto: UpdateMahasiswaDto) {
    try {
      return this.prisma.mahasiswa.update({
        where: { nim },
        data: updateMahasiswaDto,
      },);
    } catch (error) {
      throw new Error('Error updating mahasiswa');
    }
  }

  remove(nim: string) {
    try {
      return this.prisma.mahasiswa.delete({
        where: { nim },
      });
    } catch (error) {
      throw new Error('Error deleting mahasiswa');
    }
  }

  async pilihMatakuliah(dto: SelectMatakuliahDto, id_mahasiswa: number) {
    try {

      const existingKRS = await this.prisma.kRS.findFirst({
        where: {
          id_mahasiswa: id_mahasiswa,
          semester: dto.semester,
          tahun_ajaran: dto.tahun_ajaran,
        },
      });

      if (existingKRS) {
        throw new BadRequestException(
          `Anda sudah memilih matakuliah di semester ${dto.semester} tahun ajaran ${dto.tahun_ajaran}`
        );
      }


      const selectAllJadwal = await this.prisma.jadwal.findMany({
        where: {
          id: { in: dto.id_penjadwalan },
        },
        include: {
          matakuliah: {
            select: {
              id_matakuliah: true,
              nama_matakuliah: true,
              sks: true,
            },

          },
        },
      });


      if (selectAllJadwal.length === 0) {
        throw new BadRequestException('Tidak ada jadwal yang ditemukan');
      }



      const totalSKS = selectAllJadwal.reduce((sum, jadwal) => {
        return sum + (jadwal.matakuliah?.sks || 0);
      }, 0);


      if (totalSKS < 15 || totalSKS > 23) {
        throw new BadRequestException(
          `Total SKS harus antara 15 hingga 23. Anda memilih ${totalSKS} SKS`
        );
      }


      for (let i = 0; i < selectAllJadwal.length; i++) {
        for (let j = i + 1; j < selectAllJadwal.length; j++) {
          const j1 = selectAllJadwal[i];
          const j2 = selectAllJadwal[j];


          if (j1.hari === j2.hari) {


            const mulai1 = dayjs(j1.jam_mulai, 'HH:mm');
            const selesai1 = dayjs(j1.jam_selesai, 'HH:mm');
            const mulai2 = dayjs(j2.jam_mulai, 'HH:mm');
            const selesai2 = dayjs(j2.jam_selesai, 'HH:mm');


            const isOverlap = mulai1.isBefore(selesai2) && selesai1.isAfter(mulai2);

            if (isOverlap) {
              throw new BadRequestException(
                `Jadwal bentrok: ${j1.matakuliah?.nama_matakuliah} dan ${j2.matakuliah?.nama_matakuliah} pada hari ${j1.hari}`
              );
            }
          }
        }
      }



      const krsCreated: Krs[] = [];
      for (const jadwal of selectAllJadwal) {
        const krs = await this.prisma.kRS.create({
          data: {
            id_matakuliah: jadwal.matakuliah!.id_matakuliah,
            id_mahasiswa: id_mahasiswa,
            id_penjadwalan: jadwal.id,
            semester: dto.semester,
            tahun_ajaran: dto.tahun_ajaran,
          },
        });
        krsCreated.push(krs);
      }


      return {
        message: 'matakuliah berhasil dipilih',
        data: {
          semester: dto.semester,
          tahun_ajaran: dto.tahun_ajaran,
          total_sks: totalSKS,
          jumlah_matakuliah: selectAllJadwal.length,
          krs: krsCreated.map(krs => ({
            id: krs.id,
            id_mahasiswa: krs.id_mahasiswa,
            id_matakuliah: krs.id_matakuliah,
            id_penjadwalan: krs.id_penjadwalan,
            semester: krs.semester,
            tahun_ajaran: krs.tahun_ajaran,
          })),
        },
      };
    } catch (error) {

      if (error instanceof BadRequestException) {
        throw error;
      }


      throw new BadRequestException('Error selecting matakuliah: ' + error.message);
    }
  }

  async getKRS(id_mahasiswa: number) {
    try {
      const krs = await this.prisma.kRS.findMany({
        where: {
          id_mahasiswa: id_mahasiswa,

        },
        include: {
          matakuliah: true,
          Jadwal: true,
        },
      });

      return {
        message: 'KRS Berhasil diambil',
        data: krs,
      };
    } catch (error) {
      throw new BadRequestException('Error retrieving KRS: ' + error.message);
    }
  }
}








