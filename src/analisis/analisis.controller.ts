import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AnalisisService } from './analisis.service';
import { CreateAnalisiDto } from './dto/create-analisi.dto';
import { UpdateAnalisiDto } from './dto/update-analisi.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'helper/guard/roles.guard';
import { Roles } from 'helper/decorator/roles.decorator';

@Controller('analisis')
export class AnalisisController {
  constructor(private readonly analisisService: AnalisisService) { }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin'])
  @Get('matkul-top')
  async matkulTop() {
    try {
      const data = await this.analisisService.matkulTop();
      return {
        status: 200,
        message: 'Top matakuliah retrieved successfully',
        data,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin'])
  @Get('dosen-top')
  async dosenTop() {
    try {
      const data = await this.analisisService.DosenTop();
      return {
        status: 200,
        message: 'Top dosen retrieved successfully',
        data,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin', 'Mahasiswa'])
  @Get('dosen&matkul-top')
  async matkuldosentop(@Body() data: { tahun_ajaran?: string; semester?: number }) {
    try {

      const [matkulData, dosenData] = await Promise.all([
        this.analisisService.matkulTop(data.tahun_ajaran, data.semester),
        this.analisisService.DosenTop(data.tahun_ajaran, data.semester),
      ]);

      return {
        status: 200,
        message: 'Top dosen retrieved successfully',
        data: {
          matkul: matkulData,
          dosen: dosenData,
        },
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }


}
