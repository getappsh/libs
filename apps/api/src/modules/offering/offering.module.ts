import { Module } from '@nestjs/common';
import { OfferingService } from './offering.service';
import { OfferingController } from './offering.controller';
import { MicroserviceModule, MicroserviceName, MicroserviceType } from '@app/common/microservice-client';
import { OfferingPolicyController } from './offering-policy.controller';


@Module({
  imports: [
    MicroserviceModule.register({
      name: MicroserviceName.OFFERING_SERVICE,
      type: MicroserviceType.OFFERING,
      id: 'api',
    })
  ],
  controllers: [OfferingController, OfferingPolicyController],
  providers: [OfferingService]
})
export class OfferingModule {}
