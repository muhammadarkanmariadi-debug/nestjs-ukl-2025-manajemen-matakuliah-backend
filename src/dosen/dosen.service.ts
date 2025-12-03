import { Injectable } from '@nestjs/common';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DosenService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDosenDto: CreateDosenDto) {
    try {
      const dosen = await this.prisma.dosen.create({
        data: { ...createDosenDto },
      });
      return dosen;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create dosen');
    }
  }

  async findAll() {
    try {
      const dosens = await this.prisma.dosen.findMany();
      return dosens;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve dosens');
    }
  }

  async findOne(nidn: number) {
    try {
      const dosen = await this.prisma.dosen.findUnique({
        where: { nidn },
      });
      return dosen;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve dosen');
    }
  }

  async update(nidn: number, updateDosenDto: UpdateDosenDto) {
    try {
      const dosen = await this.prisma.dosen.update({
        where: { nidn },
        data: { ...updateDosenDto },
      });
      return dosen;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update dosen');
    }
  }

  async remove(nidn: number) {
    try {
      const dosen = await this.prisma.dosen.delete({
        where: { nidn },
      });
      return dosen;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete dosen');
    }
  }
}
