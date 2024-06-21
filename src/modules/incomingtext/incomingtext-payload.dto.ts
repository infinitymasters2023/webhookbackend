/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

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
  id: string;

  @ApiProperty()
  from: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  message_id: string;

  @ApiProperty({ type: TextDto })
  text: TextDto;
}



export class WebhookPayloadDto {
  @ApiProperty({ type: [MessageDto] })
  messages: MessageDto[];

  @ApiProperty({ type: [ContactDto] })
  contacts: ContactDto[];

  @ApiProperty()
  brand_msisdn: string;

  @ApiProperty()
  request_id: string;
}






