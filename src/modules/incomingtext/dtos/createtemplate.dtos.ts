/* eslint-disable prettier/prettier */

import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


class ButtonDto {
  @ApiProperty()
  label: string;

  @ApiProperty()
  contact_no?: string;

  @ApiProperty()
  website?: string;

  @ApiProperty()
  type?: string;
}

class ComponentsDto {
  @ApiProperty()
  header: {
 
    type: string;

 
    example: string;
  };

  @ApiProperty()
  body: {
   
    text: string;
  };

  @ApiProperty()
  footer: {
  
    text: string;
  };

  @ApiProperty()
  buttons: {

    type: string;

   
    elements: ButtonDto[];
  };
}

export class CreateTemplateDto {
@ApiProperty()
  template_name: string;

  @ApiProperty()
  language: string[];

  @ApiProperty()
  template_type: string;

  @ApiProperty()
  template_category: string;

  @ApiProperty()
  @Type(() => ComponentsDto)
  components: ComponentsDto;
}
