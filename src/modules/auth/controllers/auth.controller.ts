/* eslint-disable prettier/prettier */
import {  BadRequestException, Body, Controller,Get,NotFoundException, Param, Post } from '@nestjs/common';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { HelperService } from 'src/helpers/services/helper.service';
import { STATUS_CODE } from 'src/helpers/constants/status-code.constant';
import { CustomerDataDTO, InsertCustomerCartDto, LoginByOtpDto, LoginDto, SendOTPMultiFactorDto,
  newcustomerlogininfoDTO, SendpaymentemailDto,SendOTPEmailMessageDtos } from '../dtos/auth.dto';
import { SendOTPEmailMessageDto } from 'src/helpers/dtos/sendotp.email.textmsg.dto';

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(private readonly authservice : AuthService ,private helperService: HelperService ) {}


//  @Post('/auth/retailerLogin')
//   async retailerLogin(@Body() loginDto: LoginDto): Promise<IResponse> {
//     const { username, password } = loginDto 
//     const user = await this.authservice.findOneByUserName(username);
//     if (!user) {
//       throw new NotFoundException({
//         statusCode: STATUS_CODE.USER_NOT_FOUND_ERROR,
//         message: 'user.error.notFound',
//       });
//     }
//     console.log('user', user);
    
//     const validate: boolean = await this.authservice.validateUser(
//       password,
//       user.Password
//     );
//     if (!validate) {
//       throw new BadRequestException({
//         statusCode:
//           STATUS_CODE.USER_PASSWORD_NOT_MATCH_ERROR,
//         message: 'user.error.passwordNotMatch',
//       });
//     }
    
//     const { Password, ...userInfo } = user

//     const accessToken: string = await this.authservice.generateToken(
//       userInfo
//     );
//     const oData = { accessToken: accessToken, ...userInfo }
//     return {
//       statusCode: 200,
//       isSuccess: true,
//       message: 'Data fetched successfully',
//       data: { ...userInfo, accessToken: accessToken },
//     }
//   }

  // @Get('/clientlogin/:id')
  // async clientlogin(@Param('id') id: string): Promise<IResponse> {
  //   const ragisterData = await this.authservice.clientlogin(id);
  //   return {
  //     statusCode: 200,
  //     isSuccess: true,
  //     message: 'Data fatched successfully',
  //     data: ragisterData,
  //   }
  // }

  // @Get('/userclientinfo/:id')
  // async userlogin(@Param('id') id: string): Promise<IResponse> {
  //   const ragisterData = await this.authservice.userclientlogin(id);
  //   return {
  //     statusCode: 200,
  //     isSuccess: true,
  //     message: 'Data fatched successfully',
  //     data: ragisterData,
  //   }
  // }
  // @Get('/addresslogin/:id')
  // async addresslogin(@Param('id') id: string): Promise<IResponse> {
  //   const ragisterData = await this.authservice.addresslogin(id);
  //   return {
  //     statusCode: 200,
  //     isSuccess: true,
  //     message: 'Data fatched successfully',
  //     data: ragisterData,
  //   }
  // }
  // @Post('send-otp-multifactor')
  // async sendOtpMultiFactor(@Body() sendEmailDto: SendOTPMultiFactorDto): Promise<IResponse> {
  //   const { email, mobile } = sendEmailDto;
  //   const otp = await this.helperService.generateRandomNumber()
  //   const user = await this.authservice.findOneByUser(sendEmailDto);
  //   const accessToken: string = await this.authservice.generateToken(
  //     user
  //   );
  //   let sendmessage
  //   if (sendEmailDto.sendToOtp === 'Mobile') {
  //     const message = `Welcome to Infinity, Your OTP to Login to Infinity TechCare Lounge is ${otp}. For Help, Call Infinity 8447882424. 9AM-6PM Mon-Sat`;
  //     sendmessage = await this.helperService.sendSms(mobile, message, '1107162426891569578')
  //   }
  //   if (sendEmailDto.sendToOtp === 'Email') {
  //     const template = `Dear Customer </br> Your OTP is : ${otp}`;
  //     const data = { name: 'Customer' };
  //     const subject = 'Welcome to Infinity Assurance - Your OTP is here';
  //     sendmessage = await this.helperService.sendEmail(template, data, email, subject)
  //   }
  //   return {
  //     statusCode: 200,
  //     isSuccess: (sendmessage) ? true : false,
  //     message: 'Data fetched successfully',
  //     data: { ...user, otp: otp, accessToken: accessToken },
  //   }
  // }

  // @Post('send-email-payment-confirmation')
  // async sendemailMultiFactor(@Body() sendpaymentemailDto: SendpaymentemailDto): Promise<IResponse> {
  //     const { email, amount, orderId ,plan} = sendpaymentemailDto;
  
  //     // Dynamic values
  //     const amountText = `Rs. ${amount}`;
  //     const orderIdText = `${orderId}`;

      
      

  
  //     const template = 
  //     `<html>
  //     <body>
  //     Dear Customer,<br/>
  //     Congratulations for choosing InfyShield, the most reliable and customer-friendly${plan} service.<br/>
  //      We thankfully acknowledge the receipt of your payment of<b> ${amountText} </b>.<br/>
  //      <br/>
  //     In case you have not yet registered your product with us yet, please visit our website <a href="https://www.infyshield.com">www.infyshield.com</a> and provide your contact details and the details of the product.<br/>
  //     <br/>
  //     Please Register Yourself on <a href="https://infyshieldtest.infyshield.com/">www.infyshield2c.com</a>,with Your
  //     mobileno
  //     <br/>
      
  //   <br/>
  //     Kindly note that you will also be required to upload the copy of the invoice of your product for which you have purchased InfyShield Service Plan. 
  //     Once the details are submitted, we will carry out the approval process and keep you informed via your Registered email with us.<br/>
  //     For any query, please feel free to contact us on email <a href="mailto:register@infyshield.com">register@infyshield.com</a> or call us on phone number 1800 10 28540 (between 9.30 a.m. to 5.30 p.m. on all working days Monday to Saturday).<br/>
  //     Thanking you,<br/>
  //     Team InfyShield<br/>
  //     <a href="https://www.infyshield.com">www.infyshield.com</a>`
      
  //     const data = { name: 'Customer' };
  //     const subject = 'Payment Confirmation and InfyShield Registration Details - Infinity Assurance';
  //     const sendmessage = await this.helperService.sendEmail(template, data, email, subject);
  
  //     return {
  //         statusCode: 200,
  //         isSuccess: !sendmessage,
  //         message: 'Payment confirmation email sent successfully',
  //         data: { data: sendpaymentemailDto },
  //     };
  // }
  // @Post('/loginwithotp')
  // async loginWithOtp(@Body() loginDto: LoginByOtpDto): Promise<IResponse> {
  //   const { mobile, otp  } = loginDto
  //   const user = await this.authservice.findOneMobileNo(mobile);
  //   if (!user) {
  //     throw new NotFoundException({
  //       statusCode: STATUS_CODE.USER_NOT_FOUND_ERROR,
  //       message: 'user.error.notFound',
  //     });
  //   }
  //   console.log('user', user);
    
  //   const validate: boolean = await this.authservice.validateUser(
  //     otp,
  //     user.otp
  //   );
  //   if (!validate) {
  //     throw new BadRequestException({
  //       statusCode:
  //         STATUS_CODE.USER_PASSWORD_NOT_MATCH_ERROR,
  //       message: 'user.error.passwordNotMatch',
  //     });
  //   }
    
  //   const { Password1, ...userInfo } = user

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
  private otpStore: { [key: string]: string } = {};
  @Post('send-employee-txtmsg')
async sendEmployeeTxtMsg(@Body() sendEmailDto: SendOTPEmailMessageDto): Promise<IResponse> {
    const { mobile } = sendEmailDto;
    const otp = await this.helperService.generateRandomNumber();
    const inputString = otp.toString();
    const lastasterisk = await this.helperService.getLastSixDigits(inputString);
    await this.authservice.newupdateOtponBoth({mobile : mobile, otp : otp.toString()});
    // Store OTP in temporary storage
    this.otpStore[mobile] = otp.toString();

    // Send OTP via SMS
    const message = `Welcome to Infinity, Your OTP to Login to Infinity TechCare Lounge is ${lastasterisk}. For Help, Call Infinity 8447882424. 9AM-6PM Mon-Sat`;
    await this.helperService.sendSms(mobile, message, '1107162426891569578');

    return {
        statusCode: 200,
        isSuccess: true,
        message: 'OTP sent successfully',
        data: [],
    };
}

@Post('/newloginhotpboth')
async newupdateeeOtponBoth(@Body() newcustomerlogininfoDTO: newcustomerlogininfoDTO): Promise<IResponse> {
    try {
        const { otp, mobile } = newcustomerlogininfoDTO;
        console.log('otp:', otp);
        console.log('mobile:', mobile);

        // Retrieve OTP from temporary storage
        const storedOtp = this.otpStore[mobile];

        // Check if OTP matches
        if (!storedOtp || storedOtp !== otp) {
            return {
                statusCode: 400,
                isSuccess: false,
                message: 'Invalid OTP',
                data: null,
            };
        }

        // Call the authservice method to fetch user data
        const user = await this.authservice.updateUserOtpByMobile(newcustomerlogininfoDTO);
        
        // You can choose to skip the user check entirely:
        // const user = null; // Uncomment this line if you want to simulate no user found

        // Proceed to generate token regardless of user status
        const mid: number = Math.floor(Math.random() * 900) + 100;
        const accessToken: string = await this.authservice.generateToken({ mobile });

        // Prepare response data
        const role = mobile === '9999914451' ? 'admin' : 'user'; // Set role based on mobile

        const responseData = {
            mobile,
            mid: mid,
            accessToken: accessToken,
            role: role, // Include role in response
        };

        // Optionally clear the stored OTP after use
        delete this.otpStore[mobile];

        return {
            statusCode: 200,
            isSuccess: true,
            message: 'Data fetched successfully',
            data: responseData,
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {
            statusCode: 500,
            isSuccess: false,
            message: 'Internal server error',
            data: null,
        };
    }
}


  
  

  // @Post('send-email-txtmsg')
  // async sendEmailTxtMsg(@Body() sendEmailDto: SendOTPEmailMessageDto): Promise<IResponse> {
  //   const { mobile } = sendEmailDto;
  //   const otp = await this.helperService.generateRandomNumber();
  //   const inputString = otp.toString();
  //   const lastasterisk = await this.helperService.getLastSixDigits(inputString);
  //   await this.authservice.updateOtpByMobile({mobile : mobile, otp : otp.toString()});
    
  //   // Send OTP via SMS
  //   const message = `Welcome to Infinity, Your OTP to Login to Infinity TechCare Lounge is ${lastasterisk}. For Help, Call Infinity 8447882424. 9AM-6PM Mon-Sat`;
  //   await this.helperService.sendSms(mobile, message, '1107162426891569578');
  
  //   return {
  //     statusCode: 200,
  //     isSuccess: true,
  //     message: 'OTP sent successfully',
  //     data: { otp: otp },
  //   };
  // }

 

  // @Post('newsend-email-txtmsg')
  // async sendEmailTxtnewMsg(@Body() sendEmailDto: SendOTPEmailMessageDto): Promise<IResponse> {
  //   const { mobile } = sendEmailDto;
  //   const otp = await this.helperService.generateRandomNumber();
  //   const inputString = otp.toString();
  //   const lastasterisk = await this.helperService.getLastSixDigits(inputString);
  //    await this.authservice.newupdateOtpByMobile({mobile : mobile, otp : otp.toString()});
  //   ``
  //   // Send OTP via SMS
  //   const message = `Welcome to Infinity, Your OTP to Login to Infinity TechCare Lounge is ${lastasterisk}. For Help, Call Infinity 8447882424. 9AM-6PM Mon-Sat`;
  //   await this.helperService.sendSms(mobile, message, '1107162426891569578');
  
  //   return {
  //     statusCode: 200,
  //     isSuccess: true,
  //     message: 'OTP sent successfully',
  //     data: { otp: otp },
  //   };
  // }
  
  // @Post('paymentconfirm-email-txtmsg')
  // async paymentconfimation(@Body() sendEmailDto: SendOTPEmailMessageDto): Promise<IResponse> {
  //   const { mobile } = sendEmailDto;
  //   const otp = 'thankyou'
  //   const inputString = otp.toString();
  //   const lastasterisk = await this.helperService.getLastSixDigits(inputString);
  //   await this.authservice.updateOtpByMobile({mobile : mobile, otp : otp.toString()});
    
  //   // Send OTP via SMS
  //   const message = `Welcome to Infinity, Your OTP to Login to Infinity TechCare Lounge is . For Help, Call Infinity 8447882424. 9AM-6PM Mon-Sat`;
  //   await this.helperService.sendSms(mobile, message, '1107162426891569578');
  
  //   return {
  //     statusCode: 200,
  //     isSuccess: true,
  //     message: 'OTP sent successfully',
  //     data: { otp: otp },
  //   };
  // }

  // @Post('bothsend-email-txtmsg')
  // async bothsendEmailTxtMsg(@Body() sendEmailDto: SendOTPEmailMessageDtos): Promise<IResponse> {
  //   const { email, mobile } = sendEmailDto;
  //   const otp = await this.helperService.generateRandomNumber()
  //   const inputString = otp.toString()
  //   const asterisks = '*'.repeat(3);
  //   const replacedString = asterisks + inputString.substring(3);
  //   const lastasterisk = await this.helperService.replaceLastThreeWithAsteriskss(inputString)
  //   await this.authservice.updateOtponboth({
  //     mobile: mobile, otp: otp.toString(),
  //     email: email
  //   });
  //   const template = `Dear Customer </br> Your OTP is : ${replacedString}`;
  //   const data = { name: 'Customer' };
  //   const subject = 'Welcome to Infinity Assurance - Your OTP is here';
  //   const message = `Welcome to Infinity, Your OTP to Login to Infinity TechCare Lounge is ${lastasterisk}. For Help, Call Infinity 8447882424. 9AM-6PM Mon-Sat`;
  //   const [sendemail, sendmessage] = await Promise.all([
  //     this.helperService.sendEmail(template, data, email, subject),
  //     this.helperService.sendSms(mobile, message, '1107162426891569578'),
  //   ]);
  //   return {
  //     statusCode: 200,
  //     isSuccess: true,
  //     message: 'Data fetched successfully',
  //     data: { otp: otp },
  //   }
  // }
/***********otp hidden  ****************************************/
  //  @Post('bothsend-email-txtmsg')
  //  async bothsendEmailTxtMsg(@Body() sendEmailDto: SendOTPEmailMessageDtos): Promise<IResponse> {
  //   const { email, mobile } = sendEmailDto;
  //   const otp = await this.helperService.generateRandomNumber();
  //   const inputString = otp.toString();
  //   const asterisks = '*'.repeat(3);
  //   const replacedString = asterisks + inputString.substring(3);
  //   const lastasterisk = await this.helperService.replaceLastThreeWithAsteriskss(inputString);
  
  //   await this.authservice.updateOtponboth({
  //     mobile: mobile,
  //     otp: otp.toString(),
  //     email: email
  //   });
  
  //   const template = `Dear Customer </br> Your OTP is : ${replacedString}`;
  //   const data = { name: 'Customer' };
  //   const subject = 'Welcome to Infinity Assurance - Your OTP is here';
  //   const message = `Welcome to Infinity, Your OTP to Login to Infinity TechCare Lounge is ${lastasterisk}. For Help, Call Infinity 8447882424. 9AM-6PM Mon-Sat`;
  
  //   const [sendemail, sendmessage] = await Promise.all([
  //     this.helperService.sendEmail(template, data, email, subject),
  //     this.helperService.sendSms(mobile, message, '1107162426891569578'),
  //   ]);
  
  //   const response: IResponse = {
  //     statusCode: 200,
  //     isSuccess: true,
  //     message: 'Data fetched successfully',
  //     data: {}
  //   };
  
  //   // Add OTP to the response object but make it non-enumerable
  //   Object.defineProperty(response.data, 'otp', {
  //     value: otp,
  //     enumerable: false, // This makes it non-enumerable, so it won't show up in JSON.stringify
  //   });
  
  //   return response;
  // }
  
  
  
  // @Post('mulsend-otp-multifactor')
  // async sendpaymentconfirm(@Body() sendEmailDto: SendOTPMultiFactorDto): Promise<IResponse> {
  //   const { email, mobile } = sendEmailDto;
  //   const otp = await this.helperService.generateRandomNumber()
  //   const user = await this.authservice.findOneByUser(sendEmailDto);
  //   const accessToken: string = await this.authservice.generateToken(user);
  
  //   const message = `ThankYou for Payment, Your OTP to Login to Infinity TechCare Lounge is . For Help, Call Infinity 8447882424. 9AM-6PM Mon-Sat`;
  //   const template = `ThankYou for Payment : `;
  //   const data = { name: 'Customer' };
  //   const subject = 'Welcome to Infinity Assurance - Your OTP is here';
  
  //   const sendEmailPromise = this.helperService.sendEmail(template, data, email, subject);
  //   const sendSmsPromise = this.helperService.sendSms(mobile, message, '1107162426891569578');
  
  //   // Execute both sending operations concurrently
  //   await Promise.all([sendEmailPromise, sendSmsPromise]);
  
  //   return {
  //     statusCode: 200,
  //     isSuccess: true, // If Promise.all() doesn't throw an error, consider it successful
  //     message: 'Data fetched successfully',
  //     data: { ...user, otp: otp, accessToken: accessToken },
  //   };
  // }
  



  // @Post('/employeeloginwithotp')
  // async loginemployeeWithOtp(@Body() loginDto: LoginByOtpDto): Promise<IResponse> {
  //   const { mobile, otp  } = loginDto
  //   const user = await this.authservice.findUserMobileNo(mobile);
  //   if (!user) {
  //     throw new NotFoundException({
  //       statusCode: STATUS_CODE.USER_NOT_FOUND_ERROR,
  //       message: 'user.error.notFound',
  //     });
  //   }
  //   console.log('user', user);
    
  //   const validate: boolean = await this.authservice.validateUser(
  //     otp,
  //     user.otp
  //   );
  //   // if (!validate) {
  //   //   throw new BadRequestException({
  //   //     statusCode:
  //   //       STATUS_CODE.USER_PASSWORD_NOT_MATCH_ERROR,
  //   //     message: 'user.error.passwordNotMatch',
  //   //   });
  //   // }
    
  //   const { Password1, ...userInfo } = user

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

  // @Post('send-email-txtmsg')
  // async sendTxtnewMsg(@Body() sendEmailDto: SendOTPEmailMessageDto): Promise<IResponse> {
  //   const { mobile } = sendEmailDto;
  //   const otp = await this.helperService.generateRandomNumber();
  //   const inputString = otp.toString();
  //   const lastasterisk = await this.helperService.getLastSixDigits(inputString);
  //    await this.authservice.newupdateOtpByMobile({mobile : mobile, otp : otp.toString()});
    
  //   // Send OTP via SMS
  //   const message = `Welcome to Infinity, Your OTP to Login to Infinity TechCare Lounge is ${lastasterisk}. For Help, Call Infinity 8447882424. 9AM-6PM Mon-Sat`;
  //   await this.helperService.sendSms(mobile, message, '1107162426891569578');
  
  //   return {
  //     statusCode: 200,
  //     isSuccess: true,
  //     message: 'OTP sent successfully',
  //     data: { otp: otp },
  //   };
  // }
  // @Post('/newloginwithotp')
  // // async findNewOneMobileNo(@Body() customerDataDTO: CustomerDataDTO): Promise<IResponse> {
  // //   const { mobile, otp  } = customerDataDTO;
  // //   const user = await this.authservice.findNewOneMobileNo(customerDataDTO);
    
  // //   const validate: boolean = await this.authservice.validateUser(
  // //     otp,
  // //     user.otp
  // //   );
  
  // //   // Generate a random 3-digit mid
  // //   const mid: number = Math.floor(Math.random() * 900) + 100;
  
  // //   const { Password1, ...userInfo } = user;
  
  // //   const accessToken: string = await this.authservice.generateToken(
  // //     userInfo
  // //   );
  
  
  // //   // Include mid in the returned data object
  // //   const responseData = {
  // //     ...userInfo,
  // //     mid: mid,
  // //     accessToken: accessToken,
  // //   };
  
  // //   return {
  // //     statusCode: 200,
  // //     isSuccess: true,
  // //     message: 'Data fetched successfully',
  // //     data: responseData,
  // //   };
  // // }

// In AuthController



// @Post('/updatecustomercartdata')
// async newcustomerdataupdate(@Body() customerDataDTO : CustomerDataDTO ): Promise<IResponse> {
  
//   const newupdatedata=await this.authservice.newcustomerdataupdate(customerDataDTO)
  
//   return {
//     statusCode: 200,
//     isSuccess: true,
//     message: 'Data Inserted successfully',
//     data: newupdatedata,
//   }
// }

      
  
 
  // @Post('/newloginwithotp')
  // async newcustomerlogin(@Body() newcustomerlogininfoDTO: newcustomerlogininfoDTO): Promise<IResponse> {
  //   const { mobile, otp  } = newcustomerlogininfoDTO;
  //   const user = await this.authservice.newcustomerlogin(newcustomerlogininfoDTO);
    
  //   const validate: boolean = await this.authservice.validateUser(
  //     otp,
  //     user.otp
  //   );
  
  //   // Generate a random 3-digit mid
  //   const mid: number = Math.floor(Math.random() * 900) + 100;
  
  //   const {  ...userInfo } = user;
  
  //   const accessToken: string = await this.authservice.generateToken(
  //     userInfo
  //   );
  
  //   // Include mid in the returned data object
  //   const responseData = {
  //     ...userInfo,
  //     mid: mid,
  //     accessToken: accessToken,
  //   };
  
  //   return {
  //     statusCode: 200,
  //     isSuccess: true,
  //     message: 'Data fetched successfully',
  //     data: responseData,
  //   };
  // }

  // @Post('customercartdata')
  // async insertCustomerCartDto(@Body() insertCustomerCartDto : InsertCustomerCartDto ): Promise<IResponse> {
  //   try {
  //     return await this.authservice.insertCustomerCartDto(insertCustomerCartDto)
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // }





  // async findNewOneMobileNo(@Body() customerDataDTO: CustomerDataDTO): Promise<IResponse> {
  //   const { mobile, otp  } = customerDataDTO
  //   const user = await this.authservice.findNewOneMobileNo(customerDataDTO);
    
    
  //   const validate: boolean = await this.authservice.validateUser(
  //     otp,
  //     user.otp
  //   );
  
    
  //   const { Password1, ...userInfo } = user

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

}