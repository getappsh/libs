import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";

@Injectable()
export class ProjectIdentifierPipe implements PipeTransform {
  transform(value: string): string | number {
    const asNumber = parseInt(value, 10);
    if (!isNaN(asNumber)) {
      return asNumber;
    }

    if (typeof value === 'string' && value.trim() !== '') {
      return value;
    }

    throw new BadRequestException('Invalid project identifier');
  }
}
