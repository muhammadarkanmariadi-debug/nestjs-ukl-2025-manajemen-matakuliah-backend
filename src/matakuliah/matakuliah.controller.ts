import {
  Controller, Get, Post, Body, Patch, Param, Delete, UsePipes
} from '@nestjs/common';
import { MatakuliahService } from './matakuliah.service';
import { CreateMatakuliahDto } from './dto/create-matakuliah.dto';
import { UpdateMatakuliahDto } from './dto/update-matakuliah.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('matakuliah')
export class MatakuliahController {
  constructor(private readonly matakuliahService: MatakuliahService) { }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createMatakuliahDto: CreateMatakuliahDto) {
    try {
      if (createMatakuliahDto.sks < 1 && createMatakuliahDto.sks > 6) {
        throw new Error('SKS harus antara 1 hingga 6');
      } else {
        const data = await this.matakuliahService.create(createMatakuliahDto);
        return {
          status: 201,
          message: 'Matakuliah created successfully',
          data,
        };
      }
    } catch (error) {
      console.error("🔥 Controller Error (Create):", error);
      return {
        status: 500,
        message: 'Failed to create matakuliah',
        error: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.matakuliahService.findAll();
      return {
        status: 200,
        message: 'Matakuliah retrieved successfully',
        data,
      };
    } catch (error) {
      console.error("🔥 Controller Error (FindAll):", error);
      return {
        status: 500,
        message: 'Failed to retrieve matakuliah',
        error: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.matakuliahService.findOne(+id);
      return {
        status: 200,
        message: 'Matakuliah retrieved successfully',
        data,
      };
    } catch (error) {
      console.error("🔥 Controller Error (FindOne):", error);
      return {
        status: 500,
        message: 'Failed to retrieve matakuliah',
        error: error.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMatakuliahDto: UpdateMatakuliahDto
  ) {
    try {
      const data = await this.matakuliahService.update(+id, updateMatakuliahDto);
      return {
        status: 200,
        message: 'Matakuliah updated successfully',
        data,
      };
    } catch (error) {
      console.error("🔥 Controller Error (Update):", error);
      return {
        status: 500,
        message: 'Failed to update matakuliah',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.matakuliahService.remove(+id);
      return {
        status: 200,
        message: 'Matakuliah deleted successfully',
        data,
      };
    } catch (error) {
      console.error("🔥 Controller Error (Remove):", error);
      return {
        status: 500,
        message: 'Failed to delete matakuliah',
        error: error.message,
      };
    }
  }
}
