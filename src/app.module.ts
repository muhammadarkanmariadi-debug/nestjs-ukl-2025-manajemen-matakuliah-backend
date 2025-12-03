import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DosenModule } from './dosen/dosen.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { MatakuliahModule } from './matakuliah/matakuliah.module';
import { JadwalModule } from './jadwal/jadwal.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AnalisisModule } from './analisis/analisis.module';

@Module({
  imports: [AuthModule, UserModule, DosenModule, MahasiswaModule, MatakuliahModule, JadwalModule, PrismaModule, AnalisisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
