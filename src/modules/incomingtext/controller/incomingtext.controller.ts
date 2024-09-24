/* eslint-disable prettier/prettier */
import { Controller, Inject, Post, Body, Get, HttpStatus, HttpException, HttpCode, Param, Delete } from '@nestjs/common';

import { ConnectionPool } from 'mssql';

import { IncomingTextService } from '../service/incomingtext.service';
import {  ApiOperation, ApiResponse } from '@nestjs/swagger';

import {  SendMessageDtoooo } from '../dtos/newimagesdtos';

import { CommonDTO } from '../dtos/commonall.dtos';
import { MessageDto } from '../dtos/smartping.dtos';
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
  async handleallRequest(@Body() requestDto: CommonDTO): Promise<any> {
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
  async smartpingsendMessagess(@Body() sendMessageDto: MessageDto): Promise<any> {
      // Log the received message
      try {
        const result = await this.whatsappWebhookService.executeInsertMessage(sendMessageDto);
        return { message: 'Request successfully processed.', result };
      } catch (error) {
        throw new HttpException(
          { message: error.message || 'Failed to process request' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      console.log('Received message:', sendMessageDto);
  
  }
  @Get('templates')
  async getTemplates(): Promise<any> {
    try {
      const templates = await this.whatsappWebhookService.getTemplates();
      return {
        message: 'Request successfully processed.',
        templates,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'An error occurred while processing your request.',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createTemplate(@Body() createTemplateDto: CreateTemplateDto) {
    return this.whatsappWebhookService.createTemplate(createTemplateDto);
  }

  @Post('localcreate')
  @HttpCode(HttpStatus.CREATED)
  async localcreateTemplate(@Body() createTemplateDto: CreateTemplateDto) {
    return this.whatsappWebhookService.localcreateTemplate(createTemplateDto);
  }
  

  
  @Get('/clientlogin/:templatename')
  async findOneBytemplateName(@Param('templatename') templatename: string): Promise<IResponse> {
    const registerData = await this.whatsappWebhookService.findOneBytemplateName(templatename);
    
    if (registerData) {
      return {
        statusCode: 200,
        isSuccess: true,
        message: 'Data fetched successfully',
        data: registerData,
      };
    } else {
      return {
        statusCode: 404,
        isSuccess: false,
        message: 'Template not found',
        data: null,
      };
    }
  }
  

  @Get('countrycode')
  async countrycodeee(): Promise<any> {
    try {
      const templates = await this.whatsappWebhookService.countrycode();
      return templates
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'An error occurred while processing your request.',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  @Get('templatealldata')
  async findtemplatealldata(): Promise<any> {
    try {
      const templates = await this.whatsappWebhookService.findtemplatealldata();
      return templates
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'An error occurred while processing your request.',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Delete('/delclient/:templatename')
  async deletelocaltemp(@Param('templatename') templatename: string): Promise<IResponse> {
    const registerData = await this.whatsappWebhookService.deletedtemp(templatename);
    
    if (registerData) {
      return {
        statusCode: 200,
        isSuccess: true,
        message: 'Data fetched successfully',
        data: registerData,
      };
    } else {
      return {
        statusCode: 404,
        isSuccess: false,
        message: 'Template not found',
        data: null,
      };
    }
  }
}