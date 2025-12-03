import { Injectable } from '@nestjs/common';
import { CreateAnalisiDto } from './dto/create-analisi.dto';
import { UpdateAnalisiDto } from './dto/update-analisi.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AnalisisService {
  constructor(private readonly prisma: PrismaService) { }

  async matkulTop(tahun_ajaran?: string, semester?: number) {
    try {
      const result = await this.prisma.kRS.groupBy({
        by: ['id_penjadwalan'],
        _count: { id_penjadwalan: true },
        orderBy: { _count: { id_penjadwalan: 'desc' } },
        where: { tahun_ajaran, semester },
        take: 5, // ← ambil 5 teratas
      });

      const jadwal = await this.prisma.jadwal.findMany({
        where: { id: { in: result.map(x => x.id_penjadwalan) } },
        include: { matakuliah: true, dosen: true },
      });

      // Mapping hasil agar output rapih
      const data = result.map((x) => {
        const j = jadwal.find(y => y.id === x.id_penjadwalan);
        return {
          id_matakuliah: j?.matakuliah?.id_matakuliah,
          nama_matakuliah: j?.matakuliah?.nama_matakuliah,
          sks: j?.matakuliah?.sks,
          id_dosen: j?.dosen?.nidn,
          nama_dosen: j?.dosen?.nama_dosen,
          total_peminat: x._count.id_penjadwalan,
        };
      });

      return data;
    } catch (error) {
      throw new Error('Error retrieving top matakuliah');
    }
  }


  async DosenTop(tahun_ajaran?: string, semester?: number) {
    try {
      const group = await this.prisma.kRS.groupBy({
        by: ['id_penjadwalan'],
        _count: { id_penjadwalan: true },
        where: { tahun_ajaran, semester },
      });

      const jadwal = await this.prisma.jadwal.findMany({
        where: { id: { in: group.map(x => x.id_penjadwalan) } },
        include: { dosen: true },
      });

      // Hitung total peminat per dosen
      const count = group.reduce((a, x) => {
        const idDosen = jadwal.find(y => y.id === x.id_penjadwalan)?.dosen?.nidn;
        if (idDosen) a[idDosen] = (a[idDosen] || 0) + x._count.id_penjadwalan;
        return a;
      }, {} as Record<string, number>);

      // Sort dan ambil 5 teratas
      const top5 = Object.entries(count)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5); // ← ambil 5 dosen teratas

      // Ambil detail dosen dari database
      const result = await Promise.all(
        top5.map(async ([nidn, total]) => {
          const dosen = await this.prisma.dosen.findUnique({
            where: { nidn: Number(nidn) },
          });

          return {
            id_dosen: nidn,
            nama_dosen: dosen?.nama_dosen,
            total_peminat: total,
          };
        }),
      );

      return result;
    } catch (error) {
      throw new Error('Error retrieving top dosen');
    }
  }

}
