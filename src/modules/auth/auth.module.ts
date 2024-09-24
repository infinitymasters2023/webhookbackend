/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { DatabaseModule } from '../../common/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { HelperService } from 'src/helpers/services/helper.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Make sure ConfigModule is loaded
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
        signOptions: { expiresIn: '60s' }, // You can adjust expiration as needed
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, HelperService],
})
export class AuthModule {}
