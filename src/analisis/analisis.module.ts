import { Module } from '@nestjs/common';
import { AnalisisService } from './analisis.service';
import { AnalisisController } from './analisis.controller';

@Module({
  controllers: [AnalisisController],
  providers: [AnalisisService],
})
export class AnalisisModule {}
