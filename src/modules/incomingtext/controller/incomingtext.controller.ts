/* eslint-disable prettier/prettier */
import { Controller, Inject, Post, Body, Get, HttpStatus, HttpException, HttpCode, Param, Delete } from '@nestjs/common';

import { ConnectionPool } from 'mssql';

import { IncomingTextService } from '../service/incomingtext.service';
import {  ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import {  SendMessageDtoooo } from '../dtos/newimagesdtos';

import { CommonDTO, SendChatMessageDto } from '../dtos/commonall.dtos';
import { MessageStatusUpdatedDto } from '../dtos/smartping.dtos';
import { CreateTemplateDto } from '../dtos/createtemplate.dtos';
import { IResponse } from 'src/helpers/interfaces/response.interface';


@Controller('incoming')
export class IncomingtextController {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly pool: ConnectionPool,
    private readonly whatsappWebhookService: IncomingTextService,
  ) {}



  @Get('login')
  @ApiOperation({ summary: 'Get authentication token' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved token' })
  async login(): Promise<string> {
    console.log('Login endpoint called');
    const token = await this.whatsappWebhookService.getAuthToken();
    console.log('Retrieved token:', token);
    return token;
  }

  @Post('send')
  @ApiOperation({ summary: 'Send WhatsApp message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })





  @Post('/customsend')
  async sendMessagess(@Body() sendMessageDto: SendMessageDtoooo): Promise<any> {
    console.log('Received message:', sendMessageDto);
    return this.whatsappWebhookService.handlesendmessage(sendMessageDto);
  }
  
  @Post('all')
 
  @ApiResponse({ status: 201, description: 'Request successfully processed.' })
  @ApiResponse({ status: 400, description: 'Invalid request data.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async handlealldRequest(@Body() requestDto: CommonDTO): Promise<any> {
    console.log('Received message payload:', JSON.stringify(requestDto, null, 2));
    try {
      const result = await this.whatsappWebhookService.handleallRequest(requestDto);
      return { message: 'Request successfully processed.', result };
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Failed to process request' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

@Post('smartping')
@ApiResponse({ status: 201, description: 'Request successfully processed.' })
@ApiResponse({ status: 400, description: 'Invalid request data.' })
@ApiResponse({ status: 500, description: 'Internal server error.' })
async smartpingsendMessagess(@Body() sendMessageDto: MessageStatusUpdatedDto): Promise<any> {
  console.log('📩 [Incoming Webhook] Received payload:', JSON.stringify(sendMessageDto, null, 2));

  try {
    const result = await this.whatsappWebhookService.executeInsertMessage(sendMessageDto);
    console.log('✅ [Webhook Processed] Database insert result:', result);

    return { message: 'Request successfully processed.', result };
  } catch (error) {
    console.error('❌ [Webhook Error] Failed to process message:', error.message);
    throw new HttpException(
      { message: error.message || 'Failed to process request' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
  @Post('smartping-send')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send a chat message via AiSensy' })
  @ApiResponse({ status: 200, description: 'Message sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async sendMessage(@Body() sendChatMessageDto: SendChatMessageDto) {
    return await this.whatsappWebhookService.sendChatMessage(sendChatMessageDto);
  }
@Get('message/:projectId/:messageId')
  @ApiOperation({ summary: 'Get details of a chat message via AiSensy' })
  @ApiParam({ name: 'projectId', description: 'AiSensy Project ID' })
  @ApiParam({ name: 'messageId', description: 'AiSensy Message ID' })
  @ApiResponse({ status: 200, description: 'Message details retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getMessage(
    @Param('projectId') projectId: string,
    @Param('messageId') messageId: string,
  ) {
    if (!projectId || !messageId) {
      throw new HttpException('ProjectId and MessageId are required', HttpStatus.BAD_REQUEST);
    }

    return this.whatsappWebhookService.getMessageDetails(projectId, messageId);
  }
}