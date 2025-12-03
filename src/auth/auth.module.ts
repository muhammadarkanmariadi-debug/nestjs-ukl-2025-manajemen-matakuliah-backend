import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from 'helper/passport/jwt.constant';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from 'helper/passport/jwt.strategy';
import { LocalStrategy } from 'helper/passport/local.startegy';

@Module({
  imports: [
    
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, JwtStrategy, LocalStrategy],
})
export class AuthModule { }
