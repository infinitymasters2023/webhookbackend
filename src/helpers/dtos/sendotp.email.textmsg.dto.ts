
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsString,
    IsArray,
    ValidateNested,
    ArrayMinSize,
    IsNumber,
    IsOptional,
    IsEmail,
    IsNotEmpty
} from 'class-validator';
import { extend } from 'joi';

export class SendOTPEmailMessageDto {
  

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mobile: string;
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

export class sendMeetingLinkDto extends SendOTPMultiFactorDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    meetingId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ticket: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    meetingurl: string;
}