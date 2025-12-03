import { Injectable } from '@nestjs/common';
import { CreateMatakuliahDto } from './dto/create-matakuliah.dto';
import { UpdateMatakuliahDto } from './dto/update-matakuliah.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MatakuliahService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createMatakuliahDto: CreateMatakuliahDto) {
    try {
      return await this.prisma.matakuliah.create({
        data: createMatakuliahDto,
      });
    } catch (error) {
      throw new Error('Error creating matakuliah', error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.matakuliah.findMany({
        include: {
          Dosen : {
            select : {
              nama_dosen: true,
            }
          },
        }
      });
    } catch (error) {
      throw new Error('Error retrieving matakuliah');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.matakuliah.findUnique({
        where: { id_matakuliah: id },
      });
    } catch (error) {
      throw new Error('Error retrieving matakuliah');
    }
  }

  async update(id: number, updateMatakuliahDto: UpdateMatakuliahDto) {
    try {
      return await this.prisma.matakuliah.update({
        where: { id_matakuliah: id },
        data: updateMatakuliahDto,
      });
    } catch (error) {
      throw new Error('Error updating matakuliah');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.matakuliah.delete({
        where: { id_matakuliah: id },
      });
    } catch (error) {
      throw new Error('Error deleting matakuliah');
    }
  }
}
