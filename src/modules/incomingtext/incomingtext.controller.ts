/* eslint-disable prettier/prettier */
import { Controller,Inject, Post, Body } from '@nestjs/common';
import { WebhookPayloadDto } from './incomingtext-payload.dto';
import { ConnectionPool, Request } from 'mssql';

interface WebhookResponse {
  messageBody: string | null;
  from: string | null;
}

@Controller('incomingtext')
export class WebhookController {

  constructor(@Inject('DATABASE_CONNECTION') private readonly pool: ConnectionPool) {}
  // async executeStoredProcedure(type: string, params: any = {}): Promise<any> {
  
  //   try {
  //     const poolConnection = await this.pool.connect();
  //     const request = new Request(poolConnection);
  //     request.input('type', type);
  //     Object.keys(params).forEach(key => {
  //       request.input(key, params[key]);
  //     });
  //     const result = await request.execute('sp_iapl_gettextmessage');
     
  //     return result.recordset;
  //   } catch (error) {
  //     throw error;
  //   }
  // }




  @Post()
  handleWebhook(@Body() payload: WebhookPayloadDto): WebhookResponse {
    if (payload.messages && payload.messages.length > 0) {
      const firstMessage = payload.messages[0];
      console.log('Received message:', firstMessage.text.body);
      return {
        messageBody: firstMessage.text.body,
        from: firstMessage.from
      };
    }

    
    return {
      messageBody: null,
      from: null
    };
  }
}
