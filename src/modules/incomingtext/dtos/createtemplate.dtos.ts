/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// // /* eslint-disable prettier/prettier */

// // import { Type } from 'class-transformer';
// // import { ApiProperty } from '@nestjs/swagger';


// // class ButtonDto {
// //   @ApiProperty()
// //   label: string;

// //   @ApiProperty()
// //   contact_no?: string;

// //   @ApiProperty()
// //   website?: string;

// //   @ApiProperty()
// //   type?: string;
// // }

// // class ComponentsDto {
// //   @ApiProperty()
// //   header: {
 
// //     type: string;

 
// //     example: string;
// //   };

// //   @ApiProperty()
// //   body: {
   
// //     text: string;

// //   };

// //   @ApiProperty()
// //   footer: {
  
// //     text: string;
// //   };

// //   @ApiProperty()
// //   buttons: {

// //     type: string;

   
// //     elements: ButtonDto[];
// //   };
// // }

// // export class CreateTemplateDto {
// // @ApiProperty()
// //   template_name: string;

// //   @ApiProperty()
// //   language: string[];

// //   @ApiProperty()
// //   template_type: string;

// //   @ApiProperty()
// //   template_category: string;

// //   @ApiProperty()
// //   @Type(() => ComponentsDto)
// //   components: ComponentsDto;
// // }
// import { Type } from 'class-transformer';
// import { ApiProperty } from '@nestjs/swagger';

// export class ButtonElementDto {
//   @ApiProperty({ example: 'CALL NOW' })

//   label: string;

//   @ApiProperty({ example: '+919582293150', required: false })
 
//   contact_no?: string;

//   @ApiProperty({ example: 'http://localhost:5099/incoming/create', required: false })

//   website?: string;

//   @ApiProperty({ example: 'static', required: false })
 
//   type?: string;
// }

// class ComponentsDto {
//   @ApiProperty()
//   @Type(() => Object)
//   header: {
//     text: any;
//     type: string;
//     example: string;
//   };

//   @ApiProperty()
//   @Type(() => Object)
//   body: {
//     text: string;
//     example: string[];

//   };

//   @ApiProperty()
//   @Type(() => Object)
//   footer: {
//     text: string;
//   };

//   @ApiProperty()
//   @Type(() => Object)
//   buttons: {
//     type: string;
//     elements: ButtonDto[];
//   };
// }

// export class CreateTemplateDto {
//   @ApiProperty()
//   template_name: string;

//   @ApiProperty({ type: [String] })
//   language: string[];

//   @ApiProperty()
//   template_type: string;

//   @ApiProperty()
//   template_category: string;

//   @ApiProperty()
//   @Type(() => ComponentsDto)
//   components: ComponentsDto;
// }
/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ButtonElementDto {
  @ApiProperty({ example: 'CALL NOW' })
  label: string;

  @ApiProperty({ example: '+919582293150', required: false })
  contact_no?: string;

  @ApiProperty({ example: 'http://localhost:5099/incoming/create', required: false })
  website?: string;

  @ApiProperty({ example: 'static', required: false })
  type?: string;
}

class ComponentsDto {
  @ApiProperty()
  @Type(() => Object)
  header: {
    text: any;
    type: string;
    example: string;
  };

  @ApiProperty()
  @Type(() => Object)
  body: {
    text: string;
    example: string[];
  };

  @ApiProperty()
  @Type(() => Object)
  footer: {
    text: string;
  };

  @ApiProperty()
  @Type(() => Object)
  buttons: {
    type: string;
    elements: ButtonElementDto[];
  };
}

export class CreateTemplateDto {
  @ApiProperty()
  template_name: string;

  @ApiProperty({ type: [String] })
  language: string[];

  @ApiProperty()
  template_type: string;

  @ApiProperty()
  template_category: string;

  @ApiProperty()
  @Type(() => ComponentsDto)
  components: ComponentsDto;
}
