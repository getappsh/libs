import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { DiscoveryMessageV2Dto } from '../dto/discovery';

@ValidatorConstraint({ name: 'EitherIdPresentConstraint', async: false })
export class EitherIdPresentConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {

    const obj = args.object as DiscoveryMessageV2Dto;

    // Check if root id is present and not empty
    const rootId = obj.id;
    const hasRootId = rootId && typeof rootId === 'string' && rootId.trim() !== '';

    // Check if nested general.physicalDevice.ID is present and not empty
    const nestedId = obj.general?.physicalDevice?.ID;
    const hasNestedId = nestedId && typeof nestedId === 'string' && nestedId.trim() !== '';

    if (!rootId && hasNestedId) {
      obj.id = obj.general.physicalDevice.ID
    }

    return hasRootId || hasNestedId;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Either root id or general.physicalDevice.ID must be present and not empty';
  }
}