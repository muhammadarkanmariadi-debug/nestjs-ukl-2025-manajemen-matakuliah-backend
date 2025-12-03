import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateMahasiswaDto } from 'src/mahasiswa/dto/create-mahasiswa.dto';
import * as bcrypt from 'bcryptjs';
import { CreateDosenDto } from 'src/dosen/dto/create-dosen.dto';
import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto, createMahasiswaDto?: CreateMahasiswaDto, createDosenDto?: CreateDosenDto) {
    try {
      const ex = await this.prisma.user.findUnique({
        where: { username: createUserDto.username }
      });

      if (ex) {
        throw new Error('Username sudah terdaftar');
      }

      const hash = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          username: createUserDto.username,
          password: hash,
          role: createUserDto.role,
          Mahasiswa:
            createUserDto.role === 'Mahasiswa' && createMahasiswaDto
              ? {
                create: {
                  nama_mahasiswa: createMahasiswaDto.nama_mahasiswa,
                  jurusan: createMahasiswaDto.jurusan,
                  nim: createMahasiswaDto.nim,
                  jenis_kelamin: createMahasiswaDto.jenis_kelamin,

                },
              }
              : undefined,
          Dosen:
            createUserDto.role === 'Dosen' && createDosenDto
              ? {
                create: {

                  nama_dosen: createDosenDto.nama_dosen,
                  jenis_kelamin: createDosenDto.jenis_kelamin,
                  nidn: createDosenDto.nidn,
                  alamat: createDosenDto.alamat,
                },
              } : undefined
        },
        include: {
          Mahasiswa: true,
          Dosen: true
        },
      });


      if (user.Mahasiswa) {
        const update = await this.prisma.mahasiswa.update({
          where: {
            id: user.Mahasiswa?.id
          },
          data: {
            userId: user.id
          }
        })
      }

      if (user.Dosen) {
        const updateDosen = await this.prisma.dosen.update({
          where: {
            nidn: user.Dosen?.nidn
          },
          data: {
            id_user: user.id
          }
        })
      }

      return user;
    } catch (error: any) {
      console.error(error);

      // Tangani duplicate nim / username
      if (
        error.code === 'P2002' &&
        error.meta?.target?.includes('nim')
      ) {
        throw new Error('NIM sudah terdaftar');
      }

      if (
        error.code === 'P2002' &&
        error.meta?.target?.includes('username')
      ) {
        throw new Error('Username sudah terdaftar');
      }

      throw new Error('Gagal membuat user');
    }
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: { Mahasiswa: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { Mahasiswa: true },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    updateMahasiswaDto?: Partial<CreateMahasiswaDto>,
    updateDosenDto?: Partial<CreateDosenDto>
  ) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        Mahasiswa: updateMahasiswaDto
          ? { update: updateMahasiswaDto }
          : undefined,

        Dosen: updateDosenDto
          ? { update: updateDosenDto }
          : undefined,
      },
      include: { Mahasiswa: true, Dosen: true },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true, role: true, password: true, Mahasiswa: true },
    });
  }
}
