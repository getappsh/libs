import { Body, Controller, Get, Logger, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateDevicesGroupDto, ChildGroupDto, EditDevicesGroupDto, SetChildInGroupDto, GroupResponseDto } from "@app/common/dto/devices-group";
import { GroupService } from "./group.service";
import { DEVICE_GROUP } from "@app/common/utils/paths";


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


  @Put()
  @ApiOperation({ summary: "Edit Devices Group" })
  @ApiOkResponse({ type: ChildGroupDto })
  editGroup(@Body() group: EditDevicesGroupDto) {
    this.logger.debug(`Edit devices group: ${group}`);
    return this.groupService.editGroup(group);
  }


  @Get()
  @ApiOperation({ summary: "Get root groups and its children groups and devices" })
  // TODO return type is not documented well, need to be Record<number, ChildGroupDto>
  @ApiOkResponse({ type: GroupResponseDto, description: 'Returns root group IDs and a mapping of all groups by ID' })
  getGroups() {
    this.logger.debug(`Get all root groups`);
    return this.groupService.getGroups();
  }


  @Get("/:groupId/")
  @ApiOperation({ summary: "Get groups of the given id and its children groups and devices" })
  @ApiParam({ name: 'groupId', type: String })
  @ApiOkResponse({ type: ChildGroupDto })
  getGroupById(@Param("groupId") groupId: string) {
    this.logger.debug(`Get group with id ${groupId}`);
    return this.groupService.getGroups(groupId);
  }
  // getGroupDevices(@Param("groupId") groupId: string) {
  //   this.logger.debug(`Get devices in a group id: ${groupId}`);
  //   return this.groupService.getGroupDevices(groupId)
  // }


  @Post("devices")
  @ApiOperation({ summary: "Set Devices in a Group" })
  @ApiCreatedResponse({ type: ChildGroupDto })
  setDevicesInGroup(@Body() devices: SetChildInGroupDto) {
    this.logger.debug(`Set devices in a group: ${devices}`);
    return this.groupService.setDevicesInGroup(devices);
  }



}