import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Req
} from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'helper/guard/roles.guard';
import { Roles } from 'helper/decorator/roles.decorator';
import { use } from 'passport';
import { SelectMatakuliahDto } from './dto/select-matakuliah.dto';

@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) { }

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin'])
  @Post()
  async create(@Body() createMahasiswaDto: CreateMahasiswaDto) {
    try {
      return {
        status: 201,
        message: 'Mahasiswa created successfully',
        data: await this.mahasiswaService.create(createMahasiswaDto),
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: 'Failed to create mahasiswa',
        error: error.message,
      };
    }
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin', 'Mahasiswa'])
  @Post('pilihmk')
  async pilihMatakuliah(@Request() req: any, @Body() dto: SelectMatakuliahDto) {

    try {
      console.log('Mahasiswa ID from JWT:', req.user.Mahasiswa.id);
      return await this.mahasiswaService.pilihMatakuliah(dto, req.user.Mahasiswa.id);
    } catch (error) {
      return {
        status: 500,
        message: 'Failed to select matakuliah',
        error: error.message,
      };
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin'])
  @Get()
  async findAll() {
    try {
      return {
        status: 200,
        message: 'Mahasiswa retrieved successfully',
        data: await this.mahasiswaService.findAll(),
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: 'Failed to retrieve mahasiswa',
        error: error.message,
      };
    }
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin', 'Mahasiswa'])
  @Get('penjadwalan')
  async getPenjadwalan(@Request() req: any) {
    try {
      console.log('Mahasiswa ID from JWT:', req.user.Mahasiswa.id);
      return {
        status: 200,
        message: 'Mahasiswa retrieved successfully',
        data: await this.mahasiswaService.getKRS(req.user.Mahasiswa.id),
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: 'Failed to retrieve mahasiswa',
        error: error.message,
      };
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin', 'Mahasiswa'])
  @Get(':nim')
  async findOne(@Param('nim') nim: string) {
    try {
      return {
        status: 200,
        message: 'Mahasiswa retrieved successfully',
        data: await this.mahasiswaService.findOne(nim),
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: 'Failed to retrieve mahasiswa',
        error: error.message,
      };
    }
  }



  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin', 'Mahasiswa'])
  @Patch(':nim')
  async update(
    @Param('nim') nim: string,
    @Body() updateMahasiswaDto: UpdateMahasiswaDto,
  ) {
    try {
      return {
        status: 200,
        message: 'Mahasiswa updated successfully',
        data: await this.mahasiswaService.update(nim, updateMahasiswaDto),
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: 'Failed to update mahasiswa',
        error: error.message,
      };
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin'])
  @Delete(':nim')
  async remove(@Param('nim') nim: string) {
    try {
      return {
        status: 200,
        message: 'Mahasiswa deleted successfully',
        data: await this.mahasiswaService.remove(nim),
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: 'Failed to delete mahasiswa',
        error: error.message,
      };
    }
  }
}
