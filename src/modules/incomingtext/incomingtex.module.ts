/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { IncomingtextController } from './incomingtext.controller';
// import { DatabaseModule } from 'src/helpers/database/database/database.module';
import { DatabaseModule } from '../../common/database/database.module';
import { JwtModule } from '@nestjs/jwt';
//import { jwtConfig } from 'jwt.config';
import { HelperService } from 'src/helpers/services/helper.service';
import { IncomingTextService } from './incomingtext.service';


@Module({
  imports: [DatabaseModule,
    JwtModule.register({
      //secret: jwtConfig.secret,
      signOptions: {  },
    })
  
  ],
  controllers: [IncomingtextController],
  providers: [ HelperService, IncomingTextService],
})
export class IncomingTextModule {}
