import { Inject, Injectable } from '@nestjs/common';
import { ConnectionPool, Request } from 'mssql';
import { MessageDto } from './incomingtext-payload.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class IncomingTextService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly pool: ConnectionPool) {}

  async handleWebhook(messageDto: MessageDto): Promise<any> {
    try {
      const poolConnection = await this.pool.connect();
      const request = new Request(poolConnection);
      request.input('Type', 1); // Assuming Type is fixed to 1
      request.input('id', uuidv4()); // Generate a unique ID
      //request.input('type', messageDto.type);
      request.input('from', messageDto.from);
      request.input('message_id', messageDto.message_id);
      request.input('body', messageDto.text.body);
      request.input('timestamp', messageDto.timestamp);
     
      request.input('brand_msisdn', messageDto.brand_msisdn);
      request.input('request_id', messageDto.request_id);

      
      request.input('name', messageDto.name);
      request.input('wa_id', messageDto.wa_id);

      const result = await request.execute('InsertWebhookData');
      const insertedData = result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
      return insertedData;
    } catch (error) {
      console.log('Error inserting webhook data:', error);
      throw error;
    } finally {
      if (this.pool.connected) {
        await this.pool.close();
      }
    }
  }
}
