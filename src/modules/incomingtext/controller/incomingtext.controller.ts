/* eslint-disable prettier/prettier */
import { Controller,Inject, Post, Body, BadRequestException ,Get} from '@nestjs/common';
import { AuthDto, CreateMessageDto, WebhookPayloadDto, WhatsappDto } from '../dtos/incomingtext-payload.dto';
import { ConnectionPool } from 'mssql';
import { IncomingResponse } from '../dtos/incomingtext.response.interface';
import { IncomingTextService } from '../service/incomingtext.service';
import { IResponse } from 'src/helpers/interfaces/response.interface';
import { LoginDto } from 'src/modules/auth/dtos/auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('incoming')
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




  @Post('/text')
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

  // @Post('/auth/retailerLogin')
  // async retailerLogin(@Body() loginDto: LoginDto): Promise<IResponse> {
  //   const { username, password } = loginDto 
  //   //const user = await this.whatsappWebhookService.findOneByUserName(username);
  //   // if (!user) {
  //   //   throw new NotFoundException({
  //   //     statusCode: STATUS_CODE.USER_NOT_FOUND_ERROR,
  //   //     message: 'user.error.notFound',
  //   //   });
  //   // }
  //  // console.log('user', user);
    
  //   const validate: boolean = await this.whatsappWebhookService.validateUser(
  //     password,
  //     user.Password
  //   );
  //   if (!validate) {
  //     throw new BadRequestException({
  //       statusCode:
  //         STATUS_CODE.USER_PASSWORD_NOT_MATCH_ERROR,
  //       message: 'user.error.passwordNotMatch',
  //     });
  //   }
    
  //   const { Password, ...userInfo } = user

  //   const accessToken: string = await this.authservice.generateToken(
  //     userInfo
  //   );
  //   const oData = { accessToken: accessToken, ...userInfo }
  //   return {
  //     statusCode: 200,
  //     isSuccess: true,
  //     message: 'Data fetched successfully',
  //     data: { ...userInfo, accessToken: accessToken },
  //   }
  // }

  @Get('login')
  @ApiOperation({ summary: 'Get authentication token' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved token' })
  async login(): Promise<string> {
    return this.whatsappWebhookService.getAuthToken();
  }

  @Post('send')
  @ApiOperation({ summary: 'Send WhatsApp message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  // async sendMessage(@Body() whatsappDto: WhatsappDto): Promise<any> {
  //   return this.whatsappWebhookService.sendWhatsappMessage(whatsappDto);
  // }
  @Post('/image')
  create(@Body() createMessageDto: CreateMessageDto) {

    
    // Handle the incoming request here
    console.log(createMessageDto);
    return { status: 'success', data: createMessageDto };
  }
}