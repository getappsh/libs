import { DeviceTopics, GetMapTopics } from '@app/common/microservice-client/topics';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { DeviceRegisterDto } from '@app/common/dto/device';
import { MicroserviceClient, MicroserviceName } from '@app/common/microservice-client';
import { DevicePutDto } from '@app/common/dto/device/dto/device-put.dto';
import { AndroidConfigDto, BaseConfigDto, WindowsConfigDto } from '@app/common/dto/device/dto/device-config.dto';

@Injectable()
export class DeviceService {

  private readonly logger = new Logger(DeviceService.name);

  constructor(
    @Inject(MicroserviceName.DEVICE_SERVICE) private readonly deviceClient: MicroserviceClient,
    @Inject(MicroserviceName.GET_MAP_SERVICE) private readonly getMapClient: MicroserviceClient,) { }

  register(deviceRegister: DeviceRegisterDto) {
    this.deviceClient.send(DeviceTopics.REGISTER_SOFTWARE, deviceRegister);
    return this.getMapClient.send(GetMapTopics.REGISTER_MAP, deviceRegister);
  }


  getDevicesSoftwareStatisticInfo(params: { [key: string]: string[] }) {
    return this.deviceClient.send(DeviceTopics.DEVICES_SOFTWARE_STATISTIC_INFO, { params });
  }

  getDevicesMapStatisticInfo(params: { [key: string]: string[] }) {
    return this.deviceClient.send(DeviceTopics.DEVICES_MAP_STATISTIC_INFO, { params });
  }

  getRegisteredDevices(groups: string[]) {
    return this.deviceClient.send(DeviceTopics.All_DEVICES, { groups: groups });
  }

  putDeviceName(deviceId: string, body: DevicePutDto) {
    body.deviceId = deviceId
    return this.deviceClient.send(DeviceTopics.DEVICES_PUT, body)
  }

  getDeviceMaps(deviceId: string) {
    return this.deviceClient.send(DeviceTopics.DEVICE_MAPS, deviceId);
  }

  getDeviceSoftwares(deviceId: string) {
    return this.deviceClient.send(DeviceTopics.DEVICE_SOFTWARES, deviceId);
  }

  getDeviceConfig(group: string) {
    return this.deviceClient.send(DeviceTopics.GET_DEVICE_CONFIG, group);
  }

  setDeviceConfig(config: BaseConfigDto) {
    return this.deviceClient.send(DeviceTopics.SET_DEVICE_CONFIG, config);
  }
  async getDeviceContentInstalled(deviceId: string) {
    // let deviceContentRes = new DeviceContentResDto();
    // const comps$ = this.kafkaSenderService.send(DeviceTopics.DEVICE_SOFTWARE_CONTENT, deviceId).pipe(catchError(err => of([])));
    // const maps$ = this.deviceMapClient.send(DeviceMapTopics.DEVICE_MAP_CONTENT, deviceId).pipe(timeout(10000), catchError(err => of([])));
    // return forkJoin([comps$, maps$]).pipe(map(([comps, maps]) => {
    //     deviceContentRes.components = comps;
    //     deviceContentRes.maps = maps;
    //     return deviceContentRes
    // }));

    return this.deviceClient.send(DeviceTopics.DEVICE_CONTENT, deviceId);

  }

  checkHealth() {
    return this.deviceClient.send(DeviceTopics.CHECK_HEALTH, {})
  }

}
