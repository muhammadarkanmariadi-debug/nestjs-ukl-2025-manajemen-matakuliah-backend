import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateMahasiswaDto } from 'src/mahasiswa/dto/create-mahasiswa.dto';
import { CreateDosenDto } from 'src/dosen/dto/create-dosen.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: any) {
    const { username, password, role, mahasiswa } = body;

    return this.userService.create(
      { username, password, role } as CreateUserDto,
      role === 'Mahasiswa' ? (mahasiswa as CreateMahasiswaDto) : undefined,
      role === 'Dosen' ? (body.dosen as CreateDosenDto) : undefined
    );
  }

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: any) {
    return this.userService.update(Number(id), body);
  }
}
