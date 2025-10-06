/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelperModule } from './helpers/helpers.module';
import { IncomingTextModule } from './modules/incomingtext/incomingtex.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ErrorHandlerService } from './error-handler.service';
// Import the ErrorHandlerService

@Module({
  imports: [
    HelperModule,
    DatabaseModule,
    IncomingTextModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ErrorHandlerService, // Add the ErrorHandlerService to providers
  ],
})
export class AppModule {}
