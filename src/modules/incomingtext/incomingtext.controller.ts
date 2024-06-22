import { Controller,Inject, Post, Body } from '@nestjs/common';
import { WebhookPayloadDto } from './incomingtext-payload.dto';
import { ConnectionPool, Request } from 'mssql';
import { IncomingResponse } from './incomingtext.response.interface';
import { IncomingTextService } from './incomingtext.service';


@Controller('incomingtext')
export class IncomingtextController {

  constructor(@Inject('DATABASE_CONNECTION') 
  private readonly pool: ConnectionPool, 
  private readonly whatsappWebhookService: IncomingTextService) 
  {}
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
  async handleWebhook(@Body() payload: WebhookPayloadDto): Promise<IncomingResponse> {
    if (payload.messages && payload.messages.length > 0) {
      const firstMessage = payload.messages[0];
      console.log('Received message:', firstMessage.text.body);

      // Save the message using the service
      await this.whatsappWebhookService.handleWebhook(firstMessage);

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