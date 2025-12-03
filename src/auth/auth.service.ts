import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtConstants } from "helper/passport/jwt.constant";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }


  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Username atau password salah');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Username atau password salah');
    }

    const { password: pwd, ...result } = user;
    return result;
  }




  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role, Mahasiswa: user.Mahasiswa };
    return {
      access_token: this.jwtService.sign(payload, { secret: jwtConstants.secret }),
    };
  }


}
