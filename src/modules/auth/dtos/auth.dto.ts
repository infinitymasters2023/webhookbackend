/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty,IsNumber,IsOptional,IsString, MaxLength } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(300)
    password: string;
}
export class SendOTPMultiFactorDto {
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    mobile: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    sendToOtp: string;
}
export class SendpaymentemailDto {
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;
    amount: string; 
    orderId: string;
    plan:string;
    data:string
  
}
export class SendOTPEmailMessageDto {
   

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mobile: string;
}

export class SendOTPEmailMessageDtos {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mobile: string;
}

export class SendOTPonbothDtos {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mobile: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    otp: string;

}

export class LoginByOtpDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    mobile: string;
    
  

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    otp: string;
}

export class newLoginByOtpDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mobile: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;
  

    @ApiProperty()
  
    @IsString()
    otp: string;
}
export class CustomerDataDTO {
 
    @IsString()
    @ApiProperty()
    addressLine1: string;

    @IsString()
    @ApiProperty()
    addressLine2: string;

    @IsString()
    @ApiProperty()
    addressLine3: string;

    @IsString()
    @ApiProperty()
    city: string;

    @IsString()
    @ApiProperty()
    customerName: string;

    @IsString()
    @ApiProperty()
    email: string;

    @IsNumber()
    @ApiProperty()
    devicePrice: number;

    @IsString()
    @ApiProperty()
    planDuration: string;

   

    @IsString()
    @ApiProperty()
    brand: string;

    @IsString()
    @ApiProperty()
    mobile: string;

    @IsString()
    @ApiProperty()
    otp: string;

    @IsString()
    @ApiProperty()
    ORDERID: string;
    
    @IsNumber()
    @ApiProperty()
    pincode: number;

    @IsString()
    @ApiProperty()
    state: string;
}

export class newcustomerlogininfoDTO {
 
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mobile: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    otp: string;


}


export class InsertCustomerCartDto {
    

    Plan: string;
    Price: number;
    ProductSubCatgID: number;
    Status: string;
    brand: string[];
    invoiceamount: number[];
    invoicedate: Date[];
    subcategoryid: number[];
    userEmail: string;
    userMobile: string;
    userid: number;
  }