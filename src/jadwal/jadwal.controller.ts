import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { JadwalService } from './jadwal.service';
import { CreateJadwalDto } from './dto/create-jadwal.dto';
import { UpdateJadwalDto } from './dto/update-jadwal.dto';
import { Roles } from 'helper/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'helper/guard/roles.guard';

@Controller('jadwal')
export class JadwalController {
  constructor(private readonly jadwalService: JadwalService) { }


  @UsePipes(ValidationPipe)

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin'])
  @Post()
  async create(@Body() createJadwalDto: CreateJadwalDto) {
    try {
      return await this.jadwalService.create(createJadwalDto);
    } catch (error) {
      throw new Error('Controller error: gagal membuat jadwal');
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin', 'Mahasiswa'])
  @Get()
  async findAll() {
    try {
      return await this.jadwalService.findAll();
    } catch (error) {
      throw new Error('Controller error: gagal mengambil data jadwal');
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin', 'Mahasiswa'])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.jadwalService.findOne(+id);
    } catch (error) {
      throw new Error('Controller error: gagal mengambil jadwal');
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin'])
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJadwalDto: UpdateJadwalDto) {
    try {
      return await this.jadwalService.update(+id, updateJadwalDto);
    } catch (error) {
      throw new Error('Controller error: gagal mengupdate jadwal');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.jadwalService.remove(+id);
    } catch (error) {
      throw new Error('Controller error: gagal menghapus jadwal');
    }
  }
}
