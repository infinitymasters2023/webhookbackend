/* eslint-disable prettier/prettier */
// error-handler.service.ts
import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class ErrorHandlerService {
  handleConnectionError(error: any) {
    if (error.code === 'ENOTOPEN') {
      console.error('ConnectionError: Connection not yet open. Restarting the application...');
      this.restartApplication();
    }
  }

  private restartApplication() {
    exec('npm run start:dev', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error restarting application: ${stderr}`);
        return;
      }
      console.log(stdout);
    });
  }
}
