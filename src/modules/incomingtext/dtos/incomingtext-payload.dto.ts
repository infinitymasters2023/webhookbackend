/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";

/* eslint-disable prettier/prettier */
// export class WebhookPayloadDto {
//   @ApiProperty()
//     messages: {
//       @ApiProperty()
//       id: string;
//       @ApiProperty()
//       from: string;
//       @ApiProperty()
//       type: string;
//       @ApiProperty()
//       timestamp: string;
//       text: {
//         body: string;
//       };
//       message_id: string;
//     }[];
//     contacts: {
//       profile: {
//         name: string;
//       };
//       wa_id: string;
//     }[];
//     brand_msisdn: string;
//     request_id: string;
//   }

export class ProfileDto {
  @ApiProperty()
  name: string;
}
export class ContactDto {
  @ApiProperty({ type: ProfileDto })
  profile: ProfileDto;

  @ApiProperty()
  wa_id: string;
}
export class TextDto {
  @ApiProperty()
  body: string;
}

export class MessageDto {


  @ApiProperty()
  wa_id: number;
  
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: string;

  
  @ApiProperty()
  from: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  message_id: string;

  @ApiProperty()
  brand_msisdn: number;

  @ApiProperty()
  request_id: number;

  @ApiProperty({ type: TextDto })
  text: TextDto;
}



export class WebhookPayloadDto {
  @ApiProperty({ type: [MessageDto] })
  messages: MessageDto[];

  @ApiProperty({ type: [ContactDto] })
  contacts: ContactDto[];

  // @ApiProperty()
  // brand_msisdn: string;

  @ApiProperty()
  request_id: string;
}

export class Image {
  @ApiProperty({
    description: 'Path to the file',
    example: '/usr/local/wamedia/shared/b1cf38-8734-4ad3-b4a1-ef0c10d0d683',
  })
  @IsNotEmpty()
  @IsString()
  file: string;

  @ApiProperty({
    description: 'ID of the image',
    example: 'b1c68f38-8734-4ad3-b4a1-ef0c10d683',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'MIME type of the image',
    example: 'image/jpeg',
  })
  @IsNotEmpty()
  @IsString()
  mime_type: string;

  @ApiProperty({
    description: 'SHA256 hash of the image',
    example: '29ed500fa64eb55fc19dc4124acb300e5dcca301ae99944db',
  })
  @IsNotEmpty()
  @IsString()
  sha256: string;

  @ApiProperty({
    description: 'Caption for the image',
    example: 'Check out my new phone!',
  })
  @IsNotEmpty()
  @IsString()
  caption: string;

  @ApiProperty({
    description: 'URL to access the media',
    example: 'https://apis.rmlconnect.net/wba/v1/media?media_id=fc233119-733f-49c-bcbd-b2f68f798e33&username=demo',
  })
  @IsNotEmpty()
  @IsString()
  media_url: string;
}

class Message {
  @ApiProperty({
    description: 'Sender phone number',
    example: '919941639697',
  })

  @IsString()
  from: string;

  @ApiProperty({
    description: 'ID of the message',
    example: 'ABGGFlA5FpafAgo6tHcNmNjXmuSf',
  })

  @IsString()
  id: string;

  @ApiProperty({
    type: Image,
    description: 'Image details',
  })
  @ValidateNested()
  @Type(() => Image)
  image: Image;

  @ApiProperty({
    description: 'Timestamp of the message',
    example: '1521497954',
  })

  // @IsString()
  // timestamp: string;

  @ApiProperty({
    description: 'Type of the message',
    example: 'image',
  })

  @IsString()
  type: string;
}
export class AuthDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}


/***********************/

export class MediaBodyDto {
  @ApiProperty()
  @IsString()
  text: string;
}
export class MediaButtonDto {
  @ApiProperty()
  @IsString()
  button_no: string;

  @ApiProperty()
  @IsString()
  url: string;
}


export class MediaDto {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  template_name: string;

  @ApiProperty()
  @IsString()
  lang_code: string;

  @ApiProperty({ type: MediaBodyDto })
  @IsObject()
  @ValidateNested()
  @Type(() => MediaBodyDto)
  body: MediaBodyDto | MediaBodyDto[];

  @ApiProperty({ type: [MediaButtonDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaButtonDto)
  button?: MediaButtonDto[];

  constructor(type: string, template_name: string, lang_code: string, body: MediaBodyDto | MediaBodyDto[], button?: MediaButtonDto[]) {
      this.type = type;
      this.template_name = template_name;
      this.lang_code = lang_code;
      this.body = body;
      this.button = button;
  }

}


export class WhatsappDto {
  @ApiProperty()
  @IsString()
  phone: string;

  // @ApiProperty({ type: MediaDto })
  // @ValidateNested()
  // @Type(() => MediaDto)
  // media: MediaDto;
}

export class CreateMessageDto {
  @ApiProperty({
    description: 'API key for authentication',
    example: 'IfgKh@jHkB5%232roUt20nhVgfb!ll*mv12lSt',
  })

  @IsString()
  apiKey: string;

  @ApiProperty({
    type: [Message],
    description: 'Array of messages',
  })
  @ValidateNested({ each: true })
  @Type(() => Message)
  messages: Message[];

  @ApiProperty({
    description: 'Brand MSISDN (phone number)',

  })

  @IsString()
  brand_msisdn: string;

  @ApiProperty({
    description: 'Request ID',

  })

  @IsString()
  request_id: string;
}




