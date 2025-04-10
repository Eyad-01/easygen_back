import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { email, name, password } = signUpDto;
    this.logger.log(`Signing up user: ${email}`);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(email, name, password);
    const createdUser = new this.userModel({
      email,
      name,
      password: hashedPassword,
    });
    const savedUser = await createdUser.save();
    this.logger.log(`User signed up successfully: ${email}`);
    return savedUser;
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string; user: string }> {
    const { email, password } = signInDto;
    this.logger.log(`Signing in user: ${email}`);
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.logger.error(`Invalid credentials for user: ${email}`);
      throw new UnauthorizedException('Invalid credentials.');
    }
    const payload = { email: user.email, sub: user._id };
    const token = await this.jwtService.signAsync(payload);
    this.logger.log(`User signed in successfully: ${email} ${token}`);
    return { token, user: user.name };
  }
}
