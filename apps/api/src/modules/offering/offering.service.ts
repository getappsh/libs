import { OfferingTopics, OfferingTopicsEmit } from '@app/common/microservice-client/topics';
import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { MicroserviceClient, MicroserviceName } from '@app/common/microservice-client';
import { ComponentOfferingRequestDto, PushOfferingDto } from '@app/common/dto/offering';
import { DeviceTypeParams, PlatformParams } from '@app/common/dto/devices-hierarchy';
import { ProjectIdentifierParams } from '@app/common/dto/project-management';

@Injectable()
export class OfferingService implements OnModuleInit{
  private readonly logger = new Logger(OfferingService.name);

  constructor(@Inject(MicroserviceName.OFFERING_SERVICE) private readonly offeringClient: MicroserviceClient){}

  getOfferingForPlatform(params: PlatformParams) {
    return this.offeringClient.send(OfferingTopics.GET_OFFERING_FOR_PLATFORM, params)
  }

  getOfferingForDeviceType(params: DeviceTypeParams){
    return this.offeringClient.send(OfferingTopics.GET_OFFERING_FOR_DEVICE_TYPE, params);
  }

  getOfferingForProject(params: ProjectIdentifierParams){
    return this.offeringClient.send(OfferingTopics.GET_OFFERING_FOR_PROJECT, params);
  }

  checkHealth() {
    return this.offeringClient.send(OfferingTopics.CHECK_HEALTH, {})
  }

  getDeviceComponentsOffering(dto: ComponentOfferingRequestDto){
    this.logger.debug(`Get components offering, dto: ${JSON.stringify(dto)}`)
    return this.offeringClient.send(OfferingTopics.DEVICE_COMPONENT_OFFERING, dto);
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
