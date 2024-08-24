/* eslint-disable prettier/prettier */
import { Controller, Inject, Post, Body, Get, HttpStatus, HttpException } from '@nestjs/common';

import { ConnectionPool } from 'mssql';

import { IncomingTextService } from '../service/incomingtext.service';
import {  ApiOperation, ApiResponse } from '@nestjs/swagger';

import {  SendMessageDtoooo } from '../dtos/newimagesdtos';

import { CommonDTO } from '../dtos/commonall.dtos';

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
  async handleallRequest(@Body() requestDto: CommonDTO): Promise<any> {
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
}
