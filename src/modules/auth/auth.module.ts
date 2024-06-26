/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService} from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
// import { DatabaseModule } from 'src/helpers/database/database/database.module';
import { DatabaseModule } from '../../common/database/database.module';
import { JwtModule } from '@nestjs/jwt';
//import { jwtConfig } from 'jwt.config';
import { HelperService } from 'src/helpers/services/helper.service';


@Module({
  imports: [DatabaseModule,
    JwtModule.register({
      //secret: jwtConfig.secret,
      signOptions: {  },
    })
  
  ],
  controllers: [AuthController],
  providers: [AuthService, HelperService],
})
export class AuthModule {}
