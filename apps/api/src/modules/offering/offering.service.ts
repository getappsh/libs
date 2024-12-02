import { OfferingTopics, OfferingTopicsEmit } from '@app/common/microservice-client/topics';
import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { MicroserviceClient, MicroserviceName } from '@app/common/microservice-client';
import { PushOfferingDto } from '@app/common/dto/offering';

@Injectable()
export class OfferingService implements OnModuleInit{
  private readonly logger = new Logger(OfferingService.name);

  constructor(@Inject(MicroserviceName.OFFERING_SERVICE) private readonly offeringClient: MicroserviceClient){}


  getOfferingOfComp(catalogId: string) {
    return this.offeringClient.send(OfferingTopics.GET_OFFER_OF_COMP, catalogId)
  }

  checkHealth() {
    return this.offeringClient.send(OfferingTopics.CHECK_HEALTH, {})
  }

  getDeviceComponentOffering(deviceId: string){
    this.logger.debug(`Get device component offering, deviceId: ${deviceId}`)
    return this.offeringClient.send(OfferingTopics.DEVICE_COMPONENT_OFFERING, deviceId);
  }

  getDeviceMapOffering(deviceId: string){
    this.logger.debug(`Get device map offering, deviceId: ${deviceId}`)
    return this.offeringClient.send(OfferingTopics.DEVICE_MAP_OFFERING, deviceId);
  }

  pushOffering(po: PushOfferingDto){
    return this.offeringClient.emit(OfferingTopicsEmit.OFFERING_PUSH, po);
  }
  async onModuleInit() {
    this.offeringClient.subscribeToResponseOf(Object.values(OfferingTopics))
    await this.offeringClient.connect()
  }
}
