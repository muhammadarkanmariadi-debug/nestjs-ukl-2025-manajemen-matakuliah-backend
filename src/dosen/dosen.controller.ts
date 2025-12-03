import { 
  Controller, Get, Post, Body, Patch, Param, Delete, 
  UsePipes, ValidationPipe, UseGuards 
} from '@nestjs/common';
import { DosenService } from './dosen.service';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'helper/guard/roles.guard';
import { Roles } from 'helper/decorator/roles.decorator';

@Controller('dosen')
export class DosenController {
  constructor(private readonly dosenService: DosenService) {}

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin'])
  @Post()
  async create(@Body() createDosenDto: CreateDosenDto) {
    try {
      const data = await this.dosenService.create(createDosenDto);
      return {
        status: 201,
        message: 'Dosen created successfully',
        data,
      };
    } catch (error) {
      console.error("🔥 Controller Error (Create):", error);
      return {
        status: 500,
        message: 'Failed to create dosen',
        error: error.message,
      };
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin'])
  @Get()
  async findAll() {
    try {
      const data = await this.dosenService.findAll();
      return {
        status: 200,
        message: 'Dosens retrieved successfully',
        data,
      };
    } catch (error) {
      console.error("🔥 Controller Error (FindAll):", error);
      return {
        status: 500,
        message: 'Failed to retrieve dosen',
        error: error.message,
      };
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin'])
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.dosenService.findOne(+id);
      return {
        status: 200,
        message: 'Dosen retrieved successfully',
        data,
      };
    } catch (error) {
      console.error("🔥 Controller Error (FindOne):", error);
      return {
        status: 500,
        message: 'Failed to retrieve dosen',
        error: error.message,
      };
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin'])
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDosenDto: UpdateDosenDto,
  ) {
    try {
      const data = await this.dosenService.update(+id, updateDosenDto);
      return {
        status: 200,
        message: 'Dosen updated successfully',
        data,
      };
    } catch (error) {
      console.error("🔥 Controller Error (Update):", error);
      return {
        status: 500,
        message: 'Failed to update dosen',
        error: error.message,
      };
    }
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(['Admin'])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.dosenService.remove(+id);
      return {
        status: 200,
        message: 'Dosen deleted successfully',
        data,
      };
    } catch (error) {
      console.error("🔥 Controller Error (Remove):", error);
      return {
        status: 500,
        message: 'Failed to delete dosen',
        error: error.message,
      };
    }
  }
}
