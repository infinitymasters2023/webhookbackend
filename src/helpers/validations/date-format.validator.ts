// src/common/validators/date-format.validator.ts
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsDateFormat(validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          // Regular expression to match DD/MM/YYYY format
          const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;

          if (!datePattern.test(value)) {
            return false;
          }

          // Parse the date and check if it's a valid date
          const [_, day, month, year] = value.match(datePattern);
          const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));

          return !isNaN(date.getTime());
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be in DD/MM/YYYY format`;
        },
      },
    });
  };
}
