/* eslint-disable prettier/prettier */
// src/whatsapp-webhook/whatsapp-webhook.service.ts
import { Inject, Injectable } from '@nestjs/common';

import { ConnectionPool, Request } from 'mssql';
import { MessageDto } from './incomingtext-payload.dto';

@Injectable()
export class WhatsappWebhookService {
    constructor(
        @Inject('DATABASE_CONNECTION') private readonly pool: ConnectionPool,
        
    ) { }

  async handleWebhook(messageDto:MessageDto): Promise<any> {
    try {
        const poolConnection = await this.pool.connect();
        const request = new Request(poolConnection);
        request.input('Type',1);
        request.input(' id', '545645');
        request.input('from_contact', messageDto.from);
        request.input(' message_id', messageDto.message_id);
        request.input('  body', messageDto.text);
        request.input(' timestamp', messageDto.timestamp);
        request.input(' type', messageDto.type);
       
        const result = await request.execute('InsertWebhookData');
        const insertedData = result.recordsets[0];   
        return insertedData;
    } catch (error) {
        console.log('error', error);
        throw error;
    } finally {
        if (this.pool.connected) {
            await this.pool.close();
        }
    }
}
}
