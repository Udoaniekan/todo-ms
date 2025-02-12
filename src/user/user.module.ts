import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserService } from './user.service';
dotenv.config()

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      global: true,
      secret: process.env.JWTSecret,
      signOptions: { expiresIn: '1h'}
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true
    })
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [PassportModule, JwtStrategy, UserService],
})
export class UserModule {}
