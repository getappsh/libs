import { CreateDeviceTypeDto, CreatePlatformDto, DeviceTypeParams, PlatformParams, UpdateDeviceTypeDto, UpdatePlatformDto } from "@app/common/dto/devices-hierarchy";
import { MicroserviceName, MicroserviceClient } from "@app/common/microservice-client";
import { DevicesHierarchyTopics } from "@app/common/microservice-client/topics";
import { Injectable, Inject, Logger } from "@nestjs/common";


@Injectable()
export class HierarchyService {
  private readonly logger = new Logger(HierarchyService.name);

  constructor(
    @Inject(MicroserviceName.DEVICE_SERVICE) private readonly deviceClient: MicroserviceClient
  ) {}

    createPlatform(dto: CreatePlatformDto){
      return this.deviceClient.send(
        DevicesHierarchyTopics.CREATE_PLATFORM,
        dto
      )
    }
  
    getPlatforms(query?: string){
      return this.deviceClient.send(
        DevicesHierarchyTopics.GET_PLATFORMS,
        query
      )
    }
    
    getPlatform(params: PlatformParams){
      return this.deviceClient.send(
        DevicesHierarchyTopics.GET_PLATFORM_BY_NAME,
        params
      )
    }
  
  
    updatePlatform(params: PlatformParams, dto: UpdatePlatformDto){
      dto.name = params.name;
      return this.deviceClient.send(
        DevicesHierarchyTopics.UPDATE_PLATFORM,
        dto
      )
    }
  
    deletePlatform(params: PlatformParams){
      return this.deviceClient.send(
        DevicesHierarchyTopics.DELETE_PLATFORM,
        params
      )
    }


  getDeviceTypes(query?: string) {
    return this.deviceClient.send(
      DevicesHierarchyTopics.GET_DEVICE_TYPES,
      query
    );
  }

  createDeviceType(dto: CreateDeviceTypeDto) {
    return this.deviceClient.send(
      DevicesHierarchyTopics.CREATE_DEVICE_TYPE,
      dto
    );
  }

  getDeviceType(params: DeviceTypeParams) {
    return this.deviceClient.send(
      DevicesHierarchyTopics.GET_DEVICE_TYPE_BY_NAME,
      params
    );
  }

  updateDeviceType(params: DeviceTypeParams, dto: UpdateDeviceTypeDto) {
    dto.name = params.name;
    return this.deviceClient.send(
      DevicesHierarchyTopics.UPDATE_DEVICE_TYPE,
      dto
    );
  }

  deleteDeviceType(params: DeviceTypeParams) {
    return this.deviceClient.send(
      DevicesHierarchyTopics.DELETE_DEVICE_TYPE,
      params
    );
  }

}