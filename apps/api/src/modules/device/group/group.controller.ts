import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateDevicesGroupDto, ChildGroupDto, EditDevicesGroupDto, SetChildInGroupDto, GroupResponseDto } from "@app/common/dto/devices-group";
import { GroupService } from "./group.service";
import { DEVICE_GROUP } from "@app/common/utils/paths";
import { DeviceDto } from "@app/common/dto/device/dto/device.dto";
import { DeviceOrgDto } from "@app/common/dto/device/dto/device-org.dto";
import { switchMap } from "rxjs";


@ApiTags("Organization Groups")
@ApiBearerAuth()
@Controller(DEVICE_GROUP)
export class GroupController {
  private readonly logger = new Logger(GroupController.name);

  constructor(private readonly groupService: GroupService) { }


  @Post()
  @ApiOperation({ summary: "Create Devices Group" })
  @ApiCreatedResponse({ type: ChildGroupDto })
  createGroup(@Body() group: CreateDevicesGroupDto) {
    this.logger.debug(`Create devices group: ${group}`);
    return this.groupService.createGroup(group);
  }


  @Put("/:groupId/")
  @ApiOperation({ summary: "Edit Devices Group" })
  @ApiParam({ name: 'groupId', type: String })
  @ApiOkResponse({ type: ChildGroupDto })
  editGroup(@Param("groupId") groupId: string, @Body() group: EditDevicesGroupDto) {
    this.logger.debug(`Edit devices group: ${group}`);
    group.id = parseInt(groupId, 10);
    return this.groupService.editGroup(group);
  }


  @Get()
  @ApiOperation({ summary: "Get all root groups with their child groups" })
  // TODO return type is not documented well, need to be Record<number, ChildGroupDto>
  @ApiOkResponse({ type: GroupResponseDto, description: 'Returns root group IDs and a mapping of all groups by ID' })
  getGroups() {
    this.logger.debug(`Get all root groups`);
    return this.groupService.getGroups();
  }


  @Get("/:groupId/")
  @ApiOperation({ summary: "Retrieve a group by its ID, including all its child groups and associated devices" })
  @ApiParam({ name: 'groupId', type: String })
  @ApiOkResponse({ type: ChildGroupDto })
  getGroupById(@Param("groupId") groupId: string) {
    this.logger.debug(`Get group with id ${groupId}`);
    return this.groupService.getGroups(groupId);
  }


  @Get("devices/:deviceId")
  @ApiOperation({ summary: "Get device org group data" })
  @ApiOkResponse({ type: DeviceOrgDto })
  getOrgDeviceData(@Param("deviceId") deviceId: string) {
    this.logger.debug(`Get device data, ID:  ${deviceId}`);
    return this.groupService.getOrgDeviceData(deviceId).pipe(
      switchMap(async (promise: Promise<DeviceDto>) => {
        const dvcDto = await promise;
        return DeviceOrgDto.fromDeviceDto(dvcDto);
      })
    );
  }

  @Post("devices")
  @ApiOperation({ summary: "Set Devices in a Group" })
  @ApiCreatedResponse({ type: ChildGroupDto })
  setDevicesInGroup(@Body() devices: SetChildInGroupDto) {
    this.logger.debug(`Set devices in a group: ${devices}`);
    return this.groupService.setDevicesInGroup(devices);
  }

  @Delete("/:groupId/")
  @ApiOperation({ summary: "Delete Devices Group by ID" })
  @ApiParam({ name: 'groupId', type: String })
  @ApiOkResponse({ type: ChildGroupDto, description: 'Group deleted successfully' })
  deleteGroup(@Param("groupId") groupId: string) {
    this.logger.debug(`Delete group with id ${groupId}`);
    return this.groupService.deleteGroup(groupId);
  }

}