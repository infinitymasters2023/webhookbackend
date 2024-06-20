
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsString,
} from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ description: 'The message content' })
  @IsString()
  message: string;
  
  }

// export class CityListArrayDto {
//     @ApiProperty()
//     @IsArray()
//     @ArrayMinSize(1)
//     cities: string[];
// }

