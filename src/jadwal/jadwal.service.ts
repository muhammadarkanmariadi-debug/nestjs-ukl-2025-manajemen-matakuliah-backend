import { Injectable } from '@nestjs/common';
import { CreateJadwalDto } from './dto/create-jadwal.dto';
import { UpdateJadwalDto } from './dto/update-jadwal.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class JadwalService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createJadwalDto: CreateJadwalDto) {
    try {
      return await this.prisma.jadwal.create({
        data: createJadwalDto,
      });
    } catch (error) {
      throw new Error('Error creating jadwal');
    }
  }

  async findAll() {
    try {
      return await this.prisma.jadwal.findMany({
        include: {
          dosen: {
            select: {
              nama_dosen: true,
              nidn: true,
            }
          }
        }
      });
    } catch (error) {
      throw new Error('Error finding all jadwal');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.jadwal.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error('Error finding jadwal');
    }
  }

  async update(id: number, updateJadwalDto: UpdateJadwalDto) {
    try {
      return await this.prisma.jadwal.update({
        where: { id },
        data: updateJadwalDto,
      });
    } catch (error) {
      throw new Error('Error updating jadwal');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.jadwal.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Error deleting jadwal');
    }
  }
}
